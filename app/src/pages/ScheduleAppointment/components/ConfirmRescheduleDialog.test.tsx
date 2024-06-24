import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmRescheduleDialog from './ConfirmRescheduleDialog';
import { RecoilRoot } from 'recoil';
import { issueNoteState } from 'app-recoil/atoms/issue-note';

const Wrapper = ({ children, issueNote = '' }: { children: React.ReactNode; issueNote?: string }) => (
  <RecoilRoot initializeState={snapshot => snapshot.set(issueNoteState, issueNote)}>{children}</RecoilRoot>
);

describe('ConfirmRescheduleDialog', () => {
  it('renders the dialog with issue note input', () => {
    const setOpen = jest.fn();
    const onConfirm = jest.fn();
    const isLoading = false;
    const issueNote = 'Sample issue note text';

    render(
      <Wrapper issueNote={issueNote}>
        <ConfirmRescheduleDialog isOpen={true} isLoading={isLoading} setOpen={setOpen} onConfirm={onConfirm} />{' '}
      </Wrapper>
    );

    expect(screen.getByText('Can you tell us more about it')).toBeInTheDocument();
    expect(screen.getByText("Please tell us what pests you're seeing and where our service pro should look for them.")).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save and proceed to schedule' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
  it('handles issue note error', () => {
    const setOpen = jest.fn();
    const onConfirm = jest.fn();
    const isLoading = false;

    render(
      <Wrapper>
        <ConfirmRescheduleDialog isOpen={true} isLoading={isLoading} setOpen={setOpen} onConfirm={onConfirm} />
      </Wrapper>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save and proceed to schedule' }));

    expect(screen.getByText('The note field is required')).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });
  it('handles cancel button', () => {
    const setOpen = jest.fn();
    const onConfirm = jest.fn();
    const isLoading = false;

    render(<ConfirmRescheduleDialog isOpen={true} isLoading={isLoading} setOpen={setOpen} onConfirm={onConfirm} />, { wrapper: Wrapper });

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onConfirm).not.toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
