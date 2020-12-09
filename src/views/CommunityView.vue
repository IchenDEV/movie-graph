<template>
  <div>
    <community-graph style="position: absolute;width: 100vw;height: calc(100vh)" :data="data"></community-graph>
    <v-card  max-width="400" raised style="padding: 2rem;margin: 2rem;position: absolute">
      <h2 style="text-align: center;padding: 1rem">Community Finder</h2>
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
  </div>

</template>

<script>
import CommunityGraph from "@/components/graph/CommunityGraph.vue"
import {getData} from "@/utils/fetch";

export default {
  components: {CommunityGraph},
  name: "CommunityView",
  data() {
    return {
      data: null,
      node:null,
      search:null,
      isLoading:false
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
  async created() {
    this.data = await getData("../../community.json");
  }
}
</script>

<style scoped>

</style>