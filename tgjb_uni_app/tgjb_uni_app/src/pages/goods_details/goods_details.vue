<template>
  <view class="span24 goodsdtl">
   <view class="span24 goodsdtl-bnr">
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
              <image :src="item"   ></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
   </view>
   <view class="span24 goodsdtl-price">
       <view class="span5 goodsdtl-prcur">¥{{goods_details.sku&&goods_details.sku[0].price}}</view>
       <view class="span19 goodsdtl-prpre">￥{{goods_details.sku&&goods_details.sku[0].activity_price}}</view>
   </view>
   <view class="span24 goodsdtl-name">{{goods_details.spu_name&&goods_details.spu_name}}
   </view>
   <view class="span24 goodsdtl-jjtt">商品简介
   </view>
   <view class="span24 goodsdtl-jj">{{goods_details.details&&goods_details.details}}
   </view>
   <view class="span24 fix-buy">
       <view class="span5">
           <view class="span24 fix-kc">库存</view>
           <view class="span24 fix-cz">（充足）</view>
       </view>
       <view class="span19 fix-buy-btn" @tap="toOpenBuyModel">立即购买</view>
    </view>
    <view class="goodsdtl-pop-bto">
    <uni-popup ref="popup" type="bottom" >
		<view class="span24 goodsdtl-model">
			<view class="span24 goodsdtl-model-cloes"><image @tap="closeModel"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_shanchu.png'></image></view>
			<view class="span24 goodsdtl-model-it" style="border-bottom:1px solid rgba(240,240,240,1);padding-top:70rpx">
                <view class="span4 goodsdtl-model-dj">单价</view>
                <view class="span20 goodsdtl-model-djz">¥{{total_price}}</view>
            </view>
			<view class="span24 goodsdtl-model-it">
                <view class="span4 goodsdtl-model-dj">数量</view>
                <view class="span20 goodsdtl-model-slz"><image class="goodsdtl-model-jian" @tap="numJian" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jian.png'></image><input v-model="num"  class="goodsdtl-model-inp" type="number"><image @tap="numJia" class="goodsdtl-model-jia" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jia.png'></image></view>
            </view>
			<view class="span24 goodsdtl-model-buy">确认购买</view>
		</view>
	</uni-popup>
  </view>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import { uniSwiperDot,uniPopup   } from "@dcloudio/uni-ui";
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
      info: [
      ],
      current: 0,
      id:null,
      mode: "long",
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
      },
      num:1,
      goods_details:null,
      unit_price:null,
      total_price:null
    };
  },
  watch: {
    num(val){
      console.log(val)
      if(val===''){
        this.total_price=this.unit_price
      }else{
      this.total_price=parseFloat(this.unit_price)*parseFloat(val)
      }
    }
  },
  methods: {
    change(e) {
      this.current = e.detail.current;
    },
    toOpenBuyModel(){
    uni.navigateTo({
        url: `/pages/buy_goods/buy_goods?id=${this.id}`
      });
    },
    closeModel(){
	  this.$refs.popup.close()
    },
    numJian(e){
      let a=parseInt(this.num)-1
      if(a<=0){
        this.num=1
      }else{
        this.num=a
      }
    },
    numJia(e){
      let a=parseInt(this.num)+1
      this.num=a
    }
  },
  components: {uniSwiperDot ,uniPopup,HMmessages},
  onLoad(opt) {
    this.id=opt.id
    uni.showLoading({
    title: '加载中'
});
    this.$http({ url: `api/store/goodsInfo/${opt.id}` ,data:{
      }}).then(res => {
         uni.hideLoading();
        this.goods_details=res.data
        this.info=[res.data.commodity_image]
        this.unit_price=res.data.sku[0].price
        this.total_price=res.data.sku[0].price
          })
          .catch(res => {
             uni.hideLoading();
            this.HMmessages.show(res.msg, { icon: "error"});
          });
  },
  onShow() {
      uni.showTabBar()
  },
  onHide() {}
};
</script>

<style>
page {
		background-color: white;
		font-size: 28rpx;
		line-height: 1.8;
	}
.goodsdtl-bnr{
    padding: 24rpx;
}
.goodsdtl-bnr .swiper-box{
    height: 451rpx;
}
.goodsdtl-bnr .swiper-item {
  height:100%;
  width: 100%;
}
.goodsdtl-bnr .uni-swiper-dot{
	height: 100%;
  width: 100%;border-radius:10rpx;
}
.goodsdtl-bnr .swiper-item image {
  width: 100%;
  height: 100%;border-radius:10rpx;
}
.goodsdtl-prcur{
    color: #F75C3E;
    font-size: 36rpx;
    align-items: center
}
.goodsdtl-prpre{
    font-size: 28rpx;
    color: #B0B0B0;
    align-items: center;
    text-decoration: line-through
}
.goodsdtl-price{
    padding: 0 24rpx;
}
.goodsdtl-name{
    padding: 0 24rpx;
    font-size: 34rpx;
    font-weight:600;
color:rgba(71,71,71,1);
}
.goodsdtl-jjtt{
    padding: 0 24rpx;
    margin-top: 60rpx;
    font-weight:500;
color:rgba(102,102,102,1);
font-size: 30rpx
}
.goodsdtl-jj{
    padding: 0 24rpx;font-size:30rpx;
color:rgba(102,102,102,1);text-indent: 2em
}
.fix-buy{
    position: fixed;
    bottom: 0;    
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
}
.fix-kc{
    align-items: center;
    justify-content: center;font-size:32rpx;
font-weight:500;
color:rgba(71,71,71,1);
}
.fix-cz{
    align-items: flex-start;
    justify-content: center;font-size:24rpx;
font-weight:500;
color:rgba(71,71,71,1);
position: relative;
bottom: 10rpx
}
.fix-buy-btn{
    background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);font-size:32rpx;
font-family:PingFang SC;
font-weight:600;
align-items: center;
justify-content: center;
color:rgba(177,109,7,1);
}
.goodsdtl-model{
    position: relative;
}
.goodsdtl-model-cloes{
    position: absolute;
    right: 25rpx;
    top: 25rpx;
	height:24rpx;
	width:24rpx
}
.goodsdtl-model-cloes image{
	height:100%;
	width:100%
}
.goodsdtl-model-buy{
    height:98rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
font-size:32rpx;
font-weight:500;
color:rgba(177,109,7,1);
justify-content: center;
align-items: center
}
.goodsdtl-model-it{
  padding: 45rpx 28rpx 45rpx 45rpx ;
  font-size: 30rpx
}
.goodsdtl-model-djz{
  justify-content: flex-end;
  padding-right: 30rpx;
  font-size: 30rpx;
color:rgba(247,92,62,1);
}
.goodsdtl-model-slz{
  justify-content: flex-end;
  align-items: center
}
.goodsdtl-model-jia{
  display: inline-block;
  height: 35rpx;
  width: 35rpx;
}
.goodsdtl-model-jian{
  display: inline-block;
  height: 35rpx;
  width: 35rpx;
}
.goodsdtl-model-inp{
  width: 80rpx;
  text-align: center;
  margin: 0 20rpx
}
</style>
