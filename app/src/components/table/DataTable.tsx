import React, { useMemo, useState } from 'react';
import { DataTableFieldType } from 'types';
import Pagination from './Pagination';
import classNames from 'classnames';
import AptiveModal from 'components/modals/AptiveModal';
import get from 'lodash/get';
import useDeviceDetect, { DeviceType } from 'shared/hooks/useDeviceDetect';

interface TableProps<T> {
  data?: Array<T>;
  fields?: Array<DataTableFieldType>;
}

export interface TableItem {
  id: string;
}

const DataTable = <T extends TableItem>({ data, fields }: TableProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T>();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);

  const deviceType = useDeviceDetect();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage, data]);

  const processDownload = (blob: Blob, fileName: string) => {
    if (blob && fileName) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    setSelectedItem(undefined);
  };

  const downloadItem = (item: T | undefined = selectedItem) => {
    setShowDownloadModal(false);
    if (item) {
      fetch(get(item, 'documentLink') as any)
        .then(resp => resp.blob())
        .then(blob => processDownload(blob, get(item, 'documentName') as any));
    }
  };

  const onClickDownload = (event: React.MouseEvent<HTMLElement>, item: T) => {
    event?.preventDefault();
    if (deviceType === DeviceType.Mobile) {
      setSelectedItem(item);
      setShowDownloadModal(true);
    } else {
      downloadItem(item);
    }
  };

  const modalDescription = useMemo<React.ReactNode>(
    () =>
      selectedItem ? (
        <div className="text-gray-500">
          You’re downloading <span className="font-bold text-gray-500">{get(selectedItem, 'documentName') as any}.</span>
        </div>
      ) : null,
    [selectedItem]
  );

  return (
    <>
      <AptiveModal
        title=""
        subTitle=""
        description={modalDescription}
        approveButtonText="Download"
        approveButtonColor="primary"
        isOpen={showDownloadModal}
        setOpen={setShowDownloadModal}
        isLoading={false}
        confirmCallback={downloadItem}
      />
      <div data-testid="data-table" className="bg-white shadow-lg overflow-hidden sm:rounded-md mb-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      {fields?.map((field: DataTableFieldType, key: number) => {
                        return (
                          <th
                            data-testid="field-item"
                            key={`head-${key}`}
                            className={classNames('text-gray-500 px-6 uppercase py-4 font-normal text-[12px]', field.className)}
                          >
                            {field.heading}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  {currentTableData && (
                    <tbody data-testid="current-table">
                      {currentTableData.length > 0 ? (
                        currentTableData?.map((item: any, index: number) => (
                          <tr className="bg-white border-b" key={`row-${index}`}>
                            {fields?.map((field: any, key: number) => {
                              return (
                                <td
                                  data-testid="data-table-item"
                                  className={classNames('text-sm font-medium text-gray-500 px-6 py-4', field.className)}
                                  key={`cell-${key}`}
                                >
                                  {field.link ? (
                                    <a
                                      rel="noreferrer"
                                      href={item[field.link] ?? ''}
                                      target="_blank"
                                      className="md:text-green-700 font-medium text-aptive-link"
                                      onClick={event => field?.downloadable && onClickDownload(event, item)}
                                    >
                                      {item[field.key] ?? 'Download'}
                                    </a>
                                  ) : (
                                    item[field.key] ?? ''
                                  )}
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
                  )}
                </table>
                {data && (
                  <div data-testid="pagination-table">
                    <Pagination
                      currentPage={currentPage}
                      totalCount={data.length}
                      perPage={perPage}
                      setPerPage={setPerPage}
                      onPageChange={(page: number) => setCurrentPage(page)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DataTable;
