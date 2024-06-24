import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentItem from './AppointmentItem';

describe('AppointmentItem', () => {
  describe('AppointmentItem normally', () => {
    it('should show full information', () => {
      render(<AppointmentItem date="Today" period="period" />);
      const dateLabel = screen.getByText('Today');
      const periodLabel = screen.getByText('period');
      expect(dateLabel).toBeInTheDocument();
      expect(periodLabel).toBeInTheDocument();
    });
    it('text should be normal', () => {
      render(<AppointmentItem date="Today" period="period" />);
      const dateLabel = screen.getByText('Today');
      const periodLabel = screen.getByText('period');
      expect(dateLabel).toHaveClass('text-gray-900');
      expect(periodLabel).toHaveClass('text-gray-500');
    });
  });
  describe('AppointmentItem Unavailable', () => {
    it('should Unavailable label', () => {
      render(<AppointmentItem unavailable />);
      const unavailableLabel = screen.getByText('Unavailable');
      expect(unavailableLabel).toBeInTheDocument();
    });
    it('text should be gray', () => {
      render(<AppointmentItem date="today" unavailable />);
      const unavailableLabel = screen.getByText('today');
      expect(unavailableLabel).toHaveClass('text-gray-400');
    });
  });
});
