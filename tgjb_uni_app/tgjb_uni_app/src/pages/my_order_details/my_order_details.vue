<template>
  <view class="span24 orderdt">
    <view class="span24 orderdt-head">
        <view class="span2 orderdt-head-ico">
            <image  src='https://imgcdn.tuogouchebao.com/property_dingdan.png'></image>
        </view>
        <view class="span22">订单信息</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span5">订单编号：</view>
        <view class="span19 orderdt-it-val">{{order_details.internal_order_sn?order_details.internal_order_sn:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span5">创建时间：</view>
        <view class="span19 orderdt-it-val">{{order_details.created_at?order_details.created_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span5">付款时间：  </view>
        <view class="span19 orderdt-it-val">{{order_details.payment_at?order_details.payment_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span5">发货时间：  </view>
        <view class="span19 orderdt-it-val">{{order_details.send_at?order_details.send_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span5">成交时间：  </view>
        <view class="span19 orderdt-it-val">{{order_details.finished_at?order_details.finished_at:''}}</view>
    </view>
    
   <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script> 
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        order_details:null
    };
  },
  methods: {
  },
  components: {HMmessages},
  onLoad(opt) {
       this.$http({url:`api/store/my_order/${opt.id}`,data:{
      }}).then(res=>{
          this.order_details=res.data
      }).catch(res=>{
          this.HMmessages.show(res.msg, { icon: "error" });
      })
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: white;
  font-size: 28rpx;
  line-height: 1.8;
  height: 100%;
} 
.orderdt{
    padding: 0 33rpx
}
.orderdt-head{
    padding: 19rpx 0 0 0;font-size: 30rpx
}
.orderdt-head-ico image{
    width: 35rpx;height: 41rpx;
}
.orderdt-it{
    padding: 30rpx 0 20rpx 0;
    border-bottom: 1px solid rgba(240,240,240,1);
}
.orderdt-it:last-child{
    border-bottom:none
}
.orderdt-it-val{
    justify-content: flex-end
}
</style>
