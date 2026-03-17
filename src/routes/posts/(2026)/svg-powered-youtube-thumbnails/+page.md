---
title: SVG-powered YouTube thumbnails
author: thilo
publishedDate: 2026-03-23
description:
  Learn how to use Boxy SVG to create professional YouTube thumbnails from SVG files without design
  skills.
tags:
  - content-creation
  - web-fundamentals
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
	import BoxySvgImage from './BoxySvgImage.svelte';
</script>

Whenever I uploaded a video to my [YouTube channel](https://www.youtube.com/@maiertech) as the
result of a longer or shorter planning and production process, I got hung up on the thumbnail. Not
only would I get hung up on what should be on the thumbnail but also on how to create it.

I can't say much on the first part. You can watch hours of YouTube videos on what makes up a perfect
thumbnail. There are a lot of opinions on that. But in the end, a mediocre thumbnail created today
is better than a perfectly conceived thumbnail you never get around to creating.

With regard to the second part, how to create a thumbnail, I have tried different approaches.
[Canva](https://www.canva.com/) or [Adobe Express](https://www.adobe.com/express/) are certainly
options. But I am not keen on tiptoeing around the limitations of their free plans. I also do not
want to learn a pro tool like [Affinity](https://www.affinity.studio/) or an open source alternative
like [GIMP](https://www.gimp.org/) with much less polish.

Since I prefer a vector-based approach to creating graphics, I decided to stick with a standard
hidden in plain sight: SVG. SVG is an XML-based vector graphics format that can not only be used by
graphics manipulation tools but it can also be edited manually by humans with an editor. If you are
not familiar with SVG, read Josh Comeau's
[A Friendly Introduction to SVG](https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/).

While many vector graphics tools can export to SVG (producing more or less clean SVG files), I found
only two that use SVG as their native format: [Boxy SVG](https://boxy-svg.com/) and
[Inkscape](https://inkscape.org/). I chose Boxy SVG because I found its learning curve to be less
steep than Inkscape's and it supports all of Google's fonts out of the box.

<Figure caption="The Boxy SVG UI with the SVG elements view open." class="mb-8">
  <BoxySvgImage />
</Figure>

The cool thing about Boxy SVG is that with the element view open, you can learn SVG syntax on the
fly. Boxy SVG produces very clean SVGs, so there is no need to manually clean up the SVG files it
produces. You can edit SVG files manually in an editor like VS Code and add them to version control.
When done editing, hit **File → Reload** and Boxy SVG will update the image.

When I create a new YouTube thumbnail, I start with an SVG template. The template makes it easy to
maintain a consistent look across all thumbnails. Here is the simplified version of the SVG template
that I use:

```xml
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" xmlns:bx="https://boxy-svg.com">
  <defs>
    <style bx:fonts="Roboto">@import url(https://fonts.googleapis.com/css2?family=Roboto%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;display=swap);</style>
    <linearGradient id="ink" bx:pinned="true" gradientUnits="userSpaceOnUse">
      <title>ink</title>
      <stop style="stop-color: oklch(0.984 0.003 248);"/>
    </linearGradient>
    <linearGradient id="primary" bx:pinned="true" gradientUnits="userSpaceOnUse">
      <title>primary</title>
      <stop style="stop-color: oklch(0.882 0.059 254);"/>
    </linearGradient>
    <linearGradient id="ink-muted" bx:pinned="true" gradientUnits="userSpaceOnUse">
      <title>ink-muted</title>
      <stop style="stop-color: oklch(0.707 0.022 261);"/>
    </linearGradient>
    <bx:export>
      <bx:file format="png" path="thumbnail.png">
        <bx:variant scale="2" suffix="@2x"/>
      </bx:file>
    </bx:export>
  </defs>
  <text style="fill: url(&quot;#primary&quot;); font-family: Roboto; font-size: 42.2px; font-weight: 700; white-space: pre; text-decoration: underline;" x="1010.67" y="96.837">
  <title>maier.tech</title>maier.tech</text>
</svg>
```

Boxy SVG comes with a few DX goodies. It uses the above `linearGradient` elements to define reusable
colors. It adds custom XML elements and properties that are prefixed with `bx:`. They are read out
and used by the Boxy SVG UI, e.g. to pin colors, and will be ignored if you render the SVG outside
of Boxy SVG.

If you hand-coded an SVG file, you could define reusable colors more elegantly with CSS variables
instead of `linearGradient` elements. But since I want to be able to edit SVG files with a UI, I
need to stick with how Boxy SVG does it.

What's really cool about editing thumbnails as SVG is that you can import any SVG file. For
instance, you can import any icon from [Iconify Design](https://iconify.design/). This makes it a
breeze to put together a decent looking thumbnail in no time, even if you are not a designer.
Whatever icons you use, make sure that you comply with their license.

Last but not least, I use the `bx:export` element to define export settings when exporting an SVG to
a PNG file. In the above example, Boxy SVG creates two files: `thumbnail.png` with the viewbox
resolution of 1280 by 720 and `thumbnail@2x.png`, which doubles length and height. That's the nice
thing about using SVG: the dimensions are infinitely scalable.
