var app = getApp();
import http from "../../utils/http.js"
Page({
  data: {
    selected: true,
    selected1: false,
    sle: false,
    list: [],
    list_body: [],
    http: app.globalData.baseUrl,
    comp_fst: false,
    comp_snd: false,
    showModal_0: false
  },
  onLoad: function (e) {
    app.editTabbar();
    this.in_out();
    this.out_out();
    wx.showLoading({
      title: '加载中',
    })

  },
  toPay(e) {
    console.log(e)
    let that=this
    let a = e.currentTarget.dataset.itm
    let b = wx.getStorageSync("lag")
    wx.setStorageSync("setYanghuOrd", { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: a.classifyid, goodsId: a.id, goodsName: a.goodsname, longitude: b.longitude, latitude: b.latitude })
    if (wx.getStorageSync("phone") != "") {
      wx.navigateTo({
        url: '../set_order/set_order',
      })
    } else {
      that.setData({
        showModal_0: true
      })
    }
  },
  toIndex: function () {
    this.setData({
      showModal_0:false
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
            url: '../set_order/set_order',
          })
        },500)
      } else {
        that.setData({
          showModal_0: true
        })
      }
    })
  },
  out_out: function (e) {
    let _this = this
    let url = "?s=Goods.getgoods&classifyid=1&classifysid=31&isshang=1";
    return http({ s: "Goods.getgoods", classifyid: 1, classifysid: 31, isshang: 1 }, "POST").then(res => {
      let a = res.data.data
      for (let i in a) {
        a[i].sle = false
      }
      if (res.data.ret === 200) {
        _this.setData({
          list_body: a,
          comp_fst: true
        })
        wx.hideLoading()

      }
    })
  },

  in_out: function (e) {
    let _this = this
    let url = "?s=Goods.getgoods&classifyid=1&classifysid=32&isshang=1";
    return http({ s: "Goods.getgoods", classifyid: 1, classifysid: 32, isshang: 1 }, "POST").then(res => {
      let a = res.data.data
      console.log(a)
      for (let i in a) {
        a[i].sle = false
      }
      console.log(a)
      if (res.data.ret === 200) {
        _this.setData({
          list: a,
          comp_snd: true
        })
        wx.hideLoading()

      }
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
    })
  },
  switchRadio() {
    var that = this
    var a = that.data.list
    for (let i in a) {
      a[i].sle = true
    }
    that.setData({
      list: a
    })
  },
})