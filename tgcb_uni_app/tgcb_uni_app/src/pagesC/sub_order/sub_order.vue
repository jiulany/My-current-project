<template>
    <view>
        <view class="top">
            <text>凭订单信息到店自提</text>
        </view>
        <view class="address">
            <text>脱狗车宝（浅水半岛店）</text>
            <text>></text>
        </view>
        <view class="order-details">
            <view class="info">
                <view class="product-img">
                    <img src="" alt="">
                </view>
                <view class="price">
                    <text>玻璃水</text>
                    <text>￥4.9</text>
                </view>
                <view class="count">
                    <text>×4</text>
                </view>
            </view>
            <view class="total">
                <text>商品总价</text>
                <text>￥19.6</text>
            </view>
            <view class="number" style="border:none">
                <text>订单编号</text>
                <text>123456789</text>
            </view>
        </view>
        <view class="button">去支付￥19.6</view>
    </view>
</template>

<script>
export default {
    
}
</script>

<style>
   page {
       background: #FFFEFF;
   }
   .top {
       width: 700rpx;
       height: 100rpx;
       background: #FDD000;
       font-size: 36rpx;
       font-weight: bold;
       text-align: center;
       line-height: 100rpx;
       margin: 25rpx; 
   }
   .address {
       width: 700rpx;
       height: 100rpx;
       line-height: 100rpx;
       display: flex;
       justify-content: space-between;
       font-size: 32rpx;
       font-weight: bold;
       margin: 25rpx 25rpx 0 25rpx;
       background: #fff;
       border: 1rpx solid #ccc;
   }
   .order-details {
       width: 700rpx;
       height: 400rpx;
       background: #fff;
       margin: 10rpx 25rpx 0 25rpx;
       border: 1rpx solid #ccc;
   }
   .order-details .info {
       width: 100%;
       height: 199rpx;
       border-bottom: 1rpx solid #ccc;
   }
   .order-details .info view {
       float: left;
       margin-top: 25rpx;
   }
   .order-details .info .product-img {
       width: 100rpx;
       height: 150rpx;
       border: 1rpx solid #ccc;
        margin-left: 50rpx;
   }
   .order-details .info img {
       width: 100%;
       height: 100%;
   }
   .order-details .info .price {
       width: 150rxp;
       height: 150rpx;
       margin-left: 50rpx;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
   }
   .order-details .info .count {
       float: right;
       width: 40rpx;
       height: 150rpx;
       line-height: 240rpx;
   }
    .order-details .total,
    .order-details .number {
        width: 100%;
        height: 99rpx;
        line-height: 99rpx;
        border-bottom: 1rpx solid #ccc;
        display: flex;
        justify-content: space-between;
    }
    .button {
        position: fixed;
        bottom: 0;
        background: #FDD000;
        width: 100%;
        height: 98rpx;
        line-height: 98rpx;
        text-align: center;
        font-size: 36rpx;
        font-weight: bold;
    }
</style>