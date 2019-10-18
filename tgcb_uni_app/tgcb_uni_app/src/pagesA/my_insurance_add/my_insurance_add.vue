<template>
    <view style="padding-bottom:200rpx">
        <view class="top">
            <text>保险车辆车牌</text>
        </view>
        <view class="top">
            <text>购买期限</text>
        </view>
        <view class="choose">
            <text>
                购买险种选择
            </text>
        </view>
        <view class="bottom">
           <!-- <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd border" v-for="(item, index) in items" :key="item.value">
                    <view class="name">{{item.name}}</view>
                    <view>
                        <radio :value="item.value" :checked="index === current" :color="color"/>
                    </view>
                </label>
            </radio-group> -->
            <checkbox-group @change="checkboxChange">
                <label class="uni-list-cell uni-list-cell-pd border" v-for="(item, index) in list" :key="item.value">
                    <view class="name">{{item.name}}</view>
                    <view>
                        <checkbox :value="item.id" :checked="index === current" :color="color"/>
                    </view>
                </label>
            </checkbox-group>
        </view>
        <view class="button" @tap="submit">保存</view>
    </view>
</template>

<script>
import { IndexModel } from '../../model/index';
const indexModel = new IndexModel();
export default {
    data() {
        return {
            current: 0,
            color: '#FDD000',
            checked:[],
            list:[],
            car_num:""
        }
    },
    methods: {
       
        checkboxChange(event){
            this.checked = event.detail.value
            console.log(this.checked)
        },
        getList()
        {
            indexModel.getInsuranceList().then((res)=>{
                this.list = res.data
            })
        },
        submit()
        {
            let params = {
                start_time:'2019-09-21 16:00:00',
                end_time:'2019-09-21 16:00:00',
                car_num:this.car_num,
                type_ids:this.checked,
            }
            indexModel.createInsurance(params).then((res) => {
                
            })
        },
        onLoad()
        {
            this.getList()
        }

    }
}
</script>

<style>
    .top {
        width: 100%;
        height: 68rpx;
        background: #fff;
        padding: 20rpx 0 0 46rpx;
        font-size: 32rpx;
        color: #333333;
    }
    .top:nth-child(1) {
        border-bottom: 2rpx solid #D9D9D9;
    }
    .choose {
        width: 100%;
        height: 70rpx;
        background: #F8F8F8;
        padding: 42rpx 0 0 46rpx;
        font-size: 34rpx;
        color: #333333;
        font-weight: bold;
    }
    .bottom {
        width: 100%;
        height: 750rpx;
        background: #fff;
        margin-bottom: 50rpx;
    }
    .bottom .name {
        color: #333333;
        font-size: 32rpx;
    }
    .border {
        border-bottom: 1rpx solid rgba(217,217,217,1);
    }
    .border:nth-child(7) {
        border: none;
    }
    .bottom .uni-list-cell::after {
        background: none;
    }
    .bottom .uni-list-cell-pd {
        padding: 26rpx 50rpx;
    }
    .bottom .list .active {
        color: #636363;
    }
    .button {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 98rpx;
        text-align: center;
        line-height: 90rpx;
        background: #FDD000;
        color: #474747;
        font-size: 36rpx;
        font-weight: bold;
    }
</style>