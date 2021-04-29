<template>
  <div :class="['search-hov', search_show ? 'search-show' : '']">
    <!-- 热门歌曲 -->
    <div class="hot-list">
      <div
        class="hot-item flex pointer"
        v-for="(item, index) in hot_list"
        :key="index"
        @click="search(item.k)"
      >
        <div class="left">
          <span class="num">{{ index + 1 }}</span>
          <span>{{ item.k }}</span>
        </div>
        <span class="right">{{ item.n | PlayNum }}万</span>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search_history">
      <div class="top flex">
        <span>搜索历史</span>
        <i class="closeAll el-icon-delete pointer" @click="closeAll"></i>
      </div>
      <div
        class="history-item flex pointer"
        v-for="(item, index) in search_history"
        :key="index"
        @click="search(item)"
      >
        <span>{{ item }}</span>
        <i class="close el-icon-close pointer" @click.stop="close(index)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { search, searchHot } from "@/api/search";
export default {
  props: ["search_show"],
  data() {
    return {
      hot_list: [],
      search_history: [],
    };
  },
  mounted() {
    this.getSearchHot();
    this.getSearchHistory();
  },
  methods: {
    getSearchHot() {
      searchHot().then((res) => {
        this.hot_list = res.data.splice(0, 5);
      });
    },
    getSearchHistory() {
      if (JSON.parse(localStorage.getItem("search_history"))) {
        this.search_history = JSON.parse(
          localStorage.getItem("search_history")
        );
      }
    },
    search(item) {
      this.$emit("search", item);
      this.setSearchHistory(item);
    },
    closeAll() {
      this.search_history = [];
      localStorage.setItem(
        "search_history",
        JSON.stringify(this.search_history)
      );
    },
    close(index) {
      this.search_history.splice(index, 1);
      localStorage.setItem(
        "search_history",
        JSON.stringify(this.search_history)
      );
    },

    setSearchHistory(item) {
      if (!this.search_history.includes(item)) {
        this.search_history.unshift(item);
        localStorage.setItem(
          "search_history",
          JSON.stringify(this.search_history)
        );
      } else {
        let i = this.search_history.indexOf(item);
        this.search_history.splice(i, 1);
        this.search_history.unshift(item);
        localStorage.setItem(
          "search_history",
          JSON.stringify(this.search_history)
        );
      }
      search({ key: item }).then((res) => {
        console.log(res);
      });
    },
  },
  
};
</script>

<style lang="less" scoped>
.search-hov {
  position: absolute;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  visibility: hidden;
  background-color: #fff;
  transition: max-height 0.6s ease-out, visibility 1ms 0.6s;
  left: -1px;
  top: 37px;
  z-index: 1;
  border: 1px solid #c9c9c9;
  border-top: none;
  .hot-list {
    padding-top: 5px;
    .hot-item {
      height: 36px;
      padding: 0 11px;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background-color: #31c27c;
      }
      &:hover span {
        color: #fff;
      }
      .left {
        font-size: 14px;
        .num {
          color: #ff4222;
        }
        span + span {
          margin-left: 10px;
        }
      }
      .right {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .search_history {
    .top {
      padding: 0 11px;
      height: 36px;
      align-items: center;
      justify-content: space-between;
      color: #999;
      font-size: 14px;
      .closeAll {
        font-size: 16px;
        line-height: 36px;
      }
    }
    .history-item {
      padding: 0 11px;
      height: 36px;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .close {
        font-size: 18px;
        color: #fff;
      
      }
      &:hover {
        background-color: #31c27c;
        color: #fff;
      }
    }
  }
}
</style>