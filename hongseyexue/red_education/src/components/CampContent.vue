<template>
  <el-row class="content_item">
    <Crumbs :crumb="crumb"></Crumbs>
    <el-row class="nwct" v-for="(item,index) in ct" :key='index'>
      <el-row>
        <el-col class="nwct-tt" :span="24"></el-col>
      </el-row>
      <el-row class="nwct-ct">
        <img v-if='item.title_img' :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
        <p v-html="item.article_content"></p>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Crumbs from "./Crumbs.vue";

export default {
  data() {
    return {
      ct:[]
    }
  },
  created() {
     this.$http
      .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
        pageIndex: "1",
        pageCount: "4",
        id: "9"
      })
      .then(res => {
        this.ct = res.data.Data;
        console.log(JSON.stringify(this.ct) )
      });
  },
  components: {
    Crumbs
  },
  props: ["crumb"]
};
</script>

<style >
.content_item {
  padding: 10px 20px;
}
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
.nwct-ct img {
  max-width: 70%;
  margin-bottom: 10px;
}
.nwct-ct p {
  font-size: 12px;
  font-family: "黑体";
  text-align: start;
  font-weight: 500;
  line-height: 18px;
}
</style>
