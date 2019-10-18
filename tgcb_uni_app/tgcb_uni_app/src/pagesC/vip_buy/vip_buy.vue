<template>
  <view>
    <!-- <view class="tab">
			<view class="selecttab">买前需知</view>
			<view>会员权益</view>
    </view>-->
    <wuc-tab
      :tab-list="tabList3"
      textFlex
      :tabCur.sync="TabCur3"
      tab-class="text-center text-black tab_h"
      select-class="bg-orange"
      tabStyle="height:100rpx;line-height:100rpx"
    ></wuc-tab>
    <swiper
      :current="TabCur3"
      class="swiper"
      duration="300"
      :circular="true"
      indicator-color="rgba(255,255,255,0)"
      indicator-active-color="rgba(255,255,255,0)"
      @change="swiperChange3"
      style="height:92vh;overflow: hidden"
    >
      <!-- 买前须知 -->
      <swiper-item>
        <view class="buy_old">
          <image :src="list.banners" class="showpic" />
          <view class="viplistbox">
            <block v-for="(item,index) in vals" :key="index">
              <view class="viplist" @click="_vip_list(item.id)">
                <view class="vl_left">
                  <view class="vip_left_box">
                    <view class="vip_lefts">
                      <view class="vip_left_box_title">
                        会员权益包
                      </view>
                      <view class="vip_left_box_desc">{{item.attr_value}}</view>
                    </view>
                    <image class="vip_left" src="https://imgcdn.tuogouchebao.com/quanyibao@2x.png"></image>
                  </view>
                  <view class="center_txt">
                    <view class="center_txt_top">
                      <text>{{item.one_sku.original_price}}元</text>
                      <text>会员权益</text>
                    </view>
                    <text class="center_txt_bottom">权益有效期{{item.one_sku.month}}个{{item.attr_value}}</text>
                  </view>
                </view>
                  <image v-if="item.checked"  src="https://imgcdn.tuogouchebao.com/gou.png" class="vl_right" />
                <image v-else  src="https://imgcdn.tuogouchebao.com/weixuanzhong@2x.png" class="vl_right" />
              </view>
            </block>
<!--            <button @tap="toPay" hover-class="none" class="paybtn">去支付</button>-->
          </view>
          <view class="park_what">
            <text class="pw_title">什么是应急停车</text>
            <view class="pw_con" v-html="list.text && list.text.text1">
              nbsp;
            </view>
          </view>
          <view class="total" v-if="list.text">
            <view  v-for="(item,index) in list.text.record" :key="index">
              <text>{{item.key}}</text>
              <text>{{item.value}}</text>
            </view>
          </view>
          <view class="explain">
            <text>使用说明</text>
            <view v-html="list.text.text2"></view>
            <text>@本功能最终解释权归脱狗车宝所有。</text>
          </view>
          <view class="over_h"></view>
        </view>
        </swiper-item>
        <!-- 会员权益 -->
        <swiper-item>
          <view class="vip_detail">
            <view class="center_con">
<!--              未过期会员-->
            <view class="vip_state_list" v-for="(item,index) in my_parking_cars" :key="index">
              <image v-if="item.parking_car.day_num > 0" src="https://imgcdn.tuogouchebao.com/kapian.png"></image>
              <image v-else src="https://imgcdn.tuogouchebao.com/kapian2.png"></image>
              <view class="vsl_con">
                <view class="vc_line_one">
                  <view class="vlo_left">
                    <text>车牌：</text>
                    <text>{{item.car_num}}</text>
                  </view>
                  <text v-if="item.parking_car.day_num > 0" class="vlo_right">已购买</text>
                  <text v-else class="vlo_right">未购买</text>
                </view>
                <view class="vc_line_two">
                  <view class="vltw_left">
                    <text>期限：</text>
                    <text v-if="item.parking_car.day_num > 0">2019.04.26-2019.07.26</text>
                    <text v-else>-</text>
                  </view>
                  <text v-if="item.parking_car.day_num > 0" class="vltw_right">有效</text>
                </view>
                <view class="vc_line_three">
                  <view class="vlth_left">
                    <text>停车次数：</text>
                    <text>24</text>
                    <text>报销次数：</text>
                    <text>5</text>
                  </view>
                  <view class="vlth_right">
                    <image src="../../static/img/juli@2x.png"></image>
                    <text v-if="item.parking_car.day_num > 0">续费</text>
                    <text v-else>购买</text>
                  </view>
                </view>
              </view>
            </view>
