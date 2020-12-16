<template>
  <div class="home">
    <video autoplay loop src="/coverr.mp4" style="overflow: hidden"></video>
    <div class="cover">
      <h1 style="z-index: 10;color: white">Want Find Movie's Relationships?</h1>
      <h1 style="z-index: 10;color: white">or related movies</h1>
      <v-btn max-width="100" style="margin-right: auto;margin-left: auto" color="primary" @click="$router.push('/relate')">
        Get Start
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
}

.cover {
  position: absolute;
  height: calc(100vh);
  width: 100vw;
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  flex-direction: column;
  backdrop-filter: blur(15px)
}
</style>
