/**
 * springFn 动画配置测试
 * 验证 spring 动画工厂函数在不同场景下的输出：
 * - 非拖拽状态下 item 的默认位置和样式
 * - 拖拽状态下 item 的放大、置顶、阴影效果
 * - 不同 order 数组对 y 坐标的影响
 * - immediate 和 config 的正确设置
 */
import { config } from '@react-spring/web';
import springFn from '../src/springFn';

const ITEM_HEIGHT = 70;
const ITEM_GAP = 8;
const STEP = ITEM_HEIGHT + ITEM_GAP;

describe('springFn', () => {
  it('should compute idle position based on order', () => {
    const fn = springFn([0, 1, 2], ITEM_HEIGHT, ITEM_GAP);

    const item0 = fn(0);
    expect(item0.y).toBe(0);
    expect(item0.scale).toBe(1);
    expect(item0.zIndex).toBe(0);
    expect(item0.shadow).toBe(1);
    expect(item0.immediate).toBe(false);

    const item2 = fn(2);
    expect(item2.y).toBe(2 * STEP);
  });

  it('should compute position for reordered items', () => {
    // order [2, 0, 1] 表示 item0 在第1行，item1 在第2行，item2 在第0行
    const fn = springFn([2, 0, 1], ITEM_HEIGHT, ITEM_GAP);

    expect(fn(0).y).toBe(1 * STEP);
    expect(fn(1).y).toBe(2 * STEP);
    expect(fn(2).y).toBe(0);
  });

  it('should apply drag styles to the active item', () => {
    const fn = springFn([0, 1, 2], ITEM_HEIGHT, ITEM_GAP, true, 1, 1, 50);

    const dragged = fn(1);
    expect(dragged.y).toBe(1 * STEP + 50);
    expect(dragged.scale).toBe(1.05);
    expect(dragged.zIndex).toBe(10);
    expect(dragged.shadow).toBe(16);
  });

  it('should apply idle styles to non-dragged items during drag', () => {
    const fn = springFn([0, 1, 2], ITEM_HEIGHT, ITEM_GAP, true, 1, 1, 50);

    const idle = fn(0);
    expect(idle.scale).toBe(1);
    expect(idle.zIndex).toBe(0);
    expect(idle.shadow).toBe(1);
  });

  it('should use immediate for zIndex and y on dragged item', () => {
    const fn = springFn([0, 1], ITEM_HEIGHT, ITEM_GAP, true, 0, 0, 0);
    const dragged = fn(0) as any;

    expect(dragged.immediate('zIndex')).toBe(true);
    expect(dragged.immediate('y')).toBe(true);
    expect(dragged.immediate('scale')).toBe(false);
  });

  it('should use stiff config for y and default for others on dragged item', () => {
    const fn = springFn([0, 1], ITEM_HEIGHT, ITEM_GAP, true, 0, 0, 0);
    const dragged = fn(0) as any;

    expect(dragged.config('y')).toBe(config.stiff);
    expect(dragged.config('scale')).toBe(config.default);
  });

  it('should default all optional params', () => {
    const fn = springFn([0], ITEM_HEIGHT, ITEM_GAP);
    const result = fn(0);
    expect(result.y).toBe(0);
    expect(result.scale).toBe(1);
    expect(result.immediate).toBe(false);
  });
});
