<template>
    <view>
        <view class="details">
            <view class="top">
                <view>
                    <text>下次保养里程</text>
                    <text>3300</text>
                    <text>公里</text>
                </view>
                <view>
                    <text>首保</text>
                    <text>2</text>
                    <text>项</text>
                </view>
                <view>
                    <text>预计到期时间</text>
                    <text>07月10日</text>
                </view>
            </view>
            <view class="add"> 
                <text>
                    完善保养记录，保养计划推荐更准确
                </text>
                <text>
                    <text class="button">添加保养</text>
                </text>
            </view>
        </view>
        <view class="message">
            <text>以下为推荐保养项</text>
        </view>
        <view class="bottom">
            <view class="item">
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                    <text class="you">发动机机油</text>
                </view>
                <view>
                    <text class="time">
                        每5000公里或者每6个月更换一次
                    </text>
                </view>
            </view>
            <view class="item">
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                    <text class="you">机油滤清器</text>
                </view>
                <view>
                    <text class="time">
                        每5000公里或者每6个月更换一次
                    </text>
                </view>
            </view>
        </view>
        <view class="btn">脱狗专家</view>
    </view>
</template>

<script>
export default {
    
}
</script>

<style>
    .details {
        width: 100%;
        height: 321rpx;
        background: #fff;
    }
    .top {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 235rpx;
        color:rgba(51,51,51,1);
        font-size: 30rpx;
        text-align: center;
        font-weight: 400;
    }
    .top view {
        width: 250rpx;
        display: flex;
        flex-direction: column;
    }
    .top view text {
        padding-top: 25rpx;
    }
    .top view text:nth-child(1) {
        color: #333333;
        font-size: 32rpx;
        font-weight: 500;
    }
    .add {
        height: 85rpx;
        border-top: 1rpx solid #F0F0F0;
        display: flex;
        justify-content: left;
        font-size: 30rpx;
    }
    .add text {
        color: #333333;
        padding-left: 28rpx;
        line-height: 85rpx;
    }
    .add .button {
        display: inline-block;
        width: 167rpx;
        height: 55rpx;
        background: #FDD000;
        color: #333333;
        text-align: center;
        line-height: 55rpx;
        padding-left: 0;
        margin-left: 28rpx;    
    }
    .message {
        padding: 66rpx 0 10rpx 38rpx;
        color: #333333;
        font-size: 30rpx;
    }
    .bottom {
        width: 100%;
        height: 660rpx;
        background: #fff;
    }
    .bottom .item {
        width: 100%;
        height: 150rpx;
        display: flex;
        flex: 1;
        justify-content: center;
        flex-direction: column;
        align-items: left;
    }
    .bottom .item img {
        width: 33rpx;
        height: 23rpx;
        margin-left: 46rpx;
    }
    .bottom .item:nth-child(1) {
        border-bottom: 1rpx solid #F5F5F5;
    }
    .you {
        color: #333333;
        font-size: 32rpx;
        margin-left: 20rpx;
    }
    .time {
        color: #999999;
        font-size: 32rpx;
        padding-left: 100rpx;
    }
    .btn {
        width: 100%;
        height: 98rpx;
        background: #FDD000;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        line-height: 98rpx;
        color: #474747;
    }
</style>