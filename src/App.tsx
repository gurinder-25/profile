import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Profile from './features/profile/Profile';
import Article from './features/blog/Article';

// The editor is a private authoring tool, not something readers should download.
// import.meta.env.DEV is substituted with a literal at build time, so this whole
// branch — and lucide-react with it — is dropped from the production bundle.
const Editor = import.meta.env.DEV ? lazy(() => import('./features/editor/Editor')) : null;

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Profile />} />
        <Route path={ROUTES.ARTICLE.PATH} element={<Article />} />

        {Editor && (
          <Route
            path={ROUTES.WRITE}
            element={
              <Suspense fallback={null}>
                <Editor />
              </Suspense>
            }
          />
        )}

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
