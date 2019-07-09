//app.js
import http from "./utils/http.js"
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
   

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        http({ s: "Wxmini.getUserKey", code: res.code }, "POST").then(res => {
          if (res.data.data.userdata.gzh_openid == "") {
            http({ s: "Wxmini.gzhDataMigrate", unionId: res.data.data.userdata.unionid, openId: res.data.data.userdata.openid }).then(res => {

            })
          }
          if (res.data.data.userdata.phone == "" || res.data.data.userdata.phone == "undefined") {
            wx.setStorageSync("phone", "")
          } else {
            wx.setStorageSync("phone", res.data.data.userdata.phone)
          }
          var openid = res.data.data.userdata.openid;

          wx.setStorageSync('openid', openid)
          wx.setStorageSync('userId', res.data.data.userdata.id)
          this.globalData.userId = wx.getStorageSync('userId')
          // var openid1 = wx.getStorageSync('openid');
          // console.log("aad:" + openid1);
        })
        // wx.request({
        //   url: 'https://testapi.baodi520.com/?s=Wxmini.getUserKey',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //   },
        //   method: 'POST',
        //   data: {
        //     code: res.code
        //   },
        //   success: res => {
        //     if (res.data.data.userdata.phone == "" || res.data.data.userdata.phone == "undefined") {
        //       wx.setStorageSync("phone", "")
        //     } else {
        //       wx.setStorageSync("phone", res.data.data.userdata.phone)
        //     }
        //     var openid = res.data.data.userdata.openid;

        //     wx.setStorageSync('openid', openid)
        //     wx.setStorageSync('userId', res.data.data.userdata.id)
        //     this.globalData.userId = wx.getStorageSync('userId')
        //     // var openid1 = wx.getStorageSync('openid');
        //     // console.log("aad:" + openid1);
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
getPhoneNumber(n){
  return new Promise((resolve,reject)=>{
    var openid = wx.getStorageSync('openid');
    let a = ""
    let b = n.detail.encryptedData
    let c = n.detail.iv
    c = encodeURIComponent(c)
    a = encodeURIComponent(b);
    // console.log("openid:" + openid)
    // console.log('errmsg', e.detail.errMsg)
    // console.log('iv', e.detail.iv)
    // console.log('encry', e.detail.encryptedData)
    http({
      s: "Wxmini.dataDecode",
      openid: openid,
      encryptedData: a,
      iv: c
    }, "POST").then(res => {
      let number = res.data.data.phoneNumber;
      wx.setStorageSync('phone', number)
      http({
        s: "Wxmini.addPhoneNum",
        openid: openid,
        phone: number
      }, "POST").then(res => {
        wx.setStorageSync("isNotSame", false)
        resolve()
      })
    })
  })
  
},
  onShow:function(res){
    console.log(res)
    if (res.scene == 1008 || res.scene == 1007){
      this.globalData.scene=true
    }
    // 隐藏自带的tabbar
    wx.hideTabBar();
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    userInfo: null,
    systemInfo: null,//客户端设备信息                                  
    yanghu: [],
    goods: {},
    baseUrl: "https://testapi.baodi520.com", //https://testapi.baodi520.com http://192.168.31.131 tzl:http://192.168.31.26 lc:http://192.168.31.9 //tgapi_staging.baodi520.com
    openid_phone: null,
    userId: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#959595",
      "selectedColor": "#fdd000",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/images/home.png",
          "text": "首页",

          "selectedIconPath": "/images/home_selected.png"
        },
        {
          "pagePath": "/pages/store/store",
          "iconPath": "/images/shop.png",
          "text": "门店",
          "selectedIconPath": "/images/shop_selected.png"

        },
        {
          "pagePath": "/pages/washCar/washCar",
          "iconPath": "/images/wash_car.png",
          "selectedIconPath": "/images/wash_car.png",
          "text": "洗车"
        },
        {
          "pagePath": "/pages/market/market",
          "iconPath": "/images/mall.png",
          "selectedIconPath": "/images/mall_selected.png",
          "text": "商城"
        },
        {
          "pagePath": "/pages/my/my",
          "iconPath": "/images/my.png",
          "selectedIconPath": "/images/my_selected.png",
          "text": "我的"
        }
      ]
    }
  }
})