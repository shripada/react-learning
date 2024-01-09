import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Custom/TextInput',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {
  args: {
    label: 'User name',
  },
};

export const WithError: Story = {
  args: {
    label: 'User name',
    error: 'Can not be empty!',
  },
};
