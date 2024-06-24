import React from 'react';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';

interface PerPageRecordsProps {
  perPage: number;
  testId?: string;
  setPerPage: (value: number) => void;
  onPageChange: (value: number) => void;
}
const PerPageRecords: React.FC<PerPageRecordsProps> = ({
  testId = 'per-page-record',
  perPage,
  setPerPage,
  onPageChange,
}: PerPageRecordsProps) => {
  const { trackClick } = useTrackingClick();

  const pages: Array<number> = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const changePerPage = (page: number) => {
    setPerPage(page);
    onPageChange(1);
  };

  return (
    <div data-testid={testId} className="hidden md:flex items-center flex-shrink-0">
      <label className="hidden lg:block text-gray-900 text-sm white-space:nowrap mr-2">Rows per page</label>
      <div className="md:flex md:items-center mr-3">
        <select
          data-testid="select-record"
          defaultValue={perPage}
          onChange={value => changePerPage(parseInt(value.target.value))}
          onClick={() => trackClick('click_dropdown/from/navigation')}
          id="perPage"
          className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[36px]"
        >
          {pages.map((page: number, index: number) => {
            return (
              <option data-testid="record-items" key={`per_page${index}`} value={page}>
                {page}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default PerPageRecords;
