<template>
	<view>
		<view class="line1">脱狗服务订单</view>
		<view class="line2" @tap="changeShop">
			<view class="line2_left">
				<i class="iconfont icon-mendian1"></i>
				<text>{{shop.name}}</text>
			</view>
			<view class="line2_right">
				<image src="../../static/image/addr.png"></image>
				<view class="iconfont icon-xiayibu"></view>
			</view>
		</view>
		<view class="line3" v-for="(item,index) in data.order" :key="index">
			<!-- <image :src="item.commodity.commodity_image_thum"></image> -->
			<view class="image-box" :class="no_pic">
				<an-image :src="item.commodity.commodity_image_thum"  :alt="no_pic"></an-image>
			</view>
			
			<view class="l3_center">
				<view class="l3_c_top">{{item.commodity.commodity_name}}</view>
				<view class="l3_c_bottom">
					<text>X</text>
					<text>{{item.number}}</text>
				</view>
			</view>
			<text class="price">￥{{item.original_price}}</text>
		</view>
		<view class="line4" v-if="data.car">
			<text>洗车类型</text>
			<view class="l4_right">
				<text>川123123</text>
				<view class="iconfont icon-xiayibu"></view>
			</view>
		</view>
		<view class="line5" v-if="data.length > 0">
			<text>商品总价</text>
			<text>￥{{data.order_payment_price}}</text>
		</view>
		<view class="line4" v-if="data.coupon && data.coupon.length>0" @tap="choiceCoupons">
			<text>优惠卡券</text>
			<view class="l4_right">
				<text v-if="data.coupon_content.name && useCoupon">{{data.coupon_content.name}} -￥{{data.coupon_price}}</text>
				<text v-else style="color:#474747">暂无可用</text>
				<view class="iconfont icon-xiayibu"></view>
			</view>
		</view>
		<radio-group  @change.stop="radioChange" @tap="radios">
			<view class="line6">
				<text>立即使用</text>
				<radio  class="radioGroup" value="1" :checked="appointment_type==1" color="#FDD000" />
			</view>
			<view class="line6 line7">
				<text>预约接车到店</text>
				<radio  class="radioGroup" value="2"  color="#FDD000" />
			</view>
			<view class="line6 line8">
				<text>预约上门服务</text>
				<radio class="radioGroup" value="3"  color="#FDD000" />
			</view>
		</radio-group>

		<view class="fonter_h ">

		</view>
		<view class="footbtn" @tap="subOrder">提交订单</view>
	</view>
</template>

<script>
	import anImage from '@/components/an-image/an-image.vue'
	import {OrderModel} from "../../model/order";
	const  orderModel = new OrderModel()
	export default {
		name :'car_wash_buyOrder',
		components:{
            anImage
        },
		data(){
			return {
				no_pic:getApp().globalData.no_pic,
				confirm:'',
				data:[],
				appointment_type:1,
				shop:{},
				useCoupon:1,
				options:""
			}
		},
		onLoad(options){
			uni.setStorageSync('use_coupon',1)
			this.options = options
			this.__init()
		},
		onShow(){
			this.__init()
			this.useCoupon = uni.getStorageSync('use_coupon')
			if (uni.getStorageSync('shop')) {
				this.shop = JSON.parse(uni.getStorageSync('shop'))	
			}
		},
		methods:{
			__init(){
				uni.showLoading({
				title:'loading...',
				mask:true
				})
				if (!this.confirm) {
					let list = JSON.stringify(JSON.parse(this.options.data))
					this.confirm = list
				}
				
				let coupon_id = uni.getStorageSync('coupon_id')
				let form = {
					confirm:this.confirm,
					car_id:0,
					coupon_id:coupon_id,
					use_coupon : this.useCoupon
				}
				
				this._commitOrder(form)
			},
			radios(){
				return false
				let id = this.appointment_type
				if(id == 2 || id == 3) {
					uni.setStorageSync('appointments',null)
					uni.navigateTo({
						url:'/pagesC/car_wash_info/car_wash_info?id=' + id
					})
				} else {
					uni.setStorageSync('appointments',null)
				}
			},
			//单选
			radioChange(e){
				console.log(e)
				let id = e.detail.value
				this.appointment_type = id
				if(id == 2 || id == 3) {
					uni.setStorageSync('appointments',null)
					uni.navigateTo({
						url:'/pagesC/car_wash_info/car_wash_info'
					})
				} else {
					uni.setStorageSync('appointments',null)
				}
			},
			subOrder(){
				let coupon_id = uni.getStorageSync('coupon_id')
				let form = {
					confirm:this.confirm,
					car_id:0,
					coupon_id:coupon_id,
					use_coupon : this.useCoupon
				}
				form.appointment_type = this.appointment_type
				let appointment_data = uni.getStorageSync('appointments')
				form.appointment_data = appointment_data
				if(!appointment_data && form.appointment_type !=1){
					uni.showToast({
						title:'请完预约善信息',
						icon:'none'
					})
					return false
				}
				this._commitCreate(form)
			},
			_commitCreate(form){
				orderModel.createOrder(form).then((res) => {
					if(res.data){
						let data = res.data
						uni.navigateTo({
							url:'/pagesB/pay/pay?type=commodity&data='+ JSON.stringify(data.internal_payment_sn)
						})
					}
				})
			},
			_commitOrder(form){
				orderModel.commitOrder(form).then((res) => {
					uni.hideLoading()
					if(res.data){
						this.data = res.data
					}
				})
			},
			choiceCoupons()
			{
				uni.navigateTo({
					url:'/pagesB/choice_ticket/choice_ticket?confirm=' + this.confirm
				})
			},
			changeShop(){
				 uni.navigateTo({
        			url:`/pagesB/choice_store/choice_store`
      			 })
			}
		}
	}
</script>

<style>
	.radioGroup{
		width: 60rpx;
		text-align: center;
	}
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
		margin-top: 20rpx;
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

	.line3 .image-box {
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

	.line5 {
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

	.line5>text:first-child {
		color: #474747;
		font-size: 24.15rpx;
	}

	.line5>text:nth-child(2) {
		color: #333333;
		font-size: 27.77rpx;
		margin-right: 25rpx;
	}
	.fonter_h {
		height: 90rpx;
		margin-top: 12.68rpx;
	}
	.line6 {
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

	.line8{
		margin-top: 1rpx !important;
	}
	.line6>text:first-child {
		color: #474747;
		font-size: 24.15rpx;
	}

	.line6>image {
		color: #474747;
		width: 38rpx;
		height: 38rpx;
	}

	.footbtn {
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
