import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { DatePicker, Select, Input, Option } from 'element-ui';
import FilterCombox from './FilterCombox';

describe('FilterCombox', () => {
  it('should render the empty columns without exception', () => {
    const run = () => mount(FilterCombox);
    expect(run).not.toThrow();
  });

  it('should render the empty column without exception', () => {
    const columns = [{}, {}, {}, {}, {}];
    const run = () =>
      mount(FilterCombox, {
        propsData: { columns },
      });
    expect(run).not.toThrow();
  });

  it('should render with the length of the columns', () => {
    const columns = [
      { label: 'A', key: 'a' },
      { label: 'B', key: 'b' },
      { label: 'C', key: 'c' },
    ];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    expect(wrapper.findAll('.filter-combox__form-item')).toHaveLength(3);
  });

  it('should render the label in the columns', () => {
    const columns = [{ label: 'expected_column_A' }, { label: 'expected_column_B' }, { label: 'expected_column_C' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const html = wrapper.html();
    expect(html).toContain('expected_column_A');
    expect(html).toContain('expected_column_B');
    expect(html).toContain('expected_column_C');
  });

  it('should render an input element when the column.type equal `input`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'input' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const com = wrapper.findComponent(Input);
    expect(com.exists()).toBeTruthy();
  });

  it('should render a select element when the column.type equal `select`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'select' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const com = wrapper.findComponent(Select);
    expect(com.exists()).toBeTruthy();
  });

  it('should render the select element with custom options', () => {
    const columns = [
      {
        label: 'A',
        key: 'a',
        type: 'select',
        data: [
          { label: 'test A', key: 'a' },
          { label: 'test B', key: 'b' },
        ],
      },
    ];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    expect(wrapper.findAllComponents(Option)).toHaveLength(2);
  });

  it('should render a multiple selector via the config.multiple equals true', () => {
    const columns = [
      {
        label: 'A',
        key: 'a',
        type: 'select',
        config: {
          multiple: true,
        },
      },
    ];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    expect(wrapper.findAll('.el-select__tags')).toHaveLength(1);
  });

  it('should render a date picker element when the column.type equal `date`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'date' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const com = wrapper.findComponent(DatePicker);
    expect(com.exists()).toBeTruthy();
  });

  it('should render a date range picker element when the column.type equal `daterange`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'daterange' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const com = wrapper.findComponent(DatePicker);
    expect(com.exists()).toBeTruthy();
    expect(com.attributes().class).include('el-date-editor--daterange');
  });

  it('should access the form values via `getValues`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'input' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const field = wrapper.find('input');
    field.setValue('test');
    const $vm: any = wrapper.vm;
    expect($vm.getValues()).toEqual({ a: 'test' });
  });

  it('should reset the form values via `reset`', () => {
    const columns = [{ label: 'A', key: 'a', type: 'input' }];
    const wrapper = mount(FilterCombox, {
      propsData: { columns },
    });
    const field = wrapper.find('input');
    field.setValue('test');
    const $vm: any = wrapper.vm;
    $vm.reset();
    expect($vm.getValues()).toEqual({});
  });
});
