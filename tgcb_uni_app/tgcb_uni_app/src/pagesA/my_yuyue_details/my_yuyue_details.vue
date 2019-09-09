<template>
  <view class="my-yuyue-details">
    <view class="my-yuyue-details0 span24">
      <view class="span24 my-yuyue-details01">
        <view class="span12 my-yuyue-detail-nm">姓名：小四</view>
        <view class="span12 my-yuyue-detail-ph">电话：13688156532</view>
      </view>
      <view class="span24 my-yuyue-details02">
        <view class="span24 my-yuyue-details-cp">车牌号：川A12312</view>
        <view class="span24 my-yuyue-details-time">创建时间：2019-07-08 14：50：20</view>
      </view>
    </view>
    <view class="my-yuyue-details1 span24">
        <view class="span24 my-yuyue-details11">门店信息</view>
        <view class="span24 my-yuyue-details12">2019-07-08 10：00</view>
        <view class="span24 my-yuyue-details13">成都脱狗车宝浅水半岛</view>
    </view>
    <view class="my-yuyue-details0 span24">
      <view class="span24 my-yuyue-details01">
        <view class="span12 my-yuyue-detail-nm">预约单号 AB1321245</view>
      </view>
      <view class="span24 my-yuyue-details02">
             <view class="span7 my_yuyue-tp">
                 <image mode="aspectFit" src='../../static/img/xichebaoji.png'></image>
             </view>
             <view class="span11">
                 <view class="span24 my_yuyue-name">高效水蜡清洗全车</view>
                 <view class="span24 my_yuyue-funame">高效水蜡清洗全车</view>
             </view>
             <view class="span6 my_yuyue-jg">
                 ￥30.00
             </view>
       </view>
       <view class="span24 my-yuyue-details03">备注：检查下轮胎</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      showSignModel: false
    };
  },
  methods: {},
  components: {},
  onLoad: function() {},
  onShow: function() {
    uni.hideTabBar();
  },
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
.my-yuyue-details0 {
  background: white;
  box-shadow: 0px 2px 5px 0px rgba(51, 51, 51, 0.06);
  margin-top: 22rpx;
}
.my-yuyue-details01 {
  padding: 24rpx 25rpx;
  border-bottom: 2rpx solid #f5f5f5;
}
.my-yuyue-detail-nm {
  font-size: 32rpx;
}
.my-yuyue-detail-ph {
  font-size: 32rpx;
  justify-content: flex-end;
}
.my-yuyue-details02 {
  padding: 20rpx 25rpx;
}
.my-yuyue-details-cp {
  font-size: 32rpx;
}
.my-yuyue-details-time {
  font-size: 32rpx;
}
.my-yuyue-details1{
  background: white;
  box-shadow: 0px 2px 5px 0px rgba(51, 51, 51, 0.06);
  margin-top: 22rpx;
  padding: 24rpx 25rpx
}
.my-yuyue-details11{
    font-size: 32rpx
}
.my-yuyue-details12{
    font-size: 32rpx
}
.my-yuyue-details13{
    font-size: 32rpx
}
.my-yuyue-details02{
    padding: 33rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-tp image{
    height: 149rpx;
    max-width: 200rpx;
}
.my_yuyue-name{
    font-size:30rpx;
    align-items: center
}
.my_yuyue-funame{
    font-size:24rpx;
    align-items: flex-start
}
.my_yuyue-jg{
    align-items: center;
    font-size: 30rpx;
    justify-content: flex-end;
    color: #F75C3E
}
.my-yuyue-details03{
    padding: 18rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5;
    font-size: 30rpx
}
</style>
