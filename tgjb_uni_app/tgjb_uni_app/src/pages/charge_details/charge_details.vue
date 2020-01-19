<template>
  <view class="span24 crgdtl">
      <view class="span24 crgdtl-bh">插座号：{{item.plug_number}}</view>
      <view class="span24 crgdtl-tp">
              <image src="../../static/images/chazuo.png"  ></image>
      </view>
      <view class="span24 crgdtl-status">
          <view class="span24 crgdtl-status-line1">插座状态</view>
          <view class="span24 crgdtl-status-line2">
              <view class="crgdtl-status-circle-lv"  v-if="item.status==1"></view>
              <view class="crgdtl-status-ms"  v-if="item.status==1">正在使用</view>
              <view class="crgdtl-status-circle-blk" v-if="item.status==2"></view>
              <view class="crgdtl-status-msxz"  v-if="item.status==2">闲置</view>
              <view class="crgdtl-status-circle-blk" v-if="item.status==3"></view>
              <view class="crgdtl-status-msxz"  v-if="item.status==3">异常</view>
              <view class="crgdtl-status-circle-blk" v-if="item.status==0"></view>
              <view class="crgdtl-status-msxz"  v-if="item.status==0">异常</view>
          </view>
      </view>
      <view class="span24 crgdtl-bh">注：每半时充电10元</view>
      <view class="span24 crgdtl-tm" @tap="openModel" v-if="item.status==2">
          选择充电时间
      </view>
      <view class="span24 crgdtl-tmn"  v-else>
          选择充电时间
      </view>
      <uni-popup ref="popup" type="bottom">
		<view class="span24 ">
           <view class="span24 crgdtl-mdl-line">
               <view class="span6 crgdtl-mdl-ky"><image src="../../static/images/icochazuo.png"  ></image>插座编号</view>
               <view class="span18 crgdtl-mdl-val">{{item.plug_number}}</view>
           </view>
           <view class="span24 crgdtl-mdl-line">
               <view class="span9 crgdtl-mdl-ky"><image src="../../static/images/icoshijian.png"  ></image>请选择充电时间</view>
               <view class="span15 crgdtl-mdl-val">
                <picker @change="bindPickerChange" :value="index" :range="array" range-key="time" > 
               <view >{{array[index].time}}</view>
               </picker>
               </view>
           </view>
           <view class="span24 crgdtl-mdl-line">
               <view class="span9 crgdtl-mdl-ky"><image src="../../static/images/icojine.png"  ></image>支付金额</view>
               <view class="span15 crgdtl-mdl-val">{{array[index].price}}元</view>
           </view>
           <view class="span24 crgdtl-mdl-line" style="justify-content: center;margin-top:30rpx">
               <view class="crgdtl-mdl-btn" @tap="toPay">支付</view>
           </view>
		</view>
	</uni-popup>
    <view class="mask" v-if="loading"></view>
  </view>
</template>

<script>
import { uniPopup   } from "@dcloudio/uni-ui";
import { base_url } from '../../api/http.js';
export default {
  data() {
    return {
        count:1,
      loading:false,
      updated_at:null,
      item:{plug_number:''},
      array:[{time:'4小时',num:1,price:""},{time:'8小时',num:2,price:""},{time:'12小时',num:3,price:""},{time:'16小时',num:4,price:""},{time:'20小时',num:5,price:""}],
      index:0,
      payMs:'',
      community_id:'',
      plug_number:'',
      path:'',
      is_topay:true
    };
  },	
  methods: {
      openModel(){
		this.$refs.popup.open()
      },
      loadingCallback(){

      },
      bindPickerChange(e){
          this.index=e.detail.value
      },
      toPay(){
          if(this.is_topay){
              this.is_topay=false
              let _this=this
           this.$http({ url: `api/intelligence/create_order`,data:{community_id:this.community_id,sku_id:this.sku_id,num:this.array[this.index].num,path:this.path,plug_number:this.plug_number},method:'post'}).then(res => {
          
this.$http({ url: `api/payment/pay`,data:{community_id:this.community_id,order_id:res.data.order_id},method:'post'}).then(res => {
		this.is_topay=true
     var a = res.data
          uni.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
            _this.$refs.popup.close()
            uni.navigateTo({url: `/pages/charge_paysuccess/charge_paysuccess`});
            uni.showToast({
    title: '支付成功',
    duration: 2000,
});
        },
        fail(res) {
            _this.$refs.popup.close()
          uni.showToast({
    title: '支付失败',
    duration: 2000,
    icon:'none'
});
        }
      })
          
          })
          .catch(res => {
              this.is_topay=true
              uni.showToast({
    title: '异常',
    duration: 2000,
    icon:'none'
});
          });

          })
          .catch(res => {
              this.is_topay=true
              uni.showToast({
    title: '异常',
    duration: 2000,
    icon:'none'
});
          });
          }
          
      }
  },
  watch:{
      loading(val){
          if(val){
              uni.showLoading({
                title: '加载中'
              });
          }else{
              uni.hideLoading()
          }

      }
  },
  destroyed(){
  },
  components: {uniPopup },
  onLoad(e) {
      this.loading=true
      this.path=e.path
      this.plug_number=e.plug_number
      this.$http({ url: `api/intelligence/text`,data:{internal_order_sn:'2019120499995353'},method:"post"}).then(res => {
          })
          .catch(res => {});
  },
  onShow() {
      let _this=this
      uni.login({
  provider: 'weixin',
  success: function (loginRes) {
      uni.request({ url: `${base_url}api/login`,
             header: {
             'X-WX-Code': loginRes.code //自定义请求头信息
             },
             method:"post",
             success: (res) => {
				 uni.setStorageSync("skey", res.data.data.skey);
				 setTimeout(()=>{
		  
	 _this.$http({ url:`api/intelligence/plug_info`,data:{
          path:_this.path,
          plug_number:_this.plug_number
          }}).then(res => {
          _this.loading=false
          uni.setStorageSync('soket_updated_at', res.data.updated_at);
          _this.item=res.data
          _this.community_id=res.data.community_id
          _this.$http({ url: `api/intelligence/plug_price`,data:{community_id:res.data.community_id}}).then(res => {
              let list=_this.array
              _this.sku_id=res.data.sku[0].id
              for(let i in list){
                  list[i].price=list[i].num*parseInt(res.data.sku[0].price)
              }
              _this.array=list
          })
          .catch(res => {});
          })
          .catch(res => {
              _this.loading=false
              _this.status=3
              uni.showToast({
                  title: '异常',
                  duration: 2000,
                  icon:'none'
              })
              });
	  },1500)
             }
            })
  }
});
  },
  onHide() {}
};
</script>

