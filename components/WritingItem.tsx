
import React from 'react';
import { Writing } from '../types';

export const WritingItem: React.FC<Writing> = ({ title, url, date }) => {
  return (
    <div className="flex items-baseline gap-3 mb-3 last:mb-0">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm font-normal"
      >
        {title}
      </a>
      <span className="text-gray-400 text-xs shrink-0">{date}</span>
    </div>
  );
};
