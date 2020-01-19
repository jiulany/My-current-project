<template>
  <view class="span24">
    <view class="nopark-mdl">
      <uni-popup ref="popup" type="bottom">
        <view class="span24 nopark-mdl-box">
          <phoneDirectory
            @close="closeModel"
            style="width:100%"
            :phones="car_brands"
            @paramClick="clickBrands"
          ></phoneDirectory>
        </view>
      </uni-popup>
    </view>
    <luPopupWrapper
      ref="luPopupWrapper"
      type="right"
      transition="slider"
      backgroundColor="#fff"
      width="60%"
      :active="active"
      :closeCallback="closeCallback"
    >
    <view class="span24"  v-if="step===1">
      <view class="span24 carmodel-it" @tap="clickCarModel(item,$event)" v-for="item in car_model" :key="item.id" >
          <view class="span6 carmodel-image"><image  mode="aspectFit" :src='item.url'></image></view>
          <view class="span18 carmodel-ms">{{item.vehicle}}</view>
      </view>
    </view>
    <view class="span24"  v-if="step===2">
      <view class="span24 carmodel-it" @tap="clickCarDetails(item,$event)" v-for="item in car_details" :key="item.id">
          <view class="span24 carmodel-ms">{{item.sales_name}}</view>
      </view>
    </view>
    </luPopupWrapper>
  </view>
</template>

<script>
import { uniPopup } from "@dcloudio/uni-ui";
import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
import phoneDirectory from "@/components/phone-directory/phone-directory.vue";
export default {
  name: "modal",
  props: {
    openSele: {
      type: Boolean
    }
  },
  data() {
    return {
        car_brands:{},
        car_model:[],
        car_details:[],
        first_id:null,
        ms:null,
        second_id:null,
        third_id:null,
        step:null
    };
  },
  watch: {
    openSele(val) {
      if (val) {
        this.$refs.popup.open();
        this.$http({ url: "api/car_brands",data:{}})
          .then(res => {
            this.car_brands = res.data;
          })
          .catch(res => {});
      } else {
        this.$refs.popup.close();
      }
    }
  },
  methods: {
      closeModel(){
          this.$emit("closeModel")
      },
      clickBrands(e){
          this.car_model=[]
          this.$refs.luPopupWrapper.show()
          this.step=1
          this.first_id=e.id
          this.$http({ url:`api/car_vehicles/${e.id}`,data:{}})
          .then(res => {
          this.car_model=res.data
          })
          .catch(res => {});
      },
      clickCarModel(item,e){
          this.car_details=[]
          this.step=2
          this.second_id=item.id
          this.ms=item.vehicle
          this.$http({ url: `api/car_equipmens/${item.id}`,data:{}})
          .then(res => {
              this.car_details=res.data
          })
          .catch(res => {});
      },
      clickCarDetails(item,e){
          this.third_id=item.id
          this.ms=this.ms+item.sales_name
          this.$emit("seleEnd",{ms:this.ms,first_id:this.first_id,second_id:this.second_id,third_id:this.third_id})
          this.$refs.luPopupWrapper.close();
          this.closeModel()
      }
  },
  components: { uniPopup, phoneDirectory, luPopupWrapper }
};
</script>

<style>
.carmodel-image > image{
    width:80rpx;
    height: 80rpx;
}
.carmodel-it{
    padding:20rpx 0 20rpx 20rpx;
    font-size: 34rpx;
    border-bottom: 1rpx solid #f5f5f5
}
.carmodel-ms{
    font-size: 32rpx
}
</style>
