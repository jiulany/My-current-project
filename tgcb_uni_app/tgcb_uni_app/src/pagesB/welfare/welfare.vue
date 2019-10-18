<template>
    <view class="welfare">
        <view class="welfare_item" v-for="(item,index) in list" :key="index">
            <view class="image-box">
                <image :src="item.cover"></image>
            </view>
            <view class="title">{{item.name}}</view>
            <view class="price">￥{{item.package_price}}</view>
        </view>
   
    </view>
</template>

<script>
import {IndexModel} from '../../model/index.js'
const  indexModel = new IndexModel()
export default {
    name: "welfare",
    data(){
        return {
            list:[],
            page:1,
        }
    },
    methods:{
        getList()
        {
            let params = {
                page : this.page,
                size : 10
            }
            indexModel.getPackageList(params).then((res) => {
                this.list = res.data
            })
        }
    },
    onLoad(){
        this.getList()
    }
}
</script>

<style scoped>
.welfare{
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: space-between;
    padding: 0 20rpx;

}
.welfare_item{
    margin-top: 10rpx;
    background: #fff;
    height: 520rpx;
    width: 340rpx;
    margin-bottom: 10rpx;
    
}
.image-box{
    height: 360rpx;
    width: 340rpx;
    position: relative;
}
.image-box image{
    /* height: 360rpx;
    width: 340rpx; */
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}
    .title{
        margin-left: 15rpx;
    }
    .price{
        margin-left: 15rpx;
        color: #F75C3E;
    }
</style>