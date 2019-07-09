// pages/my_coupon/my_coupon.js
const app = getApp();
const { $Toast } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    all_list: [],
    use_list: [],
    nouse_list: [],
    overdue_list: [],
    all_num: false,
    use_num: false,
    nouse_num: false,
    overdue_num: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    http({ s: "card.getCardList", user_id: app.globalData.userId, state: 2}).then(res => {
      console.log(res)
      that.setData({
        nouse_list: res.data.data,
        nouse_num: true
      })
      setTimeout(function () {
        wx.hideLoading()
        if (res.data.ret == 436) {
          $Toast({
            content: "暂无数据",
            type: 'warning'
          });
        }
      }, 1000)
    })
  },
  useCar(e) {
    // wx.request({  //使用卡券
    //   url: app.globalData.baseUrl + `/?s=card.checkcard&id=${e.currentTarget.dataset.itm.id}&shopid=${wx.getStorageSync("shop").id}`, success: function (res) {
    //     if(res.data.ret==200){
    //       let a = res.data.data
    //       let b = `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync("shop").id}&classifyid=${a.classifyid}&goodsid=${a.goodsid}`
    //       wx.setStorageSync("setYanghuOrd", b)
    //       wx.navigateTo({
    //         url: '../order/order',
    //       })
    //     }
    //     if(res.data.ret==436){
    //       $Toast({
    //         content: '店铺不存在该商品',
    //         type: 'warning'
    //       });
    //     }
    //   }
    // })
    if (e.currentTarget.dataset.itm.type == 1) {
      wx.switchTab({
        url: '../market/market',
      })
    }
    if (e.currentTarget.dataset.itm.type == 2) {
      wx.switchTab({
        url: '../washCar/washCar',
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
  swiperTab(e) {
    var that = this
    if (e.detail.current == 0) {
      if (that.data.nouse_num == false) {
        wx.showLoading({
          title: '加载中',
        })
        http({ s: "card.getCardList", user_id: app.globalData.userId, state: 2 }).then(res => {
          that.setData({
            nouse_list: res.data.data,
            nouse_num: true
          })
          setTimeout(function () {
            wx.hideLoading()
            if (res.data.ret == 436) {
              $Toast({
                content: "暂无数据",
                type: 'warning'
              });
            }
          }, 1000)
        })
      }
    }
    if (e.detail.current == 1) {
      if (that.data.use_num == false) {
        wx.showLoading({
          title: '加载中',
        })
        http({ s: "card.getCardList", user_id: app.globalData.userId, state: 1}).then(res => {
          that.setData({
            use_list: res.data.data,
            use_num: true
          })
          setTimeout(function () {
            wx.hideLoading()
            if (res.data.ret == 436) {
              $Toast({
                content: "暂无数据",
                type: 'warning'
              });
            }
          }, 1000)
        })
      }
    }
    if (e.detail.current == 2) {
      if (that.data.overdue_num == false) {
        wx.showLoading({
          title: '加载中',
        })
        http({ s: "card.getCardList", user_id: app.globalData.userId, state: 3 }).then(res => {
          that.setData({
            overdue_list: res.data.data,
            overdue_num: true
          })
          setTimeout(function () {
            wx.hideLoading()
            if (res.data.ret == 436) {
              $Toast({
                content: "暂无数据",
                type: 'warning'
              });
            }
          }, 1000)
        })
      }
    }
    that.setData({
      currentTab: e.detail.current
    })
  },
  clickTab(e) {
    var that = this
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })
  }
})