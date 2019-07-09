// pages/my_balance/my_balance.js
const app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
      that.setData({
        balance: res.data.data.balance
      })
    })
  },

  to_balance_details:function(){
    wx.navigateTo({
      url: '/pages/balance_details/balance_details',
    })

  },

  toRecharge(){
    wx.navigateTo({
      url: '/pages/my_recharge/my_recharge',
    })
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

  }
})