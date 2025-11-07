---
title: Vercel deployment protection bypass
description:
  "Learn how to bypass Vercel deployment protection for deploy previews that break your website's
  internal API fetch requests using automation secrets."
publishedDate: 2025-08-17
link: https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
---

Vercel protects deploy previews by default. You need to be logged in to access them. This is a good
thing because deploy previews are often works in progress and should not be publicly accessible.

Sometimes, a protected deploy preview breaks the deployed website. One example I encountered with
SvelteKit was `fetch` requests that access an internal API. Protected deploy previews break these
`fetch` requests because they happen without authentication.

This might indicate that I am using SvelteKit the wrong way. For example, prerendering is often an
option to avoid making `fetch` requests to internal APIs at runtime. With prerendering, they run
once during the build.

But there may still be a legitimate use case for making such requests. And for this case, Vercel has
you covered. You can set the environment variable `VERCEL_AUTOMATION_BYPASS_SECRET` in the dashboard
and then add the custom header `x-vercel-protection-bypass` to your requests:

```ts
const response = await fetch(endpoint, {
	headers: {
		'x-vercel-protection-bypass': VERCEL_AUTOMATION_BYPASS_SECRET
	}
});
```
