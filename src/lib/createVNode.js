export function createVNode(type, props, ...children) {
  const flatChild = children.flat(Infinity).filter((el) => el || el === 0);

  return { type, props, children: flatChild };
}
