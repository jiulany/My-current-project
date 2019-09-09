<template>
  <view class="span24 addresstc">
      <view class="span24 addresstc-it">
          <view class="span6 addresstc-key">所在地区</view>
          <view class="span18 addresstc-val"> 热好热呵呵</view>
      </view>
      <view class="span24 addresstc-it">
          <view class="span6 addresstc-key">详细地址</view>
          <view class="span18 addresstc-val">得很热乎热乎</view>
      </view>
      <view class="span24 addresstc-it">
          <view class="span6 addresstc-key">小区名字</view>
          <view class="span18 addresstc-val">更更稳固</view>
      </view>
      <view class="span24 addresstc-it">
          <view class="span6 addresstc-key">单元号</view>
          <view class="span18 addresstc-val">1-1-1</view>
      </view>
      <view class="span24 addresstc-it">
          <view class="span6 addresstc-key">地面/附楼</view>
          <view class="span18 addresstc-val">四川省成都市问我个人化规为分为风格</view>
      </view>
      <view class="span24 addresstc-it">
          <view class="span10 addresstc-key">车位号</view>
          <view class="span14 addresstc-val">
              A156
          </view>
      </view>
      <view class="span24 addresstc-save">保存</view>
  </view>
</template>

<script> 
export default {
  data() {
    return {
        cur_hd:1
    };
  },
  methods: {
  },
  components: {},
  onLoad() {
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.addresstc{
    background: white;
    margin-top: 20rpx
}
.addresstc-it{
    padding: 30rpx 28rpx 30rpx 21rpx ;
    border-bottom:1rpx solid rgba(240,240,240,1);
}
.addresstc-key{
    font-size: 30rpx
}
.addresstc-val{
    font-size: 30rpx;
    justify-content: flex-end
}
.addresstc-val radio-group{
    text-align: end
}
.addresstc-save{
    position: fixed;
    bottom: 0;
height:98rpx;
background:rgba(253,208,0,1);
font-size:36rpx;
font-weight:bold;
color:rgba(71,71,71,1);
line-height:48rpx;
align-items: center;
justify-content: center
}
</style>
