/** @type {import('svelte/action').Action<HTMLElement, string>}  */
export default function (element, text) {
	/** Write text to clipboard. */
	async function click_handler() {
		if (text) {
			try {
				await navigator.clipboard.writeText(text);
				element.dispatchEvent(new CustomEvent('custom:copied', { detail: text }));
			} catch (e) {
				element.dispatchEvent(new CustomEvent('custom:copied:error', { detail: e }));
			}
		}
	}

	element.addEventListener('click', click_handler);

	return {
		update(t) {
			text = t;
		},
		destroy() {
			element.removeEventListener('click', click_handler);
		}
	};
}
