import React from "react";

/** Clamp a value within [min, max] range. Used to keep dragged items within list bounds. */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

/**
 * Swap two elements in an array by position.
 * Returns a new array without mutating the original.
 * Example: swap([0, 1, 2, 3], 1, 3) => [0, 2, 3, 1]
 */
export function swap<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const item = next.splice(from, 1)[0];
  next.splice(to, 0, item);
  return next;
}

/** Type guard for slot config objects ({ component, props? }) */
export function isSlotConfig(
  value: unknown,
): value is { component: React.ComponentType<any>; props?: Record<string, any> } {
  return !!value && typeof value === "object" && "component" in (value as object);
}

/**
 * Attach a React key to an already-rendered element via cloneElement.
 * Uses cloneElement instead of createElement to avoid unmounting/remounting
 * when the slot is an inline arrow function (new ref each render).
 */
function withKey(result: React.ReactNode, key?: string | number): React.ReactNode {
  if (key != null && React.isValidElement(result)) {
    return React.cloneElement(result, { key });
  }
  return result;
}

/**
 * Render a slot which can be:
 * 1. A function component: `slots={{ item: MyComponent }}`
 * 2. A React node: `slots={{ item: <div>static</div> }}`
 * 3. A config object: `slots={{ item: { component: MyComp, props: { className: 'foo' } } }}`
 */
export function renderSlot<P>(
  slot:
    | React.ComponentType<P>
    | React.ReactNode
    | { component: React.ComponentType<any>; props?: Record<string, any> }
    | undefined,
  props: P,
  key?: string | number,
): React.ReactNode {
  if (!slot) return null;

  if (typeof slot === "function") {
    return withKey(React.createElement(slot as any, props as any), key);
  }

  if (isSlotConfig(slot)) {
    return withKey(React.createElement(slot.component as any, { ...slot.props, ...props } as any), key);
  }

  return key != null ? <React.Fragment key={key}>{slot}</React.Fragment> : slot;
}
