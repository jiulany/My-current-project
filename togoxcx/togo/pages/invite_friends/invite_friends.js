// pages/invite_friends/invite_friends.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    invite: "",
    isSub: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(wx.pageScrollTo);
    http({ s: "images.getimages", status: 6 }, "POST").then(res => {
      console.log(res)
      that.setData({
        modelList: res.data.data
      })
    })
    http({ s: "user.upduser", id: app.globalData.userId }).then(res => {
      console.log(res)
      that.setData({
        invite: res.data.data.invite
      })
    })
  },
  toIndex() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  inp(e) {
    var that = this
    console.log(e)
    var reg = /[^(A-Z|0-9)]/
    console.log(reg.test(e.detail.value))
    if (reg.test(e.detail.value)) {
      that.setData({
        isSub: false
      })
    } else {
      that.setData({
        isSub: true
      })
    }
    that.setData({
      value: e.detail.value
    })

  },
  jihuo() {
    var that = this
    if (that.data.isSub == true) {
      http({ s: "user.write_invite", id: app.globalData.userId, invite: that.data.value }).then(res => {
        if (res.data.ret == 421) {
          $Message({
            content: '你填写的邀请码不存在，请核对后填写',
            type: 'warning'
          });
          that.setData({
            value: ""
          })
        }
        if (res.data.ret == 200) {
          $Message({
            content: '邀请成功,请注意查收卡劵',
            type: 'success'
          });
          that.setData({
            value: ""
          })
        }
        if (res.data.ret == 420) {
          $Message({
            content: '你已经邀请过了',
            type: 'warning'
          });
          that.setData({
            value: ""
          })
        }
        if (res.data.ret == 418) {
          $Message({
            content: '邀请码激活失败，请重新尝试',
            type: 'warning'
          });
          that.setData({
            value: ""
          })
        }
      })
    } else {
      $Message({
        content: '输入邀请码，只能包含大写字母和数字',
        type: 'warning'
      });
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
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '你的好友向你推荐了一个很棒的洗车店，新用户激活好友邀请码可免费获得一瓶玻璃水哟！', // 转发后 所显示的title
      path: '/pages/invite_friends/invite_friends', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
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

  }
})