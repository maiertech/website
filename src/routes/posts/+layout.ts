// Prerendering is turned off for posts.
// `transformPostWithLastmodDate` gets `GITHUB_TOKEN` from `$env/dynamic/private`,
// which is not available during prerendering.
// TODO: Assess the risks of `$env/static/private` for Docker hosting.
export const prerender = false;
