<template>
  <view class="my">
    <view class="my-sign-model">
      <uni-popup ref="popup" @hidePopup="switchSignModel" :show='showSignModel' :animation='true' :maskClick='true' type="center" >
        <view class="my-sign-bg">
          <view class="span24">感谢本次签到</view>
          <view class="span24">积分</view>
          <view class="span24 my-sign-bg-jifen">+80</view>
        </view>
      </uni-popup>
    </view>
    <view class="my-bg">
        <view class="my-head span24">
            <view class="span5 my-head">
              <view class="my-head-box">
                  <!-- <button  class="span24 my-name get-user-button" open-type="getUserInfo" @getuserinfo="bindgetuserinfo"></button> -->
                  <image v-if="userDisplayData.avatar_url" :src='userDisplayData.avatar_url'></image>
                  <image v-else  src='../../static/img/my_head.png'></image>
              </view>
            </view>
            <view class="span12" v-if="JSON.stringify(userDisplayData) != '{}'">
                <view class="span24 my-name">{{userDisplayData.nick_name}}</view>
                <view class="span24 my-phone" v-if="userDisplayData.phone">{{userDisplayData.phone}}</view>
            </view>

            <view class="span12" style="align-items: center;" v-if="JSON.stringify(userDisplayData) == '{}'">
                <button class="auth-button span24 my-name" style="background: none;width: auto;height: 100rpx;margin: 0;padding: 0;border:none"  open-type="getUserInfo" @getuserinfo="bindgetuserinfo">点击获取昵称</button>
            </view>

            <view class="span6 my-head-end">
                <!-- <view class="span24 my-qiandao" @tap='switchSignModel'>签到</view> -->
                <view class="span24 my-jifen">
                    <view class="span4 my-jifen-ico">
                        <image  src='../../static/img/jifen.png'></image>
                    </view>
                    <view class="span20" @tap='toIntegral'>积分：{{user.integrals}}</view>
                </view>
            </view>
        </view>
    </view>
    <view class="span24 my-content">
        <!-- 付款 -->
        <view class="span24 my-item">
          <view class="span4" @tap="_order(1)">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_wait_pay.png'></image></view>
            <view class="span24 my-item-tx">待付款</view>
          </view>
          <view class="span4" @tap="_order(2)">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_wait_use.png'></image></view>
            <view class="span24 my-item-tx">待使用</view>
          </view>
          <view class="span4" @tap="_order(3)">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_over.png'></image></view>
            <view class="span24 my-item-tx">已完成</view>
          </view>
          <view class="span4" @tap="_order(0)">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_all_order.png'></image></view>
            <view class="span24 my-item-tx">全部订单</view>
          </view>
        </view>
        <!-- 资产 -->
        <view class="span24" v-if="showAssets">
            <view class="my-zic-tt">我的资产</view>
            <view class="span24 my-item my-item-dif">
                <view class="span4" v-for="(item,index) in user.assets.icons" @tap="_icons(item.url)" :key="index">
                    <view class="span24 my-item-ico"><i style="font-size:50rpx !important;color:#000000" :class="`iconfont`+' '+item.icon"></i></view>
                    <view class="span24 my-item-tx">{{item.name}}</view>
                    <view class="span24 my-item-syu">{{item.value}}</view>
              </view>

