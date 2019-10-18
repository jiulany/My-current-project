<template>
    <view>   
        <!-- banner -->
        <view class="banner" style="height:100%">
            <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles" style="height:100%">
                <swiper class="swiper-box" @change="change">
                    <swiper-item v-for="(item ,index) in info" :key="index" style="background:#fff">
                        <view class="swiper-item" style="height:361rpx">
                            {{item.content}}
                        </view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>   
        </view>
        <!-- 商品区域 -->
        <view class="product">
            <block v-for="(item,index) in productList" :key="index">
                <view class="item" @tap="goProductDetail()">
                    <view class="product-img">
                        <img :src="item.img" alt="">
                    </view>
                    <view class="product-name">
                        <text>{{item.name}}</text>
                    </view>
                    <view class="product-price">
                        <text class="symbol">￥</text>
                        <text>{{item.price}}</text>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
import { uniSwiperDot } from "@dcloudio/uni-ui";
export default {
    data() {
        return {
            productList: [
                {
                    id: 1,
                    img: '',
                    name: '玻璃水',
                    price: '100.00'
                },
                {
                    id: 2,
                    img: '',
                    name: '洗车液',
                    price: '100.00'
                },
                {
                    id: 3,
                    img: '',
                    name: '蜡洗洗车液',
                    price: '100.00'
                },
                {
                    id: 4,
                    img: '',
                    name: '镀膜洗车液',
                    price: '100.00'
                }
            ],
            info: [{
                content: '内容 A'
            }, {
                content: '内容 B'
            }, {
                content: '内容 C'
            }],
            current: 0,
            mode: 'long',
            dotsStyles: {
                backgroundColor: "rgba(253, 208, 0, 0.3)",
                border: "1px rgba(253, 208, 0, 0.3) solid",
                color: "#fff",
                selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
                selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
            }
        }
    },
    methods: {
        change(e) {
            this.current = e.detail.current;
        },
        goProductDetail() {
            uni.navigateTo({
                url: "/pagesC/product_car_duster/product_car_duster"
            });
        }
    },
    components: {uniSwiperDot}
}
</script>

<style>
.swiper-box{
    overflow: scroll;
    height: 361rpx;
}
.banner .swiper-item {
    width: 100%;
    height: 100%;
}
.product {
    display: flex;
    flex-flow: row wrap;
    margin-top: 68rpx;
    padding-bottom: 200rpx;
    padding-left: 15rpx;
}
.product .item {
    width: 327rpx;
    height: 477rpx;
    margin-top: 24rpx;
    margin-left: 24rpx;
    background: #fff;
}
.item .product-img {
    width: 289rpx;
    height: 246rpx;
    border: 1rpx solid #ccc;
    margin: 46rpx 0 0 19rpx;
}
.item .product-img img {
    width: 100%;
    height: 100%;
}
.item .product-name {
    width: 289rpx;
    color: #474747;
    font-size: 24rpx;
    font-weight: bold;
    margin: 44rpx 0rpx 0 19rpx;
    line-height: 30rpx;
}
.item .product-price {
    height: 100rpx;
    font-size: 29rpx;
    color: #F75C3E;
    font-weight: bold;
    margin: 30rpx 0 0 19rpx;
}
.symbol {
    font-size: 14rpx;
}
</style>