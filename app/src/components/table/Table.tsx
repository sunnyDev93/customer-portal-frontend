import React, { useMemo, useState } from 'react';
import { DataTableFieldType } from 'types';
import Pagination from './Pagination';
import classNames from 'classnames';
import get from 'lodash/get';

export interface TableItem {
  id: string | number;
}

interface TableProps<T> {
  data: Array<T>;
  fields: Array<DataTableFieldType>;
}

const Table = <T extends TableItem>({ data, fields }: TableProps<T>) => {
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage, data]);

  return (
    <>
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-md mb-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      {fields.map((field: DataTableFieldType, key: number) => {
                        return (
                          <th
                            key={`head-${key}`}
                            className={classNames(
                              'text-gray-500 px-[16px] sm:px-[8px] md:px-[16px] uppercase py-4 font-normal text-[12px]',
                              field.className,
                              field.headerClassName
                            )}
                          >
                            {field.headerShouldRender ? field.headerShouldRender() : field.heading}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTableData.length > 0 ? (
                      currentTableData?.map((item: TableItem, index: number) => (
                        <tr className="bg-white border-b" key={`row-${index}`}>
                          {fields.map((field: DataTableFieldType, key: number) => {
                            return (
                              <td
                                className={classNames(
                                  'text-sm font-medium text-gray-500 px-[16px] sm:px-[8px] md:px-[16px] py-4',
                                  field.className,
                                  field.itemClassName
                                )}
                                key={`cell-${key}`}
                              >
                                {field.itemShouldRender ? field.itemShouldRender(item) : get(item, field.key)}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b" key="no-results">
                        <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalCount={data.length}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  onPageChange={(page: number) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
