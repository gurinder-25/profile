export const ROUTES = {
  HOME: '/',

  ARTICLE: {
    PATH: '/writing/:id',
    TO: (id: string) => `/writing/${id}`,
  },

  // Dev-only authoring tool; excluded from production builds in App.tsx.
  WRITE: '/write',
} as const;
