import React from 'react';
import { render } from '@testing-library/react';
import MainNavSkeleton from './MainNavSkeleton'; // Adjust the import path based on your project structure

jest.mock('configcat-react', () => ({
  useFeatureFlag: () => ({ value: true }),
}));
describe('MainNavSkeleton Component', () => {
  it('renders correctly', () => {
    const { container } = render(<MainNavSkeleton />);

    expect(container).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders the logo and mobile menu icon', () => {
    const { container } = render(<MainNavSkeleton />);

    expect(container.querySelector('img[alt="Aptive"]')).toBeInTheDocument();
  });

  it('renders tab skeletons', () => {
    const { container } = render(<MainNavSkeleton />);

    const tabSkeletons = container.querySelectorAll('.whitespace-nowrap');
    expect(tabSkeletons.length).toBe(3); // Three tabs

    tabSkeletons.forEach(tabSkeleton => {
      expect(tabSkeleton.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(tabSkeleton.querySelector('.rounded-full')).toBeInTheDocument();
      expect(tabSkeleton.querySelector('.w-20')).toBeInTheDocument();
    });
  });
});