<!--              已过期会员-->
            <!-- <view class="vip_state_list">
                <image  src="https://imgcdn.tuogouchebao.com/kapian2.png"></image>
                <view class="vsl_con">
                  <view class="vc_line_one">
                    <view class="vlo_old_left">
                      <text>车牌：</text>
                      <text>川A342536</text>
                    </view>
                    <text class="vlo_old_right">未购买</text>
                  </view>
                  <view class="vc_line_two">
                    <view class="vltw_old_left">
                      <text>期限：</text>
                      <text>2019.04.26-2019.07.26</text>
                    </view>
                    <text class="vltw_old_right">已过期</text>
                  </view>
                  <view class="vc_line_three">
                    <view class="vlth_old_left">
                      <text>停车次数：</text>
                      <text>24</text>
                      <text>报销次数：</text>
                      <text>5</text>
                    </view>
                    <view class="vlth_right">
                      <image src="../../static/img/juli@2x.png"></image>
                      <text>续费</text>
                    </view>
                  </view>
                </view>
              </view>
          </view> -->

          <view @tap='toParkingRecord' class="list">
            <text>停车记录</text>
            <view class="iconfont icon-xiayibu"></view>
          </view>
          <view @tap='toVipState' class="list">
            <text>会员权益</text>
            <view class="iconfont icon-xiayibu"></view>
          </view>
          <view @tap='toExplain' class="list">
            <text>使用方法</text>
            <view class="iconfont icon-xiayibu"></view>
          </view>
          <view class="list" @tap="tpproblem">
            <text>常用问题</text>
            <view class="iconfont icon-xiayibu"></view>
          </view>
         </view>
          </view>
      </swiper-item>
    </swiper>
    <!-- 弹窗 -->
    <view class="foot_pay_box" v-show="vip_buy" @tap="close_pop">
      <view class="foot_pay" @click.stop="vip_buy = true">
        <view class="fp1">
          <text>购买期限</text>
          <text>会员权益包/{{attr_value}}</text>
        </view>
        <view class="fp2">
          <view class="fp2list" v-for="(item,index) in vals_list" @tap.stop="_vals_checked(item.id)" :key="index">
            <image src="https://imgcdn.tuogouchebao.com/parking_xuanzhong.png" v-if="item.checked"></image>
            <image src="https://imgcdn.tuogouchebao.com/weixuanzhong.png" v-else></image>
            <view class="f2l_top">{{item.sku_name}}</view>
            <view class="f2l_top">￥{{item.original_price}}</view>
          </view>
        </view>
        <view class="fp3" @tap="go_pay">去支付</view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSwiperDot } from "@dcloudio/uni-ui";
import WucTab from "@/components/wuc-tab/wuc-tab.vue";
import tabBar from "../../components/tab-bar/tabBar.vue";
import {StopCarModel} from "../../model/stopCar";
const  stopCarModel = new StopCarModel()
export default {
  data() {
    return {
      attr_value:'',
      symbol:"",
      symbol_list:"",
      list:[],
      vals:[],
      vals_list:[],
      vip_lists:[
        {val:1,checked:true,id:1},
        {val:2,checked:false,id:2},
        {val:3,checked:false,id:3}
      ],
      TabCur3: 0,
      vip_buy:false,
      tabList3: [
        {
          name: "买前需知"
        },
        {
          name: "会员权益"
        }
      ],
      my_parking_cars:[]
    };
  },
  components: {
    WucTab,
    tabBar
  },
  methods: {
    // 关闭窗口
    close_pop(){
      if(this.vip_buy){
        this.vip_buy = false
      }
    },
    _vals_checked(id){
      let vals_list = this.vals_list
      console.log(vals_list)
      vals_list.map((item)=>{
        item.checked = false
        if(item.id == id) {
          item.checked = true
          this.symbol_list = item
        }
      })
      this.vals_list =  JSON.parse(JSON.stringify(vals_list))
    },
    // 应急停车 买前须知 
    _list(){
      stopCarModel.getParkingService().then((res)=>{
        if(res.data) {
          this.list = res.data
          this.vals = res.data.attribute[0].vals
          this.vals_time = res.data.commodity_sku
        }
      })
    },
    _vip_list(id){
      let _vip_list = this.vals
      for (let item of _vip_list) {
        item.checked = false
        if(item.id == id) {
          item.checked = true
          this.attr_value = item.attr_value
        }
      }
      this.vip_buy = true
      this.vals =JSON.parse(JSON.stringify(_vip_list))
      this._getVal(id)
    },
    // 获取期限
    _getVal(id){
      let vals_time = this.vals_time
      const vals_list = []
      vals_time.filter((item,index)=>{
        if(item.attr_symbol_path.indexOf(id) == 0) {
          vals_list.push(item)
        }
      })
      this.vals_list = JSON.parse(JSON.stringify(vals_list))
    },
    swiperChange3(e) {
      let { current } = e.target;
      this.TabCur3 = current;
    },
    go_pay(){
      console.log(this.symbol_list)
     if(this.symbol_list.id) {
       uni.navigateTo({
         url: "/pagesB/vip_buy_order/vip_buy_order?id=" + this.symbol_list.id
       });
     }
    },
    myVip(){
      stopCarModel.getMyParkingCars().then((res) => {
        this.my_parking_cars = res.data
      })
    },
    // 停车记录
    toParkingRecord()
    {
       uni.navigateTo({
        url: "/pagesB/park_record/park_record"
      });
    },
    // 会员权益
    toVipState(){
       uni.navigateTo({
        url: "/pagesC/vip_state/vip_state"
      });
    },
    // 使用说明
    toExplain(){
      uni.navigateTo({
        url:'/pagesC/explain_function/explain_function'
      })
    },
    // 常见问题
    tpproblem(){
      uni.navigateTo({
        url:'/pagesC/explain_problem/explain_problem'
      })
    }
  },
  onLoad: function() {
    this._list()
    this.myVip()
  },
  onShow: function() {},
  onHide: function() {}
};
</script>

