# maier.tech

This is the source code for my website https://maier.tech. I use
[SvelteKit](https://kit.svelte.dev/) and host it on [Vercel](https://vercel.com/).

## Writing and editing posts

Here is my process to write a post:

- [ ] **Working title:** I do a fe iterations on the title, but not too long, because the title
      usually shapes up while I draft and edit the post.
- [ ] **Draft post (500 to 1000 words):** I write my first draft without any editing. This is about
      structuring my post and thinking about the message I want to convey to my audience. This draft
      is full of typos and bad grammar.
- [ ] **Edit with Grammarly:** I copy the draft into the My Grammarly and edit and rewrite the post.
      Some paragraphs I rewrite several times. I think things through. I feel how my post shapes up.
      I tried to edit in VS Code using the
      [Grammarly extension](https://marketplace.visualstudio.com/items?itemName=znck.grammarly), but
      its authentication is brittle and the extension got in the way. I do not like copy-pasting to
      My Grammarly, but it is less hassle and helps me separate writing from editing.
- [ ] **Check reading flow:** I check whether I enjoy reading my post. I irone out the kinks to make
      it smoother.
- [ ] **Write SEO description:** Needs to be very short and make a case for why people should click
      on my post (both in Google search results and on my website).
- [ ] **Finalize title and slug:** It's time to finalize the title and check that the slug derived
      from the title does contain some weird edge case.
- [ ] **Final edit with Grammarly:** One more round of editing with Grammarly.
- [ ] **Final check:** Copy the post back and trigger a deploy preview for the final check.

Note that `proseWrap` in the Prettier config needs to be set to `never` to avoid line breaks.
Otherwise Grammarly gets confused.

## Frontmatter

| Property  | Description                                                |
| :-------- | :--------------------------------------------------------- |
| published | Posts with future published date will not be linked.       |
| unpublish | When set to true, route throws 404 and post is not linked. |
