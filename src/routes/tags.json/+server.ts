import tags from '$data/tags';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// How to use function types:
// https://2ality.com/2020/04/typing-functions-typescript.html#checking-if-a-value-matches-a-type
export const GET: RequestHandler = () => json({ tags });
