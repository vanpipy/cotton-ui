LoadableButton example:

```vue
<template>
  <div>
    <div>
      <LoadableButton type="primary">primary</LoadableButton>
      <LoadableButton type="success">success</LoadableButton>
      <LoadableButton type="info">info</LoadableButton>
      <LoadableButton type="warning">warning</LoadableButton>
      <LoadableButton type="danger">danger</LoadableButton>
    </div>
    <div style="margin-top: 15px">
      <LoadableButton type="primary">Custom Text</LoadableButton>
      <LoadableButton type="primary">
        <span>Custom Node</span>
      </LoadableButton>
    </div>
    <div style="margin-top: 15px">
      <LoadableButton :on-click="changeValue">Change Value</LoadableButton>
      <LoadableButton :on-click="changeValue" :interval="3000">Change Value After 3 second</LoadableButton>
      <LoadableButton :on-click="changeValue" :delay-to-trigger="10">Auto Change Value With 10 seconds countdown</LoadableButton>
      <p>value: {{ value }}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data: function() {
    return {
      value: 0
    }
  },

  methods: {
    changeValue: function() {
      this.value += 1
    }
  }
}
</script>
```
