<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :scale="scale"  :longitude="longitude" :markers="markers" >
		<cover-view class="addr_txt">
			<text class="at_txt1">当前位置</text>
			<text class="at_txt2">四川省成都市金牛区星辉中路20号</text>
		</cover-view>
		<cover-view class="scale">
			<cover-view class="scale_item" @click="scale_add">+</cover-view>
			<cover-view class="scale_item" @click="scale_edd">-</cover-view>
		</cover-view>
<!--			会员权益-->
		<cover-image @click="_stop_vip" class="stop" src="https://imgcdn.tuogouchebao.com/yingjitingche.png"></cover-image>
		<cover-view class="foot_btn" @click="stop_go">
			停在这里
		</cover-view>
		<cover-view class="mengban" v-show="!stop_vip && stop_start">
			<cover-view class="hint_box">
				<cover-view class="hb_line1">温馨提示</cover-view>
				<cover-view class="hb_line2">停车失败，请先购买会员权益！</cover-view>
				<cover-view class="hb_line3" @click="go_buy">去购买</cover-view>
			</cover-view>
		</cover-view>

		<cover-view class="mengban" v-show="stop_vip">
			<cover-view class="hint2_box">
				<view class="h2b_line1">
					<text>川A32413</text>
					<view>已成会员</view>
				</view>
				<view class="h2b_line2">
					<view class="h2l">选择车辆</view>
					<view class="h2l_list">
						<image src="../../static/img/tab_sle_shangcheng.png"></image>
						<text>川AFYS38 奔驰</text>
					</view>
					<view class="h2l_list">
						<image src="../../static/img/tab_sle_shangcheng.png"></image>
						<text>川AFYS38 奔驰</text>
					</view>
					<view class="h2l_list">
						<image src="../../static/img/tab_sle_shangcheng.png"></image>
						<text>川AFYS38 奔驰</text>
					</view>
				</view>
				<view class="yes_btn">确定</view>
				<image src="../../static/img/tab_sle_shangcheng.png" class="topleft_icon"></image>
			</cover-view>
		</cover-view>

		
		</map>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stop_vip:false,
				stop_start:false,
				scale:10,
				title: 'map',
				latitude: 30.674958,
				longitude: 104.064283,
				markers: [
					{
						iconPath: "/resources/others.png",
						id: 0,
						latitude: 30.689928,
						longitude: 104.049478,
						width: 50,
						height: 50
					},
					{
						id: 1,
						latitude: 30.689928,
						longitude: 104.049478,
						iconPath: '../../../static/location.png',
						width: 50,
						height: 50

					}, {
						id: 2,
						latitude: 39.90,
						longitude: 116.39,
						iconPath: '../../../static/location.png',
						width: 50,
						height: 50
					}]
			}
		},
		methods: {
			_stop_vip(){
				uni.navigateTo({
					url:'/pagesC/vip_buy/vip_buy'
				})
			},
			go_buy(){
				this.stop_vip = true
			},
			scale_add(){
				this.scale = this.scale < 20 ? this.scale + 2 : 20
			},
			scale_edd(){
				this.scale = this.scale > 4 ? this.scale - 2 : 4
			},
			stop_go(){
				this.stop_start = true
			}
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
		border-radius:4.83rpx;
		top: 447.46rpx;
		left: 65.83rpx;
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
	.h2b_line1>view{
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
		margin-top: 27.17rpx;
	}
	.h2l_list>image{
		width: 35.02rpx;
		height: 35.02rpx;
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
		width: 42.27rpx;
		height: 42.27rpx;
		top: 106rpx;
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
