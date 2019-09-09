<template>
    <view class='orderBox' @tap='hiddenKeyboard' v-if="!Array.isArray(order)">
        <!-- 配送地址 -->
        <view class='addressTopBox'>
            <i-icon type="dingwei" size="24" color="#fccf00" />
            <view class='addressContent'>
                <view class='addressBox'>
                    <view class='name adds'>{{order.contacts}}</view>
                    <view class='phone adds'>{{order.mobile}}</view>
                </view>
                <view class='addText' v-if="order.full_address">
                    {{order.full_address}}
                </view>
            </view>
        </view>
        <view class='top'>
            <view class='shopTop' v-if="order.delivery_type == 1">
                <view class='shopTopLeft'>
                    <image src='../../img/shop.png' class='shopIcon'></image>
                </view>
                <view class='shopTopTitle'>{{order.shop.name}}</view>
            </view>
            <view class='shopTopLeft shopTopTitle' v-if="order.delivery_type == 2">
                物流配送
            </view>
            <view class='topRight'>
                {{status[order.order_status]}}
            </view>
        </view>
        <view class="orders" v-for="(item , index ) in order.details" :key="index">
            <view class='orderContent'>
                <image class='orderImg' :src='item.sku.image.commodity_image_thum'></image>
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
        </view>

        <view class='orderList'>
            <view class='orderAdd orderH'>
                <view>配送方式</view>
                <view v-if="order.delivery_type === 2">送货上门</view>
                <view v-if="order.delivery_type === 1">到店自取</view>
            </view>
            <view class='orderAdd orderH' v-if="order.pay_type > 0">
                <view>支付方式</view>
                <view v-if="order.pay_type === 1">余额支付</view>
                <view v-if="order.pay_type === 2">微信支付</view>
                <view v-if="order.pay_type === 3">现金支付</view>
                <view v-if="order.pay_type === 4">农商</view>
                <view v-if="order.pay_type === 5">红包余额</view>
            </view>
            <view class='orderAdd orderH' v-if="order.freight > 0">
                <view>物流运费：</view>
                <view>￥{{order.freight}}</view>
            </view>
            <view class='orderNum orderH'>
                <view>订单编号：</view>
                <view class='orderNums'>{{order.internal_order_sn}}</view>
                <text class='orderFz' @tap='textPaste' >复制</text>
            </view>
            <view class='orderAdd orderH'>
                <view>创建时间：</view>
                <view>{{order.created_at}}</view>
            </view>
            <view class='orderOver orderH'>
                <view>成交时间：</view>
                <view>{{order.updated_at}}</view>
            </view>
            <view class='orderprice orderH'>
                <view>实付款：</view>
                <view class='priceNum'>￥{{order.order_total_price}}</view>
            </view>
            <view class='pircebtn' v-if="order.order_status === 1">
                <button class='orderBtn' @tap='onclose'  >取消订单</button>
                <button class='orderBtn active'  @tap='onpay' >付款</button>
            </view>
        </view>
<!--        <i-modal title="请输入支付密码" :visible="visible1" @ok="handleClose2" @cancel="handleClose1">-->
<!--            <view class='nuame1' @tap='showKeyboard1'>-->
<!--                <text class='pwdnum'>{{inppwx}} </text>-->
<!--                <view class='className'></view>-->
<!--            </view>-->
<!--        </i-modal>-->
<!--        <i-modal title="选择支付方式" :visible="wxPayStatus" actions="{ actions }}" show-cancel="{{false}}" show-ok="{{false}}" action-mode="{{ vertical }}"  >-->
<!--            <view class="btn-wx btn-l" @tap="handleClickpay" data-id="0" v-if="{{assets_len > 0}}">余额支付</view>-->
<!--            <view class="btn-wx btn-m"  @tap="handleClickpay" data-id="1">微信支付</view>-->
<!--        </i-modal>-->
<!--        <view :class='keyboard {{keyShow&&"hind_box"}}'>-->
<!--            <view class='complete' @tap='hiddenKeyboard'>完成</view>-->
<!--            <view class='key_box'>-->
<!--                <text class='keys {{index%3==0&&"border0"}} {{(index==9||index==11)&&"bg_color"}}' wx:for='{{KeyboardKeys}}' wx:key='this' @tap='keyTap' data-keys='{{item}}'>{{item}}</text>-->
<!--            </view>-->
<!--        </view>-->
    </view>
</template>

