---
title: The privacy-friendly video doorbell with flawed person detection
author: thilo
publishedDate: 2026-01-09
description:
  A Reolink video doorbell promised to be privacy-friendly, but failed to reliably detect people.
tags:
  - iot
---

<script>
  import { Figure } from '@maiertech/sveltekit-helpers';
	import DoorbellImage from './DoorbellImage.svelte';
</script>

During the holidays, I installed a
[Reolink Video Doorbell (Battery)](https://reolink.com/nl/product/reolink-doorbell-battery/) on my
front door. After some initial excitement, the doorbell turned into a disappointment.

About 2 years ago, I had a
[Google Nest Doorbell (Battery)](https://store.google.com/product/nest_doorbell_battery?hl=nl) for
about 6 months. Its image started flickering and when I removed it for a reset, the mounting
mechanism broke. A common problem with this model. To Google's credit, I received a full refund. But
I started to wonder whether it's a good idea to install an IoT device in a spot where it is exposed
to the full range from freezing cold to scorching hot with direct sun exposure and occasional rain
splashes.

Fast forward to late 2025. I wanted to give a video doorbell another try. But this time, I wanted to
bypass Big Tech and go for a model that works locally without subscription and without the cloud.
After digging through endless doorbell reviews, I settled on Reolink. Their battery doorbell ticked
all the boxes: local storage, no subscription required, optional wired installation, works with my
mechanical chime, battery-powered (in case of a power outage), and affordable. And a beautiful piece
of hardware, IP65 rated, that works in a temperature range from -10°C to +55°C. At least that's what
the specs say.

<Figure caption="The Reolink Video Doorbell (Battery) looks stunning." class="mb-8 max-w-xs">
  <DoorbellImage />
</Figure>

Let me first explain my video doorbell constraints. Dutch neighborhoods are dense, and therefore, my
doorbell camera (like many other doorbell cameras in the Netherlands) captures a public sidewalk. I
don't want to capture anything happening in a public area. I want to capture only what happens on my
property. Google Nest offers intuitive detection zones for this scenario. Just mark a detection zone
located on my property and Google will alert me if someone steps into that zone. Anything happening
outside gets ignored. My neighbor can walk his dog on the sidewalk without me ever knowing about it.

The Reolink battery doorbell reverses this logic. It offers non-detection zones. Reolink does not
disclose the logic of non-detection zones. But from what I can tell, anything touching a
non-detection zone gets ignored. That's a problem when the public sidewalk is in the center of the
camera view and it's literally impossible to walk to my front door without touching the
non-detection zone. In my case, non-detection zones broke meaningful event detection.

As an alternative, you can enable or disable detection based on object size. For instance, someone
walking on the sidewalk across the street will appear small in the camera view and can be ignored.
But the mailman approaching my front door will at one point appear large enough to trigger an alert.
But this approach is unreliable. The local newspaper deliverer consistently managed to put a paper
in our mailbox without being detected. Another quirk was that whenever someone left the house, event
detection failed as well. I literally managed to take the above photo of the doorbell without
triggering an alert. Maybe person detection is based on an object with a face getting larger. If you
leave the house, the camera only sees your back. But I'm just guessing here.

The last nail in the doorbell's coffin was customer support. You get the usual remove it, reset it
and re-install it. Which of course does not fix a flawed product. The moment I asked for a return
label and a refund, the response speed slowed down. After a few weeks of back and forth, Reolink
finally sent me a return label and I sent the doorbell back for a refund.

I wanted to like this doorbell. There are so few options out there for privacy-conscious consumers.
Reolink has a whole range of privacy-friendly cameras, including affordable PoE cameras. But a
doorbell camera with flawed person detection is a deal breaker. For the time being, I reverted back
to a dumb doorbell in combination with an old Google Nest camera. The camera is attached from the
inside with a suction cup holder to a window at the entrance. Event detection works flawlessly. But
I have to shell out a subscription fee to Big Tech for cloud recording.

I hope that with
[Matter having added support for cameras in v1.5](https://matter-smarthome.de/en/development/matter-1-5-arrives-bringing-long-awaited-cameras/),
there will be more privacy-friendly camera options with flawless event detection in the near future.
