DropDwon example:

```vue
<template>
  <div>
    <DropDown>
      <template #title>
        <span>header</span>
      </template>
      <template #body>
        <span>body</span>
        <input />
      </template>
    </DropDown>
  </div>
</template>

<script>
import Vue from 'vue';
import LoadableButton from './LoadableButton.vue'

export default {
  components: { LoadableButton }
}
</script>
```
