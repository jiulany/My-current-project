<template>
  <view class="span24 myinvoice">
      <view class="span24 myinvoice-hist" @tap="toHistory">
          <view class="span20 myinvoice-tt">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_lishi.png' ></image>开票历史
          </view>
          <view class="span4 myinvoice-rtr">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image>
          </view>
      </view>
      <view class="span24" v-for="(item,inx) in invo_list" :key="inx">
          <view class="span24 myinvoice-hd">
          {{item.title}}<image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_fapiao.png'></image>
      </view>
      <view class="span24 myinvoice-ct">
          <view class="span24 myinvoice-ct-it" v-for="(it,ix) in item.list" :key="ix" @tap="toDetails(it,item,$event)">
              <view class="span12 myinvoice-ct-nm">{{it.title}}</view>
              <view class="span12 myinvoice-ct-rt"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
          </view>
      </view>
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
        invo_list:null
    };
  },
  methods: {
      toHistory(){
          uni.navigateTo({url: `/pages/my_invoice_hsty/my_invoice_hsty`});
      },
      toDetails(it,item,e){
          console.log(it)
          uni.navigateTo({url: `/pages/my_invoice_details/my_invoice_details?type=${it.type}&invoices_type=${item.invoices_type}`});
      }
  },
  components: { HMmessages},
  onLoad() {
      this.$http({ url: `api/mine/invoice_lists` ,data:{}}).then(res => {
          this.invo_list=res.data
          })
          .catch(res => {
              this.HMmessages.show(res.msg, { icon: "error" });
          });
  },
  onShow() {
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
.myinvoice-hist{
    padding: 16rpx 25rpx 16rpx 34rpx;
    background: white;
    margin-top: 29rpx;
}
.myinvoice-tt{
    align-items: center
}
.myinvoice-tt image{
    height: 36rpx;
    width: 36rpx;
    margin-right: 10rpx
}
.myinvoice-rtr{
    justify-content: flex-end;
    align-items: center
}
.myinvoice-rtr image{
    width:20rpx;
height:36rpx;
}

.myinvoice-hd{
align-items: center;
padding: 35rpx 0 21rpx 32rpx
}
.myinvoice-hd image{
    width: 38rpx;
    height: 32rpx;
    margin-left: 8rpx
}
.myinvoice-ct{
    background: white
}
.myinvoice-ct-it{
    padding: 22rpx 27rpx 30rpx 29rpx;
    border-bottom: 1rpx solid rgba(240,240,240,1)
}
.myinvoice-ct-it:last-child{
    border-bottom: none
}
.myinvoice-ct-nm{
font-size:30rpx;
}
.myinvoice-ct-rt{
    align-items: center;
    justify-content: flex-end
}
.myinvoice-ct-rt image{
    width:16rpx;
height:28rpx;
}
</style>
