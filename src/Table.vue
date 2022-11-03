<template>
  <div class="cotton-table">
    <ElementTable class="cotton-table__instance" :data="data" style="width: 100%">
      <ElementTableColumn v-for="column in columns" :key="column.key" v-bind="column">
        <template slot-scope="scope">
          <!-- @slot the `column.key` slot when the `column.template` equals true -->
          <slot v-if="column.template" :name="column.key" :row="scope.row" />
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
import { omit } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
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

type AnyObject = {
  [key: string]: unknown;
};

type Page = {
  current: number;
  size: number;
  total: number;
  layout?: string;
};

type Resp = {
  current: number;
  size: number;
  total: number;
  records: AnyObject[];
};

@Component({
  components: {
    ElementTable: Table,
    ElementTableColumn: TableColumn,
    Pagination,
  },
})
export default class CottonTable extends Vue {
  /**
   * The config describe the table columns - Array<{ label: string; key: string; template?: boolean; ... }>
   */
  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  readonly columns!: Array<AnyObject>;

  /**
   * A default query when use the resource
   */
  @Prop({
    type: Object,
    default() {
      return defaultQuery;
    },
  })
  readonly query!: AnyObject;

  /**
   * The data request function
   */
  @Prop({ type: Function }) readonly resource!: (arg?: unknown) => Promise<Resp> | Resp;

  /**
   * Format the response when requested via the resource
   */
  @Prop({ type: Function }) readonly formatter!: (arg: Resp) => Promise<Resp> | Resp;

  localQuery: Partial<Page> & AnyObject = {};
  dataLoading = false;
  data: AnyObject[] = [];
  pagination: Page = { ...defaultPageValue };

  mounted() {
    this.localQuery = { ...this.localQuery, ...this.query };
    this.pagination.size = this.localQuery.size || this.pagination.size;
    this.refresh(this.localQuery);
  }

  onCurrentPageChange(current: number) {
    this.refresh({ ...this.localQuery, current });
  }

  private async request(params = {}): Promise<Resp> {
    try {
      this.dataLoading = true;

      const response = await this.resource(params);
      const formatter = this.formatter || justRetrunValue;
      const formatted = await formatter(response);

      this.dataLoading = false;
      return formatted || ({} as Resp);
    } catch (_) {
      return {} as Resp;
    }
  }

  /**
   * Refresh table data
   *
   * @param {AnyObject} newQuery
   * @param {Array<string>} omited
   * @public
   */
  public async refresh(newQuery = {}, omited = []): Promise<void> {
    this.localQuery = omit({ ...this.localQuery, ...newQuery }, omited);
    const { records = [], current = 1, total = 0 } = await this.request(this.localQuery);
    this.data = records;
    this.pagination = { ...this.pagination, current, total };
  }
}
</script>
