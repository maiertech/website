/**
 * @param {HTMLElement} element
 * @param {number} delay
 */
export default function (element, delay) {
	setTimeout(() => {
		element.dispatchEvent(new CustomEvent('custom:timeout', { detail: delay }));
	}, delay);
}
