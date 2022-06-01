<template>
  <div class="seat_main">
    <el-steps :active="2" align-center>
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
    </el-steps>

    <div class="seat_content">
      <div class="seat_aside">
        <div style="display: flex">
          <img :src="film.cover" alt="" referrerpolicy="no-referrer" />
          <div>
            <div class="seat_side_name">{{ film.name }}</div>
            <div class="seat_aside_text">类型：{{ film.type }}</div>
            <div class="seat_aside_text">地区：{{ film.region }}</div>
            <div class="seat_aside_text">时长：{{ film.duration }}</div>
          </div>
        </div>
        <div class="seat_aside_content">
          <div class="d1"><span>放映：</span>{{ arrangement.type }}</div>
          <div class="d1" style="color: #f56c6c">
            <span>日期：</span>{{ arrangement.date }}
          </div>
          <div class="d1"><span>开场：</span>{{ arrangement.startTime }}</div>
          <div class="d1"><span>散场：</span>{{ arrangement.endTime }}</div>
          <div class="d1"><span>票价：</span>{{ arrangement.price }}</div>
          <el-divider></el-divider>
          <div class="d1">
            已选座位：
            <el-tag
              v-for="(item, i) in userSeats"
              :key="i"
              type="danger"
              effect="plain"
              style="margin-right: 5px"
              >{{ item }}</el-tag
            >
          </div>
          <div class="d1" style="padding-top: 10px">
            总计：
            <span style="color: #f56c6c">$</span>
            <span style="color: #f56c6c; sont-size: 25px; font-weight: bold">{{
              cart.price
            }}</span>
          </div>
          <el-divider></el-divider>
          <div class="btn">
            <el-input
              v-model="cart.phone"
              style="padding-top: 30px; padding-bottom: 20px"
              placeholder="请输入手机号码"
            >
            </el-input>
            <el-button
              round
              @click="submitSeat"
              type="danger"
              style="width: 200px; height: 60px; margin-left: 60px"
              >加入购物车</el-button
            >
          </div>
        </div>
      </div>
      <div class="hall seat_select">
        <div class="seat_example">
          <div class="selectable_example example">
            <span>可选座位</span>
          </div>
          <div class="sold_example example">
            <span>已售座位</span>
          </div>
          <div class="selected_example example">
            <span>已选座位</span>
          </div>
        </div>
        <div class="seat_block">
          <div class="seat_container">
            <div class="screen_container">
              <div class="screen">银幕中央</div>
              <div class="screen-inline"></div>
            </div>
            <div class="seat_wrapper">
              <div style="padding: 0 40px; width: 500px; height: 200px">
                <span v-for="(item, index) in seats" :key="index">
                  <span v-if="item.status === 0" class="seat sold item" />
                  <span
                    v-if="item.status === 1"
                    @click="handleSelect(index)"
                    class="seat selectable item" />
                  <span
                    v-if="item.status === 2"
                    @click="handleDisSelect(index)"
                    class="seat selected item"
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FilmArrangementDetail, FilmSeat, AddCart } from "@/api/film";
import config from "@/config.js";
export default {
  data() {
    return {
      cart: {
        uid: localStorage.getItem("uid"),
        aid: localStorage.getItem("arrangementId"),
        seats: "",
        phone: "",
        price: 0,
      },
      film: {
        // cover_show: require("../assets/filmImg/lihuanying.jpg"),
        // name: "李焕英",
        // type: "家庭",
        // region: "中国大陆",
        // duration: "120",
      },
      arrangement: {
        // type: "家庭",
        // date: "2020-2-15",
        // start: "19:00:00",
        // endtime: "21:00:00",
        // price: 40,
      },
      userSeats: [],
      seats: [],
      SelectSeats: [],
    };
  },
  mounted() {
    this.QueryFilmArrangementAndSeat();
  },
  methods: {
    formatDate(dateint) {
      //日期格式化，
      //console.log(dateint);
      var date = new Date(parseInt(dateint));
      var str = date.getFullYear() + "-";
      if (date.getMonth() < 10) {
        str += "0";
      }
      str += date.getMonth() + 1 + "-";
      if (date.getDate() < 10) {
        str += "0";
      }
      str += date.getDate() + " ";
      if (date.getHours() < 10) {
        str += "0";
      }
      str += date.getHours() + ":";

      if (date.getMinutes() < 10) {
        str += "0";
      }
      str += date.getMinutes();
      //console.log(str);
      return str;
    },
    submitSeat() {
      if (this.cheackPhoneAndSeats()) {
        let mySeats = [];
        for (let i = 0; i < this.userSeats.length; i++) {
          this.cart.seats += this.userSeats[i] + "号";
          mySeats[i] = this.userSeats[i];
        }
        // console.log(this.cart);
        this.$message({
          message: "已为您添加购物车成功，请尽快付款吧",
          type: "succes",
        });
        this.cart.seats = mySeats + "";
        this.cart.status = 0;
        AddCart(this.cart).then((res) => {
          //代码
          if (res.code == 200) {
            console.log(res.data);
          }
        });
        // this.$router.go(-1);
      }
    },
    handleSelect(index) {
      if (this.userSeats.length > 3) {
        var d = this.userSeats[0] - 1;
        this.seats[d].status = 1;
        this.userSeats.splice(0, 1);
        // this.userSeats.push(index + 1);
        // this.seats[index].status = 2;
        // this.cart.price = this.arrangement.price * this.userSeats.length
      }
      this.userSeats.push(index + 1);
      this.seats[index].status = 2;
      this.cart.price = this.arrangement.price * this.userSeats.length;
    },
    handleDisSelect(index) {
      this.seats[index].status = 1;
      this.userSeats.splice(this.userSeats.indexOf(index + 1), 1);
      this.cart.price = this.arrangement.price * this.userSeats.length;
    },
    cheackPhoneAndSeats() {
      if (this.userSeats.length === 0) {
        this.$message({
          message: "请选择要订购的座位",
          type: "warning",
        });
        return false;
      }
      if (this.cart.phone.length !== 11) {
        this.$message({
          message: "请输入正确的电话号码",
          type: "warning",
        });
        return false;
      }
      return true;
    },
    QueryFilmArrangementAndSeat() {
      // console.log(this.$route.query.fid);//没有定义
      FilmArrangementDetail(localStorage.getItem("arrangementId")).then(
        (res) => {
          if (res.code == 200) {
            this.film = res.data.film; //获得电影信息
            this.film.cover = config.API_URL + this.film.cover; //修改图片地址
            this.arrangement = res.data.arrangement;
            //修改时间显示
            this.arrangement.date = this.formatDate(this.arrangement.date);
            this.arrangement.startTime = this.formatDate(
              this.arrangement.startTime
            );
            this.arrangement.endTime = this.formatDate(
              this.arrangement.endTime
            );
          }
          //获得对应的座位信息
          // http://localhost:8888/api/arrangement/getSeats
          FilmSeat(localStorage.getItem("arrangementId")).then((res) => {
            if (res.code == 200) {
              this.SelectSeats = res.data; //这是一个集合
              //console.log(res.data);
              //显示座位
              this.LoadSeats();
            }
          });
        }
      );
    },
    LoadSeats() {
      const n = this.arrangement.seatNumber; //获得座位数
      let arr = new Array(n);
      //所有的座位，都是空的
      for (let i = 0; i < n; i++) {
        arr[i] = { status: 1 };
        // if (this.SelectSeats.indexOf(i + 1) === -1) {
        //   arr[i] = { seatstatus: 1 };
        // } else {
        //   arr[i] = { seatstatus: 0 };
        // }
      }
      //已经买过票的，去除掉
      for (let i = 0; i < this.SelectSeats.length; i++) {
        arr[this.SelectSeats[i].seat] = { status: 0 };
      }
      //选座切换的问题，数据库中是不能修改的
      //0 不可选
      //1 未选
      //2 已选
      this.seats = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.seat_main {
  padding: 80px;
  .seat_content {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 100%;
    height: 850px;
    .seat_aside {
      width: 30%;
      background-color: rgb(240, 235, 235);
      height: 100%;
      float: left;
      img {
        padding: 30px;
        width: 140px;
        height: 200px;
      }
      .seat_side_name {
        margin-top: 40px;
        font-size: 25px;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
      }
      .seat_aside_text {
        font-size: 13px;
        padding-top: 8px;
        color: #666666;
        letter-spacing: 1px;
      }
      .seat_aside_content {
        padding: 5px 30px;
        .d1 {
          margin-left: 20px;
          margin-top: 10px;
          height: 25px;
          line-height: 25px;
          span {
            color: #91949c;
          }
        }
      }
    }
    .hall {
      width: 700px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      .seat_example {
        margin: 30px 0 30px 118px;
        padding-left: 30px;
        .selectable_example {
          background: url("../assets/img/seat3.png") no-repeat;
        }
        .sold_example {
          background: url("../assets/img/seat2.png") no-repeat;
        }
        .selected_example {
          background: url("../assets/img/seat1.png") no-repeat;
        }
        .example {
          display: inline-block;
          font-size: 16px;
          color: #666;
          height: 26px;
          line-height: 26px;
          padding-left: 38px;
          background-repeat: no-repeat;
          margin-right: 50px;
        }
      }
    }
    .seat_select {
      padding-top: 50px;
      padding-left: 8%;
      .seat_block {
        font-size: 0;
        overflow: hidden;
        margin-left: 20px;
        .seats_container {
          margin-left: 50px;
          overflow: auto;
          position: relative;
          padding-top: 112px;
          .screen_container {
            left: 5px;
            display: inline-block;
            position: absolute;
            top: 0;
            bottom: 0;
            // z-index: -1;
            .screen {
              width: 550px;
              padding-top: 50px;
              text-align: center;
              font-size: 16px;
              color: #666;
              background: url("../assets/img/seat4.png") no-repeat;
              background-position-x: center;
              position: relative;
              margin-top: 40px;
            }
            .screen_line {
              width: 0;
              border-left: 1px dashed #e5e5e5;
              position: absolute;
              top: 90px;
              bottom: 0;
              left: 50%;
            }
          }
        }
        .seat_wrapper {
          display: inline-block;
          max-width: 550px;
          .seat {
            display: inline-block;
            font-size: 0;
            width: 30px;
            height: 26px;
            margin: 0 5px;
            background: url("../assets/img/seat3.png") no-repeat;
            background-position: 0 1px;
          }
          .sold {
            background: url("../assets/img/seat1.png") no-repeat;
          }
          .selected {
            background: url("../assets/img/seat2.png") no-repeat;
          }
          .item {
            padding-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>