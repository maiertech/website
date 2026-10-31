import { spawn } from 'node:child_process';

// `check` and `knip` fail without these; CI sets them from its own environment.
const env = { NODION_GIT_SHA: 'local', ...process.env };

interface StepResult {
	script: string;
	ok: boolean;
	output: string;
}

function run(script: string): Promise<StepResult> {
	return new Promise((resolve) => {
		const child = spawn('pnpm', ['run', script], { env, stdio: ['ignore', 'pipe', 'pipe'] });
		let output = '';
		child.stdout.on('data', (chunk) => (output += chunk));
		child.stderr.on('data', (chunk) => (output += chunk));
		child.on('close', (code) => resolve({ script, ok: code === 0, output }));
	});
}

async function runInOrder(scripts: string[]): Promise<StepResult[]> {
	const results: StepResult[] = [];
	for (const script of scripts) {
		results.push(await run(script));
	}
	return results;
}

const generation = await run('generate');
const dependents = ['check', 'knip'];

// `check` and `knip` both run `svelte-kit sync`, which fails when they run concurrently.
const linting = run('lint');
const typesAndDeadCode = generation.ok ? runInOrder(dependents) : Promise.resolve([]);
const results = [generation, await linting, ...(await typesAndDeadCode)];
const skipped = generation.ok ? [] : dependents;

for (const result of results) {
	if (result.ok) {
		console.log(`✓ ${result.script}`);
	} else {
		console.log(`✗ ${result.script}\n${result.output}`);
	}
}

for (const script of skipped) {
	console.log(`- ${script} skipped because generate failed`);
}

const failures = results.filter((result) => !result.ok).length + skipped.length;

if (failures > 0) {
	console.log(`\n${failures} step(s) failed`);
	process.exitCode = 1;
} else {
	console.log('\nAll steps passed');
}
