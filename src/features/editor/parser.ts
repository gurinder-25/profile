import { BlockType } from '../../types/article';
import type { Block, TextNode, TextMark, ListItem, HeadingBlock } from '../../types/article';

// ── Inline node parser ────────────────────────────────────────────────────────

function parseInlineNode(node: Node, marks: TextMark[]): TextNode[] {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? '';
    if (!text) return [];
    return marks.length > 0 ? [{ text, marks }] : [{ text }];
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const next: TextMark[] = [...marks];

    if (tag === 'strong' || tag === 'b') next.push('bold');
    if (tag === 'em' || tag === 'i') next.push('italic');
    if (tag === 'u') next.push('underline');

    const result: TextNode[] = [];
    el.childNodes.forEach((child) => result.push(...parseInlineNode(child, next)));
    return result;
  }

  return [];
}

function parseInline(el: HTMLElement): TextNode[] {
  const nodes: TextNode[] = [];
  el.childNodes.forEach((child) => nodes.push(...parseInlineNode(child, [])));
  return nodes.filter((n) => n.text);
}

// ── HTML → Block[] ────────────────────────────────────────────────────────────

export function parseHtmlToBlocks(html: string): Block[] {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const blocks: Block[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();

      if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
        const level = parseInt(tag[1], 10) as HeadingBlock['level'];
        const content = parseInline(el);
        if (content.length) {
          blocks.push({ type: BlockType.Heading, level, content });
        }
      } else if (tag === 'ul' || tag === 'ol') {
        const items: ListItem[] = [];
        el.querySelectorAll('li').forEach((li) => {
          const content = parseInline(li);
          if (content.length) items.push({ content });
        });
        if (items.length) {
          blocks.push({ type: BlockType.List, ordered: tag === 'ol', items });
        }
      } else {
        const content = parseInline(el);
        if (content.some((n) => n.text.trim())) {
          blocks.push({ type: BlockType.Paragraph, content });
        }
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        blocks.push({ type: BlockType.Paragraph, content: [{ text }] });
      }
    }
  });

  return blocks;
}
