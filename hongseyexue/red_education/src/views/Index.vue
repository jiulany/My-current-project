<template>
  <div @click="closeMenu">
    <Header></Header>
    <Wheel></Wheel>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Wheel from "../components/Wheel.vue"

export default {
  components: {
    Header,
    Wheel
  },
  methods: {
    closeMenu(){  //关闭菜单
      document.getElementById('menu').style.display='none'
      document.getElementById('menu_item_2').style.display='none'
    }
  },
};
</script>

<style>
</style>
