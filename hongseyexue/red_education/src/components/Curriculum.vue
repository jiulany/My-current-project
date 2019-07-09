// 课程教学组件
<template>
  <el-row class="content">
    <el-row>
      <el-col :span="12">
        <div class="title-bg">
          <span>课程教学</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-mr">
          <span>
            <router-link to="/curriculum?it_1=>课程教学">MORE</router-link>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row class="curriculum">
      <el-col
        :span="12"
        class="curriculum-item"
        v-for="(item,index) in cur"
        :key="index"
        @click.native="toNew(cur[index])"
      >
        <el-col :span="24">
          <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
        </el-col>
        <el-col :span="24">
          <div class="curriculum_cot" v-html="item.article_content"></div>
        </el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      cur: []
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
      this.$router.push("/curriculum/curriculum_content?it_1=>课程教学");
    }
  },
  created() {
    this.$http
      .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
        pageIndex: "1",
        pageCount: "2",
        id: "11"
      })
      .then(res => {
        this.cur = res.data.Data;
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
.curriculum-item {
  margin-bottom: 10px;
}
.curriculum-item:nth-child(odd) {
  padding-right: 5px;
}
.curriculum-item:nth-child(even) {
  padding-left: 5px;
}
.curriculum-item .el-col:nth-of-type(2) {
  height: 34px;
  overflow-y: hidden;
}
.curriculum .el-col .el-col img {
  width: 100%;
}
.curriculum .el-col .el-col {
  font-size: 12px;
  text-align: start;
}
.curriculum .el-col .el-col:nth-of-type(2){
  height: 40px !important;
  line-height: 20px
}
</style>
