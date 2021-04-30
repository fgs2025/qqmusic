<template>
  <div class="player-wrap">
    <div class="bg_player_mask absolute w100h100 left0top0"></div>
    <div class="bg_player absolute w100h100 left0top0"></div>
    <div class="player-box absolute w100h100 left0top0">
      <div class="top">
        <div class="logo">
          <img
            class="pointer"
            src="https://y.qq.com/mediastyle/yqq/img/player_logo.png"
            alt=""
          />
        </div>
        <div class="info">
          <img class="pointer" :src="img" alt="" />
          <span class="pointer">退出</span>
        </div>
      </div>
      <div class="player-main">
        <div class="player__bd">
          <div class="bd_left">
            <div class="mod_songlist_toolbar">
              <div class="bar pointer">
                <i class="iconfont icon-shoucang"></i>
                收藏
              </div>
              <div class="bar pointer">
                <i class="iconfont icon-tianjia"></i>添加到
              </div>
              <div class="bar pointer">
                <i class="iconfont icon-xiazai"></i>下载
              </div>
              <div class="bar pointer">
                <i class="iconfont icon-shanchu"></i>删除
              </div>
              <div class="bar pointer">
                <i class="iconfont icon-qingkong"></i>清空列表
              </div>
            </div>
            <div class="sb_main">
              <div class="header item-box">
                <div class="header-songname">歌曲</div>
                <div class="header-sing">歌手</div>
                <div class="header-time">时长</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
        
        
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
              <div class="item-box">
                <div class="num">1</div>
                <div class="name">晴天</div>
                <div class="sing pointer">周杰伦</div>
                <div class="time">04:15</div>
              </div>
            </div>
          </div>
          <div class="bd_right">2</div>
        </div>
        <div class="player-ft">
          <div class="left">
            <i class="iconfont icon-shangyishou pointer"></i>
            <i class="iconfont icon-zanting pointer"></i>
            <i class="iconfont icon-xiayishou pointer"></i>
          </div>
          <div class="middle">
            <div class="m_top">
              <span>歌曲名</span>
              <span>04:58/05:30</span>
            </div>
            <div class="m_bottom">
              <div class="slider__runway pointer">
                <div class="slider__bar">
                  <div class="slider__button"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <i class="iconfont icon-xunhuan pointer"></i>
            <i class="iconfont icon-pinglun pointer"></i>
            <i class="iconfont icon-shoucang pointer"></i>
            <i class="iconfont icon-xiazai pointer"></i>
            <i class="iconfont icon-shengyin pointer"></i>
            <div class="slider__runway pointer">
              <div class="slider__bar">
                <div class="slider__button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cookie, detail } from "@/api/user.js";
export default {
  data() {
    return {
      img: "",
    };
  },
  mounted() {
    Cookie().then((res) => {
      let cookie = res.data.cookie;
      if (cookie) {
        detail()
          .then((res) => {
            this.img = res.data.creator.headpic;
          })
          .catch(() => {
            return;
          });
      }
    });
  },
};
</script>

<style lang="less" scoped>
.player-wrap {
  height: 100vh;

  .bg_player {
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: 0.6;
    background-image: url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000n5V2F3w1jxV.jpg?max_age=2592000")');
  }
  .bg_player_mask {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 2;
  }
  .player-box {
    z-index: 9999;
    display: flex;
    flex-direction: column;
    .top {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        img {
          opacity: 0.3;
          &:hover {
            opacity: 1;
          }
        }
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
        }
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .player-main {
      position: relative;
      flex: 1;
      margin: 0 7.638889%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .player__bd {
        display: flex;
        justify-content: space-between;
        flex: 1;
        .bd_left {
          display: flex;
          flex-direction: column;
          .mod_songlist_toolbar {
            display: flex;
            margin-bottom: 30px;
            .bar {
              padding: 0 23px;
              height: 38px;
              line-height: 38px;
              border: 1px solid rgba(244, 244, 244, 0.3);
              min-width: 122px;
              text-align: center;
              box-sizing: border-box;
              font-size: 14px;
              color: #ccc;
              i {
                margin-right: 3px;
              }
              &:hover {
                border-color: #fff;
                color: #fff;
              }
              & + .bar {
                margin-left: 40px;
              }
            }
          }
          .sb_main {
            flex: 1;
            .header {
              border-top: 1px solid rgba(224, 224, 224, 0.2);
              padding-left: 40px !important;
              .header-songname {
                width: 695px;
              }
              .header-sing {
                width: 265px;
              }
              .header-time {
                width: 50px;
              }
            }
            .item-box {
              height: 50px;
              line-height: 50px;
              padding-left: 4px;
              display: flex;
              color: #ccc;
              font-size: 14px;
              border-bottom: 1px solid rgba(225, 225, 225, 0.2);
              .num {
                width: 36px;
                text-align: center;
              }
              .name {
                width: 695px;
              }
              .sing {
                width: 265px;
                &:hover {
                  color: #fff;
                }
              }
              .time {
                width: 50px;
              }
            }
          }
        }
      }
      .player-ft {
        width: 100%;
        height: 11%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        .left {
          i {
            color: #ccc;
            font-size: 35px;
            &:hover {
              color: #fff;
            }
            & + i {
              margin-left: 20px;
            }
          }
        }
        .middle {
          flex: 1;
          margin-left: 30px;
          .m_top {
            color: #ccc;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
          }
          .m_bottom {
            margin-top: 10px;
            .slider__runway {
              width: 100%;
              height: 3px;
              background-color: rgba(204, 204, 204, 0.5);
              border-radius: 2px;
              position: relative;
              .slider__bar {
                width: 30%;
                height: 3px;
                background-color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                .slider__button {
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background-color: #fff;
                  position: absolute;
                  top: 50%;
                  right: -5px;
                  transform: translate(0, -50%);
                }
              }
            }
          }
        }
        .right {
          width: 400px;
          margin-left: 20px;
          display: flex;
          align-items: center;
          i {
            color: #ccc;
            font-size: 30px;
            &:hover {
              color: #fff;
            }
            & + i {
              margin-left: 20px;
            }
          }
          .slider__runway {
            margin-left: 10px;
            width: 100%;
            height: 3px;
            background-color: rgba(204, 204, 204, 0.5);
            border-radius: 2px;
            position: relative;
            .slider__bar {
              width: 30%;
              height: 3px;
              background-color: #fff;
              position: absolute;
              left: 0;
              top: 0;
              .slider__button {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                top: 50%;
                right: -5px;
                transform: translate(0, -50%);
              }
            }
          }
        }
      }
    }
  }
}
</style>