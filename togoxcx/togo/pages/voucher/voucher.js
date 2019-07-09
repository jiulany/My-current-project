// pages/voucher/voucher.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.globalData.baseUrl,
    img: "",
    itm: {},
    up_img:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      itm: wx.getStorageSync("record")
    })
    http({ s: "park.getImage"}).then(res => {
      that.setData({
        img: res.data.data.image2
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  upLoad() {
    var that = this
    wx.showActionSheet({
      itemList: ['从相册中选择图片', '拍照上传'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                up_img: tempFilePaths[0]
              })
              // wx.uploadFile({
              //   url: app.globalData.baseUrl + `/?s=park.catedit`, // 仅为示例，非真实的接口地址
              //   filePath: tempFilePaths[0],
              //   name: 'file',
              //   formData: {
              //     state: that.data.itm.state,
              //     id: that.data.itm.id
              //   },
              //   success(res) {
              //     let a = JSON.parse(res.data)
              //     if (a.ret == 200) {
              //       $Message({
              //         content: '图片上传成功',
              //         type: 'success'
              //       });
              //     }
              //   }
              // })
            }
          })
        }
        if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                up_img: tempFilePaths[0]
              })
              // wx.uploadFile({
              //   url: app.globalData.baseUrl + `/?s=park.catedit`, // 仅为示例，非真实的接口地址
              //   filePath: tempFilePaths[0],
              //   name: 'file',
              //   formData: {
              //     state: that.data.itm.state,
              //     id: that.data.itm.id
              //   },
              //   success(res) {
              //     console.log(res)
              //     if (res.data.ret == 200) {
              //       $Message({
              //         content: '图片上传成功',
              //         type: 'success'
              //       });
              //     } else {
              //       $Message({
              //         content: '单个文件最大允许上传2M!',
              //         type: 'warning'
              //       });
              //     }
              //   }
              // })
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  upLoadImg(){
    var that=this
    if (that.data.up_img==""){
      $Message({
        content: '您还未选择凭证',
        type: 'warning'
      });
    } else {
      wx.uploadFile({
        url: app.globalData.baseUrl + `/?s=park.catedit`, // 仅为示例，非真实的接口地址
        filePath: that.data.up_img,
        name: 'file',
        formData: {
          state: that.data.itm.state,
          id: that.data.itm.id
        },
        success(res) {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            var jj = JSON.parse(jsonStr);
            res.data = jj;
          }
          if (res.data.ret == 200) {
            $Message({
              content: '凭证上传成功',
              type: 'success'
            });
          }
          let a =res.data
          if (a.ret == 200) {
            $Message({
              content: '凭证上传成功',
              type: 'success',
              duration:5
            });
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/my_stopcar_record/my_stopcar_record',
              })
            },2000)
           
          }
        }
      })
    }
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