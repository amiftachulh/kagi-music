export function clickOutside(node: Node) {
  function handleClick(event: Event) {
    if (node && !node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('clickoutside'));
    }
  }

  document.addEventListener('click', handleClick);

  return {
    destroy() {
      document.removeEventListener('click', handleClick);
    }
  };
}
