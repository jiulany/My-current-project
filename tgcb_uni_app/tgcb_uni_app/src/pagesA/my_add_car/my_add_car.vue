<template>
  <view class="span24 addcar">
      <view class="span24 addcar-it">
          <view class="span24 addcar-tt">汽车品牌</view>
          <view class="span24 addcar-inp">
              <input type="text" placeholder="请选择汽车品牌">
          </view>
      </view>
      <view class="span24 addcar-it">
          <view class="span24 addcar-tt" >车辆车牌</view>
          <view class="span24 addcar-inp">
              <input type="text" @focus="openKeyboard" @blur="closeKeyboard" placeholder="请输入车辆车牌"  :value="car_num">
          </view>
      </view>
      <view class="span24 addcar-it">
          <view class="span24 addcar-tt">车辆颜色</view>
          <view class="span24 addcar-inp">
              <input type="text" placeholder="请选择车辆颜色">
              <view class="addcar-sle">
                <view class="span24 addcar-sle-it">白色</view>
                <view class="span24 addcar-sle-it">黑色</view>
              </view>
          </view>
      </view>
      <view class="span24 addcar-it">
          <view class="span24 addcar-tt">车辆类型</view>
          <view class="span24 addcar-inp">
              <input type="text" placeholder="请选择车辆类型">
              <view class="addcar-sle">
                <view class="span24 addcar-sle-it">SUV</view>
                <view class="span24 addcar-sle-it">小轿车</view>
              </view>
          </view>
      </view>
      <view class="span24 addcar-save">
          <view>保存</view>
      </view>
      <keyboader :visible="show_keyboader" @changeValue="changeValue"></keyboader>
  </view>
</template>
<script>
import keyboader from "../../components/keyboader/keyboader";
export default {
  data() {
    return {
        show_keyboader:false,
        car_num:null
    };
  },
  methods: {
      openKeyboard(){
        this.show_keyboader=true
      },
      closeKeyboard(){
        this.show_keyboader=false
      },
      changeValue(e){
         this.car_num=e
      }
  },
  components: {keyboader },
  onLoad: function(options) {
  },
  onShow: function() {
  },
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #fff;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.addcar-it{
    padding: 85rpx 24rpx 0 24rpx;
}
.addcar-tt{
    font-size:32rpx;
font-weight:600;
color:rgba(51,51,51,1);
line-height:80rpx;
}
.addcar-inp{
    border-bottom: 1rpx solid rgba(245,245,245,1);
    position: relative;
}
.addcar-inp input{
    font-size:24rpx;
    width: 100%
}
.addcar-save{
    justify-content: center;
    margin-top: 157rpx
}
.addcar-save view{
    width:702rpx;
height:68rpx;
background:rgba(250,200,4,1);
border-radius:8rpx;
text-align: center;line-height: 68rpx;
color: white
}
.addcar-sle{
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow:0px 5px 18px 2px rgba(11,11,10,0.1);
    width: 100%;
    z-index: 9999;
    max-height: 400rpx;
    overflow-y: scroll
}
.addcar-sle-it{
    padding: 20rpx 0 20rpx 18rpx;
    border-bottom: 1rpx solid rgba(245,245,245,1);
}
</style>
