// pages/change_car/change_car.js
const app = getApp();
const {
  $Message
} = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ms_pp: true,
    ms_cp: true,
    ms_ys: true,
    ms_lx: true,
    isShow: true,
    openKeyBoard: false,
    cp: "",
    pingpai: "",
    colors: [{
      colorname: "加载中..."
    }],
    model_color: false,
    sele_color: {},
    xingh: ["SUV", "小轿车"],
    seleXh: "",
    model_xh: false,
    color_id: "",
    car_type: ""
  },
  sumbit() {
    var that = this
    var plateid = wx.getStorageSync('pingpai_id')
    console.log(that.data.pingpai, that.data.cp, that.data.sele_color.colorname, that.data.seleXh)
    if (that.data.pingpai == "" || that.data.cp == "" || that.data.sele_color.colorname == "" || that.data.seleXh == "") {
      $Message({
        content: '添加失败,请检查填写',
        type: 'error'
      });
    } else {
      http({ s: "Car.doupd", userid: app.globalData.userId, id: wx.getStorageSync('sele_car_id'), carnum: that.data.cp, plate: that.data.pingpai, plateid: plateid, colorid: that.data.color_id, cartype: that.data.car_type}).then(res => {
        console.log(res)
        if (res.data.ret == 200) {
          $Message({
            content: '修改成功',
            type: 'success'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_car/my_car',
            })
          }, 1500)
        } else {
          $Message({
            content: '添加失败',
            type: 'error'
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (wx.getStorageSync('sel_sc') == "0") {
      http({ s: "Car.updcar", id: wx.getStorageSync('sele_car_id') }).then(res => {
        wx.setStorageSync('pingpai_id', res.data.data.plateid)
        let a = {}
        a.colorname = res.data.data.colorname
        a.colorid = res.data.data.colorid
        that.setData({
          pingpai: res.data.data.plate,
          cp: res.data.data.carnum,
          seleXh: res.data.data.cartype == 2 ? "SUV" : "小轿车",
          color_id: res.data.data.colorid,
          car_type: res.data.data.cartype,
          sele_color: a
        })
      })
    }
    if (wx.getStorageSync('sel_sc') == "1") {
      http({ s: "Car.updcar", id: wx.getStorageSync('sele_car_id') }).then(res => {
        let a = {}
        a.colorname = res.data.data.colorname
        a.colorid = res.data.data.colorid
        that.setData({
          pingpai: wx.getStorageSync('pingpai_name'),
          cp: res.data.data.carnum,
          seleXh: res.data.data.carnum == 2 ? "SUV" : "小轿车",
          color_id: res.data.data.colorid,
          car_type: res.data.data.cartype,
          sele_color: a
        })
      })
    }
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
  openKeyboard() {
    var that = this
    that.setData({
      openKeyBoard: true,
      model_color: false
    })
  },
  keyBoardValue(val) {
    var that = this
    that.setData({
      cp: val.detail
    })
  },
  closeJp() {
    var that = this
    that.setData({
      openKeyBoard: false
    })
  },
  toSelectCar() {
    wx.navigateTo({
      url: '../add_car_pingpai/add_car_pingpai',
    })
  },
  getCarColor() {
    var that = this
    that.setData({
      model_color: !that.data.model_color,
      model_xh: false,
      openKeyBoard: false
    })
    http({ s: "Color.getcolor"}).then(res => {
      console.log(res)
      that.setData({
        colors: res.data.data
      })
    })
  },
  blurModel() {
    var that = this
    that.setData({
      model_color: false,
      model_xh: false,
      openKeyBoard: false
    })
  },
  seleColor(e) {
    var that = this
    console.log(e)
    that.setData({
      sele_color: e.currentTarget.dataset.itm,
      model_color: false,
      color_id: e.currentTarget.dataset.itm.id
    })
  },
  getXh() {
    var that = this
    that.setData({
      model_color: false,
      model_xh: true,
      openKeyBoard: false
    })
  },
  seleXh(e) {
    var that = this
    var xh = e.currentTarget.dataset.itm
    var xhid = ""
    if (xh == "SUV") {
      xhid = 2
    }
    if (xh == "小轿车") {
      xhid = 1
    }
    that.setData({
      seleXh: e.currentTarget.dataset.itm,
      model_xh: false,
      car_type: xhid
    })
  }
})