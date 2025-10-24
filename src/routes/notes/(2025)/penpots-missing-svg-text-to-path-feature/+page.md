---
id: c9dff08a-6e5f-4439-9700-f865d84b10e2
title: "Penpot's missing SVG text-to-path feature"
description:
  "Why Penpot's lack of SVG text-to-path conversion matters for logos, and how to work around it."
publishedDate: 2025-07-15
---

Usually, [Penpot](https://penpot.app/) covers all my SVG creation and editing needs. Penpot fully
embraces CSS. It is essentially CSS with a nice UI. However, it falls short in one crucial area:
text-to-path conversion. To render text in an SVG, Penpot uses the `<text>` element with a `style`
prop containing familiar CSS properties: `font-weight`, `font-size`, and `font-family`. This means
that, in the environment where the SVG is rendered, the font specified by `font-family` must be
available. If it is not, the SVG will not render as intended.

Often, this is not what you want, especially for an SVG logo with text. Imagine a logo that renders
unpredictably because you cannot be sure that users have your specific font installed. The solution
is converting SVG text to a path. Many commercial tools, such as those from Adobe or Figma, offer
text-to-path conversion. Even [Inkscape](https://inkscape.org/), the open-source SVG editor,
supports text-to-path conversion. However, these tools are not my cup of tea (for various reasons).

I do not want to ditch Penpot because of one missing feature, and I hope they will add text-to-path
conversion soon. Until then, I use [Text to SVG](https://text-to-svg.com/) to create SVG font paths.
This works as long as you limit yourself to fonts available from
[Google Fonts](https://fonts.google.com/).
