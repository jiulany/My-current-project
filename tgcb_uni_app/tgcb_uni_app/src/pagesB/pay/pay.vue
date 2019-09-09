<template>
    <view class="pay">
        <view class="pay_top">
            <view class="title">请选择支付方式</view>
            <view class="price">￥{{list.total_price}}</view>
        </view>
        <view class="pay_content">
            <view class="pay_content_header">
                <view class="icon">
                    <i class="iconfont icon-shouye"></i>
                </view>
                <view class="pay_content_box">
                    <view class="pay_content_title">钱包支付</view>
                    <view class="pay_content_desc">本单最多可用￥{{list.use_red_packet}}</view>
                </view>
                <view class="pay_content_radion">
                    <radio-group  @tap="radioChange('1')">
                         <radio value="1" :disabled="pay_checked=='1'" color="#FDD000" />
                    </radio-group>
                </view>
            </view>
            <view class="pay_red">
                <view class="pay_red_left">红包余额({{list.red_packet_price}})</view>
                <view class="pay_red_right">本单可用({{list.use_red_packet}})</view>
            </view>
<!--            钱包-->
            <view class="pay_red">
                <view class="pay_red_left">钱包余额（{{list.balance}}）</view>
                <view class="pay_red_right">本单可用({{list.use_balance}})</view>
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
                        <radio value="2" :checked="pay_checked" color="#FDD000" />
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
    const  orderModel = new OrderModel()
    export default {
        name: "pay",
        data(){
            return{
                pay_checked:true,
                list:[]
            }
        },
        methods:{
            _subPay(){
                let data = {
                    internal_payment_sn:this.list.internal_payment_sn,
                    type:1
                }
                orderModel.subPay(data).then((res) => {
                    this._pay(res.data)
                })
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
            _getOrder(id){
                let data={
                    id
                }
                orderModel.getOrders(data).then((res) => {
                    if(res.data){
                        this.list = res.data
                        this.pay_checked = this.list.pay_type == 2 ? true : false
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
                    this.pay_checked = id == "2" ? true : false
                }
            }
        },
        onLoad(option){
            this._getOrder(JSON.parse(option.data))
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