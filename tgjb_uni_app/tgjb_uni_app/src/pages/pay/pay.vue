<template>
  <view class="span24 pay">
    <view class="span24 pay-sty">
      <view class="span12" @tap="switchTab(1,$event)" :style="cur===1?'background:#FDD000':'background:#FFFFFF'">待缴费</view>
      <view class="span12" @tap="switchTab(2,$event)" :style="cur===2?'background:#FDD000':'background:#FFFFFF'">已缴费</view>
    </view>
    <view class="span24" v-for="(item,key) in  list" :key="key">
    <view class="span24"   @tap='toPayDetails(item.data[0],$event)'>
        <view class="span24 pay-wait-it">
            <view class="span18">
                <view class="span24 pay-wait-xq">{{key}} (脱狗小区）</view>
                <view class="span24 pay-wait-jg">本期费用合计 <span style="color:#FF2E2E;margin-left:12rpx">{{item.price}}￥</span></view>
            </view>
            <view class="span6 pay-wait-ctr-box">
                <view class="pay-wait-ctr" v-if="item.data[0].status===0">未结清</view>
                <view class="pay-end-ctr" v-if="item.data[0].status===1">已结清</view>
            </view>
        </view>
    </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        cur:1,
        list:null
    };
  },
  methods: {
    switchTab(val){
      this.cur=val
    },
    toPayDetails(it,e){
      uni.navigateTo({url: `/pages/pay_details/pay_details?status=${it.status}&month=${it.month}&year=${it.year}`});
    },
    reloadList(status){
      this.$http({ url: `api/mine/payment` ,data:{
        status:status
      }}).then(res => { 
        this.list=res.data
          })
          .catch(res => {});
    }
  },
  watch: {
    cur(val){
      if(val===1){
        this.reloadList(0)
      }else{
        this.reloadList(1)
      }
    }
  },
  components: {},
  onLoad() {},
  onShow() {
    this.cur=1
    this.reloadList(0)
  },
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.pay{
  padding-bottom: 200rpx
}
.pay-sty {
  height: 98rpx;
}
.pay-sty view {
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  color: rgba(71, 71, 71, 1);
}
.pay-wait-it{
    padding: 45rpx 35rpx 52rpx 34rpx ;
    background: white;
    margin-top: 25rpx
}
.pay-wait-ctr-box{
    align-items: center
}
.pay-wait-xq{
font-size:24rpx;
font-weight:400;
color:rgba(71,71,71,1);
line-height:48rpx;
}
.pay-wait-jg{
font-size:30rpx;
color:rgba(71,71,71,1);
line-height:48rpx;
}
.pay-wait-ctr{
width:174rpx;
height:58rpx;
background:rgba(245,245,245,1);
text-align: center;
line-height: 58rpx;
font-size:30rpx;
font-weight:500;
color:rgba(153,153,153,1);
border-radius:29px;
}
.pay-end-ctr{
width:174rpx;
height:58rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
text-align: center;
line-height: 58rpx;
font-size:30rpx;
font-weight:500;
color:#AD6601;
border-radius:29px;
}
</style>
