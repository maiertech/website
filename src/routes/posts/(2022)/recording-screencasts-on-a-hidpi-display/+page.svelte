<script lang="ts">
	import {
		Figure,
		H2,
		Ol,
		P,
		Table,
		Td,
		Th,
		Thead,
		VercelImage
	} from '@maiertech/sveltekit-helpers';
	import display_preferences_origin_image from './display-preferences-light.png';
	import ScaledPixelSVG from './scaled-pixel.svelte';
</script>

<P>
	Before recording a screencast, you have to choose the target platform.
	<a href="https://www.youtube.com/">YouTube</a> is a great way to get started since it serves
	videos at zero bandwidth cost. Each platform has its preferred aspect ratio and resolution for
	video uploads.
	<a href="https://support.google.com/youtube/answer/6375112">YouTube's default aspect ratio</a> is 16:9,
	i.e., the pixel ratio of width to height in your final video should be 16:9. The following table shows
	recommended resolutions for YouTube:
</P>

<Figure caption="Recommended 16:9 video resolutions for YouTube." class="mb-6">
	<Table>
		<Thead>
			<tr>
				<Th>Name</Th>
				<Th>Alternate name</Th>
				<Th>Resolution</Th>
			</tr>
		</Thead>
		<tbody>
			<tr>
				<Td>4K</Td>
				<Td>2160p</Td>
				<Td>3840 by 2160</Td>
			</tr>
			<tr>
				<Td>Quad HD</Td>
				<Td>1440p</Td>
				<Td>2560 by 1440</Td>
			</tr>
			<tr>
				<Td>Full HD</Td>
				<Td>1080p</Td>
				<Td>1920 by 1080</Td>
			</tr>
			<tr>
				<Td>HD</Td>
				<Td>720p</Td>
				<Td>1280 by 720</Td>
			</tr>
		</tbody>
	</Table>
</Figure>

<P>
	You can refer to a video as <em>Full HD</em> if its aspect ratio is 16:9 with a resolution of at least
	1920 by 1080. The resolution can be higher, e.g., a resolution of 2304 by 1296 is higher than Full
	HD but falls short of Quad HD.
</P>

<P>
	<strong>
		A coding screencast should be at least Full HD to ensure that the code is crisp and easy to
		read.
	</strong>
</P>

<H2>Scaled resolution vs. actual resolution</H2>

<P>
	When you record on a HiDPI display, you must understand the difference between <em>scaled</em> and
	<em>actual resolution</em>. I record on the affordable
	<a href="https://www.lg.com/us/monitors/lg-24UD58-B-4k-uhd-led-monitor">LG Ultra HD 24UD58-B</a>.
	Its resolution in physical pixels is 3840 by 2160. If macOS used this resolution, fonts would
	appear tiny and hard to read. So, macOS uses a scaled resolution, which for the LG Ultra HD
	defaults to 1920 by 1080.
</P>

<P>
	One pixel of the scaled resolution corresponds to multiple physical pixels. On the LG Ultra HD
	with 1920 by 1080 scaled resolution, every width or height pixel is replaced with two actual width
	or height pixels. The ratio between scaled and actual width/height pixels is called the
	<em>device pixel ratio</em> (DPR). In this example, the DPR is 2. For DPR 2, one scaled pixel consists
	of four actual pixels, as shown in this graphic:
</P>

<Figure caption="A scaled pixel on a display with DPR 2." class="mb-6">
	<ScaledPixelSVG />
</Figure>

<P>macOS always uses the default resolution unless you opt for a different scaled resolution:</P>

<Figure caption="macOS lets you choose your preferred scaled resolution." class="mb-6">
	<VercelImage
		src={display_preferences_origin_image}
		alt="Screenshot of display preferences on macOS."
	/>
</Figure>

<P>
	Depending on which scaled resolution you choose, you get a different DPR. DPR does not have to be
	an integer:
</P>

<Figure caption="DPRs for different resolutions for the LG Ultra HD." class="mb-6">
	<Table>
		<Thead>
			<tr>
				<Th>Resolution</Th>
				<th>DPR</th>
				<th>Description</th>
			</tr>
		</Thead>
		<tbody>
			<tr>
				<Td>3840 by 2160</Td>
				<Td>1</Td>
				<Td>Actual resolution (More Space).</Td>
			</tr>
			<tr>
				<Td>2560 by 1440</Td>
				<Td>1.5</Td>
				<Td>Scaled Quad HD.</Td>
			</tr>
			<tr>
				<Td>1920 by 1080</Td>
				<Td>2</Td>
				<Td>Scaled Full HD (Default).</Td>
			</tr>
		</tbody>
	</Table>
</Figure>

