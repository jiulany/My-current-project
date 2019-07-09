// 新闻列表
<template>
  <el-row>
    <el-row
      class="news-item"
      v-for="(item,index) in dt"
      :key="index"
      @click.native="toContent(dt[index])"
    >
      <el-col :span="10">
        <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
      </el-col>
      <el-col class="news-text" :span="14">
        <el-col :span="24" class="news-title">{{item.article_title}}</el-col>
        <el-col :span="24" class="news-time">{{item.create_time}}</el-col>
        <el-col :span="24" class="news-ct">{{item.article_content}}</el-col>
      </el-col>
      <el-col :span="24" class="hr_0"></el-col>
    </el-row>
    <el-col :span="24" class="paging">
      <el-col :span="8">共&nbsp;{{total}}&nbsp;条</el-col>
      <el-col :span="16">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="4"
          @current-change="changePg"
        ></el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      dt: [],
      total: null
    };
  },
  created() {
    if (this.$route.path == "/new_center") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "7"
        })
        .then(res => {
          console.log(res)
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
    if (this.$route.path == "/policy_center") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "8"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
  },
  updated() {
    document.getElementsByClassName("hr_0")[
      document.getElementsByClassName("hr_0").length - 1
    ].style.display = "none";
  },
  watch: {
    $route(to, from) {
      if (to.path == "/policy_center") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "8"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (this.$route.path == "/new_center") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "7"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
    }
  },

  methods: {
    toContent(dt) {
      sessionStorage.setItem("article_title", dt.article_title);
      sessionStorage.setItem("create_time", dt.create_time);
      sessionStorage.setItem("title_img", dt.title_img);
      sessionStorage.setItem("article_content", dt.article_content);
      sessionStorage.setItem("article_id", dt.id);
      if (this.$route.path == "/new_center") {
        this.$router.push(
          "/new_list/new_content?it_1=>新闻政策&it_2=>新闻中心"
        );
      }
      if (this.$route.path == "/policy_center") {
        this.$router.push(
          "/policy_list/policy_content?it_1=>新闻政策&it_2=>政策文件"
        );
      }
    },
    changePg(cr) {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: cr,
          pageCount: "4",
          id: "7"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
  }
};
</script>

<style>
.news-item {
  height: 79px;
  margin-bottom: 10px;
}
.news-item .el-col img {
  height: 100%;
  width: 100%;
  max-width: 261px;
}
.news-item .el-col {
  height: 100%;
  text-align: start;
}
.news-text {
  padding-left: 10px;
  position: relative;
}
.news-title {
  height: auto !important;
  font-weight: bold;
  font-size: 16px;
  overflow-x: hidden;
  white-space: nowrap;
}
.news-time {
  height: auto !important;
  font-size: 9px;
  margin-top: 5px;
  color: #cccccc;
}
.news-ct {
  height: auto !important;
  font-size: 12px;
  position: absolute;
  bottom: 0px;
  height: 32px !important;
  overflow-y: hidden;
}
.hr_0 {
  width: 100%;
  height: 0 !important;
  margin-top: 10px;
  border: 0.5px solid #eaeaea;
  margin-bottom: 10px;
}
.paging {
  margin-top: 20px;
}
.paging .el-col:nth-of-type(1) {
  font-size: 13px;
  padding-top: 6px;
  text-align: end;
}
.paging .el-col:nth-of-type(2) {
  text-align: start;
}
</style>
