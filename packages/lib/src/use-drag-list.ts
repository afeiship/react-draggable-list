import { useEffect, useRef } from "react";
import { useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp, swap } from "./utils";
import springFn from "./springFn";
import type { UseDragListOptions, UseDragListReturn, DragItemContext } from "./types";

/** 默认 item 高度 */
const DEFAULT_ITEM_HEIGHT = 70;
/** 默认 item 间距 */
const DEFAULT_ITEM_GAP = 8;

/**
 * useDragList — 无头拖拽列表 hook
 *
 * 将拖拽排序的所有逻辑（手势、动画、排序）封装在 hook 中，
 * 消费者只需关心如何渲染每个 item。
 *
 * @example
 * ```tsx
 * const { containerStyle, items } = useDragList({ data: ['A', 'B', 'C'], onChange: console.log });
 *
 * return (
 *   <div style={containerStyle}>
 *     {items.map((ctx) => (
 *       <animated.div key={ctx.index} {...ctx.dragProps} style={{ ...ctx.style, position: 'absolute' }}>
 *         {ctx.item}
 *       </animated.div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useDragList<T>(options: UseDragListOptions<T>): UseDragListReturn<T> {
  const { data, itemHeight = DEFAULT_ITEM_HEIGHT, itemGap = DEFAULT_ITEM_GAP, onChange } = options;

  // 单个 item 占用的垂直空间（高度 + 间距）
  const step = itemHeight + itemGap;

  /**
   * order ref 记录当前排序状态
   * 初始值 [0, 1, 2, ...] 表示第 0 个 item 在第 0 行，第 1 个 item 在第 1 行...
   *
   * 为什么用 ref 而不是 state？
   * - 拖拽过程中修改 order 不需要触发 re-render（动画由 react-spring 驱动）
   * - 避免 re-render 导致 order 被重新初始化为 [0, 1, 2, ...]
   */
  const order = useRef(data.map((_, i) => i));

  /**
   * useSprings：为每个 item 创建一组独立的 spring 动画
   * - springs[i] 包含第 i 个 item 的 { y, scale, zIndex, shadow } 动画值
   * - api.start(fn) 接受一个函数，为每个 index 计算新的 spring 配置
   */
  const [springs, api] = useSprings(data.length, springFn(order.current, itemHeight, itemGap));

  // 当外部 data 变化时（如 onChange → setUsers），重置 order 并瞬间归位
  // immediate: true 确保 items 直接跳到目标位置，不产生回弹动画
  useEffect(() => {
    const resetOrder = data.map((_, i) => i);
    order.current = resetOrder;
    api.start((index) => ({
      y: resetOrder.indexOf(index) * step,
      scale: 1,
      zIndex: 0,
      shadow: 1,
      immediate: true,
    }));
  }, [data, step, api]);

  /**
   * useDrag：绑定拖拽手势
   *
   * handler 参数解析：
   * - args: [originalIndex]  来自 bind(i) 传入的参数，即 item 的原始索引
   * - active: 是否正在拖拽中
   * - movement: [, y]        拖拽位移量，只关心 y 轴（垂直拖拽）
   */
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [, y] }) => {
      // 步骤 1：找到被拖拽 item 在 order 数组中的当前位置
      const curIndex = order.current.indexOf(originalIndex);

      // 步骤 2：根据拖拽位移 y，计算 item 应该被放到第几行
      const offset = (curIndex + 0.5) * step;
      const curRow = clamp(
        Math.round((offset + y) / step),
        0,
        data.length - 1,
      );

      // 步骤 3：在 order 数组中交换 curIndex 和 curRow 的位置
      const newOrder = swap(order.current, curIndex, curRow);

      // 步骤 4：用新的 order 更新所有 item 的 spring 动画
      api.start(springFn(newOrder, itemHeight, itemGap, active, originalIndex, curIndex, y));

      // 步骤 5：拖拽结束时（松手），提交新的排序
      if (!active) {
        order.current = newOrder;
        onChange?.(newOrder.map((i) => data[i]));
      }
    },
    // filterTaps: 过滤掉点击（位移 < 3px），只有真正拖拽才触发 handler
    { filterTaps: true },
  );

  /**
   * 构造每个 item 的渲染上下文
   * 消费者通过这些数据来渲染 item，不需要关心拖拽逻辑
   */
  const items: DragItemContext<T>[] = springs.map(
    ({ zIndex, shadow, y, scale }, i) => ({
      item: data[i],
      index: i,
      data,
      dragProps: bind(i),
      style: { zIndex, y, scale, shadow, height: itemHeight },
      isDragging: false,
      itemHeight,
      itemGap,
    }),
  );

  /**
   * 排序后的数据（根据 order ref）
   */
  const orderedData = order.current.map((i) => data[i]);

  /**
   * 容器样式
   */
  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: data.length * step - itemGap,
  };

  return { orderedData, containerStyle, items };
}
