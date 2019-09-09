<template>
<!--	<view class="center_con">-->
<!--		&lt;!&ndash;              未过期会员&ndash;&gt;-->
<!--		<view class="vip_state_list">-->
<!--			<view class="vip_state_list_title">-->
<!--				停车福利正在保障中-->
<!--			</view>-->
<!--			<image  src="https://imgcdn.tuogouchebao.com/kapian.png"></image>-->
<!--			<view class="vsl_con">-->
<!--				<view class="vc_line_one">-->
<!--					<view class="vlo_left">-->
<!--						<text>车牌：</text>-->
<!--						<text>川A342536</text>-->
<!--					</view>-->
<!--					<text class="vlo_right">已购买</text>-->
<!--				</view>-->
<!--				<view class="vc_line_two">-->
<!--					<view class="vltw_left">-->
<!--						<text>期限：</text>-->
<!--						<text>2019.04.26-2019.07.26</text>-->
<!--					</view>-->
<!--					<text class="vltw_right">有效</text>-->
<!--				</view>-->
<!--				<view class="vc_line_three">-->
<!--					<view class="vlth_left">-->
<!--						<text>停车次数：</text>-->
<!--						<text>24</text>-->
<!--						<text>报销次数：</text>-->
<!--						<text>5</text>-->
<!--					</view>-->
<!--					<view class="vlth_right">-->
<!--						<image src="../../static/img/juli@2x.png"></image>-->
<!--						<text>续费</text>-->
<!--					</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
<!--		&lt;!&ndash;              已过期会员&ndash;&gt;-->
<!--		<view class="vip_state_list">-->
<!--			<view class="vip_state_list_title">-->
<!--				停车福利未保障-->
<!--			</view>-->
<!--			<image  src="https://imgcdn.tuogouchebao.com/kapian2.png"></image>-->
<!--			<view class="vsl_con">-->
<!--				<view class="vc_line_one">-->
<!--					<view class="vlo_old_left">-->
<!--						<text>车牌：</text>-->
<!--						<text>川A342536</text>-->
<!--					</view>-->
<!--					<text class="vlo_old_right">未购买</text>-->
<!--				</view>-->
<!--				<view class="vc_line_two">-->
<!--					<view class="vltw_old_left">-->
<!--						<text>期限：</text>-->
<!--						<text>2019.04.26-2019.07.26</text>-->
<!--					</view>-->
<!--					<text class="vltw_old_right">已过期</text>-->
<!--				</view>-->
<!--				<view class="vc_line_three">-->
<!--					<view class="vlth_old_left">-->
<!--						<text>停车次数：</text>-->
<!--						<text>24</text>-->
<!--						<text>报销次数：</text>-->
<!--						<text>5</text>-->
<!--					</view>-->
<!--					<view class="vlth_right">-->
<!--						<image src="../../static/img/juli@2x.png"></image>-->
<!--						<text>续费</text>-->
<!--					</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
<!--	</view>-->
	 <view class="vip_buy">
		<view class="line1">会员权益购买后，次月生效</view>
		<image src="../../static/image/BANNER.png" class="line2" mode="aspectFill"></image>
		<view class="line3">所有解释权归脱狗车宝所有</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.vip_buy{
		height: 92vh;
		overflow: hidden;
	}
	.vip_state_list_title{
		font-size:32rpx;
		color:#666666
	}

	.vsl_title {
		color: #666666;
		font-size: 32rpx;
	}

	.vsl_con {
		height: 239rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		margin-top: 6rpx;
	}
	.vsl_con2{
background:linear-gradient(-90deg,rgba(224,224,224,1) 0%,rgba(246,246,246,1) 100%) !important;
	}
	.vc_line_one {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 51rpx 0 10rpx;
	}

	.vlo_left{
		color: #7D6700;
		font-size: 36rpx;
	}
	.vlo_left2{
		color: #AAAAAA !important;
	}
	.vlo_right {
		color: #816A01;
		font-size: 32rpx;
	}
	.vlo_right2{
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
	.vltw_left2{
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
	.vlth_left2{
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
	.line1{
		color: #FFC90C;
		font-size: 34rpx;
		text-align: center;
		margin-top: 56rpx;
	}
	.line2{
		display: block;
		width: 606rpx;
		height: 786rpx;
		border-radius: 20rpx;
		margin: 113rpx auto 0 auto;
	}
	.line3{
		text-align: center;
		color: #333333;
		font-size: 20rpx;
		margin-top: 148rpx;
	}
	.center_con {
		padding-top: 4rpx;
	}

	.vip_state_list {
		margin-top: 10rpx;
		padding: 0 22rpx;
		height: 239rpx;
		margin-bottom: 70rpx;
	}
	.vip_state_list image{
		position: absolute;
		left: 22rpx;
		width: 703rpx;
		right: 22rpx;
		height: 239rpx;
		z-index: 1;
	}

	.vsl_con {
		width: 703rpx;
		height: 239rpx;
		border-radius: 10rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		margin-top: 12.07rpx;
		position: absolute;
		z-index: 2;
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
	.vlo_old_left {
		color: #AAAAAA;
		font-size: 36rpx;
	}

	.vlo_left2 {
		color: #AAAAAA !important;
	}

	.vlo_right {
		color: #816A01;
		font-size: 32rpx;
	}
	.vlo_old_right{
		color: #838383;
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
	.vltw_old_left{
		color: #A9A9A9;
		font-size: 28rpx;
	}
	.vltw_left2 {
		color: #A9A9A9 !important;
	}

	.vltw_right {
		color: #666666;
		font-size: 30rpx;
	}
	.vltw_old_right{
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
	.vlth_old_left{
		color: #A9A9A9;
		font-size: 26rpx;
	}

	.vlth_left2 {
		color: #A9A9A9 !important;
	}

	.vlth_left>text:nth-child(3) {
		margin-left: 36rpx;
	}
	.vlth_old_left>text:nth-child(3) {
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

</style>
