<template>
    <view class="span24 addcar">
        <view class="span24 addcar-it" @tap="_chooseBrand">
            <view class="span24 addcar-tt">汽车品牌</view>
            <view class="span24 addcar-inp">
                <!-- <input type="text" v-model="choice_brand" placeholder="请选择汽车品牌"> -->
                <view>{{!choice_brand ? '请选择汽车品牌' : choice_brand}}</view>
            </view>
        </view>
        <view class="span24 addcar-it">
            <view class="span24 addcar-tt">车辆车牌</view>
            <view class="span24 addcar-inp inpcar">
                <input
                    type="text"
                    
                    placeholder="请输入车辆车牌"
                    :value="car_num"
                >
                <view class="keyblur" @tap="openKeyboard"></view>
            </view>
        </view>
        <view class="span24 addcar-it">
            <view class="span24 addcar-tt">车辆颜色</view>
            <view class="span24 addcar-inp" @tap="getColor">
                <!-- <input type="text" placeholder="请选择车辆颜色"> -->
                <view class="color:#e1e1e1">{{!carColor ? '请选择汽车颜色' : carColor}}</view>
                <view class="addcar-sle" v-if="colorVisible">
                    <view class="span24 addcar-sle-it" v-for="(item,index) in colorArr" @tap.stop="choiseColor(item)" :key="index">{{item}}</view>
                </view>
            </view>
        </view>
        <view class="span24 addcar-it">
            <view class="span24 addcar-tt">车辆类型</view>
            <view class="span24 addcar-inp" @tap="getType">
                <!-- <input type="text" placeholder="请选择车辆类型"> -->
                 <view class="color:#e1e1e1">{{!carTypeString ? '请选择汽车类型' : carTypeString}}</view>
                <view class="addcar-sle" v-if="carTypeVisible">
                    <view class="span24 addcar-sle-it"  v-for="(item,index) in typeArr" @tap.stop="choiseType(item)" :key="index">{{item}}</view>
                </view>
            </view>
        </view>
        <view class="span24 addcar-save">
            <view @tap="save">保存</view>
        </view>
        <keyboader :visible="show_keyboader" @changeValue="changeValue" @close="closeKeyboard"></keyboader>
    </view>
</template>
<script>
import keyboader from "../../components/keyboader/keyboader";
import { CarModel } from '../../model/car';
import { UserModel } from '../../model/user';
const carModel = new CarModel()
const userModel = new UserModel()
export default {
  components: {keyboader },
  data() {
    return {
        show_keyboader:false,
        car_num:null,
        brandData:{},
        choice_brand:"",
        carColor:'',
        carTypeString:'',
        carType:1,
        colorVisible:false,
        carTypeVisible:false,
        colorArr:['白色','黑色'],
        typeArr:['轿车','SUV'],
        options:{}
    };
  },
  methods: {    
      _chooseBrand(){
          uni.navigateTo({
             url: "/pagesA/car_brand_list/car_brand_list"
           });
      },
      openKeyboard(){
          console.log("open")
        this.show_keyboader=true
      },
      closeKeyboard(){
          console.log("close")
        this.show_keyboader = false
      },
      changeValue(e){
         this.car_num=e
      },
      getColor(){
         this.colorVisible = true
        console.log(this.colorVisible )
      },
      getType()
      {
        this.carTypeVisible = !this.carTypeVisible
      },
      choiseColor(value){
        console.log(value)
        this.carColor = value
        this.colorVisible = false
      },
      choiseType(value)
      {
         this.carTypeString = value
         if (value == 'SUV') {
            this.carType = 2
         } else {
           this.carType = 1
         }
         this.carTypeVisible = false
      },
      save()
      {
        if (!this.choice_brand) {
          uni.showToast({
            title:'请选择汽车品牌',
            icon:'none'
          })
          return false
        }
        if (!this.carColor) {
          uni.showToast({
            title:'请选择汽车颜色',
            icon:'none'
          })
          return false
        }
        if (!this.carTypeString) {
          uni.showToast({
            title:'请选择汽车类型',
            icon:'none'
          })
          return false
        }
        if (!this.car_num) {
          uni.showToast({
            title:'请填写车牌号',
            icon:'none'
          })
          return false
        }
        let params = {
          car_num : this.car_num,
          color : this.carColor,
          type : this.carType,
        }
        if (JSON.stringify(this.brandData) != '{}') {
            params.car_data = JSON.stringify(this.brandData)
        }
        if (this.options.car_id) {
          this.updateCar(params)
        } else {
          this.createCar(params)
        }
      },
      getDetails()
      {
          userModel.getCarDetails({car_id:this.options.car_id}).then((res) => {
              let data = res.data
              this.car_num = data.car_num
              this.carColor = data.color
              this.carType = data.type
              if (data.type == 1) {
                this.carTypeString = '轿车'
              } else  {
                this.carTypeString = 'SUV'
              }
              this.brandData = {
                id : data.equipmen_id,
                brand_name : data.brand_name,
                vehicles_id : data.vehicle_id,
                sales_name : data.sales_name
              }
              this.choice_brand = data.brand_name + ' ' + data.sales_name
          })
      },
      createCar(params){
        carModel.createCar(params).then((res) => {
            uni.showToast({
                  title:res.message,
                  icon:'none'
              })
            if (res.code == 201) {
                uni.navigateBack()
            }
        })
      },
      updateCar(params)
      {
          carModel.updateCar(params,this.options).then((res) => {
              uni.showToast({
                  title:res.message,
                  icon:'none'
              })
              if (res.code == 200) {
                  uni.navigateBack()
              }
          })
      }
  },
  
  onLoad: function(options) {
    this.options = options;
    if (options.car_id) {
        this.getDetails()
    }

  },
  onShow: function() {
      uni.hideLoading()
      if (uni.getStorageSync("choice_brand")) {
        this.brandData = JSON.parse(uni.getStorageSync("choice_brand"))
        this.choice_brand = this.brandData.brand_name+' ' + this.brandData.sales_name

        uni.setStorageSync('choice_brand','')
      }
      
  },
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #fff;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.addcar-it {
  padding: 85rpx 24rpx 0 24rpx;
}
.addcar-tt {
  font-size: 32rpx;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 80rpx;
}
.addcar-inp {
  border-bottom: 1rpx solid rgba(245, 245, 245, 1);
  position: relative;
}
.addcar-inp input {
  font-size: 24rpx;
  width: 100%;
}
.inpcar{
  position: relative;
}
.keyblur{
  position:absolute;width:100%;height:100%;left:0;top:0;opacity:0;
  z-index: 999;
}
.addcar-save {
  justify-content: center;
  margin-top: 157rpx;
}
.addcar-save view {
  width: 702rpx;
  height: 68rpx;
  background: rgba(250, 200, 4, 1);
  border-radius: 8rpx;
  text-align: center;
  line-height: 68rpx;
  color: white;
}
.addcar-sle {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 5px 18px 2px rgba(11, 11, 10, 0.1);
  width: 100%;
  z-index: 9999;
  max-height: 400rpx;
  overflow-y: scroll;
}
.addcar-sle-it {
  padding: 20rpx 0 20rpx 18rpx;
  border-bottom: 1rpx solid rgba(245, 245, 245, 1);
}
</style>
