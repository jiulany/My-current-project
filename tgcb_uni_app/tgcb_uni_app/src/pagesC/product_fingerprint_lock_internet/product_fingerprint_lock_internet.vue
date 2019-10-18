<template>
    <view>
        <view class="product-img">

        </view>
        <view class="info">
            <view class="price">
                <text>￥799.00</text>
                <text>￥1299.00</text>
            </view>
            <view class="name">指纹锁家用防盗门智能锁单机版</view>
        </view>
        <view class="introduce">商品简介</view>
        <view class="introduce-info">

        </view>
        <view class="bottom">
            <view class="inventory">库存\n(充足)</view>
            <view class="buy">立即购买</view>
        </view>
    </view>
</template>

<script>
export default {
    
}
</script>

<style>
    page {
        background: #fff;
    }
    .product-img {
        width: 700rpx;
        height: 400rpx;
        border: 1rpx solid #ccc;
        margin: 20rpx 25rpx 0 25rpx;
    }
    .info {
        width: 700rpx;
        height: 200rpx;
        border-bottom: 1rpx solid #ccc;
        margin: 0 25rpx 0 25rpx;
        line-height: 200rpx;
    }
    .introduce {
        width: 700rpx;
        height: 100rpx;
        line-height: 100rpx;
        margin-left: 25rpx;
    }
    .introduce-info {
        width: 700rpx;
        height: 1000rpx;
        border: 1rpx solid #ccc;
        margin-left: 25rpx;
        margin-bottom: 150rpx;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        height: 98rpx;
        width: 100%;
    }
    .bottom .inventory {
        display: inline-block;
        width: 10%;
        height: 100%;
        text-align: center;
        padding: 0rpx 5%;
        line-height: 35rpx;
    }
    .bottom .buy {
        display: inline-block;
        width: 80%;
        background: #FDD000;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        height: 98rpx;
        line-height: 98rpx;
    }
</style>