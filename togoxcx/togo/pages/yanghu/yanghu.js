var app = getApp();
import http from "../../utils/http.js"
Page({
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    allSelect: false,
    maintain: [],
    cosmetology: [],
    repair: [],
    conutPrice: "0.00", // 总价格
    http: app.globalData.baseUrl,
    comp_fst: false,
    comp_snd: false,
    comp_trd: false,
    showModal_0: false
  },
  onLoad: function (options) {
    console.log(options)
    if (options.la==1){
      this.setData({
        selected: false,
        selected1: false,
        selected2: true
      })
    }
    // 保养
    this.maintain()
    // 美容
    this.cosmetology()
    // 维修
    this.repair()
    wx.showLoading({
      title: '加载中',
    })
  },
  // 保养
  maintain: function (e) {
    let _this = this
    let url = "?s=Goods.getgoods&classifyid=7";
    return http({ s: "Goods.getgoods", classifyid: 7, isshang: 1 }, "POST").then(res => {
      let a = res.data.data
      for (let i in a) {
        a[i].sle = false
      }
      if (res.data.ret === 200) {
        _this.setData({
          maintain: a,
          comp_fst: true
        })
        wx.hideLoading()
      }
    })
  },
  // 美容
  cosmetology: function (e) {
    let _this = this
    let url = "?s=Goods.getgoods&classifyid=2";
    return http({ s: "Goods.getgoods", classifyid: 2, isshang: 1 }, "POST").then(res => {
      let a = res.data.data
      for (let i in a) {
        a[i].sle = false
      }
      if (res.data.ret === 200) {
        _this.setData({
          cosmetology: a,
          comp_snd: true
        })
        wx.hideLoading()
      }
    })
  },
  // 维修
  repair: function (e) {
    let _this = this
    let url = "?s=Goods.getgoods&classifyid=8";
    http({ s: "Goods.getgoods", classifyid: 8, isshang: 1 }, "POST").then(res => {
      let a = res.data.data
      for (let i in a) {
        a[i].sle = false
      }
      if (res.data.ret === 200) {
        _this.setData({
          repair: a,
          comp_trd: true
        })
        wx.hideLoading()
      }
    })
  },
  selected: function (e) {
    // 美容
    this.setData({
      selected2: false,
      selected1: false,
      selected: true
    })
    this.getselected(1, this.data.maintain)
  },

  // 保养
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
    })
    this.getselected(2, this.data.cosmetology)
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected1: false,
    })

    this.getselected(3, this.data.repair)
  },
  // 计算被选状态
  getselected(type, a) {
    let conutPrice = 0.00;
    let sumNum = 0 // 定义选择条数
    let allSelected = false
    var that = this
    var totalNumber = 0
    switch (type) {
      case 1:
        var a = ''
        a = that.data.cosmetology
        totalNumber = that.data.cosmetology.length
        break;
      case 2:
        var a = ''
        a = that.data.maintain
        totalNumber = that.data.maintain.length
        break;
      case 3:
        var a = ''
        a = that.data.repair
        totalNumber = that.data.repair.length
        break;
    }

    // 计算总金额
    for (let key in a) {
      if (a[key].sle === true) {
        // 如果被选择则加1
        sumNum++
        if (parseFloat(a[key].price)) {
          conutPrice = conutPrice + parseFloat(a[key].price)
        }
      }
    }
    // 判断选择的条数是否等于总条数
    if (sumNum === totalNumber && totalNumber != 0) {
      allSelected = true
    } else {
      allSelected = false
    }
    switch (type) {
      case 1:
        that.setData({
          cosmetology: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
      case 2:
        that.setData({
          maintain: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
      case 3:
        that.setData({
          repair: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
    }

  },
  switchRadio(e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    // 根据 type 判断 养护类型
    var that = this

    var totalNumber = ''
    switch (type) {
      case '1':
        var a = ''
        a = that.data.cosmetology
        totalNumber = that.data.cosmetology.length
        break;
      case '2':
        var a = ''
        a = that.data.maintain
        totalNumber = that.data.maintain.length
        break;
      case '3':
        var a = ''
        a = that.data.repair
        totalNumber = that.data.repair.length
        break;
    }

    let sumNum = 0 // 定义选择条数
    let allSelected = false

    if (a[id].sle != false) {
      a[id].sle = false
    } else {
      a[id].sle = true
    }
    let conutPrice = 0.00;
    // 计算总金额
    for (let key in a) {
      if (a[key].sle === true) {
        // 如果被选择则加1
        sumNum++
        if (parseFloat(a[key].price)) {
          conutPrice = conutPrice + parseFloat(a[key].price)
        }
      }
    }
    // 判断选择的条数是否等于总条数
    if (sumNum === totalNumber) {
      allSelected = true
    } else {
      allSelected = false
    }
    // 根据 type 判断 养护类型
    switch (type) {
      case '1':
        that.setData({
          cosmetology: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
      case '2':
        that.setData({
          maintain: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
      case '3':
        that.setData({
          repair: a,
          conutPrice: conutPrice.toFixed(2),
          allSelect: allSelected
        })
        break
    }


  },
  // 计算总金额
  sumPrice(data) {
    let conutPrice = 0.00;
    // 定义 数据总数
    let a = data

    // 计算总金额
    for (let key in a) {
      if (a[key].sle === true) {
        if (parseFloat(a[key].price)) {
          conutPrice = conutPrice + parseFloat(a[key].price)
        }
      }
    }
    return conutPrice
  },
  // 子组件调用方法，全选功能
  sonAllSeleted(e) {
    console.log(e)
    let sumPrice = 0
    let allSeted = e.detail.notAll
    let type = e.detail.type
    let that = this
    let a = ''
    switch (type) {
      case '1':
        a = that.data.cosmetology
        break;
      case '2':
        a = that.data.maintain
        break;
      case '3':
        a = that.data.repair
        break;
    }

    // 如果全选则更改数据为全选
    if (allSeted === true) {
      for (let key in a) {
        a[key].sle = true
      }
      // 调用计算总金额的方法
      sumPrice = this.sumPrice(a)
    } else {
      for (let key in a) {
        a[key].sle = false
      }
    }
    switch (type) {
      case '1':
        that.setData({
          cosmetology: a,
          conutPrice: sumPrice.toFixed(2)
        })
        break
      case '2':
        that.setData({
          maintain: a,
          conutPrice: sumPrice.toFixed(2)
        })
        break
      case '3':
        that.setData({
          repair: a,
          conutPrice: sumPrice.toFixed(2)
        })
        break
    }
  },
  toIndex: function () {
    this.setData({
      showModal_0: false
    })
  },
  //获取提交类型
  commitShop(e) {
    let type = e.detail // 提交类型
    let that = this
    let a = ''
    switch (type) {
      case '1':
        a = that.data.cosmetology
        break;
      case '2':
        a = that.data.maintain
        break;
      case '3':
        a = that.data.repair
        break;
    }
    var list = ''
    list = a.filter((item, index) => {
      if (item.sle === true) {
        return item
      }
    })
    if (list.length === 0) {
      wx.showToast({
        title: '您还没有选择养护项目',
        icon: "none"

      })
      return false
    }
    let d = wx.getStorageSync("lag")
    let b = ""
    let c = ""
    for (let i in list) {
      if ((list.length - 1) == i) {
        b += list[i].id
        c += list[i].goodsname
      } else {
        b = b + list[i].id + ","
        c = c + list[i].goodsname + ","
      }
    }
    if (that.data.selected == true) {
      wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: 2, goodsId: b, goodsName: c, longitude: d.longitude, latitude: d.latitude })
      // wx.setStorageSync('setYanghuOrd', `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync('shop').id}&classifyid=${2}&goodsid=${a}`)
      if (wx.getStorageSync("phone") != "") {
        wx.navigateTo({
          url: '../set_order/set_order',
        })
      } else {
        that.setData({
          showModal_0: true
        })
      }
    }
    if (that.data.selected1 == true) {
      wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: 7, goodsId: b, goodsName: c, longitude: d.longitude, latitude: d.latitude })
      // wx.setStorageSync('setYanghuOrd', `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync('shop').id}&classifyid=${7}&goodsid=${a}`)
      if (wx.getStorageSync("phone") != "") {
        wx.navigateTo({
          url: '../set_order/set_order',
        })
      } else {
        that.setData({
          showModal_0: true
        })
      }
    }
    if (that.data.selected2 == true) {
      wx.setStorageSync('setYanghuOrd', { userId: app.globalData.userId, shopId: wx.getStorageSync('shop').id, classifyId: 8, goodsId: b, goodsName: c, longitude: d.longitude, latitude: d.latitude })
      // wx.setStorageSync('setYanghuOrd', `&userid=${app.globalData.userId}&shopid=${wx.getStorageSync('shop').id}&classifyid=${8}&goodsid=${a}`)
      if (wx.getStorageSync("phone") != "") {
        wx.navigateTo({
          url: '../set_order/set_order',
        })
      } else {
        that.setData({
          showModal_0: true
        })
      }
    }
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
        }, 500)
      } else {
        that.setData({
          showModal_0: true
        })
      }
    })
  },
})