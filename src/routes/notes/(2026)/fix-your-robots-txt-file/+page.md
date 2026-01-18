---
title: Fix your robots.txt file
description:
  If Google does not index your site, it might be because you don't have a robots.txt file.
publishedDate: 2026-01-18
link: https://www.alanwsmith.com/en/37/wa/jz/s1/
---

This link popped up in my Bluesky feed. Long story short: Google won't index your website if your
site does not serve a `robots.txt` file. That's a little weird because this did not matter in the
past. And many small websites probably don't even have a `robots.txt` file.

`robots.txt` is part of the
[Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html). But it is nothing more
than an unenforced code of conduct pinned to the entrance of your website. Be nice, dear bots, or
else nothing will happen.

If you plan to add a `robots.txt` file to your site, you can
[check an earlier note](/notes/disallowing-ai-bots-in-robots-txt) on how to discourage AI bots from
slurping up content by denying them access to your website in `robots.txt`. Again, this does not
prevent bots from accessing your site, but it makes the house rules clear and possibly legally
enforceable.
