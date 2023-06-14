/**
 * @param {HTMLElement} element - Element to which action is applied.
 * @param {string} text - Text to be copied.
 * @returns {import('svelte/action').ActionReturn} Action return object with update and destroy methods.
 */
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
		/** @param {string} t - Updated text. */
		update(t) {
			text = t;
		},
		destroy() {
			element.removeEventListener('click', click_handler);
		}
	};
}
