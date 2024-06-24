import { atom } from 'recoil';

const aptiveUserAccountsKey = 'aptiveUserAccountsKey';

export const aptiveUserAccountsState = atom<any>({
  key: aptiveUserAccountsKey,
  default: null,
});
