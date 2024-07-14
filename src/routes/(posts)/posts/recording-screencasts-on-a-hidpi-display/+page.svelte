<script>
	import Image from '$lib/components/image.svelte';
	import display_preferences_origin_image from './display-preferences-light.png';
	import ScaledPixelSVG from './scaled-pixel.svelte';
</script>

<p>
	Before recording a screencast, you have to choose the target platform.
	<a href="https://www.youtube.com/">YouTube</a> is a great way to get started since it serves
	videos at zero bandwidth cost. Each platform has its preferred aspect ratio and resolution for
	video uploads.
	<a href="https://support.google.com/youtube/answer/6375112">YouTube's default aspect ratio</a> is 16:9,
	i.e., the pixel ratio of width to height in your final video should be 16:9. The following table shows
	recommended resolutions for YouTube:
</p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Alternate name</th>
				<th>Resolution</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>4K</td>
				<td>2160p</td>
				<td>3840 by 2160</td>
			</tr>
			<tr>
				<td>Quad HD</td>
				<td>1440p</td>
				<td>2560 by 1440</td>
			</tr>
			<tr>
				<td>Full HD</td>
				<td>1080p</td>
				<td>1920 by 1080</td>
			</tr>
			<tr>
				<td>HD</td>
				<td>720p</td>
				<td>1280 by 720</td>
			</tr>
		</tbody>
	</table>
	<figcaption>Recommended 16:9 video resolutions for YouTube.</figcaption>
</figure>

<p>
	You can refer to a video as <em>Full HD</em> if its aspect ratio is 16:9 with a resolution of at least
	1920 by 1080. The resolution can be higher, e.g., a resolution of 2304 by 1296 is higher than Full
	HD but falls short of Quad HD.
</p>

<p>
	<strong>
		A coding screencast should be at least Full HD to ensure that the code is crisp and easy to
		read.
	</strong>
</p>

<h2>Scaled resolution vs. actual resolution</h2>

<p>
	When you record on a HiDPI display, you must understand the difference between <em>scaled</em> and
	<em>actual resolution</em>. I record on the affordable
	<a href="https://www.lg.com/us/monitors/lg-24UD58-B-4k-uhd-led-monitor">LG Ultra HD 24UD58-B</a>.
	Its resolution in physical pixels is 3840 by 2160. If macOS used this resolution, fonts would
	appear tiny and hard to read. So, macOS uses a scaled resolution, which for the LG Ultra HD
	defaults to 1920 by 1080.
</p>

<p>
	One pixel of the scaled resolution corresponds to multiple physical pixels. On the LG Ultra HD
	with 1920 by 1080 scaled resolution, every width or height pixel is replaced with two actual width
	or height pixels. The ratio between scaled and actual width/height pixels is called the
	<em>device pixel ratio</em> (DPR). In this example, DPR is 2. For DPR 2, one scaled pixel consists
	of four actual pixels, as shown in this graphic:
</p>

<figure>
	<ScaledPixelSVG />
	<figcaption>A scaled pixel on a display with DPR 2.</figcaption>
</figure>

<p>MacOS always uses the default resolution unless you opt for a different scaled resolution:</p>

<figure>
	<Image src={display_preferences_origin_image} alt="Screenshot of display preferences on macOS." />
	<figcaption>MacOS lets you choose your preferred scaled resolution.</figcaption>
</figure>

<p>
	Depending on which scaled resolution you choose, you get a different DPR. DPR does not have to be
	an integer:
</p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Resolution</th>
				<th>DPR</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>3840 by 2160</td>
				<td>1</td>
				<td>Actual resolution (More Space).</td>
			</tr>
			<tr>
				<td>2560 by 1440</td>
				<td>1.5</td>
				<td>Scaled Quad HD.</td>
			</tr>
			<tr>
				<td>1920 by 1080</td>
				<td>2</td>
				<td>Scaled Full HD (Default). </td>
			</tr>
		</tbody>
	</table>
	<figcaption>DPRs for different resolutions for the LG Ultra HD.</figcaption>
