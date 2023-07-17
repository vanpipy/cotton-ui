import { defineComponent, onMounted, ref } from 'vue';
import { Table, TableColumn, Pagination } from 'element-ui';
import omit from 'lodash/omit';
import { justRetrunValue, convertKeyAsValue } from './utils';

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

type Resp = {
  current: number;
  size: number;
  total: number;
  records: AnyObject[];
};

type Props = {
  columns: AnyObject[];
  query: AnyObject;
  resource: (params: AnyObject) => Promise<Resp>;
  formatter: (data: AnyObject) => Promise<Resp> | Resp;
  variant: AnyObject;
}

const CottonTable = defineComponent<Props>({
  props: {
    columns: {
      type: Array,
      default: () => ([] as AnyObject[]),
    },
    query: {
      type: Object,
      default: () => ({})
    },
    resource: Function,
    formatter: Function,
    variant: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { expose }) {
    const { columns, query, resource, formatter = justRetrunValue, variant } = props;
    const localQuery = ref<Partial<Page> & AnyObject>({ ...defaultQuery });
    const dataLoading = ref(false);
    const data = ref<AnyObject[]>([]);
    const pagination = ref<Page>({ ...defaultPageValue });

    const request = async (params = {}): Promise<Resp> => {
      try {
        dataLoading.value = true;
        const response = await resource(params);
        const formatted = await formatter(response);
        dataLoading.value = false;
        return formatted as Resp || ({} as Resp);
      } catch (err) {
        console.error(err);
        return ({} as Resp)
      }
    };

    const refresh = async (newQuery = {}, omited: string[] = []) => {
      localQuery.value = omit({ ...localQuery.value, ...newQuery }, omited);
      const formattedQuery = convertKeyAsValue(localQuery.value, variant);
      const { records = [], current = 1, total = 0 } = await request(formattedQuery);
      data.value = records;
      pagination.value = { ...pagination.value, current, total };
    };

    const onCurrentPageChange = (current: number) => {
      refresh({ ...localQuery.value, current })
    };

    expose({ refresh });

    onMounted(() => {
      localQuery.value = { ...localQuery.value, ...query };
      pagination.value.size = localQuery.value.size || pagination.value.size;
      refresh({ ...localQuery.value });
    });

    return {
      localQuery,
      data,
      columns,
      pagination,
      onCurrentPageChange,
    }
  },

  render() {
    const { $attrs, $scopedSlots, columns, data, pagination, onCurrentPageChange } = this;
    const { layout, current, size, total } = pagination;
    return (
      <div class="cotton-table">
        <Table
          {...{ attrs: { ...$attrs, data } }}
          class="cotton-table__instance"
          style="width: 100"
        >
          {columns.map((column: AnyObject, i: number) => {
            const scoped = $scopedSlots[column.key as string];
            return (
              <TableColumn
                attrs={{ ...column, key: i }}
                scopedSlots={{
                  default: (scope: any) => {
                    const { row = {} } = scope;
                    return (
                      column.template ? (
                        <span class="cotton-table__column--template">
                          {typeof scoped === 'function' ? scoped(scope) : ''}
                        </span>
                      ) : (
                        <span class="cotton-table__column">
                          {column.type === 'index' ? scope.$index + 1 : ''}
                          {column.type !== 'index' ? row[column.key as string] : ''}
                        </span>
                      )
                    )
                  }
                }}
              >
              </TableColumn>
            )
          })}
        </Table>
        <Pagination
          attrs={{
            layout,
            currentPage: current,
            pageSize: size,
            total,
          }}
          onCurrentChange={onCurrentPageChange}
          background
          class="cotton-table__pagination"
        />
      </div>
    )
  }
});

export default CottonTable;
