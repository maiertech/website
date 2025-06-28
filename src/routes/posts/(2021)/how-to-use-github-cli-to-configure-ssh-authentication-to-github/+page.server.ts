import type { PageServerLoad } from './$types';
import { transformPostWithLastmodDate } from '$lib/server/transformations';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await transformPostWithLastmodDate(meta, event);
	const { title, description } = post;

	return { examples, post, seo: { title, description } };
};

const examples = {
	'gh-auth-login': `$ gh auth login

? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? SSH
? Generate a new SSH key to add to your GitHub account? Yes
? Enter a passphrase for your new SSH key (Optional)
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: 66B8-DDEE
- Press Enter to open github.com in your browser...
✓ Authentication complete. Press Enter to continue...
`,
	'verify-ssh-key': `$ ssh -T git@github.com

The authenticity of host 'github.com (140.82.114.3)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?`
};
