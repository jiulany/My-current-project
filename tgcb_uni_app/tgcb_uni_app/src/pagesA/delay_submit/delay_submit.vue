<template>
    <view class="order">
        <view class="order_top">
            <view :class="active==0?'order_item active':'order_item'" @click="active=0">全部</view>
            <view :class="active==1?'order_item active':'order_item'" @click="active=1">待评估</view>
            <view :class="active==2?'order_item active':'order_item'" @click="active=2">待支付</view>
            <view :class="active==3?'order_item active':'order_item'" @click="active=3">已生效</view>
        </view>
        <view class="content">
            <swiper class="swiper" :current="active" duration="0">
                <swiper-item class="swiper-box">
                    <scroll-view scroll-y style="height: 100%;" @scrolltolower="scrolltolower">
                        <view class="middle">
                            <view class="left">
                                <text>已申请</text>
                                <text style="margin-top:2rpx">待评估</text>
                            </view>
                            <view class="number">
                                <text>川A1213</text>
                                <text>车辆评估申请</text>
                            </view>
                            <view class="arrow">
                                <view class="iconfont icon-xiayibu"></view>
                            </view>
                        </view>
                        <view class="bottom">
                            <block  v-for="(item,index) in list" :key="index">
                                <view>
                                    <view class="title">
                                        <text>申请项目{{item.details.length}}项</text>
                                        <text class="price">{{item.order_total_price}}</text>
                                    </view>
                                    <view class="time">
                                        <view>
                                            <text class="date">申请日期：{{item.created_at}}</text>
                                            <text class="date">有效时间：{{item.end_time}}</text>
                                        </view>
                                        <picker @change="bindPickerChange" :value="index" :range="array">
                                            <view class="button">取消申请</view>
                                        </picker>
                                    </view>
                                </view>
                                
                            </block>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
        <popup-layer ref="popupRef" :direction="'top'">
            <view class="zidingyiBox">
                <choice-pay-type style="width:100%" :order_id="order_id" @close_pay_type="closePayType"> </choice-pay-type>  
            </view>
        </popup-layer>
    </view>
</template>

<script>
    import { UserModel } from "../../model/user"
    const userModel = new UserModel();
    export default {
        name: "order",
        data () {
            return {
                active:0,
                array: ['价格不合理', '保障信息不全', '流程不对', '暂时没有这方面的需求'],
                page: 1,
                size: 4,
                flag: true,
                list: []
            }
        },
        components:{
    
        },
        methods:{
            scrolltolower() {
                if(this.flag == true) {
                    this.applyProjectList();
                }
            },
            applyProjectList() {
                let params = {
                    page: this.page,
                    size: this.size
                }
                userModel.applyProjectList(params).then((res) => {
                    console.log(res);
                    if(res.code == 200) {
                        this.list = this.list.concat(res.data);
                        if(res.data.length == 0) {
                            this.flag = false;
                        }else {
                            this.flag = true;
                            this.page = this.page + 1;
                        }
                    }
                });
            }
        },
        onLoad(option){
           this.applyProjectList();
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
.middle {
    width: 100%;
    height: 197rpx;
    background: #fff;
}
.left {
    float: left;
    width: 135rpx;
    height: 90rpx;
    background: #FDD000;
    border-radius: 50%;
    padding-top: 45rpx;
    margin-top: 37rpx;
    margin-left: 33rpx;
}
.middle .left text {
    display: block;
    width: 90rpx;
    height: 32rpx;
    font-family: PingFang SC;
    text-align: center;
    font-weight: 400;
    color:rgba(51,51,51,1);
    font-size: 30rpx;
    line-height: 10rpx;
    margin-left: 23rpx;
}
.middle .number {
    float: left;
    width: 200rpx;
    height: 130rpx;
    padding-top: 60rpx;
    padding-left: 40rpx;
}
.number text {
    display: block;
    padding-top: 24rpx;
    line-height: 20rpx;
    font-size: 32rpx;
    font-weight: 500;
    font-family:PingFang SC;
    color:rgba(51,51,51,1);
}
.arrow {
    float: right;
    margin-right: 31rpx;
    color: #4A4A4A;
    font-size: 50rpx;
    margin-top: 80rpx;
}
.bottom {
    width: 100%;
    background: #fff;
    margin-top: 20rpx;
    padding-bottom: 200rpx;
}
.bottom .title {
    height: 105rpx;
    border-bottom: 1rpx solid #F0F0F0;
    line-height: 84rpx;
    margin-bottom: 20rpx;
    padding: 0 36rpx;
}
.bottom .title .price {
    float: right;
    color: #F75C3E;
    font-size: 32rpx;
    padding-right: 20rpx;
}
.bottom .time {
    overflow: hidden;
    margin-top: 32rpx;
}
.bottom .time .date {
    display: block;
    color: #333333;
    font-size: 30rpx;
    padding-left: 36rpx;
}
.button {
    float: right;
    width: 208rpx;
    height: 70rpx !important;
    background: #FDD000;
    color: #333333;
    font-size: 36rpx;
    text-align: center;
    line-height: 70rpx;
    border-radius: 50rpx;
    margin-top: 32rpx;
    margin-right: 20rpx;
} 
</style>