import topics from '$lib/data/topics';

/**
 * @param {string} topic - A topic id.
 * @returns {import('$lib/types').Topic | undefined} The resolved topic or undefined if topic not found.
 */
export function resolve_topic(topic) {
	return topics.find((t) => t.id === topic);
}

/**
 * @param {string[]} topics - Array of topic ids.
 * @returns {import('$lib/types').Topic[]} Array of resolved topics (no element is undefined).
 */
export function resolve_topics(topics) {
	return topics
		.map((topic) => resolve_topic(topic))
		.filter(
			/**
			 * Filter undefined. Type guard ensures that topic is inferred correctly.
			 * @type {import('$lib/types').NotUndefined<import('$lib/types').Topic>}
			 */
			function is_topic(topic) {
				return Boolean(topic);
			}
		);
}
