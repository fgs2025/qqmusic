<template>
  <div class="play-wrap">
    <div class="videoBox">
      <video :src="videoSrc" controls autoplay>
        your browser does not support the video tag
      </video>
    </div>
  </div>
</template>

<script>
import { mvUrl } from "@/api/mv";
export default {
  data() {
    return {
      videoSrc: "",
    };
  },
  mounted() {
    let id = this.$route.params.id;
    mvUrl(id).then((res) => {
      this.videoSrc = res.data[id][1];
    });
  },
};
</script>

<style lang="less" scoped>
.play-wrap {
  .videoBox {
    width: 1200px;
    margin: 0 auto;
    background-color: #333;
    video {
      width: 100%;
    }
  }
}
</style>