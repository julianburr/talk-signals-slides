import { index, route } from '@react-router/dev/routes';

import type { RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/:conference/slide/:slide', 'routes/slide.tsx'),
] satisfies RouteConfig;
