/** @param {import('$lib/types').Schema} thing */
export default function serialize_schema(thing) {
	return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`;
}
