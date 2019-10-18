<template>
	<view>
		<view class="line1">凭订单信息到店自提</view>
		<view class="line2">
			<view class="line2_left">
				<image src="../../static/image/addr.png"></image>
				<text>{{shop.name}}</text>
			</view>
			<view class="line2_right">
				<image src="../../static/image/addr.png"></image>
				<view class="iconfont icon-xiayibu"></view>
			</view>
		</view>
		<view class="line3">
			<image :src="cover"></image>
			<view class="l3_center">
				<view class="l3_c_top">{{name}}</view>
				<view class="suk_name">{{sku_name}}</view>
				<view class="l3_c_bottom">
					<text>X</text>
					<text>1</text>
				</view>
			</view>
			<text class="price">￥{{price}}</text>
		</view>
		<view class="line4" @tap="change">
			<text>更换车辆</text>
			<view class="l4_right">
				<text>{{choose_car.car_num}}</text>
				<view class="iconfont icon-xiayibu"></view>
			</view>
		</view>
		<view class="line5">
			<text>实付款</text>
			<text>￥{{price}}</text>
		</view>
<!--		<view class="line6">-->
<!--			<text>订单编号</text>-->
<!--			<text>123456789101</text>-->
<!--		</view>-->
		<view class="footbtn" @tap="submitOrder">提交订单</view>
	</view>
</template>

<script>
	import {StopCarModel} from "../../model/stopCar";
	const  stopCarModel = new StopCarModel()
	import {OrderModel} from "../../model/order";
	const  orderModel = new OrderModel()
	export default {
		name:'vip_buy_order',
		data(){
			return {
				list:[],
				name:"",
				price:"",
				cover:"",
				sku_name:"",
				type:"",
				choose_car:"",
				shop:{}
			}
		},
		methods: {
			change(){
				uni.navigateTo({
					url: "/pagesA/my_car/my_car?type=car_check"
				});
			},
			submitOrder(){
				if (this.type == 'package') {
					let data = {
						package_id:this.list.id,
						car_num:this.choose_car.car_num
					}
					this._commitPackageCreate(data)
				} else {
					let data = {
						sku_id:this.list.id,
						car_num:this.choose_car.car_num
					}
					this._commitParkingCreate(data)
				}
				
			},
			_commitParkingCreate(form){
				orderModel.parkingCreateOrder(form).then((res) => {
					if(res.data){
						let data = res.data
						uni.navigateTo({
							url:'/pagesB/pay/pay?type=commodity&data='+ JSON.stringify(data.internal_payment_sn)
						})
					}
				})
			},
			_commitPackageCreate(form){
				orderModel.packageCreateOrder(form).then((res) => {
					if(res.data){
						let data = res.data
						uni.navigateTo({
							url:'/pagesB/pay/pay?type=commodity&data='+ JSON.stringify(data.internal_payment_sn)
						})
					}
				})
			},
			// 加载 应急停车订单
			_confirmOrder(id){
				let data = {
					id:id
				}
				stopCarModel.commitOrder(data).then((res) => {
					if(res.data) {
						this.list = res.data
						this.name = res.data.commodity.commodity_name
						this.cover = res.data.commodity.commodity_image_thum
						this.price = res.data.original_price
						this.sku_name = res.data.sku_name
						if(res.data.user_cars.length >0 ) {
							this.choose_car = this.list.user_cars[0]
						}
					}
				})
			},
			// 加载 套餐订单
			__packageConfirmOrder(params)
			{
				let data = {
					id : params.id,
					car_type : 1
				}
				stopCarModel.commitPackageOrder(data).then((res)=>{
					let data = res.data;
					this.list = data
					this.name = data.name
					this.cover = data.cover
					this.price = data.price.price
					if(data.user_cars.length >0 ) {
						this.choose_car = list.user_cars[0]
					}
				})
			}
		},
		onLoad(data){
			console.log(data)
			if (data.type == 'package') {
				this.type = data.type
				this.__packageConfirmOrder(data)
			} else {
				this._confirmOrder(data.id)
			}
			
		},
		onShow(){
			  let choice_car = uni.getStorageSync("choice_car");
				if (choice_car) {
					this.choose_car = JSON.parse(choice_car);
					console.log(this.choose_car);
				}

				if (uni.getStorageSync('shop')) {
					this.shop = JSON.parse(uni.getStorageSync('shop'))	
				}
			
		}
	}
