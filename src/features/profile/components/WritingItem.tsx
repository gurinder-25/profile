import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { ArticleMeta } from '../../../types/article';

type WritingItemProps = Pick<ArticleMeta, 'id' | 'title' | 'date'>;

export const WritingItem: React.FC<WritingItemProps> = ({ id, title, date }) => {
  return (
    <div className="writing-item">
      <Link to={ROUTES.ARTICLE.TO(id)} className="writing-item-link">
        {title}
      </Link>
      <span className="writing-item-date">{date}</span>
    </div>
  );
};
