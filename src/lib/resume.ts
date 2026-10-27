import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { profile } from '../data/profile';
import { url } from './site';

/** The CV buttons render only if the PDF actually exists in /public. */
export const resumeHref: string | null = existsSync(join(process.cwd(), 'public', profile.resumeFile))
  ? url(`/${profile.resumeFile}`)
  : null;
