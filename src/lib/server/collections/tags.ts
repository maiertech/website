import { allTags } from 'content-collections';

export const all = allTags.toSorted((a, b) => {
	return a.label.localeCompare(b.label);
});
