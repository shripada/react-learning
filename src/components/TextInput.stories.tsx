import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';
import { ChangeEvent, ComponentProps } from 'react';

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
    defaultValue: 'a user value',
    type: 'checkbox',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    onChange: (e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value),
  },
};

export const HandleChange: Story = {
  args: {
    label: 'Company name',
    defaultValue: 'CodeCraft Technologies',
    handleChange: (text: string) => console.log(text),
    // This will be simply ignored!
    className: `text-red-600 pl-4`,
    disabled: true,
  },
};
