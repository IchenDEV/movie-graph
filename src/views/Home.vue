<template>
  <div class="home">
    <video src="/coverr.mp4" style="overflow: hidden "
           autoplay loop></video>

    <div
        style="position: absolute;height: calc( 100vh - 64px);width: 100vw;display: flex;justify-content: center;justify-items: center;text-align: center;flex-direction: column;backdrop-filter: blur(15px)">
      <h1 style="z-index: 10;color: white">Want Find Movie's Relationships?</h1>
      <h1 style="z-index: 10;color: white">or related movies</h1>
      <v-btn max-width="100" style="margin-right: auto;margin-left: auto" color="primary"
             @click="$router.push('/node')">Get Start
      </v-btn>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import CloudGraph from "@/components/graph/CloudGraph";
import MapGraph from "@/components/graph/MapGraph";

export default {
  name: 'Home',
  components: {
    CloudGraph, MapGraph
  },
  data() {
    return {
      data: [
        {name: '腾讯', value: 10, href: 'http://www.qq.com/'},
        {name: '阿里巴巴', value: 10, href: 'https://www.taobao.com/'},
        {name: '百度', value: 9, href: 'https://www.baidu.com/'},
        {name: '京东', value: 8, href: 'https://www.jd.com/'},
        {name: '今日头条', value: 7, href: 'https://www.toutiao.com/'},
        {name: '网易', value: 8, href: 'http://www.163.com/'},
        {name: '新浪', value: 6, href: 'http://www.sina.com.cn/'},
        {name: '搜狐', value: 6, href: 'http://www.sohu.com/'},
        {name: '美团点评', value: 5, href: 'http://www.meituan.com/'},
        {name: '携程', value: 5, href: 'http://www.ctrip.com/'},
        {name: '360', value: 7, href: 'https://www.360.cn/'},
        {name: '小米', value: 6, href: 'https://www.mi.com/'},
        {name: '饿了么', value: 6, href: 'https://www.ele.me/'},
        {name: '迅雷', value: 6, href: 'http://xunlei.com/'},
        {name: '滴滴', value: 7, href: 'http://www.xiaojukeji.com'},
        {name: '摩拜', value: 5, href: 'https://mobike.com/cn/'},
        {name: 'ofo', value: 6, href: 'http://www.ofo.so/'}
      ]
    }
  }
}
</script>
<style>
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  /*加滤镜*/
  /*-webkit-filter: grayscale(100%);*/
  /*filter:grayscale(100%);*/
}

</style>
