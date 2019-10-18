<template>
    <view class="select_store">
        <view class="mask" v-if="showMask" @tap="close"></view>
        <view class="box" v-if="showPopup">
            <view class="line1">
                <view class="img">
                    <img src="https://imgcdn.tuogouchebao.com/default-image.png" alt="">
                </view>
                <view class="name">{{selectedStore.name}}</view>
            </view>
            <view class="line2">
                <view class="title">选择店铺</view>
                <view class="select">
                    <scroll-view scroll-y style="height:205rpx">
                        <block v-for="(item,index) in shops" :key="index">
                            <view class="item" @tap="check" :data-id="item.id" :style="selectedStore.id == item.id ? 'color:#666' : 'color:#BEBEBE'">{{item.name}}</view>
                        </block>
                    </scroll-view>
                </view>
            </view>
            <view class="button" @tap="save">确定</view>
        </view>
    </view>
</template>

<script>
import {IndexModel} from '@/model/index'
const indexModel = new IndexModel()
export default {
    props:{
        showPopup:{
            type : Boolean,
            default : false
        },
    },
    data() {
        return {
            // 店铺列表
            storeList: [
                {
                    id: 1,
                    name: '成华区-浅水半岛店'
                },
                {
                    id: 2,
                    name: '新都区-柏水店'
                },
                {
                    id: 3,
                    name: '郫都区-鹃兴路店'
                },
                {
                    id: 4,
                    name: '郫都区-鹃兴路店'
                },
                {
                    id: 5,
                    name: '郫都区-鹃兴路店'
                },
            ],
            // 选中的店铺
            selectedStore: {},
            color: '#BEBEBE',
            showMask:false,
            shops:[]
        }
    },
    methods: {
        check(e) {
            console.log(e)
            this.selectedStore = {};
            let id = e.currentTarget.dataset.id;
            this.shops.forEach(item => {
                if(item.id == id) {
                    this.selectedStore = item;
                }
            });
            console.log(this.selectedStore)
        },
        close()
        {
            this.showMask = false;
            this.$emit('close');
        },
        save()
        {
            console.log(this.selectedStore)
            this.showMask = false;
            this.$emit('save',this.selectedStore);
        },
        getShop()
        {
            indexModel.getShopList().then((res) => {
                this.shops = res.data
            })
        }
    },
    mounted(){
        this.showMask = this.showPopup
        this.getShop()
    }
}
</script>

<style>
    .mask{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5)
    }
    .select_store {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 9999;
    }
    .box {
        width:539rpx;
        height: 412rpx;
		background:rgba(255,255,255,1);
		border-radius:8rpx;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		position: absolute;
		z-index: 1;
    }
    .line1 {
        display: flex;
		justify-content: left;
		height: 83rpx;
		align-items: center;
		border-bottom: 1px solid #F5F5F5;
		padding: 0 26.57rpx 0 30rpx;
    }
    .line1 .img {
        width: 55rpx;
        height: 55rpx;
        border: 1rpx solid #ccc;
        margin-right: 20rpx;
    }
    .line1 .img img {
        width: 100%;
        height: 100%;
    }
    .line1 .name {
        color: #666666;
        text-align: center;
        font-size: 30rpx;
    }
    .line2 {
        height: 278rpx;
    }
    .line2 .title {
        color: #666666;
        font-size: 30rpx;
        text-align: center;
        padding-top: 15rpx;
    }
    .line2 .item {
        height: 70rpx;
        color: #BEBEBE;
        font-size: 26rpx;
        text-align: center;
        line-height: 70rpx;
    }
    .button {
        width:152.77rpx;
		height:45.89rpx;
		background:rgba(253,208,0,1);
		border-radius:6.03rpx;
		color: #FFFFFF;
		font-size: 28.98rpx;
		text-align: center;
		line-height: 45.89rpx;
		margin: 0 auto;
    }
</style>