<template>
  <moban class="PlaylistRecommend" :loading="loading">
    <!-- 标题 -->
    <template slot="title-wrap"
      >排行榜
      <div class="allBtn pointer">更多></div></template
    >
    <template slot="swiper">
      <div class="topBox">
        <div
          class="itemBox"
          v-for="(item, index) in list"
          :key="index"
          :style="{ backgroundPosition: `${item.position}px 0` }"
        >
          <div class="titleBox">
            <p class="topTitle">巅峰榜</p>
            <p class="topType">{{ item.label }}</p>
          </div>
          <div class="iconBox">
            <span></span>
            <i
              class="iconfont icon-bofang pointer"
              @click="playTop(item.topId)"
            ></i>
          </div>
          <ul>
            <li v-for="(ite, ind) in item.songList" :key="ind">
              <div class="songNameBox">
                <div class="num">{{ ind + 1 }}</div>
                <div class="songName">{{ ite.title }}</div>
              </div>
              <div class="singName">{{ ite.singerName }}</div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </moban>
</template>

<script>
import { albumSongs, top } from "@/api/topCategory";
export default {
  data() {
    return {
      loading: false,
      list: [
        {
          label: "热歌",
          position: "0",
          topId: "",
          songList: [],
        },
        {
          label: "新歌",
          position: "-224",
          topId: "",
          songList: [],
        },
        {
          label: "流行指数",
          position: "-448",
          topId: "",
          songList: [],
        },
        {
          label: "欧美",
          position: "-672",
          topId: "",
          songList: [],
        },
        {
          label: "韩国",
          position: "-896",
          topId: "",
          songList: [],
        },
      ],
    };
  },
  mounted() {
    albumSongs().then((res) => {
      this.list.forEach((row) => {
        res.data.forEach((ro) => {
          ro.list.forEach((r) => {
            if (r.label == row.label + "榜") {
              row.topId = r.topId;
              row.songList = r.song;
            }
          });
        });
      });
    });
  },
  methods: {
    playTop(id) {
      let openActive = window.localStorage.getItem("openActive");
      top(id).then((res) => {
        let songlist = JSON.parse(localStorage.getItem("songList"));
        if (!songlist) {
          songlist = [];
        }
        songlist.unshift(...res.data.list.slice(0, 10));
        if (openActive) {
          window.localStorage.setItem("songList", JSON.stringify(songlist));
        } else {
          let routeData = this.$router.resolve({
            name: "player",
          });
          window.open(routeData.href, "_blank");
          window.localStorage.setItem("openActive", true);
          window.localStorage.setItem("songList", JSON.stringify(songlist));
        }
      });
    },
  },
  components: {
    moban: require("@/components/mod_index.vue").default, //导入模板
  },
};
</script>

<style lang="less" scoped>
.PlaylistRecommend {
  .allBtn {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 54%;
    &:hover {
      color: #31c27c;
    }
  }
  .topBox {
    display: flex;
    justify-content: space-between;
    .itemBox {
      width: 20%;
      height: 500px;
      margin-right: 20px;
      padding: 50px 30px 0;
      box-sizing: border-box;
      color: #fff;
      background-image: url("https://y.gtimg.cn/mediastyle/yqq/img/bg_index_top.jpg?max_age=2592000&v=3beef369200a0863560787fd560c8205");
      .titleBox {
        text-align: center;
        .topTitle {
          font-size: 22px;
          letter-spacing: 4px;
        }
        .topType {
          font-size: 26px;
        }
      }
      .iconBox {
        margin-top: 30px;
        height: 50px;
        margin-bottom: 10px;
        text-align: center;
        span {
          display: inline-block;
          width: 36px;
          height: 2px;
          background-color: #fff;
          transition: all 0.3s;
        }
        i {
          display: none;
          font-size: 50px;
          transition: all 0.3s;
        }
      }
      &:hover .iconBox > span {
        display: none;
      }
      &:hover .iconBox > i {
        display: block;
      }
      ul {
        li {
          width: 164px;
          font-size: 14px;
          & + li {
            margin-top: 27px;
          }
          .songNameBox {
            display: flex;
            .num {
              margin-right: 10px;
            }
            .songName {
              overflow: hidden; /*超出长度的文字隐藏*/
              text-overflow: ellipsis; /*文字隐藏以后添加省略号*/
              white-space: nowrap; /*强制不换行*/
            }
          }
          .singName {
            padding-left: 17px;
            margin-top: 10px;
            overflow: hidden; /*超出长度的文字隐藏*/
            text-overflow: ellipsis; /*文字隐藏以后添加省略号*/
            white-space: nowrap; /*强制不换行*/
          }
        }
      }
    }
  }
}
</style>