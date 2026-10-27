import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per project in src/content/projects/.
 * The front matter below is validated at build time, so a typo or a missing
 * field fails the build instead of shipping a broken card.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** "support" = IT Support / Cloud / Networking; "app" = App Development. */
      area: z.enum(['support', 'app']),
      /** Honest label for what this is. */
      type: z.enum(['Academic Project', 'Personal Project', 'Personal Lab', 'Prototype', 'Work Project', 'Production']),
      status: z.enum(['Completed', 'In Progress', 'Concept']),
      /** One sentence: the problem this solved. */
      problem: z.string(),
      /** One sentence: what YOU did. */
      contribution: z.string(),
      tech: z.array(z.string()).max(8),
      /** Optional evidence links — omit rather than use "#". */
      repo: z.url().optional(),
      demo: z.url().optional(),
      download: z.url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Year or period, e.g. "2025". */
      date: z.string(),
      /** Show on the homepage (keep to 3–5). */
      featured: z.boolean().default(false),
      /** Lower numbers appear first. */
      order: z.number().default(100),
      /** false = visible in `npm run dev` only, excluded from the public build. */
      published: z.boolean().default(false),
    }).refine((p) => !p.cover || p.coverAlt, {
      message: 'coverAlt is required when cover is set',
    }),
});

export const collections = { projects };
