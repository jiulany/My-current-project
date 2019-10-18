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
    // 年检页面的汽车
    getAnnualReviewCars()
    {
        return this.request({
            url:`/annualReview/carList`
        })
    }
    // 删除汽车
    deleteCar(data)
    {
        return this.request({
            url:'/user/cars/delete',
            method:'POST',
            data
        })
    }
    // 汽车详情
    getCarDetails(data)
    {
        return this.request({
            url:`/user/cars/${data.car_id}`
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
    // 用户优惠券
    getUserCoupons(params)
    {
        return this.request({
            url:`/user/coupons?status=${params.status}&confirm=${params.confirm}`
        })
    }
    // 邀请
    activate(params)
    {
        return this.request({
            url:`/activate`,
            method:'POST',
            data:params
        })
    }
    // 密码状态
    isHasPassword(){
        return this.request({
            url:`/password/isHasPassword`
        })
    }
    // 设置密码
    setPassword(data){
        return this.request({
            url:`/password/set`,
            method:'POST',
            data:data
        })
    }
    // 修改支付密码状态(是否使用)
    setPasswordPayment(data){
        return this.request({
            url:`/user/setPasswordPayment`,
            method:'POST',
            data:data
        })
    }
    // 我的地址
    getAddress(data)
    {
        return this.request({
            url:`/user/address?type=${data.type}`,
        })
    }
    // 创建地址
    createAddress(data){
        return this.request({
            url:`/user/address`,
            method:'POST',
            data:data
        })
    }
     // 修改地址
     updateAddress(data,options){
        return this.request({
            url:`/user/address/${options.id}`,
            method:'POST',
            data:data
        })
    }
    // 获取地址详情
    getAddressDetails(data)
    {
        return this.request({
            url:`/user/address/${data.id}`,
        })
    }
    checkPassword(data)
    {
        return this.request({
            url:`/password/check`,
            method:'POST',
            data
        })
    }
    // 年检列表
    annualReviewList(data)
    {
        return this.request({
            url:`/annualReview/userList`,
            data
        })
    }
    // 我的预约列表
    appointmentList(data)
    {
        return this.request({
            url:`/appointments/list`,
            data
        })
    }
    // 应急停车记录
    parkingRecode(data){
        return this.request({
            url:`/parking/recode`,
            data
        })
    }
    // 申请项目列表
    applyProjectList(data) {
        return this.request({
            url:`/guarantees/list?page=${data.page}&size=${data.size}`
        });
    }
    // 获取用户微信数据,上传给服务器
    updateUserInfo(data)
    {
        return this.request({
            url:`/user/updateUserInfo`,
            method:'POST',
            data
        })
    }
}
export {
    UserModel
}