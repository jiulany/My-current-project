<template>
  <view class="span24 store">
      <view class="span24 store-bnr">
          <uni-swiper-dot
        :info="info"
        :current="current"
        field="content"
        :mode="mode"
        :dotsStyles="dotsStyles"
		class="uni-swiper-dot"
      >
        <swiper class="swiper-box" @change="change">
          <swiper-item v-for="(item ,index) in info" :key="index">
            <view class="swiper-item">
              <image src="https://imgcdn.tuogouchebao.com/property_index_banner.png" mode="aspectFit" ></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      </view>
      <view class="span24 store-tuijie">
          <view class="span2 store-tuijie-ico "><image src="https://imgcdn.tuogouchebao.com/property_tuijie.png" mode="aspectFit" ></image></view>
          <view class="span22 store-tuijie-tt">为你推荐</view>
      </view>
      <view class="span24 store-goods">
          <view class="span11 store-goods-it" v-for="item  in goods_list" :key="item.id" @tap="toDetails(item,$event)">
              <view class="span24 store-goods-tp"><image :src="item.commodity_image_thum" mode="aspectFit" ></image></view>
              <view class="span24 store-goods-tt">{{item.spu_name}}</view>
              <view class="span24 store-goods-jg">
                <view class="span10 store-goods-cur">￥{{item.sku[0].price}}</view>
                <view class="span14 store-goods-pre">￥{{item.sku[0].activity_price}}</view>
              </view>
          </view>
      </view>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
      <uni-popup ref="popup" type="center" :maskClick="false">
		<view class="span24 inx-model">
			<view class="span24 inx-model-close"> </view>
			<view class="span24 inx-model-tt">您还未绑定房屋</view>
			<view class="span24" style="justify-content: center;"><view @tap="toCellBind" class="inx-model-btn">去绑定</view></view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import { uniSwiperDot ,uniPopup } from "@dcloudio/uni-ui";
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
          info: [
        {
          content: "内容 A"
        },
        {
          content: "内容 B"
        },
        {
          content: "内容 C"
        }
      ],
      current: 0,
      mode: "long",
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
      },
      goods_list:null
    };
  },
  methods: {
      change(e) {
      this.current = e.detail.current;
    },
	toCellBind(){
      uni.navigateTo({url: '/pages/cell_bind/cell_bind'});
	},
    reloadList(){
      this.$http({ url: `api/store/index` ,data:{
      }}).then(res => {
        this.goods_list=res.data
          })
          .catch(res => {
             this.HMmessages.show(res.msg, { icon: "error"});
          });
    },
    toDetails(item,e){
       uni.navigateTo({
        url: `/pages/goods_details/goods_details?id=${item.id}`
      });
    }
  },
  components: {  uniSwiperDot ,HMmessages,uniPopup},
  onLoad() {
   
  },
  onShow() {
     this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //获取绑定
		  if(res.data.length===0){
			  this.$refs.popup.open()
			  }else{
			  this.$refs.popup.close()
              }
		  })
          .catch(res => {});
    this.reloadList()
  },
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.store{
		padding-bottom: 150rpx;
} 
.store-bnr .swiper-item {
  height: 100%;
  width: 100%;
}
.store-bnr .uni-swiper-dot{
	height: 100%;
  width: 100%;
}
.store-bnr .swiper-item image {
  height: 100%;
  width: 100%;
}
.store-tuijie{
    align-items: flex-end;
    padding: 40rpx 15rpx 0 15rpx
}
.store-tuijie-ico{
    height: 40rpx;
}
.store-tuijie-ico image{
    height: 100%;
}
.store-tuijie-tt{
    font-size: 32rpx;
    font-weight: 600
}
.store-goods-it{
    justify-content: center
}
.store-goods{
    justify-content: space-between;
    padding: 30rpx 15rpx 30rpx 15rpx
}
.store-goods-tp{
    height: 283rpx;
    width: 303rpx
}
.store-goods-tp image{
    height:100%;
    width: 100%;
}
.store-goods-tt{
    font-size: 28rpx;
    font-weight: 600;
    padding: 24rpx 0 18rpx 20rpx;
}
.store-goods-jg{
    font-weight: 600;
    padding: 0 0 27rpx 20rpx;
}
.store-goods-cur{
    font-size: 26rpx;
    color: #F75C3E
}
.store-goods-pre{
    font-size: 24rpx;
    color: #B0B0B0;
    text-decoration: line-through
}
.inx-model{
	padding-bottom: 40rpx
}
.inx-model-tt{
	font-size: 30rpx;
	justify-content: center;color:rgba(102,102,102,1);
	margin-bottom: 50rpx;
	padding: 40rpx 0 0 0
}
.inx-model-btn{
	font-size: 30rpx;
	background:rgba(253,208,0,1);
border-radius:22px;
width:190rpx;
text-align: center;
height:55rpx;
color:rgba(102,102,102,1);
}
.inx-model-close{
	justify-content: flex-end;
}
.inx-model-close image{
	height:24rpx;
	width:24rpx
}
</style>
