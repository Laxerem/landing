export interface HeroContent {
  statusText: string;
  firstName: string;
  lastName: string;
  role: string;
  roleSeparator: string;
  roleStack: string;
  tagline: string;
  photoSrc: string;
}

export interface Fact {
  k: string;
  v: string;
  small?: string;
}

export interface AboutStat { n: number; suffix?: string; label: string; source?: 'github-repos'; }

export interface AboutContent {
  lead: string;
  body: string[];
  facts: Fact[];
  stats: AboutStat[];
}

export interface StackCore {
  label: string;
  name: string;
  desc: string;
  lead: string[];
  rest: string[];
}

export interface StackSatellite {
  title: string;
  lead: string[];
  rest: string[];
}

export interface StackContent {
  core: StackCore;
  satellites: StackSatellite[];
}

export interface ProjectItem {
  id: string;
  name: string;
  lang: string;
  langColor: string;
  description: string;
  url: string;
  tags: string[];
  stars: number;
  coverImageUrl?: string;
  images?: string[];
  /** Тело статьи в модалке — сырой HTML (p, h3, ul/li, figure/img и т.д.), рендерится как есть. */
  aboutHtml?: string;
}

export interface ProjectsContent {
  items: ProjectItem[];
}

export type ExperienceKind = 'work' | 'education';

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  period: string;
  title: string;
  organization: string;
  description?: string;
}

export interface ExperienceContent {
  items: ExperienceItem[];
}

export type ContactKind = 'github' | 'telegram' | 'email' | 'other';

export interface ContactItem {
  id: string;
  kind: ContactKind;
  label: string;
  href: string;
  handle?: string;
}

export interface ContactsContent {
  items: ContactItem[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  stack: StackContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  contacts: ContactsContent;
}
