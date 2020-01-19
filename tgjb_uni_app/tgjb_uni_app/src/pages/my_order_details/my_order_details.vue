<template>
  <view class="span24 orderdt">
    <view class="span24 orderdt-head">
        <view class="span2 orderdt-head-ico">
            <image  src='https://imgcdn.tuogouchebao.com/property_dingdan.png'></image>
        </view>
        <view class="span22">订单信息</view>
    </view>
    <view class="span24 orderdt-line">
          <view class="span8 orderdt-tp">
              <image  :src='order_details.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 orderdt-goods-nm">{{order_details.detail?order_details.detail[0].spu_name:''}}</view>
              <view class="span24 orderdt-goods-ms">备注：{{order_details.remarks?order_details.remarks:''}}</view>
          </view>
          <view class="span8">
        <view class="span24 orderdt-status" style="color:#FF1D1D" v-if="order_details.order_status===1">待付款</view>
        <view class="span24 orderdt-status" style="color:#FF1D1D" v-if="order_details.order_status===2">待派送</view>
        <view class="span24 orderdt-status" style="color:#FF1D1D" v-if="order_details.order_status===3">派送中</view>
        <view class="span24 orderdt-status" style="color:#FDD000" v-if="order_details.order_status===4">订单完成</view>
              <view class="span24 orderdt-goods-jg">￥{{order_details.detail?order_details.detail[0].total_price:''}}</view>
              <view class="span24 orderdt-goods-count">x{{order_details.detail?order_details.detail[0].number:''}}</view>
          </view>
      </view>
    <view class="span24 orderdt-it">
        <view class="span6">订单编号：</view>
        <view class="span18 orderdt-it-val">{{order_details.internal_order_sn?order_details.internal_order_sn:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span6">创建时间：</view>
        <view class="span18 orderdt-it-val">{{order_details.created_at?order_details.created_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span6">付款时间：  </view>
        <view class="span18 orderdt-it-val">{{order_details.payment_at?order_details.payment_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span6">发货时间：  </view>
        <view class="span18 orderdt-it-val">{{order_details.send_at?order_details.send_at:''}}</view>
    </view>
    <view class="span24 orderdt-it">
        <view class="span6">成交时间：  </view>
        <view class="span18 orderdt-it-val">{{order_details.finished_at?order_details.finished_at:''}}</view>
    </view>
   <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该条订单？' @confirm='confirmModel'/>
    <view class="span24 orderdt-it-el" v-if="order_details.order_status===4||order_details.order_status===1">
          <view class="orderdt-goods-del" v-if="order_details.order_status===4||order_details.order_status===1" @tap.stop="openDeleModel(order_details,$event)">{{order_details.order_status===1?'取消订单':''}}{{order_details.order_status===4?'删除订单':''}}</view>
          <view class="orderdt-goods-xq"  v-if="order_details.order_status===1" @tap.stop="toPay(order_details,$event)">付款</view>
    </view>
  </view>
</template>

<script> 
import Modal from '../../components/x-modal/x-modal'
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        order_details:null,
        showModel:false
    };
  },
  methods: {
      openDeleModel(item,e){
          this.showModel=true
      },
      confirmModel(e){
           uni.showLoading({
    title: '加载中'
})
          this.$http({
        url: `api/store/del_order/${this.order_details.id}`,
        method: "POST",
        data: {
        }
      }).then(res => {
          uni.hideLoading();
            this.showModel=false
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            uni.hideLoading();
            this.HMmessages.show(res.msg, { icon: "error" });
        });
      },
      toPay(it,e){
this.$http({ url: `api/store/go_pay/${it.id}`,data:{},method:'post'}).then(res=>{
this.$http({ url: `api/payment/pay`,data:{order_id:it.id},method:'post'}).then(res => {
		
     var a = res.data
          uni.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
            uni.navigateTo({url: `/pages/charge_paysuccess/charge_paysuccess`});
            uni.showToast({
    title: '支付成功',
    duration: 2000,
});
        },
        fail(res) {
          uni.showToast({
    title: '支付失败',
    duration: 2000,
    icon:'none'
});
        }
      })
          
          })
          .catch(res => {
              uni.showToast({
    title: '异常',
    duration: 2000,
    icon:'none'
});
          });
            }).catch(res=>{
uni.showToast({
    title: res.msg,
    duration: 2000,
    icon:'none'
});
            })
      },
  },
  components: {HMmessages,Modal},
  onLoad(opt) {
      uni.showLoading({
    title: '加载中'
});
       this.$http({url:`api/store/my_order/${opt.id}`,data:{
      }}).then(res=>{
            uni.hideLoading();
          this.order_details=res.data
      }).catch(res=>{
            uni.hideLoading();
          this.HMmessages.show(res.msg, { icon: "error" });
      })
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: #F0F0F0FF;
  font-size: 28rpx;
  line-height: 1.8;
  height: 100%;
} 

.orderdt-head{
    padding: 19rpx 33rpx 0 33rpx;font-size: 30rpx;
    background: white;
    margin-top: 23rpx
}
.orderdt-head-ico image{
    width: 35rpx;height: 41rpx;
}
.orderdt-it{
    padding: 30rpx 33rpx 20rpx 33rpx;
    border-bottom: 1px solid rgba(240,240,240,1);
    background: white
}
.orderdt-it:last-child{
    border-bottom:none
}
.orderdt-it-val{
    justify-content: flex-end
}
.orderdt-it-el{
    padding: 30rpx 33rpx 20rpx 33rpx;
    position: fixed;
    background: white;
    bottom: 0;justify-content: flex-end;
    width: 100%
}
.orderdt-goods-del{
width:170rpx;
height:57rpx;
border:1rpx solid rgba(153,153,153,1);
border-radius:29rpx;
color: rgba(153,153,153,1);
text-align: center;
line-height: 57rpx;
margin-left: 25rpx;
font-size:26rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(51,51,51,1);
}
.orderdt-goods-xq{
    width:170rpx;
height:57rpx;
border:1rpx solid rgba(253,208,0,1);
border-radius:29rpx;
color: rgba(253,208,0,1);
text-align: center;
line-height: 57rpx;
margin-left: 25rpx;
font-size:26rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(253,208,0,1);
}

.orderdt-line{
    padding:30rpx 33rpx 20rpx 33rpx;
    margin-bottom: 23rpx;
    background: white
}
.orderdt-tp image{
    width: 217rpx;
    height: 149rpx
}
.orderdt-goods-nm{
align-items: center;
font-size:30rpx;
color:rgba(51,51,51,1);
margin-left: 31rpx
}
.orderdt-goods-ms{
align-items: center;
font-size:28rpx;
font-weight:500;
color:rgba(153,153,153,1);
margin-left: 31rpx
}
.orderdt-goods-count{
align-items: center;
justify-content: flex-end
}
.orderdt-goods-jg{
align-items: center;
justify-content: flex-end;
font-size:28rpx;
font-weight:500;
}
.orderdt-status{
    justify-content: flex-end;color:rgba(253,208,0,1);
}
</style>
