<template>
    <view class="orders" catchtap='hiddenKeyboard'>
        <view class="main">    
            <view class='top'>
                <view class='shopTop' v-if="orders.delivery_type == 1">
                    <view class='shopTopLeft'>
                        <image src='../../img/shop.png' class='shopIcon'></image>
                    </view>
                    <view class='shopTopTitle'>{{orders.shop.name}}</view>
                </view>
                <view class='shopTopLeft shopTopTitle' v-if="orders.delivery_type == 2">
                    物流配送
                </view>
                <view class='topRight'>
                    {{status[orders.order_status]}}
                </view>
            </view>
            <view class='orderContent' @tap='onOrder' :data-id="orders.id" v-for="(item,index) in orders.details" :key="index">
    <!--            <image class='orderImg' :src="item.sku.image.commodity_image_thum"></image>-->
                <an-image  class='orderImg' :src="item.sku.image.commodity_image_thum" :alt="no_pic"></an-image>
                <view class='title'>
                    <view>
                        {{item.commodity_name}}
                    </view>
                    <view class='desc'>
                        {{item.sku_name}}
                    </view>
                </view>
                <view class='price'>
                    <view class='prices'>￥{{item.original_price}}</view>
                    <text class='nums'>x{{item.number}}</text>
                </view>
            </view>
            <view class='pirceSum'>
                <view class='priceDecs' v-if="orders.order_status === 1">
                    等待付款
                </view>
                <view class='priceDecs' v-else>
                    实付款
                </view>
                <view class='priceSums'>￥{{orders.order_payment_price}}</view>
            </view>
            <view class='pircebtn' v-if="orders.order_status === 1">
                <button class='orderBtn' @tap='onclose' >取消订单</button>
                <button class='orderBtn active' @tap='onpay(orders.id,$event)'  >付款</button>
            </view>

        <!-- <i-modal title="请输入支付密码" :visible="visible1" @ok="handleClose2" @cancel="handleClose1">
            <view class='nuame1' catchtap='showKeyboard1'>
                <text class='pwdnum'>{{inppwx}} </text>
                <view class='className'></view>
            </view>
        </i-modal> -->
        <!-- <i-modal title="选择支付方式" visible="{{ wxPayStatus }}" actions="{{ actions }}" show-cancel="{{false}}" show-ok="{{false}}" action-mode="{{ vertical }}"  >
            <view class="btn-wx btn-l" catchtap="handleClickpay" data-id="0" v-if="assets_len>0">余额支付</view>
            <view class="btn-wx btn-m"  catchtap="handleClickpay" data-id="1">微信支付</view>
        </i-modal> -->

            <view v-if="keyShow" :class="keyShow?'hind_box':'keyboard'">
                <view class='complete' @tap='hiddenKeyboard'>完成</view>
                <view class='key_box'>
                    <text :class='index%3==0?"keys":"border0"' {{(index==9||index==11)&&"bg_color"}} v-for='(item,index) in KeyboardKeys' :key='index' @tap='keyTap' :data-keys='item'>{{item}}</text>
                </view>
            </view>
        </view>    
        
    </view>
</template>

