import React from 'react';

interface TotalRecordsProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  testId?: string;
}
const TotalRecords: React.FC<TotalRecordsProps> = ({
  currentPage,
  totalCount,
  perPage,
  testId = 'total-record-coms',
}: TotalRecordsProps) => {
  const toRecords = Math.min(perPage * currentPage, totalCount);

  return (
    <div data-testid={testId} className="hidden sm:flex">
      <p className="text-sm text-gray-700">
        Showing
        <span className="font-medium ml-1 mr-1">{(currentPage - 1) * perPage + 1}</span>
        to
        <span className="font-medium ml-1 mr-1">{toRecords}</span>
        of
        <span className="font-medium ml-1 mr-1">{totalCount}</span>
        results
      </p>
    </div>
  );
};
export default TotalRecords;