<P>
	Applications can use actual pixels instead of scaled pixels for parts of the screen, which is why
	photos and videos look crisp on HiDPI displays. It's almost as if an application has more pixels
	up its sleeve, which it can use when it makes sense.
</P>

<H2>Why DPR matters for screen recording</H2>

<P>
	In <a href="https://howtoegghead.com/instructor/screencasting/screen-setup/">this article</a>,
	egghead.io explains how to record a screencast. The article states that egghead.io serves videos
	in Full HD (1920 by 1080). But they recommend recording at 1280 by 720 (in HiDPI mode), which
	sounds contradictory.
</P>

<P>
	Some screen recorders record actual pixels, not scaled pixels. They capture 2560 by 1440 actual
	pixels when you record 1280 by 720. The captured resolution is Quad HD, but you need more for 4K.
	Here are some examples of screen recorders that capture actual pixels:
	<a
		href="https://support.apple.com/guide/mac-help/take-a-screenshot-or-screen-recording-mh26782/mac"
	>
		QuickTime
	</a>, <a href="https://www.telestream.net/screenflow/">ScreenFlow</a> and
	<a href="https://cleanshot.com/">Cleanshot X</a>.
</P>

<P>
	To serve 4K videos, you must record at 1920 by 1080 scaled resolution. With DPR 2, actual pixels
	for width and height double, resulting in 3840 by 2160 for the final video. On my LG Ultra HD, I
	have to record the entire screen.
</P>

<P>
	<strong>
		When you choose a screen recorder, verify that it supports HiDPI displays and records actual
		pixels instead of scaled pixels.
	</strong>
</P>

<H2>Mind the aspect ratio on MacBooks</H2>

<P>
	If you do not have an external HiDPI display, you can record a screencast on your MacBook's Retina
	display. On my MacBook Air M1, the aspect ratio is 16:10 and not 16:9. As of macOS 12.4, there is
	no way to set a 16:9 resolution for the built-in display. The other surprise is that the DPR of
	the default scaled resolution is 2560/1440 = 16/9 = 1.7777778 (<em>less</em> than 2):
</P>

<Figure
	caption="Actual resolution and default scaled resolution on the MacBook Air M1."
	class="mb-6"
>
	<Table>
		<Thead>
			<tr>
				<Th>Resolution</Th>
				<th>DPR</th>
				<th>Description</th>
			</tr>
		</Thead>
		<tbody>
			<tr>
				<Td>2560 by 1600</Td>
				<Td>1</Td>
				<Td>Actual resolution.</Td>
			</tr>
			<tr>
				<Td>1440 by 900</Td>
				<Td>16/9</Td>
				<Td>Default scaled resolution.</Td>
			</tr>
		</tbody>
	</Table>
</Figure>

<P>
	To record a 16:9 screencast on a MacBook Air M1 with default scaled resolution, you have two
	options:
</P>

<Ol>
	<li>
		<strong>Record 1280 by 720 portion:</strong> With DPR 16/9, the resolution of the recording would
		be 2275 by 1280, which is less than what you get when you record on the LG Ultra HD but still better
		than Full HD.
	</li>
	<li>
		<strong>Record 1440 by 810 portion:</strong> This is the largest 16:9 area that fits on the MacBook
		Air M1 built-in display (using default scaled resolution). With DPR 16/9, the resolution of the recording
		would be 2560 by 1440 (Quad HD, but not 4K). Hence, on a MacBook Air M1's built-in display, you cannot
		record a 4K screencast.
	</li>
</Ol>

<P>
	When you record a portion of your screen, you must place and size windows inside the recording
	area. I manage windows with
	<a href="https://www.raycast.com/extensions/window-management/">
		Raycast's window management extension
	</a>, which makes placing windows on a desktop a breeze. But, window placement is relative to the
	entire desktop, and thus, window managers are not suitable for placing windows inside a recording
	area.
</P>

<H2>Record full screen 16:9 on a MacBook's built-in display</H2>

<P>
	Many screencast creators prefer recording the entire screen, as
	<a href="https://twitter.com/simonswiss/status/1460847167145275403">this Twitter thread shows</a>.
	With my LG Ultra HD, it is no problem to record 16:9 full screen. But when you record on the
	built-in 16:10 MacBook display, macOS does not allow you to change the resolution to a 16:9 ratio.
	But you can always connect to an external display with a different resolution and mirror it to
	your built-in display.
</P>

<P>
	<a href="https://github.com/waydabber/BetterDummy">BetterDummy</a> can do this virtually. It lets you
	create a 16:9 dummy display and mirror it to your built-in display. You can then record 16:9 full screen
	on the mirrored dummy screen.
</P>
