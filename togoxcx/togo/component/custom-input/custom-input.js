// component/custom-input/custom-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String
    },
    maxlength:{
      type:Number
    },
    type:{
      type:String
    },
    model:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_ms: true,
    value:"",
    values:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focusEv() {
      var that = this
      that.setData({
        is_ms: false
      })
      that.triggerEvent('focus')
    },
    blurEv(){
      var that = this
      if (that.data.value==""){
        that.setData({
          is_ms: true
        })
      }
    },
    inputEv(e){
      var that = this
      that.setData({
        value:e.detail.value
      })
    }
  },
  observers:{
    model(val){
      var that = this
      that.setData({
        values: val
      })
    },
    values(){
      var that = this
      that.setData({
        is_ms: false
      })
    }
  }
})
