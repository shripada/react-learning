import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Custom/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  args: {
    items: ['Delhi', 'Kolkota', 'Mumbai'],
    ordered: true,
  },
};
