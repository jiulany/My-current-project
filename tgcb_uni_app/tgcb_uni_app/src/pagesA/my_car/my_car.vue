<template>
  <view class="span24 mycar">
      <view class="span24 mycar-lj" v-if="!type" @click="car_check">
          <view class="span2 mycar-lj-ico">
              <image mode="aspectFit" src='../../static/img/my_cheliang.png'></image>
          </view>
          <view class="span20 mycar-lj-tt">车辆年检查询</view>
          <view class="span2 mycar-lj-rtr">
              <view class="iconfont icon-xiayibu"></view>
          </view>
      </view>
      <view class="car_content" v-for="(item,index) in list" :key='index' @tap="choice(item)">
          <view class="car_header">{{item.car_num}}</view>
          <view class="car_content_box">
              <image :src="item.vehicle.brand.url"></image>
                <view class="car_title">
                    {{item.sales_name}}
                </view>
              <view class="car_content_right" @tap="edit(item.id)" v-if="!type">
                  编辑
              </view>
          </view>
          <view class="car_bottom" v-if="!type">
              <view class="radios_box">
                  <radio class="radios" color="#FDCE33"></radio>
                  <span>设为默认</span>
              </view>
              <view><i class="iconfont icon-lajitong " style="font-size:50rpx;" @tap="deleteCar(item.id,index)"></i></view>
          </view>
      </view>
      <view class="span24 car_add" @tap="toAddCar">+ 添加车辆</view>
  </view>
</template>
<script>
import {UserModel} from "../../model/user";
import { deflate } from 'zlib';
const  userModel = new UserModel()
export default {
  data() {
    return {
        list:[],
        options:{}
    };
  },
  methods: {
      car_check(){
          uni.navigateTo({
              url:'/pagesA/yearly_inspection/yearly_inspection'
          })
      },
      _getCar(){
          userModel.getCars().then((res) => {
            if(res.code < 400) {
                this.list = res.data
            }
          })
      },
      toAddCar(){
          uni.navigateTo({url:'/pagesA/my_add_car/my_add_car'})
      },
      deleteCar(id,index){
          let params = {
            car_id:id
          }
          userModel.deleteCar(params).then((res) => {
              uni.showToast({
                  title:res.message,
                  icon:'none'
              })
              console.log(res)
              if (res.code == 204) {
                  this.list.splice(index,1)
                  console.log('splice')
              }
          })
      },
      choice(item)
      {   
          console.log(this.options.type)
          switch(this.options.type) {
              case 'manual':
              case 'violation_enquiry':
              case 'car_check':
                uni.setStorageSync('choice_car',JSON.stringify(item))
                uni.navigateBack()
              break;
          }
      },
      edit(id)
      {
          console.log(`/pagesA/my_add_car/my_add_car?car_id=` + id)
          uni.navigateTo({
              url:`/pagesA/my_add_car/my_add_car?car_id=` + id
          })
      }
  },
  components: { },
  onLoad: function(options) {
      this.options = options
  },
  onShow: function() {
      this._getCar()
  },
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.mycar{
    padding: 24rpx;
    margin-bottom:100rpx;
}
.car_title{
    width: 327rpx;
    font-size:26rpx;
}
.mycar-lj{
    padding: 20rpx 33rpx;
    background: white
}
.mycar-lj-ico {
    align-items: center
}
.mycar-lj-ico image{
    height: 27rpx;
    width: 34rpx
}
.mycar-lj-rtr image{
    height: 25rpx;
    width: 20rpx;
    text-align: end
}
.mycar-lj-rtr{
    align-items: center;
    justify-content: flex-end
}
.mycar-lj-tt{
    font-size: 30rpx
}
.car_content{
    margin-top: 22rpx;
    width: 100%;
padding-bottom: 20rpx;
    background: #fff;
}
.car_content_box image{
    margin-left: 27rpx;
    width: 103rpx;
    height: 101rpx;
    margin-right: 52rpx;
}
.car_content_box{
    display: flex;
    flex-direction: row;
    margin-top: 24rpx;
}
.car_header{
    margin-top: 25rpx;
    margin-left: 31rpx;
    font-size:32rpx;
}
 .car_content_right{
     flex: 1;
     text-align: right;
     padding-right: 23rpx;
 }
 .car_bottom{
     margin-top: 20rpx;
     display: flex;
    flex-direction: row;
     align-items: center;
     padding:0 35rpx;
    justify-content: space-between;
 }
.car_bottom .iconfont{
    color: #999 !important;
}
.radios_box{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.car_add{
    height: 97rpx;
    background: white;
    color: #fdd000;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
    font-size: 30rpx;
    align-items: center;
    justify-content: center
}
</style>
