<template>
    <view class="store">
        <map
            style="width: 100%; height: 100%;"
            :latitude="latitude"
            :longitude="longitude"
            scale="10"
            :markers="markers"
        >
        <cover-view class="span24 tab-bar">
    <!-- 首页 -->
    <cover-view v-if="address==0" class="span5" @tap="toIndex">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/index_active.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-tt" >首页</cover-view>
    </cover-view>
    <cover-view v-else class="span5" @tap="toIndex">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/index.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-no-tt">首页</cover-view>
    </cover-view>
    <!-- 门店 -->
     <cover-view v-if="address==1" class="span5" @tap="toStore">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/shop_active.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-tt" >门店</cover-view>
    </cover-view>
    <cover-view v-else class="span5" @tap="toStore">
      <cover-view class="span24 tab-bar-img" >
        <cover-image  src="https://imgcdn.tuogouchebao.com/shop.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-no-tt">门店</cover-view>
    </cover-view>
    <!-- 洗车 -->
    <cover-view v-if="address==2" class="span4" @tap='toCarWash'>
      <cover-view class="span24 tab-bar-img" >
        <cover-image class="tab-bar-img-tuqi"  src="https://imgcdn.tuogouchebao.com/tab_sle_xiche.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-tt">洗车</cover-view>
    </cover-view>
     <cover-view v-else class="span4" @tap='toCarWash'>
      <cover-view class="span24 tab-bar-imgxiche"  >
        <cover-image  class="tab-bar-img-tuqi"   src="https://imgcdn.tuogouchebao.com/tab_sle_xiche.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-no-tt" >洗车</cover-view>
    </cover-view>
    <!-- 商城 -->
    <cover-view v-if="address==3" class="span5" @tap="toMall">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/shoping_mall_active.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-tt" >商城</cover-view>
    </cover-view>
    <cover-view v-else class="span5" @tap="toMall">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/shoping_mall.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-no-tt" >商城</cover-view>
    </cover-view>
    <!-- 我的 -->
    <cover-view v-if="address==4" class="span5" @tap="toMy">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/my_active.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-tt">我的</cover-view>
    </cover-view>
    <cover-view v-else class="span5" @tap="toMy">
      <cover-view class="span24 tab-bar-img">
        <cover-image  src="https://imgcdn.tuogouchebao.com/my.png"></cover-image>
      </cover-view>
      <cover-view class="span24 tab-bar-no-tt" >我的</cover-view>
    </cover-view>
  </cover-view>
        
        </map>
        <cover-view class="store_top">
            <cover-view class="store_top_items" @tap="_choice_store">选择门店</cover-view>
            <cover-view class="store_top_items" @tap="_lately">离我最近</cover-view>
            <cover-view class="store_top_items" @tap="_navigation">导航</cover-view>
        </cover-view>
    </view>
</template>

<script>
import {IndexModel} from "../../model";
const  indexModel = new IndexModel()
export default {
  name: "store",
  data() {
    return {
      title: "map",
      shops:[],
      latitude: 30.674958,
      longitude: 104.064283,
      address:1,
      markers: [
        // {
        //   iconPath: "https://imgcdn.tuogouchebao.com/location_logo@2x.png",
        //   id: 0,
        //   latitude: 30.689928,
        //   longitude: 104.049478,
        //   width: 24,
        //   height: 35,
        // },
        // {
        //   id: 1,
        //   latitude: 30.689928,
        //   longitude: 104.049478,
        //   iconPath: "https://imgcdn.tuogouchebao.com/location_logo@2x.png",
        //   width: 24,
        //   height: 35,
        // },
      ]
    };
  },
  components: {},
  methods: {
     toMy(e) {
     
      uni.switchTab({
        url: "/pages/my/my"
      });
    },
    toStore(){
       console.log('store')
      uni.switchTab({
        url: "/pages/store/store"
      });
    },
    toCarWash(){
      uni.switchTab({
        url:'/pages/car_wash/car_wash'
      })
    },
    toIndex() {
      uni.switchTab({
        url: "/pages/index/index"
      });
    },
     toMall() {
      uni.switchTab({
        url: "/pages/mall/mall"
      });
    },
    _choice_store() {
      uni.navigateTo({
        url: "/pagesB/choice_store/choice_store"
      });
    },
    _lately() {
      uni.navigateTo({
        url: "/pagesB/lately/lately"
      });
    },
    _navigation() {
      let self = this
      uni.openLocation({
        latitude: parseFloat(self.shops[0].latitude),
        longitude: parseFloat(self.shops[0].longitude),
        name: self.shops[0].name,
        address: self.shops[0].address,
        success: function() {
          console.log("success");
        }
      });
    }
  },
  mounted(){
      let self = this
      uni.getLocation({
          type: 'wgs84',
          success: function (res) {
              let params = {
                  longitude:res.longitude,
                  latitude:res.latitude,
              }
              indexModel.getShopList(params).then((res) => {
                  self.shops = res.data
                  for(let item of self.shops) {
                    self.markers.push({
                        iconPath :"https://imgcdn.tuogouchebao.com/location_logo@2x.png",
                        width:24,
                        height:35,
                        longitude:item.longitude,
                        latitude:item.latitude,
                    })
                  }
                  self.markers.push({
                    width:24,
                    height:35,
                    iconPath:'https://imgcdn.tuogouchebao.com/location_icon.png',
                    longitude:params.longitude,
                    latitude:params.latitude,
                  })
              })
          }
      }); 

    
  }
};
</script>

<style scoped>
.store {
  width: 100%;
  height: 100%;
  position: relative;
}
.store_top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 32rpx;
  text-align: center;
  justify-content: space-between;
}
.store_top_items {
  flex: 1;
  line-height: 100rpx;
  border-right: solid 1rpx #f5f5f5;
  height: 100rpx;
}
.store_top_items:last-child {
  border-right: none;
}
.active {
  background: #fbcc31;
}
.tab-bar {
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #f5f5f5;
  padding: 13rpx 0;
  padding-bottom: 4rpx
}
.tab-bar-tt {
  justify-content: center;
  font-size: 25rpx;
  color: #fdd000;
  padding: 8rpx 0;
  text-align: center
}
.tab-bar-no-tt {
  justify-content: center;
  font-size: 25rpx;
  color: #999999;
  text-align: center
}
.tab-bar-img {
  justify-content: center;
  position: relative;
  height: 50rpx;
  overflow: visible;
}
.tab-bar-imgxiche {
  justify-content: center;
  position: relative;
  overflow: visible;
}
.tab-bar-img cover-image {
  width: 50rpx;
  height: 49rpx;
}
.tab-bar-img-tuqi {
  width: 91rpx !important;
  height: 91rpx !important;
  z-index: 999999;
  position: fixed;
  bottom: 52rpx;
}
</style>
