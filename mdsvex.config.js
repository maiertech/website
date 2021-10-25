import codeTitles from 'remark-code-titles';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  layout: {
    posts: './src/routes/posts/_layout.mdsvex.svelte',
    _: './src/routes/_default-layout.mdsvex.svelte',
  },

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [codeTitles],
  rehypePlugins: [],
};

export default config;
