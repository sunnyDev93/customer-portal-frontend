import { atom } from 'recoil';

const aptiveUserDataKey = 'aptiveUserDataKey';

export const aptiveUserDataState = atom<any>({
  key: aptiveUserDataKey,
  default: null,
});
