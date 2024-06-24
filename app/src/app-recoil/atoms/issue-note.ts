import { atom } from 'recoil';

const issueNoteKey = 'issueNoteKey';
const isAlreadyShowNotePopupKey = 'isAlreadyShowNotePopupKey';

export const issueNoteState = atom<string>({
  key: issueNoteKey,
  default: '',
});

export const isAlreadyShowNotePopup = atom<boolean>({
  key: isAlreadyShowNotePopupKey,
  default: false,
});
