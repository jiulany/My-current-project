<template>
    <view>
        <view class="product-img">
            <img src="" alt="">
        </view>
        <view class="price">
            <text class="new-price">￥4.90</text>
            <text class="old-price">￥15.00</text>
        </view>
        <view class="name">
            <text>汽车玻璃水夏季雨刷精车季通用南方专用</text>
        </view>
        <view class="info">
            <text class="title">商品简介</text>
            <text class="text">汽车挡风玻璃清洗液的俗称。属于汽车使用中的易耗品。 优质的汽车挡风玻璃水主要由水、酒精、乙二醇、缓蚀剂及多种表面活性剂组成。汽车挡风玻璃水俗称玻璃水。\n当车前挡风玻璃透明度下降的时候喷一喷玻璃水，就能够给你一个明朗清晰的视野。特别是在夜间行车时，玻璃上的灰尘会散射光线，这时候就需要喷一喷玻璃水，让前挡风玻璃保持在最佳透明状态。</text>
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
        width: 702rpx;
        height: 497rpx;
        margin: 24rpx 0 0 22rpx;
    }
    .product-img img {
        width: 100%;
        height: 100%;
    }
    .price {
        height: 50rpx;
        padding-top: 50rpx;
        padding-left: 25rpx;
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
        height: 50rpx;
        color: #474747;
        font-size: 31rpx;
        font-weight: bold;
        padding-left: 25rpx;
        margin-top: 20rpx;
    }
    .info .title {
        display: block;
        padding-left: 25rpx;
        color: #474747;
        font-size: 24rpx;
        font-weight: 500;
        margin-top: 36rpx;
    }
    .info .text {
        display: block;
        font-size: 22rpx;
        color: #474747;
        font-weight: 500;
        padding: 0 25rpx;
        margin-top: 30rpx;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        height: 98rpx;
        width: 100%;
    }
    .bottom .inventory { 
        float: left;
        width: 194rpx;
        text-align: center;
        line-height: 38rpx;
        background: #FFFEFF;
        padding-top: 10rpx;
    }
    .bottom .buy {
        float: right;
        width: 556rpx;
        background: #FDD000;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        line-height: 98rpx;
    }
</style>