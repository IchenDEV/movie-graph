<template>
  <force-graph style="position: absolute;width: 100vw;height: calc(100vh - 64px)" :data="data"></force-graph>
</template>

<script>
import ForceGraph from "@/components/graph/ForceGraph";
import {getData} from "@/utils/fetch";
import {neo4jDataToD3Data3} from "@/utils/format";

export default {
  components: {ForceGraph},
  name: "ForceView",
  data() {
    return {
      data: null
    }
  },
  async mounted() {
    this.data = neo4jDataToD3Data3(await getData("http://admin.idevlab.cn:8008/"));
    console.log(this.data);
  }
}
</script>

<style scoped>

</style>