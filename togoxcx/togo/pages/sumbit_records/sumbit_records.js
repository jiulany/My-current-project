// pages/sumbit_records/sumbit_records.js
var app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    visible1: false,
    sle_cancel: {},
    actions1: [
      {
        name: '取消',
      },
      {
        name: '确定',
        color: '#fdd000'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http({ s: "car.getRecoverRecord", user_id: app.globalData.userId}).then(res => {
      console.log(res)
      this.setData({
        list: res.data.data
      })
    })
  },
  cuiShou(e){
    console.log(e)
    http({ s: "car.remindRecord", id: e.currentTarget.dataset.itm.id }).then(res => {
      if(res.data.ret==200){
        wx.showToast({
          title: '催收成功',
          icon: 'success',
          duration: 2000
        })
      }
      if(res.data.ret==400){
        let a=res.data.msg
        wx.showToast({
          title: a.replace("非法请求：",""),
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  cancel(e) {
    this.setData({
      visible1: true,
      sle_cancel:e.currentTarget.dataset.itm
    })
  },
  handleClick1(e) {
    var that = this
    if (e.detail.index == 0) {
      that.setData({
        visible1: false
      })
    }
    if (e.detail.index == 1){
      http({ s: "car.delRecord", id: that.data.sle_cancel.id}).then(res => {
        console.log(res)
        if(res.data.ret==200){
          wx.showToast({
            title: '撤销成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            visible1:false
          })
          http({ s: "car.getRecoverRecord", user_id: app.globalData.userId }).then(res => {
            that.setData({
              list: res.data.data
            })
          })
        }else{
          wx.showToast({
            title: '撤销失败',
            icon: 'none',
            duration: 2000
          })
        }
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