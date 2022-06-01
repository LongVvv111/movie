<template>
  <div class="ticket">
    <i class="el-icon-back"></i>
    <el-link
      ><el-button type="text" @click="$router.back(-1)" style="color: black"
        >返回</el-button
      >
    </el-link>
    <span class="span1">电影购票</span>
    <div class="ticket_box"></div>
    <div class="no_film" v-if="list.length === 0">影院还未排片</div>
    <div class="ticket_item" v-for="(item, index) in list" :key="index">
      <div class="ticket_info">
        <div class="d1">{{ item.name }}</div>
        <div class="d2">{{ item.startTime }}</div>
        <el-tag effect="plain">{{ item.type }}</el-tag>
      </div>
      <div class="item-btn">
        <el-button type="danger" @click="handleSelectSeat(item.id)" round
          >选座购票</el-button
        >
      </div>
      <div class="item-price">￥{{ item.price }}</div>
    </div>
  </div>
</template>

<script>
import { FilmArrangement } from "@/api/film";
export default {
  data() {
    return {
      list: [
        // {
        //   name: "XXX",
        //   time: "2021-03-31 16：12：45",
        //   btn: "2D放映",
        //   price: "30.5",
        //   id: "1",
        // },
        // {
        //   name: "XXX",
        //   time: "2021-03-31 16：12：45",
        //   btn: "3D放映",
        //   price: "35.5",
        //   id: "2",
        // },
      ],
      login: true,
      filmId: this.$route.query.fid,
    };
  },
  mounted() {
    this.QueryFilmArrangement();
  },
  methods: {
    formatDate(dateint) {
      //日期格式化，
      //console.log(dateint);
      var date = new Date(parseInt(dateint));
      var str =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return str;
    },
    handleSelectSeat(id) {
      if (this.login == false) {
        this.$confirm("系统还没有检测到您的登录信息，是否去登陆？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$router.push("/login");
        });
      } else {
        localStorage.setItem("arrangementId", id);
        this.$router.push("/seat");
      }
    },
    QueryFilmArrangement() {
      FilmArrangement(this.filmId).then((res) => {
        if (res.code == 200) {
          //this.list = res.data.arrangements;
          //console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].startTime = this.formatDate(res.data[i].startTime);
          }
          this.list = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ticket {
  margin-left: 70px;
  margin-top: 80px;
  .span1 {
    margin-left: 20px;
  }
  .ticket_box {
    width: 100%;
    height: 20px;
  }
  .no_firm {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 25px;
    color: red;
  }
  .ticket_item {
    padding-top: 20px;
    height: 100px;
    .ticket_info {
      float: left;
      .d1 {
        font-size: 15px;
        letter-spacing: 2px;
        padding-bottom: 7px;
      }
      .d2 {
        font-size: 13px;
        letter-spacing: 1px;
        padding-bottom: 7px;
        color: #999;
      }
    }
    .item-btn {
      float: right;
      padding-top: 30px;
      padding-left: 50px;
    }
    .item-price {
      float: right;
      color: #f34d41;
      line-height: 100px;
    }
  }
}
</style>