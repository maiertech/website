import { allTags } from 'content-collections';

export const sorted = allTags.toSorted((a, b) => {
	return a.label.localeCompare(b.label);
});
