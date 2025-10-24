---
id: b6a143e6-d816-4dd8-9ef4-7522c71bed86
title: 'Environment variables in VS Code'
description:
  'Instead of setting environment variables in your terminal, you can also set them in your user
  settings.json in VS Code.'
publishedDate: '2025-03-06'
---

Instead of setting environment variables in your terminal, you can also set them in your user
`settings.json` in VS Code. Here is an example for a `GITHUB_TOKEN`:

```json
"terminal.integrated.env.osx": {
  "GITHUB_TOKEN": "ghp_aBc1dEfGhIjKlMnOpQrStUvWxYz0123456789"
}
```

With settings sync active in VS Code, you can take your environment variables with you when working
on another machine.
