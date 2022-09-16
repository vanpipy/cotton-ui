import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CottonTable from './index.vue';

describe('CottonTable', () => {
  it('should render with columns', () => {
    const columns = [
      { label: 'A0', key: 'a' },
      { label: 'B0', key: 'b' },
      { label: 'C0', key: 'c' },
    ];
    const wrapper = mount(CottonTable, {
      propsData: {
        columns
      }
    });
    const tpl = wrapper.html();
    expect(tpl).toContain('A0');
    expect(tpl).toContain('B0');
    expect(tpl).toContain('C0');
  })
})
