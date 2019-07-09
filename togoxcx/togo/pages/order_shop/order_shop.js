// pages/order/order.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');
const {
  $Message
} = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopType: 0,
    shopArray:[],
    goodsNum: '',
    chooseSize: false,
    chooseSize1: false,
    chooseSize2:false,
    animationData: {},
    animationData1: {},
    ord: {},
    maskFlag: false,
    oilchooseFla: false,
    showModal: false,
    price: true,
    wx: false,
    cardId:-1,
    yhjName: '不使用优惠劵',
    yhj: true,
    item: {},
    kj: [{
      name: '包年会员10元:省10元',
      id: 1,
      sle: false,
    }, {
      name: '包季会员100元：省100元',
      id: 2,
      sle: false
    }],
    visible5: false,
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
    phone:"",
    http:app.globalData.baseUrl,
    balance:"",
    isNoPos:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this.toShowModal();
    let add = wx.getStorageSync('lag')
    var a = app.globalData.goods
    wx.showLoading({
      title: '加载中',
    })
    http({ s: "order.placeOrder2", userId: app.globalData.userId, goodsId: a.id, classifyId: a.classifyid, shopId: a.shopid, goodsName: a.goodsname, goodsNum: a.goodsnum, classifysId: a.classifysid, longitude: add.longitude, latitude: add.latitude }).then(res => {//商品
      wx.hideLoading()
      const data = res.data.data
      // this.onShop(data)
      const ord = res.data.data.hasGoods[0]
      const shopArray = res.data.data.getNearShop
      for (let index in shopArray) {
        shopArray[index]['sle'] = false
        shopArray[index]['jl'] = (shopArray[index].distance/1000).toFixed(2)
      }
      if (that.data.isNoPos == false) {
        if (wx.getStorageSync('shop') != "") {
          that.chooseAddress();
          that.setData({
            shopId: a.shopid
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
      ord["zongprice"] = res.data.data.priceAll
      that.setData({
        ord: res.data.data,
        shopArray: shopArray,
        goodsNum: a.goodsnum,
        cardId: res.data.data.hasCard.length == 0 ? -1 : res.data.data.hasCard[0].id
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
    })
  },
  // onShop(data){
  //  const shop = wx.getStorageSync('shop');
  //  const shopId = shop.id
  //  const shopDetail = data.getNearShop
  //   var type = 0
  //   for (let index in shopDetail) {
  //     if (shopDetail[index].id === shopId) {
  //     this.setData({
  //       shopType: 1
  //     })
  //      return
  //     }
  //   }
  //  if (this.data.shopType === 0) {
  //    wx.showToast({
  //      title: '当前该门店没有该服务,请切换其他门店',
  //      icon: 'none',
  //      duration: 2000
  //    })
  //    return false
  //  }
  // },
  chooseAddress: function () {
    var aaa = wx.getStorageSync('shop');
    this.setData({
      shopAddress: aaa.shopname
    })
  },

  toShowModal: function(e) {
    this.setData({
      showModal: true

    })
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
  toPay() {
    var that = this
    http({ s: "pay.validate", ordernum: that.data.ord.ordernum, paypwd: that.data.pay_psw, id: app.globalData.userId}).then(res => {
    })
    // wx.request({ 
    //   url: app.globalData.baseUrl + `/?s=pay.validate&ordernum=${that.data.ord.ordernum}&paypwd=${that.data.pay_psw}&id=${app.globalData.userId}`,
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
  },
  hide: function(e) {
    this.setData({
      showModal: false
    });
  },
  // 立即购买弹框部分
  chooseSezi: function(e) {
    // if (this.data.shopType === 0) {
    //   wx.showToast({
    //     title: '当前该门店没有该服务,请切换其他门店',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false
    // }
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
    setTimeout(function() {
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
    let add = wx.getStorageSync('lag')
    let a = app.globalData.goods
    a.cardId = -1
    http({ s: "order.placeOrder2", userId: app.globalData.userId, goodsId: a.id, classifyId: a.classifyid, shopId: a.shopid, goodsName: a.goodsname, goodsNum: a.goodsnum, classifysId: a.classifysid, longitude: add.longitude, latitude: add.latitude, cardId: a.cardId }).then(res => {
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
    let a = app.globalData.goods
    a.s = "order.placeOrder2"
    let add = wx.getStorageSync('lag')
    a.cardId = e.currentTarget.dataset.id
    a.carId = that.data.ori_car_id
    http({ s: "order.placeOrder2", userId: app.globalData.userId, goodsId: a.id, classifyId: a.classifyid, shopId: a.shopid, goodsName: a.goodsname, goodsNum: a.goodsnum, classifysId: a.classifysid, longitude: add.longitude, latitude: add.latitude, cardId: a.cardId }).then(res => {
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
    let id = e.currentTarget.dataset.id
    const yhjList = this.data.shopArray
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
      shopId:id
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
  hideModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 500)
  },
  oilConfirm() {
    var that = this
    let a = app.globalData.goods
    console.log(a)
    http({ s: "Order.setorder", userId: app.globalData.userId, shopId: that.data.shopId, goodsNum: a.goodsnum,classifyId: a.classifyid, goodsName: a.goodsname, carId: that.data.ori_car_id, classifysId: a.classifysid,cardId:that.data.cardId }).then(res => {
      console.log(res)
      if (res.data.ret == 200) {
        that.setData({
          ordernum: res.data.data
        })
        if (that.data.price == true) {
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
            duration: 2
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../my_recharge/my_recharge',
            })
          }, 1000)
        }
        if (res.data.ret == 200) {
          a[1].loading = false
          that.setData({
            actions5: a,
            visible5: false
          })
          $Toast({
            content: '支付成功',
            type: 'success',
            duration: 5
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
  // 优惠卡券弹框部分
  chooseSezi1: function(e) {
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
      animationData1: animation.export(),
      // 改变view里面的Wx：if
      chooseSize1: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData1: animation.export()
      })
    }, 100)
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
      chooseSize2: true
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


  hideModal1: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(1000).step()
    that.setData({
      animationData1: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData1: animation.export(),
        chooseSize1: false
      })
    }, 500)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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