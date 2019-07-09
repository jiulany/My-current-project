// 课程教学组件
<template>
  <el-row class="content">
    <el-row class="curriculum">
      <el-col
        :span="12"
        class="curriculum-item"
        v-for="(item,index) in dt"
        :key="index"
        @click.native="toContent(dt[index])"
      >
        <el-col :span="24">
          <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
        </el-col>
        <el-col :span="24">{{item.article_title}}</el-col>
      </el-col>
    </el-row>
    <el-col :span="24" class="paging">
      <el-col :span="8">共&nbsp;{{total}}&nbsp;条</el-col>
      <el-col :span="16">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="4" @current-change="changePg"></el-pagination>
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
      if (this.$route.path == "/curriculum") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "5"
        })
        .then(res => {
            console.log(res)
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
    if (this.$route.path == "/train") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "5"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
    if (this.$route.path == "/stu") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "6"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
    if (this.$route.path == "/class") {
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "11"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
    if (this.$route.path == "/line") {
      console.log(this.$route.path);
      this.$http
        .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
          pageIndex: "1",
          pageCount: "4",
          id: "12"
        })
        .then(res => {
          this.dt = res.data.Data;
          this.total = res.data.total;
        });
    }
  },
  watch: {
    $route(to, from) {
          if (to.path == "/curriculum") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "5"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (to.path == "/train") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "5"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (to.path == "/stu") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "6"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (to.path == "/class") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "11"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (this.$route.path == "/line") {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: "1",
            pageCount: "4",
            id: "12"
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
      if (this.$route.path == "/train") {
        this.$router.push({
          path: "/train/train_content",
          query: { it_1: ">关于培训", it_2: ">培训动态" }
        });
      }
      if (this.$route.path == "/stu") {
        this.$router.push({
          path: "/train/train_content",
          query: { it_1: ">关于培训", it_2: ">学员风采" }
        });
      }
      if (this.$route.path == "/curriculum") {
        this.$router.push({
          path: "/curriculum/curriculum_content",
          query: { it_1: ">课程教学" }
        });
      }
      if (this.$route.path == "/class") {
        this.$router.push({
          path: "/class/class_content",
          query: { it_1: ">课程内容", it_2: ">课程大纲" }
        });
      }
      if (this.$route.path == "/line") {
        this.$router.push({
          path: "/line/line_content",
          query: { it_1: ">课程内容", it_2: ">研学路线" }
        });
      }
    },
    changePg(cr) {
      let a=window.location.href
      if (a.search("/curriculum") != -1) {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: cr,
            pageCount: "4",
            id: "5"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (a.search("/train") != -1) {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: cr,
            pageCount: "4",
            id: "5"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (a.search("/stu") != -1 ) {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: cr,
            pageCount: "4",
            id: "6"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (a.search( "/class") != -1 ) {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: cr,
            pageCount: "4",
            id: "11"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
      if (a.search("/line") != -1) {
        this.$http
          .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
            pageIndex: cr,
            pageCount: "4",
            id: "12"
          })
          .then(res => {
            this.dt = res.data.Data;
            this.total = res.data.total;
          });
      }
    }
  }
};
</script>
<style scoped>
.content {
  padding-left: 0;
  padding-right: 0;
}
.curriculum-item .el-col:nth-of-type(1) {
  height: 121px;
  overflow-y: hidden;
  margin-bottom: 8px;
}
.title-bg {
  background: url("../assets/images/title_bg.png");
  background-size: 100% 100%;
  width: 123px;
  height: 26px;
  color: white;
  text-align: start;
  line-height: 26px;
}
.title-bg span {
  margin-left: 16px;
}
.title-mr {
  line-height: 34px;
}
.title-mr span {
  float: right;
}
.curriculum-item {
  margin-bottom: 10px;
}
.curriculum-item:nth-child(odd) {
  padding-right: 5px;
}
.curriculum-item:nth-child(even) {
  padding-left: 5px;
}
.curriculum .el-col .el-col img {
  width: 100%;
}
.curriculum .el-col .el-col {
  font-size: 12px;
  text-align: start;
}
.curriculum-item .el-col:nth-of-type(2) {
  height: 34px;
  overflow-y: hidden;
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
