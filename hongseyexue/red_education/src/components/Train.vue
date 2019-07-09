// 培训动态组件
<template>
  <el-row class="content">
    <el-row>
      <el-col :span="12">
        <div class="title-bg">
          <span>培训动态</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-mr">
          <span>
            <router-link to="/train?it_1=>关于培训&it_2=>培训动态">MORE</router-link>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row class="curriculum">
      <el-col
        :span="12"
        class="curriculum-item"
        v-for="(item,index) in tr"
        :key="index"
        @click.native="toNew(tr[index])"
      >
        <el-col :span="24">
          <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
        </el-col>
        <el-col :span="24">
          <div v-html="item.article_content"></div>
        </el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tr: []
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
      this.$router.push("/train/train_content?it_1=>关于培训&it_2=>培训动态");
    }
  },
  created() {
    this.$http
      .post(process.env.API_HOST+"/index/Classify_List/getList", {
        pageIndex: "1",
        pageCount: "4",
        id: "5"
      })
      .then(res => {
        this.tr = res.data.Data;
      });
  }
};
</script>
<style>
.curriculum-item img {
}
.curriculum-item .el-col:nth-of-type(1) {
  overflow-y: hidden;
  height: 136px;
}
</style>
