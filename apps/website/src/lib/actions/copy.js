/**
 * @param {HTMLElement} element
 * @param {string} text
 */
export default function (element, text) {
	async function clickHandler() {
		if (text) {
			try {
				await navigator.clipboard.writeText(text);
				element.dispatchEvent(new CustomEvent('custom:copied', { detail: text }));
			} catch (e) {
				element.dispatchEvent(new CustomEvent('custom:copied:error', { detail: e }));
			}
		}
	}

	element.addEventListener('click', clickHandler);

	return {
		/** @param {string} t */
		update(t) {
			text = t;
		},
		destroy() {
			element.removeEventListener('click', clickHandler);
		}
	};
}
