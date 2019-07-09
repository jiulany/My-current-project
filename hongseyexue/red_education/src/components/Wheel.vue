// 轮播图
<template>
  <el-carousel :interval="5000" arrow="always" height='140px'>
    <el-carousel-item v-for="item in wheel_image" :key="item">        
      <div class="wheel_img">
        <img :src="'http://yxydht.nonghugo.com'+item" alt>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      wheel_image:[]
    }
  },
  components: {},
  created() {
     this.$http.get('http://yxydht.nonghugo.com/index/Classify_List/getCarouselimgs').then(function(response){
      this.wheel_image= response.data.Data
    })
  },
};
</script>

<style>
.wheel_img{
      height: 100%;
}
.wheel_img img{
    height: 100%;
    width: 100%;
}
</style>
