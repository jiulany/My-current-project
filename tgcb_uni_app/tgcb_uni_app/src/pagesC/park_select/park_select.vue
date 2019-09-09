<template>
	<view>
		<view class="line1">填写车辆信息</view>
		<view class="line2_list">
			<text>品牌车型</text>
			<input placeholder="请填写车型" />
		</view>
		<view class="line3_list">
			<text>车牌号码</text>
			<view class="l3l_center">
				<text>川</text>
				<image src="../../static/image/xiala.png"></image>
			</view>
			<input placeholder="请输入车牌" />
		</view>
		<view class="line4_list">
			<text>查询城市</text>
			<view class="l2l_right">
				<text>成都</text>
				<image src="../../static/image/right.png"></image>
			</view>
		</view>
		<view class="line2_list">
			<text>车架号</text>
			<input placeholder="必填" />
		</view>
		<view class="line2_list">
			<text>发动机号</text>
			<input placeholder="必填" />
		</view>
		<view class="select_btn">立即查询</view>
		<view class="last_txt">车辆信息为当地交管局查询所需，我们将严格保密，请您放心填写！点击确定即视为同意《隐私政策》</view>
	</view>
</template>

<script>
</script>

<style>
	input::-webkit-input-placeholder {
		color: #999999;
	}
	.line1{
		height: 96rpx;
		line-height: 96rpx;
		padding-left: 34rpx;
		color: #666666;
		font-size: 30rpx;
	}
	.line2_list{
		background: #FFFFFF;
		height: 107rpx;
		border-bottom: 1px solid #F0F0F0;
		display: flex;
		padding: 0 49rpx 0 30rpx;
		align-items: center;
	}
	.line2_list>text:first-child{
		color: #666666;
		font-size: 30rpx;
	}
	.line2_list>input{
		display: flex;
		flex: 1;
		text-align: right;
		margin-left: 60rpx;
	}
	.select_btn{
		width:502rpx;
		height:65rpx;
		line-height: 65rpx;
		background:rgba(253,208,0,1);
		border-radius:33rpx;
		color: #333333;
		font-size: 32rpx;
		text-align: center;
		margin: 163rpx auto 0 auto;
	}
	.last_txt{
		width:502rpx;
		color: #999999;
		font-size: 24rpx;
		margin: 21rpx auto 0 auto;
	}
	.line3_list{
		background: #FFFFFF;
		display: flex;
		height: 107rpx;
		border-bottom: 1px solid #F0F0F0;
		align-items: center;
		padding: 0 49rpx 0 30rpx;
		justify-content: space-between;
	}
	.line3_list>text{
		color: #666666;
		font-size: 30rpx;
	}
	.line3_list>input{
		width: 168rpx;
		text-align: right;
	}
	.l3l_center{
		width:90rpx;
		height:38rpx;
		border:1px solid rgba(253,208,0,1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 250rpx;
	}
	.l3l_center>text{
		color: #FDD000;
		font-size: 30rpx;
	}
	.l3l_center>image{
		width: 16rpx;
		height: 12rpx;
	}
	.line4_list{
		background: #FFFFFF;
		display: flex;
		height: 107rpx;
		border-bottom: 1px solid #F0F0F0;
		align-items: center;
		padding: 0 49rpx 0 30rpx;
		justify-content: space-between;
	}
	.line4_list>text{
		color: #666666;
		font-size: 30rpx;
	}
	.l2l_right{
		display: flex;
		align-items: center;
	}
	.l2l_right>text{
		color: #666666;
		font-size: 30rpx;
	}
	.l2l_right>image{
		width: 60rpx;
		height: 60rpx;
	}
</style>
