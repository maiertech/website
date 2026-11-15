# Hard-code the site origin in `vite.config.ts`

The origin of the site is set as `paths.origin` in `vite.config.ts` and not read from an `ORIGIN`
environment variable. Prerendered routes (feeds, sitemap, and the content layouts) read it through
`url.origin`, which SvelteKit sets to this value during prerendering. We chose this over an env
variable because the value is the same for every build and the site has no form actions or remote
functions that would need a runtime origin, so the value no longer needs to be configured per
environment. The trade-off is that a preview deployment on another domain will still generate
canonical URLs for `maier.tech`, and routes that become dynamic would read the origin from the
request instead.

The app server (`server/index.js`, see [ADR 0002](0002-custom-node-server-entry.md)) also needs the
origin as the target of the `www` redirect. It hard-codes `https://maier.tech` in `server/app.js`,
separately from `vite.config.ts`. Changing the site origin means changing both.
