---
title: How to record a crisp coding screencast
author: thilo
date: 2021-12-01
updated: 2021-12-01
description: To be done.
category: creating-content
tags:
  - screencasting
---

<script context="module">
  import { Image } from '@joeinnes/svelte-image';
  export const prerender = true;
</script>

## Understanding HiDPI displays and aspect ratios

When recording a screencast, you should aim for a 16:9 aspect ratio, which is
[YouTube's default aspect ratio](https://support.google.com/youtube/answer/6375112).
YouTube defines the following 16:9 resolutions:

| Name            | Resolution   | Ratio |
| :-------------- | :----------- | :---- |
| 2160p (4K)      | 3840 by 2160 | 16:9  |
| 1440p (Quad HD) | 2560 by 1440 | 16:9  |
| 1080p (Full HD) | 1920 by 1080 | 16:9  |
| 720p (HD)       | 1280 by 720  | 16:9  |

A coding screencast in 2021 should be at least 1080p or higher to ensure that
code is crisp and easy to read. The screen of a MacBook Air M1, which I use to
record my screencasts, has a 16:10 aspect ratio. This means that you cannot just
do a fullscreen recording.

A MacBook Air M1's default resolution is 1440 by 900 (16:10) HiDPI. At first
glance, it looks like this is not even evough to record 1080p. But the 1440 by
900 resolution is a scaled resolution, i.e. there are more physical pixels than
logical pixels.

<figure>
  <Image
    src="https://assets.maier.tech/img/macos-scaled-resolutions-dark-3fb8.png"
    alt="Screenshot of display settings in macOS system preferences."
    aspectRatio="1336/864"
    objectFit="cover"
    loading="lazy"
    hidpi={true}
  />
  <figcaption>The default resolution is a 1440 by 900 scaled resolution.</figcaption>
</figure>

you run into has a native resolution of 2560 by 1600 (16:10, not 16:9). Scaled
resolutions:

| Resolution   | Ratio | Factor | Comment |
| ------------ | ----- | ------ | ------- |
| 2560 by 1600 | 16:10 | 1.0    | native  |
| 1680 by 1050 | 16:10 | 1.52   | scaled  |
| 1440 by 900  | 16:10 | 1.77   | default |

Scaled resolutions scale with factors less than 2, i.e. they cannot double pixel
density.

The final recording should be at least 1080p. If you have a big screen, you
should at least double your length and width. On my MacBook Air M1, I do not
have enough pixels to double length and width:

| Scaled resolution | Ratio | Actual resolution          | Qualifies as | Comment                                                 |
| ----------------- | ----- | -------------------------- | ------------ | ------------------------------------------------------- |
| 1440 by 810       | 16:9  | 2560 by 1440 (factor 1.77) | 1440p        | Max. 16:9 resolution that fits into default resolution. |
| 1280 by 720       | 16:9  | 2275 by 1280 (factor 1.77) | 1080p        | Bigger than 1080p, but smaller than 1440p.              |
