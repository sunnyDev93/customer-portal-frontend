import ReferralSection from 'pages/Dashboard/components/referral-section/ReferralSection';

export default {
  component: ReferralSection,
  title: 'components/ReferralSection',
};

const Template = (args: any) => (
  <div className="w-[300px]">
    <ReferralSection {...args} />
  </div>
);

export const FullProps: any = Template.bind({});
FullProps.args = {
  customerId: '2869416',
};
