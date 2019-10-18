<template>
    <view>
        <cover-view :class="isdisplay == 'none' ? '' : 'mask' "></cover-view>
        <view class="product-img" style="height:100%">
            <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles"  style="height:100%">
                <swiper class="swiper-box" @change="change">
                    <swiper-item v-for="(item ,index) in info" :key="index" style="background:#fff">
                        <view class="swiper-item" style="height:497rpx;background:#ccc">
                            {{item.content}}
                        </view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot> 
        </view>
        <view class="price">
            <text class="new-price">￥20.00</text>
        </view>
        <view class="name">
            <text>汽车用品洗车刷子扫灰除尘掸子车用蜡拖</text>
        </view>
        <view class="info">
            <text class="title">商品简介</text>
            <text class="text">天然优势棉线静电除尘保护车漆大覆盖面积，强力清洁，加长棉线，覆盖面积比普通蜡拖多清洁更省力。具有良好的弹性和抗压不变形不伤车漆，热天防老化耐臭氧耐化学左右，不变形。</text>
        </view>
        <view class="bottom">
            <view class="self-support">脱狗自营</view>
            <view class="add-cart" @tap="open">立即购买</view>
        </view>
        <!-- 点击加入购物车弹出框 -->
        <view class="add-dialog" v-bind:style="'display:' + isdisplay">
            <view class="top">
                <view class="add-img"></view>
                <view class="message">
                    <view>￥18.00</view>
                    <view>库存：充足</view>
                    <view>已选：{{choosedName}}</view>
                </view>
                <view class="close" @tap="close">×</view>
            </view>
            <block v-for="(item,index) in chooseList" :key="index">
                <view class="item">
                    <view class="title">{{item.title}}</view>
                    <block v-for="(list,key) in item.chooseItem" :key="key">
                        <view :class="list.active == true ? 'choose-item active' : 'choose-item'" @tap="choose(index,key)">{{list.name}}</view>
                    </block>
                </view>
            </block>
            <view class="count">
                <view class="title" style="padding-left:24rpx">数量</view>
                <view style="padding-left:24rpx">
                    <button class="sub" @tap="sub" :disabled="isdisabled">-</button>
                    <input type="text" class="num" :value="count" @change="numChange">
                    <button class="add" @tap="add">+</button>
                </view>
            </view>
            <view class="dialog-add-cart">立即购买</view>
        </view>
    </view>
</template>

