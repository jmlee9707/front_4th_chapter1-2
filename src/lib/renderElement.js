import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

const dom = new WeakMap();

export function renderElement(vNode, container) {
  const refactNode = normalizeVNode(vNode);
  if (!container.hasChildNodes()) {
    const $root = createElement(refactNode);
    container.appendChild($root);
  } else {
    const oldNode = dom.get("container");
    updateElement(container, refactNode, oldNode);
  }

  setupEventListeners(container);
  dom.set(container, refactNode);
}
