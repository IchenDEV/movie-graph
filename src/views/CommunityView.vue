<template>
  <div>
    <community-graph style="position: absolute;width: 100vw;height: calc(100vh - 64px)" :data="data"></community-graph>
    <v-card  max-width="400" raised style="padding: 2rem;margin: 2rem;position: absolute" rounded="xl">
      <h2 style="text-align: center;padding: 1rem">Community Finder</h2>
      <v-autocomplete

          filled
          rounded
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
      node:null
    }
  },
  async created() {
    this.data = await getData("../../community.json");
  }
}
</script>

<style scoped>

</style>