import React from 'react';
import { render } from '@testing-library/react';
import UpcomingAppointmentPageSkeleton from 'pages/UpcomingAppointment/components/UpcomingAppointmentPageSkeleton';

describe('UpcomingAppointmentPageSkeleton Component', () => {
  it('renders correctly', () => {
    const { container } = render(<UpcomingAppointmentPageSkeleton />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    expect(container.querySelectorAll('li').length).toBe(5);
  });

  it('renders header skeleton', () => {
    const { container } = render(<UpcomingAppointmentPageSkeleton />);
    expect(container.querySelector('.text-xl')).toBeInTheDocument();
    expect(container.querySelector('.bg-gray-300')).toBeInTheDocument();
  });

  it('renders list item skeletons', () => {
    const { container } = render(<UpcomingAppointmentPageSkeleton />);
    const listItemSkeletons = container.querySelectorAll('li:not(:first-child)');
    expect(listItemSkeletons.length).toBe(4);
    listItemSkeletons.forEach(listItem => {
      expect(listItem.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(listItem.querySelector('.font-medium')).toBeInTheDocument();
      expect(listItem.querySelector('.bg-gray-400')).toBeInTheDocument();
    });
  });
});
