<template>
  <view class="span24 myapphistory">
          <view class="span24">
            <view class="span24 myapphistory-time">2019-12-03</view>
            <view class="span24 myapphistory-it">
              <view class="span24 myapphistory-it-hd">
                  <view class="span5 myapphistory-it-ky">订单号</view>
                  <view class="span19 myapphistory-it-val">2378343</view>
              </view>
              <view class="span24 myapphistory-it-ctit">
                  <view class="span5 myapphistory-it-ky">小区名称</view>
                  <view class="span19 myapphistory-it-val">脱狗小区</view>
              </view>
              <view class="span24 myapphistory-it-ctit">
                  <view class="span5 myapphistory-it-ky">小区楼号</view>
                  <view class="span19 myapphistory-it-val">九栋905</view>
              </view>
              <view class="span24 myapphistory-it-ctit">
                  <view class="span5 myapphistory-it-ky">预约时间</view>
                  <view class="span19 myapphistory-it-val">2019-12-03</view>
              </view>
              <view class="span24 myapphistory-it-ctit">
                  <view class="span5 myapphistory-it-ky">预约项目</view>
                  <view class="span19 myapphistory-it-val">弱电维修</view>
              </view>
              <view class="span24 myapphistory-it-ctit">
                  <view class="span5 myapphistory-it-ky">价格</view>
                  <view class="span19 myapphistory-it-val">100￥</view>
              </view>
              <view class="span24 myapphistory-it-ctit" style="padding-bottom:19rpx">
                  <view class="span5 myapphistory-it-ky">备注</view>
                  <view class="span19 myapphistory-it-val">无</view>
              </view>
              <view class="span24 myapphistory-it-ft">
                  <span class="myapphistory-status">完成</span>
                  <span class="myapphistory-delet">删除</span>
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
  components: {   },
  onLoad() {},
  onShow() {},
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.myapphistory{
    padding-bottom: 200rpx
}
.myapphistory-it{
    background: white;
    margin: 24rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
    margin-top: 0
}
.myapphistory-time{
font-size:28rpx;
font-weight:500;
color:rgba(51,51,51,1);
padding: 28rpx 0 19rpx 38rpx
}
.myapphistory-it-hd{
    padding: 24rpx 22rpx 19rpx 37rpx;
    border-bottom: 2rpx dashed rgba(240,240,240,1);
}
.myapphistory-it-ctit{
    padding: 24rpx 27rpx 0 37rpx;
}
.myapphistory-it-ft{
    padding: 25rpx 22rpx 20rpx 37rpx;
    border-top: 2rpx dashed rgba(240,240,240,1);
    justify-content: flex-end;
}
.myapphistory-it-val{
    justify-content: flex-end
}
.myapphistory-status{
color:rgba(153,153,153,1);font-size:28rpx;
margin-right: 41rpx;
}
.myapphistory-delet{
font-size:28rpx;
width:110rpx;
height:38rpx;
border:1rpx solid rgba(255,209,0,1);
border-radius:50rpx;
color:rgba(255,209,0,1);
text-align: center;
padding: 2rpx 0
}
</style>
