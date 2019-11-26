<template>
	<view class="index span24" @tap="closeModle">
		<view class="span24 index-notice">24小时在线服务</view>
		<view class="span24 index-hd">
		    <view class="index-hd-ct">
			    <uni-swiper-dot
        :info="info"
        :current="current"
        field="content"
        :mode="mode"
        :dotsStyles="dotsStyles"
		class="uni-swiper-dot"
      >
        <swiper class="swiper-box" @change="change">
          <swiper-item v-for="(item ,index) in info" :key="index">
            <view class="swiper-item">
              <image  :src='item.img'></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
			</view>
		</view>
		<view class="span24 index-geren"  @tap.stop="toOrder"><view class="index-wode"><image  mode="aspectFit" src='../../static/images/wode.png'></image></view>个人中心</view>
		<view class="span24">
			<view class="span24 index-sf">
				<image   mode="aspectFit" src='../../static/images/weixiu.png'></image>
				<view>{{type==1?'附近师傅':'全部师傅'}}<span>{{list.length}}</span>个</view>
				<view class="index-trg" @tap.stop="openShifu"></view>
				<view class="index-sffl" v-if="is_sf">
					<view :class="type==1?'index-sffl-it-ac':'index-sffl-it'" @tap.stop="switchShifu(1,$event)">附近师傅</view>
					<view :class="type==2?'index-sffl-it-ac':'index-sffl-it'" @tap.stop="switchShifu(2,$event)">全部师傅</view>
				</view>
				<view class="index-rz-sf" @tap.stop="toMaster">点击认证师傅端</view>
			</view>
			<view class="span24 index-sf-line">
				<view class="span24 index-fj-it" v-for="item in list" :key="item.id">
					<view class="span6 index-fj-touxiang"><image   mode="aspectFit" :src="item.head!=''?item.head:'../../static/images/touxiang.png'"></image></view>
					<view class="span18 index-fj-name">
						<view class="span24">
							<view class="span20" style="color:black">{{item.surname}}师傅</view>
							<view class="span4 index-fj-call"><image  @tap.stop="call(item,$event)"  mode="aspectFit" src='../../static/images/dianhua.png'></image></view>
						</view>
						<view class="span24">
							<view class="span12" style="color:black">工种：{{item.work_type?item.work_type:''}}</view>
							<view class="span12 index-fj-call" style="justify-content:flex-end">{{item.phone?item.phone:''}}</view>
						</view>
						<view class="span24">
							<view class="span12" style="color:black">距离：{{item.distance?toFiexdNum(item.distance/1000,$event)+'km':''}}</view>
							<view class="span12 index-fj-call" style="justify-content:flex-end"></view>
						</view>
					</view>
					<view class="index-fj-type">
						<image   mode="aspectFit" v-if="item.is_enterprise===0" src='../../static/images/geren.png'></image>
						<image   mode="aspectFit" v-else-if="item.is_enterprise===1" src='../../static/images/qiye.png'></image>
					</view>
				</view>
			</view>
		</view>
		<view class="span24 index-btm">
			<view class="index-yuyue" @tap.stop="toAppoint">立即预约</view>
		</view>
	</view>
</template>

