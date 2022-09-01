import { matchSlug } from '$lib/utils/matchers';
import { metadata } from '$posts/[slug=rec_screencasts_on_hidpi_display]/+page.svx';

export function match(param: string) {
	return matchSlug(param, metadata);
}
