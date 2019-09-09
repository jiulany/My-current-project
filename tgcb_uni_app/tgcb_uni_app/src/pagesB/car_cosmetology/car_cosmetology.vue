<template>
    <view class="car_cosmetology">
        <view class="banner">
            <image :src="info.cover"></image>
        </view>
        <view class="title">
            {{info.keyword}}详情
        </view>
        <view class="box">
            <view class="box_items" v-for="item in info.prices">
                <radio-group class="box_radio" @change="radioChange">
                    <radio :value="item" color="#FDD000" />
                </radio-group>
                <view class="box_items_title">{{item.name}}</view>
                <view class="box_items_price">￥{{item.price}}</view>
            </view>
            <!-- <view class="box_items">
                <radio-group class="box_radio" @change="radioChange">
                    <radio :value="item" color="#FDD000" />
                </radio-group>
                <view class="box_items_title">小轿车包年</view>
                <view class="box_items_price">￥299</view>
            </view> -->
            <view class="box_desc">
                <view class="box_desc_title">
                    商品简介
                </view>
                <view class="box_detail">{{info.content}}</view>
            </view>
        </view>
        <view class="box_btn">
            立即购买
        </view>
    </view>
</template>

<script>
    import {PackageModel} from '../../model/package.js'
    const packageModel = new PackageModel()
    export default {
        name: "car_cosmetology",
        data(){
            return{
                info:[]
            }
        },
        methods:{
            _getInfo(params)
            {
                packageModel.getPackageInfo(params).then((res)=>{
                    this.info = res.data;
                })
            }
        },
        onLoad(params){
            this._getInfo(params)
        }
    }
</script>

<style scoped>
.car_cosmetology{
    height: 100%;
    background: #fff;
}
.banner image{
    height: 309rpx;
    width: 100%;
}
.box{

}
.title{
    text-align: center;
    font-size:36rpx;
    color:rgba(51,51,51,1);
}
.box_radio{
    width: 75rpx;
}
.box_items{
    padding-left: 25rpx;
    padding-right: 35rpx;
    align-items: center;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    border-bottom: #F0F0F0 1rpx solid;
}
.box_items_title{
    width: 375rpx;
    font-size:32rpx;
    color:rgba(51,51,51,1);
}
.box_items_price{
    flex: 1;
    text-align: right;
    padding-right: 30rpx;
    font-size:36rpx;
    color:rgba(255,62,62,1);
}
.box_desc{
    font-size:30rpx;
    color:rgba(102,102,102,1);
}
.box_desc_title{
    padding-left: 25rpx;
    margin-top: 29rpx;
    text-align: left;
    font-size: 30rpx;

}
.box_detail{
    padding-right: 20rpx;
    margin-top: 43rpx;
    padding-left: 25rpx;
    background: #fff;
    padding-bottom: 100rpx;
}
.box_btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 98rpx;
    font-size:36rpx;
    color: #474747;
    height:98rpx;
    background:rgba(253,208,0,1);
}
</style>