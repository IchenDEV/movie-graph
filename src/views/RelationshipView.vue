<template>
  <div>
    <force-graph
      class="graph"
      @nodeDBLClicked="dbcli"
      @nodeClicked="nodeClicked"
      :data="data"
    ></force-graph>

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

    <img
      v-if="!data"
      class="back-img"
      :src="require('../assets/bg11-1.svg')"
    />
    <v-card
      v-show="hidden"
      max-width="300"
      raised
      style="padding: 2rem;margin: 2rem"
    >
      <h2 style="text-align: center;padding: 1rem">Relationship Finder</h2>
      <v-autocomplete
        :items="items"
        :search-input.sync="node1"
        :loading="isLoading"
        filled
        cache-items
        hide-no-data
        item-text="name"
        item-value="name"
        v-model="node0"
      ></v-autocomplete>
      <v-autocomplete
        :items="items"
        :search-input.sync="node2"
        :loading="isLoading"
        filled
        cache-items
        hide-no-data
        item-text="name"
        item-value="name"
        solo
        v-model="node"
      ></v-autocomplete>

      <v-btn
        style="margin: auto;display: block"
        color="primary"
        @click="searchClick"
        >Search</v-btn
      >
    </v-card>
    <movies-info-card
      v-show="hidden"
      style="position: absolute;right: 1rem;top:1.5rem"
      :movie="Snode"
    ></movies-info-card>
  </div>
</template>

<script>
import ForceGraph from "@/components/graph/ForceGraph";
import { getData } from "@/utils/fetch";
import { neo4jDataToD3Data3 } from "@/utils/format";
import MoviesInfoCard from "@/components/MoviesInfoCard";

export default {
  components: { ForceGraph, MoviesInfoCard },
  name: "RelationshipView",
  data() {
    return {
      node: null,
      node0: null,
      node1: "",
      node2: "",
      hidden: true,
      data: null,
      Snode: null,
      descriptionLimit: 20,
      entries: [],
      controller: null,
      isLoading: false,
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
    async node1(val) {
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
        .catch((err) => {})
        .finally(() => (this.isLoading = false));
    },
    async node2(val) {
      // Items have already been requested
      if (this.isLoading && this.controller) await this.controller.abort();

      this.isLoading = true;

      this.controller = new AbortController();
      const { signal } = this.controller;

      // Lazily load input items
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
  mounted() {
    this.node = this.$route.params.node1;
    this.node0 = this.$route.params.node2;
  },
  methods: {
    async getGraph() {
      try {
        return neo4jDataToD3Data3(
          await getData(
            "http://admin.idevlab.cn:8008/shortest_Path/" +
              this.node1 +
              "/" +
              this.node2
          )
        );
      } catch {
        alert("未找到关系");
      }
    },
    async searchClick() {
      this.data = await this.getGraph();
    },
    nodeClicked(e) {
      if (e.labels[0] === "Movie" || e.labels[0] === "Person") {
        this.Snode = e;
      }
    },
    async dbcli(e) {
      this.$store.state.isloading = true;
      try {
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
      } finally {
        this.$store.state.isloading = false;
      }
    },
  },
};
</script>

<style></style>
