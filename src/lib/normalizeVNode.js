export function normalizeVNode(vNode) {
  // 1. null, undefined 또는 boolean 타입일 경우 빈 문자열을 반환
  if (vNode === null || vNode === undefined || typeof vNode === "boolean")
    return "";

  // 2. 문자열 또는 숫자일 경우 문자열로 변환하여 반환
  if (typeof vNode === "number" || typeof vNode === "string")
    return String(vNode);

  // 3. 함수일 경우 해당 함수를 호출하여 반환된 결과를 재귀적으로 표준화  : 함수형 컴포넌트
  if (typeof vNode.type === "function") {
    return normalizeVNode(
      vNode.type({ ...vNode.props, children: vNode.children }),
    );
  }

  // 4. 그 외의 경우, vNode의 자식 요소들을 재귀적으로 표준화하고, falsy 값 필터링
  const refactorNode = (vNode.children || [])
    .map((child) => normalizeVNode(child))
    .filter((child) => !!child);

  return { ...vNode, children: refactorNode };
}
