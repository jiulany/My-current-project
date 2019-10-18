<template>
    <view>
        <view class="top">
            <view class="button">签到</view>
            <image style="width:100%;height:100%" src="https://imgcdn.tuogouchebao.com/yb_banner@2x.png"></image>
            
            <view class="refer">
                <i class="iconfont icon-IMliaotian"></i>
                <text style="writing-mode:tb-rl">在线咨询</text>
            </view>
        </view>
        <view class="text">
            <text>
                什么是脱狗延保？
            </text>
            <text>
                <text class="point" style="color:#FDD000">·</text>
                为了脱狗车宝用户提供的车辆在正常使用当中自然引起的故障提供担保服务。
            </text>
            <text>
                <text class="point" style="color:#FDD000">·</text>
                延保系统（可根据车况按需选择延保系统）发动机、变速箱、驱动系统、转向系统、制动系统、悬挂系统、燃油、冷却系统、空调系
            </text>
            <text>
                <text class="point" style="color:#FDD000" decode='true'>·</text>
                延保对象\n年龄在8年以内（以登记证为准），累计行驶里程不超过18万公里
            </text>
        </view>
        <view class="open">全国开放购买</view>
        <view class="car">
            <view class="left">
                <view>
                    <image style="width:100%;height:100%" src="https://imgcdn.tuogouchebao.com/yb_qiche@2x.png"></image>
                </view>
                <view>5万/12万公里内车辆</view>
                <view>≤7座非运营车辆，不限车型</view>
                <view class="apply" @tap="apply1">立即申请</view>
            </view>
            <view class="right">
                <view>
                    <image style="width:100%;height:100%" src="https://imgcdn.tuogouchebao.com/yb_qiche2@2x.png"></image>
                </view>
                <view>8万/18万公里内车辆</view>
                <view>≤7座非运营车辆，不限车型</view>
                <view class="apply" @tap="apply2">立即申请</view>    
            </view>
            <view class="message">点击立即申请，选择您要延保的部件系统，立即算价免费检测评估</view>            
        </view>
        <view class="bottom">
            <text>延保/服务流程</text>
            <text>1.根据您的车辆里程/年限点需要延保车辆部件系统，提评估服务门店评估车况，专成延保单，合约双方签订正式延保合约。</text>
            <text>2.在（脱狗车宝）小程序-脱狗延保-订单中支付。支付完成后，次日零时正式生效。</text>
            <text>3.在保障期中，延保车辆在正常使用中自然引起故障发生后，只需在(脱狗车宝）小程序-脱狗延保-订单-已生效中，提交维修申请，将由专业维修服务顾问为您提供一对一高效服务。</text>
            <text> 4.车辆维修完后，系统会自动在您购买的延保订单中扣除，方便快捷，同时您可在（脱狗车宝）小程序-脱狗延保-订单-已生效中查看剩余保障额度。</text>
        </view>
    </view>
</template>

<script>
export default {
    methods:{
        apply1(){
            uni.navigateTo({
                url:`/pagesA/delay_apply/delay_apply?type=1`
            })
        },
        apply2(){
            uni.navigateTo({
                url:`/pagesA/delay_apply/delay_apply?type=2`
            })
        }
    }
}
</script>

<style>
    page {
        background: #fff;
    }
    .top {
        position: relative;
        width: 100%;
        height: 300rpx;
        background: #ccc;
    }
    .top .button {
        position: absolute;
        right: 21rpx;
        top: 10rpx;
        width: 126rpx;
        height: 48rpx;
        background: #FDD000;
        border-radius: 24rpx;
        color: #fff;
        font-size: 32rpx;
        line-height: 48rpx;
        text-align: center;
    }
    .top .refer {
        position: absolute;
        right: 0rpx;
        bottom: 0rpx;
        width: 63rpx;
        height: 179rpx;
        background: #fff;
        color: #FFA82C;
        font-size: 32rpx;
        line-height: 32rpx;
        text-align: center;
        border-radius:20rpx 0rpx 0rpx 20rpx; 
    }
    .top .refer img {
        display: block;
        width: 26rpx;
        height: 27rpx;
        border: 1rpx solid #ccc;
        margin: 0 auto 12rpx;
    }
    .text {
        width: 100%;
        height: 580rpx;
        padding-left: 45rpx;
    }
    .text text {
        width: 651rpx;
        display: inline-block;
        color: #959595;
        font-size: 28rpx;
        margin-top: 36rpx;
    }
    .text .point {
        display: inline;
        margin-right: 10rpx;
    }
    .text text:nth-child(1) {
        color: #474747;
        font-size: 32rpx;
        font-weight: bold;
        text-align: center;
    }
    .open {
        width: 455rpx;
        height: 68rpx;
        background: #FDD000;
        border-radius: 50rpx;
        color: #fff;
        text-align: center;
        margin-left: 148rpx;
        line-height: 68rpx;
        margin-top: 85rpx;
    }
    .car {
        width: 100%;
        height: 639rpx;
    }
    .left {
        
        float: left;
        width: 50%;
        height: 550rpx;
    }
    .right {
        float: right;
        width: 50%;
        height: 550rpx;
    }
    .message {
        width: 574rpx;
        height: 51rpx;
        color: #909090;
        font-size: 24rpx;
        padding-left: 56rpx;
    }
    .car .left view:nth-child(1) {
        width: 257rpx;
        height: 171rpx;
        background: #ccc;
        margin-top: 79rpx;
        margin-left: 79rpx;
    }
    .car .left view:nth-child(2) {
        margin-top: 60rpx;
        padding-left: 53rpx;
        color: #666;
        font-size: 30rpx;
        font-weight: 500;
    }
    .car .left view:nth-child(3) {
        margin-top: 26rpx;
        padding-left: 40rpx;
        color: #909090;
        font-size: 24rpx;
    }
    .car .apply {
        width: 216rpx;
        height: 45rpx;
        line-height: 45rpx;
        background: #FDD000;
        color: #fff;
        font-size: 30rpx;
        text-align: center;
        margin-top: 44rpx;
        margin-left: 80rpx;
        border-radius: 20rpx;
    }
    .car .right view:nth-child(1) {
        width: 262rpx;
        height: 154rpx;
        background: #ccc;
        margin-top: 107rpx;
        margin-left: 55rpx;
    }
    .car .right view:nth-child(2) {
        margin-top: 45rpx;
        padding-left: 52rpx;
        color: #666;
        font-size: 30rpx;
    }
    .car .right view:nth-child(3) {
        margin-top: 30rpx;
        padding-left: 33rpx;
        color: #909090;
        font-size: 24rpx;
    }
    .bottom {
        width: 703rpx;
        height: 761rpx;
        background: #ccc;
        margin-left: 24rpx;
        margin-bottom: 20rpx;
        margin-top: 30rpx;
        background: #F5F5F5;
    }
    .bottom text {
        width: 645rpx;
        display: block;
        color: #959595;
        font-size: 28rpx;
        padding-left: 29rpx;
        text-indent: 1em;
    }
    .bottom text:nth-child(1) {
        color: #474747;
        font-size: 32rpx;
        text-align: center;
        font-weight: bold;
        padding-top: 35rpx;
        margin-bottom: 30rpx;
    }
</style>