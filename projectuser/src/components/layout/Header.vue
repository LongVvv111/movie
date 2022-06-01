<template>
  <div class="header">
    <el-card class="box_card">
      <img src="../../assets/images/登录/u1.png" alt="" />
      <div class="logo_text">哇塞电影</div>
      <div class="navigation">
        <el-link class="nav_link" href="/" :underline="false">首页</el-link>
        <el-link class="nav_link" href="/film" :underline="false">电影</el-link>
        <el-link class="nav_link" href="/activity" :underline="false"
          >活动</el-link
        >
        <el-link class="nav_link" href="/message" :underline="false"
          >留言</el-link
        >
      </div>
      <div class="header_serch">
        <el-autocomplete
          style="width: 250px"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入电影名"
          @select="handleSelect"
        />
      </div>
      <div class="top_login">
        <el-link
          v-if="isLogin == false"
          href="/login"
          class="login_link"
          :underline="false"
          >登录</el-link
        >
        <el-dropdown v-if="isLogin == true" class="dropdown_link">
          <span class="el-dropdown-link">
            {{ user.username }}<i class="el-icon-caret-bottom"></i>
          </span>
          <img
            :src="user.avatar"
            alt=""
            width="50"
            referrerpolicy="no-referrer"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link
                :underline="false"
                href="/cart"
                style="padding-left: 7px"
              >
                <i
                  style="font-size: 15px; padding-right: 3px"
                  class="el-icon-shopping-cart-2"
                ></i>
                购物车
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link
                :underline="false"
                href="/order"
                style="padding-left: 7px"
              >
                <i
                  style="font-size: 15px; padding-right: 3px"
                  class="el-icon-s-order"
                ></i>
                我的订单
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link
                :underline="false"
                href="/setting"
                style="padding-left: 7px"
              >
                <i
                  style="font-size: 15px; padding-right: 3px"
                  class="el-icon-user-solid"
                ></i>
                个人设置
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link
                @click="handleLogout"
                :underline="false"
                href="/login"
                style="padding-left: 7px"
              >
                <i
                  style="font-size: 15px; padding-right: 3px"
                  class="el-icon-switch-button"
                ></i>
                退出登录
              </el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-card>
  </div>
</template>


<script>
import { UserInfo } from "../../api/user.js";
import { SearchFilm } from "../../api/user.js";

export default {
  data() {
    return {
      isLogin: false,
      state: "",
      user: {},
      SearchList: [],
    };
  },
  mounted() {
    this.queryUser();
  },
  methods: {
    //退出
    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    //查询用户信息
    queryUser() {
      if (localStorage.getItem("uid") !== null) {
        UserInfo().then((res) => {
          // console.log(res);
          this.isLogin = true;
          this.user = res.data;
        });
      }
    },
    //电影头部查询
    querySearchAsync(queryString, cb) {
      if (queryString) {
        SearchFilm(this.state).then((res) => {
          setTimeout(() => {
            this.searchList = res.data;
            cb(this.loadSearchList());
          }, 1000);
        });
      }
    },
    loadSearchList() {
      let arr = new Array(0);
      for (let i = 0; i < this.searchList.length; i++) {
        arr.push({
          id: this.searchList[i].id,
          value: this.searchList[i].name,
        });
        // console.log(this.searchList[i].name);
      }
      return arr;
    },

    handleSelect(item) {
      localStorage.setItem("fid", item.id);
      this.$router.push("/details?fid=" + item.id);
    },
  },
};
</script>


<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.header {
  height: 75px;
  width: 1510px;
  background-color: white;
  padding-left: 0;
  img {
    height: 50px;
    width: 50px;
    margin-left: 150px;
    float: left;
  }
  .logo_text {
    line-height: 40px;
    font-size: 30px;
    font-weight: bold;
    margin-left: 15px;
    float: left;
    margin-top: 5px;
  }
  .navigation {
    line-height: 55px;
    float: left;
    margin-bottom: 15px;
    font-weight: 300;
    .nav_link {
      font-size: 20px;
      margin-left: 40px;
    }
  }
  .header_serch {
    float: left;
    margin-left: 40px;
    margin-top: 10px;
  }
  .top_login {
    .login_link {
      font-size: 16px;
      float: right;
      margin-right: 20px;
      margin-top: 15px;
    }

    .dropdown_link {
      float: right;
      padding: 10px;
      img {
        margin-top: -10px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
