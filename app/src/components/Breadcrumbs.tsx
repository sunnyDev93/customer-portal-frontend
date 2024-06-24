import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';

interface Pages {
  title: string;
  current: boolean;
}

interface BreadcrumbsProps {
  pages?: Pages[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pages = [] }) => {
  return (
    <nav className="bg-white border-b border-t border-gray-300 py-4 flex" aria-label="Breadcrumb">
      <div className="container mx-auto max-w-7xl px-4">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" data-testid="home-icon" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map(page => (
            <li key={page.title}>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                <a
                  href="!#"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.title}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
