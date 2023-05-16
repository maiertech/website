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
 * @prop {import('@stackblitz/sdk').Project | string} project
 * @prop {import('@stackblitz/sdk').EmbedOptions} options
 * @prop {Callback} [cb]
 */

/**
 * @param {HTMLElement} node
 * @param {Params} params
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
		/** @param {Params} params */
		update(params) {
			({ project, options, cb } = params);
		}
	};
}
