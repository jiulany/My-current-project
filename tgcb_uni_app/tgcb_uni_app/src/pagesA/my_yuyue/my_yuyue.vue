<template>
  <view class="my_yuyue">

      <view class="span24 my_yuyue-itm" @tap='toMyYuYueDetails' v-for="(item,index) in list" :key="index">
         <view class="span24 my_yuyue0">
             <view class="span18 my_yuyue-ord">预约单号 {{item.order.internal_order_sn}}</view>
             <view class="span6 my_yuyue-succ" v-if="item.order.order_status == 1">待付款</view>
             <view class="span6 my_yuyue-succ" v-if="item.order.order_status == 2">待使用</view>
             <view class="span6 my_yuyue-succ" v-if="item.order.order_status == 3">交易成功</view>
         </view>
         <view class="span24 my_yuyue1">
             <view class="span18 my_yuyue-time">{{item.service_time}}</view>
             <view class="span6 my_yuyue-chepai">川A13213</view>
         </view>
         <view class="span24">
         <view class="span24 my_yuyue2" v-for="(value,index) in item.order.details" :key="index">
             <view class="span7 my_yuyue-tp">
                 <image mode="aspectFit" :src='value.commodity.commodity_image_thum'></image>
             </view>
             <view class="span11">
                 <view class="span24 my_yuyue-name">{{value.commodity.commodity_name}}</view>
                 <view class="span24 my_yuyue-funame">{{value.sku_name}}</view>
             </view>
             <view class="span6 my_yuyue-jg" v-if="value.price">
                 ￥{{value.price.price}}
             </view>
             <view class="span6 my_yuyue-jg">
                 ￥0
             </view>
         </view>
         </view>
     </view>
     
  </view>
</template>
<script>
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
export default {
  data() {
    return {
      showSignModel:false,
      list:[],
      page:1,
      size:5,
      flag:true
    };
  },
  methods: {
    getMyList()
    {
        let params = {
            page : this.page,
            size : this.size
        }
        userModel.appointmentList(params).then((res) => {
            this.list = this.list.concat(res.data);
            if(res.data.length == 0) {
                this.flag = false
            }else {
                this.flag = true
                this.page = this.page + 1;
            }
        })
    },
   toMyYuYueDetails(){
       console.log("ss")
       uni.navigateTo({
        url: "/pagesA/my_yuyue_details/my_yuyue_details"
      });
   }
  },
  components: { },
  onLoad: function() {},
  onShow: function() {
    uni.hideTabBar();
    this.getMyList();
  },
  onHide: function() {},
  onReachBottom() {
      if(this.flag) {
          this.getMyList();
      }
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
.my_yuyue{
    padding-bottom: 200rpx
}
.my_yuyue-itm{
    background: white;
    margin-top: 20rpx;
box-shadow:0px 2px 5px 0px rgba(51,51,51,0.06);
}
.my_yuyue0{
    padding: 15rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-ord{
    font-size: 32rpx
}
.my_yuyue-fail{
    justify-content: flex-end;
    align-items: center;
    color: #F75C3E;
    font-size: 32rpx
}
.my_yuyue-succ{
    justify-content: flex-end;
    align-items: center;
    color: #FCCD00;
    font-size: 32rpx
}
.my_yuyue-fail image{
    width: 27rpx;
    height: 29rpx;
    margin-left: 20rpx;
}
.my_yuyue1{
    padding: 18rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-time{
    font-size: 32rpx
}
.my_yuyue-chepai{
    justify-content: flex-end;
    align-items: center;
    font-size: 32rpx
}
.my_yuyue2{
    padding: 33rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5
}
.my_yuyue-tp image{
    height: 149rpx;
    max-width: 200rpx;
}
.my_yuyue-name{
    font-size:30rpx;
    align-items: center
}
.my_yuyue-funame{
    font-size:24rpx;
    align-items: flex-start
}
.my_yuyue-jg{
    align-items: center;
    font-size: 30rpx;
    justify-content: flex-end;
    color: #F75C3E
}
.my_yuyue3{
    padding: 18rpx 25rpx;
    border-bottom: 2rpx solid #f5f5f5;
    font-size: 30rpx
}
</style>
