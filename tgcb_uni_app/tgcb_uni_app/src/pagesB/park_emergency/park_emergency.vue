<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :scale="scale"  :longitude="longitude" :markers="markers" >
		<cover-view class="addr_txt">
			<cover-view class="at_txt1">当前位置</cover-view>
			<cover-view class="at_txt2">{{address}}</cover-view>
		</cover-view>
		<cover-view class="scale">
			<cover-view class="scale_item" @click="scale_add">+</cover-view>
			<cover-view class="scale_item" @click="scale_edd">-</cover-view>
		</cover-view>
		<!--会员权益-->
		<cover-image @click="_to_vip_buy" class="stop" src="https://imgcdn.tuogouchebao.com/yingjitingche.png"></cover-image>
		<!-- <cover-view class="foot_btn" @click="stop_go"> -->
		<cover-view class="foot_btn" @click="parking">
			停在这里
		</cover-view>
		
		<cover-view class="mengban" v-show="choicePopup || failPopup" @tap="closePopup">
			
		</cover-view>

		<!-- 请购买会员 -->
		<cover-view class="hint_box" v-show="!choicePopup && failPopup" >
				<cover-view class="hb_line1">温馨提示</cover-view>
				<cover-view class="hb_line2">停车失败，请先购买会员权益！</cover-view>
				<cover-view class="hb_line3" @click="_to_vip_buy">去购买</cover-view>
		</cover-view>

		<!-- 选择车辆 -->
		<cover-view class="hint2_box" v-show="choicePopup" @tap="closeChoicePopup">
			<cover-view class="h2b_line1">
				<cover-view>{{choiceCar.car_num}}</cover-view>
				<cover-view v-if="choiceCar.parking_car && choiceCar.parking_car.day_num > 0" class="vip-button">已成会员</cover-view>
			</cover-view>
			<cover-view class="h2b_line2">
				<cover-view class="h2l">选择车辆</cover-view>
				<cover-view class="h2l_list" v-for="(item,index) in carList" :key="index" @tap="choice(item)">
					<cover-image class="car_brand_image" :src="item.vehicle.brand.url"></cover-image>
					<cover-view>{{item.car_num}}</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class="yes_btn" @tap="choiceFinished">确定</cover-view>
			<cover-image :src="choiceCar.vehicle.brand.url" class="topleft_icon"></cover-image>
		</cover-view>
		
		</map>
	</view>
</template>

