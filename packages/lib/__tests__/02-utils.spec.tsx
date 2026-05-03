/**
 * 工具函数测试
 * 验证 utils.ts 中的纯工具函数：
 * - clamp：数值范围限制
 * - swap：数组元素交换，不修改原数组
 * - isSlotConfig：slot 配置对象类型判断
 * - renderSlot：三种 slot 形式的渲染（函数组件、React 节点、配置对象）
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { clamp, swap, isSlotConfig, renderSlot } from '../src/utils';

describe('clamp', () => {
  it('should return value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should clamp to min when value is below range', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it('should clamp to max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should handle negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
  });

  it('should return min when min equals max', () => {
    expect(clamp(100, 5, 5)).toBe(5);
  });
});

describe('swap', () => {
  it('should swap two elements', () => {
    expect(swap([0, 1, 2, 3], 1, 3)).toEqual([0, 2, 3, 1]);
  });

  it('should not mutate the original array', () => {
    const original = [0, 1, 2];
    const result = swap(original, 0, 2);
    expect(original).toEqual([0, 1, 2]);
    expect(result).toEqual([1, 2, 0]);
  });

  it('should handle swapping with same index', () => {
    expect(swap([0, 1, 2], 1, 1)).toEqual([0, 1, 2]);
  });

  it('should handle two-element arrays', () => {
    expect(swap(['a', 'b'], 0, 1)).toEqual(['b', 'a']);
  });
});

describe('isSlotConfig', () => {
  it('should return true for objects with component property', () => {
    const Comp = () => <div />;
    expect(isSlotConfig({ component: Comp })).toBe(true);
  });

  it('should return true for objects with component and props', () => {
    const Comp = () => <div />;
    expect(isSlotConfig({ component: Comp, props: { color: 'red' } })).toBe(true);
  });

  it('should return false for function components', () => {
    const Comp = () => <div />;
    expect(isSlotConfig(Comp)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isSlotConfig(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isSlotConfig(undefined)).toBe(false);
  });

  it('should return false for plain objects without component', () => {
    expect(isSlotConfig({ foo: 'bar' })).toBe(false);
  });

  it('should return false for strings', () => {
    expect(isSlotConfig('hello')).toBe(false);
  });
});

describe('renderSlot', () => {
  it('should return null for undefined slot', () => {
    const { container } = render(<>{renderSlot(undefined, {})}</>);
    expect(container.innerHTML).toBe('');
  });

  it('should render a function slot', () => {
    const SlotFn = ({ message }: { message: string }) => <div>{message}</div>;
    const { getByText } = render(<>{renderSlot(SlotFn, { message: 'hello' })}</>);
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('should render a React node slot', () => {
    const node = <span data-testid="static-node">static</span>;
    const { getByTestId } = render(<>{renderSlot(node, {})}</>);
    expect(getByTestId('static-node')).toBeInTheDocument();
  });

  it('should render a config object slot', () => {
    const Comp = ({ greeting, name }: { greeting: string; name: string }) => (
      <div>{greeting} {name}</div>
    );
    const { getByText } = render(
      <>{renderSlot({ component: Comp, props: { greeting: 'Hello' } }, { name: 'World' })}</>,
    );
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
