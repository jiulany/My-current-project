<template>
  <view class="span24 crgdtl">
      <view class="span24 crgdtl-bh">{{item.id}}</view>
      <view class="span24 crgdtl-tp">
              <image src="../../static/images/chazuo.png"  ></image>
      </view>
      <view class="span24 crgdtl-status">
          <view class="span24 crgdtl-status-line1">插座状态</view>
          <view class="span24 crgdtl-status-line2">
              <view class="crgdtl-status-circle-lv"  v-if="status==1"></view>
              <view class="crgdtl-status-ms"  v-if="status==1">正在使用</view>
              <view class="crgdtl-status-circle-blk" v-if="status==2"></view>
              <view class="crgdtl-status-msxz"  v-if="status==2">闲置</view>
              <view class="crgdtl-status-circle-blk" v-if="status==3"></view>
              <view class="crgdtl-status-msxz"  v-if="status==3">异常</view>
          </view>
      </view>
      <view class="span24 crgdtl-bh">注：每半时充电10元</view>
      <view class="span24 crgdtl-tm" @tap="openModel" v-if="status==2">
          选择充电时间
      </view>
      <view class="span24 crgdtl-tmn"  v-else>
          选择充电时间
      </view>
      <uni-popup ref="popup" type="bottom">
		<view class="span24 ">
           <view class="span24 crgdtl-mdl-line">
               <view class="span6 crgdtl-mdl-ky"><image src="../../static/images/icochazuo.png"  ></image>插座编号</view>
               <view class="span18 crgdtl-mdl-val">{{item.id}}</view>
           </view>
           <view class="span24 crgdtl-mdl-line">
               <view class="span9 crgdtl-mdl-ky"><image src="../../static/images/icoshijian.png"  ></image>请选择充电时间</view>
               <view class="span15 crgdtl-mdl-val"><input class="crgdtl-mdl-hr" type="number" maxlength="2" ><span>小时</span><input class="crgdtl-mdl-min" type="number" maxlength="2" max="12"><span>分</span></view>
           </view>
           <view class="span24 crgdtl-mdl-line">
               <view class="span9 crgdtl-mdl-ky"><image src="../../static/images/icojine.png"  ></image>支付金额</view>
               <view class="span15 crgdtl-mdl-val">20元</view>
           </view>
           <view class="span24 crgdtl-mdl-line" style="justify-content: center;margin-top:30rpx">
               <view class="crgdtl-mdl-btn">支付</view>
           </view>
		</view>
	</uni-popup>
    <view class="mask" v-if="loading"></view>
  </view>
</template>

<script>
import { uniPopup   } from "@dcloudio/uni-ui";
var timeout=null
export default {
  data() {
    return {
        count:1,
      status:null,
      loading:false,
      updated_at:null,
      item:null
    };
  },	
  methods: {
      openModel(){
		this.$refs.popup.open()
      },
      loadingCallback(){

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
      this.$http({ url:`api/intelligence/plug_info`,data:{
          plug_id:e.id
          }}).then(res => {
          uni.setStorageSync('soket_updated_at', res.data.updated_at);
          this.$http({ url:`api/intelligence/plug_ask`,data:{
          plug_id:e.id
          },method:"post"}).then(res => {
              timeout=setInterval(()=>{
                       this.$http({ url:`api/intelligence/plug_heartbeat/${e.id}`,data:{
                       },method:"post"}).then(res => {
                       this.count+=1
                       this.status=res.data.status
                       this.item=res.data
                       this.updated_at=res.data.updated_at
                       if(res.data.updated_at==uni.getStorageSync('soket_updated_at')){
                       }else{
                       this.loading=false
                       }
                       if(this.count==5){
                           this.loading=false
                           if(this.updated_at==uni.getStorageSync('soket_updated_at')){
                           this.status=3
                           }
                           clearInterval(timeout)
                        }
                       if(res.data.updated_at!=uni.getStorageSync('soket_updated_at')){
                           clearInterval(timeout)
                       }
                       }).catch(res => {
                       this.loading=false
                       })
                  
              },5000)
              
          })
          .catch(res => {
              this.loading=false
              this.status=3
              uni.showToast({
                  title: '异常',
                  duration: 2000
              });
              });
          })
          .catch(res => {
              this.loading=false
              this.status=3
              uni.showToast({
                  title: '异常',
                  duration: 2000
              })
              });
  },
  onShow() {
	 
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
