// pages/about_us/about_us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let pages = getCurrentPages(); //当前页面栈
    //当前页面为页面栈的最后一个元素
    let prevPage = pages[pages.length - 1];//当前页面
    console.log(11111111)
    console.log(pages)
    console.log(prevPage)
    if (getCurrentPages().length == 3) {
      wx.navigateBack({
        delta: 1
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

  },
  callNumber(){
    wx.makePhoneCall({
      phoneNumber: '02883399903' // 仅为示例，并非真实的电话号码
    })
  },
  toAboutTogo(){
    wx.navigateTo({
      url: '../about_us_togo/about_us_togo',
    })
  },
  toProposal(){
    wx.navigateTo({
      url: '../about_us_prpsal/about_us_prpsal',
    })
  },
  toJoin(){
    wx.navigateTo({
      url: '../about_us_joinus/about_us_joinus',
    })
  }
})