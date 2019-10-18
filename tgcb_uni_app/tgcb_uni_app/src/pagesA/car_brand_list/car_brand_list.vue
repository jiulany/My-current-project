<template>
    <view>
        <uni-indexed-list :options="list" :show-select="false" @click="choiceBrand" v-if="showList"></uni-indexed-list>
        
        <uni-drawer :visible="visible" mode="right" @close="close"> 
            <scroll-view  style="width:100%;padding:40upx;height:100%;box-sizing: border-box;overflow-y:auto;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
               
               <!-- 车型号 -->
                <view class="brand-title" v-if="type == 'vehicles'">
                    <view class="brand-logo-box">
                        <image class="brand-logo-image" :src="brand_logo"></image>
                    </view>
                    <view>
                        {{brand_name}}
                    </view>
                </view>

                <view v-for="(item,index) in vehiclesData" :key="index">
                  <view v-if="type == 'vehicles'">
                      <view class="vehicle-item-title">{{index}}</view>
                      <view class="vehicle-item" v-for="(value,key) in item" :key="key" @tap="choiceVehicles(value.id,value.vehicle)">
                          {{value.vehicle}}
                      </view>
                  </view>
                </view>

                <!-- 排量 -->
                <view v-for="(item,index) in vehiclesData" :key="index">
                  <view v-if="type == 'displacement'">
                      <view class="vehicle-item" v-for="(value,key) in item.displacements" :key="key" @tap="choiceDisplacement(item.product_id,value)">
                          {{value}}
                      </view>
                  </view>
                </view>

                <!-- 年限 -->
                <view v-for="(item,index) in vehiclesData" :key="index">
                  <view v-if="type == 'term'">
                      <view class="vehicle-item" v-for="(value,key) in item.terms" :key="key" @tap="choiceTerm(item.product_id,item.displacement,value)">
                          {{value}}
                      </view>
                  </view>
                </view>

                <!-- 配置 -->
                <view v-for="(item,index) in vehiclesData" :key="index">
                  <view v-if="type == 'equipmen'" @tap="choiceEquipmen(item)">
                      <view class="vehicle-item">
                          {{item.sales_name}}
                      </view>
                  </view>
                </view>

                

             

            </scroll-view>
        </uni-drawer>
    </view>
</template>

<script>
import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";

import airport from "@/common/airport.js";
import { CarModel } from "../../model/car.js";
const carModel = new CarModel();
export default {
  data() {
    return {
      //   list: airport.list
      list: [],
      showList: false,
      visible: false,
      vehiclesData: [],
      brand_id: 0,
      brand_logo:'',
      brand_name:'',
      type:'vehicles',
    };
  },
  components: {
    uniIndexedList,
    uniDrawer
  },
  methods: {
    choiceBrand(e) {
      // console.log("点击item，返回数据" + JSON.stringify(e));
      // uni.setStorageSync("choice_brand", JSON.stringify(e.item));
      this.brand_id = e.item.brand_id
      this.brand_logo = e.item.logo
      this.brand_name = e.item.name
      this.type = 'vehicles'
      this.vehiclesBrand();
    },
    vehiclesBrand() {
      let params = {
        brand_id: this.brand_id
      };
      carModel.getVehicles(params).then(res => {
        this.vehiclesData = res.data;
        this.visible = true;
      });
    },
    choiceVehicles(vehicle_id,vehicle){
        // this.brand_name += vehicle
        let params = {
          vehicle_id: vehicle_id
        };
        carModel.getDisplacements(params).then(res => {
          this.vehiclesData = res.data;
          this.type = 'displacement'
        });
    },
    choiceDisplacement(product_id,displacement){
         let params = {
          product_id: product_id,
          displacement: displacement,
        };
        carModel.getTerm(params).then(res => {
          this.vehiclesData = res.data;
          this.type = 'term'
        });
    },
    choiceTerm(product_id,displacement,term){
        let params = {
          product_id: product_id,
          displacement: displacement,
          term: term,
        };
        carModel.getEquipmens(params).then(res => {
          this.vehiclesData = res.data;
          this.type = 'equipmen'
        });
    },
    choiceEquipmen(item){
        console.log(item)
        item.brand_name = this.brand_name
        uni.setStorageSync("choice_brand", JSON.stringify(item));
        uni.navigateBack()
    },
    getCarBrands() {
      carModel.getCarBrands().then(res => {
        let data = res.data;
        this.list = data;
        this.showList = true;
        console.log(this.list);
      });
    },
    close(){
        this.visible = false
        this.vehiclesData = [];
    }
  },
  onLoad() {
    this.getCarBrands();
  }
};
</script>

<style lang="less">
.vehicle-item-title{
    background: #e1e1e1;
    padding: 10rpx 0;
    text-align: center;
    color:#ffff;
}
.vehicle-item {
  padding: 30rpx 0;
  border-bottom: .1rpx solid #e1e1e1;
}
.brand-title{
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    .brand-logo-box{
        width: 80rpx;
        height: 80rpx;
        margin-right: 20rpx;
        .brand-logo-image{
            width: 100%;
            height: 100%;
        }
    }    
}

</style>