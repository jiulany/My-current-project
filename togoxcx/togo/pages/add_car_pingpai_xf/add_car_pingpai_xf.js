// pages/add_car_pingpai_xf/add_car_pingpai_xf.js
// pages/my_car/my_car.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    http:app.globalData.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http({ s: "Car.getCarByType", parentid: wx.getStorageSync("pingpai_id_xf") }).then(res => {
      console.log(res)
      that.setData({
        list: res.data.data.list
      })
    })
  },
  sele(e){
console.log(e)
    let a = wx.getStorageSync("pingpai_name")
    let b=e.currentTarget.dataset.itm.name
    wx.setStorageSync("pingpai_name", a+" "+b)
    if (wx.getStorageSync("routerPanduan") == "pages/cash_car/cash_car") {
      wx.navigateTo({
        url: '../cash_car/cash_car',
      })
    }
    if (wx.getStorageSync("routerPanduan") == "pages/add_car/add_car") {
      wx.navigateTo({
        url: '../add_car/add_car',
      })
    }
    if (wx.getStorageSync("routerPanduan") == "pages/change_car/change_car") {
      wx.setStorageSync('sel_sc', "1")
      wx.navigateTo({
        url: '../change_car/change_car'
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

  },
  clickItm(e) {
    console.log(e)
    var that = this
    http({ s: "Car.upddefault", id: e.currentTarget.dataset.itm.id, userid: app.globalData.userId }).then(res => {
      http({ s: "Car.usercar", userid: app.globalData.userId }).then(res => {
        let a = res.data.data
        for (let i in a) {
          if (i == 0) {
            a[i].sle = true
          } else {
            a[i].sle = false
          }
        }
        that.setData({
          list: a
        })
      })
    })
  },
  change(e) {
    wx.setStorageSync('sele_car_id', e.currentTarget.dataset.itm.id)
    wx.setStorageSync('sel_sc', "0")
    wx.navigateTo({
      url: '../change_car/change_car'
    })
  },
  // onUnload: function () {
  //   let pages = getCurrentPages(); //当前页面栈
  //   // 当前页面为页面栈的最后一个元素
  //   let prevPage = pages[pages.length - 1];//当前页面
  //   console.log(11111111)
  //   console.log(pages)
  //   console.log(prevPage)
  //   // if (getCurrentPages().length == 4) {
  //   //   wx.navigateBack({
  //   //     delta: 3
  //   //   })
  //   // }
  //   // if (getCurrentPages().length == 3) {
  //   //   wx.navigateBack({
  //   //     delta: 3
  //   //   })
  //   // }
  //   let num = getCurrentPages().length
  //   console.log(num)
  //   if (num != 0) {
  //     wx.navigateBack({
  //       delta: num
  //     })
  //   }
  // },
})