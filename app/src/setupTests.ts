// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from 'mocks/server';
import { queryClient } from 'config/test/react-query';
import { useTrackingClick } from './shared/hooks/useTrackingClick';

jest.retryTimes(3);
beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

export const mockTrackClick = jest.fn();
beforeEach(() => {
  (useTrackingClick as jest.Mock).mockReturnValue({
    trackClick: mockTrackClick,
  });

  // Mock window object
  global['window'] ??= Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://app.customer-portal.dev.goaptive.com:8000/',
    },
    writable: true,
  });

  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  (useTrackingClick as jest.Mock).mockReturnValue({
    trackClick: mockTrackClick,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  // Reset any runtime handlers tests or query results may use.
  server.resetHandlers();
  queryClient.clear();
  jest.clearAllMocks();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});

jest.mock('shared/hooks/useTrackingClick');
jest.mock('shared/hooks/useTrackingView');
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
