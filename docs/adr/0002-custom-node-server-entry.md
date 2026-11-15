# Run a custom Node server entry point

`www.maier.tech` redirects to `maier.tech` in the app server. Adapter-node's generated
`build/index.js` has no hook for host-based routing, so the start command is `node server/index.js`.
That entry wraps `build/handler.js` in a small `http` server that does the redirect, listens on
`PORT` and `HOST`, and drains active requests on SIGTERM and SIGINT.

The entry ignores adapter-node's own settings (`SOCKET_PATH`, `LISTEN_PID`, `LISTEN_FDS`,
`SHUTDOWN_TIMEOUT`, `IDLE_TIMEOUT`, `KEEP_ALIVE_TIMEOUT`, `HEADERS_TIMEOUT`). At startup it logs a
warning naming any of them that are set, so a setting is never dropped silently.

Nodion does not document these settings as platform-injected. A preview deployment of commit
`18630f9` (a Nodion preview copies the parent app's environment) logged the commit and the listen
line but no warning, so none of them were set. If one is needed later, add it to `server/index.js`
and remove it from the warning list.
