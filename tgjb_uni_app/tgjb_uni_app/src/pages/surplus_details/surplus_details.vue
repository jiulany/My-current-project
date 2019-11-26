<template>
  <view class="span24 surplus">
   <view class="span24 surplus-yue">
       <view class="span24 surplus-yue-number"><span v-if="cur_page===1">￥200</span><span v-if="cur_page===2">200</span></view>
       <view class="span24 surplus-yue-tt" v-if="cur_page===1">账户余额</view>
       <view class="span24 surplus-yue-tt" v-if="cur_page===2">积分剩余</view>
       <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_surplus_beijing.png'></image>
   </view>
   <view class="span24 surplus-tt" v-if="cur_page===1">电卡缴费记录 <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_diankachongzhi.png'></image></view>
   <view class="span24 surplus-tt" v-if="cur_page===2">积分记录 <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jifenjilu.png'></image></view>
   <view class="span24 surplus-ct" v-if="cur_page===1">
       <view class="span24 surplus-ct-it">
           <view class="span8 surplus-ct-it-time">2019-08-12</view>
           <view class="span16 surplus-ct-it-num">缴费100￥</view>
       </view>
       <view class="span24 surplus-ct-it">
           <view class="span8 surplus-ct-it-time">2019-08-12</view>
           <view class="span16 surplus-ct-it-num">缴费100￥</view>
       </view>
   </view>
   <view class="span24 surplus-ct" v-if="cur_page===2">
       <view class="span24 surplus-ct-it">
           <view class="span8 surplus-ct-it-jfct">日期</view>
           <view class="span8 surplus-ct-it-jfct">操作</view>
           <view class="span8 surplus-ct-it-jfct">积分</view>
       </view>
       <view class="span24 surplus-ct-it">
           <view class="span8 surplus-ct-it-jfct">2019-08-12</view>
           <view class="span8 surplus-ct-it-jfct">电费缴费</view>
           <view class="span8 surplus-ct-it-jfct">+100</view>
       </view>
       <view class="span24 surplus-ct-it">
           <view class="span8 surplus-ct-it-jfct">2019-08-12</view>
           <view class="span8 surplus-ct-it-jfct">电费缴费</view>
           <view class="span8 surplus-ct-it-jfct">+100</view>
       </view>
   </view>
  </view>
</template>

<script> 
export default {
  data() {
    return {
      cur_page:null
    };
  },
  methods: {
  },
  components: {},
  onLoad(option) {
    console.log(option)
    this.cur_page=parseInt(option.cur_page)
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
.surplus-yue{
    height: 274rpx;
    position: relative;
}
.surplus-yue image{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.surplus-yue-number{
z-index: 10;font-size:80rpx;
color:rgba(173,102,1,1);
align-items: center;
justify-content: center
}
.surplus-yue-tt{
z-index: 10;
font-size:26rpx;  
color:rgba(173,102,1,1);
align-items: flex-start;
justify-content: center
}
.surplus-tt {
  font-size: 28rpx;
  font-family: PingFang SC;
  padding: 35rpx 0 19rpx 42rpx;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  align-items: center;
}
.surplus-tt image{
    width: 29rpx;
    height: 21rpx;
  margin-left: 20rpx
}
.surplus-ct{
    background: white;
    padding: 0 24rpx
}
.surplus-ct-it{
    padding: 30rpx 29rpx 25rpx 38rpx;
    border-bottom: 1px solid rgba(240,240,240,1);
}
.surplus-ct-it:last-child{
    border-bottom:none
}
.surplus-ct-it-time{
    color: #333333;
}
.surplus-ct-it-num{
    color: #333333;
    justify-content: flex-end;
}
.surplus-ct-it-jfct{
    color: #333333;
    justify-content: center;
}
</style>
