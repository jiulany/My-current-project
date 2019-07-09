// pages/my_car/my_car.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "AA",
    sle: true,
    list: [],
    httm: app.globalData.baseUrl,
    visible1: false,
    sle_itm: {},
    actions3: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: '#fdd000'
      }
    ],
    no_ms:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http({ s: "Car.usercar", userid: app.globalData.userId }).then(res => {
      if (res.data.data == "0") {
        that.setData({
          list: [],
          no_ms: true
        })
      } else {
        let a = res.data.data
        for (let i in a) {
          if (i == 0) {
            a[i].sle = true
          } else {
            a[i].sle = false
          }
        }
        that.setData({
          list: a,
          no_ms: false
        })
      }
    })
  },
  dele(e) {
    var that = this
    that.setData({
      visible1: true,
      sle_itm: e.currentTarget.dataset.itm
    })
  },
  toAddCar() {
    wx.navigateTo({
      url: '../add_car/add_car',
    })
  },
  deleSure(e) {
    var that = this
    if(e.detail.index==1){
      http({ s: "Car.delcar", id: that.data.sle_itm.id }).then(res => {

        if (res.data.ret == 200) {
          console.log("sssss")
          that.setData({
            visible1: false
          })
          $Message({
            content: '删除成功',
            type: 'success'
          });

        }
        http({ s: "Car.usercar", userid: app.globalData.userId }).then(res => {
          if (res.data.data == "0") {
            that.setData({
              list: [],
              no_ms: true
            })
          } else {
            let a = res.data.data
            for (let i in a) {
              if (i == 0) {
                a[i].sle = true
              } else {
                a[i].sle = false
              }
            }
            that.setData({
              list: a,
              no_ms: false
            })
          }
        })
      })
    }
    if(e.detail.index==0){
      console.log(that)
      that.setData({
        visible1: false
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
      http({ s: "Car.usercar", userid: app.globalData.userId}).then(res => {
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
  onUnload: function () {
    console.log(3)
    let pages = getCurrentPages(); //当前页面栈
    // 当前页面为页面栈的最后一个元素
    let prevPage = pages[pages.length - 1];//当前页面
    console.log(11111111)
    console.log(pages)
    console.log(prevPage)
    let num = getCurrentPages().length
    console.log(num)
    if (num != 0 && num > 2) {
      wx.navigateBack({
        delta: num
      })
    }
 
  }
})