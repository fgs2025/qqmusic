<template>
  <div :class="['search-quick-box', search_show2 ? 'search-show' : '']">
    <template v-for="(item, index) in search_quick_data">
      <div class="item-box" v-if="item.count != 0" :key="index">
        <div class="title">
          <i :class="['iconfont', item.iconfont]"></i>
          <span>{{ item.name }}</span>
        </div>
        <div
          class="item"
          v-for="(ite, ind) in item.itemlist"
          :key="ind"
          @click="quickClick(item, ite)"
        >
          <span class="item-title">{{ ite.name }}</span>
          <span class="" v-if="item.type == 1 || item.type == 4">-</span>
          <span class="" v-if="item.type != 2">{{ ite.singer }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { search, searchQuick } from "@/api/search";
export default {
  props: ["search_show2", "search_val"],
  data() {
    return {
      search_quick_data: [],
    };
  },
  methods: {
    quickClick(item, ite) {
      let type = "";
      if (item.type == 1) {
        type = 0;
      }
      if (item.type == 2) {
        type = 9;
      }
      if (item.type == 3) {
        type = 8;
      }
      if (item.type == 4) {
        type = 12;
      }
      search({ key: ite.name, t: type }).then((res) => {
        console.log(res);
      });
    },
  },
  watch: {
    search_val(val) {
      if (val) {
        searchQuick(this.search_val).then((res) => {
          this.search_quick_data = [];
          let data = res.data;
          for (const key in data) {
            if (data[key].type == 1) {
              data[key].iconfont = "icon-yinle";
            }
            if (data[key].type == 2) {
              data[key].iconfont = "icon-ttpodicon";
            }
            if (data[key].type == 3) {
              data[key].iconfont = "icon-zhuanji";
            }
            if (data[key].type == 4) {
              data[key].iconfont = "icon-MV";
            }
            this.search_quick_data.push(data[key]);
          }
          let compare = function (obj1, obj2) {
            var val1 = obj1.type;
            var val2 = obj2.type;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          };
          this.search_quick_data.sort(compare);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-quick-box {
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
  .item-box {
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      box-sizing: border-box;
      span {
        margin-left: 5px;
        font-size: 14px;
      }
    }
    .item {
      line-height: 36px;
      padding-left: 30px;
      padding-right: 10px;
      cursor: pointer;
      font-size: 14px;
      color: #ccc;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
      span + span {
        margin-left: 5px;
      }
      .item-title {
        color: #000;
      }
      &:hover {
        background-color: #31c27c;
        color: #fff;
      }
      &:hover > span {
        color: #fff;
      }
    }
  }
}
</style>