<script>
import { uniSwiperDot } from "@dcloudio/uni-ui";
export default {
    data() {
        return {
            isdisplay: 'none',
            count: 1,
            isdisabled: false,
            chooseList: [
                {
                    title: '套餐分类',
                    chooseItem: [
                        {
                            id: 1,
                            name: '官方标配'
                        }
                    ]
                },
                {
                    title: '规格',
                    chooseItem: [
                        {
                            id: 2,
                            name: '180*20cm'
                        },
                        {
                            id: 3,
                            name: '190*20cm'
                        }
                    ]
                }
            ],
            choosed: [],
            choosedName: '',
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
        open() {
            if(this.isdisplay == 'none') {
                this.isdisplay = 'block';
            }
        },
        close() {
            if(this.isdisplay == 'block') {
                this.isdisplay = 'none';
            }
        },
        sub() {
            if(this.count == 1) {
                this.isdisabled = true;
            }else {
                this.count--;
            }
            console.log(this.isdisabled);
        },
        add() {
            this.count++;
            if(this.count > 1) {
                this.isdisabled = false;
            }
        },
        numChange(e) {
            console.log(e);
            let count = e.detail.value;
            if(!(/^[0-9]*[1-9][0-9]*$/).test(count)) {
                uni.showToast({
                    title: '只能输入正整数，请重新输入',
                    icon: 'none'
                });
            }else {
                this.count = count;
                console.log(this.count);
            }
            
        },
        choose(index,key) {
            let array = this.chooseList[index]['chooseItem'][key];
            console.log(index);
            if(array['active']) {
                array['active'] = false;
                var index = this.choosed.indexOf(array.id);
                this.choosed.splice(index,1);
            }else {
                array['active'] = true;
                this.choosed.push(array.id);
            }
            this.chooseList = JSON.parse(JSON.stringify(this.chooseList));
            if(!(array.id > 1)) {
                array.active == true ? this.choosedName = array.name : this.choosedName = '';
            }
        }
    },
    components: {uniSwiperDot},
    onLoad() {
        
    }
}
</script>

<style>
    page {
        background: #fff;
    }
    .mask{
        background: rgba(0,0,0,1);
        opacity: 0.64;
        width:100vw;
        height: 100vh;
        position: fixed;
        z-index:9999
    }
    .swiper-box {
        overflow: scroll;
        height: 497rpx;
    }
    
    .product-img {
        height: 100%;
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
    .name {
        height: 30rpx;
        width: 702rpx;
        font-weight:bold;
        color:rgba(71,71,71,1);
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
        margin-top: 30rpx;
        line-height: 30rpx;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        height: 88rpx;
        width: 100%;
        text-align: center;
        color: #474747;
        font-size: 0rpx;
    }
    .bottom .self-support {
        float: left;
        width: 30%;
        height: 88rpx;
        line-height: 88rpx;
        background: #FFFEFF;
        font-size: 22rpx;
    }
    .bottom .add-cart {
        float: left;
        width: 70%;
        height: 88rpx;
        line-height: 88rpx;
        background: #FDD000;
        font-size: 22rpx;
    }
    .add-dialog {
        position: fixed;
        /* display: none; */
        bottom: 0;
        width: 750rpx;
        height: 730rpx;
        background: #fff;
        border-top: 1rpx solid #ccc;
        z-index: 9999;
    }
    .add-dialog .top {
        position: relative;
        height: 150rpx;
        padding-bottom: 18rpx;
    }
    .add-dialog .add-img {
        position: absolute;
        left: 24rpx;
        top: -45rpx;
        width: 193rpx;
        height: 193rpx;
        border: 1rpx solid #ccc;
        background: #000;
        z-index: 9999;
    }
    .add-dialog .top .message {
        width: 200rpx;
        height: 150rpx;
        margin-left: 231rpx;
    }
    .add-dialog .top .close {
        position: absolute;
        top: 30rpx;
        right: 36rpx;
        width: 36rpx;
        height: 36rpx;
        border: 1rpx solid #ccc;
    }
    .item {
        width: 100%;
        height: 110rpx;
        padding-left: 24rpx;
        margin-top: 34rpx;
    }
    .item .title {
        height: 30rpx;
        color: #333333;
        font-size: 29rpx;
        font-weight: bold;
        line-height: 26rpx;
    }
    .choose-item {
        display: inline-block;
        width: 171rpx;
        height: 64rpx;
        margin-top: 19rpx;
        margin-right: 28rpx;
        color: #333333;
        font-size: 27rpx;
        font-weight: 500;
        text-align: center;
        line-height: 64rpx;
        border: 1rpx solid #999999;
    }
    .active {
        background: #FDD000;
        border: 1rpx solid #FDD000;
        color: #fff;
    }
    .count {
        height: 110rpx;
        margin-top: 34rpx;
    }
    .count .title {
        height: 30rpx;
        color: #333333;
        font-size: 29rpx;
        font-weight: bold;
        line-height: 26rpx;
    }
    .count .sub,
    .count .num,
    .count .add {
        float: left;
        width: 71rpx;
        height: 59rpx;
        margin-top: 19rpx;
        border: 1rpx solid rgba(153,153,153,1);
        text-align: center;
        line-height: 59rpx;
        color: #333333;
        font-size: 26rpx;
        border-radius: 0 !important;
        box-sizing: content-box !important;
        padding: 0;
        background: #fff;
    }
    .count .num {
        border-left: none;
        border-right: none;
    }
    .dialog-add-cart {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        background: #FDD000;
        color: #fff;
        font-size: 30rpx;
    }
    button::after {
        border-radius: 0;
        border: none;
    }
</style>