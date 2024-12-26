import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
export function renderElement(vNode, container) {
  // vNode 정규화 한다음
  const refactNode = normalizeVNode(vNode);

  if (!container.hasChildNodes()) {
    const $root = createElement(refactNode);
    container.appendChild($root);
  }

  setupEventListeners(container);

  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.
}
