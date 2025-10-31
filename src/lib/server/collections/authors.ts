import { allAuthors } from 'content-collections';

export const all = allAuthors.toSorted((a, b) => {
	return a.name.localeCompare(b.name);
});
