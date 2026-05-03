/**
 * useDraggableList hook 测试
 * 验证核心 hook 的功能：
 * - 返回值结构是否正确（orderedData, containerStyle, items）
 * - items 数组长度与 data 一致
 * - containerStyle 高度计算是否正确
 * - 每个 item 的上下文包含必要的字段（dragProps, style, isDragging 等）
 * - 默认 itemHeight 和 itemGap 是否生效
 * - 自定义 itemHeight/itemGap 是否生效
 */
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDraggableList } from '../src/use-draggable-list';

describe('useDraggableList', () => {
  const DATA = ['A', 'B', 'C'];

  it('should return correct structure', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    const { orderedData, containerStyle, items } = result.current;

    expect(Array.isArray(orderedData)).toBe(true);
    expect(typeof containerStyle).toBe('object');
    expect(Array.isArray(items)).toBe(true);
  });

  it('should return items matching data length', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    expect(result.current.items).toHaveLength(3);
  });

  it('should compute container height correctly', () => {
    const { result } = renderHook(() =>
      useDraggableList({ data: DATA, itemHeight: 70, itemGap: 8 }),
    );
    // 3 items * (70 + 8) - 8 = 226
    expect(result.current.containerStyle.height).toBe(226);
    expect(result.current.containerStyle.position).toBe('relative');
  });

  it('should compute container height with custom itemHeight and itemGap', () => {
    const { result } = renderHook(() =>
      useDraggableList({ data: DATA, itemHeight: 50, itemGap: 10 }),
    );
    // 3 items * (50 + 10) - 10 = 170
    expect(result.current.containerStyle.height).toBe(170);
  });

  it('should provide each item with required context fields', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    const item = result.current.items[0];

    expect(item.item).toBe('A');
    expect(item.index).toBe(0);
    expect(item.isDragging).toBe(false);
    expect(item.itemHeight).toBe(70);
    expect(item.itemGap).toBe(8);
    expect(typeof item.dragProps).toBe('object');
    expect(item.style).toHaveProperty('zIndex');
    expect(item.style).toHaveProperty('y');
    expect(item.style).toHaveProperty('scale');
    expect(item.style).toHaveProperty('shadow');
    expect(item.style.height).toBe(70);
  });

  it('should use default itemHeight=70 and itemGap=8', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    const item = result.current.items[0];
    expect(item.itemHeight).toBe(70);
    expect(item.itemGap).toBe(8);
  });

  it('should respect custom itemHeight and itemGap', () => {
    const { result } = renderHook(() =>
      useDraggableList({ data: DATA, itemHeight: 100, itemGap: 20 }),
    );
    const item = result.current.items[0];
    expect(item.itemHeight).toBe(100);
    expect(item.itemGap).toBe(20);
    // 3 * (100 + 20) - 20 = 340
    expect(result.current.containerStyle.height).toBe(340);
  });

  it('should set isDragging to false initially for all items', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    result.current.items.forEach((item) => {
      expect(item.isDragging).toBe(false);
    });
  });

  it('should return orderedData matching initial data order', () => {
    const { result } = renderHook(() => useDraggableList({ data: DATA }));
    expect(result.current.orderedData).toEqual(['A', 'B', 'C']);
  });

  it('should handle single item', () => {
    const { result } = renderHook(() => useDraggableList({ data: ['Solo'] }));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].item).toBe('Solo');
    // 1 * (70 + 8) - 8 = 70
    expect(result.current.containerStyle.height).toBe(70);
  });

  it('should handle empty data', () => {
    const { result } = renderHook(() => useDraggableList({ data: [] }));
    expect(result.current.items).toHaveLength(0);
    // 0 * (70 + 8) - 8 = -8
    expect(result.current.containerStyle.height).toBe(-8);
  });
});
