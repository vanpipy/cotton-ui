<template>
  <ElementButton v-bind="$attrs" :loading="loading" @click="onTriggerClick">
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
export default class LoadableButton extends Vue {
  @Prop({ type: Number, default: 300 }) readonly interval!: number;
  @Prop({ type: Number, default: 0 }) readonly delayToTrigger!: number;
  @Prop({
    type: Function,
    default() {
      return asyncNoop;
    },
  })
  readonly onClick!: typeof asyncNoop;

  loading = false;
  delay = 0;
  timer: unknown;

  mounted() {
    if (this.delayToTrigger > 0) {
      this.delay = this.delayToTrigger;
      this.countdown();
    }
  }

  unmounted() {
    clearTimeout(this.timer as number);
  }

  async onTriggerClick(...args: unknown[]) {
    console.log();
    this.loading = true;

    await wait(this.interval);

    try {
      const onClickEvent: typeof asyncNoop = this.onClick || asyncNoop;
      await onClickEvent(...args);
      this.loading = false;
    } catch (err) {
      console.warn(err);
      this.loading = false;
    }
  }

  countdown() {
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
