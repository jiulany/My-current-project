var app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    http: app.globalData.baseUrl,
    comp_fst:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = "?s=Goods.getgoods&classifyid=5&isshang=1";
    http({ s: "Goods.getgoods", classifyid: 5, isshang:1}).then(res => {
      console.log(res)
      that.setData({
        list: res.data.data,
        comp_fst: true
      })
      wx.hideLoading()
    })
  },

  carYearTap: function (event) {
    console.log(event)
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/car_year/car_year?id=' + postId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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