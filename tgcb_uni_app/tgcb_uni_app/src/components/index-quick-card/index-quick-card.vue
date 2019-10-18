<template>
  <view class="card" v-show="show" >
    <view class="box" >
      <view class="close" @tap="close_card">×</view>
      <view class="item" @tap="goCarWash">
        <text class="text">洗车</text>
        <text class="experience">立即体验</text>
      </view>
      <view class="item" @tap="goCosmetology">
        <text class="text">美容</text>
        <text class="experience">立即体验</text>
      </view>
      <view class="item" @tap="goMaintain">
        <text class="text">保养</text>
        <text class="experience">立即体验</text>
      </view>
      <view class="item" @tap="goService">
        <text class="text">维修</text>
        <text class="experience">立即体验</text>
      </view>
    </view>
  </view>
</template>

<script>
// import { url } from 'inspector'
export default {
    data() {
        return {
            show:null
        }
    },
    created(){
this.show=this.isShow
    },
        props: {
            isShow: {
                type: Boolean
            }
        },
        watch:{
isShow(val){
this.show=val
}
        },
    methods: {
        close_card() {
            this.$emit("closeCard",false)
        },
        goCarWash() {
          console.log(1)
          uni.switchTab({
            url: "/pages/car_wash/car_wash"
          });
          console.log(2);
        },
        goCosmetology() {
          uni.navigateTo({
            url: "/pagesB/cosmetology/cosmetology?service_classify_id=2&title=美容"
          });
        },
        goMaintain() {
          uni.navigateTo({
            url: "/pagesB/maintain/maintain"
          });
        },
        goService() {
          uni.navigateTo({
            url: "/pagesB/cosmetology/cosmetology?service_classify_id=4&title=维修"
          });
        }
    }
}
</script>

<style>
.card {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.box {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 456rpx;
  height: 462rpx;
  margin: 0 auto;
  margin-top: 300rpx;
  padding-left: 56rpx;
  padding-top: 98rpx;
  background: url('https://imgcdn.tuogouchebao.com/index_quick_card.png') no-repeat center center;
  background-size: 493rpx;
}
.close {
  position: absolute;
  top: -70rpx;
  right: 0rpx;
  width: 52rpx;
  height: 52rpx;
  border: 5rpx solid #fff;
  font-size: 64rpx;
  color: #fff;
  text-align: center;
  line-height: 43rpx;
  border-radius: 50%;
  font-weight: lighter;
}
.item {
  width: 165rpx;
  height: 163rpx;
  background: #fff;
  margin-right: 62rpx;
  background: url('https://imgcdn.tuogouchebao.com/index_quick_item.png') no-repeat center center;
  background-size: 165rpx;
  color: #fff;
}
.item text {
  display: block;
}
.text {
  font-size: 38rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(253, 208, 0, 1);
  margin-top: 26rpx;
  margin-left: 46rpx;
}
.experience {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  /* color:rgba(255,255,255,1); */
  margin-left: 34rpx;
  margin-top: 24rpx;
}
</style>