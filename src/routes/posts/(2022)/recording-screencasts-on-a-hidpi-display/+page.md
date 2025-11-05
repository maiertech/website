---
title: Recording screencasts on a HiDPI display
author: thilo
publishedDate: 2022-06-05
description:
  This post explains how to record crisp screencasts on HiDPI displays, covering resolutions, aspect
  ratios, and device pixel ratio for best video quality.
tags:
  - content-creation
---

<script>
	import { Figure } from '@maiertech/sveltekit-helpers';
	import DisplayPreferencesImage from './DisplayPreferencesImage.svelte';
	import ScaledPixelSVG from './scaled-pixel.svelte';
</script>

Before recording a screencast, choose the target platform. [YouTube](https://www.youtube.com/) is a
great way to get started because it serves videos at zero bandwidth cost. Each platform has a
preferred aspect ratio and resolution for video uploads.
[YouTube's default aspect ratio](https://support.google.com/youtube/answer/6375112) is 16:9. The
pixel ratio of width to height in your final video should be 16:9. The following table shows
recommended resolutions for YouTube:

<Figure caption="Recommended 16:9 video resolutions for YouTube." class="mb-8">

| Name    | Alternate name | Resolution   |
| :------ | :------------- | :----------- |
| 4K      | 2160p          | 3840 by 2160 |
| Quad HD | 1440p          | 2560 by 1440 |
| Full HD | 1080p          | 1920 by 1080 |
| HD      | 720p           | 1280 by 720  |

</Figure>

You can refer to a video as _Full HD_ if its aspect ratio is 16:9 with a resolution of at least 1920
by 1080. The resolution can be higher; for example, 2304 by 1296 is higher than Full HD but still
falls short of Quad HD.

**A coding screencast should be at least Full HD to ensure that the code is crisp and easy to
read.**

## Scaled resolution vs. actual resolution

When you record on a HiDPI display, you must understand the difference between _scaled_ and _actual_
resolution. I record on the affordable
[LG Ultra HD 24UD58-B](https://www.lg.com/us/monitors/lg-24UD58-B-4k-uhd-led-monitor). Its
physical-pixel resolution is 3840 by 2160. If macOS used this resolution directly, fonts would
appear tiny and hard to read. Therefore, macOS uses a scaled resolution; for the LG Ultra HD the
default scaled resolution is 1920 by 1080.

One scaled pixel corresponds to multiple physical pixels. On the LG Ultra HD with a 1920 by 1080
scaled resolution, each scaled pixel is represented by two physical pixels in width and two in
height. The ratio between scaled and actual width/height pixels is called the _device pixel ratio_
(DPR). In this example the DPR is 2, so one scaled pixel consists of four physical pixels, as shown
in this graphic:

<Figure caption="A scaled pixel on a display with DPR 2." class="mb-8">
	<ScaledPixelSVG />
</Figure>

macOS always uses the default scaled resolution unless you choose a different one:

<Figure caption="macOS lets you choose your preferred scaled resolution." class="mb-8">
	<DisplayPreferencesImage />
</Figure>

Depending on the scaled resolution you choose, you get a different DPR. DPR does not have to be an
integer:

<Figure caption="DPRs for different resolutions for the LG Ultra HD." class="mb-8">

| Resolution   | DPR | Description                    |
| :----------- | :-- | :----------------------------- |
| 3840 by 2160 | 1   | Actual resolution (More Space) |
| 2560 by 1440 | 1.5 | Scaled Quad HD                 |
| 1920 by 1080 | 2   | Scaled Full HD (Default)       |

</Figure>

Applications can use physical pixels instead of scaled pixels for parts of the screen, which is why
photos and videos look crisp on HiDPI displays. It's almost as if an application has more pixels up
its sleeve that it can use when appropriate.

## Why DPR matters for screen recording

In [this article](https://howtoegghead.com/instructor/screencasting/screen-setup/), egghead.io
explains how to record a screencast. The article states that egghead.io serves videos in Full HD
(1920 by 1080), yet recommends recording at 1280 by 720 (in HiDPI mode), which sounds contradictory.

Some screen recorders capture physical pixels instead of scaled pixels. They record 2560 by 1440
physical pixels when you record 1280 by 720 scaled pixels. The captured resolution is Quad HD, but
you need a higher resolution to get 4K. Examples of screen recorders that capture physical pixels
include
[QuickTime](https://support.apple.com/guide/mac-help/take-a-screenshot-or-screen-recording-mh26782/mac),
[ScreenFlow](https://www.telestream.net/screenflow/) and [Cleanshot X](https://cleanshot.com/).

To serve 4K videos, you must record at 1920 by 1080 scaled resolution. With DPR 2, actual pixels for
width and height double, resulting in 3840 by 2160 for the final video. On my LG Ultra HD, I have to
record the entire screen.

**When you choose a screen recorder, verify that it supports HiDPI displays and records actual
pixels instead of scaled pixels.**

## Mind the aspect ratio on MacBooks

If you don't have an external HiDPI display, you can record a screencast on your MacBook's Retina
display. On my MacBook Air M1 the aspect ratio is 16:10, not 16:9. As of macOS 12.4, there is no way
to set a 16:9 resolution for the built-in display. Another surprise is that the DPR of the default
scaled resolution is 2560/1440 = 16/9 = 1.7777778 (less than 2):

<Figure
	caption="Actual resolution and default scaled resolution on the MacBook Air M1."
	class="mb-8"
>

| Resolution   | DPR  | Description               |
| :----------- | :--- | :------------------------ |
| 2560 by 1600 | 1    | Actual resolution         |
| 1440 by 900  | 16/9 | Default scaled resolution |

</Figure>

To record a 16:9 screencast on a MacBook Air M1 with the default scaled resolution, you have two
options:

1. **Record a 1280 by 720 portion:** With a DPR of 16/9, the recording's resolution would be 2275 by
   1280, which is lower than what you get with the LG Ultra HD but still better than Full HD.
2. **Record a 1440 by 810 portion:** This is the largest 16:9 area that fits on the MacBook Air M1
   built-in display (using the default scaled resolution). With a DPR of 16/9, the recording's
   resolution would be 2560 by 1440 (Quad HD, not 4K). Therefore, on a MacBook Air M1's built-in
   display you cannot record a 4K screencast.

When you record a portion of your screen, you must place and size windows inside the recording area.
I manage windows with
[Raycast's window management extension](https://www.raycast.com/extensions/window-management/),
which makes placing windows on a desktop a breeze. However, window placement is relative to the
entire desktop, so window managers are not suitable for placing windows precisely inside a recording
area.

## Record full screen 16:9 on a MacBook's built-in display

Many screencast creators prefer recording the entire screen, as
[this Twitter thread shows](https://twitter.com/simonswiss/status/1460847167145275403). With my LG
Ultra HD, it is no problem to record 16:9 full screen. But when you record on the built-in 16:10
MacBook display, macOS does not allow you to change the resolution to a 16:9 ratio. But you can
always connect to an external display with a different resolution and mirror it to your built-in
display.

[BetterDummy](https://github.com/waydabber/BetterDummy) can do this virtually: it lets you create a
16:9 dummy display and mirror it to your built-in display. You can then record 16:9 full screen on
the mirrored dummy screen.
