// pages/vip_equity/vip_equity.js
import http from "../../utils/http.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [],
    content: [],
    http: app.globalData.baseUrl,
    comp_fst: false,
    comp_snd: false,
    showModal_0: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    http({ s: "park.checkmember" }, "POST").then(res => {
      console.log(res);
      let details = Object.assign({}, res.data.data)
      this.setData({
        details: details,
        comp_fst: true
      })
      wx.hideLoading()
    })
    http({ s: "Goods.getgoods", classifyid: 9, isshang: 1 }, "POST").then(res => {
      console.log(111)
      console.log(res);
      // let content = Object.assign({}, res.data.data)
      this.setData({
        content: res.data.data,
        comp_snd: true
      })
      wx.hideLoading()
    })
  },

  // 点击支付10元
  toPay: function() {
    let that= this
    http({ s: "Goods.getgoods", classifyid: 9, isshang: 1 }, "POST").then(res => {
      if (res.data.ret == 200) {
        let a = wx.getStorageSync("lag")
        wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: res.data.data[0].classifyid, goodsId: res.data.data[0].id, goodsName: res.data.data[0].goodsname, longitude: a.longitude, latitude: a.latitude})
        // wx.setStorageSync('setYanghuOrd', `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync('shop').id}&classifyid=${res.data.data[0].classifyid}&goodsid=${res.data.data[0].id}`)
        if (wx.getStorageSync("phone") != "") {
          wx.navigateTo({
            url: '/pages/order_vip/order_vip'
          })
        } else {
          that.setData({
            showModal_0: true
          })
        }
      }
      if (res.data.ret == 433) {
        wx.showToast({
          title: '你当月已购买过该服务',
          icon: '',
          image: '',
          duration: 3000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
  toIndex: function () {
    this.setData({
      showModal_0: false
    })
  },
  getPhoneNumber: function (e) {
    let that = this
    app.getPhoneNumber(e).then(res => {
      if (wx.getStorageSync("phone") != "") {
        that.setData({
          showModal_0: false
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/order_vip/order_vip'
          })
        }, 500)
      } else {
        that.setData({
          showModal_0: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})