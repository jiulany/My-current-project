// component/key-board/key-board.js
Component({
  properties: {
    showkKeyBoard: {
      type: Boolean,
      value: false
    }
  },
  data: {
    province_0: ["京", "津", "沪", "渝", "冀", "豫", "云", "辽", "黑", "湘"],
    province_1: ["皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘"],
    province_2: ["晋", "蒙", "陕", "吉", "闽", "贵", "粤"],
    province_3: ["青", "藏", "川", "宁", "琼"],
    letter_0: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    letter_1: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    letter_2: ["Z", "X", "C", "V", "B", "N", "M"],
    num: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    tep_act: 0,
    value: "",
    actKeyBoard: false,
    animationData: {},
  },
  observers: {
    showkKeyBoard(val) {
      var that = this
      that.setData({
        actKeyBoard: val
      })
      // if (val == true) {
      //   // 创建一个动画实例
      //   var animation = wx.createAnimation({
      //     // 动画持续时间
      //     duration: 150,
      //     // 定义动画效果，当前是匀速
      //     timingFunction: 'linear'
      //   })
      //   // 将该变量赋值给当前动画
      //   that.animation = animation
      //   // 先在y轴偏移，然后用step()完成一个动画
      //   animation.translateY(200).step()
      //   // 用setData改变当前动画
      //   that.setData({
      //     // 通过export()方法导出数据
      //     animationData: animation.export(),
      //     // 改变view里面的Wx：if
      //     actKeyBoard: true
      //   })
      //   // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      //   setTimeout(function () {
      //     animation.translateY(0).step()
      //     that.setData({
      //       animationData: animation.export()
      //     })
      //   }, 500)
      // }
    }
  },
  methods: {
    clickPro(e) {
      var that = this
      let a = that.data.tep_act + 1
      let b = that.data.value + e.currentTarget.dataset.value
      that.setData({
        tep_act: a,
        value: b
      })
      that.triggerEvent('changeValue', that.data.value)
    },
    clickLet(e) {
      var that = this
      if (that.data.tep_act <= 8) {
        let a = that.data.tep_act + 1
        let b = that.data.value + e.currentTarget.dataset.value
        that.setData({
          tep_act: a,
          value: b
        })
        that.triggerEvent('changeValue', that.data.value)
      }
    },
    clickNum(e) {
      var that = this
      if (that.data.tep_act <= 8) {
        let a = that.data.tep_act + 1
        let b = that.data.value + e.currentTarget.dataset.value
        that.setData({
          tep_act: a,
          value: b
        })
        that.triggerEvent('changeValue', that.data.value)
      }
    },
    clickdele() {
      var that = this
      if (that.data.tep_act != 0) {
        let a = that.data.tep_act - 1
        let c = that.data.value
        let b = c.substr(0, c.length - 1)
        that.setData({
          tep_act: a,
          value: b
        })
        that.triggerEvent('changeValue', that.data.value)
      }else{
        that.triggerEvent('changeValue', "")
      }
    },
    closeKeyboard() {
      var that = this
      that.setData({
        actKeyBoard: false
      })

      // var animation = wx.createAnimation({
      //   duration: 200,
      //   timingFunction: 'linear'
      // })
      // that.animation = animation
      // animation.translateY(200).step()
      // that.setData({
      //   animationData: animation.export()

      // })
      // setTimeout(function () {
      //   animation.translateY(0).step()
      //   that.setData({
      //     animationData: animation.export(),
      //     actKeyBoard: false
      //   })
      // }, 500)
    }
  }
})