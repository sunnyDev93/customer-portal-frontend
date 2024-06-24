import { atom } from 'recoil';
import { CustomerInfoResponse } from 'types/request';

const customerInfo = 'customerInfo';

export const customerInfoDataState = atom<CustomerInfoResponse | null>({
  key: customerInfo,
  default: null,
});
