const timer = (element: HTMLElement, delay: number) => {
  setTimeout(() => {
    element.dispatchEvent(new CustomEvent('custom:timeout', { detail: delay }));
  }, delay);
};

export default timer;
