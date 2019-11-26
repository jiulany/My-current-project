<template>
  <view class="span24 my">
    <view class="span24 my-bg">
        <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_bg.png'></image>
    </view>
    <view class="span24 my-head">
        <view class="span6 my-head-tp">
            <view style="width:135rpx;height:135rpx;border-radius:50%;overflow:hidden;border-radius:50%;">
           <open-data type="userAvatarUrl"></open-data>
           </view>
        </view>
        <view class="span10 my-head-nm">
            <view class="span24"><open-data type="userNickName"></open-data></view>
            <view class="span24"></view>
        </view>
        <view class="span8 my-head-add">
            <view class="span24">{{community}}</view>
            <view class="span24"></view>
        </view>
    </view>
    <view class="span24 my-quickcrl">
        <view class="span4" @tap="toRepair">
            <view class="span24 my-quickcrl-tp">
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_baoxiu.png'></image>
            </view>
            <view class="span24">报修</view>
        </view>
        <view class="span4" @tap="toMyOrder">
            <view class="span24 my-quickcrl-tp">
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_dingdan.png'></image>
            </view>
            <view class="span24">订单</view>
        </view>
        <view class="span4" @tap="toPay">
            <view class="span24 my-quickcrl-tp">
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_jiaofei.png'></image>
            </view>
            <view class="span24">缴费</view>
        </view>
        <view class="span4" @tap="toDianKa(1,$event)">
            <view class="span24 my-quickcrl-tp">
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_dianka.png'></image>
            </view>
            <view class="span24">电卡</view>
        </view>
    </view>
    <view class="span24 my-obj">
       <view class="span24 my-obj-it" @tap="toMyCar">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_car.png'></image></view>
           <view class="span19">我的车辆</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
       </view>
       <view class="span24 my-obj-it" @tap="toMyPark">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_chewei.png'></image></view>
           <view class="span19">我的车位</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
       </view>
       <view class="span24 my-obj-it" @tap="toMyAppoint">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_yuyue.png'></image></view>
           <view class="span19">我的预约</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
        </view>
        <view class="span24 my-obj-it" @tap="toMyHouse">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_fangwu.png'></image></view>
           <view class="span19">我的房屋</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
        </view>
        <view class="span24 my-obj-it" @tap="toMyAddress">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_dizhi.png'></image></view>
           <view class="span19">我的地址</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
        </view>
       <view class="span24 my-obj-it" @tap="toMyInvoice">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_fap.png'></image></view>
           <view class="span19">我的发票</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
       </view>
       <!-- <view class="span24 my-obj-it" @tap="toMyTicket">
           <view class="span3 my-obj-tp"><image style="height:25rpx" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_kaquan.png'></image></view>
           <view class="span19">我的卡券</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
       </view>
       <view class="span24 my-obj-it" @tap="toDianKa(2,$event)">
           <view class="span3 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_myico_jf.png'></image></view>
           <view class="span19">我的积分</view>
           <view class="span2 my-obj-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
       </view> -->
    </view>
      <uni-popup ref="popup" type="center" :maskClick="false">
		<view class="span24 inx-model">
			<view class="span24 inx-model-close"></view>
			<view class="span24 inx-model-tt">您还未绑定房屋</view>
			<view class="span24" style="justify-content: center;"><view @tap="toCellBind" class="inx-model-btn">去绑定</view></view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import { uniPopup } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
        community:''
    };
  },
  methods: { 
	toCellBind(){
      uni.navigateTo({url: '/pages/cell_bind/cell_bind'});
	},
      getPhoneNumber(v){
          console.log(v)
      },
    //   toDianKa(cur_page,e){
    //       uni.navigateTo({url: `/pages/surplus_details/surplus_details?cur_page=${cur_page}`});
    //   },
      toRepair(){
          uni.navigateTo({url: '/pages/repair/repair'});
      },
      toMyOrder(){
          uni.navigateTo({url: '/pages/my_order/my_order'});
      },
      toPay(){
          uni.navigateTo({url: '/pages/pay/pay'});
      },
      toMyPark(){
          this.$http({ url: `api/mine/myspaces` ,data:{
      }}).then(res => {
          if(res.data.length===0){
          uni.navigateTo({url: '/pages/my_nopark/my_nopark?switchPage=1'});
          }else{
            uni.navigateTo({url: '/pages/my_park/my_park'});
          }
          })
          .catch(res => {});
      },
      toMyCar(){
          this.$http({ url: `api/mine/cars` ,data:{}}).then(res => {
          if(res.data.length===0){
          uni.navigateTo({url: '/pages/my_nocar/my_nocar?switchPage=1'});
          }else{
            uni.navigateTo({url: '/pages/my_car/my_car'});
          }
          })
          .catch(res => {});
      },
      toMyAddress(){
          uni.navigateTo({url: '/pages/my_address/my_address'});
      },
      toMyHouse(){
          uni.navigateTo({url: '/pages/my_house/my_house'});
      },
      toMyTicket(){
          uni.navigateTo({url: '/pages/my_ticket/my_ticket'});
      },
      toMyAppoint(){
          uni.navigateTo({url: '/pages/my_appoint/my_appoint'});
      },
      toMyInvoice(){
          uni.navigateTo({url: '/pages/my_invoice/my_invoice'});
      }
  },
  components: {  uniPopup },
  onLoad() {
   
  },
  onShow() {
      this.community=uni.getStorageSync('community_selected').community
       this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //获取绑定
		  if(res.data.length===0){
			  this.$refs.popup.open()
			  }else{
			  this.$refs.popup.close()
              }
		  })
          .catch(res => {});
  },
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.my{
    position: relative;
    height: 100%;
    padding-bottom: 200rpx;
    overflow-y: scroll
}
.my-bg{
    position: absolute;
    width: 100%;
    height: 352rpx;
    z-index: 1
}
.my-bg image{
  width: 100%;
  height: 100%;
}
.my-head{
    padding: 39rpx;
    padding-top: 50rpx;z-index: 999;
}
.my-head-tp{
height: 135rpx;
}
.my-head-tp image{
    height: 100%;
}
.my-head-nm{
    color: #AD6601;
    font-size: 30rpx;
    font-weight: 600
}
.my-head-nm view{
    align-items: center
}
.my-head-add{
    color: #AD6601;
    font-size: 30rpx;
    font-weight: 600
}
.my-head-add view{
    align-items: center;
}
.my-quickcrl{
    background:rgba(255,255,255,1);
border-radius:10px;
height:155rpx;
z-index: 999;
justify-content: space-between;
padding: 18rpx 41rpx 22rpx 41rpx;
margin: 0 22rpx;
font-size: 30rpx
}
.my-quickcrl view{
    justify-content: center 
}
.my-quickcrl-tp{
    height: 68rpx;
    margin-bottom: 6rpx
}
.my-quickcrl-tp image{
    width: 100%;
    height: 100%;
}
.my-obj-tp{
    height: 32rpx;
    align-items: center;
}
.my-obj-tp image{
    height: 100%;
}
.my-obj{
background:rgba(255,255,255,1);
border-radius:10px;
margin: 20rpx 22rpx;
}
.my-obj-it{
    align-items: center;
    border-bottom:1px solid rgba(240,240,240,1);
    padding: 35rpx 18rpx 35rpx 18rpx;
    font-size: 30rpx
}
.inx-model{
	padding-bottom: 40rpx
}
.inx-model-tt{
	font-size: 30rpx;
	justify-content: center;color:rgba(102,102,102,1);
	margin-bottom: 50rpx;
	padding: 40rpx 0 0 0
}
.inx-model-btn{
	font-size: 30rpx;
	background:rgba(253,208,0,1);
border-radius:22px;
width:190rpx;
text-align: center;
height:55rpx;
color:rgba(102,102,102,1);
}
.inx-model-close{
	justify-content: flex-end;
}
.inx-model-close image{
	height:24rpx;
	width:24rpx
}
</style>
