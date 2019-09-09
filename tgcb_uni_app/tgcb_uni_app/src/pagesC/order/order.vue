<template>
    <view class="order">
        <view class="order_top">
            <view :class="active==0?'order_item active':'order_item'" @click="active=0">全部</view>
            <view :class="active==1?'order_item active':'order_item'" @click="active=1">待付款</view>
            <view :class="active==2?'order_item active':'order_item'" @click="active=2">待使用</view>
            <view :class="active==3?'order_item active':'order_item'" @click="active=3">已完成</view>
        </view>
        <view class="content">
            <swiper class="swiper" :current="active" duration="0" @change="swiperChange">
                <swiper-item class="swiper-box" v-for="(item,index) in 4" :key="index">
                    <scroll-view scroll-y style="height: 100%;"  @scrolltolower="lower">
                        <block v-if="orders.length > 0" v-for="(item) in orders" :key="item.id">
                            <order-list :orders="item"></order-list>
                    
                        </block>
                        <block v-else style="height:100%;background:red">
                             <image src="https://imgcdn.tuogouchebao.com/tupian@2x.png"></image>
                        </block>
                    </scroll-view>
                </swiper-item>
            </swiper>

        </view>
    </view>
</template>

<script>
    import {OrderModel} from "../../model/order";
    import orderList from '../../components/orderList/orderList'
    const orderModel = new  OrderModel()

    export default {
        name: "order",
        data () {
            return {
                active:0,
                orders:[],
                status:true,
                orderData: {
                    status: 0,
                    page: 1,
                    size: 10,
                }
            }
        },
        onLoad(option){
            let type = option.type
            uni.showLoading({
                title:'loading...',
                icon: 'none'
            })
            let orderData = this.orderData
            orderData.status = type
            this.active = type
            this._getOrder(orderData)
        },
        components:{
            orderList
        },
        methods:{
            lower(){
                if(!this.status) {
                    return false
                }
                uni.showLoading({
                    title:'loading...',
                    icon: 'none'
                })
                let orderData = this.orderData
                this._getOrder(orderData)
            },
            swiperChange(e) {
                this.orders = []
                uni.showLoading({
                    title:'loading...',
                    icon: 'none'
                })
                this.active = e.detail.current;
                let orderData = this.orderData
                orderData.status = this.active
                orderData.page = 1
                this._getOrder(orderData)
            },
            _getOrder(orderData){
                orderModel.getOrderList(orderData).then((res) => {
                    uni.hideLoading()
                    let orders = this.orders
                   if(res.code < 400 && res.data.length > 0) {
                       orders.push(...res.data)
                       let orderData = this.orderData
                       orderData.page = orderData.page + 1
                       this.orderData = orderData
                      this.orders = JSON.parse(JSON.stringify(orders))
                       console.log(this.orders )
                       this.status =  true
                   } else {
                       this.status =  false
                   }
                })
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
    background: #fff;
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

</style>