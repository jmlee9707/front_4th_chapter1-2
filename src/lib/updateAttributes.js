import { addEvent, removeEvent } from "./eventManager";

export function updateAttributes($el, prevNode, newNode) {
  // 제거
  Object.keys(prevNode || {})
    .filter((prop) => prop in newNode)
    .forEach((prop) => {
      prop.startsWith("on")
        ? removeEvent($el, prop.slice(2).toLowerCase(), prevNode[prop])
        : $el.removeAttribute(prop);
    });

  if (newNode || {}) {
    Object.keys(newNode).forEach((prop) => {
      prop.startsWith("on")
        ? addEvent($el, prop.slice(2).toLowerCase(), newNode[prop])
        : $el.setAttribute(
            prop === "className" ? "class" : prop,
            newNode[prop],
          );
    });
  }
}
