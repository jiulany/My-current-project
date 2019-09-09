<template>
    <view class="collectCars">
        <view class="collectCars_box">
            <view class="collectCarsItem">
                <view class="collectCarsItemName">汽车品牌</view>
                <view class="collectCarsItemValue">请选择汽车品牌</view>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">汽车行驶公里数（KM）</view>
                <view class="collectCarsItemValue">请输入行驶公里数</view>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">汽车上牌时间</view>
                <view class="collectCarsItemValue">请选择汽车上牌时间</view>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">联系人</view>
                <view class="collectCarsItemValue">请填写姓名</view>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">联系人电话</view>
                <view class="collectCarsItemValue">请填写电话</view>
                <i class="iconfont "></i>
            </view>
        </view>
        <view class="collectCars_record">提交记录</view>
        <view class="collectCars_btn">
            提交
        </view>
    </view>
</template>

<script>
    export default {
        name: "collectCars"
    }
</script>

<style scoped>

.collectCars_box{
    background: #fff;
}
.collectCarsItem{
    display: flex;
    flex-direction: row;
    height: 113rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    border-bottom: #F0F0F0 solid 1prx;
    font-size:32rpx;
}
.collectCarsItemValue{
    flex: 1;
    text-align: right;
    color: #999999;
    font-size:30rpx;
}
.iconfont{
    width: 60rpx;
}
.collectCars_record{
    margin-top: 20rpx;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    color: #FDD000;
    font-size:30rpx;
}
.collectCars_btn{
    text-align: center;
    background: #FDD000;
    font-size:36rpx;
    color: #FFFFFF;
    position: fixed;
    height: 80rpx;
    line-height: 80rpx;
    right: 0;
    left: 0;
    bottom: 0;
}
</style>