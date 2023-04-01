import type { z } from 'zod';
import { TypeSchema } from '$lib';

export type Type = z.infer<typeof TypeSchema>;
