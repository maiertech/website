---
title: The privacy-friendly video doorbell that failed in cold weather
author: thilo
publishedDate: 2026-01-10
description:
  A Reolink video doorbell promised to be privacy-friendly, but failed in cold weather with poor
  event detection and severe battery drain.
tags:
  - iot
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
	import DoorbellImage from './DoorbellImage.svelte';
</script>

During the holidays, I installed a
[Reolink Video Doorbell (Battery)](https://reolink.com/nl/product/reolink-doorbell-battery/) on my
front door. After a honeymoon that lasted a few days, winter came to the Netherlands and with
freezing temperatures my excitement for this doorbell quickly reached a freezing point. But more on
that in a minute.

About 2 years ago, I had a
[Google Nest Doorbell (Battery)](https://store.google.com/product/nest_doorbell_battery?hl=nl) for
about 6 months. After the first mild Dutch winter, its image started flickering and when I removed
it for a reset, the mounting mechanism broke. A common problem with this model. To Google's credit,
I received a full refund. But I started to wonder whether it's a good idea to install an IoT device
in a spot where it is exposed to the full range from dry freezing cold to scorching hot humid
weather with direct sun exposure and occasional heavy rain splashes.

Fast forward to late 2025. I wanted to give a video doorbell another try. But this time, I wanted to
bypass Big Tech and go for a model that works locally without subscription and without the cloud.
After digging through endless negative doorbell reviews, I settled on Reolink. Their battery
doorbell ticked all the boxes: local storage, no subscription required, optional wired installation,
works with my mechanical chime, battery-powered (in case of a power outage), and affordable. And a
beautiful piece of hardware, IP65 rated, that works in a temperature range from -10°C to +55°C. At
least that's what the specs say.

<Figure caption="The Reolink Video Doorbell (Battery) looks stunning but fails in cold weather." class="mb-8 max-w-xs">
  <DoorbellImage />
</Figure>

The first few days, while the temperature was still close to +10°C, the doorbell worked almost
flawlessly. It kept trickle-charging the battery back to 100%. And triggers worked reasonably well.
But I noticed some firmware quirks.

But let me first explain my constraints. Dutch neighborhoods are dense, and therefore, my doorbell
camera (like many other doorbell cameras in the Netherlands) captures a public sidewalk. I don't
want to capture anything happening in a public area. It's none of my business. I want to capture
only what happens on my property. Google Nest offers intuitive detection zones for this scenario.
Just mark a detection zone located on my property and Google will alert me if someone steps into
that zone. Anything happening outside gets ignored. My neighbor can walk his dog on the sidewalk
without me ever knowing about it.

Reolink reverses this logic. It offers non-detection zones. Reolink does not disclose the logic of
non-detection zones. But from what I can tell, anything touching a non-detection zone gets ignored.
That's a problem when the public sidewalk is in the center of the camera view and it's literally
impossible to walk to my front door without touching the non-detection zone. In my case,
non-detection zones broke meaningful event detection.

As an alternative, you can enable or disable detection based on object size. For instance, someone
walking on the sidewalk across the street will appear small in the camera view and can be ignored.
But the mailman approaching my front door will at one point appear large enough to trigger an alert.
But this approach is very unreliable. My son's playdate was small enough to evade detection until
they rang the doorbell.

Another quirk was that whenever someone left the house, the doorbell would not trigger. I literally
managed to take the above picture of the doorbell without triggering an alert. This made me wonder
whether person detection is based on an object getting larger. If you leave the house, you never get
bigger in the camera view, only smaller. But I'm just guessing here.

Then winter came and with temperatures below +5°C, the doorbell started behaving erratically. The
battery stopped charging and started draining quickly despite being wired up to the doorbell
transformer. I get it that the battery won't charge if temperatures drop below 0°C. But the battery
should not drain when wired. The other issue was that at low temperatures, motion detection kept
failing. I could walk up to the doorbell without triggering an alert. Within a few days, you reach a
point where you have to detach the doorbell, remove the wires and bring it inside for charging.
That's absurd for a wired video doorbell.

The last nail in the doorbell's coffin was customer support. You get the usual remove it, reset it
and re-install it. But the moment I asked to for a return label and a refund, the response speed
slowed down. I felt like I was being put through all kinds of hoops to discourage me from returning
the doorbell.

I wanted to like this doorbell. There are so few options out there for privacy-conscious consumers.
Reolink has a whole range of privacy-friendly cameras, including affordable PoE cameras. Therefore,
when I ended up with a choice between a privacy-friendly video doorbell with flawed event detection
and a Big Tech surveillance device that nickels and dimes me for flawless event detection, I felt
stuck between a rock and a hard place.

For the time being, I reverted back to a dumb doorbell in combination with an old Google Nest
camera. The camera is attached from the inside with a suction cup holder to a window at the
entrance. Event detection works flawlessly, no matter how cold it is outside. But I have to shell
out a subscription fee to Big Tech.

This feels like a defeat. But I hope that it's temporary and that with
[Matter having added support for cameras in v1.5](https://matter-smarthome.de/en/development/matter-1-5-arrives-bringing-long-awaited-cameras/),
there will be more privacy-friendly camera options with flawless event detection in the near future.
And I hope Reolink will iterate on their video doorbell to make it work reliably in cold weather.
