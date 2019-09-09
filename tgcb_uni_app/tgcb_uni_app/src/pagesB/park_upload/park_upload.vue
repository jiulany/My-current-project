<template>
	<view>
		<view class="onebox">
			<view class="o_left">
				<view class="ol_top">
					<text>Step</text>
					<text>上传凭证</text>
				</view>
				<view class="ol_bottom">
					<image src="../../static/image/paizhao.png"></image>
					<text>拍照上传</text>
				</view>
			</view>
			<view class="o_right">
				<image src="../../static/shuijiao.jpg" mode="aspectFill"></image>
				<view class="hint">示例照片</view>
			</view>
		</view>
		<view class="twobox">亲，审核通过后将打款到您的余额里面哦！</view>
		<view class="upload_btn">立即上传</view>
	</view>
</template>

<script>
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.onebox{
		display: flex;
		justify-content: space-between;
		padding: 0 18.71rpx 0 38.64rpx;
		padding-top: 74.87rpx;
	}
	.ol_top>text:first-child{
		color: #909090;
		font-size: 21.73rpx;
	}
	.ol_top>text:nth-child(2){
		color: #909090;
		font-size: 25.36rpx;
		margin-left: 24.15rpx;
	}
	.ol_bottom{
		width:150.96rpx;
		height:150.96rpx;
		border:1px solid rgba(144,144,144,1);
		border-radius:50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 30.79rpx;
	}
	.ol_bottom>image{
		width: 74.87rpx;
		height: 71.25rpx;
	}
	.ol_bottom>text{
		color: #909090;
		font-size: 21.73rpx;
	}
	.o_right{
		position: relative;
	}
	.o_right>image{
		width: 231.28rpx;
		height: 273.55rpx;
	}
	.hint{
		width:155.19rpx;
		height:42.87rpx;
		background:rgba(252,164,0,1);
		opacity:0.8;
		text-align: center;
		line-height: 42.87rpx;
		color: #FFFFFF;
		font-size: 21.73rpx;
		position: absolute;
		top: 112.31rpx;
	}
	.twobox{
		color: #E41717;
		font-size: 21.73rpx;
		text-align: center;
		margin-top: 476.44rpx;
	}
	.upload_btn{
		width: 100%;
		height:84.54rpx;
		background:rgba(253,208,0,1);
		color: #474747;
		font-size: 28.98rpx;
		font-weight: bold;
		text-align: center;
		line-height: 84.54rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
