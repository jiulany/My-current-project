<template>
  <view class="span24 integral-store-dt">
    <view class="span24 integral-store-dt-tupian">
        <image mode="aspectFit" src='../../static/img/xichebaoji.png'></image>
    </view>
    <view class="span24 integral-store-dt-tt">
        <view class="span16 integral-store-dt-nm">玻璃水</view>
        <view class="span8 integral-store-dt-jg">5000积分</view>
    </view>
    <view class="span24 integral-store-dt-jj">商品简介</view>
    <view class="span24 integral-store-dt-neirong">
        汽车挡风玻璃清洗液的俗称。属于汽车使用中的易耗品。优质的汽车挡风玻璃水主要由水、酒精、乙二醇、缓蚀剂及多种表面活性剂组成。汽车挡风玻璃水俗称玻璃水。当车前挡风玻璃透明度下降的时候喷一喷玻璃水，就能够给你一个明朗清晰的视野。特别是在夜间行车时，玻璃上的灰尘会散射光线，这时
候就需要喷一喷玻璃水，让前挡风玻璃保持在最佳透明状态。
    </view>
    <view class="span24 integral-store-dt-duihuan">立即兑换</view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  onLoad: function() {},
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
page {
  background-color: white;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.integral-store-dt-tupian{
    height:400rpx;
    justify-content: center
}
.integral-store-dt-tupian image{
    height:100%;
}
.integral-store-dt-tt{
    border-top: 2rpx solid #f5f5f5;
    border-bottom: 2rpx solid #f5f5f5;
    padding: 30rpx 20rpx;
    margin-top: 20rpx;
}
.integral-store-dt-nm{
    font-size: 46rpx !important
}
.integral-store-dt-jg{
    font-size: 36rpx !important;
    align-items: center;
    color: #E41717
}
.integral-store-dt-jj{
    font-size: 30rpx;
    padding: 24rpx 20rpx;
}
.integral-store-dt-neirong{
    font-size: 28rpx;
    padding: 0 20rpx;
    text-indent:2em
}
.integral-store-dt-duihuan{
    position: fixed;
    bottom: 0;
    background: #FBD731;
    height: 98rpx;
    justify-content: center;
    font-size: 36rpx;
    align-items: center
}
</style>
