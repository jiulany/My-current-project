<template>
	<view>
		<form @submit="formSubmit">
		<view class="onebox">
			<view class="onebox_list">
				<text>预约人姓名</text>
				<input placeholder="填写预约人姓名" name="name" placeholder-class="pclass" @change="nameChange"/>
			</view>
			<view class="onebox_list">
				<text>预约人电话</text>
				<input type="number" placeholder="填写预约人电话号码" name="phone" placeholder-class="pclass" @change="phoneChange"/>
			</view>
			<view class="onebox_list" @tap="selectStores">
				<text>服务门店</text>
				<!-- <picker @change="bindPickerChange" :value="index" name="shop_id" :range="array" class="shop_select">
					<view class="uni-input">{{array[index]}}</view>
				</picker> -->
				<view >{{ selectedStore.name ? selectedStore.name : "请选择服务门店"}}</view>
			</view>
		</view>
		<radio-group name="type" @change="radioChange">
			<view class="twobox">
				<view v-if="id == 2">
					<view class="tb1">
						<!-- <radio class="radio_btn" value="1"  color="#FDD000" /> -->
						<text>预约接送车</text>
					</view>
					<view class="tb2">
						<text>接车地址</text>
						<input name="address"/>
						<view class="iconfont icon-xiayibu"></view>
					</view>
					<view class="tb2">
						<text>接车时间</text>
						<dy-Datetime-Picker :placeholder="placeholder" :minTime="minTime" :maxTime="maxTime" :maxDate="defaultMaxDate" :minDate="defaultMinDate" @getData="getData"
						:timeIntervalMsec="timeIntervalMsec" :type="timeType" ></dy-Datetime-Picker>
						<view class="iconfont icon-xiayibu"></view>
					</view>
				</view>

				<view v-else>
					<view class="tb4">
						<!-- <radio class="radio_btn" value="2"  color="#FDD000" /> -->
						<text>预约到店</text>
					</view>
					<view class="tb2">
						<text>到店时间</text>
						<dy-Datetime-Picker :placeholder="placeholder" :maxDate="defaultMaxDate" :minDate="defaultMinDate" @getData="getData"
						:timeIntervalMsec="timeIntervalMsec" :type="timeType"></dy-Datetime-Picker>
						<view class="iconfont icon-xiayibu"></view>
					</view>
				</view>
			</view>
		</radio-group>
		<textarea placeholder="请在这里告诉我们您对爱车的保养需求哦~" name="remarks" placeholder-style="color:#999999;font-size:28rpx" maxlength="50" @input="textAreaChange"></textarea>
			<button formType="submit" class="finish_btn">完成</button>
		</form>
		<select-store v-if="selectStorePopup" :showPopup="selectStorePopup" @close="closeStorePopup" @save="saveStorePopup"></select-store>
	</view>
</template>

<script>
	import selectStore from "../../components/select-store/select-store"
	import {OrderModel} from '../../model/order'
	const orderModel = new OrderModel()
	import dyDatetimePicker from '../../components/lanxiujuan-dyDateTime/lanxiujuan-dyDateTime.vue'
	export default {
		components: {
			dyDatetimePicker,
			selectStore
		},
		data() {
			return {
				childValue: '2013/10/12 03:30',
				placeholder: '请选择接车时间',
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
				service_time:'',
				id:2,
				name: '',
				phone: '',
				text: '',
				selectStorePopup:false,
				selectedStore:{}
			}
		},

		methods: {
			nameChange(e) {
				this.name = e.detail.value;
			},
			phoneChange(e) {
				this.phone = e.detail.value;
			},
			textAreaChange(e) {
				this.text = e.detail.value;
				if(this.text.length == 50) {
					uni.showToast({
						title: '最多输入50字',
						icon: 'none'
					});
				}
			},
			formSubmit(e){
				if(!(/^[\u4e00-\u9fa5]{0,}$/).test(this.name)) {
					uni.showToast({
						title: '名字只能包含中文',
						icon: 'none'
					});
				}else if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
				}else if(JSON.stringify(this.selectedStore) == '{}'){	
					uni.showToast({
						title: '请选择服务门店',
						icon: 'none'
					});
				}else if(this.service_time == ''){
					uni.showToast({
						title: '请选择服务时间',
						icon: 'none'
					});
				}else {
					let form = e.detail.value
					console.log(form)
					form.service_time = this.service_time
					form.shop_name = this.selectedStore.name
					form.shop_id = this.selectedStore.id
					uni.setStorageSync('appointments',JSON.stringify(form))
					console.log(form)
					uni.navigateBack({
						delta:1
					})
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			getData(time) {
				this.service_time = time
			},
			// 选择店铺
			selectStores(){
				console.log('select')
				this.selectStorePopup = true;
			},
			closeStorePopup(){
				console.log('close')
				this.selectStorePopup = false;
			},
			saveStorePopup(selectedStore)
			{
				this.selectStorePopup = false;
				this.selectedStore = selectedStore;
			}
		},
		onLoad(options){
			this.id = options.id
			uni.showModal({
				title: '温馨提示',
				content: '每晚20:00前预约请提前半小时提交申请,20:00后请提前2小时预约',
				success(res) {
					
				}
			})
		},
		onShow() {
			console.log(this.minTime);
			let hour = new Date().getHours();
			let minute = new Date().getMinutes();
			if(hour < 20) {
				let time = new Date().getTime();
				let leadTime = 30*60*1000; //30分钟
				let minTime = new Date(time - leadTime);
				let minHour = minTime.getHours();
				let minMinute = minTime.getMinutes();
				let minMinutes = parseInt(minMinute) > 10 ? minMinute : '0' + minMinute
				let minTimes = minHour + ':' + minMinutes
				this.minTime = minTimes;
				this.defaultValue = minTimes;
				console.log(this.minTime);
			}
			if(hour > 20) {
				let time = new Date().getTime();
				let leadTime = 120*60*1000;
				let minTime = new Date(time - leadTime);
				let minHour = minTime.getHours();
				let minMinute = minTime.getMinutes();
				let minMinutes = parseInt(minMinute) > 10 ? minMinute : '0' + minMinute
				let minTimes = minHour + ':' + minMinutes
				this.minTime = minTimes;
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
		margin-right: 20rpx;
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
