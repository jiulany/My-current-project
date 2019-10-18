import {HTTP} from '../common/utils/http'

class OrderModel extends HTTP {
    commitOrder(data) {
        return this.request({
            url: '/orders/confirmOrder',
            method:'POST',
            data
        })
    }
    createOrder(data){
        return this.request({
            url: '/orders/create',
            method:'POST',
            data
        })
    }
    //收银台
    getOrders(data){
        return this.request({
            url: '/orders/cashier?internal_payment_sn='+ data.internal_payment_sn + '&order_id=' + data.order_id
        })
    }
    //提交订单
    subPay(data){
        return this.request({
            url: '/wechat/payment',
            method:'POST',
            data
        })
    }
    // 0元支付
    paymentForFree(data){
        return this.request({
            url : `/orders/paymentForFree`,
            method:'POST',
            data
        })
    }
    //完善预约信息
    createAppointments(data){
        return this.request({
            url:'/appointments/create',
            method:'POST',
            data
        })
    }
    //应急停车订单创建
    parkingCreateOrder(data){
        return this.request({
            url:'/parking/createOrder',
            method:'POST',
            data
        })
    }
    //套餐订单创建
    packageCreateOrder(data)
    {
        return this.request({
            url:'/package/createOrder',
            method:'POST',
            data
        })
    }
    // 取消订单
    cancel(data) {
        return this.request({
            url: '/orders/cancel',
            method: 'POST',
            data
        })
    }
    // 余额
    yuonpay(data) {
        return this.request({
            url: '/balances/payment',
            method:'POST',
            data
        })
    }
    // 订单列表
    getOrderList(data) {
        return this.request({
            url: `/user/orders?status=${data.status}&page=${data.page}&size=${data.size}`
        })
    }
    //获取详情
    getOrderDetails(id) {
        return this.request({
            url: `/orders/${id}`
        })
    }
    // 订单完成页面
    finishDetails(data){
        return this.request({
            url : `/orders/finishDetails`,
            data
        })
    }
    // 获取年检订单(年检收银台)
    getAnnualReview(data){
        return this.request({
            url: `/annualReview/cashier`,
            data
        })
    }
}
export {
    OrderModel
}