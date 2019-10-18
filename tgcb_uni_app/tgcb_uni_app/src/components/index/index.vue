<template>
    <scroll-view scroll-y style="height: 100vh;">
      <!-- 地址 -->
      <view class="inx-ads span24" @tap="changeShop">
        <view class="inx-ads-it span2" style="justify-content:center">
          <i  class="iconfont" ></i>
        </view>
        <view class="inx-ads-it span3" style="font-size:30rpx;font-weight:bold">成都</view>
        <view class="inx-ads-it span15" v-if="shop">最近店铺：{{shop['name']}}</view>
        <view class="inx-ads-it span1">
          <i  class="iconfont" ></i>
        </view>
        <view class="inx-ads-it span3" style="justify-content:center" v-if="shop">{{shop['distance']}}KM</view>
      </view>
      <!-- 轮播 -->
      <view class="inx-bnr" style="width:100%;">
        <uni-swiper-dot
          :info="list.banners"
          :current="current"
          field="content"
          :mode="mode"
          :dotsStyles="dotsStyles"
        >
          <swiper class="swiper-box" @change="change">
            <swiper-item v-for="(item ,index) in list.banners" :key="index">
              <view class="swiper-item">
                <img :src="item.image" :alt="item.title" />
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
      <!-- 功能 -->
      <view class="icons">
        <view class="icon_item" v-for="(item,index) in list.icons" @tap="icon_url(item.url)" :key="index">
          <image :src="item.image"></image>
          <view>{{item.name}} </view>
        </view>
      </view>
      <!-- 活动-->
      <view class="span24 inx-hdong">
        <view class="span24 activities_title">
          <image :src="activities_title.image"></image>
        </view>
        <view class="span24 active_box">
          <view class="active_box_item" v-for="(item,index) in activities.content" @click="active(item.url)" :key="index">
            <image :src="item.image"></image>
          </view>

        </view>
      </view>
      <!-- 购车专场 -->
      <view class="span24 car_shop">
        <view  v-for="(item,index) in list.others" :key="index" v-if="index < 3" class="car_shop_item1" @click="car_shop(item.url)">
          <view class="car_shop_box">
            <image :src="item.image"></image>
            <view class="car_shop_box_title">
              {{item.title}}
            </view>
            <view class="car_shop_box_desc">
              {{item.subtitle}}
            </view>
          </view>
        </view>

      </view>
      <!--保养-->
      <view class="span24 maintain">
        <view class="maintain_item" v-for="(item,index) in list.others" :key="index" v-if="index > 2" @click="car_shop(item.url)">
          <image :src="item.image"></image>
          <view class="maintain_item_desc">{{item.title}}</view>
        </view>
      </view>

      <view class="inx-bottomtp" v-if="list.ad">
        <img :src="list.ad.image">
      </view>


     <view class="discount" v-show="discount">
      <view class="discount_box">
        <image src="https://imgcdn.tuogouchebao.com/tankuang.png"></image>
      </view>
      <view class="icon" @click="close_discount()">
        <i class="iconfont icon-guanbi"></i>
      </view>
    </view>
    </scroll-view>

</template>
<script>
  import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import { uniSwiperDot } from "@dcloudio/uni-ui";
  import {IndexModel} from "../../model";
  const  indexModel = new IndexModel()
export default {
  name:'index',
  props:{
    list:{
      type:Object
    },
    activities:{
      type:Object
    },
    activities_title:{
      type:Object
    },
    shop:{
      type:Object
    },
  },
  data() {
    return {
      discount:false,
      current: 0,
      mode: "long",
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
      },
      
    };
  },
  methods: {
    // 调用接口
    _getIndex(){
      indexModel.getIndex().then((res) => {
        if(res.data) {
          this.list = res.data
        }
      })
    },
    // 关闭打折
    close_discount(){
      this.discount = false
    },
    //icon跳转
    icon_url(url){
      uni.navigateTo({
        url
      });
    },
    // 美容包年
    active(url){
      if(url == "") {
        this.discount = true
      } else {
        uni.navigateTo({
          url
        });
      }

    },
    // 购买车
    car_shop(url){
      console.log(url)
      uni.navigateTo({
        url
      });
    },
    change(e) {
      this.current = e.detail.current;
    },
    park_emergency() {
      uni.navigateTo({
        url: "/pages/park_emergency/park_emergency"
      });
    },
    cosmetology() {
      uni.navigateTo({
        url: "/pages/cosmetology/cosmetology"
      });
    },
    changeShop()
    {
      uni.navigateTo({
        url:`/pagesB/choice_store/choice_store`
      })
    }
  },
  components: {
    uniSwiperDot,
    uniNavBar
  },
  // onLoad: function() {
  //   console.log('onLoadindex')
  //   this._getIndex()
  // },
  // onShow: function() {
  //   uni.hideTabBar();
  // },
  // onHide: function() {},
  mounted(){
    
  },
  watch:{
    list(val){
      console.log(val)
    },
    activities(val){
      console.log(val)
    }
  }
};
</script>

