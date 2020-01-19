<template>
  <view class="span24 charge">
    <view class="span24 charge-sty">
      <view class="span12"   @tap="switchHd(1,$event)" :style="cur===1?'background:#FDD000':'background:#FFFFFF'">充电记录</view>
      <view class="span12"   @tap="switchHd(2,$event)"  :style="cur===2?'background:#FDD000':'background:#FFFFFF'">缴费</view>
    </view>
    <view v-if="cur===1" class="span24 charge-ct">
        <scroll-view  scroll-y="true" @scrolltolower="lowerCharge"  scrollX="false">
            <view class="charge-ct-nei">
      <view class="span24" v-for="item in charge_list" :key="item.id">
        <view class="span24 charge-tt">{{item.community.community_name}}</view>
        <view class="span24 charge-obj-box">
          <view class="span24">{{item.updated_at}}</view>
          <view class="span24 charge-obj-row">
              <view class="span12 charge-obj"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_bianhao.png'></image>编号：{{item.plug_detail.plug_number}}</view>
              <view class="span12 charge-obj"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_dianzhuang.png'></image>电桩：{{item.plug_detail.path}}</view>
          </view>
          <view class="span24 charge-obj-row">
              <view class="span12 charge-obj"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_chongdian.png'></image>充电：{{item.plug_detail.open_time/60}}h</view>
              <view class="span12 charge-obj"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_zhifu.png'></image>支付：￥{{item.order_total_price}}</view>
          </view>
        </view>
      </view>
      </view>
       </scroll-view>
    </view>
    <view v-if="cur===2" class="span24">
        <view class="span24 charge-tt">缴费金额</view>
        <view class="span24 charge-buy-obj">
            <view>50￥<image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_diankachongzhi.png'></image></view>
            <view>100￥<image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_diankachongzhi.png'></image></view>
            <view>200￥<image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_diankachongzhi.png'></image></view>
        </view>
        <view class="span24 charge-buy-zdy">
            <view class="span6">自定义金额</view>
            <view class="span18 charge-buy-zdyinp"><input type="text" placeholder="请输入金额"></view>
        </view>
        <view class="span24 charge-buy-sure">
            <view @tap="toPay">确定</view>
        </view>
    </view>
     <uni-popup ref="popup" type="bottom" class="goodsdtl-pop-bto">
		<view class="span24 charge-model">
			<view class="span24 charge-model-it">
                <view class="span24 charge-model-fy">总共费用</view>
                <view class="span24 charge-model-fyz">50￥</view>
            </view>
			<view class="span24">
                <view class="span24 charge-model-tyit">
                    <view class="span22 charge-model-tyico" >
                        <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixin.png'></image>微信支付
                    </view>
                    <view class="span2 charge-model-tysle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image></view>
                </view>
                <view class="span24 charge-model-sure">
                    <view @tap="toSuccess">确定</view>
                </view>
            </view>
		</view>
	</uni-popup>
    <view class="saoma" @tap="saoma"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_saoma.png'></image></view>
  </view>
</template>

<script>
import {uniPopup} from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      cur: 1,
      charge_list:[],
      is_loading:true,
      charge_page:1
    };
  },
  methods: {
      switchHd(n,e){
         this.cur=n
      },
      toPay(){
	  this.$refs.popup.open()
      },
      lowerCharge(){
          console.log("sss")
          this.loadList()
      },
      toSuccess(){
          uni.navigateTo({url: `/pages/charge_paysuccess1/charge_paysuccess1`});
      },
      loadChargeList(){
          uni.showLoading({
    title: '加载中'
});
if(this.is_loading){
    this.is_loading=false
this.$http({ url: `api/intelligence/order_list` ,data:{limit:10,page:this.charge_page}}).then(res => { //获取充电记录
       this.is_loading=true
       uni.hideLoading();
       if(res.data.data.length==0){
           uni.showToast({
    title: '暂无数据',
    duration: 2000,
    icon:"none"
});
       }else{
        this.charge_page+=1
       //res.data.data
		  this.charge_list=this.charge_list.concat(res.data.data)
       }
		  })
          .catch(res => {
              this.is_loading=true
               uni.hideLoading();
               uni.showToast({
    title: '异常',
    duration: 2000,
    icon:"none"
});
          });
}
      
      },
      saoma(){
          uni.scanCode({
             success: function (res) {
                console.log('条码类型：' + res.scanType);
                console.log('条码内容：' + res.result);
                }
});
      }
  },
  components: {uniPopup},
  onLoad() {
      this.loadChargeList()
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
}
.charge{
    overflow: hidden;
}
.charge-sty {
  height: 8.1vh;
}
.charge-ct{
  height: 91.9vh;
}
.charge-sty view {
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  color: rgba(71, 71, 71, 1);
}
.charge-ct-nei{
    padding-bottom: 200rpx
}
.charge-tt {
  font-size: 28rpx;
  font-family: PingFang SC;
  padding: 35rpx 0 19rpx 42rpx;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.charge-obj{
    align-items: center
}
.charge-obj image{ 
width: 25rpx;
height: 25rpx;
margin-right: 10rpx
}
.charge-obj-row{
    padding-left: 50rpx
}
.charge-obj-box{
    padding: 13rpx 0 35rpx 26rpx;
    background: white;
    margin: 0 15rpx
}
.charge-buy-obj{
    background: white;
    padding: 52rpx 32rpx 48rpx 32rpx;
    justify-content: space-between
}
.charge-buy-obj view{
    width:173rpx;
height:100rpx;
border:1px solid rgba(253,208,0,1);
line-height: 100rpx;
text-align: center;
color: #FDD000;
font-size:40rpx;
position: relative;
}
.charge-buy-obj view image{
    position: absolute;
    bottom: 6rpx;
    right: 6rpx;
    width: 29rpx;
    height: 21rpx;
}
.charge-buy-zdy{
    padding: 26rpx 35rpx;
    background: white;
    margin-top: 41rpx
}
.charge-buy-zdyinp input{
width: 100%;
text-align: end;
font-size:28rpx;
}
.charge-buy-sure{
    margin-top: 300rpx;
    justify-content: center
}
.charge-buy-sure view{
width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37px;
color:rgba(173,102,1,1);
line-height: 73rpx;
text-align: center
}
.charge-model-it{
    padding: 44rpx 0;
    border-bottom: 1px solid rgba(240,240,240,1);   
}
.charge-model-fy{
    font-size: 32rpx;
    justify-content: center
}
.charge-model-fyz{
    font-size:72rpx;
color:rgba(253,208,0,1);
    justify-content: center
}
.charge-model-tyit{
    padding: 40rpx;
}
.charge-model-tyico {
    align-items: center
}
.charge-model-tyico image{
    height: 40rpx;
    width: 40rpx;
    margin-right: 20rpx
}
.charge-model-tysle image{
    height: 40rpx;
    width: 40rpx;
}
.charge-model-sure {
    justify-content: center;
    padding: 48rpx 0
}
.charge-model-sure view{
    width:575rpx;
    height:73rpx;
    background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
    border-radius:37px;font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 73rpx
}
.saoma{
    position: fixed;
    border-radius: 50%;
    background: white;
    bottom: 220rpx;
    right: 70rpx;
    width: 65rpx;
    height: 65rpx;
    display: flex;
    align-items: center;
    justify-content: center;
        box-shadow: 1px 1px 2px rgba(0,0,0,.1);
}
.saoma image{
    width: 70%;
    height: 70%;
}
</style>
