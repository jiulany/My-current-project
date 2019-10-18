<template>
  <view class="inx">
  
    <index v-if="list" :shop="shop" :list="list" :activities="activities" :activities_title="activities_title"></index>
    <cover-view class="fadenum" style="height:100vh" v-if="!list">
        <cover-image style="width:750rpx;height:2553rpx;" src="../../static/image/yujiazhai.png"></cover-image>
    </cover-view>
    <!-- 首页快捷卡片 -->
    <index-quick-card :isShow="isShow" @closeCard="closeCard"></index-quick-card>
    <!-- <select-store></select-store> -->
    <tab-bar v-if="list" address="0"></tab-bar>
  </view>
</template>
<script>
    import selectStore from "../../components/select-store/select-store"
    import indexQuickCard from "../../components/index-quick-card/index-quick-card"
	import {
		uniSwiperDot
	} from "@dcloudio/uni-ui";
	 import index from '../../components/index/index'
    import {IndexModel} from "../../model";
    const  indexModel = new IndexModel()
    import {UserModel} from "../../model/user";
    const  userModel = new UserModel()
	import tabBar from "../../components/tab-bar/tabBar.vue";
	export default {
		components: {
			uniSwiperDot,
			tabBar,
            index,
            indexQuickCard,
            selectStore
		},
		data() {
			return {
				active: 0,
                height:0,
                list:null,
                activities:{},
                activities_title:{},
                isShow:false,
                
                valve:false,
                userInfo:[],
                wash_list:[],
                longitude:'',
                latitude:'',
                shop:{},
                shop_id:0,
				info: [{
						content: "内容 A"
					},
					{
						content: "内容 B"
					},
					{
						content: "内容 C"
					}
				],
				current: 0,
				mode: "long",
				dotsStyles: {
					backgroundColor: "rgba(253, 208, 0, 0.3)",
					border: "1px rgba(253, 208, 0, 0.3) solid",
					color: "#fff",
					selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
					selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
				}
			};
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
            },
            closeCard(val){
                this.isShow=val
            },
			 _login(){
                // 登录
                uni.login({
                    provider: 'weixin',
                    success: res => {
                        console.log(111)
                        uni.getUserInfo({   
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            }
                        });
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
                                    // this._getUserInfo();
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
			 // 调用接口
            _getIndex(){
                indexModel.getIndex().then((res) => {
                    uni.hideLoading()
                    if(res.data) {
                        this.list = res.data
                        this.activities = res.data.activities
                        this.activities_title = res.data.activities.title
                         this.isShow=true
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
		
		onLoad: function() {
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
		onShow: function() {
			// if (this.valve) {
            //     this._getUserInfo()
            // }
            if (uni.getStorageSync('shop')) {
                this.shop = JSON.parse(uni.getStorageSync('shop'))
            } else {
                let self = this
                uni.getLocation({
                   type: 'wgs84',
                    success: function (res) {
                        let params = {
                            longitude:res.longitude,
                            latitude:res.latitude,
                        }
                        console.log(res.longitude,res.latitude)
                        indexModel.getShopList(params).then((res) => {
                            uni.setStorageSync('shop',JSON.stringify(res.data[0]))
                            self.shop = res.data[0]
                        })
                    }
                }); 
            }
		},
		onHide: function() {},
		 watch:{
            deep: true,
            'userInfo':{
                handler(val){
                console.log(val)
                }
            }
        }
	};
</script>

<style>

@keyframes fadeio {
    /*设置内容由显示变为隐藏*/
    0% {
        opacity: 0;
    }
    /* 50% {
        opacity: 0;
    } */
    100% {
        opacity: 1;
    }
}
@-moz-keyframes fadeio {
    /*设置内容由显示变为隐藏*/
    0% {
        opacity: 0;
    }
    /* 50% {
        opacity: 0;
    } */
    100% {
        opacity: 1;
    }
}
@-webkit-keyframes fadeio {
    /*设置内容由显示变为隐藏*/
    0% {
        opacity: 0;
    }
    /* 50% {
        opacity: 0;
    } */
    100% {
        opacity: 1;
    }
}
@-o-keyframes fadeio {
    /*设置内容由显示变为隐藏*/
    0% {
        opacity: 0;
    }
   
    100% {
        opacity: 1;
    }
}
.fadenum {
    animation: fadeio 2s;
    /* -webkit-animation: fadeio 2s infinite; */
    /* -moz-animation: fadeio 2s infinite;
    -o-animation: fadeio 2s infinite; */
}
</style>
