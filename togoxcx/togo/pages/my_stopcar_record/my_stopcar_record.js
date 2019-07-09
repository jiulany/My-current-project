// pages/my_stopcar_record/my_stopcar_record.js
const app = getApp();
import http from "../../utils/http.js"
Page({
  data: {
    currentTab: 0,
    showModal: false,
    showModal1: false,
    all: [],
    alled_pd: false,
    uped: [],
    uped_pd: false,
    dzed: [],
    dzed_pd: false,
    http: app.globalData.baseUrl,
    yuanying: "",
    all_loading: false,
    all_noms: false,
    all_page: 1,
    up_loading: false,
    up_noms: false,
    up_page: 1,
    dz_loading: false,
    dz_noms: false,
    dz_page: 1,
    cur_all_page: 1,
    cur_up_page: 1,
    cur_dz_page: 1
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      currentTab: options.act,
      all_loading: true,
      all_noms: false
    })
    http({ s: "park.parklist", user_id: app.globalData.userId, page: that.data.all_page, num: 10 }).then(res => {//停车记录
      if (res.data.ret == 418) {
        that.setData({
          all_noms: true,
          all_loading: false
        })
      } else {
        if (res.data.ret == 200) {
          that.setData({
            all: res.data.data,
            all_loading: false,
            all_page: that.data.all_page + 1,
            alled_pd: true,
          })
        }
      }
    })
  },
  loadingAll() {
    var that = this
    if (that.data.cur_all_page != that.data.all_page) {
      that.setData({
        all_loading: true,
        all_noms: false,
        cur_all_page: that.data.all_page
      })
      http({ s: "park.parklist", user_id: app.globalData.userId, page: that.data.all_page, num: 10 }).then(res => {//全部
        if (res.data.ret == 418) {
          that.setData({
            all_noms: true,
            all_loading: false
          })
        } else {
          if (res.data.ret == 200) {
            var a = res.data.data
            var b = that.data.all
            var c = b.concat(a)
            that.setData({
              all_loading: false,
              all: c,
              all_page: that.data.all_page + 1
            })
          }
        }
      })
    }
  },
  toUp(e) {
    wx.setStorageSync("record", e.currentTarget.dataset.itm)
    wx.navigateTo({
      url: '../voucher/voucher',
    })
  },
  loadingUp() {
    var that = this
    if (that.data.cur_up_page != that.data.up_page) {
      that.setData({
        up_loading: true,
        up_noms: false,
        cur_up_page: that.data.up_page
      })
      http({ s: "park.parklist", user_id: app.globalData.userId, page: that.data.all_page, num: 10, state: 1 }).then(res => {//全部
        if (res.data.ret == 418) {
          that.setData({
            up_noms: true,
            up_loading: false
          })
        } else if (res.data.data == null) {
          that.setData({
            up_noms: true,
            up_loading: false
          })
        } else {
          if (res.data.ret == 200) {
            var a = res.data.data
            var b = that.data.uped
            var c = b.concat(a)
            that.setData({
              up_loading: false,
              up: c,
              up_page: that.data.up_page + 1
            })
          }
        }
      })
    }
  },
  loadingDz() {
    var that = this
    if (that.data.cur_dz_page != that.data.dz_page) {
      that.setData({
        dz_loading: true,
        dz_noms: false,
        cur_dz_page: that.data.dz_page
      })
      http({ s: "park.parklist", user_id: app.globalData.userId, page: that.data.dz_page, num: 10, state: 4 }).then(res => {//全部
        if (res.data.ret == 418) {
          that.setData({
            dz_noms: true,
            dz_loading: false
          })
        } else {
          if (res.data.ret == 200) {
            var a = res.data.data
            var b = that.data.dzed
            var c = b.concat(a)
            that.setData({
              dz_loading: false,
              dzed: c,
              dz_page: that.data.dz_page + 1
            })
          }
        }
      })
    }
  },
  swiperTab(e) {
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
    if (e.detail.current == 0) {
      if (that.data.alled_pd == false) {
        that.setData({
          all_loading: true,
          all_noms: false
        })
        http({ s: "park.parklist", user_id: app.globalData.userId, page: 1, num: 10 }).then(res => {
          //停车记录
          if (res.data.ret == 418 || res.data.data == null) {
            that.setData({
              all_noms: true,
              all_loading: false
            })
          } else {
            if (res.data.ret == 200) {
              that.setData({
                all: res.data.data,
                all_loading: false,
                alled_pd: true,
                all_page: that.data.all_page + 1
              })
            }
          }
        })
      }
    }
    if (e.detail.current == 1) {
      if (that.data.uped_pd == false) {
        that.setData({
          up_loading: true,
          up_noms: false
        })
        http({ s: "park.parklist", user_id: app.globalData.userId, page: 1, num: 10, state: 1 }).then(res => {
          //停车记录
          if (res.data.ret == 418 || res.data.data == null) {
            that.setData({
              up_noms: true,
              up_loading: false
            })
          } else {
            if (res.data.ret == 200) {
              that.setData({
                uped: res.data.data,
                up_loading: false,
                uped_pd: true,
                up_page: that.data.up_page + 1
              })
            }
          }
        })
      }
    }
    if (e.detail.current == 2) {
      if (that.data.dzed_pd == false) {
        that.setData({
          dz_loading: true,
          dz_noms: false
        })
        http({ s: "park.parklist", user_id: app.globalData.userId, page: 1, num: 10, state: 4 }).then(res => {//停车记录
          if (res.data.ret == 418) {
            that.setData({
              dz_noms: true,
              dz_loading: false
            })
          } else {
            if (res.data.ret == 200) {
              that.setData({
                dzed: res.data.data,
                dz_loading: false,
                dzed_pd: true,
                dz_page: that.data.dz_page + 1
              })
            }
          }
        })
      }
    }
  },
  clickTab(e) {
    var that = this
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },
  // 凭证详情弹框部分
  toShowModal: function (e) {
    var that = this
    this.setData({
      showModal: true
    })
    http({ s: "park.editpark", id: e.currentTarget.dataset.itm.id }).then(res => {
      //获取未通过原因
      that.setData({
        yuanying: res.data.data
      })
    })
  },
  checkPz(e) {
    var that = this
    wx.previewImage({
      current: that.data.http + e.currentTarget.dataset.itm.voucher_url, // 当前显示图片的http链接
      urls: [that.data.http + e.currentTarget.dataset.itm.voucher_url] // 需要预览的图片http链接列表
    })
  },
  hide: function (e) {
    this.setData({
      showModal: false
    });
  },

  toShowModal1: function (e) {
    this.setData({
      showModal1: true

    })
  },

  hide1: function (e) {
    this.setData({
      showModal1: false
    });
  },

  onUnload: function () {
    let pages = getCurrentPages(); //当前页面栈
    //当前页面为页面栈的最后一个元素
    let prevPage = pages[pages.length - 1];//当前页面
    if (getCurrentPages().length == 5) {
      wx.navigateBack({
        delta: 2
      })
    }
  },
})