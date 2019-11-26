<template>
  <view class="span24 paydetails">
    <view class="span24 paydetails-ct">
      <view class="span24" style="margin-top:25rpx" v-for="(item,key) in list" :key="key">
       <view class="span24 paydetails-it">
           <view class="span6 paydetails-it-tt">小区名称</view>
           <view class="span18 paydetails-it-ct">{{item[0].household.community.community_name}}</view>
       </view>
       <view class="span24 paydetails-it">
           <view class="span6 paydetails-it-tt">日期</view>
           <view class="span18 paydetails-it-ct">{{item[0].year+'-'+item[0].month}}</view>
       </view>
       <view class="span24 paydetails-it">
           <view class="span6 paydetails-it-tt">楼号</view>
           <view class="span18 paydetails-it-ct">{{item[0].household.house_number}}</view>
       </view>
       <view class="span24" style="background:white">
           <view class="span24 paydetails-fy-tt">费用列表</view>
           <view class="span24 paydetails-fy-box">
               <view class="span12 paydetails-fy-ct" v-for="it in item" :key="it.id">
                   <view  v-if="it.type===1"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>水费 {{it.total_price}}￥（代收）</view>
                   <view  v-if="it.type===2"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>电费 {{it.total_price}}￥（代收）</view>
                   <view  v-if="it.type===3"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>气费 {{it.total_price}}￥（代收）</view>
                   <view  v-if="it.type===4"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>物业费 {{it.total_price}}￥（代收）</view>
                   <view  v-if="it.type===5"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>垃圾费 {{it.total_price}}￥（代收）</view>
                   <view  v-if="it.type===6"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image>车位费 {{it.total_price}}￥（代收）</view>
               </view>
           </view>
       </view>
      </view>
    </view>
    <view class="span24 paydetails-paybox">
        <view class="span12 paydetails-all" v-if="status===0">全选 {{total}}￥</view>
        <view class="span12 paydetails-pay" v-if="status===0" @tap="toPay">去支付</view>
        <view class="span24 paydetails-sure" v-if="status===1">确定</view>
    </view>
    <uni-popup ref="popup" type="bottom" class="goodsdtl-pop-bto">
		<view class="span24 paydetail-model">
			<view class="span24 paydetail-model-it">
                <view class="span24 paydetail-model-fy">总共费用</view>
                <view class="span24 paydetail-model-fyz">50￥</view>
            </view>
			<view class="span24">
                <view class="span24 paydetail-model-tyit">
                    <view class="span22 paydetail-model-tyico" >
                        <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixin.png'></image>微信支付
                    </view>
                    <view class="span2 paydetail-model-tysle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image></view>
                </view>
                <view class="span24 paydetail-model-sure">
                    <view >确定</view>
                </view>
            </view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import {uniPopup   } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
        status:null,
        list:null,
        total:0
    };
  },
  methods: {
      toPay(){
	  this.$refs.popup.open()
      }
  },
  components: {uniPopup},
  onLoad(opt) {
      this.status=parseInt(opt.status)
      this.$http({ url: `api/mine/find_payment` ,data:{
        status:parseInt(opt.status),
        year:parseInt(opt.year),
        month:parseInt(opt.month),
      }}).then(res => { 
          this.list=res.data
          })
          .catch(res => {});
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
.paydetails{
    padding-bottom: 200rpx
}
.paydetails-ct{
    padding: 0 23rpx;
    background: #f5f5f5;
}
.paydetails-it{
    padding: 28rpx 0;
    border-bottom: 1px solid rgba(240,240,240,1);
    background: white
}
.paydetails-it-tt{
    padding-left: 20rpx
}
.paydetails-it-ct{
    justify-content: flex-end;
    padding-right: 20rpx
}
.paydetails-fy-tt{
    padding: 28rpx 0 28rpx 20rpx
}
.paydetails-fy-box{
    justify-content: space-between;
    padding:0 0 28rpx 20rpx
}
.paydetails-fy-ct{
    align-items: center;
}
.paydetails-fy-ct image{
    height: 25rpx;
    width: 25rpx;
    margin-right: 15rpx
}
.paydetails-paybox{
    position: fixed;
    bottom: 0;
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
}
.paydetails-all{
    height:98rpx;
background:rgba(255,255,255,1);font-size:34rpx;
font-weight:500;
color:rgba(253,208,0,1);
justify-content: center;
align-items: center
}
.paydetails-pay{
height:98rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);font-size:34rpx;
font-weight:500;
color:rgba(173,102,1,1);
justify-content: center;
align-items: center
}
.paydetails-sure{
    height:98rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);font-size:34rpx;
font-weight:500;
color:rgba(173,102,1,1);
justify-content: center;
align-items: center
}
.paydetail-model-it{
    padding: 44rpx 0;
    border-bottom: 1px solid rgba(240,240,240,1);   
}
.paydetail-model-fy{
    font-size: 32rpx;
    justify-content: center
}
.paydetail-model-fyz{
    font-size:72rpx;
color:rgba(253,208,0,1);
    justify-content: center
}
.paydetail-model-tyit{
    padding: 40rpx;
}
.paydetail-model-tyico {
    align-items: center
}
.paydetail-model-tyico image{
    height: 40rpx;
    width: 40rpx;
    margin-right: 20rpx
}
.paydetail-model-tysle image{
    height: 40rpx;
    width: 40rpx;
}
.paydetail-model-sure {
    justify-content: center;
    padding: 48rpx 0
}
.paydetail-model-sure view{
    width:575rpx;
    height:73rpx;
    background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
    border-radius:37px;font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 73rpx
}
</style>
