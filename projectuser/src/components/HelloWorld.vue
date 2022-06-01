<template>
  <div class="hello">
    <el-button type="primary" @click="handleClick()">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      username: "zhangshan",
      password: "123456",
    };
  },
  methods: {
    handleClick() {
      var params = {
        username: this.username,
        password: this.password,
      };
      this.axios
        .post("https://api.apiopen.top/recommendPoetry", params)
        .then((res) => {
          console.log(res);
          console.log(res.data.code);
          if (res.data.code == 200) {
            alert(res.data.message);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