<!--          <view class="span4" @tap='toRecharge'>-->
<!--            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_zic_chongzhi.png'></image></view>-->
<!--            <view class="span24 my-item-tx">充值</view>-->
<!--            <view class="span24 my-item-syu"></view>-->
<!--          </view>-->
<!--          <view class="span4">-->
<!--            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_zic_hongbao.png'></image></view>-->
<!--            <view class="span24 my-item-tx">红包</view>-->
<!--            <view class="span24 my-item-syu"></view>-->
<!--          </view>-->
<!--          <view class="span4">-->
<!--            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_zic_kaquan.png'></image></view>-->
<!--            <view class="span24 my-item-tx">卡券</view>-->
<!--            <view class="span24 my-item-syu"></view>-->
<!--          </view>-->
        </view>
        </view>
        <!-- 其他 -->
        <view class="span24">
          <view class="span24 my-zic-tt"></view>
        <view class="span24 my-item my-item-dif0">
          <view class="span4" @tap='toMyYuYue'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_yuyue.png'></image></view>
            <view class="span24 my-item-tx">我的预约</view>
          </view>
          <view class="span4" @tap='toInvitation'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_yaoqing.png'></image></view>
            <view class="span24 my-item-tx">邀请码</view>
          </view>
          <view class="span4" @tap='toViolation'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_weizhang.png'></image></view>
            <view class="span24 my-item-tx">违章处理</view>
          </view>
          <view class="span4" @tap='toMyCar'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_cheliang.png'></image></view>
            <view class="span24 my-item-tx">我的车辆</view>
          </view>
        </view>
        <view class="span24 my-item my-item-dif0">
          <view class="span4" @tap='toPayManage'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_zhifu.png'></image></view>
            <view class="span24 my-item-tx">支付管理</view>
          </view>
          <!-- <view class="span4" @tap="toMyInsurance"> -->
          <view class="span4" @tap="toYearlyInspection">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_baoxian.png'></image></view>
            <!-- <view class="span24 my-item-tx">我的保险</view> -->
            <view class="span24 my-item-tx">车辆年检</view>
          </view>
          <view class="span4" @tap="_delay">
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_yanbao.png'></image></view>
            <view class="span24 my-item-tx">我的延保</view>
          </view>
          <view class="span4" @tap='toMyAddress'>
            <view class="span24 my-item-ico"><image mode="aspectFit" src='../../static/img/my_dizhi.png'></image></view>
            <view class="span24 my-item-tx">地址管理</view>
          </view>
        </view>
        </view>
        <!-- <view class="span24 my-item-dif1" @tap="_delay">
          <view class="span3 my-item-dif1-ico">
            <i class="iconfont icon-wodeyanbao"></i>
          </view>
          <view class="span18">我的延保</view>
          <view class="span3 my-item-dif1-ico">
            <view class="iconfont icon-xiayibu"></view>
          </view>
        </view> -->

        <view class="span24 my-item-dif1" @tap="_user">
          <!-- <view class="span3 my-item-dif1-ico"><image  mode="aspectFit" src='../../static/img/my_gerenxinxi.png'></image></view> -->
          <view class="span3 my-item-dif1-ico">
            <i class="iconfont icon-gerenxinxi"></i>
          </view>
          <view class="span18">个人信息</view>
           <view class="span3 my-item-dif1-ico">
            <view class="iconfont icon-xiayibu"></view>
          </view>
        </view>
        <!-- <view class="span24 my-item-dif1">
          <view class="span3 my-item-dif1-ico"><image  mode="aspectFit" src='../../static/img/my_kefu.png'></image></view>
          <view class="span18">在线客服</view>
          <view class="span3 my-item-dif1-ico">
            <view class="iconfont icon-xiayibu"></view>
          </view>
        </view> -->
        <!-- <view class="span24 my-item-dif1">
          <view class="span3 my-item-dif1-ico"><image  mode="aspectFit" src='../../static/img/my_youxi.png'></image></view>
          <view class="span18">游戏中心</view>
          <view class="span3 my-item-dif1-ico">
            <view class="iconfont icon-xiayibu"></view>
          </image></view>
        </view> -->
        <view class="span24 my-item-dif1" @tap="_aboutUs">
          <!-- <view class="span3 my-item-dif1-ico"><image  mode="aspectFit" src='../../static/img/my_guanyuwomen.png'></image></view> -->
          <view class="span3 my-item-dif1-ico">
            <i class="iconfont icon-guanyuwomen1"></i>
          </view>
          <view class="span18">关于我们</view>
          <view class="span3 my-item-dif1-ico">
            <view class="iconfont icon-xiayibu"></view>
          </view>
        </view>
    </view>

  
    

    
  </view>
</template>
<script>
import uniPopup from "../uni-popup/uni-popup.vue"
import {UserModel} from "../../model/user";
const  userModel = new UserModel()

export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      showSignModel:false,
      showAssets:false,
      payShow:false,
    };
  },
    props:{
        user:{
            type:Object
        },
        userDisplayData : {
          type : Object
        }
    },
  methods: {
      _user(){
          uni.navigateTo({
              url:'/pagesA/personal/personal'
          })
      },
      _aboutUs(){
          uni.navigateTo({
              url:'/pagesA/about_us/about_us'
          })
      },
      _order(type){
          uni.navigateTo({
              url:'/pagesC/order/order?type='+type
          })
      },
      _icons(url){
        console.log(this.user)
          uni.navigateTo({
              url
          })
      },
      _delay(){
        uni.navigateTo({
          url:`/pagesA/delay_submit/delay_submit`
        })
      },
    switchSignModel(){
      this.showSignModel=!this.showSignModel
    },
    toBalance(){
      uni.navigateTo({
        url: "/pagesA/balance/balance"
      });
    },
    toRecharge(){
      uni.navigateTo({
        url: "/pagesA/recharge/recharge"
      });
    },
    toMyYuYue(){
      uni.navigateTo({
        url: "/pagesA/my_yuyue/my_yuyue"
      });
    },
    toIntegral(){
      uni.navigateTo({
        url: "/pagesA/integral/integral"
      })
    },
    toInvitation(){
      uni.navigateTo({
        url: "/pagesA/invitation/invitation"
      });
    },
    toViolation(){
      uni.navigateTo({
        url: "/pagesA/violation/violation"
      });
    },
    toMyAddress(){
      uni.navigateTo({
        url: "/pagesA/my_address/my_address"
      });
    },
    toMyCar(){
      uni.navigateTo({
        url: "/pagesA/my_car/my_car"
      });
    },
    toPayManage(){
      uni.navigateTo({
        url: "/pagesA/payment_manage/payment_manage"
      });
    },
    toMyInsurance(){
      uni.navigateTo({
        url:`/pagesA/my_insurance/my_insurance`
      })
    },
    toYearlyInspection(){
      uni.navigateTo({
        url:`/pagesA/yearly_inspection/yearly_inspection`
      })
    },
    bindgetuserinfo(res){
      console.log(res)
      this.$emit('bindgetuserinfo',res)
    }
  },
  
  onLoad: function() {
      console.log(2)
  },
  mounted(){
      
      console.log(1111)
  },
  onShow: function() {
      console.log(2)
  },
  onHide: function() {},
