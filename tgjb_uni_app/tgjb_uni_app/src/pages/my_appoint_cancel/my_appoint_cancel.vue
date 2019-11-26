<template>
  <view class="span24 myappcancel">
      <view class="span24 myappcancel-hd">
          <view class="span24 myappcancel-hd-ico">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_wancheng.png'></image>
          </view>
          <view class="span24 myappcancel-hd-tt">取消预约成功</view>
      </view>
      <view class="span24 myappcancel-ct">
          <view class="span24 myappcancel-it">
              <view class="span24 myappcancel-it-hd">
                  <view class="span24 myappcancel-it-ky">您的订单{{cancel_order.internal_order_sn}}已取消，支付的费用将会返还到原账户</view>
              </view>
              <view class="span24 myappcancel-it-ctit">
                  <view class="span8 myappcancel-it-ky">小区名称：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.community.community_name}}</view>
              </view>
              <view class="span24 myappcancel-it-ctit">
                  <view class="span8 myappcancel-it-ky">预约地址：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.full_address}}</view>
              </view>
              <view class="span24 myappcancel-it-ctit">
                  <view class="span8 myappcancel-it-ky">预约时间：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.service.service_time}}</view>
              </view>
              <view class="span24 myappcancel-it-ctit">
                  <view class="span8 myappcancel-it-ky">预约项目：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.detail[0].spu_name}}</view>
              </view>
              <view class="span24 myappcancel-it-ctit">
                  <view class="span8 myappcancel-it-ky">价格：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.order_total_price}}￥</view>
              </view>
              <view class="span24 myappcancel-it-ctit" >
                  <view class="span8 myappcancel-it-ky">备注：</view>
                  <view class="span16 myappcancel-it-val">{{cancel_order.remarks}}</view>
              </view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        cancel_order:{}
    };
  },
  methods: {
  },
  components: {   },
  onLoad() {
       this.cancel_order=uni.getStorageSync('cancel_order')
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.myappcancel-hd{
height:213rpx;
margin-top: 33rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
}
.myappcancel-hd-ico{
    margin-top: 31rpx;
    justify-content: center
}
.myappcancel-hd-ico image{
    width: 79rpx;
    height: 79rpx;
}
.myappcancel-hd-tt{
    font-size:30rpx;color:rgba(173,102,1,1);
    justify-content: center
}
.myappcancel-it{
    background: white;
    margin: 24rpx;
    font-size: 28rpx;
    border-radius: 10rpx
}
.myappcancel-it-hd{
    padding: 24rpx 22rpx 19rpx 37rpx;
    border-bottom: 2rpx dashed rgba(240,240,240,1);
}
.myappcancel-it-ctit{
    padding: 24rpx 27rpx 15rpx 37rpx;color:rgba(153,153,153,1);
}
.myappcancel-it-ctit:last-child{
    padding-bottom: 30rpx
}
.myappcancel-it-val{
    justify-content:flex-start
}
</style>
