const copy = (element: HTMLElement, text: string) => {
  async function clickHandler() {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        element.dispatchEvent(
          new CustomEvent('custom:copied', { detail: text })
        );
      } catch (e) {
        element.dispatchEvent(
          new CustomEvent('custom:copied:error', { detail: e })
        );
      }
    }
  }

  element.addEventListener('click', clickHandler);

  return {
    update: (t: string) => (text = t),
    destroy: () => element.removeEventListener('click', clickHandler),
  };
};

export default copy;
