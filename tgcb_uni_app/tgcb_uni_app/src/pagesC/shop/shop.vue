<template>
	<view>
		<view class="onebox">
			<image src="../../static/img/shangmenfuwu-banner.png" mode="aspectFill" class="lunbo"></image>
			<view class="ob_line2">脱狗车宝浅水半岛店</view>
			<view class="ob_line3">
				<text>四川省成都市青羊区狮马路98号太升大厦</text>
				<text>导航</text>
			</view>
		</view>
		<segmented-control :values="items" :stickyTop="108" :current="current" @clickItem="onClickItem"></segmented-control>
		<!-- 根据current的值显示隐藏 -->
		<view id="list">
			<view v-show="current2==0" class="tabone_con">
				<view class="toc_tab">
					<view class="active">洗车</view>
					<view>美容</view>
					<view>养护</view>
				</view>
				<view class="hint">以下是门店服务内容</view>
				<view class="toc_con">
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
				</view>
			</view>
			<view v-show="current2==1" class="tabone_con">
				<view class="toc_tab">
					<view class="active">洗车</view>
					<view>美容</view>
					<view>养护</view>
				</view>
				<view class="hint">以下是门店服务内容2222</view>
				<view class="toc_con">
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
					<view class="tc_list">
						<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
						<view class="tc_center">
							<view class="tc_top">
								<text>简洗车身</text>
								<text>标准洗车液清洗</text>
							</view>
							<view class="tc_bottom">￥10.00</view>
						</view>
						<view class="paybtn">支付</view>
					</view>
				</view>
			</view>
			<view v-show="current2==2" class="tabthree_con">
				<view class="ttc1">
					<view class="ttc1_top">
						<view class="line"></view>
						<text>服务评价(30)</text>
						<view class="line"></view>
					</view>
					<view class="ttc1_bottom">
						<view class="stars">
							<image src="../../static/image/star.png"></image>
							<image src="../../static/image/star.png"></image>
							<image src="../../static/image/star.png"></image>
							<image src="../../static/image/star.png"></image>
							<image src="../../static/image/star.png"></image>
						</view>
						<text>5.0分</text>
					</view>
				</view>
				<view class="ttc2">
					<view class="ttc2_list">
						<view class="ttc2_left">
							<view class="ttc2l_top">
								<image src=""></image>
							</view>
							<view class="ttc2l_center">
								<view class="tc2c_top">
									<text>宝马X5</text>
									<text>川A1213</text>
								</view>
								<view class="tc2c_bottom">很不错的一家洗车店</view>
							</view>
						</view>
						<view class="ttc2_right">
							<view class="tc2_top">
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
							</view>
							<view class="tc2_bottom">2019-07-05</view>
						</view>
					</view>
					<view class="ttc2_list">
						<view class="ttc2_left">
							<view class="ttc2l_top">
								<image src=""></image>
							</view>
							<view class="ttc2l_center">
								<view class="tc2c_top">
									<text>宝马X5</text>
									<text>川A1213</text>
								</view>
								<view class="tc2c_bottom">很不错的一家洗车店</view>
							</view>
						</view>
						<view class="ttc2_right">
							<view class="tc2_top">
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
							</view>
							<view class="tc2_bottom">2019-07-05</view>
						</view>
					</view>
					<view class="ttc2_list">
						<view class="ttc2_left">
							<view class="ttc2l_top">
								<image src=""></image>
							</view>
							<view class="ttc2l_center">
								<view class="tc2c_top">
									<text>宝马X5</text>
									<text>川A1213</text>
								</view>
								<view class="tc2c_bottom">很不错的一家洗车店</view>
							</view>
						</view>
						<view class="ttc2_right">
							<view class="tc2_top">
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
								<image src="../../static/image/star.png"></image>
							</view>
							<view class="tc2_bottom">2019-07-05</view>
						</view>
					</view>
				</view>
				<view class="ttc3">
					<input placeholder="请为我们洗车店打分评论咯~" />
					<view>提交</view>
				</view>
			</view>
		</view>
		<view class="evaluate">
			<view class="el1">请为我们的服务打分和评论咯</view>
			<view class="el2">
				<image src="../../static/image/star.png"></image>
				<image src="../../static/image/star.png"></image>
				<image src="../../static/image/star.png"></image>
				<image src="../../static/image/star.png"></image>
				<image src="../../static/image/star2.png"></image>
			</view>
			<textarea placeholder="请为我们评价吧~" class="evaluate_input"></textarea>
			<view class="submit_btn">提交评价</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '@/components/uni-segmented-control/uni-segmented-control2';
	export default {
		components: {
			segmentedControl
		},
		data() {
			return {
				items: ['服务', '优惠', '评价'],
				items2: ['洗车', '美容', '养护'],
				current: 0,
				current2: 0,
			};
		},
		methods: {
			/**
			 * 点击segmentedControl 事件回调
			 */
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					console.log(this.current);
				}
			},
			onClickItem2(index) {
				if (this.current2 !== index) {
					this.current2 = index;
					console.log(this.current2);
				}
			}
		}
	};
</script>

