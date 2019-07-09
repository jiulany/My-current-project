// pages/add_car_pingpai/add_car_pingpai.js
const app = getApp();
import http from "../../utils/http.js"
Page({
  data: {
    pingpai: [],
    showRight1: false,
    modelList: [],
    prevpage: "",
    pingpai_id: ""
  },
  onChange(event) { },
  onLoad(options) {
    var that = this
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    console.log(prevpage)
    that.setData({
      prevpage: prevpage.route
    })
    wx.setStorageSync("routerPanduan", prevpage.route)
  },
  onReady() {
    wx.setStorage({
      key: "pingpai_id",
      data: ""
    })
    wx.setStorage({
      key: "pingpai_name",
      data: ""
    })
    var that = this
    let pingpai = []
    http({ s: "Car.getPlate" }).then(res => {
      pingpai = res.data.data.result
      console.log(pingpai)
      let storePingpai = new Array(26);
      const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
      words.forEach((item, index) => {
        storePingpai[index] = {
          key: item,
          list: []
        }
      })
      pingpai.forEach((item) => {
        let firstName = item.pinyin.substring(0, 1);
        let index = words.indexOf(firstName);
        storePingpai[index].list.push({
          name: item.name,
          key: firstName,
          id: item.id
        });
      })
      that.data.pingpai = storePingpai;
      that.setData({
        pingpai: that.data.pingpai
      })
    })
  },
  selePingpai(e) {
    var that = this
    that.setData({
      pingpai_id: e.currentTarget.dataset.id
    })
    http({ s: "Car.getTypeByPlate", parentid: e.currentTarget.dataset.id }).then(res => {
      console.log(res)
      that.setData({
        modelList: res.data.data
      })
    })
    that.setData({
      showRight1: !that.data.showRight1
    });
  },
  saveXh(e) {
    var that = this
    wx.setStorageSync("pingpai_id_xf", e.currentTarget.dataset.id)
    wx.setStorageSync('pingpai_id', that.data.pingpai_id)
    wx.setStorageSync('pingpai_name', e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '../add_car_pingpai_xf/add_car_pingpai_xf',
    })
    // if (that.data.prevpage == "pages/cash_car/cash_car") {
    //   wx.navigateTo({
    //     url: '../cash_car/cash_car',
    //   })
    // }
    // if (that.data.prevpage == "pages/add_car/add_car") {
    //   wx.navigateTo({
    //     url: '../add_car/add_car',
    //   })
    // }
    // if (that.data.prevpage == "pages/change_car/change_car") {
    //   wx.setStorageSync('sel_sc', "1")
    //   wx.navigateTo({
    //     url: '../change_car/change_car'
    //   })
    // }

  }
});