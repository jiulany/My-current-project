// 新闻组件
<template>
  <el-row class="content">
    <el-row>
      <el-col :span="12">
        <div class="title-bg">
          <span>新闻中心</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-mr">
          <span>
            <router-link to="/new_center?it_1=>新闻政策&it_2=>新闻中心">MORE</router-link>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="news-item"
      v-for="(item,index) in news"
      :key="index"
      @click.native="toNew(news[index])"
    >
      <el-col :span="10">
        <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
      </el-col>
      <el-col class="news-text" :span="14">
        <el-col :span="24" class="news-title">{{item.article_title}}</el-col>
        <el-col :span="24" class="news-time">{{item.create_time}}</el-col>
        <el-col :span="24" class="news-cont" v-html='item.article_content'></el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      news: []
    };
  },
  methods: {
    toNew(dt) {
      //   this.$store.dispatch("changeContent",dt);
      sessionStorage.setItem("article_title", dt.article_title);
      sessionStorage.setItem("create_time", dt.create_time);
      sessionStorage.setItem("title_img", dt.title_img);
      sessionStorage.setItem("article_content", dt.article_content);
      sessionStorage.setItem("article_id", dt.id);
      this.$router.push("/new_list/new_content?it_1=>新闻政策&it_2=>新闻中心");
    }
  },
  created() {
    this.$http
      .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
        pageIndex: "1",
        pageCount: "2",
        id: "7"
      })
      .then(res => {
        console.log(res)
        this.news = res.data.Data;
      });
  }
};
</script>
<style>
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
.news-item {
  height: 94px;
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
  line-height: 20px;
  height: 20px  !important;
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
.news-cont {
  font-size: 14px !important;
  height: auto !important;
  color: #888888;
  position: absolute;
  bottom: 0px;
   line-height: 20px !important;
   height: 40px !important;
  overflow-y: hidden;
}
</style>
