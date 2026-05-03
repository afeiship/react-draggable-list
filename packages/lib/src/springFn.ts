import { config } from "@react-spring/web";

/**
 * Spring animation config factory for drag list items.
 *
 * The `order` array tracks each item's visual position (e.g. [0, 2, 1] means
 * item-2 is in row 1, item-1 is in row 2).
 * - Dragged item: follows cursor, scaled up, z-index on top
 * - Other items: animate to their computed row position (make-way effect)
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
    const row = order.indexOf(index);
    const isDragging = active && index === originalIndex;

    return isDragging
      ? {
          y: curIndex * (itemHeight + itemGap) + y,
          scale: 1.05,
          zIndex: 10,
          shadow: 16,
          immediate: (key: string) => key === "zIndex" || key === "y",
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
        }
      : {
          y: row * (itemHeight + itemGap),
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
  };

export default springFn;