<script>
import { uniSwiperDot } from "@dcloudio/uni-ui";
import {base_url} from '../../api/http'
	export default {
		data() {
			return {
				list:null,
				longitude:null,
				latitude:null,
				type:2,
				is_sf:false,
				info: [
        {
          img: "../../static/images/banner.png"
        },
        {
          img: "../../static/images/banner2.png"
        },
        {
          img: "../../static/images/banner3.png"
        }
	  ],
	  current: 0,
	  mode: "long",
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
	  },
			}
		},
		onPullDownRefresh(e){
			uni.showLoading({
    title: '刷新中'
});
			this.$http({ url:`api/home`,data:{
			lng:this.longitude,
			lat:this.latitude,
			type:this.type
          }}).then(res => {
			  setTimeout(()=>{
			   uni.hideLoading()
			   },1500)
			  this.list=res.data

          })
          .catch(res => { uni.hideLoading(
			   setTimeout(()=>{
			   uni.hideLoading()
			   },1500)
		  );});
		},
		onLoad() {
			let _this=this
			 uni.login({
          success: function(loginRes) {
            console.log(loginRes)
             uni.request({ url: `${base_url}api/login`,
             header: {
             'X-WX-Code': loginRes.code //自定义请求头信息
             },
             method:"post",
             success: (res) => {
				 uni.setStorageSync("skey", res.data.data.skey);
				 setTimeout(()=>{
					 uni.getLocation({
    type: 'wgs84',
    success: function (res) {
		_this.latitude=res.latitude
		_this.longitude=res.longitude
		_this.$http({ url:`api/home`,data:{
			lng:res.longitude,
			lat:res.latitude,
			type:_this.type
          }}).then(res => {
			  _this.list=res.data

          })
          .catch(res => {});
    }
});
			
			},1500)
             }
            })
          }
        });
			
		},
		components: { uniSwiperDot  },
		methods: {
			toFiexdNum(val){
				return val.toFixed(2)
			},
			closeModle(){
			  this.is_sf=false
			},
			openShifu(){
			  this.is_sf=!this.is_sf
			},
			switchShifu(val,e){
			  this.type=val
			  this.is_sf=!this.is_sf
			  this.$http({ url:`api/home`,data:{
			lng:this.longitude,
			lat:this.latitude,
			type:this.type
          }}).then(res => {
			  this.list=res.data

          })
          .catch(res => {});
			},
			change(e) {
      this.current = e.detail.current;
	},
			call(item,e){
				uni.makePhoneCall({
    phoneNumber: item.account 
});
			},
			toMaster(){
				uni.navigateTo({url: '/pages/master/master'});
			},
			toAppoint(){
				uni.navigateTo({url: '/pages/appointment/appointment'});
			},
			toOrder(){
				console.log("ss")
				uni.navigateTo({url: '/pages/order/order'});
			}
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.index-trg{
    width: 0;
    height: 0;
    border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 15rpx solid rgba(64,156,203,1);
	margin-left: 20rpx
}
.index-sffl{
	position: absolute;
	background:rgba(250,250,250,1);
	left: 67rpx;
	top:76rpx;
	z-index: 999;font-size:26rpx;
border-radius:5px;
}
.index-sffl-it-ac{
	background:#b0d4e7;width:205rpx;
height:50rpx;
}
.index-sffl-it{
	background: #f5f5f5;width:205rpx;
height:50rpx;
}
	.index {
		text-align: center;
		padding-bottom: 200rpx
	}
	.index-wode{
		z-index: 99;
		align-items: center;
		display: flex;
		margin-right: 21rpx
	}
	.index-wode image{
		width: 73rpx;
		height: 73rpx;
	}
	.index-hd{
		position: relative;
		height: 578rpx;
	}
	.index-hd-ct{
		width: 100%;
		height: 100%;
		position: relative
	}
	.index-hd-ct .uni-swiper__warp{
		height: 100%
	}
	.index-hd-ct swiper{
		height: 100%
	}
	.index-hd-ct .uni-swiper-dot{
	height: 100%;
  width: 100%;
}
.index-hd-ct .swiper-item {
  height: 100%;
  width: 100%;
}
.index-hd-ct .swiper-item image {
  width: 100%;
  height: 100%;
}
	.index-bg{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		
		height: 578rpx;
		z-index: -1;
	}
	.index-bg image{
		height: 100%;
		width: 100%
	}
	.index-quan{
		margin-left: auto;
		margin-right: auto;
		margin-top: 84rpx
	}
	.index-quan image{
		width: 404rpx;
		height: 404rpx;
	}
	.index-notice{
		padding: 14rpx 18rpx
	}
	.index-geren{
		background: white;
        font-size:26rpx;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
		padding: 5rpx 26rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center
	}
	.index-fj-it{
		background: white;
		padding: 9rpx 20rpx 20rpx 20rpx;
		border-radius:10rpx;
		margin-bottom: 20rpx;
		position: relative;
	}
	.index-sf{
		padding: 26rpx 0 26rpx 26rpx;
		align-items: center;
		position: relative
	}
	.index-sf-line{
		padding: 0 26rpx 0 26rpx;
		justify-content: space-between
	}
	.index-sf-line::after{
		content: ''; 
		border-radius:10rpx;
		width: 197rpx;
	}
	.index-sf image{
		width: 31rpx;
		height: 31rpx;
		margin-right: 22rpx
	}
	.index-sf > view{
        font-size:30rpx;
        color:rgba(51,51,51,1);
		font-weight: 600
	}
	.index-sf > view > span{
		color: #409CCB;
	}
	.index-fj-touxiang{
		justify-content: center;
		align-items: center
	}
	.index-fj-touxiang image{
		width: 106rpx;
		height: 106rpx;
	}
	.index-fj-name{
        font-size:28rpx;
        color:rgba(64,156,203,1);
		justify-content: center;
		border-radius:5rpx;
		margin-top: 28rpx
	}
	.index-fj-type{
		position: absolute;
		top: 0;
		left: 0;
	}
	.index-fj-type image{
		width: 65rpx;
		height: 52rpx;
	}
	.index-btm{
		position: fixed;
		bottom: 0;
		padding: 25rpx 0;
		padding-bottom:50rpx;
		background: white;
		justify-content: center
	}
	.index-yuyue{
		width:555rpx;
        background:rgba(64,156,203,1);
        border-radius:10rpx;
        font-size:30rpx;
		height: 65rpx;
		line-height: 65rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
	}
	.index-fj-call{
		justify-content: flex-end;
		padding-right: 20rpx
	}
	.index-fj-call image{
		width:30rpx;
		height: 30rpx;
	}
	.index-rz-sf{
width:212rpx;
position: absolute;
right: 26rpx;
height:45rpx;
background:rgba(64,156,203,1);
border-radius:10rpx;
font-size:24rpx !important;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1) !important;
	}
</style>
