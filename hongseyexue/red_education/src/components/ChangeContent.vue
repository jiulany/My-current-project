<template>
  <el-row class="content_item">
    <Crumbs :crumb="crumb"></Crumbs>
    <router-view></router-view>
  </el-row>
</template>

<script>
import Crumbs from "./Crumbs.vue";

export default {
  components: {
    Crumbs
  },
  props: ["crumb"],
  created() {}
};
</script>

<style >
.content_item {
  padding: 10px 20px;
}
</style>
