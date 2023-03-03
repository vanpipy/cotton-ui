FilterCombox example:

```vue
<template>
  <div>
    <FilterCombox :columns="columns" ref="formInstance"></Filter>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data: function() {
    return {
      columns: [
         { label: 'String', key: 'string', type: 'input' },
         {
           label: 'Select',
           key: 'select',
           type: 'select',
           data: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]
         },
         { label: 'Date', key: 'date', type: 'date' },
         { label: 'DateRange', key: 'daterange', type: 'daterange' },
      ],
    }
  },
}
</script>
```
