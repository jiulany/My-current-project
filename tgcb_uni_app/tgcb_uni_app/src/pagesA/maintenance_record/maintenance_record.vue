<template>
    <view class="order">
        <view class="order_top">
            <view :class="active==0?'order_item active':'order_item'" @click="active=0">按时间</view>
            <view :class="active==1?'order_item active':'order_item'" @click="active=1">按项目</view>
        </view>
            <swiper class="swiper" :current="active" duration="0" >
                <swiper-item class="swiper-box" catchtouchmove="stopTouchMove">
                    <scroll-view scroll-y style="height:100%">
                        <view style="padding-bottom:350rpx">
                            <view class="mile">
                                <text>里程（公里）：9公里</text>
                            </view>
                            <view class="item">
                                <view class="head">
                                    <text>首保</text>
                                    <text>预计于2019-07-10</text>
                                </view>
                                <view class="main">
                                    <text>预计里程：9公里</text>
                                    <text>预计保养项：2项</text>
                                    <text>添加本次保养记录</text>
                                </view>
                                <view class="button1">></view>
                            </view>
                        </view>
                    </scroll-view>
                </swiper-item>
                <swiper-item class="swiper-box" catchtouchmove="stopTouchMove">
                    <scroll-view style="height:100%" scroll-y="true">
                        <view style="padding-bottom:350rpx">
                            <view class="base">基础保养项</view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="items">
                                <view class="header">
                                    <img src="https://imgcdn.tuogouchebao.com/jiyou@2x.png" alt="">
                                    <text class="items_name">发动机机油</text>
                                    <text class="items_num">0次</text>
                                </view>
                                <view>
                                    <text class="items_interval">保养间隔：50000公里/6个月</text>
                                </view>
                                <view class="box">
                                    <view class="remain_mile">
                                        <view class="text">里程剩余0公里</view>
                                        <view class="progress-box pro">
                                            <progress percent="80" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                    <view class="remain_day">
                                        <view class="text">时间剩余0天</view>
                                        <view class="progress-box pro">
                                            <progress percent="0" activeColor="#FDD000" active stroke-width="10" backgroundColor="#fff"/>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>      
            <view class="button3" @tap="create">添加</view>           
        </view>
</template>

<script>
    export default {
        name: "order",
        data () {
            return {
                active:0,
            }
        },
        components:{
        
        },
        methods:{
            stopTouchMove(e) {
                return false;
            },
            test(e) {
                console.log(e);
            },
            create(){
                uni.navigateTo({
                    url:`/pagesA/maintenance_record_add/maintenance_record_add`
                })
            }
        },
        onLoad(option){
            
        },
        onShow(){
            
        }
    }
</script>

<style scoped> 
 .order,.content,.swiper{
     height: 100%;
     overflow: hidden;
 }
.order_top{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    height: 98rpx;
    background: #F7F7F7;
}
.order_item{
    flex: 1;
    text-align: center;
    height: 98rpx;
    line-height: 98rpx;
}
.active {
    background: #FDD000;
    display: block;
    color: #fff;
}
.swiper-box{
    overflow: scroll;
}
.mile {
    color: #666666;
    font-size: 34rpx;
    color: #666666;
    padding: 66rpx 0 0 34rpx;
}
.item {
    position: relative;
    width: 704rpx;
    height: 301rpx;
    background: #fff;
    margin: 26rpx 0 0 24rpx;
}
.head {
    display: flex;
    width: 100%;
    height: 71rpx;
    background: #FDD000;
    justify-content: left;
}
.head text {
    width: 286rpx;
    line-height: 71rpx;
    padding-left: 66rpx;
    color: #333333;
    font-size: 32rpx;
    font-weight: 500;
}
.main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 40rpx;
    padding-left: 12rpx;
    color: #666666;
    font-size: 30rpx;
}
.main text:nth-child(3) {
    margin-top: 20rpx;
}
.button1 {
    position: absolute;
    top: 100rpx;
    right: 36rpx;
    width: 18rpx;
    height: 26rpx;
    color: #4A4A4A;
    font-size: 40rpx;
}
.button2 {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98rpx;
    background: #FDD000;
    color: #474747;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    line-height: 98rpx;
}
.base {
    width: 100%;
    height: 40rpx;
    padding: 40rpx 0 0 35rpx;
    color: #666666;
    font-size: 30rpx;
    margin: 0;
}
.items {
    width: 700rpx;
    height: 318rpx;
    background: #fff;
    margin: 25rpx 0 0 25rpx;
}
.items img {
    width: 33rpx;
    height: 23rpx;
    margin-left: 20rpx;
}
.items .header {
    overflow: hidden;
}
.items .box {
    overflow: hidden;
}
.items .items_name {
    width: 350rpx;
    color: #333333;
    font-size: 32rpx;
    margin-left: 20rpx;
    font-weight: 500;
}
.items .items_num {
    float: right;
    width: 350rpx;
    text-align: right;
    color: #474747;
    font-size: 32rpx;
    margin-right: 29rpx;
} 
.items .items_interval {
    color: #333333;
    font-size: 32rpx;
    font-weight: 500;
    padding-left: 69rpx;
}
.remain_mile,
.remain_day {
    float: left;
    width: 303rpx;
    height: 135rpx;
    background: #F5F5F5;
    margin: 49rpx 0 0 31rpx;
}
.pro {
    width: 241rpx;
    border-radius: 50rpx;
    overflow: hidden;
    margin: 10rpx 0 0 31rpx;
}
.text {
    color: #333333;
    font-size: 30rpx;
    margin: 28rpx 0 0 54rpx;
}
.button3 {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98rpx;
    background: #FDD000;
    color: #474747;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    line-height: 98rpx;
}
</style>