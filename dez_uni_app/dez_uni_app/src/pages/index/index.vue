<template>
	<view class="index span24">
		<view class="span24 index-hd">
			<view class="index-wode"><image @tap="toOrder"  mode="aspectFit" src='../../static/images/wode.png'></image></view>
		    <view class="index-hd-ct">
			    <view class="index-quan"><image   mode="aspectFit" src='../../static/images/quan.png'></image></view>
				<view class="index-bg"><image   mode="aspectFit" src='../../static/images/beijing.png'></image></view>
			</view>
		</view>
		<view class="span24 index-notice">夜间时段（18:00-次日9:00）  暂停服务</view>
		<view class="span24">
			<view class="span24 index-sf">
				<image   mode="aspectFit" src='../../static/images/weixiu.png'></image>
				<view>附近师傅<span>32</span>个</view>
			</view>
			<view class="span24 index-sf-line">
				<view class="span24 index-fj-it" v-for="item in list" :key="item.id">
					<view class="span6 index-fj-touxiang"><image   mode="aspectFit" :src="item.head!=''?item.head:'../../static/images/touxiang.png'"></image></view>
					<view class="span18 index-fj-name">
						<view class="span24">
							<view class="span20" style="color:black">{{item.surname}}师傅</view>
							<view class="span4 index-fj-call"><image  @tap="call(item,$event)"  mode="aspectFit" src='../../static/images/dianhua.png'></image></view>
						</view>
						<view class="span24">
							<view class="span12" style="color:black">工种：{{item.work_type?item.work_type:''}}</view>
							<view class="span12 index-fj-call" style="justify-content:flex-end">{{item.phone?item.phone:''}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="span24 index-btm">
			<view class="index-yuyue" @tap="toAppoint">立即预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:null
			}
		},
		onLoad() {
			this.$http({ url: `api/index` ,data:{
          }}).then(res => {
			  this.list=res.data

          })
          .catch(res => {});
		},
		methods: {
			call(item,e){
				uni.makePhoneCall({
    phoneNumber: item.account 
});
			},
			toAppoint(){
				uni.navigateTo({url: '/pages/appointment/appointment'});
			},
			toOrder(){
				console.log("ss")
				uni.navigateTo({url: '/pages/order/order'});
			}
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
	.index {
		text-align: center;
		padding-bottom: 200rpx
	}
	.index-wode{
		position: absolute;
		left: 32rpx;
		top:35rpx;
		z-index: 99;
	}
	.index-wode image{
		width: 73rpx;
		height: 73rpx;
	}
	.index-hd{
		position: relative;
		height: 578rpx;
	}
	.index-hd-ct{
		width: 100%;
		position: relative
	}
	.index-bg{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		
		height: 578rpx;
		z-index: -1;
	}
	.index-bg image{
		height: 100%;
		width: 100%
	}
	.index-quan{
		margin-left: auto;
		margin-right: auto;
		margin-top: 84rpx
	}
	.index-quan image{
		width: 404rpx;
		height: 404rpx;
	}
	.index-notice{
		background: white;
        font-size:26rpx;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
		padding: 20rpx 26rpx
	}
	.index-fj-it{
		background: white;
		padding: 9rpx 20rpx 20rpx 20rpx;
		border-radius:10rpx;
		margin-bottom: 20rpx
	}
	.index-sf{
		padding: 26rpx 0 26rpx 26rpx;
		align-items: center;
	}
	.index-sf-line{
		padding: 0 26rpx 0 26rpx;
		justify-content: space-between
	}
	.index-sf-line::after{
		content: ''; 
		border-radius:10rpx;
		width: 197rpx;
	}
	.index-sf image{
		width: 31rpx;
		height: 31rpx;
		margin-right: 22rpx
	}
	.index-sf > view{
        font-size:30rpx;
        color:rgba(51,51,51,1);
		font-weight: 600
	}
	.index-sf > view > span{
		color: #409CCB;
	}
	.index-fj-touxiang{
		justify-content: center;
		align-items: center
	}
	.index-fj-touxiang image{
		width: 106rpx;
		height: 106rpx;
	}
	.index-fj-name{
        font-size:28rpx;
        color:rgba(64,156,203,1);
		justify-content: center;
		border-radius:5rpx;
		margin-top: 28rpx
	}
	.index-btm{
		position: fixed;
		bottom: 0;
		padding: 18rpx 0;
		background: white;
		justify-content: center
	}
	.index-yuyue{
		width:458rpx;
        background:rgba(64,156,203,1);
        border-radius:10rpx;
        font-size:30rpx;
		height: 65rpx;
		line-height: 65rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
	}
	.index-fj-call{
		justify-content: flex-end;
		padding-right: 20rpx
	}
	.index-fj-call image{
		width:30rpx;
		height: 30rpx;
	}
</style>
