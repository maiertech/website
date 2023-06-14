import sdk from '@stackblitz/sdk';

/**
 * @typedef {import('@stackblitz/sdk').VM} VM
 */

/**
 * @callback Callback
 * @param {Promise<VM>} vm_promise
 */

/**
 * @typedef {object} Params
 * @property {import('@stackblitz/sdk').Project | string} project - StackBlitz project.
 * @property {import('@stackblitz/sdk').EmbedOptions} options - Embed options for StackBlitz project.
 * @property {Callback} [cb] - Callback to run when project has been launched.
 */

/**
 * @param {HTMLElement} node - Node to which action is applied.
 * @param {Params} params - Parameters for StackBlitz embed.
 * @returns {import('svelte/action').ActionReturn} Action return object with update method.
 */
export default function (node, { project, options, cb }) {
	/** @type {Promise<VM>} */
	let promise_vm;

	if (typeof project === 'string') {
		promise_vm = sdk.embedGithubProject(node, project, options);
	} else {
		promise_vm = sdk.embedProject(node, project, options);
	}

	if (cb) {
		cb(promise_vm);
	}

	return {
		/** @param {Params} params - Updated parameters for StackBlitz embed. */
		update(params) {
			({ project, options, cb } = params);
		}
	};
}
