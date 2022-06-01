<template>
  <div>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main><router-view /></el-main>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>


<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.el-header,
.el-main,
.el-footer {
  margin: 0;
  padding: 0;
  width: 1510px;
  margin: 0 auto;
}
/* .el-main{

} */
</style>