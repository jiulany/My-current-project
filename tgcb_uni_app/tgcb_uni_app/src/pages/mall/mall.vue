<template>
  <view class="mall">
    <mall></mall>
   <tab-bar address="3"></tab-bar>
  </view>
</template>
<script>
import tabBar from "../../components/tab-bar/tabBar.vue";
import mall from "../../components/mall/mall"
import { uniSwiperDot } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      
    };
  },
  methods: {
   change(e) {
				this.current = e.detail.current;
			},
  },
  components: { tabBar,mall,uniSwiperDot},
  onLoad: function() {},
  onShow: function() {
  },
  onHide: function() {}
};
</script>

<style>

</style>
