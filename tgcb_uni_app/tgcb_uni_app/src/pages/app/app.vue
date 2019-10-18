<template>
    <view class="app">
        <swiper class="swiper" :current="active" duration="0" @change="swiperChange">
            <swiper-item>
                <index :list="list" :shops="shops" :activities="activities" :activities_title="activities_title"></index>
            </swiper-item>
            <swiper-item>
                <store></store>
            </swiper-item>
            <swiper-item>
                <car_wash></car_wash>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item" style="background-color: #6641E2;">购物车</view>
            </swiper-item>
            <swiper-item>
                <my :user="user"></my>
            </swiper-item>
        </swiper>
        
        <view class="tab">
            <cover-view :class="active==0?'item active':'item'" @click="active=0" >
                <cover-view>
                    <cover-image v-if="active==0"  class="index_img" src="https://imgcdn.tuogouchebao.com/index_active.png"></cover-image>
                    <cover-image v-else  class="index_img" src="https://imgcdn.tuogouchebao.com/index.png"></cover-image>
                </cover-view>
                <cover-view>首页</cover-view>
            </cover-view>
            <cover-view :class="active==1?'item active':'item'" @click="active=1">
                <cover-view>
                    <cover-image v-if="active==1" class="index_img" src="https://imgcdn.tuogouchebao.com/shop_active.png"></cover-image>
                    <cover-image v-else class="index_img" src="https://imgcdn.tuogouchebao.com/shop.png"></cover-image>
                </cover-view>
                <cover-view>门店</cover-view>
            </cover-view>
            <view :class="active==2?'item-add active':'item-add'" @click="active=2">
                <view>
                        <cover-image class="car_img" src="https://imgcdn.tuogouchebao.com/tab_sle_xiche.png"></cover-image>
                    <view  class="index_img" ></view>
                </view>
                <view>洗车</view>
            </view>
            <cover-view :class="active==3?'item active':'item'" @click="active=3">
                <cover-view>
                    <cover-image v-if="active==3" class="index_img" src="https://imgcdn.tuogouchebao.com/shoping_mall_active.png"></cover-image>
                    <cover-image v-else class="index_img" src="https://imgcdn.tuogouchebao.com/shoping_mall.png"></cover-image>
                </cover-view>
                <cover-view>商城</cover-view>
            </cover-view>
            <cover-view :class="active==4?'item active':'item'" @click="active=4">
                <cover-view>
                    <cover-image v-if="active==4" class="index_img" src="https://imgcdn.tuogouchebao.com/my_active.png"></cover-image>
                    <cover-image v-else class="index_img" src="https://imgcdn.tuogouchebao.com/my.png"></cover-image>
                </cover-view>
                <cover-view>我的</cover-view>
            </cover-view>
        </view>
    </view>
</template>

