// The storage format shared by the editor (which writes it) and the blog
// (which renders it). This file is the single source of truth for both —
// adding a block type here surfaces as a compile error in whichever side
// doesn't handle it yet.

// ── Primitive marks ──────────────────────────────────────────────────────────

export type TextMark = 'bold' | 'italic' | 'underline';

export interface TextNode {
  text: string;
  marks?: TextMark[];
}

// ── Block types ───────────────────────────────────────────────────────────────

export interface ParagraphBlock {
  type: 'paragraph';
  content: TextNode[];
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  content: TextNode[];
}

export interface ListItem {
  content: TextNode[];
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: ListItem[];
}

export type Block = ParagraphBlock | HeadingBlock | ListBlock;

// ── Published article ─────────────────────────────────────────────────────────

export interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
}

export interface Article extends ArticleMeta {
  blocks: Block[];
}

// ── Runtime constants (as const replaces enum, compatible with erasableSyntaxOnly) ──

export const BlockType = {
  Paragraph: 'paragraph',
  Heading: 'heading',
  List: 'list',
} as const satisfies Record<string, Block['type']>;
