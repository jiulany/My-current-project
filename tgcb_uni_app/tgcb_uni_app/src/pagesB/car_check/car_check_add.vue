<template>
    <view class="car_check_add">
        <view class="car_check_box">
            <view class="icon">
                <i class="iconfont icon-zengjia"></i>
            </view>
            <view class="car_desc">
                添加车辆，享脱狗车宝年检服务
            </view>
        </view>
        <view class="car_check_footer">
            <view  class="car_check_footer_top">
                <image class="img" src="https://imgcdn.tuogouchebao.com/nianjian.png"></image>
                <view class="car_check_footer_top_title">上线检测</view>
            </view>
            <view class="car_check_footer_top_desc">在线预约，专业协力，省时省心</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "car_check_add.vue"
    }
</script>

<style scoped>
.car_check_add{
    height: 635rpx;
    background: #FFFFFF;
    margin-top: 20rpx;
    padding-top: 51rpx;
}
    .car_check_box{
        height: 327rpx;
        border: solid #FDD000 1rpx;
        margin-left: 22rpx;
        margin-right: 27rpx;
        text-align: center;
    }
    .icon{
        margin-top: 45rpx;
    }
 .icon-zengjia{
     color: #FDD000;
        font-size: 35px !important;
    }
    .car_desc{
        margin-top: 30rpx;
        font-size:30rpx;
        color:rgba(102,102,102,1);
    }
    .car_check_footer_top{
        margin-top: 85rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .img{
        margin-right: 16rpx;
        margin-left: 22rpx;
        width: 33rpx;
        height: 35rpx;
    }
    .car_check_footer_top_title{
        font-size:30rpx;
        color:rgba(102,102,102,1);
    }
    .car_check_footer_top_desc{
        margin-left: 75rpx;
        font-size:24rpx;
        color:rgba(102,102,102,1);
    }
</style>