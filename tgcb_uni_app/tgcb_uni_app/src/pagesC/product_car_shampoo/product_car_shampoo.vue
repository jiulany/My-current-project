<template>
    <view>
        <view class="product-img">
            <img src="" alt="">
        </view>
        <view class="price">
            <text class="new-price">￥20.00</text>
            <text class="old-price">￥30.00</text>
        </view>
        <view class="name">
            <text>正品镀膜汽车液汽车水水蜡强力去污上光专用</text>
        </view>
        <view class="info">
            <text class="title">商品简介</text>
            <text class="text">让车漆闪亮的洗车神水洗车水蜡清洁/温馨/上光三合一，因产品而出色，强力清洁，泡沫丰富，润温上光，不伤车漆，不上车，自带芳香。</text>
        </view>
        <view class="bottom">
            <view class="inventory"><text>库存\n(充足)</text></view>
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
        width: 704rpx;
        height: 496rpx;
        margin: 25rpx 0 0 22rpx;
    }
    .product-img img {
        width: 100%;
        height: 100%;
    }
    .price {
        height: 33rpx;
        padding-top: 50rpx;
        padding-left: 20rpx;
        border-top: 1rpx solid #E2DED7;
    }
    .price .new-price {
        color: #F75C3E;
        font-size: 43rpx;
        font-weight: bold;
    }
    .price .old-price {
        color: #C6C6C6;
        font-size: 29rpx;
        text-decoration: line-through;
        margin-left: 20rpx;
    }
    .name {
        height: 30rpx;
        width: 702rpx;
        color: #474747;
        font-size: 31rpx;
        font-weight: bold;
        margin-left: 20rpx;
        margin-top: 50rpx;
        padding-bottom: 100rpx;
        border-bottom: 1rpx solid #ccc;
    }
    .info .title {
        display: block;
        color: #474747;
        font-size: 24rpx;
        margin-top: 30rpx;
        padding-left: 20rpx;
    }
    .info .text {
        display: block;
        font-size: 22rpx;
        color: #474747;
        padding: 0 20rpx;
        line-height: 30rpx;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        height: 98rpx;
        width: 100%;
    }
    .bottom .inventory {
        float: left;
        width: 196rpx;
        text-align: center;
        line-height: 40rpx;
        padding-top: 10rpx;
    }
    .bottom .buy {
        float: right;
        width: 554rpx;
        background: #FDD000;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        line-height: 98rpx;
    }
</style>