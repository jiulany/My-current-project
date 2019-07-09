<template>
  <el-row class="content_item">
    <Crumbs :crumb="crumb"></Crumbs>
    <el-row class="nwct">
      <el-row>
        <el-col class="nwct-tt" :span="24"></el-col>
      </el-row>
      <el-row class="nwct-ct">
          <el-col :span="24"><img src="../assets/images/contact_adr.png" alt=""></el-col>
        <el-col :span="24">网址：yxyd.nonghugo.com</el-col>
        <el-col :span="24">联系人：ada</el-col>
        <el-col :span="24">电话：18380806714</el-col>
        <el-col :span="24">邮箱：402259665@qq.com</el-col>
        <el-col :span="24">地址：ads</el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Crumbs from "./Crumbs.vue";

export default {
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
  margin-bottom: 10px;
}
.nwct-ct .el-col {
  font-size: 14px;
  text-align: start;
  font-weight: 500;
  line-height: 18px;
  padding-left: 30px;
  padding-right: 30px
}
.nwct-ct .el-col img{
    width: 100%
}
</style>
