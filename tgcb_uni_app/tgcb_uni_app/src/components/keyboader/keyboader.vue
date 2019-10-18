<template>
  <uni-popup ref="popup" type="bottom" maskClick="false" class="keyboarder-model" @change="change">
    <view class="keyboard">
      <view class="keyboard_ct">
        <view v-if="tep_act==0">
          <view class="pro_lover">
            <view @tap="closeKeyboard">完成</view>
          </view>
          <view class="pro_l0">
            <view class="key" v-for="item in province_0" @tap="clickPro(item,$event)" :key="item">{{item}}</view>
          </view>
          <view class="pro_l1">
            <view class="key" v-for="item in province_1" @tap="clickPro(item,$event)" :key="item">{{item}}</view>
          </view>
          <view class="pro_l2">
            <view class="key" v-for="item in province_2" @tap="clickPro(item,$event)" :key="item">{{item}}</view>
          </view>
          <view class="pro_l3">
            <view class="key" v-for="item in province_3" @tap="clickPro(item,$event)" :key="item">{{item}}</view>
          </view>
        </view>
        <view v-if="tep_act>0?true:false">
          <view class="pro_lover">
            <view @tap="closeKeyboard">完成</view>
          </view>
          <view class="pro_l0" v-if="tep_act>1?true:false">
            <view class="key" v-for="item in num" :key="item" @tap="clickNum(item,$event)">{{item}}</view>
          </view>
          <view class="pro_l0">
            <view
              class="key"
              v-for="item in letter_0"
              :key="item"
              @tap="clickNum(item,$event)"
            >{{item}}</view>
          </view>
          <view class="pro_l1">
            <view
              class="key"
              v-for="item in letter_1"
              :key="item"
              @tap="clickNum(item,$event)"
            >{{item}}</view>
          </view>
          <view class="pro_l2">
            <view
              class="key"
              v-for="item in letter_2"
              :key="item"
              @tap="clickNum(item,$event)"
            >{{item}}</view>
          </view>
        </view>
        <view class="keyboard_dele" @tap="clickdele">
          <i class="iconfont icon-chexiao1"></i>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script>
import { uniPopup } from "@dcloudio/uni-ui";
export default {
  name: "keyboader",
  data() {
    return {
      visible_dt: null,
      province_0: ["京", "津", "沪", "渝", "冀", "豫", "云", "辽", "黑", "湘"],
      province_1: ["皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘"],
      province_2: ["晋", "蒙", "陕", "吉", "闽", "贵", "粤"],
      province_3: ["青", "藏", "川", "宁", "琼"],
      letter_0: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      letter_1: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      letter_2: ["Z", "X", "C", "V", "B", "N", "M"],
      num: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      tep_act: 0,
      value: ""
    };
  },
  methods: {
    clickPro(item,e) {
      let a = this.tep_act + 1;
      let b = this.value + item;
      this.tep_act = a
      this.value = b
        console.log(this.value)
      this.$emit("changeValue", this.value);
    },
    closeKeyboard(){
      this.$emit("close");
    },
    clickLet(item,e) {
      var that = this;
      if (this.tep_act <= 8) {
        let a = this.tep_act + 1;
        let b = this.value +item;
        this.tep_act = a
        this.value = b
        console.log(this.value)
        this.$emit("changeValue", this.value);
      }
    },
    clickNum(item, e) {
      var that = this;
      if (this.tep_act <= 8) {
        let a = this.tep_act + 1;
        let b = this.value + item;
        this.tep_act = a
        this.value = b
        console.log(this.value)
        this.$emit("changeValue", this.value);
      }
    },
    change(e){
      if(e.show){
      }else{
      this.$emit("close");
      }
    },
    clickdele() {
      var that = this;
      if (this.tep_act != 0) {
        let a = this.tep_act - 1;
        let c = this.value;
        let b = c.substr(0, c.length - 1);
        this.tep_act = a
        this.value = b
        console.log(this.value)
        this.$emit("changeValue", this.value);
      } else {
        this.$emit("changeValue", "");
      }
    }
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  components: { uniPopup },
  watch: {
    visible(val) {
      console.log(val,"ss")
      this.visible_dt = val;
    },
    visible_dt(val) {
      console.log(val)
      if (val) {
        this.$refs.popup.open();
      } else {
        this.$refs.popup.close();
      }
    }
  },
  mounted() {
    this.visible_dt = this.visible_dt;
  }
};
</script>

<style>
@charset "UTF-8";

.keyboard {
  width: 100%;
  background: #cfd3dd;
  z-index: 99999;
  height: 100%;
}

.keyboard_ct {
  position: relative;
}

.key {
  display: inline-block;
  padding: 18rpx 17rpx;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 2px #666;
  width: 35rpx;
  text-align: center;
}
.pro_lover {
  display: flex;
  justify-content: flex-end;
  margin: 10rpx;
}
.pro_lover view {
  padding: 20rpx 30rpx;
  color: white;
  background: #fed000;
  border-radius: 5px;
}
.pro_l0 {
  display: flex;
  justify-content: space-around;
  margin: 10rpx;
}

.pro_l1 {
  display: flex;
  justify-content: space-around;
  margin: 10rpx;
  padding: 0 40rpx;
}

.pro_l2 {
  display: flex;
  justify-content: space-around;
  margin: 10rpx;
  padding: 0 110rpx;
}

.pro_l3 {
  display: flex;
  justify-content: space-around;
  margin: 10rpx;
  padding: 0 180rpx;
}

.keyboard_dele {
  position: absolute;
  right: 15rpx;
  bottom: 0;
}

.keyboard_dele image {
  width: 50rpx;
  height: 45rpx;
  margin-top: 10rpx;
}

.keyboard_dele {
  display: inline-block;
  padding: 8rpx 17rpx;
  background: #abb1bd;
  border-radius: 5px;
  box-shadow: 0 1px 2px #666;
}
</style>
