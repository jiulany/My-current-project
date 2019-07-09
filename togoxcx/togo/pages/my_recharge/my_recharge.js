// pages/my_recharge/my_recharge.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    prices: [
    ],
    sleitem: {},
    is_zdy: false,
    value: "",
    showModel: false,
    animationData: {},
    recharge_price:"",
    phone:"",
    loading:false,
    image_0:"",
    http:app.globalData.baseUrl,
    comp_fst:false,
    comp_snd:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if (wx.getStorageSync("phone")!=""){
      var a = wx.getStorageSync("phone")
      var b = a.substr(3, 4)
      var c = a.replace(b, "****")
      that.setData({
        phone: c
      })
    }else{
      that.setData({
        phone: "未授权登陆"
      })
    }
    http({ s: "Recharge.getRechargeType"}).then(res => {//默認車輛
      that.setData({
        prices: res.data.data,
        is_zdy: false,
        recharge_price: res.data.data[0].condition,
        sleitem: res.data.data[0],
        comp_fst: true
      })
      wx.hideLoading()
    })
    http({ s: "images.getimages", status: 7 }).then(res => {
      console.log(res)
      that.setData({
        image_0: res.data.data[0].images,
        comp_snd: true
      })
      wx.hideLoading()
    })
  },
  pay(){
    var that=this
    that.setData({
      loading:true
    })
    if (that.data.is_zdy==false){
      http({ s: "Recharge.addRechargeFlow", userId: app.globalData.userId, id: that.data.sleitem.id }).then(res => {//余额
        http({ s: "Order.createWechatOrder", flownum: res.data.data.flownum }, "POST").then(res => {
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
                loading: false,
                showModel: false
              })
              $Message({
                content: '充值成功',
                type: 'success'
              });
              setTimeout(function () {
                wx.switchTab({
                  url: '../my/my',
                })
              }, 1500)
            },
            fail(res) {
              that.setData({
                loading: false,
                howModel: false
              })
              $Message({
                content: '充值失败',
                type: 'error'
              });
            }
          })
        })
      })
    }
    if (that.data.is_zdy == true){
      http({ s: "Recharge.addRechargeFlow", userId: app.globalData.userId, condition: that.data.value}, "POST").then(res => {
        if (res.data.ret == 400) {
          $Message({
            content: '支付金额应大于10元和小于20000元',
            type: 'warning'
          });
          that.setData({
            loading: false
          })
        } else {
          http({ s: "Order.createWechatOrder", flownum: res.data.data.flownum }, "POST").then(res => {
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
                  loading: false,
                  showModel: false
                })
                $Message({
                  content: '充值成功',
                  type: 'success'
                });
                setTimeout(function () {
                  wx.switchTab({
                    url: '../my/my',
                  })
                }, 1500)
              },
              fail(res) {
                that.setData({
                  loading: false,
                  howModel: false
                })
                $Message({
                  content: '充值失败',
                  type: 'error'
                });
              }
            })
          })
        }
      })
    }
  },
  recharge() {
    var that = this;
    console.log(that.data.value)
    if (parseInt(that.data.value)>20000){
      wx.showToast({
        title: '支付金额应大于10元和小于20000元',
        icon: 'none',
        duration: 2000
      })
    } else {
    // 创建一个动画实例
      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 500,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        showModel: true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 200)
    }
    
  },
  closeModel(){
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showModel: false
      })
    }, 200)
  },
  click: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    console.log(e)
    this.setData({
      id: ids,
      is_zdy: false,
      sleitem: e.currentTarget.dataset.itm,
      recharge_price: e.currentTarget.dataset.itm.condition
    })
  },
  inp(e) {
    var that = this
    console.log(e)
    if(e.detail.value!=""){
      that.setData({
        is_zdy: true,
        value: e.detail.value,
        recharge_price: e.detail.value
      })
    }else{
      that.setData({
        is_zdy: false,
        recharge_price: that.data.sleitem.condition
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
    console.log(3)
    let pages = getCurrentPages(); //当前页面栈
    // 当前页面为页面栈的最后一个元素
    let prevPage = pages[pages.length - 1];//当前页面
    console.log(11111111)
    console.log(pages)
    console.log(prevPage)
    let num = getCurrentPages().length
    console.log(num)
    if (num != 0 && num > 2) {
      wx.navigateBack({
        delta: num
      })
    }

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