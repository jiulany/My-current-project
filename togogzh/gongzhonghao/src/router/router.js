import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Cookies from 'js-cookie'
const routes = [{
        path: '',
        component: resolve => require(['../views/Login.vue'], resolve)
    },
    {
        path: '/window',
        component: resolve => require(['../views/Index.vue'], resolve),
        children: [{
                path: 'index',
                component: resolve => require(['../views/IndexStart.vue'], resolve),
            }, {
                path: 'myinfo',
                component: resolve => require(['../views/MyInfo.vue'], resolve)
            },
            {
                path: 'store',
                component: resolve => require(['../views/Store.vue'], resolve)
            }
        ]
    },
    //精细养护
    {
        path: '/window/index/meticulous',
        component: resolve => require(['../views/MeticulousMaintenance.vue'], resolve),
    },
    {
        path: '/window/index/meticulous/cosmetologyorder',
        component: resolve => require(['../views/CosmetologyOrder.vue'], resolve),
    },
    // 开始洗车
    {
        path: '/window/index/carwash',
        component: resolve => require(['../views/CarWashProject.vue'], resolve),
    }, {
        path: '/window/index/carwash/placeorder',
        component: resolve => require(['../views/PlaceOrder.vue'], resolve),
    },
    {
        path: '/window/index/carwash/stores',
        component: resolve => require(['../views/StoreList.vue'], resolve),
    },
    {
        path: '/window/index/carwash/stores/storedetails',
        component: resolve => require(['../views/StoreDetails.vue'], resolve),
    },
    // 商店
    {
        path: '/window/store/goodsdetails',
        component: resolve => require(['../views/GoodsDetails.vue'], resolve),
    },
    {
        path: '/window/store/goodsdetails/storeorder',
        component: resolve => require(['../views/StoreOrder.vue'], resolve),
    }, {
        path: '/window/store/goodsdetails/placeorder/pay',
        component: resolve => require(['../views/payView.vue'], resolve),
    },
    // 我的
    {
        path: '/window/myinfo/personal',
        name: 'personal',
        component: resolve => require(['../views/PersonalIfo.vue'], resolve),
    },
    {
        path: '/window/myinfo/personal/privacy',
        component: resolve => require(['../views/PassWordSet.vue'], resolve),
    },
    {
        path: '/window/myinfo/personal/privacy/setpsw',
        component: resolve => require(['../views/SetPassword.vue'], resolve),
    },
    {
        path: '/window/myinfo/personal/privacy/modifypsw',
        component: resolve => require(['../views/ModifyPsw.vue'], resolve),
    },
    {
        path: '/window/myinfo/mycar',
        component: resolve => require(['../views/MyCar.vue'], resolve),
    },
    {
        path: '/window/myinfo/mywallet',
        component: resolve => require(['../views/RechargeOrCash.vue'], resolve),
    },
    {
        path: '/window/myinfo/allredpag',
        component: resolve => require(['../views/RedPagAll.vue'], resolve),
    },
    // {
    //     path: '/window/myinfo/allredpag/balance',
    //     component: resolve => require(['../views/RechargeOrCash.vue'], resolve),
    // },
    {
        path: '/window/myinfo/allredpag/recharge',
        component: resolve => require(['../views/Recharge.vue'], resolve),
    },
    {
        path: '/window/myinfo/aboutus',
        component: resolve => require(['../views/AboutUs.vue'], resolve),
    },
    {
        path: '/window/myinfo/aboutus/abouttogo',
        component: resolve => require(['../views/AboutTogo.vue'], resolve),
    }
    ,
    {
        path: '/window/myinfo/aboutus/complaint',
        component: resolve => require(['../views/Complaint.vue'], resolve),
    }
    // 我的订单
    ,
    {
        path: '/window/myinfo/orderwait/:wz',
        component: resolve => require(['../views/MyOrder.vue'], resolve),
    },
    {
        path: '/window/myinfo/orderuse/:wz',
        component: resolve => require(['../views/MyOrder.vue'], resolve),
    },
    {
        path: '/window/myinfo/orderover/:wz',
        component: resolve => require(['../views/MyOrder.vue'], resolve),
    },
    {
        path: '/window/myinfo/orderall/:wz',
        component: resolve => require(['../views/MyOrder.vue'], resolve),
    },
    {
        path: '/window/myinfo/:wz/orderdetail',
        component: resolve => require(['../views/OrderDetails.vue'], resolve),
    }
]

const router = new VueRouter({
    routes,
})
router.beforeEach((to, from, next) => { //判断登录状态，防止跳转到登录界面
    if (to.path == '/') {
        next()
        if (Cookies.get('userStatus') == 1) {
            next({ path: '/window/index' })
        }
    } else {
        next()
    }
})
export default router