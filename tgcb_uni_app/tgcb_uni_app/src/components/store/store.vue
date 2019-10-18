<template>
    <view class="store">
        <map
            style="width: 100%; height: 100%;"
            :latitude="latitude"
            :longitude="longitude"
            scale="10"
            :markers="markers"
        ></map>
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
</style>
