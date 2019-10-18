<template>
    <view>
        <view class="service">
            <view>
                <text class="choose">请选择延保部件（发动机为选项）</text>
            </view>
            <view class="kefu">
                <i class="iconfont icon-kefu"></i>
                <text>客服</text>
            </view>
        </view>
        <view class="part">
                <view class="item" v-for="(item,index) in items" :key="index" @tap="choose(item,index)">
                    <view class="image-box">
                        {{item.commodity_name}}
                        <image :src="item.commodity_image_thum" alt=""></image>
                    </view>
                    <text class="name">{{item.commodity_name}}</text>
                    <text class="price">￥{{item.price.original_price}}</text>
                    <view  v-if="item.checked==true">
                        <view class="checked"></view>
                        <image class="checked_img" src="../../../../../static/maintain/xuanze.png"></image>
                    </view>
                </view>
        </view>
        <view class="bottom">
            <text class="total">已选<text class="red">{{num}}</text>项目 合计<text class="red">￥{{total}}</text></text>
            <text class="button" @tap="goSelect">确定</text>
        </view>
    </view>
</template>

<script>
import { IndexModel } from '../../model/index';
const indexModel = new IndexModel();
export default {
    data() {
        return {
            items: [],
            choosed: [],
            num: 0,
            total: 0
        }
    },
    methods: {
        __getDelayList(type) {
            console.log(type)
            let params = {type:type}
            indexModel.getDelayList(params).then((res) => {
                if(res.code !== 200) {
                    uni.showToast({
                        title: '请求数据失败',
                        icon: 'none'
                    });
                    return false;
                }
                this.items = res.data;
                console.log(this.items);
            });
             
        },
        goSelect(){
            uni.navigateTo({
                url: `/pagesA/delay_select_number/delay_select_number?checked=${JSON.stringify(this.choosed)}`
            });
        },
        choose(item,index) {
            let arr = this.items[index];
            if(arr['checked']) {
                arr['checked'] = false;
                var index = this.choosed.indexOf(arr.id);
                this.choosed.splice(index,1);
            }else {
                arr['checked'] = true;
                this.choosed.push(arr.id);
            }
            this.items = JSON.parse(JSON.stringify(this.items));
            this.num = this.choosed.length;
            this.total = 0;
            this.choosed.forEach((item) => {
                return this.total += parseInt(this.items[item-1].price.original_price);
            });
        }
    },
    onLoad(options) {
        this.__getDelayList(options.type);
    }
}
</script>

<style lang="less">
    page {
        background: #fff;
    }
    .service {
        position: relative;
        width: 100%;
        height: 57rpx;
        background: #F5F5F5;
    }
    .choose {
        float: left;
        padding-left: 24rpx;
        color: #FFA82C;
        font-size: 28rpx;
    }
    .kefu {
        float: right;
        width: 139rpx;
        height: 53rpx;
        background: #fff;
        border-radius: 30rpx;
        padding-left: 20rpx;
        color: #666666;
        font-size: 28rpx !important;
    }
    .kefu i {
        display: inline-block;
        margin-right: 10rpx;
        font-size: 32rpx !important;
    }
    .part {
        width: 100%;
        margin-top: 20rpx;
        margin-bottom: 120rpx;
        font-size: 0;
    }
    .part .item {
        position: relative;
        display: inline-block;
        width: 249rpx;
        height: 279rpx;
        border: 1rpx solid #F5F5F5;
        text-align: center;
        /* margin-left: -1rpx; */
        /* margin-top: -1rpx; */
    }
    .part .item .image-box {
        display: block;
        height: 120rpx;
        width: 120rpx;
        /* border: 1rpx solid #000; */
        // margin-top: 25rpx;
        // margin-left: 69rpx;
        margin: 30rpx auto;
        position: relative;
        image{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            max-height: 100%;
            max-width: 100%;
        }
    }
    .part .item .name {
        display: block;
        height: 50rpx;
        width: 100%;
        // margin-left: 66rpx;
        // margin-top: 23rpx;
        color: #666666;
        font-size: 28rpx;
    }
    .part .item .price {
        display: block;
        height: 50rpx;
        width: 100%;
        // margin-left: 67rpx;
        color: #F75C3E;
        font-size: 28rpx;
    }
    .bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 99rpx;
        background: #ffffff;
        border-top: 1rpx solid #F0F0F0;
        z-index: 999;
    }
    .bottom .total {
        display: inline-block;
        width: 377rpx;
        height: 99rpx;
        color: #474747;
        font-size: 30rpx;
        padding-left: 134rpx;
    }
    .bottom .button {
        display: inline-block;
        width: 240rpx;
        height: 99rpx;
        background: #FDD000;
        color: #474747;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        line-height: 98rpx;
    }
    .checked{
        background:rgba(0,0,0,1);
        opacity:0.15;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index:99;
        filter:alpha(Opacity=27)
    }
    .checked_img{
        width: 88rpx;
        height: 88rpx;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
    }
    .red {
        color: #F75C3E;
        font-size: 30rpx;
    }
</style>

