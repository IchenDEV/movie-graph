<template>
  <div class="d-flex" justify="center" style="flex-wrap:wrap;margin:1rem;align-items: center;">
    
        <v-card class="mx-auto" max-width="800px" min-width="60%" min-height="400" style="padding:1rem;margin:1rem;">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="5" justify="center" align="center">
                <img style="height:100%;width:100%;border-radius: 1rem;" :src="info.img"/>
              </v-col>
              <v-col cols="5" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="px-0" style="max-height:6rem;font-size:2rem;">
                    {{ info.name }}
                  </v-col>
                
    
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card v-if="info.summary" class="d-inline-block mx-auto" style="padding:1rem;margin:1rem;">
          <v-container>
            <v-row justify="space-between">
              
              
                  <div class="px-0" style="max-height:800px;    overflow-y: scroll;">
                    {{ info.summary }}
                  </div>
            </v-row>
          </v-container>
        </v-card>

        <v-card  v-if="type === 'Movie'" class="d-inline-block mx-auto" style="padding:1rem;margin:1rem;">
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
                      <img :src="item.img" style="width:130px" />
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
    
        <v-card min-width="40vw" max-width="600"   v-if="type === 'Person'" class="d-inline-block mx-auto" style="padding:1rem;margin:1rem;">
          <v-container>
            <v-row justify="space-around">
              <div v-show="community">
                <h2 style="padding: 0.5rem">Community</h2>
                <div style="display: flex;flex-wrap: wrap;margin: 1rem">
                  <v-hover
                    class="mx-auto"
                    v-slot="{ hover }"
                    v-for="(item, index) in community.children"
                    style="text-align: center"
                    :key="index"
                  >
                    <v-card
                      :elevation="hover ? 16 : 2"
                      :class="{ 'on-hover': hover }"
                      class="mx-auto"
                      height="150"
                      style="margin: 0.5rem;overflow-y: hidden"
                      width="130"
                    >
                     <img :src="item.img" style=" width:130px" />
 
                      
             
                      <v-fade-transition>
                        <v-overlay
                          v-if="hover"
                          absolute
                          color="#036358"
                          style="text-align: center"
                        >
                                       <v-card-text
                        class="font-weight-medium text-center subtitle-1"
                        style="line-height:1.2rem"
                      >
                        {{ item.name }}
                        </br>
                         {{ item.triangleCount }}
                      </v-card-text>
                      <v-btn @click="CommunityJmp(item.id)">More</v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </v-hover>
                </div>
              </div>
            </v-row>
          </v-container>
        </v-card>

        <v-card min-width="40vw" min-height="40vw"   v-if="type === 'Person'" class="d-inline-block mx-auto" style="margin:1rem;">
          <v-container>
             <force-graph
              style="min-width:600px;min-height:600px"
      :data="comdata"
    ></force-graph>
          </v-container>
        </v-card>
  </div>
</template>
<script>
import { getData } from "@/utils/fetch";
import { getPersonCommunityByName,genCommunityMap } from "@/utils/community";
import ForceGraph from "@/components/graph/ForceGraph";
export default {
  name: "NodeView",
  components: {  ForceGraph },
  data() {
    return {
      recommends: [],
      community:[],
      info: null,
      comdata:null
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
  async created() {
    this.load();
  },
  methods: {
    async load(){
      window.scrollTo(0,0);
          switch (this.type) {
      case "Movie":
        await this.getMovie();
        await this.getRecommend();
        break;
      case "Person":
        await this.getPerson();
        await this.getCommunity();
    }
    },
    async getRecommend() {
      this.recommends = await getData(
        "http://admin.idevlab.cn:8008/recommend_Movie/" + this.info.name
      );
      if (this.recommends === 404) {
        this.recommends = [];
      }
    },
    async getCommunity() {
      this.community = await getPersonCommunityByName(this.info.name);
      this.community.children.sort((a,b)=>{return b.triangleCount-a.triangleCount; })
      this.comdata=  await genCommunityMap(this.community);

      console.log(this.comdata);
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
      this.$router.push("../../node/Movie/" + id);
      this.load();
      
    },
    CommunityJmp(id) {
      this.$router.push("../../node/Person/" + id);
      this.load();
    },
  },
};
</script>
