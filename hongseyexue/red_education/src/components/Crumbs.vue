<template>
  <el-row>
    <el-col :span="24" class="crumbs">
      当前位置:&nbsp;
      <router-link to="/">首页</router-link>
      {{crumb.it_1}} {{crumb.it_2}}
    </el-col>
    <el-col :span="24">
      <div class="hr"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["crumb"],
  created() {}
};
</script>

<style>
.crumbs {
  font-size: 9px;
  text-align: start;
  margin-bottom: 10px;
}
.hr {
  width: 100%;
  height: 0;
  border: 0.5px solid #eaeaea;
  margin-bottom: 10px;
}
</style>
