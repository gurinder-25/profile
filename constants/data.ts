import { WorkExperience, Writing } from '../types';

export const TABS = {
  ABOUT: 'About',
  WORK: 'Work',
  WRITING: 'Writing',
} as const;
export type Tab = typeof TABS[keyof typeof TABS];

export const PROFILE = {
  NAME: 'Gurinder Singh',
  ROLE: 'Software Engineer',
  LOCATION: 'Pune, Maharashtra, India',
  EMAIL: 'mailto:gurinder12723@gmail.com',
  GITHUB: 'https://github.com/gurinder-25',
  LINKEDIN: 'https://www.linkedin.com/in/gurinder-singh-399610226',
  DESCRIPTION:
    'Software Engineer with 1 year experience building scalable web services. Mostly worked with Java, React and Typescript.',
};

export const WORK_HISTORY: WorkExperience[] = [
  {
    role: 'Software Engineer',
    company: 'Finfactor',
    duration: 'May, 2025 - Present',
  },
  {
    role: 'Software Engineer Trainee',
    company: 'Finfactor',
    duration: 'Feb, 2025 - April, 2025',
  },
];

export const WRITINGS: Writing[] = [
  {
    title: 'How Data-Driven Decisions Helped Me Avoid Over-Engineering',
    url: 'https://blog.gurinder.dev/article/1',
    date: 'January, 2026',
  },
];
