/**
 * Public profile data — the single place to edit identity, links and résumé.
 *
 * Rules for this file:
 * - Only put information here that you have approved for a PUBLIC website.
 * - Leave a value as `null` until it is confirmed. Components hide anything
 *   that is `null`, so the live site never shows a broken link or placeholder.
 * - Never put passwords, tokens, phone numbers or a street address here.
 */

export interface Profile {
  name: string;
  headline: string;
  location: string;
  /** One-sentence value proposition shown in the hero. */
  summary: string;
  /** Approved professional email, e.g. "name@example.com". */
  email: string | null;
  /** Full https URL to your LinkedIn profile. */
  linkedin: string | null;
  /** Full https URL to your GitHub profile. */
  github: string | null;
  /** Full https URL of this site's source repository (shown in the footer). */
  repository: string | null;
  /**
   * File name of the public CV inside /public. The download buttons appear
   * automatically once that file exists — see README "Replacing the CV".
   */
  resumeFile: string;
  /** Show an "Open to opportunities" note. Only set true if it is accurate. */
  openToWork: boolean;
}

export const profile: Profile = {
  name: 'Yavik Dayaram',
  headline: 'IT Support & App Developer',
  location: 'Melbourne, Victoria, Australia',
  summary: 'I help people solve IT problems and build practical applications.',
  email: 'dayaram.yavik@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yavikdayaram',
  github: 'https://github.com/dayaramyavik-GDs',
  repository: null,
  resumeFile: 'Yavik-Dayaram-CV.pdf',
  openToWork: false,
};

export const about: string[] = [
  'I work in IT support at Manufacturing Labour Hire Solutions in Melbourne, helping staff with hardware, software, account access and network issues, and documenting fixes so the next person can solve them faster.',
  'I am also completing a Master of Information Technology in Network and Information Security, with a minor in mobile application development. Outside of work I build and test hybrid mobile apps. Support work keeps me close to the people who use software every day, and that shapes how I build: clear screens, careful input validation and fewer reasons to log a ticket.',
  'Before moving into IT support in Australia, I spent many years in IT and telecommunications sales and administration in Fiji, followed by customer-facing roles in Melbourne.',
];

export interface Experience {
  title: string;
  employer: string;
  location: string;
  /** Display string, e.g. "Sep 2026 – Present". */
  dates: string;
  /** ISO start date (or year) for machine-readable markup. */
  start: string;
  type: 'Employment' | 'Volunteer' | 'Contract';
  /** Only verified duties. Leave empty rather than guessing. */
  points: string[];
  /** false = shown in `npm run dev` only, never in the public build. */
  published: boolean;
}

/** Source: owner's CV (October 2026). Newest first. */
export const experience: Experience[] = [
  {
    title: 'IT Support',
    employer: 'Manufacturing Labour Hire Solutions Pty Ltd (MLHS)',
    location: 'Epping, VIC',
    dates: 'Sep 2026 – Present',
    start: '2026-09',
    type: 'Employment',
    points: [
      'First-line remote and in-person support for hardware, software, account access and network connectivity issues.',
      'Set up and troubleshoot desktops, laptops, mobile devices, printers and scanners; configure user accounts and permissions in Active Directory.',
      'Log, prioritise and resolve ServiceNow requests within agreed SLA timeframes, escalating unresolved issues to the right technical team.',
      'Assist with Cisco switch and router configuration, and with software deployment, updates and patching using SCCM and WSUS.',
      'Write troubleshooting guides and maintain knowledge-base articles for common issues.',
    ],
    published: true,
  },
  {
    title: 'Front End Assistant',
    employer: 'Costco',
    location: 'Ardeer, VIC',
    dates: 'Nov 2025 – Feb 2026',
    start: '2025-11',
    type: 'Employment',
    points: [
      'Helped members with front-end enquiries, supported checkout operations and escalated transaction queries to supervisors.',
    ],
    published: true,
  },
  {
    title: 'Food and Beverage Attendant',
    employer: 'Gardiner Hotel',
    location: 'Malvern, VIC',
    dates: 'Nov 2024 – Jul 2025',
    start: '2024-11',
    type: 'Employment',
    points: ['Processed high-volume orders and cash and EFTPOS transactions during busy service periods.'],
    published: true,
  },
  {
    title: 'Team Member / Customer Service Assistant',
    employer: 'The Holland Foundation',
    location: 'Melbourne, VIC',
    dates: 'Jun 2024 – Nov 2024',
    start: '2024-06',
    type: 'Employment',
    points: [
      'Led a team of 6–8 in a retail and customer service environment, trained new volunteers and monitored daily sales, customer and safety KPIs.',
    ],
    published: true,
  },
  {
    title: 'IT & Telecommunication Sales & Admin Support',
    employer: 'JDC CO LTD',
    location: 'Savusavu, Fiji',
    dates: '2009 – 2023',
    start: '2009',
    type: 'Employment',
    points: [
      'Assisted with basic IT system setup and maintenance, using a ticketing system to log and track support requests.',
      'Supported customers by phone and in person with telecommunications sales and service enquiries.',
      'Maintained operational records, data entry and daily KPI reporting; front-desk administration within a team of 12.',
    ],
    published: true,
  },
];

