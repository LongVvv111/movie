<template>
  <div class="message">
    <div class="customer_service">
      <div class="service_text">客服人员</div>
      <div class="serive_main">
        <ul>
          <li v-for="(item, index) in seriveList" :key="index">
            <img
              width="80"
              height="80"
              class="seriveImg"
              :src="item.avatar"
              alt=""
              referrerpolicy="no-referrer"
            />
            <div class="worker_text">
              <span class="serive_name">名字：{{ item.username }}</span>
              <span class="serive_sex">性别：{{ item.gender }}</span>
              <span class="serive_id">ID:{{ item.id }}</span>
            </div>
            <div style="clear: both">
              <el-button @click="handleListEvaluate(item)" type="text"
                >我的评价</el-button
              >
              <el-button @click="isListEvaluate()" type="text"
                >评价客服</el-button
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cinema_message">
      <div class="message_text">影院留言</div>
      <div class="message_main">
        <ul>
          <li v-for="(item, index) in messageList" :key="index">
            <img
              v-if="item.user != null"
              width="80"
              height="80"
              class="messageImg"
              :src="item.user.avatar"
              alt=""
              referrerpolicy="no-referrer"
            />
            <img
              width="80"
              height="80"
              v-else
              src="../assets/img/nim.png"
              alt=""
              referrerpolicy="no-referrer"
            />
            <div class="customer_text">
              <span class="message_name">名字：{{ item.user.username }}</span>
              <span class="customer_message">{{
                item.leavingMessage.content
              }}</span>
              <span class="message_time"
                >Time:{{ item.leavingMessage.createTime }}</span
              >
            </div>
          </li>
        </ul>
      </div>
      <el-button type="success" class="addbutton" @click="handleMessage()"
        >添加留言</el-button
      >
    </div>
    <el-dialog title="我的评价" :visible.sync="dialogViewpoint" width="600px">
      <el-table :data="ViewpointData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="评语" width="180">
        </el-table-column>
        <el-table-column property="type" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === '非常满意'" type="success"
              >非常满意</el-tag
            >
            <el-tag v-if="scope.row.type === '满意'" type="info">满意</el-tag
            ><el-tag v-if="scope.row.type === '不满意'" type="danger"
              >不满意</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="评价客服" :visible.sync="dialogEvaluate" width="800px">
      <span style="margin-left: 100px; margin-right: 20px"> 评价内容</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <br />
      <div style="margin: 20px 0px">
        <span
          style="
            margin: 10px auto;
            float: left;
            margin-left: 100px;
            margin-right: 20px;
          "
        >
          评价内容</span
        >
        <el-input
          type="textarea"
          :rows="8"
          placeholder=""
          v-model="textarea"
          style="width: 550px"
        >
        </el-input>
        <div class="comment_button" style="margin: 20px; float: right">
          <el-button @click="dialogVisible = false" class="cancel"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="dialogVisible = false"
            class="submit"
            >提 交</el-button
          >
        </div>
      </div>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog
      title="添加留言"
      :visible.sync="dialogMessage"
      width="800px"
      style="height: 500px"
    >
      <div style="margin-left: 40px">
        <el-input
          type="textarea"
          :rows="7"
          placeholder=""
          v-model="messagearea"
          style="width: 700px"
        >
        </el-input>
      </div>

      <div class="message_button" style="margin: 10px; float: right">
        <el-button @click="dialogVisible = false" class="cancel"
          >取 消</el-button
        >
        <el-button type="primary" @click="dialogVisible = false" class="submit"
          >提 交</el-button
        >
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  WorkList,
  MyCritic,
  LMessage,
  MyCritic2,
  AddEvaluate,
} from "@/api/lmessage";
import config from "@/config.js";
export default {
  data() {
    return {
      dialogViewpoint: false,
      dialogEvaluate: false,
      dialogMessage: false,
      seriveList: [
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客服1",
        //   sex: "男",
        //   id: "539385ec-ef",
        // },
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客服2",
        //   sex: "男",
        //   id: "539385ec-ef",
        // },
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客服3",
        //   sex: "男",
        //   id: "539385ec-ef",
        // },
      ],
      messageList: [
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客人1",
        //   message: "环境很好",
        //   time: "2022-01-19  14:45:12",
        // },
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客人1",
        //   message: "环境很好",
        //   time: "2022-01-19  14:45:12",
        // },
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客人1",
        //   message: "环境很好",
        //   time: "2022-01-19  14:45:12",
        // },
        // {
        //   cover_show: require("../assets/img/nim.png"),
        //   name: "客人1",
        //   message: "环境很好",
        //   time: "2022-01-19  14:45:12",
        // },
      ],
      ViewpointData: [
        // {
        //   date: "2016-05-02",
        //   name: "很好",
        //   type: "非常满意",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "很好",
        //   type: "非常满意",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "很好",
        //   type: "满意",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "很好",
        //   type: "非常满意",
        // },
      ],
      options: [
        {
          value: "选项1",
          label: "非常满意",
        },
        {
          value: "选项2",
          label: "满意",
        },
        {
          value: "选项3",
          label: "不满意",
        },
      ],
      isLogin: true,
      value: "",
      input: "",
      textarea: "",
      messagearea: "",
    };
  },
  mounted() {
    this.QWorkList(); //客服人员列表
    this.QMyCritic(); //我的评论
    this.QLMessage(); //留言消息
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
      str += date.getMinutes() + ":";
      if (date.getSeconds() < 10) {
        str += "0";
      }
      str += date.getSeconds();
      //console.log(str);
      return str;
    },
    handleListEvaluate(item) {
      item.dialogVisible = true;
      //item.id;
      MyCritic2(localStorage.getItem("uid"), item.id).then((res) => {
        if (res.code == 200) {
          //console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].createTime = this.formatDate(res.data[i].createTime);
          }
          this.ViewpointData = res.data;
        }
      });
    },
    isListEvaluate() {
      this.dialogEvaluate = true;
    },
    handleMessage() {
      this.dialogMessage = true;
    },
    dialogVisible2Click(item) {
      item.dialogVisible2 = false; //关闭窗口
      //console.log(item.id);
      let data = {
        wid: item.id,
        uid: localStorage.getItem("uid"),
        content: this.input,
        type: this.value,
      };
      AddEvaluate(data).then((res) => {
        if (res.code == 200) {
          //提交成功后，清理上一个输入的内容
          this.value = "";
          this.input = "";
        }
      });
    },
    QWorkList() {
      WorkList().then((res) => {
        if (res.code == 200) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].avatar = config.API_URL + res.data[i].avatar;
          }
          this.seriveList = res.data;
        }
      });
    },
    QMyCritic() {
      MyCritic(localStorage.getItem("uid")).then((res) => {
        if (res.code == 200) {
          //console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].createTime = this.formatDate(res.data[i].createTime);
          }
          this.ViewpointData = res.data;
        }
      });
    },
    QLMessage() {
      LMessage().then((res) => {
        if (res.code == 200) {
          //console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].user.avatar = config.API_URL + res.data[i].user.avatar;
            res.data[i].leavingMessage.createTime = this.formatDate(
              res.data[i].leavingMessage.createTime
            );
          }
          this.messageList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  margin: 50px auto 0;
  margin-left: 50px;
  margin-right: 50px;
  background-color: rgba(36, 41, 48, 1);
  position: relative;
  color: #dfdfe6;

  .customer_service {
    width: 396px;
    // height: 1000px;
    .service_text {
      font-size: 1.2em;
      margin: 40px;
      font-weight: bold;
    }
    .serive_main {
      ul {
        list-style: none;
        li {
          border-bottom: 1px dashed #dfdfe6;
          height: 150px;
          margin-right: 40px;
          margin-top: 40px;
          img {
            border-radius: 50%;
            float: left;
          }
          .worker_text {
            float: left;
            margin-left: 20px;
            line-height: 30px;
            .serive_name {
              display: block;
            }
            .serive_sex {
              display: block;
            }
            .serive_id {
              display: block;
            }
          }
        }
      }
    }
  }
  .cinema_message {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 1025px;
    background-color: rgba(53, 59, 67, 1);
    .message_text {
      font-size: 1.2em;
      margin: 40px;
      font-weight: bold;
      margin-left: 100px;
    }
    .message_main {
      margin-left: 60px;

      ul {
        list-style: none;
        li {
          height: 150px;
          margin-right: 40px;
          margin-top: 40px;
          img {
            border-radius: 50%;
            float: left;
          }
          .customer_text {
            float: left;
            margin-left: 20px;
            line-height: 30px;
            .message_name {
              display: block;
            }
            .customer_message {
              display: block;
              font-size: 1.2em;
              color: white;
            }
            .message_time {
              display: block;
            }
          }
        }
      }
    }
    .addbutton {
      float: right;
      margin-right: 50px;
      width: 150px;
      margin-top: 50px;
    }
  }
}
</style>