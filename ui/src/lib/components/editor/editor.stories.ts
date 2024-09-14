import type { Meta, StoryObj } from '@storybook/angular';
import {EditorComponent} from './editor.component';

const meta: Meta<EditorComponent> = {
  component: EditorComponent,
  title: '组件/editor',
  argTypes: {}
};
export default meta;
type Story = StoryObj<EditorComponent>;

export const Primary: Story = {
  name: '',
  parameters: {},
  args: {}
};