<script>
    import index from '../../components/index/index'
    import my from '../../components/my/my'
    import store from '../../components/store/store'
    import car_wash from '../../components/car_wash/car_wash'
    import {IndexModel} from "../../model";
    const  indexModel = new IndexModel()
    import {UserModel} from "../../model/user";
    const  userModel = new UserModel()
    export default {
        name:'app',
        data() {
            return {
                active: 0,
                height:0,
                list:{},
                activities:{},
                activities_title:{},
                user:{},
                valve:false,
                userInfo:[],
                wash_list:[],
                longitude:'',
                latitude:'',
                shops:[],
                shop_id:0
            }
        },
        components:{
            index,
            store,
            my,
            car_wash
        },
        methods:{
            _login(){
                // 登录
                uni.login({
                    provider: 'weixin',
                    success: res => {
                        console.log(res)
                        if (res.errMsg === 'login:ok') {
                            // 获取code
                            const code = res.code
                            uni.setStorageSync('code', code)
                            // 调用获取openid接口
                            userModel.getOpenid().then(res => {
                                
                                // 所以此处加入 callback 以防止这种情况
                                if (res.data) {
                                    this.userInfo = res.data

                                    const openId = res.data.userinfo.openId
                                    const datas = res.data.skey
                                    if (openId) {
                                        uni.setStorageSync('openId', openId)
                                        uni.setStorageSync('skey', datas)
                                    } else {
                                        userModel._show_error()
                                    }
                                    this._getUserInfo();
                                    this._getIndex()
                                    this.valve = true;
                        
                                    // this.globalData.checkLogin = true
                                    //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况

                                    // if (this.checkLoginReadyCallback) {
                                    //     this.checkLoginReadyCallback(res);
                                    // }
                                } else {
                                    // this.globalData.checkLogin = true
                                    //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    // if (this.checkLoginReadyCallback) {
                                    //     this.checkLoginReadyCallback(res);
                                    // }
                                    // userModel._show_error()
                                }
                            }).catch(e=>{
                                uni.showToast({
                                    title: '服务器异常',
                                    icon:'none'
                                })
                                // setTimeout(()=>{
                                //     this.globalData.checkLogin = true
                                //     //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                                //     // 所以此处加入 callback 以防止这种情况
                                //     if (this.checkLoginReadyCallback) {
                                //         this.checkLoginReadyCallback(res);
                                //     }
                                // },1000)
                            })
                        } else {
                            // code获取失败
                            uni.showToast({
                                title: '微信授权登陆失败,请检测网络重新进入！',
                                icon:'none',
                                mask:true,
                                duration:50000000
                            })
                            return false
                        }
                    }
                })
            },
            swiperChange(e) {
                this.active = e.detail.current;
                console.log(e)
            },
            // 调用接口
            _getIndex(){
                indexModel.getIndex().then((res) => {
                    uni.hideLoading()
                    if(res.data) {
                        this.list = res.data
                        this.activities = res.data.activities
                        this.activities_title = res.data.activities.title
                    }
                })
            },
            // 个人中心
            _getUserInfo(){
                userModel.getUerInfo().then((res) => {
                    if(res.code < 400){
                        this.user = res.data
                    }
                })
            },
           
        },

        onLoad(){
            //#ifdef MP-WEIXIN
            this._login()
            // #endif

            //#ifdef H5
            this._getUserInfo();
            this._getIndex()
            // #endif

            console.log('onLoad')
            // this.getapps()
           
            uni.getSystemInfo({
                success:res=>{
                    this.height = res.screenHeight;
                }
            })
            
        },
        onShow(){
            if (this.valve) {
                this._getUserInfo()
            }
            let self = this
            // 获取经纬度
            uni.getLocation({
                type: 'wgs84',
                success: function (res) {
                    let params = {
                        longitude:res.longitude,
                        latitude:res.latitude,
                    }
                    indexModel.getShopList(params).then((res) => {
                        self.shops = res.data
                        console.log('shops')
                        console.log(self.shops)
                    })
                }
            }); 
        },
        watch:{
            deep: true,
            'userInfo':{
                handler(val){
                console.log(val)
                }
            }
        }
    }
</script>

<style>
    .swiper,.app{
        height: 100%;
    }
    swiper-item{
        background: #fff;
    }
    .swiper-item {
        width: 100%;
        height: 100%;
    }

    .iconfont {
        margin-top: 0;
        color: #929292;
        font-size: 22px !important;

    }
    .icon-xiche{
        color: #fff;
    }
    .tab {
        position: fixed;
        height: 98rpx;
        width: 100%;
        bottom: 0;
        background-color: #FFFFFF;
        display: flex;
        border-top: #F5F5F5 1rpx solid;

    }

    .tab .item-add {
        width: 20%;
        color: #929292;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        text-align: center;
        font-size: 22rpx;
    }

    .item-add .car_img {
        width: 90rpx;
        height: 90rpx;
        position: fixed;
        left: 50%;
        bottom: 44rpx;
        font-size: 35rpx !important;
        margin-left: -45rpx!important;
    }

    .tab .item {
        width: 20%;
        color: #929292;
        font-size: 22rpx;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .active {
        color: #FDD000 !important;
    }

    .active .iconfont {
        color: #FDD000;
    }
    .icon-xiche {
        color: #fff !important;
    }
    .index_img{
        width: 43rpx;
        height: 42rpx;
        margin-bottom: 12rpx;
        margin-top: 15rpx;
    }
   
</style>
