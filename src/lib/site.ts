import { getCollection, type CollectionEntry } from 'astro:content';

/** True only while running `npm run dev`. Drafts are never in a production build. */
export const SHOW_DRAFTS = import.meta.env.DEV;

/** Prefix an internal path with the configured base path (root or /repo). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

export function isVisible(item: { published: boolean }): boolean {
  return item.published || SHOW_DRAFTS;
}

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => isVisible(data));
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export const AREA_LABEL = {
  support: 'IT Support & Cloud',
  app: 'App Development',
} as const;

/** Only allow absolute https links (or mailto) from configuration. */
export function safeExternal(href: string | null | undefined): string | null {
  if (!href) return null;
  try {
    const u = new URL(href);
    return u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}
