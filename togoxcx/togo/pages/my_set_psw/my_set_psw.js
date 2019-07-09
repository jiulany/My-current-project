// pages/my_set_psw/my_set_psw.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    set_psw: null,
    res_psw: null,
    xg_psw: null,
    visible1: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  resPsw() {
    this.setData({
      visible1: true
    });
  },
  handleClose1(e) {
    var that = this
    if (e.type == "cancel") {
      that.setData({
        visible1: false
      });
    }
    if (e.type == "ok") {
      http({ s: "Pay.resetpwd", userId: app.globalData.userId }).then(res => {
        if (res.data.data == 1) {
          $Message({
            content: '重置成功！',
            type: 'success'
          });
          wx.request({ //
            url: app.globalData.baseUrl + `/?s=Pay.havepwd&id=${app.globalData.userId}`,
            success: function (res) {
              if (res.data.ret == 200) {
                that.setData({
                  set_psw: false,
                  res_psw: true,
                  xg_psw: true
                })
              }
              if (res.data.ret == 403) {
                that.setData({
                  set_psw: true,
                  res_psw: false,
                  xg_psw: false
                })
              }
              if (res.data.ret == 404) {
                that.setData({
                  set_psw: true,
                  res_psw: false,
                  xg_psw: false
                })
              }
            }
          })
        } else {
          $Message({
            content: '重置失败',
            type: 'error'
          });
        }
        that.setData({
          visible1: false
        })
      })
      
    }
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
    var that = this
    http({ s: "Pay.havepwd", id: app.globalData.userId }).then(res => {//默认车辆
      if (res.data.ret == 200) {
        that.setData({
          set_psw: false,
          res_psw: true,
          xg_psw: true
        })
      }
      if (res.data.ret == 403) {
        that.setData({
          set_psw: true,
          res_psw: false,
          xg_psw: false
        })
      }
      if (res.data.ret == 404) {
        that.setData({
          set_psw: true,
          res_psw: false,
          xg_psw: false
        })
      }
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
  toSetPsw() {
    wx.navigateTo({
      url: '../my_set_psw_new/my_set_psw_new',
    })
  },
  toChangePsw() {
    wx.navigateTo({
      url: '../my_set_psw_old/my_set_psw_old',
    })
  }
})