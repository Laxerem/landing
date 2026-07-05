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

export interface SkillGroup {
  n: string;
  title: string;
  sub: string;
  lead: string[];
  rest: string[];
}

export interface StackContent {
  groups: SkillGroup[];
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
  bullets?: string[];
  about?: string;
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
