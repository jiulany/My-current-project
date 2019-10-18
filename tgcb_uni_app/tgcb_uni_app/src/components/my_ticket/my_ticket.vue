<template>
  <view>
    <view class="myticket-ct" v-for="(item,index) in list" v-if="list.length > 0" :key="index" >
        <view class="span24 myticket-it1" v-if="item.coupons.type == 4" @tap="choice(item.id)">
          <view class="myticket-it-bg">
            <image src="https://imgcdn.tuogouchebao.com/coupon_kapian.png"></image>
          </view>
          <view class="span24 myticket-it1-row1">
            <view class="span20 myticket-it1-nm">{{item.coupons.name}}</view>
            <view class="span4 myticket-it1-tm">有效</view>
          </view>
          <view class="span24 myticket-it1-row2">
            <view
              class="span12 myticket-it1-used"
              v-for="(value,key) in item.details"
            :key="key">{{value.sku.sku_name ? value.sku.sku_name : '未知'}}：{{value.number}}/已用{{value.use_number}}</view>
        
          </view>
          <view class="span24 myticket-it1-row3">
            <view class="span14 myticket-it1-limit">有效期2019.01.08 - 2020.01.08</view>
            <view class="span10 myticket-it1-carnum">绑定车牌：{{item.car_num}}</view>
          </view>
        </view>
        <view class="span24 myticket-it" v-else  @tap="choice(item.id,item.is_usable)">
          <view class="span24">
            <view class="span18 myticket-ty">{{item.coupons.name}}</view>
            <view class="span6 myticket-jg">{{item.sku.price.price ? `￥` + item.sku.price.price : ''}}</view>
          </view>
          <view class="span24">
            <view class="span18 myticket-tm">有效日期：{{item.start_time}}-{{item.end_time}}</view>
            <view class="span6 myticket-limit">无门槛</view>
          </view>
          <view class="span24">
            <view class="span24 myticket-adr">车辆车牌：{{item.car_num}}</view>
          </view>
          <view class="span24 myticket-line"></view>
          <view class="span24">
            <view class="span18 myticket-avl">年度会员类仅可抵扣{{item.coupons.name}}订单</view>
            <view class="span6 myticket-btn">
              <view class="myticket-use" v-if="item.is_usable == 1">立即使用</view>
              <view class="myticket-used" v-if="item.is_usable == 0">已使用</view>
              <view class="myticket-used" v-if="item.is_usable == 2">暂不能使用</view>
              <view class="myticket-used" v-if="item.is_usable == 3">已过期</view>
              <view class="myticket-used" v-if="item.is_usable == 4">不可使用</view>
            </view>
          </view>
          <view class="myticket-it-lft"></view>
          <view class="myticket-it-rht"></view>
        </view>
    </view>
    <view class="myticket-ct" v-else>
        <no-data title="暂无卡券" ></no-data>
    </view>
  </view>
</template>
<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import { uniSwiperDot } from "@dcloudio/uni-ui";
import { IndexModel } from "../../model";
import noData from "@/components/noData/noData"
const indexModel = new IndexModel();
export default {
  name: "index",
  props: {
    list: {
      type: Array
    },
  },
  data() {
    return {
     
    };
  },
  methods: {
    choice(coupon_id,is_usable){
      console.log(coupon_id)
      this.$emit('choice',coupon_id,is_usable)
    }
  },
  components: {
    noData
  },
  watch: {
    list(val) {
      console.log(val);
    },
  }
};
</script>

<style>

</style>