<style>
page {
		background-color: #fcfcfc;
		font-size: 28rpx;
		line-height: 1.8;
	}
    .crgdtl-bh{
        justify-content: center;
        margin-top: 38rpx
    }
    .crgdtl-tp{
        justify-content: center;
        margin-top: 38rpx
    }
    .crgdtl-tp image{
        width: 333rpx;
        height: 333rpx;
    }
    .crgdtl-status{
        width:566rpx;
background:rgba(255,255,255,1);
box-shadow:2rpx 4rpx 24rpx 0rpx rgba(157,157,157,0.12);
border-radius:5rpx;
margin: 0 auto;
margin-top: 69rpx
    }
    .crgdtl-status-line1{
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
justify-content: center;
padding: 25rpx 0
    }
    .crgdtl-status-line2{
        align-items: center;
        justify-content: center;
        padding: 25rpx 0
    }
    .crgdtl-status-ms{
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(95,212,63,1);
    }
    .crgdtl-status-msxz{
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(251,187,7,1);
    }
    .crgdtl-status-circle-lv{
        width:22rpx;
height:23rpx;
background:rgba(95,212,63,1);
margin-right: 22rpx;
border-radius:50%;
    }
    .crgdtl-status-circle-blk{
        width:22rpx;
height:23rpx;
background:white;
border: 2rpx solid rgba(220,220,220,1);
margin-right: 22rpx;
border-radius:50%;
    }
    .crgdtl-tm{
        position: fixed;
        bottom: 0;
        height:98rpx;
        background:rgba(251,187,7,1);
        justify-content: center;
        font-size:32rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(254,254,254,1);
        align-items: center
    }
    .crgdtl-tmn{
        position: fixed;
        bottom: 0;
        height:98rpx;
        background:rgba(219,219,219,1);
        justify-content: center;
        font-size:32rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(254,254,254,1);
        align-items: center
    }
    .crgdtl-mdl-ky{
         align-items: center
    }
    .crgdtl-mdl-ky image{
        width: 33rpx;
        height: 33rpx;
        margin-right: 17rpx
    }
     .crgdtl-mdl-line{
         align-items: center;
         padding: 20rpx 0
     }
     .crgdtl-mdl-val{
         justify-content: flex-end
     }
     .crgdtl-mdl-hr{
         text-align: end;
         width: 55rpx;
         border-bottom: 2rpx solid black;
         margin-right: 15rpx
     }
     .crgdtl-mdl-min{
         width: 55rpx;
         border-bottom: 2rpx solid black;
         margin-left: 15rpx
     }
     .crgdtl-mdl-btn{
height:80rpx;
background:rgba(251,187,7,1);
width: 90%;
border-radius: 50px;
text-align: center;
font-size:32rpx;
font-family:PingFang SC;
line-height: 80rpx;
font-weight:bold;
color:rgba(254,254,254,1);
     }
     .mask{
         width: 100%;
         height: 100%;
         position: fixed;
         top: 0;
         left: 0;
         background: black;
         opacity: 0.3
     }
</style>