watch:{
    user:{
        handler(newValue, oldValue) {
            uni.setStorageSync('users',newValue)
           if(newValue.assets) {
               this.showAssets = true
           } else {
               this.showAssets = false
           }
        }
    },
    deep: true
}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.my {
  height: 100vh;
  padding-bottom: 300rpx;
    overflow: scroll;
}
.my-bg {
  background: #fdd000;
  height: 300rpx;
  width: 100%;
}
.my-content{
    padding: 20rpx;
    padding-bottom: 300rpx;
    margin-top: -130rpx;
}
.my-head{
    padding: 10rpx;
    padding-bottom: 20rpx;
    background: #fdd000;
}
.my-head-box {
  width: 126rpx;
  height:126rpx;
  border-radius: 126rpx;
  overflow: hidden;
  position: relative;
}
.get-user-button{
  width: 100%;
  height: 100%;
  position:absolute;
  opacity: 0;
}
.auth-button::after{
  border: none !important;
}
.my-head image{
width: 126rpx;
height:126rpx;
border-radius: 60rpx
}
.my-name{
    align-items: flex-end
}
.my-phone{
    align-items: top
}
.my-head-end{
    justify-content:flex-end;
    align-items: center
}
.my-qiandao{
    width:146rpx;
height:48rpx;
background:rgba(255,255,255,1);
box-shadow: 1px 2px 16px 0px rgba(155, 135, 36, 0.44);
border-radius:24rpx;
justify-content: center;
color: #fdd000;position: relative;
top: 20rpx;
right: 10rpx;
}
.my-jifen{
    font-size: 10rpx;
    color: white;
}
.my-jifen-ico image{
    height: 19rpx;
    width: 19rpx;
    position: relative;
    top: 16rpx;
    margin-right: 10rpx;
}
.my-zic-tt{
  font-size: 30rpx;
  padding: 13rpx 0;
  font-weight: 600;
}
.my-item{
  background:#ffffff;
  justify-content: space-between;
  padding: 44rpx 27rpx 50rpx 27rpx;
  background:rgba(255,255,255,1);
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.my-item-dif{
  padding: 44rpx 27rpx 20rpx 27rpx;
}
.my-item-dif0{
  padding: 20rpx 27rpx 20rpx 27rpx;
}
.my-item-dif1{
  background: white;
  padding: 32rpx 0;
  border-top: 1px solid #f5f5f5;
  background:rgba(255,255,255,1);
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.my-item-dif1 view{
  align-items: center
}
.my-item-dif1-ico {
  padding: 0 30rpx;
}
.my-item-dif1-ico image{
  height: 32rpx;
}
.my-item-dif1-ico i{
  font-size: 38rpx;
}
.my-item-ico{
  height: 60rpx !important;
  justify-content: center
}
.my-item-ico image{
  height:55rpx
}
.my-item-tx{
  justify-content: center;
  font-size: 26rpx;
  height: 50rpx;
  align-items: center;
  font-size: 25rpx
}
.my-item-syu{
  height: 40rpx
}
.my-sign-model .uni-close-bottom{
  display: none !important
}
.my-sign-bg{    
  width:520rpx;
  height:300rpx;
  background: url('https://imgcdn.tuogouchebao.com/my_qiandao_model.png');
  background-size: 100% 100%;
  position: relative;
  left: 20rpx;
  align-items: center
}
.my-sign-bg view{
  justify-content: center;
  position: relative;
  top:78rpx;
  right: 20rpx;
}
.my-sign-bg-jifen{
  top:85rpx !important;
  font-size: 55rpx;
  color: white
}
.my-sign-close{
  top:180rpx !important;
}
.my-sign-close image{
  height: 50rpx;
  width: 50rpx
}

</style>
