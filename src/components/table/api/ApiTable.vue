<template>
  <a-table :data-source="apiSource" :pagination="false">
    <h2 v-if="title" style="margin: 0 16px 0" slot="title">{{title}}</h2>
    <a-table-column width="20%" data-index="param" title="매개변수">
      <div slot-scope="text" v-html="text"></div>
    </a-table-column>
    <a-table-column width="50%" data-index="desc" title="지침">
      <div slot-scope="text" v-html="text"></div>
    </a-table-column>
    <a-table-column v-if="isApi" width="15%" data-index="type" title="유형">
      <div slot-scope="text" v-html="text"></div>
    </a-table-column>
    <a-table-column v-if="isApi" width="15%" data-index="default" title="기본값">
      <div slot-scope="text" v-html="text"></div>
    </a-table-column>
    <a-table-column v-if="!isApi" width="30%" data-index="callback" title="콜백">
      <div slot-scope="text" v-html="text"></div>
    </a-table-column>
  </a-table>
</template>

<script>
  export default {
    name: 'ApiTable',
    props: {
      title: {
        type: String,
        default: 'API'
      },
      type: {
        type: String,
        default: 'api',
        validator(value) {
          return ['api', 'event'].includes(value)
        }
      },
      apiSource: Array
    },
    computed: {
      isApi() {
        return this.type === 'api'
      }
    }
  }
</script>

<style scoped>

</style>