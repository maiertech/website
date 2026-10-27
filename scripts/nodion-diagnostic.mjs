// Temporary spike diagnostic for issue #1306. Do not merge.

const names = ['NODION_GIT_SHA', 'NODION_GIT_SHA_SHORT'];

console.log('=== Nodion diagnostic ===');

for (const name of names) {
	const value = process.env[name];
	console.log(value === undefined ? `${name}: not set` : `${name}: set to "${value}"`);
}

const others = Object.keys(process.env)
	.filter((name) => name.startsWith('NODION_') && !names.includes(name))
	.sort();

console.log(`Other NODION_* variables (${others.length}):`);

for (const name of others) {
	console.log(`- ${name}`);
}

console.log('=== End Nodion diagnostic ===');
