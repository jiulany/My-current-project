<template>
  <el-row class="nwct">
    <el-row>
      <el-col class="nwct-tt" :span="24">
        <h4>{{article_title}}</h4>
      </el-col>
      <el-col class="nwct-it" :span="8">发布时间:{{create_time}}</el-col>
      <el-col class="nwct-it" :span="8">来源:</el-col>
      <el-col class="nwct-it" :span="8">访问:456465</el-col>
    </el-row>
    <div class="hr"></div>
    <el-row class="nwct-ct">
      <div v-html="article_content" class="cont_ct"></div>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      article_title: sessionStorage.getItem("article_title"),
      create_time: sessionStorage.getItem("create_time"),
      title_img:  sessionStorage.getItem("title_img"),
      article_content: '',

    };
  },
  created() {
     this.$http
      .post(process.env.API_HOST+"/index/Classify_List/getArticleDetails", {
        id: sessionStorage.getItem("article_id")
      })
      .then(res => {
        console.log(res)
        this.article_content=res.body.Data.article_content
      });
  },
};
</script>

<style >
.nwct-tt {
  font-family: "黑体";
}
.nwct-it {
  margin-top: 5px;
  font-size: 9px;
  color: #cccccc;
  margin-bottom: 5px;
}
.nwct-ct {
  margin-top: 20px;
}


.nwct-ct p {
  font-size: 12px;
  font-family: "黑体";
  text-align: start;
  font-weight: 500;
  line-height: 18px;
}
.cont_ct img{
  width: 100% !important
}
</style>
