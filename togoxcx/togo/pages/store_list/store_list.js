//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
import http from "../../utils/http.js"
Page({
  data: {
    area_items: [],
    cur_inx: 0,
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    items: [],
    province: "",
    city: "",
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (e) {
    console.log(e)
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'PTOBZ-BVCW2-2U3U3-CEUP3-3UIJ7-DCFJX' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
    http({ s: "shop.get_city", city: wx.getStorageSync("city") }).then(res => {
      let a = res.data.data
      for (let i in a) {
        if (i == 0) {
          a[i].act = true
        } else {
          a[i].act = false
        }
      }
      that.setData({
        area_items: a
      })
      var province = ""
      var city = ""
      wx.getStorage({
        key: 'province',
        success(res) {
          province = res.data
          wx.getStorage({
            key: 'city',
            success(res) {
              city = res.data
              wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                  console.log(res)
                  var latitude = res.latitude
                  var longitude = res.longitude
                  that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                  })
                  http({ s: "shop.getShopList_2", province: province, city: city, area: that.data.area_items[0].address3, longitude: longitude, latitude: latitude}).then(res => {
                    console.log(res)
                    let a = res.data.data
                    for (let i in a) {
                      let b = null
                      b = a[i].distance
                      b = (b / 1000).toFixed(1)
                      a[i].distance = b
                    }
                    that.setData({
                      items: a
                    })
                    console.log(that.data.items)
                  })
                }
              })

            }
          })
        }
      })
    })
  },
  getUserInfo: function (e) {

  },
  clickArea(e) {
    var that = this
    var area_items = that.data.area_items
    var inx = e.currentTarget.dataset.index
    var area = e.currentTarget.dataset.itm.address3
    area_items[that.data.cur_inx].act = false
    area_items[inx].act = true
    that.setData({
      area_items: area_items,
      cur_inx: inx
    })
    console.log(e)
    http({ s: "shop.getShopList_2", province: that.data.province, city: that.data.city, area: area, longitude: that.data.longitude, latitude: that.data.latitude}).then(res => {
      console.log(res)
      let a = res.data.data
      for (let i in a) {
        let b = null
        b = a[i].distance
        b = (b / 1000).toFixed(1)
        a[i].distance = b
      }
      that.setData({
        items: a
      })
      console.log(that.data.items)
    })
  },
  toCallMe(e) {
    console.log("切换");
    console.log(e)
    const goodsName = e.currentTarget.dataset.data.shopname
    const distance = e.currentTarget.dataset.data.distance
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mydata: {
        goodsName: goodsName,
        distance: distance
      }
    })
    // wx.setStorageSync('late_shop', e.currentTarget.dataset.data.id)
    wx.setStorageSync('shop', e.currentTarget.dataset.data)
    wx.navigateBack({
      delta: 1
    })
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  toComeHere(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.itm.latitude),
      longitude: parseFloat(e.currentTarget.dataset.itm.longitude) ,
      name: e.currentTarget.dataset.itm.shopname,
      scale: 12
    })
  }
})