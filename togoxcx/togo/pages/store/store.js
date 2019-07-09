// pages/store/store.js
var app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "104.071182",
    latitude: "30.662533",
    markers: [{
      longitude: "104.071182",
      latitude: "30.662533",
      iconPath: "",
      width: "25",
      height: "35",
      callout: {
        display: 'BYCLICK',
        content: "",
        fontSize: "12",
        borderRadius: 5,
        padding: 10
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabbar();
    this.getShop().then((res) => {
      this.getLocation(res).then((res) => {
        this.getShort(res)
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  wash(){
    wx.switchTab({
      url: '/pages/washCar/washCar',
    })
  },
  toStoreList() {
    wx.navigateTo({
      url: '../store_list/store_list',
    })
  },
  toLatest() {
    wx.navigateTo({
      url: '../latest/latest',
    })
  },
  toNavigation() {
    wx.openLocation({
      latitude: parseFloat(wx.getStorageSync("shop").latitude),
      longitude: parseFloat(wx.getStorageSync("shop").longitude),
      name: wx.getStorageSync("shop").shopname,
      scale: 12
    })
  },
  // 获取附近门店
  getShop() {
    let url = "?s=shop.getShopList";
    let that = this
    let a = wx.getStorageSync("shop")
    return new Promise((resolve, reject) => {
      return http({ s: "shop.getShopList" },"POST").then(res => {
        if (res.data.ret === 200) {
          var dataShop = res.data.data
          var markers = []
          for (let index in dataShop) {
            if (!markers[index]) {
              markers[index] = {}
            }
            markers[index].latitude = dataShop[index].latitude
            markers[index].longitude = dataShop[index].longitude
            markers[index].id = dataShop[index].id
            markers[index].iconPath = "../../images/zuobiao.png"
            markers[index].width = "25"
            markers[index].height = "30"
            if (!markers[index].callout) {
              markers[index].callout = {}
            }
            console.log(dataShop[index])
            markers[index].callout.display = "BYCLICK"
            markers[index].callout.content = dataShop[index].shopname
            markers[index].callout.fontSize = "14"
            markers[index].callout.borderRadius = 5
            markers[index].callout.padding = 10
          }
          resolve(markers)
        } else {
          reject("门店获取失败")
        }
      })

    })
  },
  // 微信获得经纬度
  getLocation: function (res) {
    var mapList = res
    let vm = this;
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          // 获取门店
          var latitude = res.latitude
          var longitude = res.longitude
          var markerList = {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            id: "a1",
            iconPath: "../../images/store_dingw.png",
            width: "22",
            height: "30",
            callout: {
              display: 'BYCLICK',
              content: "我的当前位置",
              fontSize: "14",
              borderRadius: 5,
              padding: 10
            }
          }
          mapList.push(markerList)
          var list = {
            latitude: latitude,
            longitude: longitude,
            markers: mapList
          }
          resolve(list)
        },
        fail: function (res) {
          reject(res)
          console.log('fail' + JSON.stringify(res))
        }
      })
    })

  },
  // 获取最近门店
  getShort(e) {
    if (!e) {
      return
    }
    var shopS = e.markers
    let longitude = e.longitude
    let latitude = e.latitude
    let url = "?s=shop.user_shop&longitude=" + longitude + "&latitude=" + latitude;
    let that = this
    return http({ s: "shop.user_shop", longitude: longitude, latitude: latitude }, "POST").then(res => {
      if (res.data.ret === 200) {
        let list = res.data.data
        if (list) {
          for (let index in shopS) {
            if (shopS[index].id == wx.getStorageSync("shop").id) {
              shopS[index].callout.display = "ALWAYS"
            }
          }
        }
      }
      that.setData({
        longitude: e.longitude,
        latitude: e.latitude,
        markers: shopS
      })
    })
  },
  //取消点标
  markertap(e) {
    let markerId = e.markerId
    var markers = this.data.markers
    for (let index in markers) {
      markers[index].callout.display = "BYCLICK"
      if (markers[index].id === markerId) {
        markers[index].callout.display = "ALWAYS"
      }
    }
    this.setData({
      markers: markers
    })
  }
})