<style scoped>
  page{
    height: 100%;
    background: #fff;
  }
.tab {
  display: flex;
}
swiper-item{
  height: 100vh;
  overflow: hidden;
}
.buy_old{
  width: 100%;
  padding-top: 10rpx;
  position: absolute;
  height: 100vh;
  overflow: scroll;
  padding-bottom: 100rpx;
}
.tab > view {
  width: 50%;
  height: 99.63rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333333;
  font-size: 32rpx;
  font-weight: 400;
}

.selecttab {
  background: #fbcc31 !important;
  font-weight: 500 !important;
}

.showpic {
  width: 100%;
  height: 297.1rpx;
}

.viplistbox {
  padding: 0 18.11rpx;
}

.viplist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 181.76rpx;
  background: url(https://imgcdn.tuogouchebao.com/huiyuanquanyi.png) center/cover;
  padding: 0 29.58rpx 0 17.51rpx;
  border-radius: 12.07rpx;
  margin-top: 12.07rpx;
}

.vl_left {
  display: flex;
}

.vl_left > image {
  width: 172.7rpx;
  height: 135.86rpx;
}

.center_txt {
  margin-left: 47.7rpx;
}

.center_txt_top > text:first-child {
  color: #ffa82c;
  font-size: 43.47rpx;
}

.center_txt_top > text:nth-child(2) {
  color: #ffffff;
  font-size: 43.47rpx;
}

.center_txt_bottom {
  color: #b29300;
  font-size: 24.15rpx;
}

.vl_right {
  width: 54.34rpx;
  height: 54.34rpx;
}

.paybtn {
  height: 72.46rpx;
  background: #fdd000;
  border-radius: 4.83rpx;
  line-height: 72.46rpx;
  color: #474747;
  font-size: 28.98rpx;
  font-weight: bold;
  margin-top: 36.83rpx;
}

.park_what {
  background: #ffffff;
  margin-top: 42.27rpx;
  padding: 10rpx 19.92rpx 50rpx 19.92rpx;
}

.pw_title {
  color: #474747;
  font-size: 28.98rpx;
  font-weight: bold;
}

.pw_con {
  display: flex;
  flex-direction: column;
  margin-top: 12rpx;
}

.pw_con > text {
  color: #959595;
  font-size: 24.15rpx;
}

.total {
  display: flex;
  height: 181.15rpx;
  background: #ffffff;
  align-items: center;
  margin-top: 22.34rpx;
}

.total > view:first-child {
  border-right: 1px solid #e8e8e8;
}

.total > view {
  width: 50%;
  height: 155.79rpx;
  display: flex;
  flex-direction: column;
  margin: 12.68rpx 0;
}

.total > view:first-child {
  padding-left: 18.71rpx;
}

.total > view:last-child {
  padding-left: 42.87rpx;
}

.total > view > text:first-child {
  color: #474747;
  font-size: 24.15rpx;
  margin-top: 20.53rpx;
}

.total > view > text:last-child {
  color: #fcb900;
  font-size: 27.77rpx;
}

.explain {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin-top: 22.34rpx;
  padding: 28.98rpx 20rpx 62.19rpx 20rpx;
}

.explain > text {
  color: #959595;
  font-size: 24.15rpx;
}

.explain > text:first-child {
  color: #474747 !important;
  font-size: 25.36rpx !important;
  display: flex;
  justify-content: center;
}

.explain > text:last-child {
  display: flex;
  justify-content: center;
}
.foot_pay_box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,0.3);
}
.foot_pay {
  background: #ffffff;
  position: absolute;
  width: 100%;
  bottom: 0;
}

.fp1 {
  padding: 42rpx 45rpx 0 37rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fp1 > text:first-child {
  color: #333333;
  font-size: 36rpx;
}

.fp1 > text:nth-child(2) {
  color: #333333;
  font-size: 32rpx;
}

.fp2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 42rpx;
  margin-top: 68rpx;
}

