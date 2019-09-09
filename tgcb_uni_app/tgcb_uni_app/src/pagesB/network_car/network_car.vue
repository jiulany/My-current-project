<template>
    <view class="new_car">
        <view class="banner">
            <image src="https://www.buick.com.cn/img/newregal/newregal/kv1.jpg"></image>
        </view>
        <view class="new_car_box">
            <view class="new_car_box_items">
                <image src="https://www.buick.com.cn/img/newregal/newregal/kv1.jpg"></image>
                <view class="desc">
                    <view class="title">机油</view>
                    <view class="price">￥199.00</view>
                </view>
                <view class="pay">立即购买</view>
            </view>
            <view class="new_car_box_items">
                <image src="https://www.buick.com.cn/img/newregal/newregal/kv1.jpg"></image>
                <view class="desc">
                    <view class="title">机油</view>
                    <view class="price">￥199.00</view>
                </view>
                <view class="pay">立即购买</view>
            </view>
            <view class="new_car_box_items">
                <image src="https://www.buick.com.cn/img/newregal/newregal/kv1.jpg"></image>
                <view class="desc">
                    <view class="title">机油</view>
                    <view class="price">￥199.00</view>
                </view>
                <view class="pay">立即购买</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "network_car"
    }
</script>

<style scoped>
    .new_car{
        height: 100%;
        background: #fff;
    }
    .banner image{
        width: 100%;
        height: 430rpx;
    }
    .new_car_box{
        padding-top: 20rpx;
        display: flex;
        flex-direction: column;
    }
    .new_car_box_items{
        height: 204rpx;
        background: #fff;
        border-bottom: #F0F0F0 solid 1rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .new_car_box_items:last-child{
        border-bottom: none;
    }
    .price{
        font-size:30rpx;
        font-weight:500;
        color:rgba(253,71,93,1);
    }
    .desc{
        height: 204rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .new_car_box_items image{
        margin-left: 34rpx;
        margin-right: 54rpx;
        width:155rpx;
        height:156rpx;
    }
    .title{
        font-size:36rpx;
        color:rgba(102,102,102,1);
    }
    .pay{
        width:171rpx;
        height:58rpx;
        background:rgba(253,208,0,1);
        border-radius:27rpx;
        text-align: center;
        line-height: 58rpx;
        margin-right: 27rpx;
        font-size:30rpx;
        color:rgba(255,255,255,1);
    }
</style>