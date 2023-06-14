/**
 * @param {HTMLElement} element - Element to which action is applied.
 * @param {number} delay - Delay in milliseconds.
 */
export default function (element, delay) {
	setTimeout(() => {
		element.dispatchEvent(new CustomEvent('custom:timeout', { detail: delay }));
	}, delay);
}
