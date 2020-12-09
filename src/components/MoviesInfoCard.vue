<template>
  <v-card
    class="mx-auto"
    max-width="344"
    max-height="500"
    v-if="movie"
    raised
    style="overflow: auto;"
  >
    <v-img
      v-if="movie.properties.img"
      :src="movie.properties.img"
      height="200px"
    ></v-img>
    <v-card-title>
      {{ movie.properties.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ movie.properties.summary }}
    </v-card-subtitle>
    <v-expand-transition>
      <div v-show="recommends && show">
        <h2 style="padding: 0.5rem">Recommend</h2>
        <div style="display: flex;flex-wrap: wrap;margin: 1rem">
          <v-hover
            class="mx-auto"
            v-slot="{ hover }"
            v-for="(item, index) in recommends"
            style="text-align: center"
            :key="index"
          >
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="100"
              style="margin: 0.5rem;overflow-y: hidden"
              width="130"
            >
              <v-img :src="item.img" width="130" />
              <v-card-text class="font-weight-medium text-center subtitle-1">
                {{ item.name }}
              </v-card-text>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#036358"
                  style="text-align: center"
                >
                  <v-btn>More</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>
        </div>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="NodeJump">
        <v-icon>{{ "mdi-more" }}</v-icon>
      </v-btn>
      <v-btn icon @click="getRecommend" v-if="movie.labels[0] === 'Movie'">
        <v-icon>{{ show ? "mdi-chevron-down" : "mdi-chevron-up" }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getData } from "@/utils/fetch";

export default {
  name: "MoviesInfoCard",
  props: ["movie"],
  watch: {
    movie(newone, oldone) {
      this.show = false;
    },
  },
  data: () => {
    return {
      show: false,
      recommends: null,
    };
  },
  methods: {
    async getRecommend() {
      if (this.movie.labels[0] == "Movie") {
        this.show = !this.show;
        this.recommends = await getData(
          "http://admin.idevlab.cn:8008/recommend_Movie/" +
            this.movie.properties.name
        );
        if (this.recommends === 404) {
          this.recommends = [];
          this.show = false;
        }
      }
    },
    NodeJump() {
      console.log(this.movie.labels[0]);
      switch (this.movie.labels[0]) {
        case "Person":
          this.$router.push("../../node/Person/" + this.movie.db_id);
          break;
        case "Movie":
          this.$router.push("../../node/Movie/" + this.movie.db_id);
          break;
      }
    },
  },
};
</script>
