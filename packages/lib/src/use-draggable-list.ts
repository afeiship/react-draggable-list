import React, { useEffect, useRef, useState } from "react";
import { useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp, swap } from "./utils";
import springFn from "./springFn";
import type { UseDraggableListOptions, UseDraggableListReturn, DraggableItemContext } from "./types";

const DEFAULT_ITEM_HEIGHT = 70;
const DEFAULT_ITEM_GAP = 8;

/**
 * useDraggableList — headless drag-sort list hook.
 *
 * Encapsulates all drag-sort logic (gesture, animation, ordering).
 * Consumers only need to care about rendering each item.
 *
 * @example
 * ```tsx
 * const { containerStyle, items } = useDraggableList({ data: ['A', 'B', 'C'], onChange: console.log });
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
export function useDraggableList<T>(options: UseDraggableListOptions<T>): UseDraggableListReturn<T> {
  const { data, itemHeight = DEFAULT_ITEM_HEIGHT, itemGap = DEFAULT_ITEM_GAP, onChange } = options;
  const step = itemHeight + itemGap;

  /**
   * order ref tracks the current visual sort order.
   * Initial value [0, 1, 2, ...] means item-0 is in row 0, item-1 in row 1, etc.
   *
   * Why ref instead of state?
   * - Updating order during drag doesn't need re-renders (animation is spring-driven)
   * - Avoids re-renders resetting order back to [0, 1, 2, ...]
   */
  const order = useRef(data.map((_, i) => i));

  // Track which item is being dragged for isDragging in context
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  /**
   * useSprings: creates an independent spring animation for each item.
   * springs[i] contains { y, scale, zIndex, shadow } animated values.
   * api.start(fn) accepts a function that computes spring config per index.
   */
  const [springs, api] = useSprings(data.length, springFn(order.current, itemHeight, itemGap));

  // When external data changes (e.g. onChange → setUsers), reset order and snap to position
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
   * useDrag: bind drag gesture handler.
   *
   * Handler params:
   * - args: [originalIndex]  — passed via bind(i), the item's original index
   * - active: whether a drag is in progress
   * - movement: [, y]        — drag displacement, only y-axis (vertical)
   */
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [, y] }) => {
      // Step 1: find the dragged item's current position in the order array
      const curIndex = order.current.indexOf(originalIndex);

      // Step 2: compute target row based on drag offset
      const offset = (curIndex + 0.5) * step;
      const curRow = clamp(
        Math.round((offset + y) / step),
        0,
        data.length - 1,
      );

      // Step 3: swap curIndex and curRow in the order array
      const newOrder = swap(order.current, curIndex, curRow);

      // Step 4: update spring animations with the new order
      api.start(springFn(newOrder, itemHeight, itemGap, active, originalIndex, curIndex, y));

      // Step 5: on drag end, commit the new order
      if (!active) {
        order.current = newOrder;
        setDragIndex(null);
        onChange?.(newOrder.map((i) => data[i]));
      } else {
        setDragIndex(originalIndex);
      }
    },
    // filterTaps: ignore clicks (displacement < 3px), only handle real drags
    { filterTaps: true },
  );

  /** Build per-item render contexts */
  const items: DraggableItemContext<T>[] = springs.map(
    ({ zIndex, shadow, y, scale }, i) => ({
      item: data[i],
      index: i,
      data,
      dragProps: bind(i),
      style: { zIndex, y, scale, shadow, height: itemHeight },
      isDragging: dragIndex === i,
      itemHeight,
      itemGap,
    }),
  );

  /** Reordered data based on current order ref */
  const orderedData = order.current.map((i) => data[i]);

  /** Container style */
  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: data.length * step - itemGap,
  };

  return { orderedData, containerStyle, items };
}
