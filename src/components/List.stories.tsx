import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';
import { ChangeEvent, ComponentProps } from 'react';
import React from 'react';

const meta: Meta<typeof List> = {
  title: 'Custom/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  render: () => <List items={['hi', 'how']}></List>,
};
