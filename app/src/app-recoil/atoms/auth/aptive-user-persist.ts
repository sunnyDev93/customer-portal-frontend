import { atom } from 'recoil';

const aptiveUserPersistKey = 'aptiveUserPersistKey';

export const aptiveUserPersistState = atom<any>({
  key: aptiveUserPersistKey,
  default: null,
});
