<template>
	<view>
		<view class="example">
			<image src="../../static/shuijiao.jpg"></image>
			<text>1.点击应急停车</text>
		</view>
		<view class="example">
			<image src="../../static/shuijiao.jpg"></image>
			<text>2.确定您的当前位置</text>
		</view>
		<view class="example">
			<image src="../../static/shuijiao.jpg"></image>
			<text>3.点击“停在这里”，将您当前位置上传上传后显示停车成功</text>
		</view>
		<view class="example_txt">
			<view>温馨提示</view>
			<view>请记得下车的时候点击“停在这里”，并且请提供清晰无反光，无水印的照片。由于罚单时间大于停车位置时间和罚单照片模糊，反光，有水印导致不清晰的将会影响您的罚单补贴哦！</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.example:first-of-type{
		padding-top: 31.4rpx;
	}
	.example:nth-of-type(2){
		margin-top: 74.87rpx;
	}
	.example:nth-of-type(3){
		margin-top: 88.16rpx;
	}
	.example {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.example>image {
		width: 240.94rpx;
		height: 240.94rpx;
		border-radius: 50%;
	}

	.example>text {
		color: #000000;
		font-size: 21.73rpx;
		width: 388.88rpx;
		text-align: center;
		margin-top: 18.71rpx;
	}
	.example_txt{
		width: 388.88rpx;
		margin: 144.32rpx auto 225.84rpx auto;
		text-align: center;
	}
	.example_txt>view:first-child{
		color: #000000;
		font-size: 21.73rpx;
	}
	.example_txt>view:nth-child(2){
		color: #000000;
		font-size: 16.9rpx;
		margin-top: 16.9rpx;
	}
</style>
