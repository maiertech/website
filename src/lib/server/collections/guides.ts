import { allGuides } from 'content-collections';

// Sort alphabetically by title.
export const sorted = allGuides.toSorted((a, b) => {
	return a.title.localeCompare(b.title);
});
