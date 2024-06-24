import GADisclossure, { ClossureItemType } from 'components/shared/ga-disclosure/GADisclossure';
import { clossureData } from 'components/modal-content/referral-terms-conditions/ReferralTermsConditions';

export default {
  component: GADisclossure,
  title: 'shared/GADisclossure',
};

const Template = (args: any) => (
  <div className="flex justify-center items-center">
    <div className="w-[500px] bg-white">
      <GADisclossure {...args} />
    </div>
  </div>
);

export const FullProps: any = Template.bind({});
FullProps.args = {
  list: clossureData,
};
