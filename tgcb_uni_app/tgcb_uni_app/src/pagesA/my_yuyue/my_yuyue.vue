<template>
  <view class="my_yuyue">
      <view class="span24 my_yuyue-itm" @tap='toMyYuYueDetails'>
         <view class="span24 my_yuyue0">
             <view class="span18 my_yuyue-ord">预约单号 AB1323456</view>
             <view class="span6 my_yuyue-succ">完成</view>
         </view>
         <view class="span24 my_yuyue1">
             <view class="span18 my_yuyue-time">2019-07-08 11：36</view>
             <view class="span6 my_yuyue-chepai">川A13213</view>
         </view>
         <view class="span24">
         <view class="span24 my_yuyue2">
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
         </view>
     </view>
     <view class="span24 my_yuyue-itm">
         <view class="span24 my_yuyue0">
             <view class="span18 my_yuyue-ord">预约单号 AB1323456</view>
             <view class="span6 my_yuyue-fail">失败<image mode="aspectFit" src='../../static/img/delete.png'></image></view>
         </view>
         <view class="span24 my_yuyue1">
             <view class="span18 my_yuyue-time">2019-07-08 11：36</view>
             <view class="span6 my_yuyue-chepai">川A13213</view>
         </view>
         <view class="span24">
         <view class="span24 my_yuyue2">
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
         </view>
         <view class="span24 my_yuyue3">预约失败原因:已打烊</view>
     </view>
     <view class="span24 my_yuyue-itm">
         <view class="span24 my_yuyue0">
             <view class="span18 my_yuyue-ord">预约单号 AB1323456</view>
             <view class="span6 my_yuyue-succ">成功</view>
         </view>
         <view class="span24 my_yuyue1">
             <view class="span18 my_yuyue-time">2019-07-08 11：36</view>
             <view class="span6 my_yuyue-chepai">川A13213</view>
         </view>
         <view class="span24">
         <view class="span24 my_yuyue2">
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
         </view>
         <view class="span24 my_yuyue3">备注：检查下轮胎</view>
     </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      showSignModel:false
    };
  },
  methods: {
   toMyYuYueDetails(){
       console.log("ss")
       uni.navigateTo({
        url: "/pagesA/my_yuyue_details/my_yuyue_details"
      });
   }
  },
  components: { },
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
.my_yuyue{
    padding-bottom: 200rpx
}
.my_yuyue-itm{
    background: white;
    margin-top: 20rpx;
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.my_yuyue0{
    padding: 15rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-ord{
    font-size: 32rpx
}
.my_yuyue-fail{
    justify-content: flex-end;
    align-items: center;
    color: #F75C3E;
    font-size: 32rpx
}
.my_yuyue-succ{
    justify-content: flex-end;
    align-items: center;
    color: #FCCD00;
    font-size: 32rpx
}
.my_yuyue-fail image{
    width: 27rpx;
    height: 29rpx;
    margin-left: 20rpx;
}
.my_yuyue1{
    padding: 18rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-time{
    font-size: 32rpx
}
.my_yuyue-chepai{
    justify-content: flex-end;
    align-items: center;
    font-size: 32rpx
}
.my_yuyue2{
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
.my_yuyue3{
    padding: 18rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5;
    font-size: 30rpx
}
</style>
