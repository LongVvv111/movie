<template>
  <div class="index">
    <el-carousel indicator-position="outside" height="500px">
      <el-carousel-item v-for="(item, index) in posterList" :key="index">
        <img class="CarImg" :src="item.url" referrerpolicy="no-referrer" />
      </el-carousel-item>
    </el-carousel>
    <div class="main">
      <ul>
        <li v-for="(item, index) in filmList" :key="index">
          <div @click="handleclick(item)">
            <div class="movie">
              <img
                width="160"
                height="224"
                class="movieImg"
                :src="item.cover"
                alt=""
                referrerpolicy="no-referrer"
              />
              <div class="movie_name">{{ item.name }}</div>
            </div>

            <div class="want">{{ item.hot }}人想看</div>
            <div class="movie_time">{{ item.releaseTime }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="as">
      <div class="top">
        <span>热门榜单Top10</span>
        <div class="top1">
          <div @click="handleclick(top1)" style="cursor: pointer">
            <img
              width="120"
              :src="top1.cover"
              :alt="top1.name"
              referrerpolicy="no-referrer"
            />
            <div class="top1_text">
              <p>{{ top1.name }}</p>
              <p>上映时间：{{ top1.releaseTime }}</p>
              <p class="hot_text">热度值：{{ top1.hot }}</p>
            </div>
          </div>
        </div>

        <div @click="handleclick(top2)">
          <div class="top2">
            <img
              width="140"
              height="195"
              :src="top2.cover"
              :alt="top2.name"
              referrerpolicy="no-referrer"
            />
            <p>{{ top2.name }}</p>
            <p class="hot_text">热度值：{{ top2.hot }}</p>
          </div>
        </div>
        <div class="top3" @click="handleclick(top3)" style="cursor: pointer">
          <div class="top3">
            <img width="140" height="195" :src="top3.cover" :alt="top3.name" />
            <p>{{ top3.name }}</p>
            <p class="hot_text">热度值：{{ top3.hot }}</p>
          </div>
        </div>
        <div class="more_top">
          <ul>
            <li
              v-for="(item, index) in topList"
              :key="index"
              @click="handleclick(item)"
              style="cursor: pointer"
            >
              <span class="more_index">{{ index + 4 }}</span>
              <span class="more_name">{{ item.name }}</span>
              <span class="more_hot">{{ item.hot }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ListAllPoster, ListAllFilm, ListTopFilm } from "../api/film.js";
import { ConvertJSONDateToJSDate } from "@/api/util.js";
export default {
  mounted() {
    this.posterQuery();
    this.nowPlaying();
    this.topListQuery();
  },
  methods: {
    posterQuery() {
      ListAllPoster().then((res) => {
        if (res.code == 200) {
          this.posterList = res.data;
        } else {
        }
      });
    },
    nowPlaying() {
      ListAllFilm().then((res) => {
        if (res.code == 200) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].releaseTime = this.formatDate(res.data[i].releaseTime);
          }
          this.filmList = res.data;
        }
      });
    },
    formatDate(dateint) {
      //日期格式化，
      //console.log(dateint);
      var date = new Date(parseInt(dateint));
      var str =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return str;
    },
    topListQuery() {
      ListTopFilm().then((res) => {
        if (res.code == 200) {
          for (var i = 0; i < res.data.length; i++) {
            //res.data[i].releaseTime=ConvertJSONDateToJSDate("/Date("+res.data[i].releaseTime+")/");
            res.data[i].releaseTime = this.formatDate(res.data[i].releaseTime);
          }
          this.topList = res.data;
          this.top1 = this.topList[0];
          this.top2 = this.topList[1];
          this.top3 = this.topList[2];
          this.topList.splice(0, 3);
        }
      });
    },
    handleclick(item) {
      localStorage.setItem("fid", item.id);
      this.$router.push("details?fid=" + item.id);
    },
  },
  data() {
    return {
      posterList: [], //轮播图
      status: 1,
      filmList: [],
      topList: [], //top10数组，用来接收后台数据
      top1: {},
      top2: {},
      top3: {},
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.index {
  margin: 50px auto 0;
  .CarImg {
    width: 100%;
    height: 100%;
  }
  .main {
    width: 60%;
    float: left;
    ul {
      list-style: none;
      margin-top: 40px;
      margin-left: 140px;
      li {
        float: left;
        margin: 15px;
        width: 160px;
        .movie {
          position: relative;
          .movie_name {
            position: absolute;
            width: 150px;
            bottom: 5px;
            left: 0;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            background-color: rgba(0, 0, 0, 0.404);
            color: white;
            padding-left: 10px;
            display: none;
          }
        }
        .movie :hover + .movie_name {
          display: block;
        }
        .want {
          background-color: whitesmoke;
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          color: orange;
          font-size: 14px;
          margin-top: -5px;
          text-align: center;
        }
        .movie_time {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          color: #91919c;
        }
      }
    }
  }
  .as {
    width: 30%;
    height: 900px;
    float: right;
    .top {
      width: 320px;
      span {
        font-size: 26px;
        color: orange;
      }
      .top1 {
        margin-top: 20px;
        height: 170px;
        border: 1px solid #eee;
        margin-bottom: 30px;
        img {
          float: left;
        }
        .top1_text {
          // float: left;
          height: 35px;
          line-height: 35px;
          font-size: 18px;
          margin-right: 40px;
          color: #91919c;
          P {
            padding-left: 150px;
          }
          .hot_text {
            font-size: 12px;
            color: orange;
          }
        }
      }
      .top1:hover,
      .top2:hover,
      .top3:hover {
        background-color: whitesmoke;
      }
      .top2 {
        border: 1px solid #eee;
        width: 140px;
        color: #91919c;
        font-size: 16px;
        float: left;
        margin-right: 36px;
        // text-decoration: none;
        p {
          height: 15px;
          line-height: 15px;
          margin: 10px;
        }
        .hot_text {
          font-size: 12px;
          color: orange;
        }
      }
      .top3 {
        border: 1px solid #eee;
        width: 140px;
        color: #91919c;
        font-size: 16px;
        float: left;
        p {
          height: 15px;
          line-height: 15px;
          margin: 10px;
        }
        .hot_text {
          font-size: 12px;
          color: orange;
        }
      }
      .more_top {
        clear: both;
        ul {
          margin-top: 20px;
          li {
            list-style: none;
            line-height: 40px;
            margin: 10px;
            span {
              font-size: 16px;
              color: #91919c;
              display: inline-block;
              // float: float;
            }
            .more_name {
              padding-left: 20px;
            }
            .more_hot {
              float: right;
            }
          }
          li:hover {
            background-color: whitesmoke;
          }
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
}
</style>