/**
 * Serialize a schema.
 * @param {import('schema-dts').Thing} thing Schema.
 * @returns {string} Serialized schema.
 */
export default function serializeSchema(thing) {
	return `<script type="application/ld+json">
${JSON.stringify(thing, null, 2)}
</script>`;
}
