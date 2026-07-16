import { useState, useCallback } from 'react';
import type { ActiveFormats } from '../types';

const DEFAULT_FORMATS: ActiveFormats = { bold: false, italic: false, underline: false };

interface UseActiveFormatsResult {
  activeFormats: ActiveFormats;
  updateActiveFormats: () => void;
}

export function useActiveFormats(): UseActiveFormatsResult {
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>(DEFAULT_FORMATS);

  const updateActiveFormats = useCallback(() => {
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      });
    } catch {
      // ignore — queryCommandState can throw in some browsers
    }
  }, []);

  return { activeFormats, updateActiveFormats };
}
