import { act, renderHook, waitFor } from '@testing-library/react';
import useVerifyMagicLinkToken from './useVerifyMagicLinkToken';
import { TestRoot } from '../../../config/test/react-query';
import { server } from '../../../mocks/server';
import { verifyMagicLinkTokenHandler } from '../../../mocks/mock-handlers';

const mockConfigRequestToken = jest.fn();
const mockNavigate = jest.fn();
jest.mock('../../../services/config', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../../services/config'),
    configRequestToken: () => mockConfigRequestToken(),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useVerifyMagicLinkToken', () => {
  describe('when it succeeds', () => {
    it('should return the jwt token', async () => {
      const { result } = renderHook(() => useVerifyMagicLinkToken(), { wrapper: TestRoot });
      act(() => {
        result.current.mutate({ token: 'magicLinkToken' });
      });
      await waitFor(() => {
        expect(mockConfigRequestToken).toBeCalled();
        expect(mockNavigate).toBeCalledWith('/dashboard');
      });
    });
  });

  describe('when it fails', () => {
    it('should return to invalid magic link route', async () => {
      server.use(verifyMagicLinkTokenHandler.invalidTokenHandler);
      const { result } = renderHook(() => useVerifyMagicLinkToken(), { wrapper: TestRoot });
      act(() => {
        result.current.mutate({ token: 'magicLinkToken' });
      });
      await waitFor(() => {
        expect(mockConfigRequestToken).not.toBeCalled();
        expect(mockNavigate).toBeCalledWith('/magic-link-expired?errorCode=460');
      });
    });
    it('should return to expired magic link route', async () => {
      server.use(verifyMagicLinkTokenHandler.expiredTokenHandler);
      const { result } = renderHook(() => useVerifyMagicLinkToken(), { wrapper: TestRoot });
      act(() => {
        result.current.mutate({ token: 'magicLinkToken' });
      });
      await waitFor(() => {
        expect(mockConfigRequestToken).not.toBeCalled();
        expect(mockNavigate).toBeCalledWith('/magic-link-expired?errorCode=461');
      });
    });
  });
});
