import { Bold, Italic, Underline, List, ListOrdered, Download } from 'lucide-react';
import type { ActiveFormats } from './types';
import type { SelectionRect } from './hooks/useSelectionRect';

const BUBBLE_HALF_WIDTH = 130;
const EDGE_GAP = 8;

interface SelectionToolbarProps {
  rect: SelectionRect;
  activeFormats: ActiveFormats;
  onExec: (command: string) => void;
  onDownload: () => void;
}

interface ButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolbarButton({ label, active = false, onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={active ? 'editor-bubble-btn is-active' : 'editor-bubble-btn'}
      // Keep focus in the editor — otherwise the selection collapses and
      // execCommand runs against nothing.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SelectionToolbar({
  rect,
  activeFormats,
  onExec,
  onDownload,
}: SelectionToolbarProps) {
  const left = Math.min(
    Math.max(rect.left, BUBBLE_HALF_WIDTH + EDGE_GAP),
    window.innerWidth - BUBBLE_HALF_WIDTH - EDGE_GAP,
  );

  return (
    <div className="editor-bubble" style={{ top: rect.top - 10, left }} role="toolbar">
      <ToolbarButton label="Bold" active={activeFormats.bold} onClick={() => onExec('bold')}>
        <Bold size={15} strokeWidth={2.5} />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={activeFormats.italic} onClick={() => onExec('italic')}>
        <Italic size={15} strokeWidth={2.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={activeFormats.underline}
        onClick={() => onExec('underline')}
      >
        <Underline size={15} strokeWidth={2.5} />
      </ToolbarButton>

      <span className="editor-bubble-divider" />

      <ToolbarButton label="Bulleted list" onClick={() => onExec('insertUnorderedList')}>
        <List size={15} strokeWidth={2.5} />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" onClick={() => onExec('insertOrderedList')}>
        <ListOrdered size={15} strokeWidth={2.5} />
      </ToolbarButton>

      <span className="editor-bubble-divider" />

      <ToolbarButton label="Download" onClick={onDownload}>
        <Download size={15} strokeWidth={2.5} />
      </ToolbarButton>

      <span className="editor-bubble-caret" />
    </div>
  );
}
