<template>
  <div>

    <force-graph style="position: absolute;width: 100vw;height: calc(100vh - 64px)" :data="data"
                 @nodeClicked="nodeClicked"></force-graph>

    <v-card max-width="400" raised style="padding: 2rem;margin: 2rem;position: absolute" rounded="xl">
      <h2 style="text-align: center;padding: 1rem">Node Finder</h2>
      <v-autocomplete

          filled
          rounded
          solo
          v-model="node"
      ></v-autocomplete>

      <v-btn style="margin: auto;display: block" color="primary" @click="searchClick">Search</v-btn>
    </v-card>
    <movies-info-card style="position: absolute;right: 1rem;top:1.5rem" :movie="Snode"></movies-info-card>
  </div>

</template>

<script>
import {neo4jDataToD3Data3} from "@/utils/format";
import {getData} from "@/utils/fetch";
import ForceGraph from "@/components/graph/ForceGraph";
import MoviesInfoCard from "@/components/MoviesInfoCard";

export default {
  components: {MoviesInfoCard, ForceGraph},
  name: "NodeView",
  data() {
    return {
      node: null,
      data: null,
      Snode: null
    }
  },
  async mounted() {
    this.node1 = this.$route.params.node;
    this.data = neo4jDataToD3Data3(await getData("http://admin.idevlab.cn:8008/"));
  },
  methods: {
    async getGraph() {
      return ""
    },
    async searchClick() {
      const data = await this.getGraph();
    },
    nodeClicked(e) {
      console.log(e)
      this.Snode = e;
    }
  }
}
</script>

<style scoped>

</style>