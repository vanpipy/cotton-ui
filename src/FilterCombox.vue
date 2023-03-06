<template>
  <div class="filter-combox">
    <div class="filter-combox__form">
      <ElementForm
        ref="localForm"
        :model="values"
        label-width="80px"
        class="filter-combox__form-box"
        style="display: flex; flex-wrap: wrap; justify-content: space-between"
      >
        <FormItem
          v-for="(column, i) in columns"
          :key="i"
          :label="column.label"
          :prop="column.key"
          class="filter-combox__form-item"
          style="width: 320px"
        >
          <component
            v-model="values[column.key]"
            :is="column.component"
            :data="column.data"
            :config="column.config || {}"
          />
        </FormItem>
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
      </ElementForm>
    </div>
    <div class="filter-combox__operation" style="text-align: right">
      <slot name="operation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Input, DatePicker, Form, FormItem } from 'element-ui';
import Select from './components/Select.vue';
import DateRange from './components/DateRange.vue';

export type Field = {
  label: string;
  key: string;
  type: 'input' | 'select' | 'date' | 'daterange';
  data?: unknown;
  component?: Vue.Component;
  config?: {
    [key: string]: string | number | boolean;
  };
};

const componentsMapping = {
  input: Input,
  select: Select,
  date: DatePicker,
  daterange: DateRange,
};

/**
 * @displayName FilterCombox
 */
@Component({
  components: {
    ElementForm: Form,
    FormItem,
  },
})
export default class CottonFilter extends Vue {
  _columns?: Array<Field>;
  values: { [key: string]: unknown } = {};

  /**
   * The config describe the table columns -
   * Array<{
   *   label: string;
   *   key: string;
   *   type: 'input' | 'select' | 'date' | 'daterange';
   *   data?: unknown;
   *   component?: Vue.Component;
   *   config?: {
   *     [key: string]: string | number | boolean;
   *   }
   * }>
   */
  @Prop({
    default() {
      return [];
    },
  })
  readonly columns!: Array<Field>;

  /**
   * Get the form values
   *
   * @public
   */
  public getValues() {
    return { ...this.values };
  }

  /**
   * Reset the form values
   *
   * @public
   */
  public reset() {
    this.values = {};
  }

  created() {
    if (this.columns && this.columns.length) {
      this._columns = this.columns.map((column) => {
        column.component = componentsMapping[column.type];
        return column;
      });
    }
  }
}
</script>
