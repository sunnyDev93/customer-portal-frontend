export default function getByTextMatcher(text: string) {
  return (_content: string, element: Element | null): boolean => {
    if (element === null) return false;

    const hasText = (node: Element) => node.textContent === text;
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));

    return nodeHasText && childrenDontHaveText;
  };
}
