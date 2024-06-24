import React, { FC, useMemo, useState } from 'react';
import AptiveModal from 'components/modals/AptiveModal';
import { useRecoilState } from 'recoil';
import { issueNoteState, isAlreadyShowNotePopup } from 'app-recoil/atoms/issue-note';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  isNoteRequired?: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
};
const ConfirmRescheduleDialog: FC<Props> = ({ isOpen, isLoading, onConfirm, setOpen, isNoteRequired = true }) => {
  const [issueNote, setIssueNote] = useRecoilState(issueNoteState);
  const [showError, setShowError] = useState(false);
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);

  const handleOnConfirm = () => {
    if (isNoteRequired) {
      if (!issueNote) {
        setShowError(true);
      } else {
        setShowError(false);
        onConfirm();
        setIsDoneNotePopup(true);
      }
    } else {
      onConfirm();
      setIsDoneNotePopup(true);
    }
  };

  const modalCanYouTellUsMore = useMemo((): React.ReactNode => {
    return (
      <>
        <div className="font-bold text-gray-900 text-font-18px leading-24px">Can you tell us more about it</div>
        <p className="text-gray-500 text-font-14px leading-20px mb-8">
          Please tell us what pests you&apos;re seeing and where our service pro should look for them.
        </p>

        <textarea
          id="tell-us-more-txt"
          value={issueNote}
          onChange={e => setIssueNote(e.target.value)}
          className="border border-gray-300 w-full rounded-md outline-none h-155px p-2 text-gray-500 fs-exclude"
        />

        {showError && (
          <p data-testid="error-message" className="text-red-600 text-left">
            The note field is required
          </p>
        )}
      </>
    );
  }, [issueNote, showError]);

  return (
    <AptiveModal
      description={modalCanYouTellUsMore}
      approveButtonText="Save and proceed to schedule"
      approveButtonColor="primary"
      isOpen={isOpen}
      setOpen={setOpen}
      cancelButtonText="Cancel"
      isLoading={isLoading}
      confirmCallback={handleOnConfirm}
      cancelCallback={() => {
        setIssueNote('');
        setShowError(false);
        setOpen(false);
        setIsDoneNotePopup(false);
      }}
      trackingInfo={{ name: 'popup_note', buttonApproval: 'click_save_proceed', buttonCancel: 'click_cancel' }}
    />
  );
};

export default ConfirmRescheduleDialog;
