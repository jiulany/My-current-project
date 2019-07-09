// pages/shopDetails/shopDetails.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
import http from "../../utils/http.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSize: false,
    animationData: {},
    number: 1,
    account: 4.90,
    details: [],
    zongprice: 4.90,
    http: app.globalData.baseUrl,
    bannerIndex: [],
    comp_fst: false,
    comp_snd: false,
    showModal_0: false,
    fromShare:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    this.details(id);
    this.banner(id)
    wx.showLoading({
      title: '加载中',
    })
  },
  toIndexd() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  toSetOrd() {
    var that = this
    let a = that.data.details
    a.goodsnum = that.data.number
    if( that.data.number == "" || that.data.number == 0 ){
      wx.showToast({
        title: '请输入购买数量',
        icon:'none',
        duration:2000
      })
    }else{
      app.globalData.goods = a
      if (wx.getStorageSync("phone") != "") {
        wx.navigateTo({
          url: '../order_shop/order_shop',
        })
      } else {
        that.setData({
          showModal_0: true
        })
      }
    }
   
  },
  details: function(id) {
    var that = this;
    var url = app.globalData.baseUrl;
    http({
      s: "Goods.updgoods",
      id: id
    }, "POST").then(res => {
      if (res.data.ret === 200) {
        let details = Object.assign({}, res.data.data)
        WxParse.wxParse('article', 'html', details.jianjie, that, 5);
        that.setData({
          details: details,
          zongprice: details.price,
          account: details.price,
          comp_snd: true
        })
        wx.hideLoading()
        wx.setNavigationBarTitle({
          title: details.goodsname,
        })

      }
    })
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
            url: '../order_shop/order_shop',
          })
        }, 500)
      } else {
        that.setData({
          showModal_0: true
        })
      }
    })
  },
  banner: function(id) {
    let _this = this;
    let url = _this.data.http + "?s=Goods.getgoodsbanner&id=" + id;
    return http({
      s: "Goods.getgoodsbanner",
      id: id
    }, "POST").then(res => {
      if (res.data.ret === 200) {
        _this.setData({
          bannerIndex: res.data.data,
          comp_fst: true
        })
        wx.hideLoading()
        // console.log(_this.data.bannerIndex)
      }
    })
  },
  inp_data(e) {
    console.log(e)
    let that=this
    if (parseInt(e.detail.value)==0){
      let b = (1 * that.data.account).toFixed(2)
      this.setData({
        number: 1,
        zongprice: b
      })
    } else if (e.detail.value== ""){
      let b = (1 * that.data.account).toFixed(2)
      this.setData({
        number: e.detail.value,
        zongprice: b
      })
    }else{
      let b=(parseInt(e.detail.value) * that.data.account).toFixed(2)
      this.setData({
        number: parseInt(e.detail.value),
        zongprice: b
      })
    }
  },
  chooseSezi: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 500)
  },

  hideModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 500)
  },

  // 选择数量减
  jianTap: function(e) {
    var that = this;
    var number = this.data.number;
    if (number > 1) {
      let a = --number
      let b = (a * that.data.account).toFixed(2)
      that.setData({
        number: a,
        zongprice: b
      })
    }

  },

  // 选择数量加
  jiaTap: function(e) {
    var that = this;
    console.log("数据是" + that.data.account)
    var number = this.data.number;
    // console.log( number );
    if (number >= 0) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
this.setData({
  fromShare: app.globalData.scene
})
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

  }
})