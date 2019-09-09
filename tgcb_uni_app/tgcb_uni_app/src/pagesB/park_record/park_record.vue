<template>
	<view>
		<view class="content">
			<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black" select-class="bg-orange"></wuc-tab>
			<swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
			 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
				<swiper-item>
					<view class="park_con">
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right_success" @click="up_card">上传凭证</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>

					</view>
				</swiper-item>
				<swiper-item>
					<view class="park_con">
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已上传</text>
									<text>川A32413</text>
								</view>
							</view>
							<view class="pc_right">上传成功</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>审核通过</text>
								</view>
							</view>
							<view class="pc_right_success" @click="chackan">查看凭证</view>
						</view>
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text class="status_error">审核未通过</text>
									<text class="details">详情</text>
								</view>
							</view>
							<view class="pc_right_success">重新上传</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="park_con">
						<view class="park_list">
							<image src=""></image>
							<view class="pl_center">
								<view>2019-4-24 14:04</view>
								<view>四川省成都市金牛区星辉中路20号</view>
								<view class="pc_bottom">
									<text>已到帐</text>
									<text class="status_error"> +100.00元</text>
								</view>
							</view>
							<view class="pc_right_success" @click="chackan">查看凭证</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
<!--			查看凭证-->
<!--			<view class="see">-->
<!--				<view class="see_img">-->
<!--					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566089739124&di=0dc203746222abda5948f33c7185b390&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft01b6b028f82d9d29cb.jpg"></image>-->
<!--				</view>-->
<!--			</view>-->
		</view>
<!--审核未通过原因-->
<!--		<view class="mengban">-->
<!--			<view class="fail_box">-->
<!--				<view class="fb1">-->
<!--					<image src="../../static/image/cha.png"></image>-->
<!--				</view>-->
<!--				<image src="https://imgcdn.tuogouchebao.com/shenheweitongguo.png" class="fb2"></image>-->
<!--				<view class="fb3">审核未通过原因</view>-->
<!--				<view class="fb4">1.该违章记录不存在，请确认违章记录存在之后重新上传。</view>-->
<!--			</view>-->
<!--		</view>-->
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab2.vue';
	export default {
		data() {
			return {
				TabCur3: 0,
				tabList3: [{
					name: '全部'
				}, {
					name: '已上传'
				}, {
					name: '已到账'
				}],
			}
		},
		components: {
			WucTab
		},
		methods: {
			up_card(){
				uni.navigateTo({
					url:'/pages/park_upload/park_upload'
				})
			},
			swiperChange3(e) {
				let {
					current
				} = e.target;
				this.TabCur3 = current;
			},
		}
	}
</script>

<style>
	.content,swiper{
		height: 84vh;
	}
	page {
		overflow: hidden;
		background: #FFFFFF;
	}
	swiper-item{
		overflow: hidden;
}
	.park_con{
		width: 100%;
		position: absolute;
		overflow: scroll;
		height: 85vh;
	}
	.park_list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 34rpx 16.93rpx 34rpx 38.71rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.park_list:last-child{
		border-bottom: none;
	}
	.park_list:first-of-type{
		margin-top: 0 !important;
	}
	.park_list>image {
		width: 106.47rpx;
		height: 106.47rpx;
		border-radius: 50%;
	}

	.pl_center>view:first-child {
		font-size: 22.98rpx;
		color: #474747;
	}

	.pl_center>view:nth-child(2) {
		color: #474747;
		font-size: 22.98rpx;
	}

	.pc_bottom>text {
		color: #909090;
		font-size: 22.98rpx;
	}

	.pc_bottom>text:nth-child(2) {
		margin-left: 24rpx;
	}

	.pc_right {
		width: 163.94rpx;
		height: 52.02rpx;
		border: 1px solid rgba(253, 208, 0, 1);
		border-radius: 4.83rpx;
		color: #FDD000;
		font-size: 22.98rpx;
		text-align: center;
		line-height: 52.02rpx;
	}
	.pc_right_success {
		width: 163.94rpx;
		height: 52.02rpx;
		border: 1px solid rgba(71,71,71,1);
		border-radius: 4.83rpx;
		color: #474747;
		font-size: 22.98rpx;
		text-align: center;
		line-height: 52.02rpx;
	}
	.mengban{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 1;
	}
	.fail_box{
		width: 652.75rpx;
		height: 804.59rpx;
		background: #FFFFFF;
		z-index: 2;
		position: absolute;
		left: 48.39rpx;
		top: 156rpx;
		border-radius: 4.83rpx;
		padding: 27.82rpx;
		box-sizing: border-box;
	}
	.fb1{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.fb1>image{
		width: 30.24rpx;
		height: 30.24rpx;
	}
	.fb2{
		width: 175.43rpx;
		height: 174.22rpx;
		display: block;
		margin: 0 auto;
	}
	.fb3{
		color: #E84242;
		font-size: 29.03rpx;
		text-align: center;
		margin-top: 24.8rpx;
	}
	.fb4{
		color: #474747;
		font-size: 29.03rpx;
		margin-top: 45.97rpx;
	}
	.text-center .wuc-tab-item{
		height: 7.5vh !important;
		line-height: 8vh !important;
	}
	.status_error{
		color: #D91313 !important;
	}
	.details{
		background:rgba(224,224,224,1);
		padding: 5rpx 10rpx;
		color: #474747 !important;
		border-radius:5px;
		width:51rpx;
		height:25rpx;
		font-size: 18rpx !important;
	}
	.see{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:rgba(153,153,153,0.8);
	}
	.see_img{
		width:512rpx;
		height:676rpx;
		background:rgba(255,255,255,1);
		margin: 0 auto;
		margin-top: 253rpx;
		padding-top: 46rpx;
		box-sizing: border-box;
	}
	.see_img image{
		display: block;
		margin: 0 auto;
		width:474rpx;
		height:557rpx;
	}

</style>
