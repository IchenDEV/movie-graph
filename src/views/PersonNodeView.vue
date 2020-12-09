<template>
  <div>
    <v-btn
      color="pink"
      fab
      dark
      small
      absolute
      bottom
      left
      @click="hidden = !hidden"
      style="z-index:999"
    >
      <v-icon>mdi-rhombus-split</v-icon>
    </v-btn>
    <force-graph
      class="graph"
      :data="data"
      @nodeDBLClicked="dbcli"
      @nodeClicked="nodeClicked"
    ></force-graph>
    <v-img
      v-if="!data"
      :src="require('../assets/bg11-1.svg')"
      style="position: fixed;width: 80vw;top: calc(50% - 20vw);left:calc(50% - 35vw)"
    ></v-img>
    <v-fab-transition>
      <v-card
        v-show="hidden"
        max-width="300"
        raised
        style="padding: 2rem;margin: 2rem;position: absolute"
      >
        <h2 style="text-align: center;padding: 1rem">Person Node Finder</h2>
        <v-autocomplete
          :items="items"
          :search-input.sync="search"
          :loading="isLoading"
          filled
          cache-items
          hide-no-data
          item-text="name"
          item-value="name"
          v-model="node"
        ></v-autocomplete>

        <v-btn
          style="margin: auto;display: block"
          color="primary"
          @click="searchClick"
          >Search</v-btn
        >
      </v-card>
    </v-fab-transition>
    <movies-info-card
      style="position: absolute;right: 1rem;top:1.5rem"
      :movie="SelectedNode"
    ></movies-info-card>
  </div>
</template>

<script>
import { neo4jDataToD3Data3 } from "@/utils/format";
import { getData } from "@/utils/fetch";
import ForceGraph from "@/components/graph/ForceGraph";
import MoviesInfoCard from "@/components/MoviesInfoCard";

export default {
  components: { MoviesInfoCard, ForceGraph },
  name: "NodeView",
  data() {
    return {
      node: null,
      data: null,
      SelectedNode: null,
      search: null,
      hidden: true,
      isLoading: false,
      entries: [],
      descriptionLimit: 20,
      controller: null,
    };
  },
  computed: {
    items() {
      return this.entries.map((entry) => {
        const summary =
          entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + "..."
            : entry.name;
        return Object.assign({}, entry, { summary });
      });
    },
  },
  watch: {
    async search(val) {
      if (this.isLoading && this.controller) await this.controller.abort();
      this.isLoading = true;

      this.controller = new AbortController();
      const { signal } = this.controller;

      fetch("http://admin.idevlab.cn:8008/print_Person/" + val, { signal })
        .then((res) => res.json())
        .then((res) => {
          const entries = res;
          this.count = entries.length;
          this.entries = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  async mounted() {
    this.search = this.$route.params.node;
  },
  methods: {
    async getGraph() {
      this.data = neo4jDataToD3Data3(
        await getData(
          "http://admin.idevlab.cn:8008/surround_person_name/" + this.search
        )
      );
    },
    async searchClick() {
      await this.getGraph();
    },
    nodeClicked(e) {
      this.SelectedNode = e;
    },
    async dbcli(e) {
      console.log(e);
      if (e.labels[0] === "Movie") {
        let data2 = neo4jDataToD3Data3(
          await getData(
            "http://admin.idevlab.cn:8008/surround_movie_id/" + e.db_id
          )
        );
        this.data = data2;
      } else if (e.labels[0] === "Person") {
        let data2 = neo4jDataToD3Data3(
          await getData(
            "http://admin.idevlab.cn:8008/surround_person_id/" + e.db_id
          )
        );
        this.data = data2;
      }
    },
  },
};
</script>

<style scoped>
.graph {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 1px);
}
</style>
