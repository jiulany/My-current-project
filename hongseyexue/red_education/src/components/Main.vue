<template>
  <el-main>
    <Camp></Camp>
    <News></News>
    <Curriculum></Curriculum>
    <Train></Train>
    <Contact></Contact>
  </el-main>
</template>

<script>
import Camp from "./Camp.vue";
import News from "./News.vue";
import Curriculum from "./Curriculum.vue";
import Train from "./Train.vue";
import Contact from "./Contact.vue";
export default {
  components: {
    Camp,
    News,
    Curriculum,
    Train,
    Contact
  },
  created() {
 
  },
  methods: {
    closeMenu() {
      console.log(this.$refs.menu.style.display);
      this.$refs.menu.style.display = "none";
    }
  }
};
</script>

<style scoped>
.el-main {
  padding: 0;
  margin-bottom: 50px;
}
</style>
