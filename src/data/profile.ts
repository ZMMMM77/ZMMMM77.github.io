import content from "./profile.json";
import settings from "./site.json";

export type Experience = {
  title: string;
  subtitle: string;
  dates: string;
  description?: string;
  logoUrl?: string;
};
export type Project = {
  title: string;
  description: string;
  dates: string;
  image?: string;
  href?: string;
  tags: string[];
};
export type Interest = { title: string; description: string };
export type Profile = {
  name: string;
  initials: string;
  description: string;
  summary: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  social: { label: string; url: string }[];
  work: Experience[];
  education: Experience[];
  research: Experience[];
  skills: string[];
  projects: Project[];
  interests: Interest[];
};

export const profile: Profile = content;
export const site = settings;
