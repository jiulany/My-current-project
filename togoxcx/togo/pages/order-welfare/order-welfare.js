// pages/order/order.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
const { $Toast } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSize: false,
    animationData: {},
    animationData1: {},
    ord: {},
    addprice: "",
    maskFlag: false,
    oilchooseFla: false,
    showModal: false,
    price: true,
    wx: false,
    hasCard:[],
    yhjName: '不使用优惠劵',
    yhj: true,
    http: app.globalData.baseUrl,
    ori_car:"",
    kj: [
      {
        name: '包年会员10元:省10元',
        id: 1,
        sle: false,
      }, {
        name: '包季会员100元：省100元',
        id: 2,
        sle: false
      }
    ],
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确认',
        color: '#fdd000',
        loading: false
      }
    ],
    pay_psw: "",
    visible3: false,
    isSuv:false,
    phone:"",
    index:0,
    balance: "",
    isShowModel:true,
    cp: "",
    sele_color: "",
    model_color: false,
    model_xh: false,
    xingh: ["SUV", "小轿车"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http({ s: "Pay.getBalance", userId: app.globalData.userId }).then(res => {
      that.setData({
        balance: res.data.data.balance
      })
    })
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
    const data = wx.getStorageSync('setYanghuOrd')
    data["s"] = "order.placeOrder2"
    that.changeCar(data)
    this.chooseAddress();
  },
  changeCar: function (dz) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    http(dz).then(res => {//停车记录
      wx.hideLoading()
      if (res.data.ret == 200) {
        if (that.data.isShowModel == true) { that.toShowModal()}
        that.setData({
          ord: res.data.data,
          userCar: res.data.data.userCar,
          isSuv: res.data.data.userCar[0].cartype == 2 ? true : false,
          ori_car: res.data.data.userCar[0].cartype,
          ori_car_id: res.data.data.userCar[0].id
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
    http({ s: "car.setcar", userid: app.globalData.userId, carnum: that.data.cp, colorid: that.data.color_id, cartype: that.data.car_type }).then(res => {
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
            visible3: false
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
  closeAddModl() {
    this.setData({
      visible3: false
    })
    this.toShowModal()
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
  bindCarChange(e){
    var that=this
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
    http({ s: "pay.validate", ordernum: that.data.ord.ordernum, paypwd: that.data.pay_psw, id: app.globalData.userId }).then(res => {  //默认车辆
      console.log(res)
    })
  },
  toShowModal: function (e) {
    this.setData({
      showModal: true

    })
  },

  hide: function (e) {
    this.setData({
      showModal: false,
      isShowModel:false
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 立即购买弹框部分
  chooseSezi: function (e) {
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
  switchRadioN() {
    const yhjList = this.data.kj
    for (let index in yhjList) {
      yhjList[index].sle = false
    }
    this.setData({
      kj: yhjList,
      yhj: true,
      yhjName: "不使用优惠劵"
    })
  },
  //优惠劵单选按钮
  switchRadioY(e) {
    let id = e.currentTarget.dataset.id
    const yhjList = this.data.kj
    let yhjName = ''
    if (id) {
      for (let index in yhjList) {
        yhjList[index].sle = false
        if (yhjList[index].id === id) {
          yhjList[index].sle = true
          yhjName = yhjList[index].name
        }
      }
    }
    this.setData({
      kj: yhjList,
      yhj: false,
      yhjName: yhjName
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
  oilConfirm() {
    var that = this
    let a = wx.getStorageSync("setYanghuOrd")
    http({ s: "Order.setorder", userId: app.globalData.userId, shopId: a.shopId, classifyId: a.classifyId, goodsName: a.goodsName, carId: that.data.ori_car_id, classifysId: a.classifysId }).then(res => {
      if (res.data.ret == 200) {
        that.setData({
          ordernum: res.data.data
        })
        if (that.data.price == true) {
          http({ s: "pay.is_payment", userid: app.globalData.userId }).then(res => {//是否免密支付
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
          if (res.data.ret == 430) {
            $Toast({
              content: '支付成功',
              type: 'success',
              duration: 2
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
          if (res.data.ret == 200) {
            $Toast({
              content: '支付成功',
              type: 'success',
              duration: 2
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