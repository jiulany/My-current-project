var app = getApp();
import http from "../../utils/http.js"
Page({
  data: {
    selected: true,
    selected1: false,
    sle: false,
    must_car: [],
    choose_car: [],
    http: app.globalData.baseUrl,
    comp_ban: false,
    comp_sle: false
  },
  onLoad: function(e) {
    app.editTabbar();
    this.banner();
    this.must_car();
    this.choose_car();
    wx.showLoading({
      title: '加载中',
    })
  },

  choose_car: function(e) {
    var that = this;
    http({ s: "Goods.getgoods", classifyid: 3, classifysid: 23, isshang:1},"POST").then(res => {
      console.log("success");
      if (res.data.ret === 200) {
        that.setData({
          choose_car: res.data.data,
          comp_sle: true
        })
        wx.hideLoading()
      }
    })
  },

  chooseCar: function (event) {
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + postId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  mustCar: function(event) {
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + postId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  must_car: function(e) {
    var that = this;
    http({ s: "Goods.getgoods", classifyid: 3, classifysid: 22, isshang:1}).then(res => {
      console.log(res);
      if (res.data.ret === 200) {
        that.setData({
          must_car: res.data.data,
          comp_ban: true
        })
        wx.hideLoading()
      }
    })
  },

  selected: function(e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function(e) {
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
  banner: function(e) {
    let _this = this
    let url = "?s=images.getimages&status=3";
    return http({ s: "images.getimages", status: 3}).then(res => {
      if (res.data.ret === 200) {
        _this.setData({
          bannerIndex: res.data.data
        })

      }
    })
  },
  onSwiperTap: function (event) {
    console.log(event)
    var idx = event.currentTarget.dataset.index;
        wx.navigateTo({
          url: event.currentTarget.dataset.itm.url,
        })
    // switch (idx) {
    //   case 2:
    //     wx.navigateTo({
    //       url: '/pages/my_recharge/my_recharge',
    //     })
    //     break*/
    // }
  },

})