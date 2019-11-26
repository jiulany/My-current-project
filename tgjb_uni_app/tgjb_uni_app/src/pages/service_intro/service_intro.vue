<template>
  <view class="span24 servicect">
      <view class="span24 servicect-tt">维修内容</view>
      <view class="span24 servicect-nr">
        <view class="span24">
          <view class="span5 servicect-bt-l"><view></view></view>
          <view class="span14 servicect-bt">{{obj_name}}<span style="font-size:22rpx;color:rgba(102,102,102,1);">{{jianjie&&'('+jianjie+')'}}</span></view>
          <view class="span5 servicect-bt-r"><view></view></view>
        </view>
      </view>
      <view class="span24 servicect-tt">服务介绍</view>
      <view class="span24 servicect-js">
        <view class="span24 servicect-js-it">
           <view class="span2 servicect-qbiao"></view>
           <view class="span22 servicect-js-ms">商家将会在你下单30分钟内确认是否接单
</view>
        </view>
        <view class="span24 servicect-js-it">
           <view class="span2 servicect-qbiao"></view>
           <view class="span22 servicect-js-ms">维修后请业主验收合格，服务人员方可离开
</view>
        </view>
        <view class="span24 servicect-js-it">
           <view class="span2 servicect-qbiao"></view>
           <view class="span22 servicect-js-ms">如有增项产生费用，保洁（维修）人员会及时和公司联系后才能向业主收取费用，并开出收据</view>
        </view>
      </view>
      <view class="span24 servicect-ck">
        <view class="span12 servicect-ck-tt">参考价格</view>
        <view class="span12 servicect-ck-jg">{{sales_volume}}￥</view>
      </view>
      <view class="span24 servicect-tt">服务流程</view>
      <view class="span24 servicect-lc">
        <view class="span3 servicect-liuc">下单</view>
        <view class="span3 servicect-liuc-ico"><span></span><span></span><span></span></view>
        <view class="span4 servicect-liuc">预约时间</view>
        <view class="span3 servicect-liuc-ico"><span></span><span></span><span></span></view>
        <view class="span4 servicect-liuc">上门服务</view>
        <view class="span3 servicect-liuc-ico"><span></span><span></span><span></span></view>
        <view class="span4 servicect-liuc">完成订单</view>
      </view>
      <view class="span24 servicect-tt">服务保障</view>
      <view class="span24 servicect-bz">
        <view class="span5 servicect-bz-it">
          <view class="span24 servicect-bz-ico"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jisushangmen.png'></image></view>
          <view class="span24 servicect-bz-name">急速上门</view>
        </view>
        <view class="span5 servicect-bz-it">
          <view class="span24 servicect-bz-ico"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_tuikuan.png'></image></view>
          <view class="span24 servicect-bz-name">及时退款</view>
        </view>
        <view class="span5 servicect-bz-it">
          <view class="span24 servicect-bz-ico"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jiage.png'></image></view>
          <view class="span24 servicect-bz-name">价格透明</view>
        </view>
        <view class="span5 servicect-bz-it">
          <view class="span24 servicect-bz-ico"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_yongxinfuwu.png'></image></view>
          <view class="span24 servicect-bz-name">用心服务</view>
        </view>
      </view>
      <view class="span24 servicect-yy">
        <view @tap="toAppointment">立即预约</view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sales_volume:null,
      obj_name:'',
      jianjie:''
    };
  },
  methods: {
    toAppointment(){
      uni.navigateTo({url: '/pages/service_appointment/service_appointment'});
    }
  },
  components: {},
  onLoad(opt) {
    this.$http({ url: `api/service/serviceInfo/${opt.id}` ,data:{
      }}).then(res => {
        uni.setStorageSync('sku_id', res.data.sku[0].id);
        uni.setNavigationBarTitle({
    title: res.data.spu_name
});
        this.obj_name=res.data.spu_name
        this.jianjie=res.data.brief_introduction
        this.sales_volume=res.data.sku[0].price
          })
          .catch(res => {});
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
.servicect{
  padding-bottom: 176rpx
}
.servicect-tt{
    padding: 27rpx 0 27rpx 27rpx;font-size:28rpx;
    color:rgba(51,51,51,1);
    font-size: 28rpx
}
.servicect-nr{
  padding: 30rpx 58rpx;
  background: white;
  margin: 0 27rpx 0 rpx 27rpx;
  border-radius:10rpx;
  justify-content: space-between
}
.servicect-nrico {
  align-items: center;
}
.servicect-nrico image{
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx
}
.servicect-nrico-fenge{
align-items: center;
}
.servicect-nrico-fenge view{
height:50rpx;
border:1rpx solid rgba(156,156,156,1);
}
.servicect-nrico-rg{
  align-items: center;
  margin-left: 80rpx 
  }
  .servicect-nrico-rg  image{
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx
}
.servicect-qbiao{
  width:12rpx;
height:12rpx;
background:rgba(253,208,0,1);
border-radius:50%;
}
.servicect-js-it{
  align-items: center
}
.servicect-js-ms{
  color:  #AD6601;
  margin-left: 19rpx
}
.servicect-js{
  padding: 34rpx 34rpx 34rpx 47rpx;
  background: white
}
.servicect-ck{
  margin-top: 27rpx;
height:79rpx;
background:rgba(255,255,255,1);
padding: 0 27rpx
}
.servicect-ck-tt{
  align-items: center;
  font-size: 28rpx
}
.servicect-ck-jg{
  align-items: center;
  justify-content: flex-end;
  font-size: 30rpx;
  color: #FF2E2E
}
.servicect-liuc-ico span{
  width:8rpx;
height:8rpx;
background:rgba(253,208,0,1);
opacity:0.3;
border-radius:50%;
margin: 0 9rpx
}
.servicect-liuc-ico span:nth-of-type(2){
 background:rgba(253,208,0,1);
 opacity: 0.5
}
.servicect-liuc-ico span:nth-of-type(3){
  background:rgba(253,208,0,1);
 opacity: 1
}
.servicect-liuc-ico {
align-items: center
}
.servicect-liuc{
  font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.servicect-lc{
  padding: 35rpx 25rpx;
  background: white
}
.servicect-bz{
  justify-content: space-between;
  background: white;
  padding: 14rpx 57rpx 16rpx 57rpx
}
.servicect-bz-ico image{
  height: 68rpx;
  width: 68rpx
}
.servicect-bz-ico{
  justify-content: center;
  margin-bottom:10rpx 
}
.servicect-bz-name{
  justify-content: center ;
  color: #AD6601
}
.servicect-yy{
  justify-content: center;
  margin-top: 95rpx
}
.servicect-yy view{
  width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37px;
text-align: center;
line-height: 73rpx;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);
}
.servicect-bt{
  align-items: center;
  justify-content: center
}
.servicect-bt-l{
  align-items: center;
  justify-content: center
}
.servicect-bt-l view{
  width:100%;
height:1rpx;
border-bottom:2rpx solid rgba(233,233,233,1);
}
.servicect-bt-r{
  align-items: center;
  justify-content: center
}
.servicect-bt-r view{
  width:100%;
height:1rpx;
border-bottom:2rpx solid rgba(233,233,233,1);
}
.servicect-bt span{
  margin-left: 20rpx
}
</style>
