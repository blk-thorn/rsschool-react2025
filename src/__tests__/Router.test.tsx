import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { RouterProvider, createMemoryRouter, RouteObject, LoaderFunction } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockResponseSuccess } from '@/__tests__/__mocks__/mockData.ts';
import { router } from '@/app/router.tsx';
import { ROUTES } from '@/app/routes';
import { queryClient } from '@/utils/react-query.ts';

vi.mock('@/utils/react-query', () => ({
  queryClient: {
    fetchQuery: vi.fn(),
  },
}));

const createTestRequest = (path: string, init?: RequestInit): Request => {
  const url: string = path.startsWith('/')
    ? `https://test${path}`
    : path;
  return new Request(url, init);
};

describe('Router Configuration', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    vi.mocked(queryClient.fetchQuery).mockResolvedValue(mockResponseSuccess);
  });

  describe('HomePage Loader', (): void => {
    it('should return search params', async (): Promise<void> => {
      const homeRoute = router.routes[0].children?.find(
        (child: RouteObject): boolean => child.path === ROUTES.HOME
      );

      if (!homeRoute || !homeRoute.loader) {
        throw new Error('Route with loader not found');
      }

      const loader = homeRoute.loader as LoaderFunction;
      const request: Request = createTestRequest(`${ROUTES.HOME}?search=rick&page=1`);

      const response: unknown = await loader({
        request,
        params: {},
        context: {},
      });

      expect(response).toEqual({ searchTerm: 'rick', page: 1 });
    });

    it('should return default values for no params', async (): Promise<void> => {
      const homeRoute = router.routes[0].children?.find(
        (child: RouteObject): boolean => child.path === ROUTES.HOME
      );

      if (!homeRoute || !homeRoute.loader) {
        throw new Error('Route with loader not found');
      }

      const loader = homeRoute.loader as LoaderFunction;
      const request: Request = createTestRequest(ROUTES.HOME);

      const response: unknown = await loader({
        request,
        params: {},
        context: {},
      });

      expect(response).toEqual({ searchTerm: '', page: 1 });
    });

    it('should throw 404 when exceeds total pages', async (): Promise<void> => {
      vi.mocked(queryClient.fetchQuery).mockResolvedValue({
        ...mockResponseSuccess,
        info: { ...mockResponseSuccess.info, pages: 1 }
      });

      const homeRoute = router.routes[0].children?.find(
        (child: RouteObject): boolean => child.path === ROUTES.HOME
      );

      if (!homeRoute || !homeRoute.loader) {
        throw new Error('Route with loader not found');
      }

      const loader = homeRoute.loader as LoaderFunction;
      const request: Request = createTestRequest(`${ROUTES.HOME}?page=2`);

      await expect(loader({
        request,
        params: {},
        context: {},
      })).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('Error Handling', (): void => {
    it('render error page when loader throws', async (): Promise<void> => {
      const TestComponent = (): ReactElement => <div>Test Component</div>;
      const ErrorComponent = (): ReactElement => <div>Error Page Content</div>;

      const testRoutes: RouteObject[] = [{
        path: '/',
        element: <TestComponent />,
        loader: (() => {
          throw new Response('Not Found', { status: 404 });
        }) as LoaderFunction,
        errorElement: <ErrorComponent />,
      }];

      const memoryRouter = createMemoryRouter(testRoutes, {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={memoryRouter} />);

      expect(await screen.findByText('Error Page Content')).toBeInTheDocument();
    });
  });
});