<script>
    import {OrderModel} from "../../model/order";
    const orderModel = new  OrderModel()
    export default {
        name: "order_detail",
        data() {
            return {
                order: [],
                KeyboardKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '<'],
                status: ["全部", "待付款", "待配送", "已完成"],
                inppwd: '',
                inppwx: '',
                inpname: '',
                visible1: false,
                internal_payment_sn: '',
                wxPayStatus: false,
                actions: [],
                zfid:'',
                assets_len:0
            }
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
            uni.showLoading({
                title: '',
            })
            console.log(this.order)
            const id = options.id
            this.getorder(id)
            const users = uni.getStorageSync('users')
            let assets_len = 0
            if (users.assets){
                assets_len =1
            }
            this.assets_len = assets_len
        },
        methods:{
            showKeyboard1(e) {
                this.setData({
                    keyShow: true
                });
            },
            hiddenKeyboard() {
                this.setData({
                    keyShow: false,
                    wxPayStatus:false
                })
            },
            keyTap(e) {
                //判断是否是输入密码
                const pwd = this.data.visible1
                // 记录删除次数
                let keys = e.currentTarget.dataset.keys,
                    content = this.data.inppwd,
                    contentx = this.data.inppwx,
                    len = content.toString().length;
                switch (keys) {
                    case '<': //如果点击删除键就删除字符串里的最后一个
                        let dels = this.data.dels
                        if (dels) {
                            this.setData({
                                inputEnds: content,
                                dels: false
                            })
                        }
                        content = content.toString().substr(0, content.toString().length - 1);
                        contentx = contentx.toString().substr(0, contentx.toString().length - 1)
                        break;
                    default:
                        if (len < 6) { //控制最多可输入10个字符串
                            content += keys.toString();
                            contentx += "*";
                        }
                        break
                }
                this.setData({
                    inppwd: content,
                    inppwx: contentx
                });
                // --------------

            },
            textPaste(e){
                const id = e.currentTarget.dataset.id
                wx.setClipboardData({
                    data: id,
                    success: function (res) {
                        wx.getClipboardData({
                            success: function(res) {
                                wx.showToast({
                                    title: '复制成功',
                                })
                            }
                        })
                    }
                })
            },
            getorder(id) {
                orderModel.getOrderDetails(id).then(res => {
                    uni.hideLoading()
                    if (res.data) {
                        const order = res.data
                        this.order = order
                    }
                })
            },
            // 取消订单
            onclose(e) {
                const id = e.currentTarget.dataset.id
                wx.showModal({
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
                            wx.setStorageSync('dapay', true)
                            setTimeout(() => {
                                wx.navigateBack({})
                            },2000)
                        } else {
                            wx.showToast({
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
                    wx.showToast({
                        title: '请填写支付密码',
                        icon: 'none'
                    })
                    return false
                }
                if (pwd.toString().length < 6) {
                    wx.showToast({
                        title: '请输入6位密码',
                        icon: 'none'
                    })
                    return false
                }
                this.checkPwd()
            },
            checkPwd() {
                const password = this.data.inppwd
                const data = {
                    password
                }
                userModel.getpwdcheck(data).then((res) => {
                    if (res.data.status === true) {
                        this.setData({
                            visible1: false,
                        });
                        //创建订单
                        this.oncommitOrder()
                    } else {
                        wx.showToast({
                            title: '密码错误',
                            icon: 'none'
                        })
                    }
                })
            },
            handleClickpaycolse() {
                this.setData({
                    wxPayStatus: false
                })
            },
            handleClickpay(e) {
                const index = e.currentTarget.dataset.id;
                var internal_payment_sn = this.data.internal_payment_sn
                if (index === '0') {
                    this.sumpay(internal_payment_sn)
                } else if (index === '1') {
                    this.wxPay(internal_payment_sn)
                }
                this.setData({
                    wxPayStatus: false
                })
            },
            // 微信支付
            wxPay(internal_payment_sn) {
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
                    wx.requestPayment({
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: data.paySign,
                        success(res) {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'none'
                            })
                            wx.setStorageSync('dapay', true)
                            setTimeout(() => {
                                wx.navigateBack({})
                            }, 2000)
                        },
                        fail(res) {
                            wx.showToast({
                                title: '支付失败！',
                                icon: 'none'
                            })
                        }
                    })
                }).catch((e) => {
                    wx.showToast({
                        title: '支付失败！',
                        icon: 'none'
                    })
                })
            },
            sumpay(internal_payment_sn){
                const MPWD = wx.getStorageSync('MPWD')
                if (MPWD === true) {
                    wx.showModal({
                        title: '你已经开通免密支付',
                        content: '是否继续完成支付',
                        success: res => {
                            if (res.confirm) {
                                // wx.setStorageSync('MPWD', true)
                                this.oncommitOrder()
                                this.setData({
                                    inppwx: '',
                                    inppwd: '',
                                    internal_payment_sn
                                });
                            } else if (res.cancel) {
                            }
                        }
                    })
                    return false
                } else {
                    this.setData({
                        visible1: true,
                        inppwx: '',
                        inppwd: '',
                        internal_payment_sn
                    });
                }
            },
            // 余额支付、
            onpay(e) {
                const internal_payment_sn = e.currentTarget.dataset.id
                const zfid = e.currentTarget.dataset.zfid
                console.log(zfid)
                this.setData({
                    wxPayStatus: true,
                    internal_payment_sn,
                    zfid
                })
            },
            oncommitOrder() {
                var that = this
                wx.setStorageSync('dapay', false)
                this.setData({
                    visible1: false,
                    inppwx: '',
                    inppwd: ''
                }); zfid
                const internal_payment_sn = this.data.internal_payment_sn
                const zfid = this.data.zfid
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
                        wx.setStorageSync('dapay', true)
                        setTimeout(() => {
                            wx.navigateBack({})
                        }, 2000)
                    }
                }).catch((e) => {
                    wx.showToast({
                        title: '支付生成失败！',
                        icon: 'none'
                    })
                })
            }

        }
    }
