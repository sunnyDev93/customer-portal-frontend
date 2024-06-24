import { useMutation } from 'react-query';
import aptiveAPI from 'services/config';

export const useDownloadFile = () => {
  return useMutation(
    'downloadFile',
    ({ url, fileName }: { url: string; fileName: string }) => aptiveAPI.get(url, { responseType: 'blob' }),
    {
      onSuccess: (response, { fileName }) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(url), 0);
      },
    }
  );
};
