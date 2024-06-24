import Button from '../../../shared/components/Button';
import Warning from './Warning';

export default {
  component: Warning,
  title: 'shared/Warning',
};

const Template = (args: any) => <Warning {...args} />;

export const FullProps: any = Template.bind({});
FullProps.args = {
  headTitle: 'This is demo headTitle',
  description: 'This is demo Description',
  actionButton: <Button label="Make Payment" type="button" color="danger" />,
};

export const NoButton: any = Template.bind({});
NoButton.args = {
  headTitle: 'This is demo headTitle',
  description: 'This is demo Description',
};

export const NoHeadTitle: any = Template.bind({});
NoHeadTitle.args = {
  description: 'This is demo Description',
  actionButton: <Button label="Make Payment" type="button" color="danger" />,
};

export const NoDescription: any = Template.bind({});
NoDescription.args = {
  headTitle: 'This is demo headTitle',
  actionButton: <Button label="Make Payment" type="button" color="danger" />,
};