<style>
page {
  background-color: #ffffff;
  height: 100%;
}
.icon_item{
  width: 180rpx;
  margin-top: 25rpx;
  font-size:26rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon_item image{
  height: 75px !important;
  width: 76px !important;
}

.inx-ads {
  padding: 10rpx 0rpx;
  display: flex;
  align-items: center;
}
.inx-ads-it {
  font-size: 25rpx;
}

.inx-bnr .swiper-item {
  height: 100%;
  width: 100%;
}
.inx-bnr .swiper-item img {
  height: 100%;
  width: 100%;
}


.inx-hdong-tt {
  justify-content: center;
  font-size: 36rpx;
  font-weight: 600;
  padding: 70rpx 0 10rpx 0;
}

.activities_title{
  width: 326rpx;
  height: 76rpx;
  margin: 40rpx auto;
}

.activities_title image{
  width: 100%;
  height: 100%;
}
.active_box{
  margin-top: 10rpx;
  padding: 0 10rpx;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
}
.active_box_item{
  width: 336rpx;
  height:160rpx;
  background:rgba(255,255,255,1);
  box-shadow:0rpx 2rpx 16rpx 0rpx rgba(218, 218, 218, 0.35);
  border-radius:10rpx;
  text-align: center;
  margin-bottom: 26rpx;
}
.active_box_item image{
  width: 334rpx;
  height:150rpx;
}
  .car_shop{
    padding-left: 33rpx;
    padding-right: 26rpx;
    display: flex;
    flex-direction: row;
    padding-top: 113rpx;
    justify-content: space-between;
    margin-bottom: 29rpx;
  }

  .car_shop .car_shop_item1:first-child image{
    width:156rpx;
    height:146rpx;
  }
.car_shop .car_shop_item1:nth-child(2) image{
  width:154rpx;
  height:146rpx;
}
.car_shop .car_shop_item1:last-child image{
  width:187rpx;
  height:146rpx;
}
  .car_shop_box_title{
    text-align: center;
    font-size:32rpx;
    color:rgba(102,102,102,1);
  }
  .car_shop_box_desc{
    font-size:24rpx;
    text-align: center;
    color:rgba(153,153,153,1);
  }
  .maintain{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 33rpx;
    padding-right: 54rpx;
    margin-bottom: 75rpx;

  }
  .maintain_item,.maintain_item image{
    width: 146rpx;
  }
.maintain_item image{
  height: 145rpx;
  margin-bottom: 30rpx;
}
  .maintain_item_desc{
    text-align: center;
    color: #666666;
  }
  .discount{
    position: fixed;
    background:rgba(0,0,0,0.3);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .discount_box{
    width: 658rpx;
    margin: 0 auto;
    margin-top: 228rpx  ;
  }
  .discount_box image{
    height: 552rpx;
    width: 658rpx;
  }
  .icon{
    width: 200rpx;
    height: 150rpx;
    margin: 0 auto;
    text-align: center;
    line-height: 150rpx;
  }
  .icon-guanbi{
    font-size: 45px;
    color: #fff;
  }
  .table{
    display: flex;
    flex-direction: row;
  }
  .icons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

.inx-bottomtp{
  width: 100%;
  height: 200rpx;
  margin-bottom: 200rpx;
}
.inx-bottomtp img{
  height: 200rpx;
  width: 100%;
}
</style>

