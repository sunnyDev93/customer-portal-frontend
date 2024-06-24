import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { usePagination } from './usePagination';
import PerPageRecords from './PerPageRecords';
import TotalRecords from './TotalRecords';
import styles from './Pagination.module.scss';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';

interface paginationProps {
  onPageChange: (value: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  perPage: number;
  setPerPage: (value: number) => void;
}
const Pagination: React.FC<paginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  perPage,
  setPerPage,
}: paginationProps) => {
  const { trackClick } = useTrackingClick();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    perPage,
  });

  const [page, setPage] = useState(currentPage);

  useEffect(() => setPage(currentPage), [currentPage]);

  const totalPages = useMemo(() => Math.ceil(totalCount / perPage), [totalCount, perPage]);

  if (totalCount === 0) {
    return null;
  }

  const onNext = () => {
    trackClick('page_right/from/navigation');
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    trackClick('page_left/from/navigation');
    onPageChange(currentPage - 1);
  };

  const navigatorClass = (currentPage: number, disabledPage: number): string => {
    return classnames(
      'relative inline-flex items-center justify-center border border-gray-300 bg-white mx-[2px] rounded-lg hover:bg-gray-50 focus:z-20',
      {
        'cursor-not-allowed text-gray-400': currentPage === disabledPage,
        'text-gray-500 cursor-pointer': currentPage !== disabledPage,
      }
    );
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      data-testid="pagination-com"
      className="flex items-center justify-center md:justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <TotalRecords testId="total-record-coms" currentPage={currentPage} totalCount={totalCount} perPage={perPage} />
        <div className="flex items-center justify-between">
          <PerPageRecords testId="per-page-record" perPage={perPage} setPerPage={setPerPage} onPageChange={onPageChange} />
          <nav className={classnames('isolate inline-flex rounded-md shadow-sm nav', styles.nav)} aria-label="Pagination">
            <div
              key="firstPage"
              onClick={() => {
                if (currentPage !== 1) {
                  trackClick('page_begin/from/navigation');
                  onPageChange(1);
                }
              }}
              className={navigatorClass(currentPage, 1)}
            >
              <span className="sr-only">First</span>
              <span className="text-[1.5rem] font-extralight">&laquo;</span>
            </div>

            <div key="backPage" onClick={() => +currentPage > 1 && onPrevious()} className={navigatorClass(currentPage, 1)}>
              <span className="sr-only">Previous</span>
              <span className="text-[1.5rem] font-extralight">&#8249;</span>
            </div>

            <input
              name="page"
              type="text"
              id="page"
              value={page}
              onKeyPress={event => {
                const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
                if (event.key === 'Enter') {
                  const correctPage = Math.max(Math.min(page, totalPages), 1);
                  onPageChange(correctPage);
                  setPage(correctPage);
                  (event.target as HTMLElement).blur();
                }
                return !event.key.match(regex) && event.preventDefault();
              }}
              onChange={event => {
                setPage((event.target.value ? +event.target.value : '') as number);
              }}
              onBlur={() => {
                if (!page) {
                  setPage(currentPage);
                }
              }}
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[38px] mx-[2px] p-2.5 text-center"
            />
            <span className="text-gray-900 text-sm white-space:nowrap mx-[2px] flex items-center flex-shrink-0">of {totalPages}</span>

            <div
              onClick={() => (currentPage !== lastPage ? onNext() : {})}
              key="nextPage"
              className={navigatorClass(currentPage, lastPage as number)}
            >
              <span className="sr-only">Next</span>
              <span className="text-[1.5rem] font-extralight">&#8250;</span>
            </div>

            <div
              onClick={() => {
                if (currentPage !== lastPage) {
                  trackClick('page_end/from/navigation');
                  onPageChange(lastPage as number);
                }
              }}
              key="lastPage"
              className={navigatorClass(currentPage, lastPage as number)}
            >
              <span className="sr-only">Last</span>
              <span className="text-[1.5rem] font-extralight">&raquo;</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
