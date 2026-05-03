import React from "react";
import type { SpringValue } from "@react-spring/web";
import type { Slot, ItemContext, ReactListProps } from "@jswork/react-list";

// 直接复用 react-list 的 Slot 和 ItemContext 类型
export type { Slot, ItemContext };

/**
 * 每个 item 的渲染上下文（扩展自 ItemContext）
 *
 * 在 react-list 的 { item, index, data } 基础上增加了拖拽相关字段：
 * - `dragProps` — 需要展开到拖拽元素上的手势绑定
 * - `style` — 需要展开到元素上的动画样式（SpringValue，需 animated 组件）
 * - `isDragging` — 当前 item 是否正在被拖拽
 */
export interface DragItemContext<T> extends ItemContext<T> {
  /** 需要展开到拖拽元素上：{...dragProps} */
  dragProps: Record<string, any>;
  /** 需要展开到元素上的动画样式（SpringValue 类型，需配合 animated 组件使用） */
  style: {
    zIndex: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
    shadow: SpringValue<number>;
    height: number;
  };
  /** 当前 item 是否正在被拖拽 */
  isDragging: boolean;
  /** 每个 item 的高度（px），方便消费者设置元素高度 */
  itemHeight: number;
  /** item 之间的间距（px） */
  itemGap: number;
}

/**
 * 容器的渲染上下文
 */
export interface DragContainerContext {
  /** 容器的子元素 */
  children: React.ReactNode;
  /** 容器需要设置的样式（主要是高度） */
  style: React.CSSProperties;
}

/**
 * useDragList hook 的参数
 */
export interface UseDragListOptions<T> {
  /** 数据数组 */
  data: T[];
  /** 每个 item 的高度（px），默认 70 */
  itemHeight?: number;
  /** item 之间的间距（px），默认 8 */
  itemGap?: number;
  /** 拖拽排序完成后的回调，参数为排序后的新数组 */
  onChange?: (newOrder: T[]) => void;
}

/**
 * useDragList hook 的返回值
 */
export interface UseDragListReturn<T> {
  /** 排序后的数据数组 */
  orderedData: T[];
  /** 容器样式（主要是高度） */
  containerStyle: React.CSSProperties;
  /** 渲染每个 item 需要的上下文数组 */
  items: DragItemContext<T>[];
}

/**
 * DragList 组件的 Props
 * 扩展自 ReactListProps（复用 data、keyExtractor、slots.empty）
 */
export interface DragListProps<T> extends Omit<ReactListProps<T>, "slots"> {
  /** 每个 item 的高度（px），默认 70 */
  itemHeight?: number;
  /** item 之间的间距（px），默认 8 */
  itemGap?: number;
  /** 拖拽排序完成后的回调 */
  onChange?: (newOrder: T[]) => void;
  /** Slot 配置（扩展自 react-list，item slot 额外接收拖拽相关字段） */
  slots: {
    /** 必填：渲染每个 item，接收 DragItemContext<T> */
    item: Slot<DragItemContext<T>>;
    /** 可选：渲染容器 */
    container?: Slot<DragContainerContext>;
  };
}
