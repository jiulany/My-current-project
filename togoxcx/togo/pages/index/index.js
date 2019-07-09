// pages/home/home.js
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
import http from "../../utils/http.js"
var qqmapsdk;
const {
  $Message
} = require('../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "抱歉，您未开启GPS定位！",
    imageId: "",
    showModal: false,
    show: 1,
    bannerIndex: [],
    imageAcvtivity: [],
    http: app.globalData.baseUrl,
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    phoneNewest: "",
    listArray: [{
        imgUrl: '../../images/index/yanghu_anniu_icon.png',
        title: "脱狗养护"
      },
      // {
      //   imgUrl: '../../images/index/wenda_icon.png',
      //   title: "脱狗问答"
      // },
      {
        imgUrl: '../../images/index/fuli_icon.png',
        title: "车友福利"
      },
      // {
      //   imgUrl: '../../images/index/jijiu_icon.png',
      //   title: "脱狗急救"
      // },
      {
        imgUrl: '../../images/index/tingche_icon.png',
        title: "应急停车"
      },
      // {
      //   imgUrl: '../../images/index/yongche_icon.png',
      //   title: "脱狗用车"
      // },
      // {
      //   imgUrl: '../../images/index/maiche_icon.png',
      //   title: "脱狗买车"
      // },
      {
        imgUrl: '../../images/index/shouche_icon.png',
        title: "现金收车"
      }
    ],
    comp_ban: false,
    comp_sle: false,
    self_close: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    app.editTabbar();
    qqmapsdk = new QQMapWX({
      key: 'PTOBZ-BVCW2-2U3U3-CEUP3-3UIJ7-DCFJX' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
    this.banner()
    this.activity();
    this.rejister();
  },
  toShowModal: function(e) {
    this.setData({
      showModal: true

    })
  },

  hide: function(e) {
    this.setData({
      showModal: false
    });
  },

  // 其他城市
  cityTap: function() {
    this.handleDefault();
  },

  // $Message提醒
  handleDefault() {
    $Message({
      content: '其他城市敬请期待！',
      type: 'warning'
    });
  },

  // $Message提醒
  handleDefault1() {
    $Message({
      content: '敬请期待！',
      type: 'warning'
    });
  },
  contentTap: function() {
    this.handleDefault1();
  },

  // 验证是否登录过期
  rejister: function(e) {
    var that = this
    wx.checkSession({
      success: function(res) {
        console.log(res, '登录未过期')
      },
      fail: function(res) {
        console.log(res, '登录过期了')
        //再次调用wx.login()
        wx.login({
          success: function(res) {
            console.log(res.code)
            //发送请求
            http({
              s: "Wxmini.getUserKey",
              code: res.code
            }, "POST").then(res => {
              console.log(res)
              wx.setStorageSync('openid', res.data.data.userdata.openid)
              wx.setStorageSync('userId', res.data.data.userdata.id)
            })
          }
        })
      }
    })
  },
  mapS: function(latitude, longitude) {
    let _this = this
    let url = "?s=shop.user_shop&longitude=" + longitude + "&latitude=" + latitude;
    return http({
      s: "shop.user_shop",
      longitude: longitude,
      latitude: latitude
    }, "POST").then(res => {
      if (res.data.ret === 200) {
        wx.setStorageSync('late_shop', res.data.data.id)
        wx.setStorageSync('shop', res.data.data)
        let juli = res.data.data.distance;
        let distance = (juli / 1000).toFixed(1);
        _this.setData({
          address: res.data.data.shopname,
          distance: distance
        })

      }
    })
  },

  activity: function(e) {
    let _this = this
    let url = "?s=images.getimages&status=2";
    return http({
      s: "images.getimages",
      status: 2
    }, "POST").then(res => {
      console.log(res)
      if (res.data.ret === 200) {
        _this.setData({
          imageAcvtivity: res.data.data,
          comp_sle: true
        })
        wx.hideLoading()
      }
    })
  },
  activityTap: function(e) {
    console.log(e)
    let imageId = e.currentTarget.dataset.id;
    switch (imageId) {
      case 0:
        wx.navigateTo({
          url: '/pages/car_year/car_year?id=' + e.currentTarget.dataset.goodsid,
        })
        break
      case 1:
        wx.navigateTo({
          url: '/pages/car_year/car_year?id=' + e.currentTarget.dataset.goodsid,
        })
        break
      case 2:
        wx.navigateTo({
          url: '/pages/yanghu/yanghu?la=1'
        })
        break
    }

  },
  banner: function(e) {
    let _this = this
    let url = "?s=images.getimages&status=1";
    return http({
      s: "images.getimages",
      status: 1
    }, "POST").then(res => {
      if (res.data.ret === 200) {
        _this.setData({
          bannerIndex: res.data.data,
          comp_ban: true
        })
        wx.hideLoading()
      }
    })
  },

  onShow: function(res) {
    wx.hideTabBar();
    var that = this
    var phone = ""
    var a = setTimeout(function() {
      phone = wx.getStorageSync('phone');
      if (phone == "") {
        that.toShowModal();
      } else {
        that.hide();
      }
    }, 2000)

    // 页面初始化 options为页面跳转所带来的参数
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let data = currPage.data.mydata;
    if (data != undefined) {
      this.setData({
        address: data.goodsName,
        distance: data.distance
      })
    } else {
      let vm = this;
      vm.getUserLocation();
    }
  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    wx.setStorageSync("lag", {
      latitude,
      longitude
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city;
        wx.setStorageSync("province", province);
        wx.setStorageSync("city", city);
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
        vm.mapS(latitude, longitude)
      },
      fail: function(res) {},
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  itemsTap: function(event) {
    var that = this;
    var idx = event.currentTarget.dataset.index;
    switch (idx) {
      case 0:
        wx.navigateTo({
          url: '/pages/yanghu/yanghu',
        })
        break
        // case 1:
        //   that.handleDefault1()
        //   break
      case 1:
        wx.navigateTo({
          url: '/pages/welfare/welfare',
        })
        break
        // case 3:
        //   wx.navigateTo({
        //     url: '/pages/first_aid/first_aid',
        //   })
        //   break
      case 2:
        wx.navigateTo({
          url: '/pages/stop_car/stop_car',
        })
        break
        // case 5:
        //   that.handleDefault1()
        //   break
        // case 6:
        //   that.handleDefault1()
        //   break
      case 3:
        wx.navigateTo({
          url: '/pages/cash_car/cash_car',
        })
        break
    }
  },

  // 切换门店
  toShop: function() {
    wx.navigateTo({
      url: '/pages/store_list/store_list',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  // banner跳转
  onSwiperTap: function(event) {
    console.log(event)
    var idx = event.currentTarget.dataset.index;
        wx.navigateTo({
          url: event.currentTarget.dataset.itm.url ,
        })
    // switch (idx) {
    //   case 0:
    //     wx.navigateTo({
    //       url: '/pages/welfare/welfare',
    //     })
    //     break
    //   case 1:
    //     wx.navigateTo({
    //       url: '/pages/stop_car/stop_car',
    //     })
    //     break
    //   case 2:
    //     wx.navigateTo({
    //       url: '/pages/my_recharge/my_recharge',
    //     })
    //     break

    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})