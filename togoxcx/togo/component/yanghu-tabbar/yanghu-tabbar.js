const app = getApp();
Component({
  /**
 1. 组件的属性列表
   */
  properties: {
    tabbar: {
      type: String
    },
    conutPrice: {
      type: String,
      value:"0.00"
    },
    allSelect: {
      type: Boolean,
      default: false
    },
    types: {
      type: String
    }
  },
  data: {
    allSelect: false,
    types: 1
  },
  methods: {
    accountTap: function () {
      // 提交类型
      let type = this.properties.types
      this.triggerEvent('commitShop', type);
    },
    allSelected() {
      // 点击全选，改为取消全选
      let notAll = false
      this.setData({
        allSelect: notAll
      })
      var data = {
        notAll: notAll,
        type: this.data.types
      }
      this.triggerEvent('sonAllSeleted', data);
    },
    allNotSelected() {

      // 点击取消全选，改为全选
      let notAll = true
      this.setData({
        allSelect: notAll
      })

      var data = {
        notAll: notAll,
        type: this.data.types
      }
      this.triggerEvent('sonAllSeleted', data);
    }
  }
})