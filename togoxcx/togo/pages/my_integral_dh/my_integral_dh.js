// pages/my_integral_dh/my_integral_dh.js
var app = getApp();
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    http: app.globalData.baseUrl,
    comp_fst:false,
    chooseSize:false,
    jfen:"",
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.list();
  },

  list:function(){
    let that = this;
    http({ s: "Card.getPrize"}, "POST").then(res => {
      console.log(res.data.data)
      if (res.data.ret === 200) {
        that.setData({
          list: res.data.data,
          comp_fst: true
        })
        wx.hideLoading()
      }
    })
  },

  // 立即购买弹框部分
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    that.setData({
      jfen: e.currentTarget.dataset.itm.points,
      item: e.currentTarget.dataset.itm
    })
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 200,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1000).step()
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
    }, 1000)
  },
  toChange(){
    var that=this
    http({ s: "Pay.exchange", id: app.globalData.userId, prizeId: that.data.item.id}).then(res => {
      console.log(res)
      if (res.data.ret == 200) {
        wx.showToast({
          title: '兑换成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          chooseSize: false
        })
      }

      if (res.data.ret == 403) {
        wx.showToast({
          title: '用户积分不足',
          icon: 'none',
          duration: 2000
        })
        // setTimeout(function () {
        //   that.hideModal()
        // }, 2000)

      }
    })
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(1000).step()
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