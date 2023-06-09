<template>
  <div
    tabindex="0"
    class="cotton-dropdown"
    style="position: relative"
    @focusin="onFocusinDropDown"
    @focusout="onFocusoutDropDown"
    @mouseenter="onEnterDropDown"
    @mouseleave="onLeaveDropDown"
  >
    <div tabindex="0" class="cotton-dropdown__title" @click.capture="onToggleBody">
      <slot name="title" />
    </div>
    <div class="cotton-dropdown__body" style="position: absolute; left: 0; top: 100%" v-show="showBody">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import debounce from 'lodash/debounce';

@Component
export default class DropDown extends Vue {
  active = false;
  showBody = false;

  toggleBody = debounce(function (state?: boolean) {
    if (typeof state === 'boolean') {
      this.showBody = state;
    } else {
      this.showBody = !this.showBody;
    }
  }, 200);

  onToggleBody() {
    this.toggleBody();
  }

  onFocusinDropDown() {
    this.toggleBody(true);
  }

  onFocusoutDropDown() {
    if (this.active) {
      return;
    }
    this.toggleBody(false);
  }

  onEnterDropDown() {
    this.active = true;
  }

  onLeaveDropDown() {
    this.active = false;
  }
}
</script>
