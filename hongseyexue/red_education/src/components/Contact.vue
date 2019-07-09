<template>
  <el-row class="content">
    <el-row>
      <el-col :span="12">
        <div class="title-bg">
          <span>联系我们</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-mr">
          <span>
            <router-link to="/contact?it_1=>联系我们">MORE</router-link>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row class="contact" v-for="(item,index) in tr" :key='index'>
      <el-col :span="12">
        <img :src="'http://yxydht.nonghugo.com'+item.title_img" alt>
      </el-col>
      <el-col :span="12" class="contact-cont">
        <el-col :span="24">网址：yxyd.nonghugo.com</el-col>
        <el-col :span="24">联系人：ada</el-col>
        <el-col :span="24">电话：18380806714</el-col>
        <el-col :span="24">邮箱：402259665@qq.com</el-col>
        <el-col :span="24">地址：ads</el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tr:[]
    }
  },
  created() {
     this.$http
      .post(process.env.API_HOST+"/index.php/index/Classify_List/getList", {
        pageIndex: "1",
        pageCount: "4",
        id: "10"
      })
      .then(res => {
        this.tr = res.data.Data;
      });
  },
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
.contact img {
  width: 100%;
  min-height: 89px
}
.contact-cont {
  padding-left: 10px;
}
.contact-cont .el-col {
  margin-bottom: 2px;
  text-align: start;
  font-size: 12px;
}
</style>
