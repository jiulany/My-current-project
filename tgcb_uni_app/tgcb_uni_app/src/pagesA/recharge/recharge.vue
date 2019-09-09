<template>
  <view class="recharge">
    <view>
      <!-- 轮播 -->
      <view class="recharge-bnr" style="width:100%;">
        <uni-swiper-dot
          :info="info"
          :current="current"
          field="content"
          :mode="mode"
          :dotsStyles="dotsStyles"
        >
          <swiper class="swiper-box" @change="change">
            <swiper-item v-for="(item ,index) in info" :key="index">
              <view class="swiper-item" v-for="item in recharges.banners">
                <img :src="item.image" alt />
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
      <view class="span24 recharge-ct">
        <view class="span24 recharge-tt">请选择充值金额</view>
        <view class="span24 recharge-btn-box">
          <view :class="item.checked?'span7 recharge-btn-bg':'span7 recharge-btn '"  v-for="(item) in recharges.list.data" @tap="_reange(item.id)">
            <view class="span24 recharge-jine">{{item.price}}元</view>
            <view class="span24 recharge-youhui">送{{item.give_money}}元</view>
          </view>
        </view>
      </view>
      <view class="span24 recharge-ct">
        <view class="span24 recharge-tt">{{recharges.list.title}}</view>
        <view class="span24 recharge-zdy">
          <input type="number" :value="price" placeholder="请输入10的倍数金额" />
        </view>
      </view>
    </view>
    <view class="span24 recharge-sr" @tap="rechargSub">{{recharges.button_text}}</view>
  </view>
</template>
<script>
import { uniSwiperDot } from "@dcloudio/uni-ui";
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
export default {
  data() {
    return {
      recharge_id:'',
      price:'',
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
      recharges:[]
    };
  },
  methods: {
    // 调用微信支付
    onPay(internal_payment_sn) {
      const data = {
        internal_payment_sn,
        type: 2
      }
      userModel.onPay(data).then((res) => {
        const data = JSON.parse(res.data)
        uni.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success(res) {
            // 支付完成
            uni.navigateBack({
              delta: 1
            })
          },
          fail(res) {
            uni.showToast({
              title: '支付失败！',
              icon:'none'
            })
          }
        })
      })
    },
    rechargSub(){
      let data = {
        recharge_id:this.recharge_id,
        price:this.price
      }
      this._createOrder(data)
    },
    _createOrder(data){
      userModel.createOrder(data).then((res) => {
      if(res.code < 400) {
        this.onPay(res.data.internal_payment_sn)
      }
      })
    }
    ,
    _reange(id){
      let data = this.recharges.list.data
      for (let item of data) {
        item.checked = false
        if(item.id == id) {
          this.recharge_id = id
          item.checked = true
        }
      }
      this.recharges.list.data = JSON.parse(JSON.stringify(data))
      console.log(this.recharges.list.data)
    },
    change(e) {
      this.current = e.detail.current;
    },
     _getRecharge() {
      userModel.getRecharges().then(res => {
        if (res.code < 400) {
          this.recharges = res.data;
        }
      });
    },
    _recharge()
    {
      userModel.recharges().then(res=>{

      })
    }
  },
  components: { uniSwiperDot },
  onLoad: function() {
    this._getRecharge();
  },
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #ffffff;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}

.recharge-bnr .swiper-item {
  height: 100%;
  width: 100%;
}
.recharge-bnr .swiper-item img {
  height: 100%;
  width: 100%;
}
.recharge-ct {
  padding: 28rpx 20rpx;
}
.recharge-btn-box {
  justify-content: space-between;
  align-content: space-around;
}
.recharge-btn-box::after {
  content: "";
  width: 29.166667%;
  height: 47rpx;
}
.recharge-btn {
  border:1rpx solid rgba(253,208,0,1);
  height: 94rpx;
  margin-top: 30rpx;
  align-items: center;
  border-radius: 8rpx;
  /* border: 1px solid #fdd100 */
}
.recharge-btn-bg{
  background: #fdd100;
  border:1rpx solid rgba(253,208,0,1);
  height: 94rpx;
  margin-top: 30rpx;
  align-items: center;
  border-radius: 8rpx;
}
.recharge-btn view {
  justify-content: center;
}
.recharge-jine {
  height: 32rpx;justify-content: center
}
.recharge-youhui {
  font-size: 22rpx;
  color: #e41717;justify-content: center
}
.recharge-zdy {
  border: 1px solid #fdd100;
  height: 80rpx;
  align-items: center;
  margin-top: 20rpx;
  border-radius: 8rpx;
}
.recharge-zdy input {
  width: 100%;
  text-align: center;
}
.recharge-sr {
  position: fixed;
  bottom: 0;
  background: #fdd000;
  height: 80rpx;
  font-size: 36rpx;
  align-items: center;
  justify-content: center;
}
</style>