</script>

<style>
	.line1 {
		width: 701.69rpx;
		height: 121.37rpx;
		background: rgba(253, 208, 0, 1);
		margin: 0 auto;
		line-height: 121.37rpx;
		text-align: center;
		color: #474747;
		font-size: 36.23rpx;
		margin-top: 36.23rpx;
	}
.suk_name{
	color: #999;
}
	.line2 {
		margin: 0 auto;
		width: 702.29rpx;
		height: 82.12rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1.2rpx 2.41rpx 0px rgba(0, 0, 0, 0.04);
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding: 0 18.11rpx; */
		padding-left: 18.11rpx;
		box-sizing: border-box;
		margin-top: 51.32rpx;
	}

	.line2>view {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.line2_left>image:first-child {
		width: 36.23rpx;
		height: 36.23rpx;
	}

	.line2_left>text:nth-child(2) {
		color: #474747;
		font-size: 27.77rpx;
		margin-left: 18rpx;
	}

	.line2_right>image:first-child {
		width: 44rpx;
		height: 44rpx;
	}

	.line2_right>image:nth-child(2) {
		width: 58rpx;
		height: 58rpx;
		margin-left: 24.15rpx;
	}

	.line3 {
		width: 702.29rpx;
		height: 174.51rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1.2rpx 2.41rpx 0px rgba(0, 0, 0, 0.04);
		margin: 0 auto;
		margin-top: 12.07rpx;
		display: flex;
		align-items: center;
		padding: 0 23.55rpx 0 18.11rpx;
		box-sizing: border-box;
		position: relative;
	}

	.line3>image {
		width: 114.13rpx;
		height: 114.13rpx;
	}

	.l3_center {
		height: 130rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 30.79rpx;
	}

	.l3_c_top {
		color: #474747;
		font-size: 24.15rpx;
	}
	.suk_name{
		font-size: 21rpx;
	}
	.l3_c_bottom>text:first-child {
		color: #909090;
		font-size: 21.73rpx;
	}

	.l3_c_bottom>text:nth-child(2) {
		color: #909090;
		font-size: 28.98rpx;
	}

	.price {
		color: #F75C3E;
		font-size: 27.77rpx;
		position: absolute;
		right: 23.55rpx;
		bottom: 32rpx;
	}

	.line4 {
		width: 702.29rpx;
		height: 82.12rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1.2rpx 2.41rpx 0px rgba(0, 0, 0, 0.04);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 18.11rpx;
		box-sizing: border-box;
		margin-top: 3.01rpx;
	}

	.line4>text {
		color: #474747;
		font-size: 24.15rpx;
	}

	.l4_right {
		display: flex;
		align-items: center;

	}

	.l4_right>text {
		color: #474747;
		font-size: 27.77rpx;
	}

	.l4_right>image {
		width: 58rpx;
		height: 58rpx;
	}
	.line5{
				width: 702.29rpx;
		height: 82.12rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1.2rpx 2.41rpx 0px rgba(0, 0, 0, 0.04);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 18.11rpx;
		box-sizing: border-box;
		margin-top: 3.01rpx;
	}
	.line5>text:first-child{
		color: #474747;
		font-size: 24.15rpx;
	}
	.line5>text:nth-child(2){
		color: #F75C3E;
		font-size: 27.77rpx;
	}
	.line6{
						width: 702.29rpx;
		height: 82.12rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1.2rpx 2.41rpx 0px rgba(0, 0, 0, 0.04);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 18.11rpx;
		box-sizing: border-box;
		margin-top: 12.68rpx;
	}
		.line6>text:first-child{
		color: #474747;
		font-size: 24.15rpx;
	}
	.line6>text:nth-child(2){
		color: #474747;
		font-size: 27.77rpx;
	}
	.footbtn{
		width: 100%;
		height: 88.16rpx;
		text-align: center;
		line-height: 88.16rpx;
		color: #474747;
		font-size: 36.23rpx;
		background: #FDD000;
		position: fixed;
		bottom: 0;
	}
</style>
