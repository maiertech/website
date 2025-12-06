import { allAuthors } from 'content-collections';

export const sorted = allAuthors.toSorted((a, b) => {
	return a.name.localeCompare(b.name);
});
