<template>
	<view class="ordetail span24">
        <view class="span24 ordetail-form">
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key" style="color:rgba(64,156,203,1);">预约状态</view>
                <view class="span18 ordetail-form-val" style="color:rgba(64,156,203,1);" v-if="details.order_status===2">预约中</view>
                <view class="span18 ordetail-form-val" style="color:rgba(64,156,203,1);" v-if="details.order_status===3">服务中</view>
                <view class="span18 ordetail-form-val" style="color:rgba(64,156,203,1);" v-if="details.order_status===4">已完成</view>
                <view class="span18 ordetail-form-val" style="color:rgba(64,156,203,1);" v-if="details.order_status===5">已关闭</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key" style="color:rgba(64,156,203,1);">预约实付金额</view>
                <view class="span18 ordetail-form-val" style="color:rgba(64,156,203,1);">{{details.order_total_price}}元</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key">时间</view>
                <view class="span18 ordetail-form-val">{{details.created_at}}</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key">类型</view>
                <view class="span18 ordetail-form-val">{{details.class_name}}</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key">地址</view>
                <view class="span18 ordetail-form-val">{{details.full_address}}</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span6 ordetail-form-key">服务内容描述</view>
                <view class="span18 ordetail-form-val">{{details.remarks}}</view>
            </view>
            <view class="span24 ordetail-form-it">
                <view class="span24 ordetail-form-key">图片</view>
                <view class="span24 ordetail-form-val ordetail-form-val-tp">
                    <view class="ordetail-form-pt" v-for="item in details.remark_img" :key="item"><image   mode="aspectFit" :src='item'></image></view>
                </view>
            </view>
        </view>
        <view class="span24 ordetail-btm">
			<view  >服务完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                type_array:[[{
                    id:1,
                    name:'维修'
                },{
                    id:2,
                    name:'家政'
                },{
                    id:3,
                    name:'装修'
                }],[{
                    id:4,
                    name:'弱电维修'
                },{
                    id:5,
                    name:'空调清洁'
                },{
                    id:6,
                    name:'装地板'
                }]],
                index_1:0,
                index_2:0,
                details:null
			}
		},
		onLoad() {
            this.details=uni.getStorageSync('details')
		},
		methods: {
            changeType(e){
                console.log(e)
            },
            columnchangeChange(){
                console.log(e)
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
.ordetail-form-it{
    padding: 40rpx 24rpx 20rpx 0;
    border-bottom:1px solid rgba(240,239,239,1);
}
.ordetail-form-it:last-child{
    border-bottom:none;
}
.ordetail-form{
    padding: 0 21rpx;
    background: white;
    margin-top: 20rpx
}
.ordetail-form-key{
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
}
.ordetail-form-val{
    justify-content: flex-end
}
.ordetail-form-pt{
  width: 165rpx;
  height: 165rpx;
  margin-right: 10rpx
}
.ordetail-form-pt image{
  height: 100%;
  width: 100%;
  border-radius:20rpx;
}
.ordetail-tip{
font-size:28rpx;
padding: 35rpx 0 0 21rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(64,156,203,1);
}
.ordetail-tip-ct{
font-size:26rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,153,153,1);
padding: 0 0 0 21rpx
}
.ordetail-form-val-tp{
    justify-content: flex-start
}
.ordetail-btm{
		position: fixed;
		bottom: 0;
		padding: 18rpx 0;
		background: white;
		justify-content: center
	}
	.ordetail-btm > view{
		width:458rpx;
        background:rgba(64,156,203,1);
        border-radius:10rpx;
        font-size:30rpx;
		height: 65rpx;
		line-height: 65rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-align: center
	}
</style>
