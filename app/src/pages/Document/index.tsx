import React, { useMemo, useRef, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { DataTableFieldType } from 'types';
import Table from 'components/table/Table';
import get from 'lodash/get';
import useDeviceDetect, { DeviceType } from 'shared/hooks/useDeviceDetect';
import AptiveModal from 'components/modals/AptiveModal';
import PageTitle from 'components/PageTitle';
import { useDownloadFile } from 'shared/hooks/useDownloadFile';
import { useRecoilValue } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { useTrackingView } from 'shared/hooks/useTrackingView';
import useGetCustomerDocuments, { CustomerDocument } from 'pages/Document/hooks/useGetCustomerDocuments';
import { DatetimeHelper } from 'helpers/datetime';
import { generateApiUrlByVersion } from 'services/CustomerService';

interface FilterType {
  image: boolean;
  document: boolean;
  paper_statement: boolean;
  keyword: string;
}

const getFileName = (documentLink: string) => {
  return documentLink.split('?')[0].split('/').reverse()[0];
};

const DocumentPage: React.FC = () => {
  const deviceType = useDeviceDetect();
  const aptiveUser = useRecoilValue(aptiveUserState);
  const [filter, setFilter] = useState<FilterType>({
    image: true,
    document: true,
    paper_statement: true,
    keyword: '',
  });
  const [selectedItem, setSelectedItem] = useState<CustomerDocument>();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { trackClick } = useTrackingClick();

  useTrackingView();
  const { mutate } = useDownloadFile();
  const { isLoading, data: apiData } = useGetCustomerDocuments();

  const downloadItem = (item: CustomerDocument | undefined = selectedItem) => {
    setShowDownloadModal(false);
    if (item) {
      mutate(
        {
          url: `${generateApiUrlByVersion(2)}/customer/${aptiveUser?.accountId}/documents/${item.id}/download?documentType=${item.type}`,
          fileName: getFileName(get(item, 'documentLink')),
        },
        { onSettled: () => setSelectedItem(undefined) }
      );
    }
  };

  const onClickDownload = (event: React.MouseEvent<HTMLElement>, item: CustomerDocument) => {
    event?.preventDefault();
    trackClick('click_download/from/content');
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
          You’re downloading <span className="font-bold text-gray-500">{get(selectedItem, 'documentName')}.</span>
        </div>
      ) : null,
    [selectedItem]
  );

  const fields: Array<DataTableFieldType> = [
    {
      heading: '',
      headerShouldRender: () => <div data-testid="uploaded">UPLOADED</div>,
      itemShouldRender: (item: CustomerDocument) => {
        const formattedDate = DatetimeHelper.trimOffTimeZoneOffset(item.dateAdded).format('MM/DD/YYYY');
        return (
          <>
            <div className="hidden md:block">{formattedDate}</div>
            <div className="block md:hidden">{formattedDate?.split(' ')?.[0]}</div>
          </>
        );
      },
      key: 'formattedDateAdded',
      headerClassName: 'text-right w-[100px] md:w-[195px] align-top hidden sm:table-cell',
      itemClassName: 'text-right w-[100px] md:w-[195px] align-middle hidden sm:table-cell',
    },
    {
      heading: '',
      headerShouldRender: () => (
        <>
          <div className="w-2/3 text-left hidden md:block" data-testid="file-name">FILE NAME</div>
          <div className="w-1/3 col-span-2 text-left hidden md:block md:ml-5">FILE DESCRIPTION</div>
          <div className="col-span-3 text-left block md:hidden">
            FILE/
            <br />
            DESCRIPTION
          </div>
        </>
      ),
      itemShouldRender: (item: CustomerDocument) => {
        const documentName = getFileName(item.documentLink);
        const documentDescription = item.type === 'Form' ? item.formDescription : item.description;

        return (
          <>
            <div className="w-2/3 text-left hidden md:block text-blue-500 font-medium text-aptive-link break-all">
              <a
                rel="noreferrer"
                href={item.documentLink}
                target="_blank"
                className="font-medium text-aptive-link"
                onClick={() => trackClick('click_filename/from/content')}
              >
                {documentName}
              </a>
            </div>
            <div className="w-1/3 col-span-2 text-left hidden md:block md:ml-5">{documentDescription}</div>

            <div className="col-span-3 text-left block md:hidden">
              <div className="text-left text-blue-500 font-medium text-aptive-link break-all">
                <a
                  rel="noreferrer"
                  href={item.documentLink}
                  target="_blank"
                  className="font-medium text-aptive-link"
                  onClick={() => trackClick('click_filename/from/content')}
                >
                  {documentName}
                </a>
              </div>
              <br />
              {documentDescription}
            </div>
          </>
        );
      },
      key: 'Download',
      link: 'documentLink',
      className: 'flex justify-between items-center',
    },
    {
      heading: '',
      headerShouldRender: () => <span className="md:hidden" data-testid="download">DOWNLOAD</span>,
      itemShouldRender: (item: CustomerDocument) => (
        <>
          <a
            rel="noreferrer"
            href={item?.documentLink}
            target="_blank"
            className="text-left hidden md:block text-blue-500 font-medium text-aptive-link break-all"
            onClick={event => onClickDownload(event, item)}
          >
            Download
          </a>
          <div className="flex justify-center align-center md:hidden ">
            <div className="cursor-pointer" onClick={event => onClickDownload(event, item)}>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 15C2.79086 15 1 13.2091 1 11C1 9.09295 2.33457 7.4976 4.12071 7.09695C4.04169 6.74395 4 6.37684 4 6C4 3.23858 6.23858 1 9 1C11.4193 1 13.4373 2.71825 13.9002 5.00098C13.9334 5.00033 13.9666 5 14 5C16.7614 5 19 7.23858 19 10C19 12.419 17.2822 14.4367 15 14.9M7 18L10 21M10 21L13 18M10 21V9"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </>
      ),
      key: 'Download',
      link: 'documentLink',
      headerClassName: 'text-center align-top md:w-[123px]',
      itemClassName: 'text-center align-middle md:w-[123px]',
    },
  ];

  const lower = (value: string) => {
    return value.toLowerCase();
  };

  const documentData = useMemo(() => {
    let filteredData = apiData || [];

    if (filter.keyword !== '') {
      const keyword = lower(filter.keyword);

      filteredData = filteredData?.filter((item: any) => {
        return (
          lower(item.formattedDateAdded).includes(keyword) ||
          lower(item.documentName).includes(keyword) ||
          lower(item.description).includes(keyword)
        );
      });
    }

    return filteredData;
  }, [apiData, filter]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div data-testid="document-page">
      {isLoading ? (
        <div className="flex justify-center" data-testid="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
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
          <PageTitle title="My Documents" />

          <Table fields={fields} data={documentData} />
        </>
      )}
    </div>
  );
};

export default DocumentPage;
