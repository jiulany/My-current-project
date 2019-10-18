<template>
    <view class="choice_store">
        <view class="choice_store_top">
            <view class="choice_store_top_left">
                <i class="iconfont icon-shouye"></i>
            </view>
            <view class="choice_store_top_right">成都市</view>
        </view>
        <view class="store_content">
            <view class="store_content_left">
                <view v-for="(item,index) in leftData" :key="index" :class="{active : current == index}" class="store_content_left_title" @tap="chooice(index)">
                    {{item}}
                </view>
            
            </view>
            <view class="store_content_right">
                <view class="content_right_list" v-if="item"  v-for="(item,index) in rightData" :key="index">
                    <view class="content_right_list_top">
                        <view class="list_top_title">{{item.name}}</view>
                        <view>{{item.distance}}km</view>
                    </view>
                    <view class="content_right_list_address">
                        {{item.address}}
                    </view>
                    <view class="content_right_list_car">
                        <view class="content_right_list_car_item">
                                <i class="iconfont icon-shouye"></i>
                            <view class="car_item_title">洗车</view>
                        </view>
                        <view class="content_right_list_car_item">
                                <i class="iconfont icon-shouye"></i>
                            <view class="car_item_title">洗车</view>
                        </view>
                        <view class="content_right_list_car_item">
                                <i class="iconfont icon-shouye"></i>
                            <view class="car_item_title">洗车</view>
                        </view>
                        <view class="content_right_list_car_item">
                                <i class="iconfont icon-shouye"></i>
                            <view class="car_item_title">洗车</view>
                        </view>
                    </view>
                    <view class="content_right_list_bottom">
                        <view class="list_bottom_left">
                            <view class="list_bottom_left">
                                <i class="iconfont icon-shouye"></i>
                            </view>
                            <view class="choice_store_top_right" @tap="openLocation(item)">到这里去</view>
                        </view>
                        <view class="list_bottom_btn" @tap="changeShop(item)">切换门店</view>
                    </view>
                </view>
                
            </view>
        </view>
    </view>
</template>

<script>
import {IndexModel} from "../../model/index";
const  indexModel = new IndexModel();
    export default {
        name: "choice_store",
        data(){
            return {
                current:0,
                leftData:[],
                rightData:[],
                data:[]
            }
        },
        methods:{
            chooice(current){
                this.current = current
                this.rightData = []
                this.rightData = this.data[current]
            },
            getShop(){
                let self = this
                uni.getLocation({
                   type: 'wgs84',
                    success: function (res) {
                        let params = {
                            longitude:res.longitude,
                            latitude:res.latitude,
                        }
                        indexModel.getShopArea(params).then((res) => {
                            self.leftData = res.data.menu
                            self.data = res.data.list
                            self.rightData = res.data.list[0]
                        })
                    }
                }); 
               
            },
            changeShop(item){
                console.log(item)
                // fixMe 视高item 为空
                uni.setStorageSync('shop',JSON.stringify(item))
                uni.navigateBack()
            },
            openLocation(item){
                uni.openLocation({
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                    name: item.name,
                    address: item.address,
                    success: function() {
                        console.log("success");
                    }
                });
            }
        },
        onLoad()
        {
            this.getShop()
        }
    }
</script>

<style scoped>
.choice_store_top{
    height: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.list_bottom_left .iconfont {
    margin-top: 0;
    color: #FDD000 !important;
    font-size: 16px !important;
    margin-right: 20rpx;
}
.choice_store_top_left .iconfont {
    margin-top: 0;
    color: #FDD000 !important;
    font-size: 16px !important;
    margin-left: 30rpx;
    margin-right: 20rpx;
}
.choice_store_top_right{
    font-size:28rpx;
    color: #333333;
}
.store_content{
    display: flex;
    flex-direction: row;

}
.store_content_left{
    width: 200rpx;
    height: 500rpx;
    display: flex;
    flex-direction: column;
}
.store_content_left_title{
    width: 100%;
    height: 110rpx;
    text-align: center;
    line-height: 120rpx;
}
.store_content_left_title.active{
    background: #fff;
}
.store_content_right{
    flex:1;

}
.content_right_list{
    padding: 10rpx 20rpx;
    height: 250rpx;
    background: #fff;
    margin-bottom: 2px;
}
.content_right_list_top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.content_right_list_address{
    font-size:22rpx;
    color: #999999;
}
.content_right_list_car{
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    display: flex;
    flex-direction: row;
}
.content_right_list_car_item .iconfont{
    font-size:14px !important; ;
    color: #FDD000 !important;
}
.content_right_list_car_item{
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
}
.car_item_title{
    font-size: 24rpx;
    margin-left: 10rpx;
}
.list_top_title{
    font-size: 30rpx;
}
.content_right_list_bottom{
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
    justify-content: space-between;
}
.list_bottom_left{
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #FDD000;
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
    color: #fff;
}
</style>