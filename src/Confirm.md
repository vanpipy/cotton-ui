Confirm example:

```vue
<template>
  <div>
    <div>
      <span style="cursor: pointer" @click="open">Open</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { createConfirm } from './Confirm.ts'

export default {
  data: function() {
    return {
      instance: createConfirm({
        onConfirm: () => {
          console.log('confirmed');
        },
        onCancel: () => {
          console.log('canceled');
        }
      })
    }
  },

  methods: {
    open: function() {
      this.instance.open();
    }
  }
}
</script>
```
