<template>
    <view class="choice_store">
        <view class="store_content" v-for="(item,index) in shops" :key="index">
                <image :src="item.image"></image>
                <view class="content_right_list">
                    <view class="content_right_list_top">
                        <view class="list_top_title">{{item.name}}</view>
                        <view><i class="iconfont icon-shouye"></i>{{item.distance}}km</view>
                    </view>
                    <view class="content_right_list_address">
                        {{item.address}}
                    </view>
                    <view class="content_right_list_bottom">
                        <view class="list_bottom_left">
                            <view>店长：陈丽</view>
                        </view>
                        <view class="list_bottom_btn">联系店长</view>
                    </view>
                </view>
        </view>
       
    </view>
</template>

<script>
import {IndexModel} from '../../model/index.js'
const  indexModel = new IndexModel()
    export default {
        name: "choice_store",
        data(){
            return {
                shops:[]
            }
        },
        methods:{
            getShop()
            {
                let self = this
                uni.getLocation({
                   type: 'wgs84',
                    success: function (res) {
                        let params = {
                            longitude:res.longitude,
                            latitude:res.latitude,
                        }
                        indexModel.getShopList(params).then((res) => {
                            self.shops = res.data
                        })
                    }
                }); 
            }
        },
        onLoad(){
            this.getShop()
        }
    }
</script>

<style scoped>
    .store_content{
        padding: 15rpx;
        display: flex;
        flex-direction: row;
        margin: 10rpx 15rpx;
        background: #fff;
    }
    .iconfont{
        color:#FDD000 !important;
        margin-right: 10rpx;
    }
    .store_content image{
        width: 165rpx;
        height: 165rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .content_right_list{
        flex: 1;
        background: #fff;
        margin-bottom: 2px;
    }
    .content_right_list_top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .content_right_list_address{
        font-size:28rpx;
        color: #999999;
    }
    .content_right_list_car_item .iconfont{
        font-size:14px !important; ;
        color: #FDD000 !important;
    }
    .list_top_title{
        font-size: 30rpx;
    }
    .content_right_list_bottom{
        display: flex;
        flex-direction: row;
        margin-top: 10rpx;
        justify-content: space-between;
    }
    .list_bottom_left{
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333;
    }
    .list_bottom_left .iconfont{
        margin-right: 10rpx;
    }
    .list_bottom_btn{
        width: 140rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        background: #FDD000;
        padding: 8rpx;
        font-size: 22rpx;
        border-radius: 12rpx;
        margin-right: 10rpx;
        color:#fff
    }
</style>