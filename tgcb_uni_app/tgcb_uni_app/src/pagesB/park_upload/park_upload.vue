<template>
	<view>
		<view class="onebox">
			<view class="o_left">
				<view class="ol_top">
					<text>Step</text>
					<text>上传凭证</text>
				</view>
				<view class="ol_bottom">
					<view class="drop"></view>
					<view class="line"></view>
					<image src="../../static/image/paizhao.png"></image>
					<!-- <view class="iconfont icon-camera"></view> -->
					<text>拍照上传</text>
				</view>
			</view>
			<view class="o_right">
				<image src="https://imgcdn.tuogouchebao.com/weizhangzhaopian.png" mode="aspectFill"></image>
				<view class="hint">示例照片</view>
			</view>
		</view>
		<view class="twobox">亲，审核通过后将打款到您的余额里面哦！</view>
		<view class="upload_btn" @tap="upload">立即上传</view>
	</view>
</template>

<script>
import { deflate } from "zlib";

	export default{
		data(){
			return {

			}
		},
		methods:{
			upload()
			{
				let self = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading()
						uni.uploadFile({
							url:  getApp().globalData.api_base_url + '/parking/parkingVoucher', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'image',
							methods:'POST',
							formData: {
								'record_id' : self.record_id
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								let data = JSON.parse(uploadFileRes.data);
								if (uploadFileRes.statusCode != 200) {
									uni.showToast({
										title : '网络异常',
										icon : 'none'
									})
									return false;
								}
								
								if (data.code == 201) {
									if (data.data.status) {
										uni.showToast({
											title : data.message,
											icon : 'none'
										})
										setTimeout(()=>{
											uni.navigateBack();
										},2000)
									}
									
								} else {
									uni.showToast({
											title : data.message,
											icon : 'none'
									})
								}
							}
						});
					}
				});
			}
		},
		onLoad(options){
			this.record_id = options.record_id
		}
	}
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
	.onebox .o_left{
		position: relative;
	}
	.onebox .o_left .ol_top{
		width: 185rpx;
		position: absolute;
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
		/* margin-top: 25rpx; */
		position: relative;
		top: 20%;
	}
	.ol_bottom .drop{
		width: 15rpx;
		height: 15rpx;
		border-radius: 15rpx;
		background: rgba(252,164,0,1);
		right: -7.5rpx;
		position: absolute;
		z-index: 99;
	}
	.ol_bottom .line{
		width: 320rpx;
		right: -320rpx;
		height: 5rpx;
		background: #e1e1e1;
		position: absolute;
		
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
