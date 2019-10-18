<template>
<view class="span24 balance">
    <view class="span24 balance-ico">
        <image mode="aspectFit"  src='https://imgcdn.tuogouchebao.com/balance_ico.png'></image>
    </view>
    <view class="span24 balance-ms">我的零钱</view>
    <view class="span24 balance-num" v-if="user.balance">¥{{user.balance}}</view>
    <view class="span24 balance-rech" @tap='toRecharge'><button>充值</button></view>
    <view class="span24 balance-yue"  @tap='toBalanceDetails'>余额明细</view>
</view>
</template>
<script>
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
export default {
  data() {
    return {
        user:{}
    };
  },
  methods: {
      // 个人中心
      _getUserInfo(){
          userModel.getUerInfo().then((res) => {
              if(res.code < 400){
                  this.user = res.data
              }
          })
      },
      toRecharge(){
          uni.navigateTo({
        url: "/pagesA/recharge/recharge"
      });
      },
      toBalanceDetails(){
          uni.navigateTo({
             url: "/pagesA/balance_details/balance_details"
           });
      }
  },
  components: {},
  onLoad: function() {

  },
  onShow: function() {
      this._getUserInfo()
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
.balance-ico{
  margin-top: 120rpx
}
.balance-ico image{
  height: 120rpx;
  width: 120rpx;
}
.balance view{
justify-content: center
}
.balance-ms{
  font-size:32rpx;
  margin-top: 20rpx
}
.balance-num{
  font-weight:600;
  font-size: 55rpx;
  margin-top: 50rpx
}
.balance-rech{
  margin-top: 100rpx
}
.balance-rech button{
width: 95%;
background: #fdd000;
color:white
}
.balance-yue{
  color: #FCC600;
  font-size: 30rpx;
  margin-top: 50rpx
}
</style>
