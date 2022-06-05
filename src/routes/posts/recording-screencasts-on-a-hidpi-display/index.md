---
title: Recording screencasts on a HiDPI display
author: thilo
published: 2022-06-05
modified: 2022-06-05
description:
  This post explains why understanding the difference between scaled resolution
  and actual resolution matters when recording a screencast on a HiDPI display.
series: screencast-series
category: content-creation
---

<script>
  import Image from '$lib/components/image.svelte';
  import ScaledPixelSVG from './_scaled-pixel.svelte';

  // Provided by page endpoint.
  export let images;
</script>

Before recording a screencast, you need to decide to which platform you will
publish and which resolution your final video should have. Publishing to
[YouTube](https://www.youtube.com/) is a great way to get started since it
serves videos at zero bandwidth cost.

## Choosing aspect ratio and resolution

Each platform has its own preferred aspect ratio and resolution for video
uploads.
[YouTube's default aspect ratio](https://support.google.com/youtube/answer/6375112)
is 16:9, i.e. the pixel ratio of width to height in your final video should be
16:9. The following table shows recommended resolutions for YouTube for
high-definition (HD) video with 16:9 aspect ratio:

<figure>

| Name    | Alternate name | Resolution   |
| :------ | :------------- | :----------- |
| 4K      | 2160p          | 3840 by 2160 |
| Quad HD | 1440p          | 2560 by 1440 |
| Full HD | 1080p          | 1920 by 1080 |
| HD      | 720p           | 1280 by 720  |

<figcaption>Recommended HD 16:9 video resolutions for YouTube.</figcaption>
</figure>

You can refer to a video as _Full HD_ if its aspect ratio is 16:9 with a
resolution of at least 1920 by 1080. The resolution can be higher, e.g. a
resolution of 2304 by 1296 is higher than the minimum for Full HD, but falls
short of the minimum for Quad HD. Therefore, a 2304 by 1296 video is Full HD
only. A coding screencast should be at least Full HD to ensure that code is
crisp and easy to read.

## Scaled resolution vs. actual resolution

When recording on a HiDPI display (also advertised as Retina display), such as
the affordable
[LG Ultra HD 24UD58-B](https://www.lg.com/us/monitors/lg-24UD58-B-4k-uhd-led-monitor),
you need to familiarize yourself with the difference between _scaled resolution_
and _actual resolution_. The LG Ultra HD's actual resolution (physical pixels)
is 3840 by 2160. If macOS used this resolution, fonts would appear tiny and hard
to read. Therefore, macOS uses a scaled resolution, which for the LG Ultra HD
defaults to 1920 by 1080.

Scaled resolution means that one pixel of the scaled resolution corresponds to
multiple actual pixels. For the 1920 by 1080 scaled resolution on the LG Ultra
HD, every width or height pixel is replaced with two actual width or height
pixels. The ratio between scaled and actual width/height pixels is called
_device pixel ratio_ (DPR), which in this example is 2. For DPR 2, one scaled
pixel consists of four actual pixels as shown in this graphic:

<figure>

<ScaledPixelSVG />

<figcaption>A scaled pixel on a display with DPR 2.</figcaption>
</figure>

MacOS always uses the default scaled resolution, unless you choose another
scaled resolution in _Displays_ in _System Preferences_:

<figure>

<Image ratio={1336/708} alt="Screenshot of display preferences on macOS."
src={images[`display-preferences-light`].src}
srcset={images[`display-preferences-light`].srcset} loading="lazy" />

<figcaption>MacOS lets you choose your preferred scaled resolution.</figcaption>
</figure>

Depending on which scaled resolution you choose, you get a different DPR:

<figure>

| Resolution   | DPR | Description                     |
| ------------ | --- | ------------------------------- |
| 3840 by 2160 | 1   | Actual resolution (More Space). |
| 2560 by 1440 | 1.5 | Scaled Quad HD.                 |
| 1920 by 1080 | 2   | Scaled Full HD (Default).       |

<figcaption>DPRs for different resolutions for the LG Ultra HD.</figcaption>
</figure>

Note that DPR does not have to be an integer. For non-integer DPR, there is no
straightforward substitution of pixels like for DPR 2, where one scaled pixel
corresponds to four actual pixels. No matter what DPR, macOS knows how to map
scaled pixels to actual pixels.

The reason why photos and videos look super crisp on HiDPI displays is that
applications can use the actual pixels instead of scaled pixels for parts of the
screen. This enables applications to render more details, e.g. higher resolution
photos or videos. It's almost as if an application has additional pixels up its
sleeve, which it can use when it makes sense.

## Why DPR matters for screen recording

[Egghead.io](https://egghead.io/), a learning platform, coaches their
instructors on how to record a coding screencast in their article
[Prepare your desktop environment for screencasting code](https://howtoegghead.com/instructor/screencasting/screen-setup/).
The article states that egghead.io serves videos as Full HD, which corresponds
to a 1920 by 1080 actual resolution. But they recommend recording at 1280 by 720
(in HiDPI mode), which sounds like a contradiction.

You need to know that some screen recorders, e.g.
[QuickTime](https://support.apple.com/guide/mac-help/take-a-screenshot-or-screen-recording-mh26782/mac),
[ScreenFlow](https://www.telestream.net/screenflow/) or
[Cleanshot X](https://cleanshot.com/), record actual pixels, not just scaled
pixels. If you record a 1280 by 720 portion of the LG Ultra HD at default scaled
resolution, these screen recorders record 2560 by 1440 actual pixels. This is
Quad HD, but not enough for 4K.

If you would like to serve videos in 4K, you have to to record at 1920 by 1080
scaled resolution. With DPR 2, actual pixels for width and height double. This
results in a 3840 by 2160 resolution for the final video. On my LG Ultra HD,
this means that I have to record the entire screen. Whatever screen recorder you
choose, make sure it supports HiDPI displays, i.e. it records actual pixels
instead of scaled pixels.

## Mind the aspect ratio on MacBooks

If you do not have an external HiDPI display, you can record a coding screencast
on your MacBook's Retina display. However, on my MacBook Air M1 the aspect ratio
is 16:10 and not 16:9. As of macOS 12.4, there is no way to set a 16:9
resolution for the built-in display. The other surprise is that the DPR of the
default scaled resolution is 2560/1440 = 16/9 = 1.7777778 (_less_ than 2):

<figure>

| Resolution   | DPR  | Description                  |
| ------------ | ---- | ---------------------------- |
| 2560 by 1600 | 1    | Actual resolution.           |
| 1440 by 900  | 16/9 | Scaled resolution (Default). |

<figcaption>Actual resolution and default scaled resolution on the MacBook Air M1.</figcaption>
</figure>

In order to record a 16:9 screencast on a MacBook Air M1 with default scaled
resolution, you have two options:

1. **Record a 1280 by 720 portion:** With DPR 16/9, the resolution of the
   recording would be 2275 by 1280. This is lower than what you get when
   recording the same 1280 by 720 portion on the LG ULtra HD, but it's still
   better than Full HD.
1. **Record a 1440 by 810 portion:** This is the largest 16:9 area that fits on
   the MacBook Air M1 built-in display using the default scaled resolution. With
   DPR 16/9, the resolution of the recording would be 2560 by 1440 (Quad HD, but
   not 4K). Unfortunately, this means that on a MacBook Air M1 built-in display
   you cannot record a 4K screencast.

One downside of recording only a portion of your screen instead of full screen
is that you have to place and size your windows inside the recording area. In my
everyday work I manage windows with
[Raycast's window management extension](https://www.raycast.com/extensions/window-management/),
which makes placing windows on a desktop a breeze. However, window placement is
always relative to the entire desktop. Therefore, window managers are not
suitable for placing windows inside the recording area.

I will discuss how I prepare my screen for recording in a subsequent post and
will introduce you to a tool with which you can snap windows into defined slots
inside the recording area.

## Record full screen 16:9 on a MacBook's built-in display

Some of the best creators of screencasts prefer recording full screen as
[this Twitter thread shows](https://twitter.com/simonswiss/status/1460847167145275403).
With my LG Ultra HD it's no problem to record 16:9 full screen. But on the
built-in 16:10 display you need a workaround, because macOS does not allow you
to change the resolution to a 16:9 resolution. But you can always connect to an
external display with a different resolution and mirror it back to your built-in
display. This is the idea of
[BetterDummy](https://github.com/waydabber/BetterDummy). It lets you create a
16:9 dummy display and mirror it back to your built-in display. You can then do
a 16:9 full screen recording on the dummy screen mirrored to your built-in
display.

I do not recommend it, because in my opinion, this hack adds friction to your
screen recording workflow. And I am usually recording on my LG ULtra HD anyway,
which has 16:9 aspect ratio.
