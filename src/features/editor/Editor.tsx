import { useState, useRef, useEffect, useCallback } from 'react';
import './editor.css';
import { useActiveFormats } from './hooks/useActiveFormats';
import { useSelectionRect } from './hooks/useSelectionRect';
import { downloadDocument } from './download';
import { SelectionToolbar } from './SelectionToolbar';

export default function Editor() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const { activeFormats, updateActiveFormats } = useActiveFormats();
  const selectionRect = useSelectionRect(bodyRef);

  // execCommand leaves stray nodes behind, so :empty::before can't be trusted
  // to hide the placeholder — track emptiness ourselves.
  const syncEmptiness = useCallback(() => {
    const el = bodyRef.current;
    setIsEmpty(!el || (!el.textContent?.trim() && !el.querySelector('li')));
  }, []);

  useEffect(() => {
    bodyRef.current?.focus();
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveFormats);
    return () => document.removeEventListener('selectionchange', updateActiveFormats);
  }, [updateActiveFormats]);

  const handleDownload = useCallback(() => {
    downloadDocument(bodyRef.current?.innerHTML ?? '');
  }, []);

  const exec = useCallback(
    (command: string) => {
      document.execCommand(command, false);
      updateActiveFormats();
      syncEmptiness();
    },
    [updateActiveFormats, syncEmptiness],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      if (text) document.execCommand('insertText', false, text);
      syncEmptiness();
    },
    [syncEmptiness],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleDownload();
      }
    },
    [handleDownload],
  );

  // Clicking the margins should feel like clicking the page, not leaving it.
  const refocus = useCallback(() => {
    if (window.getSelection()?.isCollapsed !== false) bodyRef.current?.focus();
  }, []);

  return (
    <div className="editor-page" onMouseUp={refocus} onKeyDown={handleKeyDown}>
      <div className="editor-sheet">
        {isEmpty && <div className="editor-placeholder">Start writing…</div>}
        <div
          ref={bodyRef}
          className="editor-body"
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Document body"
          onInput={() => {
            syncEmptiness();
            updateActiveFormats();
          }}
          onPaste={handlePaste}
        />
      </div>

      {selectionRect && (
        <SelectionToolbar
          rect={selectionRect}
          activeFormats={activeFormats}
          onExec={exec}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
