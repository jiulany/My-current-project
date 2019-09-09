import {HTTP} from '../common/utils/http'

class UserModel extends HTTP {
    getOpenid() {
        return this.request({
            url: '/login'
        })
    }
    getUerInfo(){
        return this.request({
            url:'/userInfo'
        })
    }
    //余额
    getBalances(data){
        return this.request({
            url:`/balances/logs?page=${data.page}&size=${data.size}`
        })
    }
    // recharges列表
    getRecharges(){
        return this.request({
            url:'/recharges'
        })
    }
    // recharges
    recharges(data)
    {
        return this.request({
            url: '/recharges/createOrder',
            method:'POST',
            data
        })
    }
    // 我的车辆
    getCars(){
        return this.request({
            url:'/user/cars'
        })
    }
    // 充值
    createOrder(data){
        return this.request({
            url:'/recharges/createOrder',
            method:'POST',
            data
        })
    }
    onPay(data){
        return this.request({
            url:'/wechat/payment',
            method:'POST',
            data
        })
    }
    // pip
    getstartpwd() {
        return this.request({
            url: '/password/isHasPassword'
        })
    }
}
export {
    UserModel
}