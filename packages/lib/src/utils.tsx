import React from "react";

/**
 * 将数值限制在 [min, max] 范围内
 * 用于计算拖拽时 item 不能超出列表边界
 *
 * clamp: 夹具；夹子；夹钳；车轮夹锁(用于锁住违章停放的车辆)
 */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

/**
 * 交换数组中两个元素的位置
 * - 从 from 位置取出元素，插入到 to 位置
 * - 返回新数组，不修改原数组
 *
 * 例：swap([0, 1, 2, 3], 1, 3) => [0, 2, 3, 1]
 */
export function swap<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const item = next.splice(from, 1)[0];
  next.splice(to, 0, item);
  return next;
}

/**
 * 判断值是否为 Slot 配置对象（{ component, props? } 形式）
 */
export function isSlotConfig(
  value: unknown,
): value is { component: React.ComponentType<any>; props?: Record<string, any> } {
  return !!value && typeof value === "object" && "component" in (value as object);
}

/**
 * 通过 cloneElement 给渲染结果附加 key
 *
 * 为什么用 cloneElement 而不是 createElement？
 * - 消费者可能传内联箭头函数作为 slot：`(props) => <MyItem {...props} />`
 * - 每次渲染都是新的函数引用，createElement 会认为是新组件，导致卸载/重新挂载
 * - cloneElement 操作的是已渲染的元素，不会触发重新挂载
 */
function withKey(result: React.ReactNode, key?: string | number): React.ReactNode {
  if (key != null && React.isValidElement(result)) {
    return React.cloneElement(result, { key });
  }
  return result;
}

/**
 * 渲染 Slot
 *
 * Slot 有三种形式：
 * 1. 函数组件：`slots={{ item: MyComponent }}`
 * 2. React 节点：`slots={{ item: <div>static</div> }}`
 * 3. 配置对象：`slots={{ item: { component: MyComp, props: { className: 'foo' } } }}`
 */
export function renderSlot<P>(
  slot: React.ComponentType<P> | React.ReactNode | { component: React.ComponentType<any>; props?: Record<string, any> } | undefined,
  props: P,
  key?: string | number,
): React.ReactNode {
  if (!slot) return null;

  if (typeof slot === "function") {
    return withKey((slot as any)(props), key);
  }

  if (isSlotConfig(slot)) {
    return withKey((slot.component as any)({ ...slot.props, ...props }), key);
  }

  return key != null ? <React.Fragment key={key}>{slot}</React.Fragment> : slot;
}
