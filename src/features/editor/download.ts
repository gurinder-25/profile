import { parseHtmlToBlocks } from './parser';
import type { Block } from '../../types/article';

const FILENAME_WORDS = 6;

function firstBlockText(block: Block): string {
  const nodes = block.type === 'list' ? (block.items[0]?.content ?? []) : block.content;
  return nodes.map((n) => n.text).join('');
}

function deriveFilename(first: Block): string {
  const slug = firstBlockText(first)
    .trim()
    .split(/\s+/)
    .slice(0, FILENAME_WORDS)
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug ? `${slug}.json` : 'untitled.json';
}

export function downloadDocument(html: string): void {
  const blocks = parseHtmlToBlocks(html);
  if (blocks.length === 0) return;

  const blob = new Blob([JSON.stringify(blocks, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = deriveFilename(blocks[0]);
  a.click();
  URL.revokeObjectURL(url);
}
