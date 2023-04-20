import topics from '$lib/data/topics';

/** @param {string} topic  */
export function resolve(topic) {
	return topics.find((t) => t.id === topic);
}
