<script lang="ts">
	import {
		code as Code,
		Figure,
		h2 as H2,
		p as P,
		Shiki,
		ul as Ul
	} from '@maiertech/sveltekit-helpers';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<P>
	Authenticating to <a href="https://github.com/">GitHub</a> with SSH can be difficult to configure.
	It is a multi-step process, which is
	<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh">
		outlined in the GitHub docs
	</a>. Alternatively, you can use the <a href="https://cli.github.com/">GitHub CLI</a> to automate SSH
	configuration and take the pain out of this process.
</P>

<H2>Why should you authenticate to GitHub with SSH?</H2>

<P>
	When working with GitHub repositories, you can interact with the platform in different ways, each
	of which requires a different authentication method:
</P>

<Ul>
	<li><strong>Website:</strong> authenticate with username, password and 2FA.</li>
	<li><strong>Command-line:</strong> authenticate with a personal access token or SSH key.</li>
	<li>
		<strong>VS Code:</strong> authenticate with OAuth token (which is automatically created upon the
		first login with VS Code).
	</li>
	<li>
		<strong>GitHub CLI:</strong> authenticate with OAuth token for commands using the GitHub API and
		one of the command line authentication methods mentioned above for basic commands such as cloning,
		fetching, pulling and pushing.
	</li>
</Ul>

<P>
	This post is about configuring SSH authentication for the command line. You can read up on the
	<a
		href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line"
	>
		two command line authentication options in the docs
	</a>. There is no right or wrong choice between the two. Both, personal access token and SSH key,
	have their pros and cons. I like the SSH key option because you set it up once and all
	applications supporting SSH to interact with GitHub can piggyback on the generated SSH key. If you
	need more fine-grained control over the permissions you grant to applications, personal access
	tokens are a better choice.
</P>

<H2>SSH key generation and uploading</H2>

<P>
	If you do not have GitHub CLI installed, you can do so with <Code>brew install gh</Code>. Run
	<Code>gh auth login</Code> and answer the prompts. Choose SSH as the preferred protocol. You do not
	need to enter a password for the generated SSH key. Just hit <key>↵</key>:
</P>

<Figure class="mb-6">
	<Shiki lang="text" code={data.examples['gh-auth-login']} />
</Figure>

<P>
	The last question will redirect you to your GitHub account page where you need to paste the copied
	code. Review and accept the permissions that you will grant to GitHub CLI. This creates an OAuth
	token for GitHub CLI. After your SSH key has been generated and uploaded to GitHub, you will see
	this confirmation:
</P>

<Figure class="mb-6">
	<Shiki
		lang="text"
		code={`✓ Configured git protocol
✓ Uploaded the SSH key to your GitHub account: /Users/thilo/.ssh/id_ed25519.pub
✓ Logged in as maiertech`}
	/>
</Figure>

<P>
	You can revoke an SSH key uploaded to GitHub at any time if you think that it has been
	compromised. Before you can use the generated key to authenticate to GitHub on the command line,
	you need to verify the SSH key fingerprint of the server to which it will connect. This is to
	ensure that you are connecting to GitHub and not some other server. Run this command:
</P>

<Figure class="mb-6">
	<Shiki lang="text" code={data.examples['verify-ssh-key']} />
</Figure>

<P>
	Before typing yes, you need to verify that the displayed RSA fingerprint is correct. Open a new
	terminal and copy this comparison statement into the terminal, but do not run it:
</P>

<Figure class="mb-6">
	<Shiki
		lang="text"
		code={`[[ "fingerprint1" == "fingerprint2" ]] && echo "Equal" || echo "Not equal"`}
	/>
</Figure>

<P>
	Next, copy the RSA fingerprint from the above output (from your terminal, not from this website)
	and paste it to replace <Code>fingerprint1</Code>. Then go to
	<a
		href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints"
	>
		GitHub's SSH key fingerprints page
	</a>, copy the RSA fingerprint and paste it to replace <Code>fingerprint2</Code>. Run the
	comparison command. If both fingerprints match, type yes to respond to the above prompt. You
	should see the following confirmation message:
</P>

<Figure class="mb-6">
	<Shiki
		lang="text"
		code={`Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.`}
	/>
</Figure>

<P>
	The Github domain github.com has now been added to <Code>~/.ssh/known_hosts</Code> together with its
	public key. Any SSH operation in any application now trust GitHub's server and public key and can authenticate
	to GitHub.
</P>
