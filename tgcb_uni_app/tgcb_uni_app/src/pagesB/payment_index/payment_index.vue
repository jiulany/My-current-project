<template>
	<!-- =========================钱包=================== -->
	<view class="content">
		<view class="login">
			<view class="l_top" style="margin-bottom:100upx;">
				<view class="l_text">请输入6位支付密码，注意不要重复或连续数字</view>
			</view>
			<view class="l_top">
				<view class="mima">
					<view class="item">
						<view v-if="len<=0" :class="{line:show}"></view>
						<view v-if="len>=1" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==1" :class="{line:show}"></view>
						<view v-if="len>=2" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==2" :class="{line:show}"></view>
						<view v-if="len>=3" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==3" :class="{line:show}"></view>
						<view v-if="len>=4" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==4" :class="{line:show}"></view>
						<view v-if="len>=5" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==5" :class="{line:show}"></view>
						<view v-if="len>=6" class="dot"></view>

					</view>
					<view v-if="len>5" class="dot">{{numlength}}</view>
					<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
					 v-model="trade_pwd" />
				</view>
			</view>
		</view>
		<view class="keypan">
			<view class="titles">
				<span @click="back()">取消</span>
				<span @click='setpwd'>确认</span>
			</view>
			<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key']" v-for="(items,index) in boardlists"
			 :key="index" @click="writepwd(items.id)">{{items.con}}</view>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapActions,
		mapState
	} from 'vuex';

	import {UserModel} from '../../model/user.js'
	import {OrderModel} from '../../model/order.js'
	const userModel = new UserModel();
	const orderModel = new OrderModel();
	export default {

		// computed: {
		// 	// ...mapGetters(['statusBarHeight'])
		// 	...mapState(['statusBarHeight'])
		// },
		data() {
			return {
				trade_pwd: '',
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				nextsteep: false,
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "x",
						checked: false
					},

				],
				order_id:0,
				internal_payment_sn:''
			};
		},
		computed: {
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的

				}
				return this.trade_pwd.length
			}
		},
		
		methods: {
			writepwd(num) {
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				this.numarr.push(num);
				if (this.numarr.length > 6) {
					return
				}
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");


			},
			//密码框
			back() {
				uni.navigateBack();
			},
			//回退方法
			close() {
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
			},
			blur1() {
				this.show = false
			},
			focus1() {

				this.show = true
			},

			// 确认执行的方法
			setpwd() {
				if (this.trade_pwd.length < 6) {
					console.log('密码长度不能少于6位');
					return;
				}
				// 密码长度为6位以后执行方法
				console.log(this.trade_pwd);
				let params = {
					password : this.trade_pwd
				}
				userModel.checkPassword(params).then((res) => {
						let data = res.data
						if (data.status) {
							console.log(this.internal_payment_sn)
							if (this.order_id) {
								params = {
									order_id:this.order_id
								}
							}
							if (this.internal_payment_sn) {
								console.log('进来了')
								params = {
									internal_payment_sn:this.internal_payment_sn
								}
							}
							
							orderModel.yuonpay(params).then((res) => {
								if (res.code == 200) {
									uni.showToast({
										title:'支付成功',
									})
									let url;
									if (this.internal_payment_sn) {
										url = `/pagesC/payment_finish/payment_finish?internal_payment_sn=${this.internal_payment_sn}`
									} else {
										url = `/pagesC/payment_finish/payment_finish?order_id=${this.order_id}`
									}
									setTimeout(()=>{
										uni.navigateTo({
											url: url
										})
									},2000)
								}
							})
							
						} else {
							uni.showToast({
								title:'密码错误',
								icon:'none'
							})
						}
				})
				
			},

		},
		onLoad:function(opiton) {
			console.log(opiton)
			if (opiton.order_id) {
				this.order_id = opiton.order_id
			}
			if (opiton.internal_payment_sn) {
				this.internal_payment_sn = opiton.internal_payment_sn
			}
		},

	};
</script>
<style lang="scss" scoped>
	.content {
		width: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100vh;
		font-weight: 400;

		.keypan {
			width: 100%;
			height: 500upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #E6E6E6;

			.titles {
				width: 90%;
				height: 80upx;
				background: #E6E6E6;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				color: #292824;

				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.pan_num_key {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				background: #fff;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);

			}

			.pan_num_checked {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);
				animation: checked_bg 0.08s ease;
			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			height: 300upx;

			.l_top {
				width: 700upx;
				height: 200upx;
				margin: 0 auto;
				position: relative;

				.l_text {
					width: 445upx;
					height: 69upx;
					font-size: 28upx;
					text-align: center;
					margin: auto;
					top: 100upx;
					position: relative;

				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {

			flex-direction: row;
			width: 680upx;
			height: 78upx;
			margin: 0 auto;
			position: relative;

			.item {
				width: 92upx;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				float: left;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #E5E5E5;
				margin-left: 20upx;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
