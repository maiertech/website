---
title: Nodion
description: How to use Nodion.
---

## CDN zones

There are two ways to configure a CDN zone:

1. **Asset pull CDN**: DNS for `maier.tech` points to a Nodion app. The CDN does not sit in front of
   the Nodion app. It runs on a separate domain, such as `website.nodioncdn.net`, and fetches
   anything it has not cached yet from the CDN's origin.

2. **Reverse proxy CDN**: The CDN sits in front of the entire Nodion app. DNS for `maier.tech`
   points at the Nodion CDN zone, not at the Nodion app. Anything that gets cached, including HTML,
   is served by the CDN.

### Asset pull CDN for a SvelteKit app

Let's see whether Nodion's asset pull CDN is compatible with a SvelteKit app that uses adapter-node.
We would deploy the SvelteKit app as Nodion app and point `maier.tech` at it. Certain assets from
the SvelteKit app are suitable to be served from a CDN, for example, anything in `_app/immutable/`
or prerendered pages.

Adapter-node assumes that it is the point of entry to the app and decides what to serve for each
route. It is oblivious to the existence of a CDN and what should or should not be cached. So, when
we make the SvelteKit app with adapter-node the origin of a Nodion CDN zone, it will just serve the
entire build from the origin URL.

Ideally, we would like to have full control over which files the CDN origin serves. This could
either be achieved with a custom adapter or by allowing or denying certain paths on the CDN origin.
With the current Nodion setup it is all or nothing for the CDN origin.

### Reverse proxy CDN

For a reverse proxy CDN, we would point `maier.tech` at the CDN Zone. The SvelteKit app would be
served from a different URL, e.g. `website.nodioncdn.net`. Nodion makes this URL publicly available,
which means the entire SvelteKit app is served from two URLs.

Ideally, the origin URL would be available only via Nodion's internal network since it is meant to
be accessed by the CDN zone only. As with an asset pull CDN, adapter-node controls routing within
the SvelteKit app, but this should be controlled by the infrastructure around the app.

## Sandboxes

Sandboxes are short-lived, isolated microVMs for agents. They are not remote development machines:
SSH gives an interactive shell only, not a full SSH server.

There are two ways to use them:

1. **Run the agent inside the sandbox.** Open the web terminal or SSH in, clone the repository, and
   start the agent there. Dev servers are reachable through HTTPS previews, but this approach leaves
   much to be desired.

2. **Drive the sandbox from a local agent.** Use the Nodion MCP server or CLI to delegate work to a
   sandbox. The agent itself still runs on your machine.
