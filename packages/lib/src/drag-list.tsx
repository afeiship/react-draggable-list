import React from "react";
import ReactList, { INDEX } from "@jswork/react-list";
import { renderSlot } from "./utils";
import { useDragList } from "./use-drag-list";
import type { DragListProps, DragItemContext } from "./types";

/**
 * DragList — 无头拖拽列表组件
 *
 * 内部使用 @jswork/react-list 的 ReactList 组件来渲染 item 列表，
 * 拖拽排序逻辑由 useDragList hook 提供。
 *
 * @example
 * ```tsx
 * import { animated } from "@react-spring/web";
 * import DragList from "./components/DragList";
 *
 * <DragList
 *   data={['React', 'Vue', 'Angular']}
 *   onChange={(newOrder) => console.log(newOrder)}
 *   slots={{
 *     item: ({ item, dragProps, style }) => (
 *       <animated.div
 *         {...dragProps}
 *         style={{ ...style, position: 'absolute', height: 70, width: '100%', touchAction: 'none' }}
 *       >
 *         {item}
 *       </animated.div>
 *     ),
 *   }}
 * />
 * ```
 */
/** 默认容器：只做 relative 定位 + 高度，零样式侵入 */
function DefaultContainer({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return <div style={style}>{children}</div>;
}

export function DragList<T>({ data, itemHeight, itemGap, onChange, slots, ...rest }: DragListProps<T>) {
  const { containerStyle, items } = useDragList({ data, itemHeight, itemGap, onChange });

  // 内部 ReactList 迭代 DragItemContext<T>[]，keyExtractor 始终用 INDEX
  const content = (
    <ReactList<DragItemContext<T>>
      {...rest}
      data={items}
      keyExtractor={INDEX}
      slots={{
        item: ({ item: ctx }) => renderSlot(slots.item, ctx),
      }}
    />
  );

  // 容器也通过 slot 渲染，不硬编码任何 DOM 结构
  return renderSlot(slots.container ?? DefaultContainer, { children: content, style: containerStyle }) as React.ReactElement;
}
