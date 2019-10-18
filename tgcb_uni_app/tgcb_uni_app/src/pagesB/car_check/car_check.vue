<template>
    <view class="car_check">
        <view class="car_check_box">
            <view class="car_select" @click="_cars">切换车辆</view>
            <view class="car_select_left" @click="_record">年检记录</view>
            <view class="car_check_box_img">
                <image :src="choose_car.vehicle.brand.url"></image>
            </view>
            <view class="car_name">{{choose_car.car_num}}</view>
            <view v-if="choose_car.register_time" style="font-size:36rpx;color:#333333;">车辆注册日期：{{choose_car.register_time}}</view>
            <view v-if="!choose_car.register_time" class="footer" @tap="subscribe(choose_car.is_perfect)">立即预约车辆年检</view>
            <view class="footer_desc" @click="_perfect" v-if="need_perfect">资料未完善，请先完善资料</view>
        </view>
        <view class="can_review" v-if="choose_car.register_time">
            <view class="can_review_title">可预约办理年检</view>
            <view class="item-label">年检类型</view>
            <view class="item-val">{{choose_car.msg}}</view>
            <view class="item-label">年检时间</view>
            <view class="item-val">{{choose_car.start_time}}-{{choose_car.end_time}}</view>
            <view class="to-add" @tap="toAdd">去预约办理</view>
        </view>
    </view>
</template>

<script>
import { UserModel } from "../../model/user";
const userModel = new UserModel();
export default {
  name: "car_check",
  data() {
    return {
      user_cars: [],
      choose_car: {},
      need_perfect: false
    };
  },
  methods: {
    _cars() {
      uni.navigateTo({
        url: "/pagesA/my_car/my_car?type=car_check"
      });
    },
    _record() {
      uni.navigateTo({
        url: "/pagesA/yearly_inspection/yearly_inspection"
      });
    },
    _perfect() {
      uni.navigateTo({
        url: "/pagesB/car_add/car_add?car_id=" + this.choose_car.id
      });
    },
    _getUserCar() {
      userModel.getCars().then(res => {
        let data = res.data;
        if (data.length <=0 ) {
            uni.navigateTo({
              url : `/pagesB/car_check/car_check_add`
            })
        }
        this.user_cars = data;
        this.choose_car = data[0];
        console.log(this.choose_car);
      });
    },
    subscribe(is_perfect) {
      if (is_perfect == 0) {
        this.need_perfect = true;
        return false;
      }
    },
    toAdd(){
        uni.redirectTo({
            url: "/pagesB/car_check/car_add?car_id=" + this.choose_car.id
         });
    },
    
  },
  onLoad() {
    uni.setStorageSync("choice_car","");
  },
  onShow() {
    
    this.need_perfect = false
    let choice_car = uni.getStorageSync("choice_car");
    if (choice_car) {
      this.choose_car = JSON.parse(choice_car);
      console.log(this.choose_car);
    } else {
      this._getUserCar();
    }
  }
};
</script>

<style lang="less">
.car_check {
  background: rgba(255, 255, 255, 1);
     
  .car_check_box {
    padding-bottom: 73rpx;
    margin-top: 20rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .car_check_box_img {
    margin-top: 47rpx;
    display: block;
    padding-top: 20rpx;
    width: 200rpx;
    height: 200rpx;
    position: relative;
  }
  .car_check_box_img image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
  }
  .car_name {
    // margin-top: 43rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .footer {
    text-align: center;
    line-height: 68rpx;
    width: 455rpx;
    height: 68rpx;
    background: rgba(253, 208, 0, 1);
    border-radius: 32rpx;
    font-size: 32rpx;
    margin-top: 99rpx;
    color: rgba(255, 255, 255, 1);
  }
  .car_select {
    font-size: 32rpx;
    color: rgba(253, 208, 0, 1);
    position: absolute;
    top: 21rpx;
    right: 35rpx;
  }
  .car_select_left {
    font-size: 32rpx;
    color: rgba(253, 208, 0, 1);
    position: absolute;
    top: 21rpx;
    left: 35rpx;
  }
  .footer_desc {
    text-align: center;
    color: #fdd000;
    margin-top: 46rpx;
    font-size: 24rpx;
  }
//   可年检
  .can_review {
      text-align: center;
      padding-bottom: 70rpx;
      .can_review_title{
          width: 100%;
          height: 68rpx;
          line-height: 68rpx;
          background: #FDD000;
          color:#ffffff;
      }
      .item-label{
          font-size: 24rpx;
          color:#666666;
          margin-top: 66rpx;
      }
      .item-val{
          color: #333333;
          font-size: 30rpx;
      }
      .to-add{
          width:455rpx;
          height:68rpx;
          line-height: 68rpx;
          background:rgba(253,208,0,1);
          border-radius:32rpx;
          margin: 209rpx auto;
          color:#ffffff;
      }
  }
}
</style>