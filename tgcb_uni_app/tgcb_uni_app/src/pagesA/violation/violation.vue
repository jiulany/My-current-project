<template>
  <view>
     <view class="span24 violation">
    <view class="span24 violation-it" >
      <view class="span22 violation-ms">
        <image mode="aspectFit" src='../../static/img/my_weizhang.png'></image>  违章处理 <span class="violation-xz">目前只支持门店处理</span> </view>
      <view class="span2  violation-it-rico">
        <view class="iconfont icon-xiayibu"></view>
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
  components: { },
  onLoad: function() {},
  onShow: function() {
  },
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.violation{
  margin-top: 15rpx
}
.violation-it{
  align-items: center;
  padding: 30rpx 27rpx;
  background: white;
  margin-bottom: 2rpx;
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.violation-ms{
  font-size: 32rpx;
  align-items: center
}
.violation-ms image{
    width: 53rpx;
    height: 53rpx;
    margin-right: 20rpx
}
.violation-it-rico image{
  height: 30rpx;
}
.violation-xz{
color:rgba(153,153,153,1);
font-size: 24rpx;
margin-left: 30rpx
}
</style>
