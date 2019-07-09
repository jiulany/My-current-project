// pages/cash_car/cash_car.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingpai: "",
    travel: "",
    now_time: "",
    year: "",
    mouth: "",
    day: "",
    people: "",
    number: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var now = new Date()
    var year = now.getFullYear()
    var mouth = now.getMonth() + 1
    var day = now.getDate()
    that.setData({
      pingpai: wx.getStorageSync('pingpai_name'),
      now_time: year + "-" + mouth + "-" + day,
      year: year,
      mouth: mouth,
      day: day
    })

  },
  toUpRecord(){
wx.navigateTo({
  url: '../sumbit_records/sumbit_records',
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
  toSelectCar() {
    wx.navigateTo({
      url: '../add_car_pingpai/add_car_pingpai',
    })
  },
  inputKm(e) {
    var that = this
    that.setData({
      travel: e.detail.value
    })
  },
  inputNum(e) {
    var that = this
    that.setData({
      number: e.detail.value
    })
  },
  inputPep(e) {
    var that = this
    that.setData({
      people: e.detail.value
    })
  },
  bindDateChange(e) {
    var that = this
    let a = e.detail.value.split("-")
    that.setData({
      year: a[0],
      mouth: parseInt(a[1]),
      day: parseInt(a[2]),
    })
  },
  sumbit() {
    var that = this
    if (that.data.pingpai != "") {
      if (that.data.travel != "") {
        var reg = /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/
        if (reg.test(that.data.people)) {
          var reg_0 = /^[1]([3-9])[0-9]{9}$/
          if (reg_0.test(that.data.number)) {
            http({ s: "Car.recover", user_id: app.globalData.userId ,plate: that.data.pingpai, mileage: that.data.travel, date: that.data.year + '-' + that.data.mouth + '-' + that.data.day, owner: that.data.people, phone: that.data.number}).then(res => {
              if (res.data.ret == 200) {
                $Toast({
                  content: '提交成功',
                  type: 'success'
                });
                $Message({
                  content: res.data.data,
                  duration: 5
                });
                that.setData({
                  pingpai: "",
                  travel: "",
                  people: "",
                  number: ""
                })
                wx.setStorageSync('pingpai_id', "")
                wx.setStorageSync('pingpai_name', "")
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1500)
              }
            })

          } else {
            $Toast({
              content: '请输入正确电话号码',
              type: 'warning'
            });
          }
        } else {
          $Toast({
            content: '请输入正确姓名',
            type: 'warning'
          });
        }
      } else {
        $Toast({
          content: '请填写行驶公里数',
          type: 'warning'
        });
      }
    } else {
      $Toast({
        content: '请选择汽车品牌',
        type: 'warning'
      });
    }
  }
})