.fp2list {
  width: 180rpx;
  height: 220rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.fp2list image{
  position: absolute;
  width: 180rpx;
  height: 220rpx;
}
.f2l_top {
  color: #333333;
  font-size: 30rpx;
  z-index: 999;
}
.f2l_top:last-child{
  color:#FEFEFE
}

.f2l_bottom {
  width: 100%;
  height: 100%;
  display: block;
}

.f2l_bottom > text:first-child {
  color: #fefefe;
  font-size: 30rpx;
}

.f2l_bottom > text:nth-child(2) {
  color: #fefefe;
  font-size: 40rpx;
}

.fp3 {
  height: 95rpx;
  background: rgba(253, 208, 0, 1);
  font-size: 36rpx;
  font-weight: bold;
  color: rgba(71, 71, 71, 1);
  text-align: center;
  line-height: 95rpx;
  margin-top: 44rpx;
}
.vip_left_box{
  position: relative;
  width: 173rpx;
  height: 136rpx;
}
.vip_lefts{
  position: absolute;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  justify-content: center;
}
.vip_left_box_title{
  font-size: 22rpx;
  color: #666666;
}
.vip_left_box_desc{
  font-size: 29rpx;
  color: #FEFEFE;
}
.vip_left{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 173rpx;
  height: 136rpx;
  z-index: 1;
}
/* 会员权益 */
.head_tab {
		display: flex;
	}

	.head_tab>view {
		width: 50%;
		height: 100rpx;
		background: #F5F5F5;
		text-align: center;
		line-height: 100rpx;
	}

	.selecttab {
		background: #FCC200 !important;
	}
    .text-black{

    }
    .text-center>>>.wuc-tab-item{
      height: 7.5vh !important;
      line-height: 8vh !important;
    }
	.center_con {
		padding-top: 4rpx;
	}

	.vip_state_list {
      margin-top: 10rpx;
		padding: 0 22rpx;
      height: 239rpx;
	}
    .vip_state_list image{
      position: absolute;
      left: 22rpx;
      width: 703rpx;
      right: 22rpx;
      height: 239rpx;
      z-index: 1;
    }

	.vsl_con {
      width: 703rpx;
		height: 239rpx;
		border-radius: 10rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		margin-top: 12.07rpx;
      position: absolute;
      z-index: 2;
	}

	.vsl_con2 {
		background: linear-gradient(-90deg, rgba(224, 224, 224, 1) 0%, rgba(246, 246, 246, 1) 100%) !important;
	}

	.vc_line_one {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 51rpx 0 10rpx;
	}

	.vlo_left {
		color: #7D6700;
		font-size: 36rpx;
	}
  .vlo_old_left {
    color: #AAAAAA;
    font-size: 36rpx;
  }

	.vlo_left2 {
		color: #AAAAAA !important;
	}

	.vlo_right {
		color: #816A01;
		font-size: 32rpx;
	}
    .vlo_old_right{
      color: #838383;
      font-size: 32rpx;
    }
	.vlo_right2 {
		color: #838383 !important;
	}

	.vc_line_two {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 53rpx 0 14rpx;
	}

	.vltw_left {
		color: #927701;
		font-size: 28rpx;
	}
    .vltw_old_left{
      color: #A9A9A9;
      font-size: 28rpx;
    }
	.vltw_left2 {
		color: #A9A9A9 !important;
	}

	.vltw_right {
		color: #666666;
		font-size: 30rpx;
	}
  .vltw_old_right{
    color: #666666;
    font-size: 30rpx;
  }
	.vc_line_three {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 22rpx 0 11rpx;
		margin-top: 32rpx;
	}

	.vlth_left {
		color: #666666;
		font-size: 26rpx;
	}
    .vlth_old_left{
      color: #A9A9A9;
      font-size: 26rpx;
    }

	.vlth_left2 {
		color: #A9A9A9 !important;
	}

	.vlth_left>text:nth-child(3) {
		margin-left: 36rpx;
	}
.vlth_old_left>text:nth-child(3) {
  margin-left: 36rpx;
}
	.vlth_right {
		width: 143rpx;
		height: 47rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(240, 240, 240, 1);
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.vlth_right>image {
		width: 23rpx;
		height: 23rpx;
	}

	.vlth_right>text {
		color: #666666;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.list {
		height: 112rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F0F0F0;
		padding-left: 48rpx;
		padding-right: 16rpx;
	}
	.list:last-of-type{
		border-bottom: none !important;
	}
	.list>text {
		color: #333333;
		font-size: 32rpx;

	}

	.list>image {
		width: 50rpx;
		height: 50rpx;
	}
    .vip_detail{
      width: 100%;
      position: absolute;
      height: 100%;
      overflow: scroll;
      background: #fff;
    }
button::after{
  border: none;
}
  .over_h{
    height:15vh;
  }
</style>
