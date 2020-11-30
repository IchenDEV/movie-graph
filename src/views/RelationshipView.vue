<template>
  <div>
    <force-graph style="position: absolute;width: 100vw;height: calc(100vh - 64px)" @nodeClicked="nodeClicked"
                 :data="data"></force-graph>
    <v-card max-width="400" raised style="padding: 2rem;margin: 2rem" rounded="xl">
      <h2 style="text-align: center;padding: 1rem">Relationship Finder</h2>
      <v-text-field
          filled
          rounded
          solo
          v-model="node1"
      ></v-text-field>
      <v-text-field
          filled
          rounded
          solo
          v-model="node2"
      ></v-text-field>

      <v-btn style="margin: auto;display: block" color="primary" @click="searchClick">Search</v-btn>
    </v-card>
    <movies-info-card style="position: absolute;right: 1rem;top:1.5rem" :movie="Snode"></movies-info-card>
  </div>

</template>

<script>
import ForceGraph from "@/components/graph/ForceGraph";
import {getData} from "@/utils/fetch";
import {neo4jDataToD3Data3} from "@/utils/format";
import MoviesInfoCard from "@/components/MoviesInfoCard";

export default {
  components: {ForceGraph, MoviesInfoCard},
  name: "RelationshipView",
  data() {
    return {
      node1: null,
      node2: null,
      data: null,
      Snode: null
    }
  },
  mounted() {
    this.node1 = this.$route.params.node1;
    this.node2 = this.$route.params.node2;
  },
  methods: {
    async getGraph() {
      return neo4jDataToD3Data3(await getData("http://admin.idevlab.cn:8008/shortest_Path/" + this.node1 + "/" + this.node2));
    },
    async searchClick() {
      this.data = await this.getGraph();
    },
    nodeClicked(e) {
      this.Snode = e;
    }
  }
}
</script>

<style scoped>

</style>