<script>
    import {
        OrderModel
    } from '../../model/order.js'
    const orderModel = new OrderModel()
    import {
        UserModel
    } from '../../model/user.js'
    const userModel = new UserModel()
    import anImage from '@/components/an-image/an-image.vue'
    
  
    export default {
        name: "orderList",
        components:{
            anImage,
        },
        data () {
            return {
                no_pic:getApp().globalData.no_pic,
                status: ["全部", "待付款", "待使用", "已完成", "交易关闭"],
                inppwd: '',
                inppwx: '',
                inpname: '',
                visible1: false,
                internal_payment_sn: '',
                data: [],
                keyShow: false,
                wxPayStatus:false,
                actions:[],
                zfid:'',
            }
        },
        props:{
            orders:{
                type:Object
            }
        },
        /**
         * 组件的方法列表
         */
        methods: {
            // 取消订单
            onclose(e) {
                const id = e.currentTarget.dataset.id
                uni.showModal({
                    content: '确定取消订单吗？',
                    success: res => {
                        if (res.confirm) {
                            this.close(id)
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            close(id) {
                if (id) {
                    orderModel.cancel({
                        id
                    }).then((res) => {
                        if (res.code === 200) {
                            wx.showToast({
                                title: '取消订单成功'
                            })
                            setTimeout(() => {
                                this.triggerEvent('closeOrder', true)
                            }, 1000)
                        } else {
                            uni.showToast({
                                title: '取消订单失败',
                                icon: 'none'
                            })
                        }
                    })
                }
            },
            handleOpen1() {
                this.setData({
                    visible1: true,
                    inppwx: '',
                    inppwd: ''
                });
            },

            handleClose1() {
                this.setData({
                    visible1: false,
                    inppwx: '',
                    inppwd: ''
                });
            },
            handleClose2() {
                const pwd = this.data.inppwd
                if (pwd.toString().length < 1) {
                    uni.showToast({
                        title: '请填写支付密码',
                        icon: 'none'
                    })
                    return false
                }
                if (pwd.toString().length < 6) {
                    uni.showToast({
                        title: '请输入6位密码',
                        icon: 'none'
                    })
                    return false
                }
                this.setData({
                    visible1: false,
                });
                //创建订单
                this.oncommitOrder()
            },
            onOrder(e) {
                const id = e.currentTarget.dataset.id
                uni.navigateTo({
                    url: '/pagesC/order_detail/order_detail?id=' + id,
                })
            },
            // 判断是否设置过密码
            async getStartpwd() {
                const res = await userModel.getstartpwd()
                const data = res.data
                if (data.status === false) {
                    // 未设置密码
                    uni.showToast({
                        title: '你还未设置密码,请先设置密码！',
                        icon: 'none'
                    })
                    uni.setStorageSync('pwd', false)
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/editPaw/editPaw'
                        })
                    }, 1000)
                    return false
                } else {
                    uni.setStorageSync('pwd', true)
                    return true
                }
            },
            async sumpay(internal_payment_sn) {
                // 判断是否设置过密码
                const MPWD = wx.getStorageSync('MPWD')
                if (MPWD) {
                    uni.showModal({
                        title: '你已经开通免密支付',
                        content: '是否继续完成支付',
                        success: res => {
                            if (res.confirm) {
                                // wx.setStorageSync('MPWD', true)
                                this.setData({
                                    inppwx: '',
                                    inppwd: '',
                                    internal_payment_sn
                                });
                                this.oncommitOrder()
                            } else if (res.cancel) {

                            }
                        }
                    })
                    return false
                } else {
                    // 设置密码
                    const a = await this.getStartpwd()
                    if (a) {
                        this.setData({
                            visible1: true,
                            inppwx: '',
                            inppwd: '',
                            internal_payment_sn
                        });
                        // this.oncommitOrder()
                    }
                }

            },
            handleClickpay(e){
                const index = e.currentTarget.dataset.id;
                const internal_payment_sn = this.data.internal_payment_sn
                if (index === '0') {
                    this.sumpay(internal_payment_sn)
                } else if (index === '1') {
                    this.wxPay(internal_payment_sn)
                }
                this.setData({
                    wxPayStatus: false
                })
            },
            // 余额支付、
            onpay(order_id,e) {
    
                // const internal_payment_sn = e.currentTarget.dataset.id
                // const zfid = e.currentTarget.dataset.zfid
                // this.wxPayStatus = true
                // this.internal_payment_sn = internal_payment_sn
                // this.zfid = zfid
                this.$emit('choice_pay_type',order_id)
            },
            oncommitOrder() {
                this.setData({
                    visible1: false,
                    inppwx: '',
                    inppwd: ''
                });
                const zfid = this.data.zfid
                const internal_payment_sn = this.data.internal_payment_sn
                orderModel.yuonpay({
                    order_id:internal_payment_sn,
                    internal_payment_sn:zfid
                }).then((res) => {
                    if (res.code === 200) {
                        wx.showToast({
                            title: '支付成功！',
                            icon: 'none',
                            duration: 1000
                        })
                        setTimeout(() => {
                            this.triggerEvent('closeOrder', true)
                        }, 1000)
                    }
                }).catch((e) => {
                    console.log(e)
                })
            },
            handleClickpaycolse(){
                this.setData({
                    wxPayStatus: false
                })
            },
            // 微信支付
            wxPay(internal_payment_sn){
                const zfid = this.data.zfid
                const paylist = {
                    order_id:internal_payment_sn,
                    type: 1,
                    internal_payment_sn: zfid
                }
                var that = this
                orderModel.onPay(paylist).then((res) => {
                    const data = JSON.parse(res.data)
                    var time = new Date().getTime()
                    uni.requestPayment({
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: data.paySign,
                        success(res) {
                            uni.showToast({
                                title: '支付成功',
                                icon: 'none'
                            })
                            setTimeout(() => {
                                that.triggerEvent('closeOrder', true)
                            }, 1000)
                        },
                        fail(res) {
                            uni.showToast({
                                title: '支付失败！',
                                icon: 'none'
                            })
                        }
                    })
                }).catch((e) => {
                    uni.showToast({
                        title: '支付失败！',
                        icon: 'none'
                    })
                })
            }
        },
        watch:{
            orders:{
                handler(val){
                    console.log(val)
                   // this.orders = JSON.parse(JSON.stringify(val))
                   //  console.log( this.orders)
                }
            }
        }

    }
</script>

<style scoped>
    /* components/orderList/orderList.wxss */

    .orders .main {
        display: flex;
        flex-direction: column;
        width: 92%;
        margin: 0 auto;
        background: #fff;
        margin-top: 10rpx;
    }
    .shopTop {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 10rpx;
    }
    /* .btn-wx{
        padding-top:15px;
        height: 65rpx;
        font-size: 16px;
        line-height: 80rpx;
        border-top:solid 1rpx #efefef;
    } */
    /* .btn-l{
        line-height: 35rpx;

    } */
    /* .btn-m{
        padding-top:5rpx;
    } */
    .shopTopLeft {
        font-size: 35rpx;
        margin-left: 20rpx;
    }
    .shopIcon {
        width: 30rpx;
        height: 30rpx;
        margin-top: 10rpx;
        margin-right: 15rpx;
    }
    .shopTopTitle {
        font-size: 30rpx;
        color: #474747;
    }
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10rpx;
    }

    .topRight {
        font-size: 24rpx;
        margin-right: 20rpx;
        color: #e41717;
    }

    .topLft {
        display: flex;
        flex-direction: row;
        font-size: 26rpx;
        margin-left: 25rpx;
    }

    .price {
        display: flex;
        flex-direction: row;
        font-size: 22rpx;
    }

    .orderImg {
        width: 128rpx;
        height: 128rpx;
        margin: 25rpx;
    }

    .orderContent {
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .title {
        flex: 1;
        display: flex;
        margin-top: 20rpx;
        flex-direction:column;
        font-size:25rpx;
        justify-content:space-around;
        height: 128rpx;
    }
    .desc{
        color:#959595;
    }
    .price {
        display: flex;
        flex-direction: column;
        width: 100rpx;
        margin-top: 20rpx;
        text-align: right;
        margin-right: 20rpx;
    }

    .nums {
        text-align: right;
    }

    .pirceSum {
        display: flex;
        flex-direction: row;
        border-top: solid 1rpx #f5f5f5;
        border-bottom: solid 1rpx #f5f5f5;
        font-size: 26rpx;
        justify-content: space-between;
        height: 78rpx;
        line-height: 78rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;

    }

    .priceSums {
        color: #e41717;
    }

    .pircebtn {
        display: flex;
        flex-direction: row;
        /* height: 80rpx; */
        align-items: center;
        justify-content: flex-end;
    }

    .orderBtn {
        display: inline-block;
        width: 160rpx;
        height: 60rpx;
        line-height: 40rpx;
        font-size: 28rpx;
        padding: 0;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        border-radius: 5px;
        border: 2rpx solid rgba(153, 153, 153, 0.719);
        margin: 15rpx;
    }

    .active {
        border-radius: 5px;
        border: 2rpx solid #e41717;
        color: #e41717;
        margin-right: 10px;
    }

    button::after {
        border: none;
    }
    /* .nuame1 {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        border: solid 1rpx #efefef;
        text-align: center;
        font-size: 20rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx;
        border-radius: 10rpx;
        justify-content: center;
    } */
    /* .className {
        width: 2rpx;
        height: 35rpx;
        background: #666;
        border-radius: 6rpx;
        animation: twinkling 1s infinite;
    } */
    /* .pwdnum{
        color: black
    } */
    .className1 {
        width: 2rpx;
        height: 35rpx;
        background: #666;
        border-radius: 6rpx;
        animation: twinkling 1s infinite;
    }
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    @-webkit-keyframes twinkling {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
    .keyboard {
        height: 0;
        width: 100%;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        transition: height 0.3s;
        z-index: 9999;
    }
    .hind_box {
        height: 440rpx;
    }

    .complete {
        background: #efefef;
        height: 80rpx;
        font-size: 30rpx;
        line-height: 80rpx;
        text-align: right;
        padding: 0 25rpx;
        color: #fda700;
    }

    .key_box {
        overflow: hidden;
    }

    .keys {
        float: left;
        width: 250rpx;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        border-left: 1px solid #eee;
        box-sizing: border-box;
        border-top: 1px solid #eee;
    }
</style>