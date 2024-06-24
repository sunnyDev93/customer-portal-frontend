import React from 'react';
import Button from '../../../shared/components/Button';
import ReferralTermsConditions from 'components/modal-content/referral-terms-conditions/ReferralTermsConditions';
import SlideOut from './SlideOut';

export default {
  component: SlideOut,
  title: 'shared/SlideOut',
};

const Template = (args: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        label="Click me"
      />

      <SlideOut isOpen={open} onClose={() => setOpen(false)} customChildContainerClass="md:h-[80vh]">
        <ReferralTermsConditions />
      </SlideOut>
    </>
  );
};

export const FullProps: any = Template.bind({});
FullProps.args = {
  children: ReferralTermsConditions,
  isOpen: true,
};
