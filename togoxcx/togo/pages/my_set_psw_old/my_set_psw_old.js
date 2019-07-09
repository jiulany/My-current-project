// pages/my_set_psw_old/my_set_psw_old.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_psw: "",
    new_psw: "",
    new_res_psw: "",
    loading:false
  },
  inpOldPsw(e) {
    var that = this
    var a = e.detail.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      old_psw: b
    })
  },
  inpNewPsw(e) {
    var that = this
    var a = e.detail.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      new_psw: b
    })
  },
  inpNewResPsw(e) {
    var that = this
    var a = e.detail.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      new_res_psw: b
    })
  },
  sumbit() {
    console.log("ss")
    var that = this
    that.setData({
      loading: true
    })
    http({ s: "pay.updpaypwd", id: app.globalData.userId, paypwd: that.data.old_psw, repaypwd: that.data.new_res_psw, newpaypwd: that.data.new_psw }).then(res => {//默认车辆
      if (res.data.ret == 200) {
        that.setData({
          loading: false
        })
        $Message({
          content: '修改成功',
          type: 'success'
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        that.setData({
          loading: false
        })
        $Message({
          content: '修改失败,请检查密码是否正确',
          type: 'error'
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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