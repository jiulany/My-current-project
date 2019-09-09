<template>
	<view>
		<form @submit="formSubmit">
		<view class="onebox">
			<view class="onebox_list">
				<text>预约人姓名</text>
				<input placeholder="填写预约人姓名" name="name" placeholder-class="pclass" />
			</view>
			<view class="onebox_list">
				<text>预约人电话</text>
				<input type="number" placeholder="填写预约人电话号码" name="phone" placeholder-class="pclass" />
			</view>
			<view class="onebox_list" >
				<text>服务门店</text>
				<picker @change="bindPickerChange" :value="index" name="shop_id" :range="array" class="shop_select">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
			<!-- 			<view class="uni-list-cell-db">

			</view> -->
		</view>
		<radio-group name="type" @change="radioChange">
			<view class="twobox">
			<view class="tb1">
				<radio class="radio_btn" value="1"  color="#FDD000" />
				<text>预约接送车</text>
			</view>
			<view class="tb2">
				<text>接车地址</text>
				<input name="address"/>
				<image src="../../static/image/right.png"></image>
			</view>
			<view class="tb2">
				<text>接车时间</text>
				<dy-Datetime-Picker :placeholder="placeholder" :maxDate="defaultMaxDate" :minDate="defaultMinDate" @getData="getData"
				 :timeIntervalMsec="timeIntervalMsec" :type="timeType"></dy-Datetime-Picker>
				<image src="../../static/image/right.png"></image>
			</view>
			<view class="tb4">
				<radio class="radio_btn" value="2"  color="#FDD000" />
				<text>预约到店</text>
			</view>
			<view class="tb2">
				<text>到店时间</text>
				<dy-Datetime-Picker :placeholder="placeholder" :maxDate="defaultMaxDate" :minDate="defaultMinDate" @getData="getData"
				 :timeIntervalMsec="timeIntervalMsec" :type="timeType"></dy-Datetime-Picker>
				<image src="../../static/image/right.png"></image>
			</view>
		</view>
		</radio-group>
		<textarea placeholder="请在这里告诉我们您对爱车的保养需求哦~" name="remarks" placeholder-style="color:#999999;font-size:28rpx" maxlength="-1"></textarea>
			<button formType="submit" class="finish_btn">完成</button>
		</form>
	</view>
</template>

<script>
	import {OrderModel} from '../../model/order'
	const orderModel = new OrderModel()
	import dyDatetimePicker from '../../components/lanxiujuan-dyDateTime/lanxiujuan-dyDateTime.vue'
	export default {
		components: {
			dyDatetimePicker
		},
		data() {
			return {

				childValue: '2013/10/12 03:30',
				placeholder: '请选择',

				defaultMinDate: new Date('2016/1/1').getTime(),
				defaultMaxDate: new Date('2026/12/31').getTime(),
				// 最小时间
				minTime: '10:00',
				// 最大时间
				maxTime: '23:59',
				// 默认时间
				defaultValue: 0,
				// 用于判断是否显示默认的时间， 只有当日期时间都有固定值才为true
				isShowDefaultValue: false,
				// 时间固定选项
				timeOptions: [],
				// 时间类型
				timeType: 'anyTime',
				// 间隔的毫秒
				timeIntervalMsec: 20,
				fixedTimeAarr: [],
				datetimeKey: new Date().getTime(),
				title: 'picker',
				array: ['请选择','中国', '美国', '巴西', '日本'],
				index: 0,
				service_time:''
			}
		},

		methods: {
			radioChange(){

			},
			formSubmit(e){
				let form = e.detail.value
				form.service_time = this.service_time
				uni.setStorageSync('appointments',JSON.stringify(form))
				uni.navigateBack({
					delta:1
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			getData(time) {
				this.service_time = time
			}
		}
	}
</script>

<style>
	.onebox {
		background: #FFFFFF;
	}
	.radio_btn{
		width: 80rpx;
		text-align: center;
	}
	.onebox_list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 110rpx;
		padding: 0 22rpx;
		border-bottom: 1px solid #F6F6F6;
	}

	.onebox_list>text {
		color: #333333;
		font-size: 28rpx;
	}
	.shop_select{
		display: flex;
		flex: 1;
		justify-content: flex-end;
	}
	.pclass {
		color: #999999;
		font-size: 26rpx;
		text-align: right;
	}

	.twobox {
		background: #FFFFFF;
		margin-top: 20rpx;
	}

	.tb1 {
		display: flex;
		align-items: center;
		height: 110rpx;
		padding: 0 22rpx;
		border-bottom: 1px solid #F6F6F6;
	}

	.tb1>image {
		width: 38rpx;
		height: 38rpx;
	}

	.tb1>text {
		color: #333333;
		font-size: 28rpx;
		margin-left: 23rpx;
	}

	.tb2 {
		margin-left: 84rpx;
		display: flex;
		align-items: center;
		height: 110rpx;
		justify-content: space-between;
		border-bottom: 1px solid #F6F6F6;
	}

	.tb2>text {
		color: #333333;
		font-size: 28rpx;
	}

	.tb2>input {
		color: #333333;
		font-size: 24rpx;
		display: flex;
		flex: 1;
		margin: 0 20rpx;
	}

	.tb2>image {
		width: 22px;
		height: 22px;
	}

	.tb4 {
		display: flex;
		align-items: center;
		height: 110rpx;
		padding: 0 22rpx;
	}

	.tb4>.icon_yuan {
		width: 36rpx;
		height: 36rpx;
		border: 1px solid rgba(51, 51, 51, 1);
		border-radius: 50%;
	}

	.tb4>text {
		color: #333333;
		font-size: 28rpx;
		margin-left: 24rpx;
	}

	textarea {
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
		padding: 16rpx 23rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.finish_btn {
		width: 100%;
		height: 98rpx;
		color: #333333;
		font-size: 36rpx;
		background: #FDD100;
		text-align: center;
		line-height: 98rpx;
		position: fixed;
		bottom: 0;
	}
</style>
