import ReferralTermsConditions from 'components/modal-content/referral-terms-conditions/ReferralTermsConditions';

export default {
  component: ReferralTermsConditions,
  title: 'components/ReferralTermsConditions',
};

const Template = (args: any) => (
  <div className="flex justify-center items-center">
    <div className="w-[500px] bg-white">
      <ReferralTermsConditions />
    </div>
  </div>
);

export const FullProps: any = Template.bind({});
FullProps.args = {};