</script>

<style scoped>
    /* components/orderList/orderList.wxss */
    page{
        background: #f5f5f5;
    }
    .orderBox{
        width: 100%;
        background: #fff;
        border-top: solid 1rpx #f5f5f5
    }
    .orders {
        display: flex;
        flex-direction: column;
        width: 96%;
        margin: 0 auto;
        background: #fff;
        margin-top: 10rpx;
        border-bottom: solid 1rpx #f5f5f5;
    }
    .shopTop {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 10rpx;
    }

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
        align-items: center;
        height: 60rpx;
        line-height: 60rpx;
    }

    .topRight {
        font-size: 24rpx;
        color: #e41717;
        margin-right: 35rpx;
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

    .orderList {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-top: 10rpx;
        font-size: 26rpx;
    }
    .orderH{
        height: 98rpx;
        display: flex;
        flex-direction: row;
        border-bottom: solid 1rpx #f5f5f5;
        line-height: 98rpx;
        justify-content: space-between;
        padding-left: 30rpx;
        padding-right: 30rpx;
        align-items: center;
    }
    .priceNum{
        color: #e41717;
    }
    .orderFz{
        width: 100rpx;
        height: 36rpx;
        border: solid 1rpx #333333;
        font-size: 21rpx;
        line-height: 36rpx;
        /* padding: 0; */
        /* margin-top: 31rpx; */
        text-align: center;
        margin-right: 6rpx;
    }
    .orderNums{
        flex: 1;
        text-align: right;
        padding-right: 20rpx;
    }

    .pircebtn {
        display: flex;
        flex-direction: row;
        height: 100rpx;
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
        margin-right: 18px;
    }

    button::after {
        border: none;
    }
    .addressContent{
        display: flex;
        width: 100%;
        flex-direction: column;
        color: #474747
    }
    .addressTopBox{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 30rpx;
    }
    .addressBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 32rpx;
    }
    .adds{
        height: 80rpx;
        line-height: 80rpx;

    }
    .addText{
        margin-left: 40rpx;
        font-size: 32rpx;
        border-bottom: 1rpx solid #f5f5f5;
        padding-bottom: 30rpx;
    }
    .name{
        margin-left: 40rpx;
        margin-right: 60rpx;
    }
    .nuame1 {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        border: solid 1rpx #efefef;
        text-align: center;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx;
        border-radius: 10rpx;
        justify-content: center;
    }
    .className {
        width: 2rpx;
        height: 35rpx;
        background: #666;
        border-radius: 6rpx;
        animation: twinkling 1s infinite;
    }
    .pwdnum{
        color: black
    }
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

    .shop_s{
        position: fixed;
        top:2000rpx;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        height: 100%;
        transition: height 1s;
    }
    .shop_close{
        position: absolute;
        top:20rpx;
        right: 30rpx;
    }
    .shop_s_top{
        height: 100%;
        background: black;
        opacity: 0.7;
    }
    .shop_s_content{
        position: absolute;
        bottom: 0rpx;
        left: 0rpx;
        right: 0;
        background: #fff;
        /* height: 60%; */

        opacity: 1;
        transition: all .1s ease
    }
    .shop_s_content7{
        height: 73%;
    }
    .shop_s_content9{
        height: 90%!important;
    }
    .btn-wx{
        padding-top:15px;
        height: 65rpx;
        font-size: 16px;
        line-height: 80rpx;
        border-top:solid 1rpx #efefef;
    }
    .btn-l{
        line-height: 35rpx;

    }
    .btn-m{
        padding-top:5rpx;
    }
</style>