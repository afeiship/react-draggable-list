import React from "react";
import type { SpringValue } from "@react-spring/web";
import type { Slot, ItemContext, ReactListProps } from "@jswork/react-list";

export type { Slot, ItemContext };

/**
 * Render context for each draggable item (extends ItemContext from react-list).
 * Adds drag-specific fields on top of the base { item, index, data }.
 */
export interface DraggableItemContext<T> extends ItemContext<T> {
  /** Spread onto the drag element: {...dragProps} */
  dragProps: Record<string, any>;
  /** Animated styles (SpringValue) — must be used with an animated component */
  style: {
    zIndex: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
    shadow: SpringValue<number>;
    height: number;
  };
  /** Whether this item is currently being dragged */
  isDragging: boolean;
  /** Item height in px, convenient for setting element height */
  itemHeight: number;
  /** Gap between items in px */
  itemGap: number;
}

/** Render context for the list container */
export interface DraggableContainerContext {
  children: React.ReactNode;
  style: React.CSSProperties;
}

/** Options for the useDraggableList hook */
export interface UseDraggableListOptions<T> {
  /** Data array */
  data: T[];
  /** Item height in px (default 70) */
  itemHeight?: number;
  /** Gap between items in px (default 8) */
  itemGap?: number;
  /** Callback fired with the reordered array after a drag ends */
  onChange?: (newOrder: T[]) => void;
}

/** Return value of the useDraggableList hook */
export interface UseDraggableListReturn<T> {
  /** Reordered data array */
  orderedData: T[];
  /** Container style (mainly height) */
  containerStyle: React.CSSProperties;
  /** Per-item render contexts */
  items: DraggableItemContext<T>[];
}

/**
 * Props for the DraggableList component.
 * Extends ReactListProps (reuses data, keyExtractor, slots.empty).
 */
export interface DraggableListProps<T> extends Omit<ReactListProps<T>, "slots"> {
  /** Item height in px (default 70) */
  itemHeight?: number;
  /** Gap between items in px (default 8) */
  itemGap?: number;
  /** Callback fired with the reordered array after a drag ends */
  onChange?: (newOrder: T[]) => void;
  /** Slot configuration (extends react-list slots with drag fields) */
  slots: {
    /** Required: render each item, receives DraggableItemContext<T> */
    item: Slot<DraggableItemContext<T>>;
    /** Optional: render the container */
    container?: Slot<DraggableContainerContext>;
  };
}
