var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    showModal: false,
    nameMap: '',
    address: "",
    longitude: "104.1120000",
    latitude: "30.6900000",
    markers: [{
      longitude: "104.1120000",
      latitude: "30.6900000",
      iconPath: "../../images/store_dingw.png",
      width: "25",
      height: "35"
    }],
    is_stop: true,
    timeout: 60
  },

  fangDaTap: function (e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: ++this.data.scale
    })
  },

  suoXiaoTap: function (e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: --this.data.scale
    })
  },

  toShowModal: function (e) {
    this.setData({
      showModal: true

    })
  },

  hide: function (e) {
    this.setData({
      showModal: false
    });
  },

  toEqulty() {
    var that = this
    http({ s: "park.buypark", user_id: app.globalData.userId, address: this.address},"POST").then(res => {//判断跳转
      console.log(res)
      if (res.data.ret == 423) {
        this.toShowModal()

      }
      if (res.data.ret == 430) {
        this.toShowModal()

      }
      if (res.data.ret == 200) {
        wx.showToast({
          title: '停车成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          is_stop: false,
          timeout: 120
        })
        var a = setInterval(function () {
          if (that.data.timeout == 0) {
            clearInterval(a)
            that.setData({
              is_stop: true
            })
          } else {
            that.setData({
              timeout: that.data.timeout - 1
            })
          }
        }, 1000)
      }
      if (res.data.ret == 431) {
        this.toShowModal()
      }
      if (res.data.ret == 418) {
        wx.showToast({
          title: '停车失败请重新停车',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },

  toBuyVip() {
    wx.navigateTo({
      url: '/pages/vip_equity/vip_equity',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    qqmapsdk = new QQMapWX({
      key: 'PTOBZ-BVCW2-2U3U3-CEUP3-3UIJ7-DCFJX' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
    this.getLocation().then((res) => {
      this.getLocal(res.latitude, res.longitude).then((res) => {
        const longitude = res.result.location.lng
        const latitude = res.result.location.lat
        const address = res.result.address
        this.address = address;
        this.setData({
          longitude: longitude,
          latitude: latitude,
          nameMap: res.result.address,
          markers: [{
            longitude: longitude,
            latitude: latitude,
            iconPath: "../../images/store_dingw.png",
            width: "25",
            height: "35"
          }]
        })
      })
    })
  },
  onShow() {
    this.getLocation().then((res) => {
      this.getLocal(res.latitude, res.longitude).then((res) => {
        const longitude = res.result.location.lng
        const latitude = res.result.location.lat
        const address = res.result.address
        this.address = address;
        this.setData({
          longitude: longitude,
          latitude: latitude,
          nameMap: res.result.address,
          markers: [{
            longitude: longitude,
            latitude: latitude,
            iconPath: "../../images/store_dingw.png",
            width: "25",
            height: "35"
          }]
        })
      })
    })
  },
  // 微信获得经纬度
  getLocation: () => {
    return new Promise((resolve, reject) => {
      return wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          resolve(res)
        },
        fail: function (res) {
          reject('fail' + JSON.stringify(res))
        }
      })
    })

  },
  // 获取当前地理位置
  getLocal: (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: (res) => {
          resolve(res)
        },
        fail: function (res) {
          reject()
        }
      })
    });
  }

})