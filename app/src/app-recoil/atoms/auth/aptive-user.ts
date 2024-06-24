import { atom } from 'recoil';

const aptiveUserKey = 'aptiveUserKey';

export const aptiveUserState = atom<any>({
  key: aptiveUserKey,
  default: null,
});
