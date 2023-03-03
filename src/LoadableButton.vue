<template>
  <ElementButton v-bind="$attrs" :loading="loading" @click="onTriggerClick">
    <!-- @slot Custon button text -->
    <slot />
    <span v-if="delay > 0">({{ delay }})</span>
  </ElementButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Button as ElementButton } from 'element-ui';
import { wait } from './utils';

const asyncNoop = async (args?: unknown) => {
  return args;
};

@Component({
  components: {
    ElementButton,
  },
})
/**
 * @displayName LoadableButton
 */
export default class LoadableButton extends Vue {
  loading = false;
  delay = 0;
  timer: unknown;

  /**
   * The interval before the onClick triggered
   */
  @Prop({ type: Number, default: 300 }) readonly interval!: number;
  /**
   * A visible delay countdown and auto-click the button in the end
   */
  @Prop({ type: Number, default: 0 }) readonly delayToTrigger!: number;
  /**
   * The function used after click the button
   */
  @Prop({
    type: Function,
    default() {
      return asyncNoop;
    },
  })
  readonly onClick!: (args?: unknown) => Promise<unknown> | unknown;

  mounted() {
    if (this.delayToTrigger > 0) {
      this.delay = this.delayToTrigger;
      this.countdown();
    }
  }

  unmounted() {
    clearTimeout(this.timer as number);
  }

  public async onTriggerClick(...args: unknown[]) {
    this.loading = true;

    await wait(this.interval);

    try {
      const onClickEvent = this.onClick || asyncNoop;
      await onClickEvent(...args);
      this.loading = false;
    } catch (err) {
      console.error(err);
      this.loading = false;
    }
  }

  private countdown() {
    if (this.delay > 0) {
      this.timer = setTimeout(() => {
        this.delay -= 1;
        this.countdown();
      }, 1000);
    } else {
      this.onTriggerClick();
      clearTimeout(this.timer as number);
    }
  }
}
</script>
