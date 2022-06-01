<template>
  <div class="me">
    <div class="main">
      <div class="aside" style="width: 240px">
        <h2
          style="
            text-align: center;
            padding: 10px 0;
            letter-spacing: 2px;
            font-weight: 400;
          "
        >
          个人中心
        </h2>
        <el-menu
          class="el_menu_vertical_demo"
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/cart">
            <i class="el-icon-shopping-cart-1"></i>
            <span style="letter-spacing: 1px" slot="title">购物车</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="el-icon-s-order"></i>
            <span style="letter-spacing: 1px" slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span style="letter-spacing: 1px" slot="title">基本设置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.me {
  padding: 70px 100px;
  .main {
    height: 1100px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgb(0, 0, 0, 0.12), 0 0 6px rgb(0, 0, 0, 0.4);
    .aside {
      float: left;
      height: 100%;
      border-right: solid 1px #e6e6e6;
      .el-menu {
        border-right: none;
      }
    }
    .content {
      float: left;
      padding: 10px 20px;
      width: 665px;
    }
  }
}
</style>