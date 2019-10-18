<template>
  <view class="span24 integral">
    <view class="span24 integral-it" @tap='toIntegralDetails'>
      <view class="span22 integral-ms">积分明细</view>
      <view class="span2  integral-it-rico">
        <view class="iconfont icon-xiayibu"></view>
      </view>
    </view>
    <view class="span24 integral-it" @tap='toIntegralStore'>
      <view class="span22 integral-ms">积分兑换</view>
      <view class="span2  integral-it-rico">
        <view class="iconfont icon-xiayibu"></view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toIntegralDetails(){
      uni.navigateTo({
        url: "/pages/integral_details/integral_details"
      });
    },
    toIntegralStore(){
      uni.navigateTo({
        url: "/pages/integral_store/integral_store"
      });
    }
  },
  components: {},
  onLoad: function() {},
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.integral{
  margin-top: 15rpx
}
.integral-it{
  align-items: center;
  padding: 30rpx 27rpx;
  background: white;
  margin-bottom: 2rpx;
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.integral-ms{
  font-size: 32rpx
}
.integral-it-rico image{
  height: 30rpx;
}
</style>
