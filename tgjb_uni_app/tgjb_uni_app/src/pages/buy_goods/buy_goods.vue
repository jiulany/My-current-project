<template>
  <view class="span24 buygoods">
       <view class="span24 buygoods-address">
        <view class="span24">
            <view class="span16 buygoods-address-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image><span>{{address.length==0?'未设置地址':address[address_index].community_name}}</span></view>
            <view class="span8 buygoods-address-bj">
                <span>
                <picker @change="bindPickerChange" :value="address_index" :range="address" range-key="address">
                        <view class="uni-input">编辑</view>
                </picker>
                </span>
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiala.png'></image></view>
        </view>
        <view class="span24">
            <view class="buygoods-address-nm">{{address.length==0?'':address[address_index].name}}</view>
            <view class="buygoods-address-ph">{{address.length==0?'':address[address_index].phone}}</view>
        </view>
        <view class="span24 buygoods-address-ad">
            {{address.length==0?'':address[address_index].address}}
        </view>
      </view>
      <view class="span24 buygoods-goods">
          <view class="span6 buygoods-goods-ico">
              <image mode="aspectFit" :src='goods.commodity_image_thum'></image>
          </view>
          <view class="span18">
              <view class="span24">
                  <view class="span12 buygoods-name">{{goods.spu_name}}</view>
                  <view class="span12 buygoods-num"><image class="buygoods-jian" @tap="numJian" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jian.png'></image><input v-model="num"  class="buygoods-inp" type="number"><image @tap="numJia" class="buygoods-jia" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_jia.png'></image></view>
              </view>
              <view class="span24">
                <view class="span10 buygoods-cur">￥{{goods.sku?goods.sku[0].price:''}}</view>
                <view class="span14 buygoods-pre">￥{{goods.sku?goods.sku[0].activity_price:''}}</view>
              </view>
          </view>
      </view>
      <view class="span24 buygoods-buy">
          <view class="span9 buygoods-buy-total"><span>合计：</span>￥{{total_price}}</view>
          <view class="span15 buygoods-buy-tobuy" @tap="toBuy">立即购买</view>
      </view>
  </view>
</template>

<script>
import { uniNoticeBar,uniPopup} from "@dcloudio/uni-ui";
export default {
  data() {
    return {
        upList:[],
        address:null,
        address_index:0,
        num:1,
        goods:null,
        total_price:'',
        sku_id:null,
        is_topay:true
    };
  },
  watch: {
    num(val){
      if(val===''){
        this.total_price=this.goods.sku[0].price
      }else{
      this.total_price=parseFloat(this.goods.sku[0].price)*parseFloat(val)
      }
    }
  },
  methods: {
      bindPickerChange(e){
      this.address_index=e.detail.value
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
    },
    toBuy(){
      if(this.address[this.address_index]==undefined){
        uni.showToast({
    title: '请添加地址',
    duration: 2000,
    icon:'none'
});
      }else{
      if( this.is_topay){
         this.is_topay=false
      let _this=this
      uni.showLoading({
    title: '加载中'
});
      this.$http({url:'api/store/create_order',data:{
          address_id:this.address[this.address_index].id,
          sku_id:this.sku_id,
          num:this.num
      },method:"post"}).then(res=>{
          this.$http({ url: `api/payment/pay`,data:{community_id:uni.getStorageSync('community_selected').community_id,order_id:res.data.order_id},method:'post'}).then(res => {
     this.is_topay=true
		uni.hideLoading()
     var a = res.data
          uni.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
            uni.showToast({
    title: '支付成功',
    duration: 2000,
});
          uni.navigateTo({url: '/pages/buy_goodssuccess/buy_goodssuccess'});
        },
        fail(res) {
          uni.showToast({
    title: '支付失败',
    duration: 2000,
    icon:'none'
});
          uni.navigateTo({url: `/pages/my_order/my_order?type=${1}`});
        }
      })
          
          }).catch(res => {
            this.is_topay=true
              uni.hideLoading()
              uni.showToast({
    title: '异常',
    duration: 2000,
    icon:'none'
});
          });
      }).catch(res=>{
        this.is_topay=true
          	uni.hideLoading()
      })
      }
      }
    }
  },
  components: {uniNoticeBar,uniPopup},
  mounted(){
  },
  onLoad(opt) {
      this.sku_id=opt.id
      this.$http({url:'api/mine/address',data:{
      }}).then(res=>{
              this.address=res.data
      }).catch(res=>{
          
      })
     this.$http({ url: `api/store/goodsInfo/${opt.id}` ,data:{
      }}).then(res => {
          this.goods=res.data
          this.total_price=res.data.sku[0].price
          })
          .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error"});
          });
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
  overflow-x: hidden
}
.buygoods{
  padding-bottom: 176rpx
}
.buygoods-address{
  margin-top: 27rpx;
background:rgba(255,255,255,1);
padding: 15rpx 27rpx
}
.buygoods-address-bj{
    align-items: center;
    justify-content: flex-end
}
.buygoods-address-bj image{
    width: 27rpx;
    height: 16rpx;
}
.buygoods-address-bj span{
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
    margin-right: 22rpx
}
.buygoods-goods{
  margin-top: 27rpx;
background:rgba(255,255,255,1);
padding: 39rpx 27rpx
}
.buygoods-goods-tt{
  align-items: center;
  font-size: 28rpx
}
.buygoods-goods-xm{
  align-items: center;
  justify-content: flex-end;
  font-size: 30rpx;
}

.buygoods-address-nm{
font-size:30rpx;
}
.buygoods-address-ph{
font-size:24rpx;line-height: 57rpx;
margin-left: 33rpx;
color:rgba(153,153,153,1);
}
.buygoods-address-ad{
font-size:28rpx;
}
.buygoods-address-tp image{
    height: 49rpx;
    width: 49rpx;
    margin-right: 28rpx
}
.buygoods-goods-ico image{
    height: 135rpx;
    width: 145rpx;
border-radius:10px;
}
.buygoods-address-tp span{
color:rgba(253,208,0,1);
}
.buygoods-cur{
    font-size: 34rpx;
    color: #F75C3E;
    align-items: center;
}
.buygoods-pre{
    font-size: 28rpx;
    color: #B0B0B0;
    align-items: center;
    text-decoration: line-through
}
.buygoods-jia{
  display: inline-block;
  height: 35rpx;
  width: 35rpx;
}
.buygoods-jian{
  display: inline-block;
  height: 35rpx;
  width: 35rpx;
}
.buygoods-inp{
  width: 80rpx;
  text-align: center;
  margin: 0 10rpx
}
.buygoods-num{
    justify-content: flex-end;
    align-items: center
}
.buygoods-name{ 
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(71,71,71,1);
}
.buygoods-buy{
    position: fixed;
    bottom: 0;box-shadow:0 -1px 2px rgba(0,0,0,.1);

}
.buygoods-buy-total{
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:#f65d40;
justify-content: center;
padding: 24rpx 0 
}
.buygoods-buy-total span{
color:rgba(71,71,71,1);
}
.buygoods-buy-tobuy{
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(177,109,7,1);
justify-content: center;
align-items: center;
padding: 24rpx 0 
}
</style>
