<template>
  <view class="span24 repair">
     <view class="span24 repair-it">
         <view class="span24">
             <view class="span3 repair-it-ico">
                 <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
             </view>
             <view class="span21 repair-it-xiaoqu">脱狗小区</view>
         </view>
         <view class="span24 repair-it-ct">
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修日期：</view>
                 <view class="span18 repair-it-val">2019-02-12</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修项目：</view>
                 <view class="span18 repair-it-val">弱电维修</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修价格：</view>
                 <view class="span18 repair-it-val">100￥</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修地址：</view>
                 <view class="span18 repair-it-val">脱狗小区九栋905</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修状态：</view>
                 <view class="span18 repair-it-val">已完成</view>
             </view>
         </view>
     </view>
     <view class="span24 repair-it">
         <view class="span24">
             <view class="span3 repair-it-ico">
                 <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
             </view>
             <view class="span19 repair-it-xiaoqu">脱狗小区</view>
         </view>
         <view class="span24 repair-it-ct">
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修日期：</view>
                 <view class="span18 repair-it-val">2019-02-12</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修项目：</view>
                 <view class="span18 repair-it-val">弱电维修</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修价格：</view>
                 <view class="span18 repair-it-val">100￥</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修地址：</view>
                 <view class="span18 repair-it-val">脱狗小区九栋905</view>
             </view>
             <view class="span24 repair-it-ct-it">
                 <view class="span6">报修状态：</view>
                 <view class="span18 repair-it-val">已完成</view>
             </view>
         </view>
     </view>
  </view>
</template>

<script> 
export default {
  data() {
    return { 
    };
  },
  methods: {
  },
  components: {},
  onLoad() {},
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
.repair{
    padding-bottom: 200rpx
}
.repair-it-ico image{
width: 49rpx;
height: 49rpx;
}
.repair-it-xiaoqu{
    color: #FDD000;
}
.repair-it{
    padding: 22rpx 24rpx 44rpx 24rpx
}
.repair-it-ct{
    background:rgba(255,255,255,1);
border-radius:10rpx;
margin-top: 10rpx
}
.repair-it-ct-it{
    padding: 20rpx 32rpx;
    border-bottom:1px solid rgba(240,240,240,1) 
}
.repair-it-ct-it:last-child{
    border-bottom:none
}
.repair-it-val{
    justify-content: flex-end
}
</style>
