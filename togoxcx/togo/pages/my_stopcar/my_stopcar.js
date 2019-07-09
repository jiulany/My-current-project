// pages/my_stopcar/stopcar.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  instructionTap(){
    wx.navigateTo({
      url: '/pages/instructions/instructions',
    })
  },

  commonProblemTap(){
    wx.navigateTo({
      url: '/pages/common_problem/common_problem',
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

  },
  toRecord(){
    wx.navigateTo({
      url: '../my_stopcar_record/my_stopcar_record',
    })
  },
  toEqulty(){
    http({ s: "park.mycheckmem", user_id: app.globalData.userId }, "POST").then(res => {//判断跳转
      console.log(res)
      if (res.data.ret == 423) {
        wx.navigateTo({
          url: '../equity_no/equity_no',
        })
      }
      if (res.data.ret == 424) {
        $Message({
          content: '会员已过期，请重新购买',
          type: 'warning'
        });
        setTimeout(function () {
          wx.navigateTo({
            url: '../equity_no/equity_no',
          })
        }, 1500)
      }
      if (res.data.ret == 200) {
        wx.navigateTo({
          url: '../equity/equity',
        })
      }
    })
  }
})