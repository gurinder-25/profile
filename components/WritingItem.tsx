
import React from 'react';
import { Writing } from '../types';

export const WritingItem: React.FC<Writing> = ({ title, url, date }) => {
  return (
    <div className="writing-item">
      <a href={url} target="_blank" rel="noopener noreferrer" className="writing-item-link">
        {title}
      </a>
      <span className="writing-item-date">{date}</span>
    </div>
  );
};
