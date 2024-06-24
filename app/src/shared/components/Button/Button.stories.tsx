import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import Button from '.';

export default {
  component: Button,
  title: 'shared/Button',
};

const Template = (args: any) => <Button {...args} />;

export const Primary: any = Template.bind({});
Primary.args = {
  color: 'primary',
  label: 'Primary Button',
};

export const PrimaryWithIcon: any = Template.bind({});
PrimaryWithIcon.args = {
  color: 'primary',
  label: 'Primary Button',
  icon: <PlusCircleIcon />,
};

export const Secondary: any = Template.bind({});
Secondary.args = {
  color: 'secondary',
  label: 'Secondary Button',
};

export const SecondaryWithIcon: any = Template.bind({});
SecondaryWithIcon.args = {
  color: 'secondary',
  label: 'Secondary Button',
  icon: <PlusCircleIcon />,
};

export const Muted: any = Template.bind({});
Muted.args = {
  color: 'muted',
  label: 'Muted Button',
};

export const MutedWithIcon: any = Template.bind({});
MutedWithIcon.args = {
  color: 'muted',
  label: 'Muted Button',
  icon: <PlusCircleIcon />,
};

export const Danger: any = Template.bind({});
Danger.args = {
  color: 'danger',
  label: 'Danger Button',
};

export const DangerWithIcon: any = Template.bind({});
DangerWithIcon.args = {
  color: 'danger',
  label: 'Danger Button',
  icon: <PlusCircleIcon />,
};
