<template>
  <div class="cotton-table">
    <ElementTable class="cotton-table__instance" :data="data" style="width: 100%">
      <ElementTableColumn v-for="column in columns" :key="column.key" v-bind="column">
        <template slot-scope="scope">
          <slot v-if="column.template" :name="column.key" :scope="scope" />
          <span v-if="!column.template">
            {{ column.type === 'index' ? scope.$index + 1 : null }}
            {{ column.type !== 'index' ? scope.row[column.key] : '' }}
          </span>
        </template>
      </ElementTableColumn>
    </ElementTable>
    <Pagination
      background
      class="cotton-table__pagination"
      :layout="pagination.layout"
      :current-page="pagination.current"
      :page-size="pagination.size"
      :total="pagination.total"
      @current-change="onCurrentPageChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { Table, TableColumn, Pagination } from 'element-ui';
import { omit, noop } from 'lodash';
import { justRetrunValue } from './utils';

const defaultQuery = {
  current: 1,
  size: 10,
};

const defaultPageValue = {
  ...defaultQuery,
  total: 0,
  layout: 'total, prev, pager, next, jumper',
};

type Page = {
  current: number;
  size: number;
  total: number;
  layout?: string;
};

type DataCell = {
  [key: string]: unknown;
};

type AnyObject = {
  [key: string]: unknown;
};

type Resp = {
  current: number;
  size: number;
  total: number;
  records: AnyObject[];
};

export default {
  name: 'CottonTable',

  components: {
    ElementTable: Table,
    ElementTableColumn: TableColumn,
    Pagination,
  },

  props: {
    resource: {
      type: Function,
      default: noop,
    },
    formatter: {
      type: Function,
      default: justRetrunValue,
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    query: {
      type: Object,
      default() {
        return defaultQuery;
      },
    },
  },

  data: function (): {
    localQuery: AnyObject;
    dataLoading: boolean;
    data: DataCell[];
    pagination: Page;
  } {
    return {
      localQuery: { ...defaultQuery },
      dataLoading: false,
      data: [],
      pagination: { ...defaultPageValue },
    };
  },

  mounted: function () {
    this.localQuery = { ...this.localQuery, ...this.query };
    this.pagination.size = this.localQuery.size;
    this.refresh(this.localQuery);
  },

  methods: {
    request: async function (params = {}): Promise<Resp> {
      try {
        this.dataLoading = true;
        const response = await this.resource(params);
        const formatted = await this.formatter(response);
        this.dataLoading = false;
        return formatted || {};
      } catch (_) {
        return {};
      }
    },

    refresh: async function (newQuery = {}, omited = []): Promise<void> {
      this.localQuery = omit({ ...this.localQuery, ...newQuery }, omited);
      const { records = [], current = 1, total = 0 } = await this.request(this.localQuery);
      this.data = records;
      this.pagination = { ...this.pagination, current, total };
    },

    onCurrentPageChange: function (current: number) {
      this.refresh({ ...this.localQuery, current });
    },
  },
};
</script>
