<template>
	<view class="sucorder span24">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers" :polyline="polyline">
        <cover-view class="span24 sucorder-hd">
           <cover-view class="span6 sucorder-hd-tp"><cover-image :src="staff===null?'':staff.staff.staff_info.head"></cover-image></cover-view>
           <cover-view class="span18">
               <cover-view class="span24 sucorder-hd-line">
                   <cover-view class="span16">{{staff===null?'':staff.staff.staff_info.surname+'师傅'}}</cover-view>
                   <cover-view class="span8 sucorder-hd-cancel" @tap="openCancel">取消订单</cover-view>
               </cover-view>
               <cover-view class="span24 sucorder-hd-line">
                   {{staff===null?'':staff.staff.staff_info.account.slice(0,3)}}****{{staff===null?'':staff.staff.staff_info.account.slice(7)}}
               </cover-view>
               <cover-view class="span24 sucorder-hd-line">
                   <cover-view class="span16 sucorder-hd-dist">距您{{staff===null?'':staff.distance}}km</cover-view>
                   <cover-view class="span8 sucorder-hd-dtl">
                       <cover-view class="sucorder-hd-detail" @tap="toDetail">订单详情</cover-view>
                   </cover-view>
               </cover-view>
           </cover-view>
        </cover-view>
        <cover-view class="model" v-if="model">
            <cover-view class="span24 model-tt">确认取消</cover-view>
            <cover-view  class="span24 model-body">确认取消此订单吗</cover-view>
            <cover-view class="span24 model-foot">
                <cover-view class="span12 model-sur" @tap="toOk">确认</cover-view>
                <cover-view class="span12 model-cancel" @tap="toCancel">取消</cover-view>
            </cover-view>
        </cover-view>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
            latitude: 39.909,
            longitude: 116.39742,
            staff:null,
            covers: null,
            polyline:null,
            timeOut:null,
            model:false,
            order_id:null,
            time_out:null
            }
        },
         onUnload(){
				clearInterval(this.timeOut);
				this.timeOut = null;
        },
		onLoad(opt) {
            this.order_id=opt.order_id
            this.timeOut=setInterval(()=>{
                this.$http({ url: `api/order_heartbeat` ,data:{
                order_id:opt.order_id
          }}).then(res => {
              this.staff=res.data
              this.latitude=res.data.staff.lat
              this.longitude=res.data.staff.lng
              this.covers=[{
                latitude: res.data.staff.lat,
                longitude: res.data.staff.lng,
                width:20,
                height:27,
                iconPath: '../../static/images/dingwei.png'
            },{
                latitude: res.data.lat_address,
                longitude: res.data.lng_address,
                width:20,
                height:28,
                iconPath: '../../static/images/dingwei2.png'
            }]
            this.polyline=[{
                points:[{latitude: res.data.staff.lat, longitude: res.data.staff.lng},
                {latitude: res.data.lat_address, longitude: res.data.lng_address}],
                color:"#409CCB",
                width:2
            }]
          })
          .catch(res => {});
            },3000)
		},
		methods: {
            openCancel(){
                this.model=true
            },
            toCancel(){
                this.model=false
            },
            toDetail(){
            uni.setStorageSync('details', this.staff);
            uni.navigateTo({url: '/pages/order_details/order_details'});
            },
            toOk(){
                uni.showLoading({
    title: '请稍等'
});
                this.$http({ url: `api/cancel_order` ,data:{
                order_id:this.order_id
          },method:"post"}).then(res => {
                this.model=false
                uni.hideLoading()
                this.time_out=setTimeout(()=>{
uni.navigateBack({
    delta: 3
});
clearInterval(this.time_out)
                },1500)
          })
          .catch(res => {});
            }
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
  height: 100%;
}
.model{
    width: 400rpx;
    background: white;
    border-radius:30rpx;
    margin-left: auto;
    margin-right: auto;
    margin-top: 200rpx;
}
.model-tt{
    justify-content: center;
    padding: 20rpx 0;
    font-size: 30rpx;
    padding-bottom: 0
}
.model-body{
    padding: 40rpx 0;
    justify-content: center;
}
.model-foot{
    border-top: 2rpx solid #f5f5f5
}
.model-sur{
    padding: 20rpx 0;
    justify-content: center;
    border-right: 1rpx solid #f5f5f5;
    color:#409CCB;
}
.model-cancel{
    padding: 20rpx 0;
    border-left: 1rpx solid #f5f5f5;
    justify-content: center;
}
.sucorder{
height: 100vh;
}
.sucorder-hd{
    background:rgba(255,255,255,1);
    padding: 27rpx 24rpx 40rpx 27rpx 
}
.sucorder-hd-tp cover-image{
    height: 125rpx ;
    width: 125rpx
}
.sucorder-hd-line:first-child{
    margin-top: 15rpx
}
.sucorder-hd-line{
    margin-top: 46rpx
}
.sucorder-hd-dist{
    color:rgba(64,156,203,1);
}
.sucorder-hd-detail{
    width:165rpx;
height:50rpx;
background:rgba(64,156,203,1);
border-radius:10rpx;
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);
line-height:34rpx;
text-align: center;
line-height: 50rpx
}
.sucorder-hd-cancel{
    justify-content: flex-end;
    color:rgba(102,102,102,1);
    padding-right:20rpx 
}
.sucorder-hd-dtl{
    justify-content: flex-end   
}

</style>
