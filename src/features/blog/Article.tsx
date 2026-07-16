import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from './data/articles';
import { renderBlock } from './articleRenderer';
import { ROUTES } from '../../constants/routes';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <div className="page-wrapper">
      <main className="article-main">
        <Link to={ROUTES.HOME} className="nav-link">
          <span>←</span>
          <span>back</span>
        </Link>

        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <p className="article-meta">
            {article.date} · {article.readTime}
          </p>
        </header>

        <article>
          {article.blocks.map((block, index) => renderBlock(block, index))}
        </article>

        <footer className="article-footer">
          <Link to={ROUTES.HOME} className="nav-link">
            <span>←</span>
            <span>back</span>
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default Article;
