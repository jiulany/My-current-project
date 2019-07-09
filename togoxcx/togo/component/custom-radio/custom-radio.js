// component/custom-radio/custom-radio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ck:""
  },

  /**
   * 组件的方法列表
   */
  ready(){
    var that = this
    if (that.data.checked=="true"){
      that.setData({
        ck: true
      })
    }else{
      that.setData({
        ck: false
      })
    }
  },
  methods: {
  },
  observers:{
    checked(val){
      var that=this
      if (val== "true") {
        that.setData({
          ck: true
        })
      } else {
        that.setData({
          ck: false
        })
      }
    }
  }
})
