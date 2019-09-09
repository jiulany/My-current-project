<template>
  <view class="span24 addresstx">
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">收货人</view>
          <view class="span18 addresstx-val">东风</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">手机号码</view>
          <view class="span18 addresstx-val">14142421444</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">所在地址</view>
          <view class="span18 addresstx-val">四川省成都市问我个人化规为</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">详细地址</view>
          <view class="span18 addresstx-val">四川省成都市问我个人化规为分为风格</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">补充地址</view>
          <view class="span18 addresstx-val">四川省成都市问我个人化规为分为风格</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span10 addresstx-key">是否设为默认地址</view>
          <view class="span14 addresstx-val">
              <radio-group @click="radioChange(item)">
                        <radio :value="item.one_sku.id.toString()" :checked="item.checked" color="#FDD000" />
              </radio-group>
          </view>
      </view>
      <view class="span24 addresstx-save">保存</view>
  </view>
</template>

<script> 
export default {
  data() {
    return {
        cur_hd:1
    };
  },
  methods: {
  },
  components: {},
  onLoad() {
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
.addresstx{
    background: white;
    margin-top: 20rpx
}
.addresstx-it{
    padding: 30rpx 28rpx 30rpx 21rpx ;
    border-bottom:1rpx solid rgba(240,240,240,1);
}
.addresstx-key{
    font-size: 30rpx
}
.addresstx-val{
    font-size: 30rpx;
    justify-content: flex-end
}
.addresstx-val radio-group{
    text-align: end
}
.addresstx-save{
    position: fixed;
    bottom: 0;
height:98rpx;
background:rgba(253,208,0,1);
font-size:36rpx;
font-weight:bold;
color:rgba(71,71,71,1);
line-height:48rpx;
align-items: center;
justify-content: center
}
</style>
