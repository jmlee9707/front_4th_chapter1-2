import { updateAttributes } from "./updateAttributes";

export function createElement(vNode) {
  // 1. null, undefined, boolean 면 빈 텍스트 노드를 반환
  if (vNode === null || vNode === undefined || typeof vNode === "boolean")
    return document.createTextNode("");

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환
  if (typeof vNode === "number" || typeof vNode === "string")
    return document.createTextNode(String(vNode));

  // 3.배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    const nodeList = vNode.map((child) => createElement(child));
    nodeList.forEach((node) => fragment.appendChild(node));

    return fragment;
  }

  // 4. 위 경우가 아니면 실제 DOM 요소를 생성
  const { type, props, children = [] } = vNode;
  const $node = document.createElement(type);

  updateAttributes($node, null, props ?? {});

  children
    .filter((child) => !!child)
    .forEach((child) => $node.appendChild(createElement(child)));

  return $node;
}
