// pages/my_set_psw_new/my_set_psw_new.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    psw_res: "",
    psw: ""
  },
  inpPsw(e) {
    var that = this
    var a = e.detail.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      psw: b
    })
  },
  inpPswres(e) {
    var that = this
    var a = e.detail.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      psw_res: b
    })
  },
  handleClick() {
    var that = this
    if (that.data.psw != that.data.psw_res) {
      $Message({
        content: '两次输入不相等，请检查',
        type: 'error'
      });
    } else {
      http({ s: "pay.setpaypwd", id: app.globalData.userId, paypwd: that.data.psw, repaypwd: that.data.psw_res }).then(res => {//默认车辆
        if (res.data.ret == 200) {
          $Message({
            content: '添加成功',
            type: 'success'
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          $Message({
            content: '请求错误',
            type: 'error'
          });
        }
      })
    }
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