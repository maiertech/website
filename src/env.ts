import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ NODION_GIT_SHA: { public: false, static: true } });
