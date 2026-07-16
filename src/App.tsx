import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Profile from './features/profile/Profile';
import Article from './features/blog/Article';

// React Router keeps the window scroll position across navigations, so an
// article opened from the bottom of the profile would start mid-page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// The editor is a private authoring tool, not something readers should download.
// import.meta.env.DEV is substituted with a literal at build time, so this whole
// branch — and lucide-react with it — is dropped from the production bundle.
const Editor = import.meta.env.DEV ? lazy(() => import('./features/editor/Editor')) : null;

function App() {
  return (
    <Router>
      <ScrollToTop />
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
