import React from 'react';
import { render, screen } from '@testing-library/react';
import NoSpotWarning from './NoSpotWarning';
import { TestRoot } from 'config/test/react-query';
import { waitFor } from '@storybook/testing-library';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { getCustomerSpotsResponse } from 'mocks/responseMocks';
import { baseURL } from 'services/config';

describe('NoSpotWarning component', () => {
  it('should render nothing when there are spots available', () => {
    const { container } = render(
      <TestRoot>
        <NoSpotWarning accountId="123" />
      </TestRoot>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render the warning message when there are no spots available', async () => {
    server.use(
      rest.post(`${baseURL}/customer/:accountNumber/spots`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...getCustomerSpotsResponse, data: [] }));
      })
    );

    const { getByText } = render(
      <TestRoot>
        <NoSpotWarning accountId="123" />
      </TestRoot>
    );
    await waitFor(() => expect(getByText(/There are no available appointments in the selected period/i)).toBeInTheDocument());
  });
});
