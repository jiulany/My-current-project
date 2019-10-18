<template>
    <view class="pay" >
        <view class="pay_top">
            <view class="title">请选择支付方式</view>
            <view class="price" v-if="list.total_price">￥{{list.total_price}}</view>
        </view>
        <view class="pay_content">
            <view class="pay_content_header">
                <view class="icon">
                    <i class="iconfont icon-shouye"></i>
                </view>
                <view class="pay_content_box">
                    <view class="pay_content_title">钱包支付</view>
                    <view class="pay_content_desc" v-if="list.use_red_packet">本单最多可用￥{{list.use_red_packet}}</view>
                </view>
                <view class="pay_content_radion">
                    <radio-group  @tap="radioChange('1')">
                         <radio value="1" :disabled="balance_lock"  :checked="pay_checked == 1" color="#FDD000" />
                    </radio-group>
                </view>
            </view>
            <view class="pay_red">
                <view class="pay_red_left" v-if="list.red_packet_price">红包余额({{list.red_packet_price}})</view>
                <view class="pay_red_right" v-if="list.use_red_packet">本单可用({{list.use_red_packet}})</view>
            </view>
<!--            钱包-->
            <view class="pay_red">
                <view class="pay_red_left" v-if="list.balance">钱包余额（{{list.balance}}）</view>
                <view class="pay_red_right" v-if="list.use_balance">本单可用({{list.use_balance}})</view>
            </view>
            <view class="pay_content_header pay_box_top">
                <view class="icon">
                    <i class="iconfont icon-shouye"></i>
                </view>
                <view class="pay_content_box">
                    <view class="pay_content_title">微信支付</view>
                    <view class="pay_content_desc">微信安全支付</view>
                </view>
                <view class="pay_content_radion">
                    <radio-group @tap="radioChange('2')">
                        <radio value="2" :checked="pay_checked == 2" color="#FDD000" />
                    </radio-group>
                </view>
            </view>
        </view>
        <view class="pay_btn" @tap="_subPay">
            去支付￥{{list.total_price}}
        </view>
    </view>
</template>

<script>
    import {OrderModel} from "../../model/order";
import { setTimeout } from 'timers';
    const  orderModel = new OrderModel()
    export default {
        name: "pay",
        props:{
            order_id:{
                type:String
            }
        },
        data(){
            return{
                pay_checked:true,
                list:{},
                balance_lock:true,
            }
        },
        methods:{
            _subPay(){
                if (this.list.total_price == 0) {
                    let params = {
                        order_id:this.list.order_id,
                    }
                    orderModel.paymentForFree(params).then((res)=>{
                        if (res.code == 200) {
                            uni.showToast({
                                title:res.message,
                            })
                            setTimeout(()=>{
                                uni.navigateTo({
                                    url:`/pagesC/payment_finish/payment_finish?order_id=${this.list.order_id}`
                                })
                            },2000)
                        }
                    })
                } else {
                    if (this.pay_checked == 1) {
                        if (this.list.is_password_payment == 0) {
                            this.$emit('close_pay_type')
                            uni.navigateTo({
                                url:`/pagesB/payment_index/payment_index?order_id=${this.list.order_id}`
                            })
                        } else {
                            uni.showModal({
                                title: "支付提示",
                                content: '您已开通免密支付,确认直接支付该订单?',
                                success: showResult => {
                                    if (showResult.confirm) {
                                        this.$emit('close_pay_type')
                                        // plus.runtime.openURL(openUrl);
                                        let params = {
								            order_id:this.list.order_id
							            }
                                        orderModel.yuonpay(params).then((res) => {
                                            if (res.code == 200) {
                                                uni.showToast({
                                                    title:'支付成功',
                                                })
                                                setTimeout(()=>{
                                                    uni.navigateTo({
                                                        url:`/pagesC/payment_finish/payment_finish?order_id=${this.list.order_id}`
                                                    })
                                                },2000)
                                            }
							            })
                                    }
                                }
                            })
                        }
                    } else {
                        let data = {
                            order_id:this.list.order_id,
                            type:1
                        }
                        orderModel.subPay(data).then((res) => {
                            this._pay(res.data)
                        })
                    }
                    
                }
                
            },
             _provider(){
               return new Promise((resolve,reject)=>{
                    uni.getProvider({
                        service: 'payment',
                        success: function (res) {
                            console.log(res.provider[0])
                            resolve(res.provider[0])
                        }}
                    )
                })

            },
           async _pay(list){
                const data = JSON.parse(list)
                // let SystemInfo = uni.getStorageSync('SystemInfo')
                let provider = await this._provider()
               console.log(provider)
                uni.requestPayment({
                    provider,
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: 'MD5',
                    paySign: data.paySign,
                    success: function (res) {
                        console.log('success:' + JSON.stringify(res));
                    },
                    fail: function (err) {
                        console.log('fail:' + JSON.stringify(err));
                    }
                })
            },
            _getOrder(){
                console.log('order_id'+this.order_id)
                let data={
                    order_id: this.order_id
                }
                orderModel.getOrders(data).then((res) => {
                    if(res.data){
                        this.list = res.data
                        this.balance_lock = res.data.pay_type == 2 ? true : false;
                        this.pay_checked = this.list.pay_type
                    }

                })
            },
            radioChange(id){
                if(this.list.pay_type == 2 && id == "1") {
                    this.pay_checked = false
                    uni.showToast({
                        title:'余额不足',
                        icon:'none'
                    })
                } else {
                    this.pay_checked = id
                }
            },

        },
        mounted(){
            console.log('mounted')
        },
        watch:{
            order_id:{
                handler:function(val){
                    this._getOrder()
                },
                // immediate:true, // 一进来就调
            },
        }
    }
</script>

<style scoped>
page{
    height: 100%;
    background: #fff;
}
.pay_top{
    height: 95rpx;
    border-top:solid 1rpx #F0F0F0 ;
    line-height: 95rpx;
    padding: 0 34rpx;
    font-size:30rpx;
    border-bottom: 20rpx solid #F3F3F3;
}
.pay_top .title{
    float: left;
    height: 95rpx;
    line-height: 95rpx;
    color: #666666;
}
.pay_top .price{
    color: #FF1D1D;
    float: right;
    height: 95rpx;
    line-height: 95rpx;
    font-size:36rpx;
}
.pay_content{
    margin-bottom: 100rpx;
}
.pay_content_desc{
    font-size: 26rpx;
    color: #999999;
}
.pay_content_header{
    height: 170rpx;
    border-bottom: #F0F0F0 solid 1rpx;
    vertical-align: middle;
}
.pay_content_header .icon{
    color: #FDD100;
    margin:37rpx 23rpx 0 22rpx;
    float: left;
}
.icon .iconfont{
    font-size: 20px !important;
}
.pay_content_box{
    margin-top: 45rpx;
    float: left;
}
.pay_content_title{
    font-size:32rpx;
    color: #333333;
}
.pay_content_radion{
    margin-top: 45rpx;
    float: right;
    margin-right: 25rpx;
}
.pay_red{
    color: #333333;
    font-size: 30rpx;
    border-bottom: solid 1rpx #F0F0F0;
    overflow: hidden;
}
.pay_red_left{
    float: left;
    height: 127rpx;
    line-height: 127rpx;
    margin-left: 37rpx;
    margin-right: 63rpx;
}
.pay_red_right{
    height: 127rpx;
    float: left;
    line-height: 127rpx;
}
.pay_box_top{
    border-top: solid 20rpx #F3F3F3;
    border-bottom: none;
}
.pay_btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
    font-size:36rpx;
    background: #FDD100;

}
</style>