---
title: Nodion
description: How to use Nodion.
---

## CDN zones

There are two ways to configure a CDN zone:

1. **Asset pull CDN**: The CDN does not sit in front of your primary domain. It runs on a separate
   domain, such as `cdn.maier.tech`, and fetches anything it has not cached yet from its origin.

2. **Reverse proxy CDN**: The CDN sits in front of the entire website. DNS for `maier.tech` points
   at the Nodion CDN zone. Anything cached, including HTML, is served by the CDN. Anything else is
   fetched from the origin server.

### Asset pull CDN

To serve a SvelteKit app hosted on Nodion at `maier.tech` through an asset pull CDN, create a CDN
zone with the custom domain `cdn.maier.tech` and the origin `maier.tech`.

Then:

- Update the production deployment to load static assets from `cdn.maier.tech`.
- Add `Access-Control-Allow-Origin` to the CDN zone's response headers. Nodion only supports the
  wildcard value `*`, not a specific origin such as `https://maier.tech`.
- Make the SvelteKit app return 404 for any request to `cdn.maier.tech` that is not meant to be
  served through the CDN. Everything served by `maier.tech` is also reachable at `cdn.maier.tech`,
  so without this you risk a duplicate content penalty.

Caveats with `adapter-node`:

- Static files and prerendered pages are served before SvelteKit's `handle` hook runs, so the 404
  check does not apply to them. Disable prerendering for pages that must not be reachable on
  `cdn.maier.tech`, or block the host in a custom server wrapper.

### Reverse proxy CDN

To use a reverse proxy CDN:

- Remove `maier.tech` from the origin and link it to the CDN zone.
- Make sure the CDN respects origin cache headers.
- Set up canonical URLs correctly. Unlike with the asset pull CDN, the origin URL stays reachable
  and can get indexed, so the canonical URLs must point at `maier.tech`.

Be aware of two limitations:

- **The origin is not locked down.** The origin should accept requests from Nodion only, but Nodion
  has no setting for this. Anyone who knows the origin address can reach it directly.
- **Cookie behavior is unknown.** The Nodion docs do not say whether responses with a cookie are
  cached, and the actual behavior is unclear. Until this is verified, use the reverse proxy CDN only
  for static websites.

## Sandboxes

Sandboxes are short-lived, isolated microVMs for agents. They are not remote development machines:
SSH gives an interactive shell only, not a full SSH server.

There are two ways to use them:

1. **Run the agent inside the sandbox.** Open the web terminal or SSH in, clone the repository, and
   start the agent there. Dev servers are reachable through HTTPS previews, but this approach leaves
   a lot to be desired.

2. **Drive the sandbox from a local agent.** Use the Nodion MCP server or CLI to delegate work to a
   sandbox. The agent itself still runs on your machine.
