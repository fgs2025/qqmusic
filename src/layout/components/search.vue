<template>
  <div class="search-wrap" @click.stop="() => false">
    <input
      type="text"
      placeholder="搜索音乐、MV、歌单、用户"
      v-model="search_val"
      @click="show"
    />
    <div class="searchBtn" @click="setSearch">
      <i class="el-icon-search"></i>
    </div>

    <!-- 搜索热门，历史 -->
    <search-hov
      :search_show="search_show"
      @search="search"
      ref="searchHov"
    ></search-hov>

    <searchQuick
      :search_show2="search_show2"
      :search_val="search_val"
    ></searchQuick>
  </div>
</template>

<script>
export default {
  components: {
    searchHov: require("./searchHov.vue").default,
    searchQuick: require("./searchQuick.vue").default,
  },
  data() {
    return {
      search_val: "",
      search_show: false,
      search_show2: false,
    };
  },
  mounted() {
    this.documentShow();
  },
  methods: {
    show() {
      if (this.search_val) {
        this.search_show2 = true;
        this.search_show = false;
      } else {
        this.search_show2 = false;
        this.search_show = true;
      }
    },
    documentShow() {
      document.addEventListener("click", () => {
        this.search_show = false;
        this.search_show2 = false;
      });
    },
    setSearch() {
      if (this.search_val) {
        this.$refs.searchHov.setSearchHistory(this.search_val);
      }
    },
    search(item) {
      this.search_val = item;
    },
  },
  watch: {
    search_val(val) {
      if (val) {
        this.search_show2 = true;
        this.search_show = false;
      } else {
        this.search_show = true;
        this.search_show2 = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrap {
  border: 1px solid #c9c9c9;
  height: 36px;
  display: flex;
  padding-left: 11px;
  margin-left: 20px;
  position: relative;
  input {
    width: 174px;
    height: 100%;
    background: none;
    outline: none;
    border: none;
  }
  .searchBtn {
    display: inline-block;
    width: 38px;
    height: 100%;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    &:hover i {
      color: #31c27c;
    }
  }

  .search-show {
    max-height: 800px;
    visibility: visible;
    transition: max-height 0.6s ease-out;
  }
}
</style>