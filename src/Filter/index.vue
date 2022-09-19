<template>
  <div class="filter-combox">
    <div class="filter-combox__form">
      <ElementForm
        ref="localForm"
        :model="values"
        label-width="80px"
        class="filter-combox__form-box"
        style="display: flex; flex-wrap: wrap; justify-content: space-between;"
      >
        <FormItem
          v-for="(column, i) in columns"
          :key="i"
          :label="column.label"
          :prop="column.key"
          class="filter-combox__form-item"
          style="width: 320px;"
        >
          <ElementInput
            v-if="column.type === 'input'"
            v-model.trim="values[column.key]"
            :placeholder="column.placeholder || '请输入'"
          />
          <ElementSelect
            v-if="column.type === 'select'"
            v-model="values[column.key]"
            :placeholder="column.placeholder || '请选择'"
          >
            <ElementOption
              v-for="(option, index) in column.options"
              :key="index"
              :label="option.label"
              :value="option.value"
            />
          </ElementSelect>
          <DatePicker
            v-if="column.type === 'date'"
            v-model="values[column.key]"
            :placeholder="column.placeholder || '请选择日期'"
          />
          <DatePicker
            v-if="column.type === 'daterange'"
            v-model="values[column.key]"
            type="daterange"
            :start-placeholder="column.placeholder || '开始日期'"
            :end-placeholder="column.placeholder || '结束日期'"
          />
        </FormItem>
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
        <div style="width: 320px; margin: 0, padding: 0" />
      </ElementForm>
    </div>
    <div
      class="filter-combox__operation"
      style="text-align: right"
    >
      <slot name="operation" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Input, Select, Option, DatePicker, Form, FormItem } from 'element-ui'

  export type Field = {
    label: string;
    key: string;
    type: string,
    placeholder?: string;
  }

  export default {
    name: 'CottonFilter',

    components: {
      ElementInput: Input,
      ElementSelect: Select,
      ElementOption: Option,
      DatePicker,
      ElementForm: Form,
      FormItem
    },

    props: {
      columns: {
        type: Array<Field>,
        default() {
          return []
        }
      }
    },

    data: function() {
      return {
        values: {}
      }
    },

    methods: {
      getValues: function() {
        return { ...this.values }
      },

      reset: function() {
        this.values = []
      }
    }
  }
</script>