</figure>

<p>
	Applications can use actual pixels instead of scaled pixels for parts of the screen, which is why
	photos and videos look crisp on HiDPI displays. It's almost as if an application has more pixels
	up its sleeve, which it can use when it makes sense.
</p>

<h2>Why DPR matters for screen recording</h2>

<p>
	In <a href="https://howtoegghead.com/instructor/screencasting/screen-setup/">this article</a>,
	egghead.io explains how to record a screencast. The article states that egghead.io serves videos
	in Full HD (1920 by 1080). But they recommend recording at 1280 by 720 (in HiDPI mode), which
	sounds contradictory.
</p>

<p>
	Some screen recorders record actual pixels, not scaled pixels. They capture 2560 by 1440 actual
	pixels when you record 1280 by 720. The captured resolution is Quad HD, but you need more for 4K.
	Here are some examples of screen recorders that capture actual pixels:
	<a
		href="https://support.apple.com/guide/mac-help/take-a-screenshot-or-screen-recording-mh26782/mac"
		>QuickTime</a
	>, <a href="https://www.telestream.net/screenflow/">ScreenFlow</a> and
	<a href="https://cleanshot.com/">Cleanshot X</a>.
</p>

<p>
	To serve 4K videos, you must record 1920 by 1080 scaled resolution. With DPR 2, actual pixels for
	width and height double, resulting in a 3840 by 2160 for the final video. On my LG Ultra HD, I
	have to record the entire screen.
</p>

<p>
	<strong>
		When you choose a screen recorder, verify that it supports HiDPI displays and records actual
		pixels instead of scaled pixels.
	</strong>
</p>

<h2>Mind the aspect ratio on MacBooks</h2>

<p>
	If you do not have an external HiDPI display, you can record a screencast on your MacBook's Retina
	display. On my MacBook Air M1, the aspect ratio is 16:10 and not 16:9. As of macOS 12.4, there is
	no way to set a 16:9 resolution for the built-in display. The other surprise is that the DPR of
	the default scaled resolution is 2560/1440 = 16/9 = 1.7777778 (<em>less</em> than 2):
</p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Resolution</th>
				<th>DPR</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>2560 by 1600</td>
				<td>1</td>
				<td>Actual resolution. </td>
			</tr>
			<tr>
				<td>1440 by 900</td>
				<td>16/9</td>
				<td>Default scaled resolution.</td>
			</tr>
		</tbody>
	</table>
	<figcaption>Actual resolution and default scaled resolution on the MacBook Air M1.</figcaption>
</figure>

<p>
	To record a 16:9 screencast on a MacBook Air M1 with default scaled resolution, you have two
	options:
</p>

<ol>
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
</ol>

<p>
	When you record a portion of your screen, you must place and size windows inside the recording
	area. I manage windows with
	<a href="https://www.raycast.com/extensions/window-management/"
		>Raycast's window management extension</a
	>, which makes placing windows on a desktop a breeze. But, window placement is relative to the
	entire desktop, and thus, window managers are not suitable for placing windows inside a recording
	area.
</p>

<h2>Record full screen 16:9 on a MacBook's built-in display</h2>

<p>
	Many screencast creators prefer recording the entire screen, as
	<a href="https://twitter.com/simonswiss/status/1460847167145275403">this Twitter thread shows</a>.
	With my LG Ultra HD, it is no problem to record 16:9 full screen. But when you record on the
	built-in 16:10 MacBook display, macOS does not allow you to change the resolution to a 16:9 ratio.
	But you can always connect to an external display with a different resolution and mirror it to
	your built-in display.
</p>

<p>
	<a href="https://github.com/waydabber/BetterDummy">BetterDummy</a> can do this virtually. It lets you
	create a 16:9 dummy display and mirror it to your built-in display. You can then record 16:9 full screen
	on the mirrored dummy screen.
</p>
