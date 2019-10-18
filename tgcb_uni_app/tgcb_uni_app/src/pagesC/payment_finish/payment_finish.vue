<template>
    <view class="payment_finish">
        <view class="order-sn">
            订单号: {{data.order_sn}}
        </view>
        <view class="logo">
            <image src="https://imgcdn.tuogouchebao.com/tuogouzhuanjia@3x.png"></image>
        </view>
        <view class="payment-success">支付成功</view>
        <view class="main">
            <view class="payment-text-box">
                <view class="payment-text">项目名称: {{data.commodity_name}}</view>
                <view class="payment-text">实付金额: ¥{{data.payment_price}}</view>
                <view v-if="data.payment_at" class="payment-text">实付时间: {{data.payment_at}}</view>
            </view>
        </view>
        <view class="bottom-box">
            <view class="check-order">查看订单</view>
            <view class="back-index" @tap="backIndex">返回首页</view>   
        </view>
    </view>
</template>

<script>
    import {OrderModel} from "../../model/order";
    const orderModel = new  OrderModel()
    export default {
        name: "order_detail",
        components:{
        },
        data() {
            return {
               option:{},
               data:{}
            }
        },
        methods:{
            getDetails()
            {
                let params;
                if (this.option.order_id) {
                    params = {
                        order_id:this.option.order_id
                    }
                } else {
                    params = {
                        internal_payment_sn:this.option.internal_payment_sn
                    }
                }
                orderModel.finishDetails(params).then((res) => {
                    this.data = res.data
                })
            },
            backIndex(){
                uni.reLaunch({
                    url:`/pages/index/index`
                })
            }
        },
        onLoad(option){
            console.log(option)
            this.option = option
            this.getDetails()
        }
      
    }
</script>

<style lang="less">
.payment_finish{
    background: #ffffff;
    color:#666666;
    font-size:30rpx;
    height: 100vh;
    .order-sn{
        padding:15rpx 28rpx;
    }
    .logo{
        width:163rpx;
        height: 163rpx;
        margin: 50rpx auto 10rpx auto;
        image{
            width: 100%;
            height:100%;
        }
    }
    .payment-success{
        color: #FDD000;
        font-size:34rpx;
        text-align: center;
    }
    .main{
        padding: 40rpx;
        display: flex;
        justify-content: center;
        .payment-text-box{
            display: inline-block;
            .payment-text{
                color: #666666;
                font-size:32rpx;
             }
        }
        
    }
    .bottom-box{
        padding: 20rpx 66rpx;
        display:flex;
        justify-content: space-between;
        view{
            width:249rpx;
            height:73rpx;
            border-radius:37rpx;
            text-align: center;
            line-height: 73rpx;
        }
        .check-order{
            background:rgba(231,231,231,1);
        }
        .back-index{
            background: #FDD000;
        }
    }
}
    
</style>