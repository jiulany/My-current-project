<template>
  <view class="span24 tab-bar">
    <!-- 首页 -->
    <view v-if="address==0" class="span5">
      <view class="span24 tab-bar-img">
        <image @tap="toIndex" src="../../static/img/tab_sle_index.png"></image>
      </view>
      <view class="span24 tab-bar-tt" @tap="toIndex">首页</view>
    </view>
    <view v-else class="span5">
      <view class="span24 tab-bar-img">
        <image @tap="toIndex" src="../../static/img/tab_no_index.png"></image>
      </view>
      <view class="span24 tab-bar-no-tt" @tap="toIndex">首页</view>
    </view>
    <!-- 门店 -->
    <view class="span5">
      <view class="span24 tab-bar-img">
        <image src="../../static/img/tab_no_mendian.png"></image>
      </view>
      <view class="span24 tab-bar-no-tt">门店</view>
    </view>
    <!-- 洗车 -->
    <view v-if="address==2" class="span4">
      <view class="span24 tab-bar-img">
        <image @tap='toCarWash' class="tab-bar-img-tuqi" src="https://imgcdn.tuogouchebao.com/tab_sle_xiche.png"></image>
      </view>
      <view class="span24 tab-bar-tt">洗车</view>
    </view>
     <view v-else class="span4">
      <view class="span24 tab-bar-img">
        <image @tap='toCarWash' class="tab-bar-img-tuqi" src="https://imgcdn.tuogouchebao.com/tab_sle_xiche.png"></image>
      </view>
      <view class="span24 tab-bar-no-tt" >洗车</view>
    </view>
    <!-- 商城 -->
    <view class="span5">
      <view class="span24 tab-bar-img">
        <image src="../../static/img/tab_no_shangcheng.png"></image>
      </view>
      <view class="span24 tab-bar-no-tt">商城</view>
    </view>
    <!-- 我的 -->
    <view v-if="address==4" class="span5">
      <view class="span24 tab-bar-img">
        <image @tap="toMy" src="../../static/img/tab_sle_wode.png"></image>
      </view>
      <view class="span24 tab-bar-tt">我的</view>
    </view>
    <view v-else class="span5">
      <view class="span24 tab-bar-img">
        <image @tap="toMy" src="../../static/img/tab_no_wode.png"></image>
      </view>
      <view class="span24 tab-bar-no-tt" @tap="toMy">我的</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["address"],
  methods: {
    toMy(e) {
      uni.switchTab({
        url: "/pages/my/my"
      });
    },
    toCarWash(){
      uni.switchTab({
        url:'/pages/car_wash/car_wash'
      })
    },
    toIndex() {
      uni.switchTab({
        url: "/pages/index/index"
      });
    },
    // 洗车
    wash(){
      uni.switchTab({
        url: "/pages/car_wash/car_wash"
      });
    }
  },
  onLoad: function() {},
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #f5f5f5;
  padding: 13rpx 0;
  padding-bottom: 4rpx
}
.tab-bar-tt {
  justify-content: center;
  font-size: 25rpx;
  color: #fdd000;
}
.tab-bar-no-tt {
  justify-content: center;
  font-size: 25rpx;
  color: #999999;
}
.tab-bar-img {
  justify-content: center;
  position: relative;
  height: 50rpx;
  overflow: visible;
}
.tab-bar-img image {
  width: 50rpx;
  height: 49rpx;
}
.tab-bar-img-tuqi {
  width: 91rpx !important;
  height: 91rpx !important;
  position: fixed;
  bottom: 52rpx;
}
</style>
