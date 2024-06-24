import { useParams } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import MagicLink from './index';
import { TestRoot } from '../../config/test/react-query';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

describe('MagicLink', () => {
  it('should navigate to dashboard when there is token in url', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ token: '124' }));
    render(<MagicLink />, { wrapper: TestRoot });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/dashboard');
    });
  });
  it('should navigate to index file when there is no token in url', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ token: '' }));
    render(<MagicLink />, { wrapper: TestRoot });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/');
    });
  });
});
