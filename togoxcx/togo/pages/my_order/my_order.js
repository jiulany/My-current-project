const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({
  data: {
    currentTab: 0,
    alllist: [],
    waitlist: [],
    waituselist: [],
    overlist: [],
    http:app.globalData.baseUrl,
    allact: false,
    waitact: false,
    waituseact: false,
    overact: false,
    all_loading: false,
    all_noms: false,
    wait_loading: false,
    wait_noms: false,
    use_loading: false,
    use_noms: false,
    over_loading: false,
    over_noms: false,
    cur_all: 1,
    cur_wait: 1,
    cur_use: 1,
    cur_over: 1,
    visible1: false,
    visible2: false,
    visible3: false,
    pay_psw:"",
    actions1: [
      {
        name: "取消"
      },
      {
        name: "确定",
        color: "#fdd000"
      }
    ],
    dele_ord: "",
    pay_ord: {}
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      currentTab: options.act,
      all_loading: true,
      all_noms: false,
    })
    if (options.act == 0) {
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 0, page: 0, limit:10}).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            all_noms: true,
            all_loading: false,
            allact: true
          })
        } else {
          that.setData({
            alllist: res.data.data,
            allact: true,
            all_loading: false
          })
        }
      })
    }
  },
  loadingAll(e) {
    var that = this
    if (that.data.cur_all != that.data.alllist.length) {
      that.setData({
        all_loading: true,
        all_noms: false,
        cur_all: that.data.alllist.length
      })
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 0, page: that.data.alllist.length, limit: 10}).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            all_noms: true,
            all_loading: false
          })
        } else {
          var a = res.data.data
          var b = that.data.alllist
          var c = b.concat(a)
          that.setData({
            all_loading: false,
            alllist: c
          })
        }
      })
    }
  },
  loadingWait() {
    var that = this
    if (that.data.cur_wait != that.data.waitlist.length) {
      that.setData({
        wait_loading: true,
        wait_noms: false,
        cur_wait: that.data.waitlist.length
      })
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 1, page: that.data.waitlist.length, limit:10}).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            wait_noms: true,
            wait_loading: false
          })
        } else {
          var a = res.data.data
          var b = that.data.waitlist
          var c = b.concat(a)
          that.setData({
            wait_loading: false,
            waitlist: c
          })
        }
      })
    }
  },
  loadingUse() {
    var that = this
    if (that.data.cur_use != that.data.waituselist.length) {
      that.setData({
        use_loading: true,
        use_noms: false,
        cur_use: that.data.waituselist.length
      })
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 2, page: that.data.waituselist.length, limit:10 }).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            use_noms: true,
            use_loading: false
          })
        } else {
          var a = res.data.data
          var b = that.data.waituselist
          var c = b.concat(a)
          that.setData({
            use_loading: false,
            waituselist: c
          })
        }
      })
    }
  },
  loadingOver() {
    var that = this
    if (that.data.cur_over != that.data.overlist.length) {
      that.setData({
        over_loading: true,
        over_noms: false,
        cur_over: that.data.overlist.length
      })
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 3, page: that.data.overlist.length, limit:10 }).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            over_noms: true,
            over_loading: false
          })
        } else {
          var a = res.data.data
          var b = that.data.overlist
          var c = b.concat(a)
          that.setData({
            over_loading: false,
            overlist: c
          })
        }
      })
    }
  },
  toOrderDetail(e) {
    console.log(e.currentTarget.dataset.itm.ordernum)
    wx.setStorageSync("order_detail", e.currentTarget.dataset.itm.ordernum)
    wx.navigateTo({
      url: '../my_order_detail/my_order_detail',
    })
  },
  cancelOrd(e) {//取消订单
    console.log(e)
    this.setData({
      dele_ord: e.currentTarget.dataset.itm.ordernum,
      visible1: true
    })

  },
  sureDele(e) {
    console.log(e)
    var that = this
    if (e.detail.index == 0) {
      that.setData({
        visible1: false
      })
    }
    if (e.detail.index == 1) {
      http({ s: "Order.delorder", ordernum: that.data.dele_ord}).then(res => {
        console.log(res)
        if (res.data.ret == 200) {
          $Message({
            content: '删除成功',
            type: 'success',
            duration: 3
          });
          that.updOrd()
        } else {
          $Message({
            content: '删除失败',
            type: 'error'
          });
        }
        that.setData({
          visible1: false
        })
      })
    }

  },
  updOrd() {
    var that = this
    if (that.data.currentTab == 0) {
      http({ s: "Order.getorder", userid: app.globalData.userId, type: 0, page: 0, limit:10 }).then(res => {
        if (res.data.ret == 422) {
          that.setData({
            all_noms: true,
            all_loading: false,
            alllist: []
          })
        } else {
          that.setData({
            alllist: res.data.data,
            allact: true,
            all_loading: false
          })
        }
      })
    }
    if (that.data.currentTab == 1) {
      http({ s: "Order.getorder", userid: app.globalData.userId,type: 1, page: 0, limit: 10 }).then(res => {
        console.log(res)
        if (res.data.ret == 422) {
          that.setData({
            wait_noms: true,
            wait_loading: false,
            waitlist: []
          })
        } else {
          that.setData({
            waitlist: res.data.data,
            waitact: true,
            wait_loading: false
          })
        }
      })
    }
  },
  topay(e) {
    var that = this
    that.setData({
      pay_ord: e.currentTarget.dataset.itm
    })
    if (parseFloat(e.currentTarget.dataset.itm.zongprice)==0){
      wx.showActionSheet({
        itemList: ['余额支付'],
        success(res) {
          if (res.tapIndex == 0) {
            that.balancePay()
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }else{
      wx.showActionSheet({
        itemList: ['余额支付', '微信支付'],
        success(res) {
          if (res.tapIndex == 0) {
            that.balancePay()
          }
          if (res.tapIndex == 1) {
            that.wxPay()
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }
    
  },
  balancePay() {
    var that = this
    http({ s: "pay.is_payment", userid: app.globalData.userId }).then(res => {
      if (res.data.data == 1) {
        that.setData({
          visible2: true
        })
      }
      if (res.data.data == 0) {
        that.setData({
          visible3: true
        })
      }
    })
  },
  sureBanMiPay(e){
    var that=this
    console.log(e, that.data.pay_psw)
    if(e.detail.index==0){
      that.setData({
        visible3: false
      })
    }
    if (e.detail.index == 1) {//余额密码支付
      http({ s: "pay.validate", id: app.globalData.userId, ordernum: that.data.pay_ord.ordernum, paypwd: that.data.pay_psw}).then(res => {
        console.log(res)
        if (res.data.ret == 429) {
          $Message({
            content: '支付密码错误',
            type: 'error'
          });
        }
        if (res.data.ret == 428) {
          $Message({
            content: '支付失败,余额不足,请前往充值',
            type: 'warning'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1500)
        }
        if (res.data.ret == 438) {
          $Message({
            content: '支付失败,无效卡券',
            type: 'warning'
          });
          that.setData({
            visible3: false,
            pay_psw: ""
          })
        }
        if (res.data.ret == 200) {
          $Message({
            content: '支付成功',
            type: 'success'
          });
          that.updOrd()
          that.setData({
            visible3: false,
            pay_psw: ""
          })
        }
      }) 
    }
  },
  inp_psw(e){
    var that = this
    var a = e.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      pay_psw: b
    })
  },
  sureBanPay(e) {
    var that = this
    console.log(e)
    if (e.detail.index == 1) {
      http({ s: "pay.payment", id: app.globalData.userId, ordernum: that.data.pay_ord.ordernum }).then(res => {//免密支付
        if (res.data.ret == 200) {
          $Message({
            content: '支付成功',
            type: 'success'
          });
          that.updOrd()
        } else if (res.data.ret == 428) {
          $Message({
            content: '支付失败,余额不足,请前往充值',
            type: 'warning'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1500)
        } else {
          $Message({
            content: '支付失败',
            type: 'warning'
          });
        }
        that.setData({
          visible2: false
        })
      })
    }
    if (e.detail.index == 0) {
      that.setData({
        visible2: false
      })
    }
  },
  wxPay() {
    var that = this
    http({ s: "Order.createWechatOrder", ordernum: that.data.pay_ord.ordernum }, "POST").then(res => {
      console.log(res)
      var a = JSON.parse(res.data.data)
      wx.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
          that.setData({
            chooseSize1: false
          })
          $Message({
            content: '支付成功',
            type: 'success'
          });
          that.updOrd()
        },
        fail(res) {
          $Message({
            content: '支付失败',
            type: 'error'
          });
        }
      })
    })
  },
  swiperTab(e) {
    var that = this
    console.log(e)
    that.setData({
      currentTab: e.detail.current
    })
    if (e.detail.current == 0) {
      if (that.data.allact == false) {
        http({ s: "Order.getorder", userid: app.globalData.userId, type: 0, page: 0, limit: 10 }).then(res => { //已完成
          console.log(res)
          if (res.data.ret == 422) {
            that.setData({
              all_noms: true,
              all_loading: false,
              allact: true
            })
          } else {
            that.setData({
              alllist: res.data.data,
              allact: true,
              all_loading: false
            })
          }
        })
      }
    }
    if (e.detail.current == 1) {
      if (that.data.waitact == false) {
        that.setData({
          wait_loading: true,
          wait_noms: false,
        })
        http({ s: "Order.getorder", userid: app.globalData.userId,type:1,page:0,limit:10}).then(res => {
          console.log(res)
          if (res.data.ret == 422) {
            that.setData({
              wait_noms: true,
              wait_loading: false,
              waitact: true
            })
          } else {
            that.setData({
              waitlist: res.data.data,
              waitact: true,
              wait_loading: false
            })
          }
        })
      }
    }
    if (e.detail.current == 2) {
      if (that.data.waituseact == false) {
        that.setData({
          use_loading: true,
          use_noms: false,
        })
        http({ s: "Order.getorder", userid: app.globalData.userId,type:2,page:0,limit:10 }).then(res => {
          console.log(res)
          if (res.data.ret == 422) {
            that.setData({
              use_noms: true,
              use_loading: false,
              waituseact: true
            })
          } else {
            that.setData({
              waituselist: res.data.data,
              waituseact: true,
              use_loading: false
            })
          }
        })
      }
    }
    if (e.detail.current == 3) {
      if (that.data.overact == false) {
        that.setData({
          over_loading: true,
          over_noms: false,
        })
        http({ s: "Order.getorder", userid: app.globalData.userId, type:3,page:0,limit:10 }).then(res => {
          console.log(res)
          if (res.data.ret == 422) {
            that.setData({
              over_noms: true,
              over_loading: false,
              overact: true
            })
          } else {
            that.setData({
              overlist: res.data.data,
              overact: true,
              over_loading: false
            })
          }
        })
      }
    }
  },
  clickTab(e) {
    var that = this
    console.log(e)
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },
  onShow(){
    this.updOrd()
  },
  onUnload: function () {
    let pages = getCurrentPages(); //当前页面栈
    //当前页面为页面栈的最后一个元素
    let prevPage = pages[pages.length - 1];//当前页面
    console.log(11111111)
    console.log(pages)
    console.log(prevPage)
    console.log(getCurrentPages().length)
    // 脱狗养护
    if (getCurrentPages().length == 4) {
      if (pages[1].route=="pages/yanghu/yanghu"){
        wx.navigateBack({
          delta: 1
        })
      }
      else if (pages[1].route == "pages/first_aid/first_aid"){
        wx.navigateBack({
          delta: 1
        })
      }
      else{
        wx.navigateBack({
          delta: 3
        })
      }
      
    }
    // 车友福利
    if (getCurrentPages().length == 5) {
      wx.navigateBack({
        delta: 2
      })
    }
    // 洗车
    if (getCurrentPages().length == 3) {
      wx.navigateBack({
        delta:3
      })
    }
  },
})