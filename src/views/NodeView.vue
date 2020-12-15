<template>
  <v-col style="padding:1rem" justify="center">
    <v-row class="mb-4">
      <v-card class="d-inline-block mx-auto" style="padding:1rem">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="5" justify="center" align="center">
              <v-img height="100%" width="100%" :src="info.img"></v-img>
            </v-col>
            <v-col cols="5" class="text-center pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="center">
                <v-col class="px-0">
                  {{ info.name }}
                </v-col>

                <v-col class="px-0">
                  {{ info.summary }}
                </v-col>

                <v-col class="px-0">
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row v-if="type === 'Movie'" class="mb-4" justify="center" align="center">
      <v-card class="d-inline-block mx-auto" style="padding:1rem">
        <v-container>
          <v-row justify="space-around">
            <div v-show="recommends">
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
                    <v-card-text
                      class="font-weight-medium text-center subtitle-1"
                    >
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
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row
      v-if="type === 'Person'"
      class="mb-4"
      justify="center"
      align="center"
    >
      <v-card class="d-inline-block mx-auto" style="padding:1rem">
        <v-container>
          <v-row justify="space-around">
            <div v-show="recommends">
              <h2 style="padding: 0.5rem">Community</h2>
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
                    <v-card-text
                      class="font-weight-medium text-center subtitle-1"
                    >
                      {{ item.name }}
                    </v-card-text>
                    <v-fade-transition>
                      <v-overlay
                        v-if="hover"
                        absolute
                        color="#036358"
                        style="text-align: center"
                      >
                        <v-btn @click="RecommendJmp(item.db_id)">More</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </v-hover>
              </div>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-col>
</template>
<script>
import { getData } from "@/utils/fetch";

export default {
  name: "NodeView",
  data() {
    return {
      recommends: [],
      info: null,
    };
  },
  computed: {
    id: {
      get() {
        return this.$route.params.id;
      },
      set(val) {
        this.$route.params.id = val;
      },
    },
    type() {
      return this.$route.params.type;
    },
  },
  async mounted() {
    console.log(this.type);
    switch (this.type) {
      case "Movie":
        await this.getMovie();
        await this.getRecommend();
        break;
      case "Person":
        this.getPerson();
        this.getCommunity();
    }
  },
  methods: {
    async getRecommend() {
      this.recommends = await getData(
        "http://admin.idevlab.cn:8008/recommend_Movie/" + this.info.name
      );
      if (this.recommends === 404) {
        this.recommends = [];
      }
    },
    async getCommunity() {
      this.recommends = await getData(
        "http://admin.idevlab.cn:8008/recommend_Movie/" + this.movie
      );
      if (this.recommends === 404) {
        this.recommends = [];
      }
    },
    async getMovie() {
      this.info = await getData(
        "http://admin.idevlab.cn:8008/get_movie_name/" + this.id
      );
      if (this.info === 404) {
        this.info = null;
      } else {
        this.info = this.info[0];
      }
    },
    async getPerson() {
      this.info = await getData(
        "http://admin.idevlab.cn:8008/get_person_name/" + this.id
      );
      if (this.info === 404) {
        this.info = null;
      } else {
        this.info = this.info[0];
      }
    },
    RecommendJmp(id) {
      console.log(12);
      this.$router.push("../../node/Movie/" + id);
    },
  },
};
</script>