<script>
import {IndexModel} from '../../model/index'
import {UserModel} from '../../model/user'
const indexModel = new IndexModel()
const userModel = new UserModel()
	export default {
		data() {
			return {
				choicePopup:false,
				failPopup:false,
				scale:18,
				title: 'map',
				address:'',
				latitude: 30.674958,
				longitude: 104.064283,
				markers: [],
				carList:[],
				choiceCar:""
			}
		},
		methods: {
			_to_vip_buy(){
				this.choicePopup = false;
				this.failPopup = false;
				uni.navigateTo({
					url:'/pagesC/vip_buy/vip_buy'
				})
			},
			// 地图放大
			scale_add(){
				this.scale = this.scale < 20 ? this.scale + 2 : 20
			},
			// 地图缩小
			scale_edd(){
				this.scale = this.scale > 4 ? this.scale - 2 : 4
			},
			// 停车
			parking()
			{
				userModel.getCars().then((res) => {
					this.carList = res.data
					if (!this.choiceCar) {
						this.choiceCar = res.data[0]
					}
					this.choicePopup = true
				})
			},
			// 选择汽车
			choice(item){
				this.choiceCar = item
			},
			// 确定
			choiceFinished(){
				this.choicePopup = false
				if (this.choiceCar.parking_car && this.choiceCar.parking_car.day_num > 0) {
					let params = {
						car_num:this.choiceCar.car_num,
						address:this.address,
						longitude:this.longitude,
						latitude:this.latitude,
					}
					console.log(params)
					indexModel.parking(params).then((res) => {
						uni.showToast({
							title : res.message,
							icon : 'none'
						})
					})
				} else {
					this.failPopup = true;
				}
			},
			closePopup(){
				this.choicePopup = false;
				this.failPopup = false;
			},
			
		},
		onShow(){
			 	let self = this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success: function (res) {
						// fixMe 获取address
						console.log(res)
						self.longitude = res.longitude
						self.latitude = res.latitude
						// this.address = res.address
						self.markers.push({
							iconPath :"https://imgcdn.tuogouchebao.com/location_icon.png",
							width:24,
							height:35,
							longitude:self.longitude,
							latitude:self.latitude,
						})
					}
				}); 
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
	}
	.addr_txt{
		width: 688.4rpx;
		height: 84.54rpx;
		margin: 0 auto;
		background: #FFFFFF;
		margin-top: 13.28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.at_txt1{
		color: #FDD000;
		font-size: 21.73rpx;
	}
	.at_txt2{
		color: #474747;
		font-size: 24.15rpx;
		margin-top: 13.28rpx;
	}
	.foot_btn{
		height: 84.54rpx;
		background: #FDD000;
		color: #FFFFFF;
		font-size: 28.98rpx;
		position: fixed;
		bottom: 0;
		text-align: center;
		line-height: 84.54rpx;
		width: 100%;
	}
	.hint_box{
		width:618.35rpx;
		height:385.26rpx;
		background:rgba(255,255,255,1);
		border-radius:4.83rpx;
		text-align: center;
		top: 447.46rpx;
		left: 65.83rpx;
		position: absolute;
		z-index: 1;
	}
	.hb_line1{
		color: #FDD000;
		font-size: 28.98rpx;
		margin-top: 32.6rpx;
	}
	.hb_line2{
		color: #474747;
		font-size: 25.36rpx;
		margin-top: 64rpx;
	}
	.hb_line3{
		width:544.08rpx;
		height:71.85rpx;
		background:rgba(253,208,0,1);
		border-radius:4.83rpx;
		color: #474747;
		font-size: 28.98rpx;
		text-align: center;
		line-height: 71.85rpx;
		margin: 93.59rpx auto 0 auto;
	}
	.hint2_box{
		width:618.35rpx;
		background:rgba(255,255,255,1);
		border-radius:8rpx;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		position: absolute;
		z-index: 1;
	}
	.h2b_line1{
		display: flex;
		justify-content: space-between;
		height: 109.9rpx;
		align-items: center;
		border-bottom: 1px solid #F5F5F5;
		padding: 0 26.57rpx 0 99.63rpx;
	}
	.h2b_line1>text{
		color: #666666;
		font-size: 39.85rpx;
	}
	.h2b_line1 .vip-button{
		width:157.6rpx;
		height:57.36rpx;
		background:rgba(253,208,0,1);
		border-radius:6.03rpx;
		color: #FFFFFF;
		font-size: 30.19rpx;
		text-align: center;
		line-height: 57.36rpx;
	}
	.h2l{
		color: #666666;
		font-size: 28.98rpx;
		margin-top: 14.49rpx;
	}
	.h2l_list{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 41.17rpx;
	}
	.car_brand_image{
		width: 35.02rpx;
		height: 35.02rpx;
		margin-right: 20rpx;

	}
	.h2l_list>text{
		color: #666666;
		font-size: 28.98rpx;
		margin-left: 18.11rpx;
	}
	.h2l{
		text-align: center;
	}
	.yes_btn{
		width:152.77rpx;
		height:45.89rpx;
		background:rgba(253,208,0,1);
		border-radius:6.03rpx;
		color: #FFFFFF;
		font-size: 28.98rpx;
		text-align: center;
		line-height: 45.89rpx;
		margin: 21.73rpx auto 12.68rpx auto;
	}
	.mengban{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.1);
	}
	.topleft_icon{
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		top: 120rpx;
		left: 54.34rpx;
	}
	.scale{
		font-size: 50rpx;
		text-align: center;
		position: fixed;
		right: 20rpx;
		width: 60rpx;
		height: 150rpx;
		background: #FDD000;
		bottom: 345rpx;
	}
	.scale_item{
		height: 75rpx;
		line-height: 75rpx;
	}
	.scale_item:first-child{
		border-bottom: solid 1rpx #FFFFFF;
	}
	.stop{
		width:155rpx;
		height:195rpx;
		position: fixed;
		top:300rpx;
		left: 28rpx;
		text-align: center;
	}


</style>
