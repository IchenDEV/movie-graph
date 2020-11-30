<template>
  <v-card class="mx-auto" max-width="344" v-if="movie" rounded="xl">
    <v-img v-if="movie.properties.img" :src="movie.properties.img" height="200px"></v-img>
    <v-card-title>
      {{ movie.properties.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ movie.properties.summary }}
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show;getRecommend()">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <h2>评论情感</h2>
        <v-chart
            :options="pie"
            ref="pie"
            :init-options="initOptions"
            style="width: 320px;height: 280px"
            autoresize
        />
        <h2 style="padding: 0.5rem">Recommend</h2>
        <div style="display: flex;flex-wrap: wrap;margin: 1rem">

          <v-hover rounded="xl" class="mx-auto" v-slot="{ hover }" v-for="(item,index) in recommends"  style="text-align: center"
                   :key="index">
            <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
                class="mx-auto"
                height="100"
                style="margin: 0.5rem;overflow-y: hidden"
                width="130"
            >
              <v-img :src="item.img" width="130"/>
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
                  <v-btn>关系</v-btn>
                  <v-btn>More</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>

        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import "echarts/lib/chart/pie";
import {neo4jDataToD3Data3} from "@/utils/format";
import {getData} from "@/utils/fetch";

export default {
  name: "MoviesInfoCard",
  props: ['movie'],
  data: () => {
    return {
      show: false,
      pie: {
        title: {
          text: "评论",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["消極", "中性", "積極"]
        },
        series: [
          {
            name: "評論情感",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {value: 335, name: "消極"},
              {value: 310, name: "中性"},
              {value: 234, name: "積極"}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      initOptions: {
        renderer: "canvas"
      },
      recommends: null
    }
  },
  methods: {
    async getRecommend() {
      //this.recommends = await getData("http://admin.idevlab.cn:8008/recommend_Movie/" + this.movie.properties.name);
      //console.log(this.recommends);
    }
  }
}

</script>
