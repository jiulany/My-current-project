<template>
  <view class="span24 paysuccess">
     <view class="span24 paysuccess-ico"> <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_yuyuechenggong.png'></image></view>
     <view class="span24 paysuccess-status">预约成功</view>
     <view class="span24 paysuccess-btn">
         <view class="span12 paysuccess-rtr"><view @tap="toInx">返回首页</view></view>
         <view class="span12 paysuccess-chek"><view  @tap="toMyAppoint">查看预约</view></view>
     </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        beforePage:''
    };
  },
  methods: {
      toInx(){
          uni.switchTab({url: '/pages/index/index'});
      },
      toMyAppoint(){
          uni.navigateTo({url: '/pages/my_appoint/my_appoint'});
      }
  },
  components: {},
  onLoad(e) {
      let pages = getCurrentPages();//当前页
      let beforePage = pages[pages.length - 2];//上个页面
        uni.setNavigationBarTitle({
            title: '预约'
        });
  },
  onUnload(){
      uni.navigateBack({
    delta: 1
});
  },
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
.paysuccess-ico{
    justify-content: center;
    padding: 102rpx 0 24rpx 0
}
.paysuccess-ico image{
width: 107rpx;
height: 107rpx;
}
.paysuccess-status{
    justify-content: center;
    font-size: 32rpx;
    margin-bottom: 134rpx
}
.paysuccess-status0{
    justify-content: center;
    font-size: 72rpx;
    margin-bottom: 134rpx;
    color: #FDD000
}
.paysuccess-rtr{
    justify-content: center
}
.paysuccess-rtr view{
width:238rpx;
height:64rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:32rpx;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);
text-align: center;
line-height: 64rpx
}
.paysuccess-chek{
    justify-content: center
}
.paysuccess-chek view{
width:238rpx;
height:64rpx;
background:rgba(246,246,246,1);
border-radius:32rpx;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
text-align: center;
line-height: 64rpx
}
.paysuccess-btn{
    padding: 0 50rpx
}
</style>