export interface Education {
  qualification: string;
  institution: string;
  /** e.g. "Completed 2025" or "In progress, expected 2027". */
  status: string;
  published: boolean;
}

/** Add confirmed qualifications only. Preparation is not certification. */
export const education: Education[] = [
  {
    qualification: 'Master of Information Technology — Network and Information Security (minor: Mobile Application Development)',
    institution: 'Central Queensland University, Melbourne',
    status: 'July 2025 – present',
    published: true,
  },
  {
    qualification: 'Postgraduate Diploma in Management',
    institution: 'Glen Institution',
    status: 'Completed March 2024',
    published: true,
  },
  {
    qualification: 'Bachelor of Arts in Information Systems (minor: Psychology)',
    institution: 'University of the South Pacific',
    status: 'Completed March 2019',
    published: true,
  },
];

/** Completed certificates only, with their exact names. */
export const certifications: { name: string; published: boolean }[] = [
  { name: 'Google Project Management Certificate', published: true },
  { name: 'Meta Front-End Developer Certificate', published: true },
];

export type SkillContext = 'Workplace' | 'Projects & study' | 'Foundational';

export interface SkillGroup {
  title: string;
  skills: {
    name: string;
    context: SkillContext;
    /** Slug of a project that demonstrates this skill (optional). */
    project?: string;
    published: boolean;
  }[];
}

/**
 * Source: owner's CV. "Workplace" = used in a job; "Projects & study" = used in
 * academic or personal projects; "Foundational" = conceptual knowledge.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'IT Support',
    skills: [
      { name: 'Remote and in-person troubleshooting', context: 'Workplace', published: true },
      { name: 'Endpoint, printer and peripheral setup', context: 'Workplace', published: true },
      { name: 'Active Directory accounts and permissions', context: 'Workplace', published: true },
      { name: 'ServiceNow incidents and requests (SLA, escalation)', context: 'Workplace', published: true },
      { name: 'Knowledge-base documentation', context: 'Workplace', published: true },
      { name: 'SCCM and WSUS patching support', context: 'Workplace', published: true },
      { name: 'Group Policy and Event Viewer', context: 'Foundational', published: true },
      { name: 'Linux command line and macOS support', context: 'Foundational', published: true },
    ],
  },
  {
    title: 'Networking, Cloud & Security',
    skills: [
      { name: 'Cisco switch and router configuration (assisting)', context: 'Workplace', published: true },
      { name: 'AWS EC2, load balancing and VPC networking', context: 'Projects & study', project: 'bookhaven-aws', published: true },
      { name: 'TCP/IP, DNS, DHCP, Wi-Fi, VPN and firewalls', context: 'Foundational', published: true },
      { name: 'MFA, least privilege and phishing awareness', context: 'Foundational', published: true },
      { name: 'Microsoft Azure fundamentals', context: 'Foundational', published: true },
    ],
  },
  {
    title: 'App Development',
    skills: [
      { name: 'HTML, CSS, JavaScript and jQuery', context: 'Projects & study', project: 'shiftpay', published: true },
      { name: 'Apache Cordova and Android testing', context: 'Projects & study', project: 'shiftpay', published: true },
      { name: 'Node.js, Express and MongoDB Atlas', context: 'Projects & study', project: 'assessment-tracker', published: true },
      { name: 'Docker and GitHub Actions', context: 'Projects & study', project: 'assessment-tracker', published: true },
      { name: 'Automated testing', context: 'Projects & study', project: 'assessment-tracker', published: true },
    ],
  },
];
