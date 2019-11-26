<template>
  <view class="span24 housekeeper">
    <view class="span24 housekeeper-num">18734637281</view>
    <view class="span24 housekeeper-call">
      <view @tap="callHousekeeper">拨打物业电话</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    callHousekeeper() {
      uni.makePhoneCall({
        phoneNumber: "114" //仅为示例
      });
    }
  },
  components: {},
  onLoad() {},
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: white;
  font-size: 28rpx;
  line-height: 1.8;
}
.housekeeper-num {
  font-size: 36rpx;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  justify-content: center;
  padding: 119rpx 0 22rpx 0;
}
.housekeeper-call {
  justify-content: center;
  padding: 22rpx 0 0 0;
}
.housekeeper-call view {
  width: 395rpx;
  height: 70rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 195, 110, 1) 0%,
    rgba(252, 238, 191, 1) 100%
  );
  border-radius: 35px;
  text-align: center;
  line-height: 70rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: rgba(173, 102, 1, 1);
}
</style>
