<template>
  <ElementButton v-bind="$attrs" :loading="loading" @click="onTriggerClick">
    <slot />
    <span v-if="delay > 0">({{ delay }})</span>
  </ElementButton>
</template>

<script lang="ts">
import { Button as ElementButton } from 'element-ui';
import { wait } from './utils';

const asyncNoop = async () => {
  return undefined;
};

export default {
  name: 'LoadableButton',

  components: { ElementButton },

  props: {
    onClick: {
      type: Function,
      default: asyncNoop,
    },
    interval: {
      type: Number,
      default: 300,
    },
    delayToTrigger: {
      type: Number,
      default: 0,
    },
  },

  data: () => {
    return {
      loading: false,
      delay: 0,
      timer: 0,
    };
  },

  mounted: function () {
    if (this.delayToTrigger > 0) {
      this.delay = this.delayToTrigger;
      this.countdown();
    }
  },

  unmounted: function () {
    clearTimeout(this.timer);
  },

  methods: {
    onTriggerClick: async function (...args: unknown[]) {
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
    },
    countdown: function () {
      if (this.delay > 0) {
        this.timer = window.setTimeout(() => {
          this.delay -= 1;
          this.countdown();
        }, 1000);
      } else {
        this.onTriggerClick();
        clearTimeout(this.timer);
      }
    },
  },
};
</script>
