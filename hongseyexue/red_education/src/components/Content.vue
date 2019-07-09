<template>
 <div>
    <News></News>
    <Curriculum></Curriculum>
    <Train></Train>
    <Contact></Contact>
</div>
</template>

<script>
import News from "./News.vue";
import Curriculum from "./Curriculum.vue";
import Train from "./Train.vue";
import Contact from "./Contact.vue";
export default {
  components: {
    Content,
    News,
    Curriculum,
    Train,
    Contact
  }
};
</script>

<style scoped>
</style>
