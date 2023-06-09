<template>
  <div class="cottom-dropdown">
    <div class="cottom-dropdown__title">
      <slot name="title" />
    </div>
    <div class="cottom-dropdown__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class DropDown extends Vue {}
</script>
