<template>
  <view class="span24 integral-store">
      <view class="span11 integral-store-it" @tap="tointegralStoreDt">
          <view class="span24 integral-store-t">
              <image mode="aspectFit" src='../../static/img/xichebaoji.png'></image>
          </view>
          <view class="span24 integral-store-ms">汽车玻璃水夏季雨刷车季
通用专用</view>
          <view class="span24">
              <view class="span14 integral-store-nm">玻璃水</view>
              <view class="span10 integral-store-jg">5000积分</view>
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
      tointegralStoreDt(){
          uni.navigateTo({
        url: "/pages/integral_store_dt/integral_store_dt"
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
.integral-store{
    justify-content: space-between;
    padding: 20rpx
}
.integral-store-it{
    background: white;
    width: 48.433333%;
    margin-top: 20rpx;
    padding: 10rpx 15rpx 30rpx 15rpx
}
.integral-store::after{
    content: ''
}
.integral-store-t{
    height: 280rpx;
    margin-bottom: 15rpx
}
.integral-store-t image{
    height: 100%;
}
.integral-store-ms{
height: 100rpx;
line-height: 50rpx
}
.integral-store-jg{
    color: #E41717;
    align-items: flex-end
}
.integral-store-nm{
    font-size:33rpx;
    align-items: flex-end
}
</style>
