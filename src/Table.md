Table example:

```vue
<template>
  <div>
    <div>
      <Table :columns="columns" :resource="resource" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data: function() {
    return {
      columns: [
        { label: 'City', key: 'city' },
        { label: 'Postcode', key: 'postcode' },
      ],
    }
  },

  methods: {
    resource: function() {
      return {
        records: [
          { city: 'BeiJing', postcode: '100000' },
          { city: 'ShangHai', postcode: '200000' },
        ]
      }
    }
  }
}
</script>
```
