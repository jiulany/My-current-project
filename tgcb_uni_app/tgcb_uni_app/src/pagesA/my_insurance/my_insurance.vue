<template>
    <view style="padding-bottom:200rpx">
        <view v-for="(item,index) in list" :key="index">
            <!-- <view class="top">
                <text>成都太平保险（限5.20-5.21活动）</text>
            </view> -->
            <view class="time">
                <view class="left">
                    <text>购买时间</text>
                    <text>{{item.start_time}}</text>
                </view>
                <view class="right">
                    <text>到期时间</text>
                    <text>{{item.end_time}}</text>
                </view>
            </view>
            <view class="shop">
                <text>{{item.car_num}}</text>
                <text>购买险种</text>
            </view>
            <view class="list">
                <view v-for="(value,key) in item.details" :key="key">
                    <img :src="value.type_info.image" alt="">
                    <text>{{value.type_info.name}}</text>
                    <!-- <text class="active">（车损险）</text> -->
                </view>
                <!-- <view>
                    <img src="https://imgcdn.tuogouchebao.com/daoqiexian@2x.png" alt="">
                    <text>车辆盗窃险</text>
                    <text class="active">（盗窃险）</text>
                </view>
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/zuoweixian@2x.png" alt="">
                    <text>车上人员责任险</text>
                    <text class="active">（座位险）</text>
                </view>
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/posuixian@2x.png" alt="">
                    <text>玻璃单独破碎险</text>
                    <text class="active">（破碎险）</text>
                </view>
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/bujimianpei@2x.png" alt="">
                    <text>不计免赔</text>
                </view>
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/jiaoqiangxian@2x.png" alt="">
                    <text>交强险</text>
                </view>
                <view>
                    <img src="https://imgcdn.tuogouchebao.com/50w%20%20sanzhexian@2x.png" alt="">
                    <text>第三者责任险</text>
                    <text class="active">（三者险50万）</text>
                </view> -->
            </view>
            <view class="bottom" @tap="toAdd">+添加保险</view>
        </view>
    </view>
</template>

<script>
import { IndexModel } from "../../model/index";
const indexModel = new IndexModel();
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      flag: true
    };
  },
  methods: {
    toAdd() {
      uni.navigateTo({
        url: `/pagesA/my_insurance_add/my_insurance_add`
      });
    },
    userInsuranceList() {
      let params = {
        page: this.page,
        size: this.size
      }
      indexModel.userInsuranceList(params).then(res => {
        if(res.code == 200) {
          this.list = this.list.concat(res.data);
          if(res.data.length == 0) {
            this.flag = false
          }else {
            this.flag = true
            this.page = this.page + 1;
          }
        }
      });
    }
  },
  onLoad() {
    this.userInsuranceList();
  },
  onReachBottom() {
    if(this.flag == true) {
      this.userInsuranceList();
    }
  }
};
</script>

<style>
page {
  background: #fff;
}
.top {
  width: 100%;
  color: #333;
  font-size: 30rpx;
  padding: 34rpx 0 0 38rpx;
}
.time {
  width: 100%;
  height: 140rpx;
  background: #fdd000;
  margin-top: 20rpx;
  text-align: center;
}
.left {
  float: left;
  width: 50%;
  height: 100%;
  border-right: 1px solid #fff;
}
.right {
  float: right;
  width: 49%;
  height: 100%;
}
.time text {
  display: block;
}
.time .left text:nth-child(1),
.time .right text:nth-child(1) {
  font-size: 36rpx;
  margin-top: 20rpx;
  font-weight: 500;
}
.time .left text:nth-child(2),
.time .right text:nth-child(2) {
  font-size: 30rpx;
  color: #333;
  font-weight: 400 !important;
}
.shop {
  width: 100%;
  height: 92rpx;
  padding: 42rpx 0 0 38rpx;
}
.shop text:nth-child(1) {
  font-size: 36rpx;
}
.shop text:nth-child(2) {
  font-size: 30rpx;
  margin-left: 30rpx;
  vertical-align: 6%;
}
.list view {
  width: 100%;
  height: 97rpx;
  font-size: 32rpx;
  color: #333;
}
.list view img {
  display: inline-block;
  width: 38rpx;
  height: 36rpx;
  padding: 0 30rpx 0 32rpx;
  vertical-align: middle;
}
.list .active {
  color: #636363;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 98rpx;
  background: #fdd000;
  font-size: 36rpx;
  color: #474747;
  font-weight: bold;
  text-align: center;
  line-height: 98rpx;
}
</style>