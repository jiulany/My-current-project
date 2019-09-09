<template>
  <view class="span24 integral-dtl">
    <view class="span24 integral-dtl-hd">
      <view class="span8">日期</view>
      <view class="span8">操作</view>
      <view class="span8">积分</view>
    </view>
    <view class="span24 integral-dtl-ct">
      <view class="span24 integral-dtl-it">
        <view class="span8">2016-01-05</view>
        <view class="span8">充值</view>
        <view class="span8">+100</view>
      </view>
      <view class="span24 integral-dtl-it">
        <view class="span8">2016-01-05</view>
        <view class="span8">充值</view>
        <view class="span8">+100</view>
      </view>
    </view>
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

.integral-dtl-hd view {
  background-color: #f5f5f5;
  justify-content: center;
  padding: 15rpx 0;
  font-size: 35rpx;
}
.integral-dtl-it view{
    justify-content: center;
    padding: 15rpx 0;
    border-bottom: 2rpx solid #f5f5f5
}
</style>
