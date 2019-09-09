<template>
	<view>
		<view class="head_tab">
			<view>买前须知</view>
			<view class="selecttab">会员权益</view>
		</view>
		<view class="center_con">
			<view class="vip_state_list">
				<view class="vsl_con">
					<view class="vc_line_one">
						<view class="vlo_left">
							<text>车牌：</text>
							<text>川A342536</text>
						</view>
						<text class="vlo_right">已购买</text>
					</view>
					<view class="vc_line_two">
						<view class="vltw_left">
							<text>期限：</text>
							<text>2019.04.26-2019.07.26</text>
						</view>
						<text class="vltw_right">有效</text>
					</view>
					<view class="vc_line_three">
						<view class="vlth_left">
							<text>停车次数：</text>
							<text>24</text>
							<text>报销次数：</text>
							<text>5</text>
						</view>
						<view class="vlth_right">
							<image src="../../static/img/juli@2x.png"></image>
							<text>续费</text>
						</view>
					</view>
				</view>
			</view>
			<view class="vip_state_list">

				<view class="vsl_con vsl_con2">
					<view class="vc_line_one">
						<view class="vlo_left vlo_left2">
							<text>车牌：</text>
							<text>川A342536</text>
						</view>
						<text class="vlo_right vlo_right2">未购买</text>
					</view>
					<view class="vc_line_two">
						<view class="vltw_left vltw_left2">
							<text>期限：</text>
							<text>2019.04.26-2019.07.26</text>
						</view>
						<text class="vltw_right">已过期</text>
					</view>
					<view class="vc_line_three">
						<view class="vlth_left vlth_left2">
							<text>停车次数：</text>
							<text>24</text>
							<text>报销次数：</text>
							<text>5</text>
						</view>
						<view class="vlth_right">
							<image src="../../static/img/juli@2x.png"></image>
							<text>续费</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<text>停车记录</text>
			<image src="../../static/image/right.png"></image>
		</view>
		<view class="list">
			<text>会员权益</text>
			<image src="../../static/image/right.png"></image>
		</view>
		<view class="list">
			<text>使用方法</text>
			<image src="../../static/image/right.png"></image>
		</view>
		<view class="list">
			<text>常用问题</text>
			<image src="../../static/image/right.png"></image>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.head_tab {
		display: flex;
	}

	.head_tab>view {
		width: 50%;
		height: 100rpx;
		background: #F5F5F5;
		text-align: center;
		line-height: 100rpx;
	}

	.selecttab {
		background: #FCC200 !important;
	}

	.center_con {
		padding-top: 4rpx;
	}

	.vip_state_list {
		padding: 0 22rpx;
	}


	.vsl_con {
		height: 239rpx;
		background: url(https://imgcdn.tuogouchebao.com/huiyuanquanyi.png) center/cover;
		border-radius: 10rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		margin-top: 12.07rpx;
	}

	.vsl_con2 {
		background: linear-gradient(-90deg, rgba(224, 224, 224, 1) 0%, rgba(246, 246, 246, 1) 100%) !important;
	}

	.vc_line_one {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 51rpx 0 10rpx;
	}

	.vlo_left {
		color: #7D6700;
		font-size: 36rpx;
	}

	.vlo_left2 {
		color: #AAAAAA !important;
	}

	.vlo_right {
		color: #816A01;
		font-size: 32rpx;
	}

	.vlo_right2 {
		color: #838383 !important;
	}

	.vc_line_two {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 53rpx 0 14rpx;
	}

	.vltw_left {
		color: #927701;
		font-size: 28rpx;
	}

	.vltw_left2 {
		color: #A9A9A9 !important;
	}

	.vltw_right {
		color: #666666;
		font-size: 30rpx;
	}

	.vc_line_three {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 22rpx 0 11rpx;
		margin-top: 32rpx;
	}

	.vlth_left {
		color: #666666;
		font-size: 26rpx;
	}

	.vlth_left2 {
		color: #A9A9A9 !important;
	}

	.vlth_left>text:nth-child(3) {
		margin-left: 36rpx;
	}

	.vlth_right {
		width: 143rpx;
		height: 47rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(240, 240, 240, 1);
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.vlth_right>image {
		width: 23rpx;
		height: 23rpx;
	}

	.vlth_right>text {
		color: #666666;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.list {
		height: 112rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F0F0F0;
		padding-left: 48rpx;
		padding-right: 16rpx;
	}
	.list:last-of-type{
		border-bottom: none !important;
	}
	.list>text {
		color: #333333;
		font-size: 32rpx;

	}

	.list>image {
		width: 50rpx;
		height: 50rpx;
	}
</style>
