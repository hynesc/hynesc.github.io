import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    categories: z
      .array(z.enum(['Research & evaluation', 'Data & ML', 'Systems & interfaces']))
      .min(1),
    methods: z.array(z.string()).min(1),
    order: z.number(),
    context: z.string(),
    contribution: z.string(),
    finding: z.string(),
    artifacts: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
  }),
});
export const collections = { projects };
