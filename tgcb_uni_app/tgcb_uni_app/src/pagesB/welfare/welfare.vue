<template>
    <view class="welfare">
        <view class="welfare_item">
            <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566593623308&di=7019ef943f1a53736b8b6cbcf9e5d491&imgtype=0&src=http%3A%2F%2Fimage.xcar.com.cn%2Fattachments%2Fa%2Fday_140319%2F2014031916_1bd6ffb9d5553620f870beYW9d0Nxj0n.jpg"></image>
            <view class="title">洗车包季</view>
            <view class="price">￥85.00</view>
        </view>
        <view class="welfare_item">
            <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566593623308&di=7019ef943f1a53736b8b6cbcf9e5d491&imgtype=0&src=http%3A%2F%2Fimage.xcar.com.cn%2Fattachments%2Fa%2Fday_140319%2F2014031916_1bd6ffb9d5553620f870beYW9d0Nxj0n.jpg"></image>
            <view class="title">洗车包季</view>
            <view class="price">￥85.00</view>
        </view>
        <view class="welfare_item">
            <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566593623308&di=7019ef943f1a53736b8b6cbcf9e5d491&imgtype=0&src=http%3A%2F%2Fimage.xcar.com.cn%2Fattachments%2Fa%2Fday_140319%2F2014031916_1bd6ffb9d5553620f870beYW9d0Nxj0n.jpg"></image>
            <view class="title">洗车包季</view>
            <view class="price">￥85.00</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "welfare"
    }
</script>

<style scoped>
.welfare{
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: space-between;
    padding: 0 20rpx;

}
.welfare_item{
    margin-top: 10rpx;
    background: #fff;
    width: 340rpx;
    margin-bottom: 10rpx;
}
.welfare_item image{
    height: 360rpx;
    width: 340rpx;
}
    .title{
        margin-left: 15rpx;
    }
    .price{
        margin-left: 15rpx;
        color: #F75C3E;
    }
</style>