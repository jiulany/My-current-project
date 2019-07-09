const app = getApp()
import http from "../../utils/http.js"
Page({
  data: {
  },
  onLoad: function(options) {
    var that =this
    // this.data.postList = postsData.postList;
    var latitude = ""
    var longitude = ""
    wx.getLocation({
      success: function(res) {
        longitude = res.longitude
        latitude = res.latitude
        console.log(res)
        http({ s: "shop.getShopList_2", longitude: longitude, latitude: latitude}).then(res => {
          let a = res.data.data
          for (let i in a) {
            let b = null
            b = a[i].distance
            b = (b / 1000).toFixed(1)
            a[i].distance = b
            a[i].http = app.globalData.baseUrl
          }
          that.setData({
            posts_key: a
          })
        })
      },
    })

  },
  toCallMe(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  }
})