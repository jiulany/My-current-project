<template>
  <view class="span24 myinvoicedt">
      <view class="span24 myinvoicedt-hist">
          <view class="span20 myinvoicedt-tt">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_lishi.png'></image>开票历史
          </view>
          <view class="span4 myinvoicedt-rtr">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image>
          </view>
      </view>
      <view class="span24">
          <view class="span24">
              <view class="span24 myinvoicedt-date-it" v-for="(item,inx) in list" :key="item.id">
                  <view class="span24 myinvoicedt-date-tm">{{item.date}}</view>
                  <view class="span24">
                      <view class="span18 myinvoicedt-sleico"><image mode="aspectFit" @tap="seleItem(item,inx,$event)" :src="item.sle?'https://imgcdn.tuogouchebao.com/property_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image>{{item.name}}</view>
                      <view class="span6 myinvoicedt-jg">{{item.price}}￥</view>
                  </view>
              </view>
          </view>
      </view>
      <view class="span24 myinvoicedt-fixed">
          <!-- <view class="span12 myinvoicedt-selall">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'></image><span>全选</span>
          </view> -->
          <view class="span24 myinvoicedt-next" @tap="nextAddPep">下一步</view>
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
        list:null,
        sele_item:null,
        prev_inx:null
    };
  },
  methods: {
      nextAddPep(){
          uni.setStorageSync("fp", this.sele_item);
          uni.navigateTo({url: `/pages/my_invoice_pep/my_invoice_pep`});
      },
      seleItem(item,inx,e){
          this.sele_item=item
          let a=this.list
          a[this.prev_inx].sle=false
          a[inx].sle=true
          this.prev_inx=inx
      }
  },
  components: { HMmessages},
  onLoad(opt) {
      this.$http({ url: `api/mine/invoice_list/${opt.type}` ,data:{}}).then(res => {
          let a=res.data
          for(let i in a){
              if(parseInt(i)===0){
                  a[i].sle=true
                  this.sele_item=a[i]
                  this.prev_inx=0
              }else{
                  a[i].sle=false
              }
          }
          this.list=a
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
.myinvoicedt{
    padding-bottom: 200rpx
}
.myinvoicedt-hist{
    padding: 16rpx 25rpx 16rpx 34rpx;
    background: white;
    margin-top: 29rpx;
}
.myinvoicedt-tt{
    align-items: center
}
.myinvoicedt-tt image{
    height: 36rpx;
    width: 36rpx;
    margin-right: 10rpx
}
.myinvoicedt-rtr{
    justify-content: flex-end;
    align-items: center
}
.myinvoicedt-rtr image{
    width:20rpx;
height:36rpx;
}
.myinvoicedt-date-it{
    background: white;
    padding: 15rpx 35rpx 20rpx 35rpx;
    font-size: 30rpx;
    margin-top: 19rpx
}
.myinvoicedt-sleico image{
    width: 31rpx;
    height: 31rpx;
    margin-right: 20rpx
}
.myinvoicedt-date-tm{
font-size:26rpx;
font-weight:500;
color:rgba(153,153,153,1);padding-left: 50rpx
}
.myinvoicedt-jg{
    justify-content: flex-end;
    color:rgba(255,209,0,1);
}
.myinvoicedt-fixed{
    position: fixed;
    bottom: 0;
    height: 96rpx;
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
}
.myinvoicedt-selall{
    background: white;
    justify-content: center;
    align-items: center;
    position: relative
}
.myinvoicedt-selall span{
    color: #FFD100;
font-size:32rpx;
font-weight:500;
color:rgba(255,209,0,1);
}
.myinvoicedt-selall image{
height: 31rpx;
width: 31rpx;
position: absolute;
top:35rpx;
left: 50rpx
}
.myinvoicedt-next{
justify-content: center;
align-items: center;background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
font-size:30rpx;
font-weight:500;
color:rgba(173,102,1,1);
}
</style>
