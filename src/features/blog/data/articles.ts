import type { Article } from '../../../types/article';
import { blocks as article1Blocks } from "./articles/article_1";

export const articles: Article[] = [
  {
    id: '1',
    title: 'How I Learned To Avoid Over-Engineering',
    description: 'Why System Design Should Start With Data',
    readTime: '6 min read',
    date: 'January 10, 2026',
    blocks: article1Blocks,
  },
];
