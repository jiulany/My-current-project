<template>
    <view class="new_car">
        <view class="banner">
            <image src="https://www.buick.com.cn/img/newregal/newregal/kv1.jpg"></image>
        </view>
        <view class="new_car_box">
            <view class="new_car_box_items" v-for="item in list">
                <image :src="item.commodity_image_thum"></image>
                <view class="desc">
                    <view class="title">{{item.commodity_name}}</view>
                    <view class="price">￥{{item.min_price}}</view>
                </view>
                <view class="pay">立即购买</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {CarModel} from '../../model/car'
    const carModel = new CarModel()
    export default {
        name: "network_car",
        data(){
            return{
                list:[],
                page:1,
                size: 10
            }
        },
        onLoad(options){
            uni.setNavigationBarTitle({
                title:options.title
            })
            let data = {
                page:this.page,
                size:this.size,
                recommend_type:options.recommend_type
            }
            this._carNew(data)
        },
        methods:{
            _carNew(data){
                carModel.getNewCar(data).then((res) => {
                    if(res.data){
                        this.list = res.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .new_car{
        height: 100%;
        background: #fff;
    }
    .banner image{
        width: 100%;
        height: 430rpx;
    }
    .new_car_box{
        padding-top: 20rpx;
        display: flex;
        flex-direction: column;
    }
    .new_car_box_items{
        height: 204rpx;
        background: #fff;
        border-bottom: #F0F0F0 solid 1rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .new_car_box_items:last-child{
        border-bottom: none;
    }
    .price{
        font-size:30rpx;
        font-weight:500;
        color:rgba(253,71,93,1);
    }
    .desc{
        height: 204rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .new_car_box_items image{
        margin-left: 34rpx;
        margin-right: 54rpx;
        width:155rpx;
        height:156rpx;
    }
    .title{
        font-size:26rpx;
        color:rgba(102,102,102,1);
    }
    .pay{
        width:171rpx;
        height:58rpx;
        background:rgba(253,208,0,1);
        border-radius:27rpx;
        text-align: center;
        line-height: 58rpx;
        margin-right: 27rpx;
        font-size:30rpx;
        color:rgba(255,255,255,1);
    }
</style>