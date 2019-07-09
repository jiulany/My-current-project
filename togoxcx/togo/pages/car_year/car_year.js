// pages/car_year/car_year.js

var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
import http from "../../utils/http.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[],
    http: app.globalData.baseUrl,
    id:'' ,
    comp_fst:false,
    showModal_0: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let id = options.id;
    this.setData({
      id:id
    })
    // wx.setNavigationBarTitle({ title: options.id})  
    this.details(id);
  
  },

  details: function (id) {
    console.log("success")
    var that = this;
    var url = app.globalData.baseUrl;
    http({ s: "Goods.updgoods", id: id}, "POST").then(res => {
      console.log(res);
      if (res.data.ret === 200) {
        let details = Object.assign({}, res.data.data)
        WxParse.wxParse('article', 'html', details.jianjie, that, 5);
        let a = wx.getStorageSync("setYanghuOrd")
        let b ={}
        if(a){
          a.shopId = res.data.data.shopid
          wx.setStorageSync("setYanghuOrd", a)
        }else{
          b.shopId=wx.getStorageSync("shop").id
          wx.setStorageSync("setYanghuOrd",b)
        }
        that.setData({
          details: details,
          comp_fst: true
        })
        wx.hideLoading()
        wx.setNavigationBarTitle({
          title: "小轿车" + details.goodsname,
        })
      }
    })
  },

  toBbuy:function(){
    let that=this
    const id = this.data.id
    const userId = wx.getStorageSync('userId')
    let d = wx.getStorageSync("lag")
    const shop = wx.getStorageSync('setYanghuOrd')
    const shopid= shop.shopId
    wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: shopid, classifyId: 5, goodsId: id, goodsName: this.data.details.goodsname, longitude: d.longitude, latitude: d.latitude })
    // wx.setStorageSync('setYanghuOrd', `&userid=${userId}&shopid=${shopid}&classifyid=5&goodsid=${id}`)
    if (wx.getStorageSync("phone") != "") {
      wx.navigateTo({
        url: '/pages/order-welfare/order-welfare',
      })
    } else {
      that.setData({
        showModal_0: true
      })
    }
  },
  toIndex: function () {
    this.setData({
      showModal_0: false
    })
  },
  getPhoneNumber: function (e) {
    let that = this
    app.getPhoneNumber(e).then(res => {
      if (wx.getStorageSync("phone") != "") {
        that.setData({
          showModal_0: false
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/order-welfare/order-welfare',
          })
        }, 500)
      } else {
        that.setData({
          showModal_0: true
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