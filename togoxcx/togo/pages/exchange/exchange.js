// pages/shopDetails/shopDetails.js
var app = getApp();
import http from "../../utils/http.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSize: false,
    animationData: {},
    number:1,
    account:4.90,
    details:[],
    zongprice: 4.90,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.details();
  },

  details: function (e) {
    var that = this;
    var url = app.globalData.baseUrl;
    http({ s: "Goods.getgoods", classifyid: 3, classifysid: 22, isshang:1},"POST").then(res => {
      console.log(res);
      if (res.data.ret === 200) {
        that.setData({
          details: res.data.data
        })

      }
    })
  },

  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 150,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(0).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 500)
  },

  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 50,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 500)
  },

  // 选择数量减
  jianTap:function( e ){
    var that = this;
    var number = this.data.number;
    // console.log( number );
    if( number > 1 ){
      let a = --number
      let b = (a * that.data.account).toFixed(2)
      that.setData({
        number: a ,
        zongprice: b 
      })
    }
    
  },

  // 选择数量加
  jiaTap: function (e) {
    var that = this;
    var number = this.data.number;
    // console.log( number );
    if (number >= 1) {
      let a = ++number
      let b = (a * that.data.account).toFixed(2)
      that.setData({
        number: a,
        zongprice: b
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