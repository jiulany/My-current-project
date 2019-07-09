// pages/first_aid/first_aid.js
var app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aidArray: [],
    allSelect: false,
    conutPrice: 0, // 总价格,
    comp_fst: false,
    http:app.globalData.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    const id = wx.getStorageSync('late_shop')
    http({ s: "Goods.getgoods", classifyid: 6, shopid: id, isshang:1},"POST").then(res => {
      _this.setData({
        aidArray: res.data.data,
        comp_fst: true
      })
      wx.hideLoading()
    })
  },
  // 更改状态
  switchRadio(e) {
    const id = e.currentTarget.dataset.id
    const aidArray = this.data.aidArray
    let conutPrice = 0
    let num = 0
    let allSelect = false
    for (let index in aidArray) {
      if (parseInt(index) === parseInt(id)) {
        aidArray[index].sle = !aidArray[index].sle
      }
    }
    for (let index in aidArray) {
      if (aidArray[index].sle === true) {
        num++
        conutPrice += parseFloat(aidArray[index].price)
      }
    }
    
    if (num === aidArray.length && num > 0) {
      allSelect = true
    }
    this.setData({
      allSelect: allSelect,
      conutPrice: conutPrice,
      aidArray: aidArray
    })
  },
  // 全选
  sonAllSeleted(e) {
    const type = e.detail.notAll
    const aidArray = this.data.aidArray
    let conutPrice = 0
    if (type) {
      for (let index in aidArray) {
        aidArray[index].sle = true
        conutPrice += parseFloat(aidArray[index].price)
      }
    } else {
      for (let index in aidArray) {
        aidArray[index].sle = false
      }
    }
    let priceAll = conutPrice.toFixed(2)
    this.setData({
      aidArray: aidArray,
      conutPrice: priceAll
    })
  },
  //获取提交类型
  commitShop(e) {
    const aidArray = this.data.aidArray
    const order = []
    for (let index in aidArray) {
      if (aidArray[index].sle) {
        order.push(aidArray[index])
      }
    }
    console.log(order)
    if (order.length < 1) {
      wx.showToast({
        title: '您还没有选择急救项目',
        icon:"none"
      })
      return false
    }
    let a = ""
    let b=""
    for (let i in order) {
      if ((order.length - 1) == i) {
        a += order[i].id
        b += order[i].goodsname
      } else {
        a = a + order[i].id + ","
        b = b + order[i].goodsname + ","
      }
    }
    console.log(a)
    let c = wx.getStorageSync("lag")
    wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: 6, goodsId: a, goodsName: b, longitude: c.longitude, latitude: c.latitude})
    // wx.setStorageSync('setYanghuOrd', `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync('shop').id}&classifyid=${6}&goodsid=${a}`)
    wx.navigateTo({
      url: '../set_order/set_order',
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