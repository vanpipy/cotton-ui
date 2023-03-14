import { mount } from '@vue/test-utils';
import { Pagination } from 'element-ui';
import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import Table from './Table.vue';
import { wait } from './utils';

describe('Table', () => {
  it('should render columns with expected content', async () => {
    const columns = [
      { type: 'index', label: 'A' },
      { key: 'b', label: 'B' },
      { key: 'c', label: 'C' },
    ];
    const wrapper = mount(Table, {
      propsData: {
        columns,
      },
    });
    await Vue.nextTick();
    const head = wrapper.find('.el-table__header-wrapper');
    const rows = head.findAll('.el-table__cell');
    const headTmp = head.html();
    expect(rows).toHaveLength(3);
    expect(headTmp).toContain('A');
    expect(headTmp).toContain('B');
    expect(headTmp).toContain('C');
  });

  it('should have a pagination when the columns is not empty', () => {
    const columns = [{}];
    const wrapper = mount(Table, {
      propsData: {
        columns,
      },
    });
    expect(wrapper.findAllComponents(Pagination)).toHaveLength(1);
  });

  it('should have a pagination when the columns is empty', () => {
    const wrapper = mount(Table);
    expect(wrapper.findAllComponents(Pagination)).toHaveLength(1);
  });

  it('should has a default local query', () => {
    const wrapper = mount(Table);
    const $vm: any = wrapper.vm;
    const localQuery = $vm.localQuery;
    expect(Object.keys(localQuery)).toEqual(['current', 'size']);
    expect(localQuery.current).toEqual(1);
    expect(localQuery.size).toEqual(10);
  });

  it('should add new query', () => {
    const wrapper = mount(Table, {
      propsData: {
        query: {
          current: 2,
          size: 20,
          total: 30,
          A: 'test',
        },
      },
    });
    const $vm: any = wrapper.vm;
    const localQuery = $vm.localQuery;
    expect(Object.keys(localQuery)).toEqual(['current', 'size', 'total', 'A']);
    expect(localQuery.current).toEqual(2);
    expect(localQuery.size).toEqual(20);
    expect(localQuery.total).toEqual(30);
    expect(localQuery.A).toEqual('test');
  });

  it('should call the resource when mounted', () => {
    const resource = vi.fn();
    mount(Table, {
      propsData: {
        resource,
      },
    });
    expect(resource).toHaveBeenCalledTimes(1);
  });

  it('should render the table when the data has the `records`', async () => {
    const columns = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        records: [
          { a: 1, b: 3 },
          { a: 2, b: 4 },
        ],
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        columns,
        resource,
      },
    });
    await Vue.nextTick();
    await wait(10);
    const tableBody = wrapper.find('.el-table__body-wrapper');
    const bodyTmp = tableBody.html();
    const rows = tableBody.findAll('.el-table__row');
    expect(rows).toHaveLength(2);
    expect(bodyTmp).toContain('1');
    expect(bodyTmp).toContain('2');
    expect(bodyTmp).toContain('3');
    expect(bodyTmp).toContain('4');
  });

  it('should render the table with a formatter to format the data with attribute `records`', async () => {
    const formatter = (data: any) => {
      return { ...data, records: data.othersData };
    };
    const columns = [
      { key: 'c', label: 'C' },
      { key: 'd', label: 'D' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        othersData: [
          { c: 1, d: 3 },
          { c: 2, d: 4 },
        ],
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        columns,
        resource,
        formatter,
      },
    });
    await Vue.nextTick();
    await wait(10);
    const tableBody = wrapper.find('.el-table__body-wrapper');
    const bodyTmp = tableBody.html();
    expect(bodyTmp).toContain('1');
    expect(bodyTmp).toContain('2');
    expect(bodyTmp).toContain('3');
    expect(bodyTmp).toContain('4');
  });

  it('should render an empty table with a formatter to format the data without attribute `records`', async () => {
    const formatter = (data: any) => {
      delete data.records;
      return data;
    };
    const columns = [
      { key: 'e', label: 'E' },
      { key: 'f', label: 'F' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        othersData: [
          { e: '$1', f: '$2' },
          { e: '$3', f: '$4' },
        ],
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        columns,
        resource,
        formatter,
      },
    });
    await Vue.nextTick();
    const tableBody = wrapper.find('.el-table__body-wrapper');
    const bodyTmp = tableBody.html();
    const rows = tableBody.findAll('.el-table__row');
    expect(rows).toHaveLength(0);
    expect(bodyTmp).not.toContain('$1');
    expect(bodyTmp).not.toContain('$2');
    expect(bodyTmp).not.toContain('$3');
    expect(bodyTmp).not.toContain('$4');
  });

  it('should update the pagination with the attributes - `size` and `total`', async () => {
    const query = { current: 1, size: 1 };
    const columns = [
      { key: 'h', label: 'H' },
      { key: 'i', label: 'I' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        records: [
          { h: '$1', i: '$2' },
          { h: '$3', i: '$4' },
        ],
        total: 2,
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        query,
        columns,
        resource,
      },
    });
    await Vue.nextTick();
    await wait(10);
    const pagination = wrapper.find('.cotton-table__pagination');
    const pager = pagination.findAll('.el-pager .number');
    expect(pager).toHaveLength(2);
  });

  it('should update the table when the pager changed', async () => {
    const query = { current: 1, size: 1 };
    const columns = [
      { key: 'h', label: 'H' },
      { key: 'i', label: 'I' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        records: [
          { h: '$1', i: '$2' },
          { h: '$3', i: '$4' },
        ],
        total: 2,
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        query,
        columns,
        resource,
      },
    });
    await Vue.nextTick();
    await wait(10);
    const tableBody = wrapper.find('.el-table__body-wrapper');
    const pagination = wrapper.find('.cotton-table__pagination');
    const pager = pagination.findAll('.el-pager .number');
    const first = pager.at(0);
    const second = pager.at(1);
    expect(tableBody.html()).toContain('$1');
    expect(tableBody.html()).toContain('$2');
    first.trigger('click');
    expect(tableBody.html()).toContain('$3');
    expect(tableBody.html()).toContain('$4');
    second.trigger('click');
    expect(tableBody.html()).toContain('$1');
    expect(tableBody.html()).toContain('$2');
  });

  it('should create custom template when the column.template equals true', async () => {
    const columns = [
      { key: 'j', label: 'J', template: true },
      { key: 'k', label: 'K' },
    ];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        records: [{ j: '$1', k: '$2', extra: 'test word here' }],
        total: 1,
      };
    });
    const wrapper = mount(Table, {
      propsData: {
        columns,
        resource,
      },
      scopedSlots: {
        j: '<template slot-scope="scope">{{ JSON.stringify(scope.row) }}</template>',
      },
    });
    await Vue.nextTick();
    await wait(10);
    expect(wrapper.html()).toContain('{"j":"$1","k":"$2","extra":"test word here"}');
  });

  it('should convert the parameters passed into the request when the variant property exists', async () => {
    const columns = [{ key: 'l', label: 'L' }];
    const resource = vi.fn().mockImplementation(async () => {
      return {
        records: [{ l: '$1' }],
        total: 1,
      };
    });
    mount(Table, {
      propsData: {
        columns,
        resource,
        variant: {
          current: 'a',
          size: 'b',
        },
      },
    });
    await Vue.nextTick();
    await wait(10);
    expect(resource).toHaveBeenCalledWith({ a: 1, b: 10 });
  });

  it('should set the table has the broder style', () => {
    const instance = mount(Table, {
      propsData: {
        border: true,
      },
    });
    expect(instance.findAll('.el-table--border')).toHaveLength(1);
  });
});
