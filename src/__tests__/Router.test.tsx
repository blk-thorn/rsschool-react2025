import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter, RouteObject, LoaderFunction } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockResponseSuccess } from '@/__tests__/__mocks__/mockData.ts';
import { router } from '@/app/router.tsx';
import { ROUTES } from '@/app/routes';
import { fetchCharacters } from '@/utils/api.ts';

vi.mock('@/utils/api.ts', () => ({
  fetchCharacters: vi.fn(),
}));

const createTestRequest = (path: string, init?: RequestInit): Request => {
  const url: string = path.startsWith('/')
    ? `https://test${path}`
    : path;
  return new Request(url, init);
};

type RouteWithLoader = RouteObject & {
  loader: LoaderFunction;
};

function getRouteWithLoader(routes: RouteObject[], path: string): RouteWithLoader {
  const route: RouteObject | undefined = routes[0].children?.find((child: RouteObject ): boolean => child.path === path);
  if (!route || !route.loader) {
    throw new Error(`Route with path "${path}" and loader not found`);
  }
  return route as RouteWithLoader;
}

describe('Router Configuration', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    vi.mocked(fetchCharacters).mockResolvedValue(mockResponseSuccess);
  });

  describe('HomePage Loader', (): void => {
    it('should return search params', async (): Promise<void> => {
      const homeRoute: RouteWithLoader = getRouteWithLoader(router.routes, ROUTES.HOME);
      const request: Request = createTestRequest(`${ROUTES.HOME}?search=rick&page=1`);

      const response: unknown = await homeRoute.loader({
        request,
        params: {},
        context: {},
      });

      expect(response).toEqual({ searchTerm: 'rick', page: 1 });
      expect(fetchCharacters).toHaveBeenCalledWith('rick', 1);
    });

    it('should return default values for no params', async (): Promise<void> => {
      const homeRoute: RouteWithLoader = getRouteWithLoader(router.routes, ROUTES.HOME);
      const request: Request = createTestRequest(ROUTES.HOME);

      const response: unknown = await homeRoute.loader({
        request,
        params: {},
        context: {},
      });

      expect(response).toEqual({ searchTerm: '', page: 1 });
    });

    it('should throw 404 when exceeds total pages', async (): Promise<void> => {
      const homeRoute: RouteWithLoader = getRouteWithLoader(router.routes, ROUTES.HOME);
      vi.mocked(fetchCharacters).mockResolvedValue({
        ...mockResponseSuccess,
        info: { ...mockResponseSuccess.info, pages: 1 }
      });
      const request: Request = createTestRequest(`${ROUTES.HOME}?page=2`);

      await expect(
        homeRoute.loader({
          request,
          params: {},
          context: {},
        })
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('Error Handling', (): void => {
    it('render error page', async (): Promise<void> => {
      const testRoutes: RouteObject[] = [{
        path: '/',
        loader: (): void => { throw new Response('Not Found', { status: 404 }); },
        errorElement: <div>Error Page Content</div>,
      }];

      const memoryRouter = createMemoryRouter(testRoutes, {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={memoryRouter} />);
      expect(await screen.findByText('Error Page Content')).toBeInTheDocument();
    });
  });
});
