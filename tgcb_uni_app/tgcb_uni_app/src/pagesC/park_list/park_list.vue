<template>
    <view>
        <view class="top">
            <text>共<text class="active">{{data.count}}条</text>违章信息，累计罚金<text class="active">{{data.totalprice}}元</text>，累计扣分<text class="active">{{data.totalscore}}分</text></text>
        </view>
        <view class="main" v-for="(item,index) in data.list" :key="index">  
            <view class="list">
                <text class="left">违章时间：</text>
                <text class="right">{{item.time}}</text>
            </view>
            <view class="list">
                <text class="left">违章地点：</text>
                <text class="right">{{item.address}}</text>
            </view>
            <view class="list">
                <text class="left">违章代码：</text>
                <text class="right">{{item.number}}</text>
            </view>
            <view class="list">
                <text class="left">违章内容：</text>
                <text class="right">{{item.content}}</text>
            </view>
            <view class="list">
                <text class="left">违章金额：</text>
                <text class="right active">{{item.price}}元</text>
            </view>
            <view class="list">
                <text class="left">违章扣分：</text>
                <text class="right active">{{item.score}}分</text>
            </view>
            <view class="list">
                <text class="left">违章状态：</text>
                <text class="right">待处理</text>
                <button class="button">申请代办</button>
            </view>
        </view>

    </view>
</template>

<script>
import {CarModel} from "../../model/car";
const carModel = new  CarModel()
export default {
    data(){
        return {
            data:{},
        }
    },
    methods:{
        violationEnquiry(data){
            carModel.violationEnquiry(data).then((res) => {
                this.data = res.data.result
                console.log(res.data)
                console.log(res.data.result)
            })
        }
    },
    onLoad(options){
        console.log(options.data)
        this.violationEnquiry(JSON.parse(options.data))
    }
}
</script>

<style lang="less">
.top {
    width: 100%;
    padding: 40rpx 126rpx 20rpx 40rpx;
    color: #666;
}
.main {
    width: 100%;
    height: 622rpx;
    background: #fff;
    margin-top: 20rpx;
    font-size: 28rpx;
    padding-top: 22rpx;
}
.main .list {
    height: 90rpx;
}
.main view:nth-child(4) .right {
    display: inline-block;
    width: 530rpx;
    height: 62rpx;
    line-height: 36rpx;
    vertical-align: -50%;
}
.left {
    display: inline-block;
    color: #999;
    padding-left: 32rpx;
}
.right {
    display: inline-block;
    padding-left: 42rpx;
}
.button {
    float: right;
    display: inline-block;
    width: 170rpx;
    height: 54rpx;
    color: #666;
    font-size: 28rpx;
    background: #FDD000;
    line-height: 54rpx;
    margin: 0;
    margin-right: 34rpx;
}
.active {
    color: #FF5622;
}
</style>