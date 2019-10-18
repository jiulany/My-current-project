<script>
//app.js
import {config} from '@/common/utils/congfig.js'
import { UserModel } from "./model/user.js";
const userModel = new UserModel();
import { IndexModel } from "./model/index.js";
const indexModel = new IndexModel();
export default {
  data() {
    return {
      userInfo: []
    };
  },
 
  onLaunch: function() {
    uni.hideTabBar();
    uni.clearStorageSync()

    let self = this
    
    uni.setStorageSync("SystemInfo", uni.getSystemInfoSync().platform);

    // #ifdef APP-PLUS
    // 锁定屏幕方向
    plus.screen.lockOrientation("portrait-primary"); //锁定
    // 检测升级
    uni.request({
      url: "https://uniapp.dcloud.io/update", //检查更新的服务器地址
      data: {
        appid: plus.runtime.appid,
        version: plus.runtime.version,
        imei: plus.device.imei
      },
      success: res => {
        console.log("success", res);
        if (res.statusCode == 200 && res.data.isUpdate) {
          let openUrl =
            plus.os.name === "iOS" ? res.data.iOS : res.data.Android;
          // 提醒用户更新
          uni.showModal({
            title: "更新提示",
            content: res.data.note ? res.data.note : "是否选择更新",
            success: showResult => {
              if (showResult.confirm) {
                plus.runtime.openURL(openUrl);
              }
            }
          });
        }
      }
    });

    // #endif

    //#ifdef MP-WEIXIN
    uni.getProvider({
      service: "oauth",
      success: function(res) {
        console.log(res);
        if (~res.provider.indexOf("qq")) {
          uni.login({
            provider: "qq",
            success: function(loginRes) {
              console.log(JSON.stringify(loginRes));
            }
          });
        }
      }
    });
    // uni.showLoading({
    //     title:'loading...',
    //     mask:true
    // })

    // 登录
    // uni.login({
    //     provider: 'weixin',
    //     success: res => {
    //         console.log(res)
    //         if (res.errMsg === 'login:ok') {
    //             // 获取code
    //             const code = res.code
    //             uni.setStorageSync('code', code)
    //             // 调用获取openid接口
    //             userModel.getOpenid().then(res => {
    //                 uni.hideLoading()
    //                 // 所以此处加入 callback 以防止这种情况
    //                 if (res.data) {
    //                     this.userInfo = res.data
    //                     const openId = res.data.userinfo.openId
    //                     const datas = res.data.skey
    //                     if (openId) {
    //                         uni.setStorageSync('openId', openId)
    //                         uni.setStorageSync('skey', datas)
    //                     } else {
    //                         userModel._show_error()
    //                     }
    //                     // this.globalData.checkLogin = true
    //                     //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
    //                     // 所以此处加入 callback 以防止这种情况
    //
    //                     // if (this.checkLoginReadyCallback) {
    //                     //     this.checkLoginReadyCallback(res);
    //                     // }
    //                 } else {
    //                     // this.globalData.checkLogin = true
    //                     //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
    //                     // 所以此处加入 callback 以防止这种情况
    //                     // if (this.checkLoginReadyCallback) {
    //                     //     this.checkLoginReadyCallback(res);
    //                     // }
    //                     // userModel._show_error()
    //                 }
    //             }).catch(e=>{
    //                 uni.showToast({
    //                     title: '服务器异常',
    //                     icon:'none'
    //                 })
    //                 // setTimeout(()=>{
    //                 //     this.globalData.checkLogin = true
    //                 //     //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
    //                 //     // 所以此处加入 callback 以防止这种情况
    //                 //     if (this.checkLoginReadyCallback) {
    //                 //         this.checkLoginReadyCallback(res);
    //                 //     }
    //                 // },1000)
    //             })
    //         } else {
    //             // code获取失败
    //             uni.showToast({
    //                 title: '微信授权登陆失败,请检测网络重新进入！',
    //                 icon:'none',
    //                 mask:true,
    //                 duration:50000000
    //             })
    //             return false
    //         }
    //     }
    // })

    // #endif
  },
  globalData: {
    api_base_url:config.api_base_url,
    userInfo: null,
    checkLogin: false,
    no_pic:config.no_pic,  
    shop: {},
    phone:''
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";
/* 以下样式用于 hello uni-app 演示所需 */

page {
  background-color: #f4f5f6;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}

.uni-header-logo {
  padding: 30rpx;
  text-align: center;
  margin-top: 10rpx;
}

.uni-header-logo image {
  width: 140rpx;
  height: 140rpx;
}

.uni-hello-text {
  color: #7a7e83;
}

.uni-hello-addfile {
  text-align: center;
  line-height: 300rpx;
  background: #fff;
  padding: 50rpx;
  margin-top: 10px;
  font-size: 38rpx;
  color: #808080;
}
.span1 {
  width: 4.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span2 {
  width: 8.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span3 {
  width: 12.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span4 {
  width: 16.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span5 {
  width: 20.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span6 {
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span7 {
  width: 29.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span8 {
  width: 33.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span9 {
  width: 37.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span10 {
  width: 41.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span11 {
  width: 45.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span12 {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span13 {
  width: 54.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span14 {
  width: 58.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span15 {
  width: 62.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span16 {
  width: 66.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span17 {
  width: 70.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span18 {
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span19 {
  width: 79.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span20 {
  width: 83.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span21 {
  width: 87.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span22 {
  width: 91.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span23 {
  width: 95.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span24 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.keyboarder-model .uni-popup__wrapper-box {
  padding: 0 !important;
}
.keyboarder-model .uni-popup__mask {
  opacity: 0 !important;
}
/* #endif*/
</style>