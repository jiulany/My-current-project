// pages/my_info/my_info.js
const app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1: false,
    invite: "",
    visible3: false,
    actions3: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: '#fdd000'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http({ s: "pay.is_payment", userid: app.globalData.userId }).then(res => {
      if (res.data.data == "1") {
        that.setData({
          switch1: true
        })
      }
      if (res.data.data == "0") {
        that.setData({
          switch1: false
        })
      }
    })
    http({ s: "user.upduser", id: app.globalData.userId }).then(res => {
      console.log(res)
      that.setData({
        invite: res.data.data.invite
      })
    })
  },
  copy() {
    var that = this;
    wx.setClipboardData({
      data: that.data.invite,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
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
  toSetPsw() {
    wx.navigateTo({
      url: '../my_set_psw/my_set_psw',
    })
  },
  toInv() {
    wx.navigateTo({
      url: '../invite_friends/invite_friends',
    })
  },
  onChange(event) {
    const detail = event.detail;
    console.log(detail)
    if (detail.value == false) {
      this.setData({
        'visible3': true
      })
    } else {
      this.setData({
        'switch1': detail.value
      })
      http({ s: "pay.set_payment", userid: app.globalData.userId, status: detail.value ? '1' : '0'}).then(res => {
        console.log(res)
        that.setData({
          modelList: res.data.data
        })
      })
    }
  },
  handleClick3(e) {
    var that=this
    console.log(e)
    if (e.detail.index == 0) {
      that.setData({
        visible3: false,
        switch1:true
      })
    }
    if (e.detail.index == 1) {
      http({ s: "pay.set_payment", userid: app.globalData.userId, status:0}).then(res => {
        if (res.data.ret == 200) {
          that.setData({
            visible3: false,
            switch1: false
          })
        }
      })
    }
  }
})