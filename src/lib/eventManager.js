const eventMap = new Map(); // key, object

export function setupEventListeners(root) {
  if (eventMap.size === 0) return;

  for (const [key, values] of eventMap.entries()) {
    root.addEventListener(key, (e) => {
      values.forEach(({ element, handler }) => {
        if (e.target === element || element.contains?.(e.target))
          handler.call(element, e);
      });
    });
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, []);
  }
  eventMap.get(eventType).push({ element, handler });
  return;
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType) || eventMap.get(eventType).length === 0) return;
  const idx = eventMap
    .get(eventType)
    .find((el) => el === element && el.handler === handler);
  eventMap.get(eventType).splice(idx, 1);

  return;
}
