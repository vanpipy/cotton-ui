<template>
  <DatePicker type="daterange" v-bind="config" v-model="value" @change="onChange" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import { DatePicker } from 'element-ui';

@Component({
  components: { DatePicker },
})
export default class DateRange extends Vue {
  @Model('updateValue') readonly value!: string;
  @Prop({ default: () => ({}) }) readonly config!: object;

  public onChange(newValue: string) {
    this.$emit('updateValue', newValue);
  }
}
</script>
