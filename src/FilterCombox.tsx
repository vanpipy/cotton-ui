import { defineComponent, ref } from 'vue';
import { Input, Select, Option, DatePicker, Form, FormItem } from 'element-ui';
import { INPUT_TYPE, SELECT_TYPE, DATE_TYPE, DATERANGE_TYPE } from './utils/constant';

enum Type {
  INPUT_TYPE,
  SELECT_TYPE,
  DATE_TYPE,
  DATERANGE_TYPE
}

export type Field = {
  label: string;
  key: string;
  type: Type;
  data?: any[];
  config?: {
    [key: string]: string | number | boolean;
  };
};

type Props = {
  columns: Field[];
}

const CottonFilterCombox = defineComponent<Props>({
  props: {
    columns: {
      type: Array,
      default: () => ([] as Field[]),
    },
  },

  setup(props, { expose }) {
    const localForm = ref();
    const values = ref({});
    const columns = ref<Field[]>([...props.columns]);

    const getValues = () => {
      return values.value;
    };

    const reset = () => {
      values.value = {};
    };

    expose({ getValues, reset })

    return {
      localForm,
      values,
      columns,
      getValues,
      reset,
    }
  },

  render() {
    const { localForm, values, columns } = this;
    return (
      <div class="filter-combox">
        <div class="filter-combox__form">
          <Form
            class="filter-combox__form-instance"
            label-width="80px"
            attrs={{ ref: localForm }}
          >
            {columns.map((column: Field, i: number) => {
              const { type, key, label, data = [], config } = column;
              return (
                <FormItem
                  class="filter-combox__form-item"
                  key={i}
                  props={key}
                  label={label}
                >
                  {type === INPUT_TYPE ? (
                    <Input attrs={{ ...config }} vModel={values[key]} />
                  ) : ''}
                  {type === SELECT_TYPE ? (
                    <Select attrs={{ ...config }} vModel={values[key]}>
                      {data && data.length && data.map((each: any, index: number) => {
                        const { label, value } = each;
                        return <Option key={index} label={label} value={value}></Option>
                      })}
                    </Select>
                  ) : ''}
                  {type === DATE_TYPE ? (
                    <DatePicker attrs={{ ...config }} vModel={values[key]} />
                  ) : ''}
                  {type === DATERANGE_TYPE ? (
                    <DatePicker attrs={{ ...config, type: DATERANGE_TYPE }} vModel={values[key]} />
                  ) : ''}
                </FormItem>
              )
            })}
          </Form>
        </div>
      </div>
    );
  }
});

export default CottonFilterCombox;
