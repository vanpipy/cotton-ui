<template>
  <div class="cotton-dropdown">
    <div
      tabindex="0"
      class="cotton-dropdown__title"
      :class="{ 'cotton-dropdown__title--focus': focus }"
      @click.capture="onToggleBody"
    >
      <slot name="title" />
    </div>
    <div class="cotton-dropdown__body" v-show="showBody">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class DropDown extends Vue {
  showBody = false;

  onShowBody() {
    this.showBody = true;
  }

  onHideBody() {
    this.showBody = false;
  }

  onToggleBody() {
    this.showBody = !this.showBody;
  }
}
</script>
