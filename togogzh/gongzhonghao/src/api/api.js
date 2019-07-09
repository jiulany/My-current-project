import axios from 'axios'
import qs from 'qs'




export function loginSendMsg(data) { //发送验证码
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=dx.sendDx', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}

export function loginAddMsg(data) { //验证登录
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=User.adduser', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getGoods(data) { //获取商品列表
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Goods.getgoods', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function updUser(data) { //获取个人信息
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=User.upduser', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function setOrder(data) { //生成订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.setorder', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function storeOrder(data) { //商城生成订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=order.setorder2', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function userCar(data) { //获取用户车辆信息
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=car.usercar', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getOrder(data) { //查询订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.getorder', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getCarColor() { //获取车辆颜色
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Color.getcolor').then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function addCar(data) { //添加车辆
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=car.setcar', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getMarketClassify() { //获得商场分类
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Classify.getClassify&classid=3').then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getSingleGoods(data) { //获取单个商品信息
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Goods.updgoods', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function updCar(data) { //更新车辆订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.updcar', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getRechargeType(data) { //查询充值类型接口
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Recharge.getRechargeType', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function addRechargeFlow(data) { //添加订单流水号
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Recharge.addRechargeFlow', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}

export function setPayPwd(data) { //添加支付密码
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=pay.setpaypwd', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function updPayPwd(data) { //修改支付密码
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=pay.updpaypwd', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function reSetPwd(data) {    //重置支付密码
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Pay.resetpwd', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function havePwd(data) {    //判断是否有支付密码
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Pay.havepwd', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function Validate(data) { //本地支付功能
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=pay.validate', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getBalance(data) { //获取余额
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Pay.getBalance', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function delCar(data) {    //删除车辆
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=car.delcar', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function douPd(data) {    //修改车辆信息接口
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=car.doupd', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getBaseInfo(data) {    //获取code
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Wx.getBaseInfo', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function delOrder(data) {    //删除订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.delorder', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getToken(data) {    //getToken
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Wx.getToken', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function jsapi(data) {    //得到订单
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/example/jsapi.php', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getShopList(data) {    //得到店铺
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Shop.getShopList', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getShopInfo(data) {    //得到单个店铺
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Shop.getShopInfo', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function getNewNum(data) {    //得到店铺
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.getnewnum', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function addAdvice(data) {    //投诉建议
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=User.addadvice', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function updShopid(data) {    //订单修改店铺
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=order.updshopid', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
export function renderingOrder(data) {    //订单修改店铺
    return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_URL + '/?s=Order.rendering_order', qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(res => {
            reject(res)
        })
    })
}
