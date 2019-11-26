<template>
  <view class="span24 opendoor">
    <view class="span24">
      <image class="opendoor-bg" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_opendoor_bg.png'></image>
    </view>
    <view class="span24" style='margin-top:63rpx;justify-content: center'>
      <view class="opendoor-btn-box">
        <view class="opendoor-btn">开</view>
        <view class="opendoor-blur"></view>
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
  components: {},
  onLoad() {
  },
  onShow() {
  },
  onHide() {}
};
</script>

<style>
page {
		background-color: #fcfcfc;
		font-size: 28rpx;
		line-height: 1.8;
	}
.opendoor-bg{
  height: 854rpx;
  width: 100%
}
.opendoor-btn-box{
  width: 231rpx;
  height: 231rpx;
border-radius:50%;
justify-content: center;
display: flex;
align-items: center;
position: relative;
}
.opendoor-blur{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background:rgba(255,196,111,1);
opacity:0.46;
border-radius:50%;
}
.opendoor-btn{
width:197rpx;
height:197rpx;
background:rgba(255,196,111,1);
border-radius:50%;
font-size:60rpx;
font-weight:bold;
color:rgba(255,255,255,1);
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
transition: width 0.5s,height 0.5s;
}
.opendoor-btn:active{
 width: 231rpx;
  height: 231rpx;
}
</style>
