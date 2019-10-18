<template>
    <view class="order">
        <view class="order_top">
            <view :class="active==0?'order_item active':'order_item'" @click="active=0">标准保养计划</view>
            <view :class="active==1?'order_item active':'order_item'" @click="active=1">原厂配件参数</view>
        </view>
        <view class="content">
            <swiper class="swiper" :current="active" duration="0" >
                <swiper-item class="swiper-box" catchtouchmove="stopTouchMove">
                    <scroll-view scroll-y style="height: 100%;">
                        <view class="car" @tap="change" v-if="chooseCar.sales_name">
                            <view>
                                <image :src="chooseCar.vehicle.url"></image>
                            </view>
                            <view style="font-size:rpx">
                                <text>宝马</text>
                                <text>{{chooseCar.sales_name}}</text>
                            </view>
                            <view  class="change">
                                <text>切换车辆</text>
                            </view>
                        </view>
                        <view class="list">
                            <view>
                                <view class="left">
                                    <view v-for="(value,key) in label" :key="key">{{value}}</view>
                                </view>

                                <view class="right">
                                    <scroll-view scroll-x='true' style="height: 100%;">
                                        <view class="line" v-for="(item,index) in suggest_data" :key="index">
                                            <view v-for="(value,index) in item" :key="index">
                                                <view class="circles" v-if="value == 'True'"></view>
                                                <view v-if="value != 'True' && value != 'False'">{{value}}</view>
                                            </view>
                                        </view>
                                        
                                    </scroll-view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </swiper-item>
                <swiper-item catchtouchmove="stopTouchMove">
                    <view class="argument">
                        <view :class="index == 0? 'header' :'line'" v-for="(item,index) in accessory_data" :key='index'>
                            <text v-for="(value,key) in item" :key="key">{{value}}</text>
                        </view>
             
                    </view>
                </swiper-item>
            </swiper>                 
        </view>
    </view>    
</template>

<script>
import { IndexModel } from '../../model/index';
import { UserModel } from '../../model/user';
const indexModel = new IndexModel();
const userModel = new UserModel();
    export default {
        name: "order",
        data () {
            return {
                active:0,
                suggest_data:[],
                label:[],
                chooseCar:{},
                accessory_data:[]
            }
        },
        components:{
           
        },
        methods:{
            getData(equipmen_id)
            {
                let params = {
                    equipmens_id : equipmen_id
                }
                indexModel.maintenanceManual(params).then((res) => {
                    let data = res.data
                    let suggest_data = JSON.parse(data.suggest_data)
                    let accessory_data = JSON.parse(data.accessory_data)
                    for(let i in suggest_data) {
                        this.label.push(suggest_data[i][0])
                        this.suggest_data.push(suggest_data[i].slice(1))
                        
                    }
                    this.accessory_data = accessory_data
                    console.log(this.suggest_data)
                })
            },
            getCar()
            {
                userModel.getCars().then((res) => {
                    this.chooseCar = res.data[0]
                    this.getData(this.chooseCar.equipmen_id)
                })
            },
            change()
            {
                uni.navigateTo({
                    url:`/pagesA/my_car/my_car?type=manual`
                })
            }
        },    
        onLoad(option){
            
        },
        onShow(){
            let choice_car = uni.getStorageSync("choice_car");
            if (choice_car) {
            this.chooseCar = JSON.parse(choice_car);
            this.getData(this.chooseCar.equipmen_id)
            } else {
                this.getCar()
            }
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
.car {
    overflow: hidden;
    display: hidden;
    width: 100%;
    /* height: 146rpx; */
    background: #fff;
    margin-top: 18rpx;
    position: relative;
    padding: 30rpx 0;
}
.car .change{
    position: absolute;
    right: 30rpx;
}
.car image{
    width: 100%;
    height: 100%;
}
.car view:nth-child(1) {
    float: left;
    width: 113rpx;
    height: 109rpx;
    /* border: 1rpx solid #ccc; */
    margin-left: 36rpx;
    margin-top: 19rpx;
}
.car view:nth-child(2) {
    float: left;
    padding: 23rpx 0;
    margin-left: 19rpx;
    color: #333333;
    font-size: 32rpx;
    width: 70%;
}
.car view:nth-child(2) text {
    display: block;
}
.car view:nth-child(3) {
    float: left;
    color: #999999;
    font-size: 26rpx;
    margin-left: 34rpx;
    padding-top: 25rpx;
}
.list {
    width: 100%;
    /* height: 2155rpx; */
    padding-top: 20rpx;
    /* overflow: hidden; */
}
.left {
    float: left;
    width: 20%; 
}
.left  view {
    width: 214rpx;
    height: 97rpx;
    border-bottom: 1rpx solid #E6E6E6;
    border-right: 1rpx solid #E6E6E6;
    background: #F5F5F5;
    color: #333333;
    font-size: 28rpx;
    text-align: center;
    /* line-height: 97rpx; */
    display: flex;
    align-items: center;
    justify-content: center
}
.left view:nth-child(1) {
    background: #FDD000;
}
.right {
    float: right;
    width: 71%;
    background: #fff;
    font-size: 0rpx;
    overflow: hidden;
}
.right .line {
    width: 3150rpx;
    /* width: 2000rpx; */
    /* height: 97rpx; */
    overflow: hidden;
}
.line .circles{
    width: 25rpx !important;
    height: 25rpx !important;
    border-radius: 25rpx !important;
    background: #FDD000;
    margin:29rpx auto;
}
.right .line>view {
    float: left;
    /* width: 154rpx; */
    width: 115rpx;
    height: 97rpx;
    border-bottom: 1rpx solid #E6E6E6;
    border-right: 1px solid #E6E6E6;
    border-left: none;
    color: #333333;
    font-size: 28rpx;
    padding: 0 20rpx;
}
.right .line:nth-child(1) {
    background: #F5F5F5;
    line-height: 50rpx;
}
.message {
    width: 100%;
    height: 24rpx;
    color: #666666;
    font-size: 24rpx;
    text-align: center;
    padding-top: 42rpx;
    padding-bottom: 20rpx;
    background: #fff;
}
.button {
    width: 100%;
    height: 98rpx;
    background: #FDD000;
    text-align: center;
    line-height: 98rpx;
    font-size: 36rpx;
    color: #474747;
    font-weight: bold;
}
.argument {
    width: 697rpx;
    height: 410rpx;
    background: #fff;
    margin: 19rpx 28rpx 0 25rpx;
}
.argument .header {
    width: 100%;
    height: 43rpx;
    background: #FAFAFA;
    display: flex;
    flex: 1;
    justify-content: center;
    padding-top: 20rpx;
}
.argument .header text {
    width: 231rpx;
    text-align: center;
    color: #666666;
    font-size: 24rpx;
}
.argument .header text:nth-child(1) {
    text-align: left;
    padding-left: 43rpx;
    width: 188rpx;
}
.argument .header text:nth-child(2) {
    border-left: 1rpx solid #E6E6E6;
    border-right: 1rpx solid #E6E6E6;
}
.argument .line {
    width: 100%;
    height: 87rpx;
    display: flex;
    flex: 1;
    justify-content: center;
    border-bottom: 1rpx solid #E6E6E6;
    line-height: 87rpx;
}
.argument .line text {
    width: 231rpx;
    color: #666666;
    font-size: 24rpx;
    text-align: center;
}
.argument .line text:nth-child(1) {
    text-align: left;
    padding-left: 43rpx;
    width: 188rpx;
}
.argument .line text:nth-child(2) {
    border-left: 1rpx solid #E6E6E6;
    border-right: 1rpx solid #E6E6E6;
}
</style>