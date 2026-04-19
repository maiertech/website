import { defineConfig } from '@content-collections/core';
import { collection as authors } from './src/collections/authors/index.js';
import { collection as guides } from './src/collections/guides/index.js';
import { collection as notes } from './src/collections/notes/index.js';
import { collection as posts } from './src/collections/posts/index.js';
import { collection as tags } from './src/collections/tags/index.js';
import { collection as videos } from './src/collections/videos/index.js';

export default defineConfig({
	content: [authors, guides, notes, posts, tags, videos]
});
