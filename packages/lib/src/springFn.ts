import { config } from "@react-spring/web";

/**
 * spring 动画配置工厂函数
 *
 * 核心思路：
 * - order 数组记录每个 item 当前在列表中的位置（例如 [0, 2, 1] 表示 item2 排第二、item1 排第三）
 * - 对于正在被拖拽的 item：y 坐标跟随鼠标移动，scale 放大，zIndex 提到最上层
 * - 对于其他 item：根据 order 数组计算自己应该在的 y 坐标，产生让位动画
 *
 * @param order      - 当前排序数组（如 [0, 2, 1]）
 * @param itemHeight - 每个 item 的高度
 * @param itemGap    - item 之间的间距
 * @param active     - 是否有 item 正在拖拽
 * @param originalIndex - 被拖拽 item 的原始索引（通过 bind(i) 传入）
 * @param curIndex   - 被拖拽 item 在 order 中的当前位置
 * @param y          - 拖拽的 y 轴位移量（相对于拖拽起始点）
 * @returns 每个 index 的 spring 动画配置
 */
const springFn =
  (
    order: number[],
    itemHeight: number,
    itemGap: number,
    active = false,
    originalIndex = 0,
    curIndex = 0,
    y = 0,
  ) =>
  (index: number) => {
    // 当前 item 在 order 中的排位（第几行）
    const row = order.indexOf(index);

    // 判断当前 item 是否就是正在被拖拽的那一个
    const isDragging = active && index === originalIndex;

    return isDragging
      ? // 被拖拽的 item：跟随鼠标，放大，置顶
        {
          // y = 当前行的基准位置 + 鼠标位移量
          y: curIndex * (itemHeight + itemGap) + y,
          scale: 1.05,
          zIndex: 10,
          shadow: 16,
          // y 坐标和 zIndex 变化立即生效（不经过动画），让拖拽跟手
          immediate: (key: string) => key === "zIndex" || key === "y",
          // y 用 stiff 弹簧（响应快），其他属性用默认弹簧（有回弹感）
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
        }
      : // 其他 item：动画移动到 order 中自己应该在的位置
        {
          y: row * (itemHeight + itemGap),
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
  };

export default springFn;
