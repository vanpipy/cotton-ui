import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import LoadableButton from './index.vue';

describe('LoadableButton', () => {
  it('should render the custom content', () => {
    const wrapper = mount(LoadableButton, {
      slots: {
        default: 'test button'
      }
    });
    expect(wrapper.text()).toContain('test button')
  })
})
