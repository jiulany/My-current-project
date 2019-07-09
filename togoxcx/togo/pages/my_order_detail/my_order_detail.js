// pages/my_order_detail/my_order_detail.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_blur: false,
    item:{},
    visible1: false,
    visible2: false,
    visible3: false,
    actions1: [
      {
        name: "取消"
      },
      {
        name: "确定",
        color: "#fdd000"
      }
    ],
    dele_ord: "",
    pay_ord: {},
    http:app.globalData.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    http({ s: "Order.getOrderContent", ordernum: wx.getStorageSync("order_detail") }).then(res => {//获取订单详情
      that.setData({
        item: res.data.data
      })
    })
  },
  fzOrd(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.ord,
      success(res) {
        $Message({
          content: '复制成功',
          type: 'success'
        });
      }
    })
  },
  cancelOrd(e) {//取消订单
    console.log(e)
    this.setData({
      dele_ord: e.currentTarget.dataset.itm.ordernum,
      visible1: true
    })

  },
  sureDele(e) {
    console.log(e)
    var that = this
    if (e.detail.index == 0) {
      that.setData({
        visible1: false
      })
    }
    if (e.detail.index == 1) {
      http({ s: "Order.delorder", ordernum: that.data.dele_ord }).then(res => {//默认车辆
        console.log(res)
        if (res.data.ret == 200) {
          $Message({
            content: '删除成功',
            type: 'success',
            duration: 3
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          $Message({
            content: '删除失败',
            type: 'error'
          });
        }
        that.setData({
          visible1: false
        })
      })
    }
  },
  topay(e) {
    var that = this
    that.setData({
      pay_ord: e.currentTarget.dataset.itm
    })
    wx.showActionSheet({
      itemList: ['余额支付', '微信支付'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          that.balancePay()
        }
        if (res.tapIndex == 1) {
          that.wxPay()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  balancePay() {
    var that = this
    http({ s: "pay.is_payment", userid: app.globalData.userId }).then(res => { //查询支付方式
      if (res.data.data == 1) {
        that.setData({
          visible2: true
        })
      }
      if (res.data.data == 0) {
        that.setData({
          visible3: true
        })
      }
    })
  },
  sureBanMiPay(e) {
    var that = this
    console.log(e, that.data.pay_psw)
    if (e.detail.index == 0) {
      that.setData({
        visible3: false
      })
    }
    if (e.detail.index == 1) {
      http({ s: "pay.validate", id: app.globalData.userId, ordernum: that.data.pay_ord.ordernum, paypwd: that.data.pay_psw }).then(res => {//余额密码支付
        console.log(res)
        if (res.data.ret == 429) {
          $Message({
            content: '支付密码错误',
            type: 'error'
          });
        }
        if (res.data.ret == 428) {
          $Message({
            content: '支付失败,余额不足,请前往充值',
            type: 'warning'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1500)
        }
        if (res.data.ret == 200) {
          $Message({
            content: '支付成功',
            type: 'success'
          });
          that.setData({
            visible3: false,
            pay_psw: ""
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    }
  },
  inp_psw(e) {
    var that = this
    var a = e.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      pay_psw: b
    })
  },
  sureBanPay(e) {
    var that = this
    console.log(e)
    if (e.detail.index == 1) {
      http({ s: "pay.payment", id: app.globalData.userId, ordernum: that.data.pay_ord.ordernum }).then(res => {//免密支付
        if (res.data.ret == 200) {
          $Message({
            content: '支付成功',
            type: 'success'
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else if (res.data.ret == 428) {
          $Message({
            content: '支付失败,余额不足,请前往充值',
            type: 'warning'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1500)
        } else {
          $Message({
            content: '支付失败',
            type: 'warning'
          });
        }
        that.setData({
          visible2: false
        })
      })
    }
    if (e.detail.index == 0) {
      that.setData({
        visible2: false
      })
    }
  },
  wxPay() {
    var that = this
    http({ s: "Order.createWechatOrder", ordernum: that.data.pay_ord.ordernum }, "POST").then(res => {
      var a = JSON.parse(res.data.data)
      wx.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
          that.setData({
            chooseSize1: false
          })
          $Message({
            content: '支付成功',
            type: 'success'
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        },
        fail(res) {
          $Message({
            content: '支付失败',
            type: 'error'
          });
        }
      })
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

  },
  openCard() {
    var that = this
    that.setData({
      card_blur: true
    })
  },
  closeCard() {
    var that = this
    that.setData({
      card_blur: false
    })
  }
})