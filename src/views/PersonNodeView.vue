<template>
  <div>

    <force-graph style="position: absolute;width: 100vw;height: calc(100vh - 64px)" :data="data"
                 @nodeClicked="nodeClicked"></force-graph>

    <v-card max-width="400" raised style="padding: 2rem;margin: 2rem;position: absolute" rounded="xl">
      <h2 style="text-align: center;padding: 1rem">Node Finder</h2>
      <v-autocomplete
          :items="items"
          :search-input.sync="search"
          :loading="isLoading"
          filled
          cache-items
          hide-no-data
          item-text="name"
          item-value="name"
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
      Snode: null,
      search: null,
      isLoading: false,
      entries: [],
      descriptionLimit: 20,
      controller: null
    }
  },
  computed: {
    items() {
      return this.entries.map(entry => {
        const summary = entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + '...'
            : entry.name

        return Object.assign({}, entry, {summary})
      })
    },
  },
  watch: {
    async search(val) {
      // Items have already been requested
      if (this.isLoading && this.controller) await this.controller.abort();

      this.isLoading = true

      this.controller = new AbortController();
      const {signal} = this.controller;

      // Lazily load input items
      fetch('http://admin.idevlab.cn:8008/print_Person/' + val, {signal})
          .then(res => res.json())
          .then(res => {
            const entries = res;
            this.count = entries.length;
            this.entries = entries;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))

    },
  },
  async mounted() {
    this.node1 = this.$route.params.node;
    this.data = neo4jDataToD3Data3(await getData("http://admin.idevlab.cn:8008/"));
  },
  methods: {
    async getGraph() {
      this.data = neo4jDataToD3Data3(await getData("http://admin.idevlab.cn:8008/surround_person/"+this.search));
    },
    async searchClick() {
      await this.getGraph();
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