<style>
	.onebox {
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.lunbo {
		width: 100%;
		height: 400rpx;
	}

	.ob_line2 {
		margin-left: 24rpx;
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
		height: 87rpx;
		line-height: 87rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.ob_line3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 24rpx 36rpx 24rpx;
	}

	.ob_line3>text:first-child {
		color: #999999;
		font-size: 26rpx;
	}

	.ob_line3>text:last-child {
		display: block;
		width: 150rpx;
		height: 58rpx;
		background: rgba(253, 209, 0, 1);
		border-radius: 29rpx;
		line-height: 58rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.toc_tab {
		display: flex;
		align-items: center;
		height: 74rpx;
		background: #FFFFFF;
	}

	.toc_tab>view {
		display: flex;
		align-items: center;
		color: #333333;
		font-size: 28rpx;
		padding-bottom: 6rpx;
		margin: 0 55rpx;
	}

	.active {
		border-bottom: 4rpx solid #FDD100;
		font-weight: bold;
		color: #FDD100 !important;
	}

	.hint {
		background-color: #FFFAE6;
		color: #FDD100;
		font-size: 24rpx;
		padding: 19rpx 0 18rpx 55rpx;
	}

	.toc_con {
		background: #FFFFFF;
		padding-bottom: 177rpx;
	}

	.tc_list {
		display: flex;
		padding: 38rpx 24rpx 38rpx 0rpx;
		margin-left: 24rpx;
		border-bottom: 1px solid #E2DED7;
		position: relative;
	}

	.tc_center {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 14rpx;
	}

	.tc_list>image {
		width: 127rpx;
		height: 127rpx;
	}

	.tc_top>text:first-child {
		color: #333333;
		font-size: 28rpx;
	}

	.tc_top>text:nth-child(2) {
		color: #999999;
		font-size: 24rpx;
		margin-left: 12rpx;
	}

	.tc_bottom {
		color: #FF682C;
		font-size: 27rpx;
	}

	.paybtn {
		position: absolute;
		width: 150rpx;
		height: 58rpx;
		background: rgba(253, 209, 0, 1);
		border-radius: 29rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 58rpx;
		right: 24rpx;
		bottom: 37rpx;
	}

	.tabthree_con {
		background: #FFFFFF;
	}

	.ttc1 {
		padding: 27rpx 0 35rpx 0;
		bottom: 1px solid #E6E6E6;
	}

	.ttc1_top {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.line {
		width: 100rpx;
		height: 1px;
		background: #999999;
	}

	.ttc1_top>text {
		color: #333333;
		font-size: 36rpx;
		margin: 0 25rpx;
	}

	.ttc1_bottom {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stars {
		display: flex;
		align-items: center;
	}

	.stars>image {
		width: 50rpx;
		height: 50rpx;
		margin-left: 7rpx;
	}

	.ttc1_bottom>text {
		color: #FDD100;
		font-size: 30rpx;
		margin-left: 24rpx;
	}

	.ttc2_list {
		display: flex;
		justify-content: space-between;
		padding: 41rpx 24rpx 44rpx 20rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.ttc2l_top>image {
		width: 70rpx;
		height: 70rpx;
	}

	.ttc2_left {
		display: flex;
	}

	.ttc2l_center {
		margin-left: 16rpx;
		display: flex;
		flex-direction: column;
		height: 100rpx;
		justify-content: space-between;
	}

	.tc2c_top>text:first-child {
		color: #333333;
		font-size: 28rpx;
	}

	.tc2c_top>text:nth-child(2) {
		color: #333333;
		font-size: 28rpx;
		margin-left: 16rpx;
	}

	.tc2c_bottom {
		color: #999999;
		font-size: 24rpx;
	}

	.ttc2_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100rpx;
	}

	.tc2_top {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tc2_top>image {
		width: 26rpx;
		height: 26rpx;
		margin-left: 4rpx;
	}

	.tc2_bottom {
		color: #999999;
		font-size: 24rpx;
		text-align: center;
	}

	.ttc3 {
		height: 129rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #E6E6E6;
		margin-top: 268rpx;
	}

	.ttc3>input {
		width: 569rpx;
		height: 70rpx;
		background: #F5F5F5;
		border-radius: 35rpx;
		font-size: 26rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.ttc3>view {
		width: 120rpx;
		height: 58rpx;
		background: rgba(253, 209, 0, 1);
		border-radius: 29px;
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 58rpx;
		text-align: center;
		margin-left: 13rpx;
	}

	.evaluate {
		background: #FFFFFF;
		padding: 24rpx 0;
		display: none;
	}

	.el1 {
		color: #333333;
		font-size: 32rpx;
		text-align: center;
	}

	.el2 {
		text-align: center;
		margin-top: 40rpx;
	}

	.el2>image:first-child {
		margin-left: 0 !important;
	}

	.el2>image {
		width: 50rpx;
		height: 50rpx;
		margin-left: 35rpx;
	}

	.evaluate_input {
		width: 702rpx;
		height: 401rpx;
		background: #F5F5F5;
		margin: 75rpx auto;
		padding: 20rpx;
		font-size: 26rpx;
		box-sizing: border-box;
	}

	.submit_btn {
		width: 702rpx;
		height: 88rpx;
		background: #FDD100;
		text-align: center;
		line-height: 88rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		margin: 0 auto;
	}
</style>
