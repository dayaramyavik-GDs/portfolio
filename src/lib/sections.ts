import { about, education, experience, profile, skillGroups } from '../data/profile';
import { resumeHref } from './resume';
import { getProjects, isVisible } from './site';

/**
 * Which homepage sections have real content. A section with nothing approved
 * is left out entirely (and removed from the navigation) instead of showing
 * placeholder text to visitors.
 */
export async function getSections() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.data.featured).slice(0, 5);
  const skills = skillGroups
    .map((g) => ({ ...g, skills: g.skills.filter(isVisible) }))
    .filter((g) => g.skills.length > 0);
  const jobs = experience.filter(isVisible);
  const study = education.filter(isVisible);
  const hasContact = Boolean(profile.email || profile.linkedin || profile.github || resumeHref);

  return {
    projects,
    featured,
    skills,
    jobs,
    study,
    nav: [
      featured.length > 0 && { id: 'work', label: 'Work' },
      skills.length > 0 && { id: 'skills', label: 'Skills' },
      jobs.length > 0 && { id: 'experience', label: 'Experience' },
      (about.length > 0 || study.length > 0) && { id: 'about', label: 'About' },
      hasContact && { id: 'contact', label: 'Contact' },
    ].filter((x): x is { id: string; label: string } => Boolean(x)),
    hasContact,
  };
}
