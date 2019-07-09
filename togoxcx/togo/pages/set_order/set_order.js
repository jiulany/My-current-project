// pages/order/order.js
const app = getApp();
const { $Toast } = require('../../dist/base/index');
import http from "../../utils/http.js"
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopType: 0,
    shopArray: [],
    chooseSize: false,
    chooseSize1: false,
    chooseSize2: false,
    animationData: {},
    animationData1: {},
    ord: {},
    addprice: "",
    maskFlag: false,
    oilchooseFla: false,
    showModal: false,
    price: true,
    userCar: [],
    wx: false,
    yhjName: '不使用优惠劵',
    yhj: true,
    http: app.globalData.baseUrl,
    ori_car: "",
    openKeyBoard: false,
    kj: [],
    ordernum: "",
    visible5: false,//免密支付確認
    actions5: [{
      name: '取消'
    },
    {
      name: '确认',
      color: '#fdd000',
      loading: false
    }
    ],
    pay_psw: "",
    visible3: false, //提示添加車輛
    isSuv: false,
    phone: "",
    index: 0,
    isWxPay: true,
    ori_car_id: "",
    balance: "",
    isNoPos: false,
    cp: "",
    sele_color: "",
    model_color: false,
    model_xh: false,
    xingh: ["SUV", "小轿车"],
    chooseSize_01:false,
    chooseSize_02:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.toShowModal()
    let d = wx.getStorageSync('setYanghuOrd')
    d.s = "order.placeOrder2"
    that.changeCar(d)
    http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
      that.setData({
        balance: res.data.data.balance
      })
    })
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if (prevpage.route == "pages/washCar/washCar" || prevpage.route == "pages/yanghu/yanghu") {
      this.hide()
    }
    if (wx.getStorageSync("phone") != "") {
      var a = wx.getStorageSync("phone")
      var b = a.substr(3, 4)
      var c = a.replace(b, "****")
      that.setData({
        phone: c
      })
    } else {
      that.setData({
        phone: "未授权登陆"
      })
    }
  },
  changeCar: function (dz) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    http(dz).then(res => {//停车记录
      wx.hideLoading()
      if (res.data.ret == 200) {
        const data = res.data.data
        const shopArray = res.data.data.getNearShop
        if (that.data.isNoPos == false) {
          if (wx.getStorageSync('shop') != "") {
            that.chooseAddress();
            that.setData({
              shopId: wx.getStorageSync("shop").id
            })
          } else {
            that.setData({
              shopAddress: res.data.data.getNearShop[0].shopname,
              shopSleId: res.data.data.getNearShop[0].id,
              shopId: res.data.data.getNearShop[0].id
            })
          }
          that.setData({
            isNoPos: true
          })
        }
        this.onShop(data)
        for (let index in shopArray) {
          shopArray[index]['sle'] = false
          shopArray[index]['jl'] = (shopArray[index].distance / 1000).toFixed(2)
        }
        that.setData({
          ord: res.data.data,
          userCar: res.data.data.userCar,
          isSuv: res.data.data.userCar[0].cartype == 2 ? true : false,
          ori_car: res.data.data.userCar[0].cartype,
          ori_car_id: res.data.data.userCar[0].id,
          shopArray: shopArray,
          cardId: res.data.data.hasCard.length == 0 ? -1 : res.data.data.hasCard[0].id,
        })
        if (res.data.data.hasCard.length == 0) {
          that.setData({
            yhj: true,
            kj: [],
            yhjName: "不使用优惠"
          })
        } else {
          let a = res.data.data.hasCard
          for (let i in a) {
            if (i == 0) {
              a[i].sle = true
            } else {
              a[i].sle = false
            }
          }
          that.setData({
            yhj: false,
            kj: a,
            yhjName: a[0].hasCard
          })
        }
      } else if (res.data.ret == 1000) {
        that.setData({
          visible3: true
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3500
        })
      }
    })
  },
  getCarColor() {
    var that = this
    that.setData({
      model_color: !that.data.model_color,
      model_xh: false,
      openKeyBoard: false
    })
    http({ s: "Color.getcolor" }).then(res => {
      console.log(res)
      that.setData({
        colors: res.data.data
      })
    })
  },
  seleColor(e) {
    var that = this
    that.setData({
      sele_color: e.currentTarget.dataset.itm,
      model_color: false,
      color_id: e.currentTarget.dataset.itm.id
    })
  },
  openKeyboard() {
    var that = this
    that.setData({
      openKeyBoard: true,
      model_color: false,
      model_xh: false,
    })
  },
  keyBoardValue(val) {
    var that = this
    that.setData({
      cp: val.detail
    })
  },
  getXh() {
    var that = this
    that.setData({
      model_color: false,
      model_xh: true,
      openKeyBoard: false
    })
  },
  seleXh(e) {
    var that = this
    var xh = e.currentTarget.dataset.itm
    var xhid = ""
    if (xh == "SUV") {
      xhid = 2
    }
    if (xh == "小轿车") {
      xhid = 1
    }
    that.setData({
      seleXh: e.currentTarget.dataset.itm,
      model_xh: false,
      car_type: xhid
    })
  },
  sumbit() {
    var that = this
    http({ s: "car.setcar", userid: app.globalData.userId, carnum: that.data.cp,colorid: that.data.color_id, cartype: that.data.car_type }).then(res => {
      if (res.data.ret == 200) {
        $Message({
          content: '添加成功',
          type: 'success'
        });
        setTimeout(function () {
          let d = wx.getStorageSync('setYanghuOrd')
          d.s = "order.placeOrder2"
          that.changeCar(d)
          that.setData({
            visible3:false
          })
        }, 1500)
      } else {
        $Message({
          content: '添加失败',
          type: 'error'
        });
      }
    })
  },
  // 判断门店
  onShop(data) {
    let shopId = ""
    if (wx.getStorageSync('shop') != "") {
      const shop = wx.getStorageSync('shop');
      shopId = shop.id
    } else {
      shopId = this.data.shopSleId
    }
    const shopDetail = data.getNearShop
    var type = 0
    for (let index in shopDetail) {
      if (shopDetail[index].id === shopId) {
        this.setData({
          shopType: 1
        })
        return
      }
    }
    if (this.data.shopType === 0) {
      wx.showToast({
        title: '当前该门店没有该服务,请切换其他门店',
        icon: 'none',
        duration: 3500
      })
      return false
    }
  },
  closeAddModl() {
    this.setData({
      visible3: false
    })
  },
  chooseAddress: function () {
    var aaa = wx.getStorageSync('shop');
    this.setData({
      shopAddress: aaa.shopname
    })
  },
  change: function () {
    wx.navigateTo({
      url: '/pages/my_car/my_car',
    })
  },
  // 切换门店
  toShop: function () {
    wx.navigateTo({
      url: '/pages/store_list/store_list',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindCarChange(e) {
    var that = this
    let a = wx.getStorageSync('setYanghuOrd')
    a.s = "order.placeOrder2"
    a.carId = that.data.ord.userCar[e.detail.value].id
    that.changeCar(a)
  },
  inp_psw(e) {
    var that = this
    var a = e.detail.value
    var reg = /[^\d]/
    var b = a.replace(reg, "")
    that.setData({
      pay_psw: b
    })
  },
  chooseAddress: function () {
    var aaa = wx.getStorageSync('shop');
    this.setData({
      shopAddress: aaa.shopname
    })
  },
  toPay() {
    var that = this
    wx.request({ //默认车辆
      url: app.globalData.baseUrl + `/?s=pay.validate&ordernum=${that.data.ord.ordernum}&paypwd=${that.data.pay_psw}&id=${app.globalData.userId}`,
      success: function (res) {
        console.log(res)
      }
    })
  },
  toShowModal: function (e) {
    this.setData({
      showModal: true

    })
  },

  hide: function (e) {
    this.setData({
      showModal: false
    });
  },
  // 立即购买弹框部分
  chooseSezi: function (e) {
    if (this.data.shopType === 0) {
      wx.showToast({
        title: '当前该门店没有该服务,请切换其他门店',
        icon: 'none',
        duration: 3500
      })
      return false
    }
    // 用that取代this，防止不必要的情况发生
    var that = this;
    if (parseFloat(that.data.ord.priceAll) == 0) {
      that.setData({
        isWxPay: false
      })
    } else {
      that.setData({
        isWxPay: true
      })
    }
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
    }, 100)
  },
  // 不适用优惠劵
  switchRadioN(e) {
    var that = this
    const yhjList = this.data.kj
    for (let index in yhjList) {
      yhjList[index].sle = false
    }
    this.setData({
      kj: yhjList,
      yhj: true,
      yhjName: "不使用优惠劵"
    })
    let a = wx.getStorageSync('setYanghuOrd')
    a.s = "order.placeOrder2"
    a.cardId = -1
    http(a).then(res => {
      if (res.data.ret == 200) {
        that.setData({
          ord: res.data.data,
          cardId: -1
        })
      }
    })
  },
  //优惠劵单选按钮
  switchRadioY(e) {
    var that = this
    let a = wx.getStorageSync('setYanghuOrd')
    a.s = "order.placeOrder2"
    a.cardId = e.currentTarget.dataset.id
    a.carId = that.data.ori_car_id
    http(a).then(res => {
      if (res.data.ret == 200) {
        that.setData({
          ord: res.data.data,
          cardId: e.currentTarget.dataset.id
        })
      }
    })
    let id = e.currentTarget.dataset.id
    const yhjList = this.data.kj
    let yhjName = ''
    if (id) {
      for (let index in yhjList) {
        yhjList[index].sle = false
        if (yhjList[index].id === id) {
          yhjList[index].sle = true
          yhjName = yhjList[index].hasCard
        }
      }
    }
    this.setData({
      kj: yhjList,
      yhj: false,
      yhjName: yhjName
    })
  },
  //门店单选按钮
  switchRadioshop(e) {
    var that=this
    let id = e.currentTarget.dataset.id
    let yhjList = this.data.shopArray
    let yhjName = ''
    for (let i in yhjList) {
      yhjList[i].sle = false
    }
    if (id) {
      for (let index in yhjList) {
        if (yhjList[index].id === id) {
          yhjList[index].sle = !yhjList[index].sle
          yhjName = yhjList[index].shopname
        }
      }
    }

    this.setData({
      shopArray: yhjList,
      shopAddress: yhjName,
      shopType: 1,
      shopId: id
    })
    let d = wx.getStorageSync('setYanghuOrd')
    d.s = "order.placeOrder2"
    d.shopId = that.data.shopId
    wx.showLoading({
      title: '加载中',
    })
    http(d).then(res => {//停车记录
      wx.hideLoading()
      if (res.data.ret == 200) {
        const data = res.data.data
        that.setData({
          ord: res.data.data,
          userCar: res.data.data.userCar,
          isSuv: res.data.data.userCar[0].cartype == 2 ? true : false,
          ori_car: res.data.data.userCar[0].cartype,
          ori_car_id: res.data.data.userCar[0].id,
          cardId: res.data.data.hasCard.length == 0 ? -1 : res.data.data.hasCard[0].id,
        })
        if (res.data.data.hasCard.length == 0) {
          that.setData({
            yhj: true,
            kj: [],
            yhjName: "不使用优惠"
          })
        } else {
          let a = res.data.data.hasCard
          for (let i in a) {
            if (i == 0) {
              a[i].sle = true
            } else {
              a[i].sle = false
            }
          }
          that.setData({
            yhj: false,
            kj: a,
            yhjName: a[0].hasCard
          })
        }
      } else if (res.data.ret == 1000) {
        that.setData({
          visible3: true
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3500
        })
      }
    })
  },

  // 单选按钮
  switchRadio(e) {
    let type = e.currentTarget.dataset.type
    if (type === "1") {
      this.setData({
        price: true,
        wx: false
      })
    } else {
      this.setData({
        price: false,
        wx: true
      })
    }
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

  // 优惠卡券弹框部分
  chooseSezi1: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    if (parseFloat(that.data.ord.zongprice) == 0) {
      that.setData({
        isWxPay: false
      })
    } else {
      that.setData({
        isWxPay: true
      })
    }
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
      animationData1: animation.export(),
      // 改变view里面的Wx：if
      chooseSize1: true,
      chooseSize_01:true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData1: animation.export()
      })
    }, 100)
  },

  hideModal1: function (e) {
    var that = this;
    that.setData({
      chooseSize_01: false
    })
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(1000).step()
    that.setData({
      animationData1: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData1: animation.export(),
        chooseSize1: false
      })
    }, 500)
  },

  // 选择门店弹框部分
  chooseSezi2: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
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
      animationData2: animation.export(),
      // 改变view里面的Wx：if
      chooseSize2: true,
      chooseSize_02:true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData2: animation.export()
      })
    }, 100)
  },

  hideModal2: function (e) {
    var that = this;
    that.setData({
      chooseSize_02:false
    })
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(1000).step()
    that.setData({
      animationData2: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData2: animation.export(),
        chooseSize2: false
      })
    }, 500)
  },


  oilConfirm() {
    var that = this
    let a = wx.getStorageSync("setYanghuOrd")
    http({ s: "Order.setorder", userId: app.globalData.userId, shopId: that.data.shopId, classifyId: a.classifyId, goodsName: a.goodsName, carId: that.data.ori_car_id, classifysId: a.classifysId, cardId: that.data.cardId }).then(res => {
      console.log(res)
      if (res.data.ret == 200) {
        that.setData({
          ordernum: res.data.data
        })
        if (that.data.price == true) {//是否免密支付
          http({ s: "pay.is_payment", userid: app.globalData.userId }).then(res => {
            if (res.data.data == "1") {
              that.setData({
                visible5: true
              })
            }
            if (res.data.data == "0") {
              that.setData({
                visible4: true
              })
            }
          })
        }
        if (that.data.wx == true) {
          http({ s: "Order.createWechatOrder", ordernum: that.data.ordernum }, "POST").then(res => {
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
                $Toast({
                  content: '支付成功',
                  type: 'success'
                });
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../my_order/my_order?act=0',
                  })
                }, 1500)
              },
              fail(res) {
                $Message({
                  content: '支付失败',
                  type: 'error'
                });
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../my_order/my_order?act=1',
                  })
                }, 1500)
              }
            })
          })
        }
      }
    })
  },
  handleClick5(e) {
    var that = this
    if (e.detail.index == 0) {
      that.setData({
        visible5: false
      })
      $Toast({
        content: '支付失败',
        type: 'warning'
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../my_order/my_order?act=1',
        })
      }, 1500)
    }
    if (e.detail.index == 1) {
      let a = that.data.actions5
      a[1].loading = true
      that.setData({
        actions5: a
      })
      http({ s: "pay.payment", id: app.globalData.userId, ordernum: that.data.ordernum }).then(res => {
        console.log(res)
        if (res.data.ret == 428) {
          a[1].loading = false
          that.setData({
            actions5: a,
            visible5: false
          })
          $Message({
            content: '余额不足，请前往充值',
            type: 'warning',
            duration: 5
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1500)
        }
        if (res.data.ret == 200) {
          a[1].loading = false
          that.setData({
            actions5: a,
            visible5: false
          })
          $Toast({
            content: '支付成功',
            type: 'success'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_order/my_order?act=0',
            })
          }, 1000)
        }
      })
    }
  },
  handleClick4(e) {
    var that = this
    if (e.detail.index == 0) {
      that.setData({
        visible4: false
      })
      $Toast({
        content: '支付失败',
        type: 'warning'
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../my_order/my_order?act=1',
        })
      }, 1500)
    }
    if (e.detail.index == 1) {
      if (that.data.pay_psw.length < 6) {
        $Message({
          content: '密码长度应该等于6位',
          type: 'warning',
          duration: 2
        })
      } else {
        http({ s: "pay.validate", ordernum: that.data.ordernum, paypwd: that.data.pay_psw, id: app.globalData.userId }).then(res => {
          if (res.data.ret == 429) {
            $Message({
              content: '支付密码输入错误',
              type: 'error',
              duration: 2
            });
            that.setData({
              pay_psw: ""
            })
          }
          if (res.data.ret == 428) {
            $Message({
              content: '余额不足，请前往充值',
              type: 'warning',
              duration: 2
            });
            that.setData({
              visible4: false
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../my_recharge/my_recharge',
              })
            }, 1000)
          }
          if (res.data.ret == 200) {
            $Toast({
              content: '支付成功',
              type: 'success'
            });
            that.setData({
              pay_psw: "",
              visible4: false
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../my_order/my_order?act=0',
              })
            }, 1000)
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面初始化 options为页面跳转所带来的参数
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let data = currPage.data.mydata;
    console.log(data)
    if (data != undefined) {
      this.setData({
        shopAddress: data.goodsName
      })
    }
  }
})