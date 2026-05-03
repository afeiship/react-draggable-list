import React from "react";
import ReactList, { INDEX } from "@jswork/react-list";
import { renderSlot } from "./utils";
import { useDraggableList } from "./use-draggable-list";
import type { DraggableListProps, DraggableItemContext } from "./types";

/**
 * DraggableList — headless draggable list component.
 *
 * Uses @jswork/react-list internally to render items.
 * All drag-sort logic is provided by the useDraggableList hook.
 *
 * @example
 * ```tsx
 * import { animated } from "@react-spring/web";
 * import DraggableList from "@jswork/react-draggable-list";
 *
 * <DraggableList
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

/** Default container: minimal div with relative positioning and computed height */
function DefaultContainer({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return <div style={style}>{children}</div>;
}

export function DraggableList<T>({ data, itemHeight, itemGap, onChange, slots, ...rest }: DraggableListProps<T>) {
  const { containerStyle, items } = useDraggableList({ data, itemHeight, itemGap, onChange });

  const content = (
    <ReactList<DraggableItemContext<T>>
      data={items}
      keyExtractor={INDEX as any}
      slots={{
        item: ({ item: ctx }) => renderSlot(slots.item, ctx),
      }}
      {...rest}
    />
  );

  return renderSlot(slots.container ?? DefaultContainer, {
    children: content,
    style: containerStyle,
  }) as React.ReactElement;
}
