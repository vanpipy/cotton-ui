<template>
  <ElementSelect v-bind="config" v-model="value" @change="onChange">
    <ElementOption v-for="(each, index) in data" :key="index" :label="each.label" :value="each.value"></ElementOption>
  </ElementSelect>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { Select as ElementSelect, Option as ElementOption } from 'element-ui';

@Component({
  components: { ElementSelect, ElementOption },
})
export default class Select extends Vue {
  @Model('updateValue') readonly value!: string;
  @Prop({ default: () => ({}) }) readonly data!: Array<{ label: string; value: string }>;
  @Prop({ default: () => ({}) }) readonly config!: object;

  public onChange(newValue: string) {
    this.$emit('updateValue', newValue);
  }
}
</script>
