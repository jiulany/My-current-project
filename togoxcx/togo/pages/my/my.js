// pages/my/my.js
const app = getApp();
import http from "../../utils/http.js";
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_car: {
      carnum: "",
      cartype: "",
      colorname: "",
      balance: "",
      phone: "",
      points: "",
      jiaob: {}
    },
    showMod: false,
    inp_num: "",
    yzm: "",
    djz_end: true,
    djs: 60,
    showModal_0:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (wx.getStorageSync("phone") != "") {
      var a = wx.getStorageSync("phone")
      var b = a.substr(3, 4)
      var c = a.replace(b, "****")
      that.setData({
        phone: c
      })
    } else {
      that.setData({
        phone: "未授权登陆",
        showModal_0: true
      })
    }
    app.editTabbar();
    http({ s: "Car.defaultcar", userid: app.globalData.userId }).then(res => {
      if (res.data.ret == 200) {
        that.setData({
          default_car: res.data.data
        })
      }
    })
    http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
      console.log(res)
      that.setData({
        balance: res.data.data.balance,
        points: res.data.data.points
      })
    })
  },
  getPhoneNumber: function (e) {
    let that=this
    app.getPhoneNumber(e).then(res=>{
      if (wx.getStorageSync("phone") != "") {
        var a = wx.getStorageSync("phone")
        var b = a.substr(3, 4)
        var c = a.replace(b, "****")
        that.setData({
          phone: c
        })
        setTimeout(function () {
          that.setData({
            showModal_0: false
          })
        }, 800)
      } else {
        that.setData({
          phone: "未授权登陆",
          showModal_0: true
        })
      }
    })
  },
  toIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  closeModel() {
    this.setData({
      showMod: false
    })
  },
  openModel() {
    this.setData({
      showMod: true
    })
  },
  inpNum(e) {
    this.setData({
      inp_num: e.detail.value
    })
  },
  inpYzm(e) {
    this.setData({
      yzm: e.detail.value
    })
  },
  sendYzm() {
    let that = this
    if (that.data.inp_num.length == 11) {
      http({ s: "dx.sendDx", phone: that.data.inp_num }).then(res => {
        console.log(res)
        if (res.data.ret == 200) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            djz_end: false
          })
          var djs_jsq = setInterval(function () {
            if (that.data.djs == 0) {
              clearInterval(djs_jsq)
              that.setData({
                djz_end: true,
                djs: 60
              })
            } else {
              that.setData({
                djs: that.data.djs - 1
              })
            }
          }, 1000)
        } else {
          wx.showToast({
            title: '发送失败',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请检查输入',
        icon: 'none',
        duration: 2000
      })
    }

  },
  okSure() {
    let that = this
    console.log(that.data.yzm, that.data.inp_num)
    http({ s: "Wxmini.gzhDataMigrate", phone: that.data.inp_num, userId: app.globalData.userId, captcha: that.data.yzm }).then(res => {
      if (res.data.ret == 200) {
        if (res.data.data =="数据迁移成功"){
          wx.showToast({
            title: '同步成功',
            icon: 'success',
            duration: 3000
          })
          http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
            console.log(res)
            that.setData({
              balance: res.data.data.balance,
              points: res.data.data.points
            })
          })
          http({ s: "Car.defaultcar", userid: app.globalData.userId }).then(res => {
            if (res.data.ret == 200) {
              that.setData({
                default_car: res.data.data
              })
            }
          })
          setTimeout(function(){
            that.setData({
              showMod: false
            })
          },2000)      
        }else{
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 3000
          })
        }
        that.setData({
          inp_num:"",
          yzm:"",
          djz_end:true
        })
        setTimeout(function () {
          that.setData({
            showMod: false
          })
        }, 3000) 
      } else {
        let a=res.data.msg
        a=a.replace("非法请求：","")
        wx.showToast({
          title: a,
          icon: 'none',
          duration: 3000
        })
        that.setData({
          inp_num: "",
          yzm: ""
        })
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
    var that = this
    console.log("12")
    app.editTabbar();
    if (wx.getStorageSync("phone") != "") {
      var a = wx.getStorageSync("phone")
      var b = a.substr(3, 4)
      var c = a.replace(b, "****")
      that.setData({
        phone: c
      })
    } else {
      that.setData({
        phone: "未授权登陆",
        showModal_0: true
      })
    }
    http({ s: "Car.defaultcar", userid: app.globalData.userId }).then(res => {
      that.setData({
        default_car: res.data.data
      })
    })
    http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
      that.setData({
        balance: res.data.data.balance,
        points: res.data.data.points
      })
    })
    http({ s: "Order.getNewNum", userid: app.globalData.userId }).then(res => {
      console.log(res)
      that.setData({
        jiaob: res.data.data
      })
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

  record: function () {
    this.handleDefault();
  },

  // $Message提醒
  handleDefault() {
    $Message({
      content: '敬请期待！',
      type: 'warning'
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toMycar() {
    wx.navigateTo({
      url: '../my_car/my_car',
    })
  },
  toMyInfo() {
    wx.navigateTo({
      url: '../my_info/my_info',
    })
  },
  toAboutUs() {
    wx.navigateTo({
      url: '../about_us/about_us',
    })
  },
  toAddCar() {
    wx.navigateTo({
      url: '../add_car/add_car'
    })
  },
  toWaitPay() {
    wx.navigateTo({
      url: '../my_order/my_order?act=1',
    })
  },
  toWaitUse() {
    wx.navigateTo({
      url: '../my_order/my_order?act=2',
    })
  },
  toOverOrd() {
    wx.navigateTo({
      url: '../my_order/my_order?act=3',
    })
  }
  ,
  toAllOrd() {
    wx.navigateTo({
      url: '../my_order/my_order?act=0',
    })
  },
  toMyBalance() {
    wx.navigateTo({
      url: '../my_balance/my_balance',
    })
  },
  toMyRecharge() {
    wx.navigateTo({
      url: '../my_recharge/my_recharge',
    })
  },
  toInte() {
    wx.navigateTo({
      url: '../my_integral/my_integral',
    })
  },
  toCoupon() {
    wx.navigateTo({
      url: '../my_coupon/my_coupon',
    })
  },
  toStopCar() {
    wx.navigateTo({
      url: '../my_stopcar/my_stopcar',
    })
  }
})