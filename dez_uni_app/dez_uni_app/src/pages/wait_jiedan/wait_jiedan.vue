<template>
	<view class="waitjd span24">
        <view class="span24 waitjd-cancel">取消订单</view>
        <view class="span24 ">
            <view class="span24 waitjd-status">
                <view class="waitjd-blur">
                    <view class="waitjd-blur0" >
                        {{min}}:{{sec}}
                    </view>
                </view>
            </view>
            <view class="span24 waitjd-sta-tt">等待订单</view>
        </view>
        <view class="span24  waitjd-msg">
            <view class="span24 waitjd-msg1">下单成功，预计30分钟内技术员将主动电话联系您，请保持电话通畅</view>
            <view class="span24 waitjd-fg"></view>
            <view class="span24 waitjd-msg2">后保障：“的装”提供七天保质期，7天内同样的问题可致电技术员</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                time:"",
                min:"00",
                sec:"00",
jiedan_out:null,
time_out:null,
                order_id:null,
                id_stop:false
            }
		},
		onLoad(opt) {
            this.order_id=opt.order_id
            this.$http({ url: `api/order_heartbeat` ,data:{
                order_id:opt.order_id
          }}).then(res => {
              if(res.data.order_status!=3){
                  this.isJiedan()
                  this.startJiShi()
              }
          })
          .catch(res => {});
        },
        onUnload(){
				clearInterval(this.jiedanOut);
				this.jiedanOut = null;
				clearInterval(this.timeOut);
				this.timeOut = null;
        },
		methods: {
            toSuccess(){
                uni.navigateTo({url: '/pages/success_order/success_order'});
            },
            clearJiedan() {
				clearInterval(this.jiedanOut);
				this.jiedanOut = null;
                uni.navigateTo({url: `/pages/success_order/success_order?order_id=${this.order_id}`});
            },
            clearJiShi() {
				clearInterval(this.timeOut);
				this.timeOut = null;
            },
            isJiedan(){
				clearInterval(this.jiedanOut);
                this.jiedanOut=setInterval(() => {
                    if(this.id_stop){
                        this.jiedanOut && this.clearJiedan();
                    }else{
                        this.$http({ url: `api/order_heartbeat` ,data:{
                order_id:this.order_id
          }}).then(res => {
              if(res.data.order_status==3){
                  this.id_stop=true
              }
          })
          .catch(res => {});
                    }
                }, 3000);
            },
            startJiShi(){
				clearInterval(this.timeOut);
               this.timeOut=setInterval(()=>{
                    if(this.id_stop){
                        this.timeOut && this.clearJiShi();
                    }else{
                        if(parseInt(this.sec)==59){
                       if(parseInt(this.min)<9){
                       this.sec="00"
                       this.min="0"+(parseInt(this.min)+1)
                       }else{
                       this.sec="00"
                       this.min=parseInt(this.min)+1
                       }
                   }else{
                       if(parseInt(this.sec)<9){
                       this.sec="0"+(parseInt(this.sec)+1)
                       }else{
                        this.sec=parseInt(this.sec)+1
                       }
                   }
                    }
                },1000)
            }
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.waitjd-cancel{
    padding: 43rpx 37rpx 10rpx 0;
    justify-content: flex-end;
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
}
.waitjd-blur{
    width:269rpx;
height:269rpx;
background:rgba(64,156,203,0.3);
border-radius:50%;
display: flex;
justify-content: center;
align-items: center
}
.waitjd-blur0{
width:212rpx;
height:212rpx;
background:rgba(64,156,203,1);
border-radius:50%;
display: flex;
align-items: center;
justify-content: center;

font-size:36rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);
}
.waitjd-status{
    justify-content: center
}
.waitjd-sta-tt{
    justify-content: center;
font-size:28rpx;
margin-top: 35rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(64,156,203,1);
}
.waitjd-msg{
    margin: 60rpx 24rpx 0 24rpx ;
    background: white;
    padding: 0 40rpx;
border-radius:10rpx;
}
.waitjd-msg1{
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(64,156,203,1);
text-align: center;
padding: 35rpx 0
}
.waitjd-fg{
height:5rpx;
border:4rpx solid rgba(240,239,239,1);
}
.waitjd-msg2{
padding: 30rpx 0 15rpx 0;
text-align: center
}
</style>
