/**
 * Format ISO date string.
 * @param {string} iso_date
 */
export function format(iso_date) {
	return new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium',
		timeZone: 'UTC'
	}).format(new Date(iso_date));
}
