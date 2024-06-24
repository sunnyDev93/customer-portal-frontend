import { atom } from 'recoil';

const expandedInvoiceIdKey = 'expandedInvoiceIdKey';

export const expandedInvoiceIdState = atom<number | null>({
  key: expandedInvoiceIdKey,
  default: null,
});
