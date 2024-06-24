import SubscriptionInformation from 'pages/Dashboard/components/subscription-information/SubscriptionInformation';

export default {
  component: SubscriptionInformation,
  title: 'components/SubscriptionInformation',
};

const Template = (args: any) => (
  <div className="w-[300px]">
    <SubscriptionInformation {...args} />
  </div>
);

export const FullProps: any = Template.bind({});
FullProps.args = {
};

export const NoProps: any = Template.bind({});
FullProps.args = {
};
