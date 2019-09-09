<template>
  <view class="invite">
    <img class="invite-bg"  src='https://imgcdn.tuogouchebao.com/invitation_bg.png' />
    <view class="invite-box">
      <view class="invite-ct span21">
        <view class="span24 invite-step">
          <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/invi_step.png'></image>
        </view>
        <view class="span24 invite-inp">
          <input class="span20 invite-inp-k"/>
          <view class="span4 invite-inp-jh">激活</view>
        </view>
        <view class="span24 invite-inp-nm"> 我的邀请码[{{invitation_code}}] </view>
        <view class="span24 invite-inp-yaoq">立即邀请</view>
      </view>
        <view class="span20 invite-inp-guize">
          <view class="span24">活动规则：</view>
          <view class="span24">1.每成功邀请一位好友关注小程序并激活好友的邀请码
双方各得一瓶玻璃水哦！</view>
          <view class="span24">2.每个用户只能激活一次邀请码，可多次邀请新用户激
活您的邀请码！</view>

          <view class="invite-retr"  @tap='toIndex'>
            <view class="span24 invite-retr-it0">返回</view>
            <view class="span24 invite-retr-it1">首页</view>
          </view>
        </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
        invitation_code:''
    };
  },
  methods: {
    toIndex(){
      uni.switchTab({
        url: "/pages/index/index"
      });
    }
  },
  components: {},
  onLoad: function() {
      let user = uni.getStorageSync('users')
      let invitation_code = user.invitation_code
      this.invitation_code = invitation_code
  },
  onShow: function() {
    uni.hideTabBar();
  },
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height:100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.invite-bg{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0
}
.invite-box{
position: relative;
top: 370rpx;
justify-content: center;
padding-bottom: 100rpx
}
.invite{
  height: 100%;
  padding-bottom: 200rpx;
}
.invite-ct{
background: white;
margin-left: auto;
margin-right: auto;
border-radius:10rpx;
padding: 20rpx 50rpx 86rpx 50rpx;
}
.invite-step{
  height: 200rpx;
}
.invite-step image{
height: 100%;
}
.invite-inp{
  justify-content: center;
  margin-top: 75rpx;
  position: relative;
}
.invite-inp-k{
height:68rpx;
border:1px solid rgba(252,99,31,1);
border-radius:34rpx;
}
.invite-inp-nm{
height:34px;
font-size:36rpx;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(252,99,31,1);
justify-content: center;
margin-top: 50rpx
}
.invite-inp-yaoq{
height:81rpx;
font-size: 40rpx;
justify-content: center;
color:white;
margin-top: 60rpx;
background:linear-gradient(0deg,rgba(255,150,0,1),rgba(255,207,0,1));
box-shadow:0px 12px 29px 0px rgba(255,168,0,0.08);
border-radius:41px;
}
.invite-inp-guize{
  font-size: 24rpx;
  color:white;
  left: 0rpx;
margin-left: 50rpx;
margin-top: 80rpx;
}
.invite-retr{
  height: 85rpx;
  width: 85rpx;
  color: #FF4E00;
  font-size: 24rpx;
  background: white;
  display: inline-block;
  border-radius: 50rpx;
  position: absolute;
  right:60rpx;
  bottom:320rpx;
}
.invite-retr-it0{
  justify-content: center
}
.invite-retr-it1{
  justify-content: center;
  position: relative;
  bottom: 8px
}
.invite-inp-jh{
  color:rgba(252,99,31,1);
  border-left: 1px solid rgba(252,99,31,1);
  height: 100%;
  align-items: center;
  padding-left: 16rpx;
  position: absolute;
  top: 0;
  right: 50rpx;
}
</style>
