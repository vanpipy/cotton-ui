Table example:

```vue
<template>
  <div>
    <div>
      <Table :columns="columns" :resource="resource">
        <template v-slot:template="scope">
          {{ ['I am a template', 'I am not a template too'][scope.row.template] }}
        </template>
      </Table>
    </div>
    <div style="margin-top: 10px">
      <Table border :columns="columns" :resource="resource">
        <template v-slot:template="scope">
          {{ ['I am a template', 'I am not a template too'][scope.row.template] }}
        </template>
      </Table>
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
        { label: 'Template', key: 'template', template: true },
      ],
    }
  },

  methods: {
    resource: function() {
      return {
        records: [
          { city: 'BeiJing', postcode: '100000', template: 0 },
          { city: 'ShangHai', postcode: '200000', template: 1 },
        ]
      }
    }
  }
}
</script>
```
