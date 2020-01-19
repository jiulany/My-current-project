<template>
  <view class="span24 myappoint">
      <!-- <view class="span24 myappoint-hist" @tap="toHistoryAppo">
          <view class="span20 myappoint-tt">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_lishi.png'></image>历史预约
          </view>
          <view class="span4 myappoint-rtr">
              <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image>
          </view>
      </view> -->
      <view class="span24 myappoint-ct">
          
      <scroll-view :scroll-y="true" style="height:100vh" @scrolltolower="lower">
          <view class="span24 myappoint-box">
          <view class="span24 myappoint-it" v-for="item in appoint_list" :key="item.id">
              <view class="span24 myappoint-it-hd">
                  <view class="span5 myappoint-it-ky">订单号</view>
                  <view class="span19 myappoint-it-val">{{item.internal_order_sn}}</view>
              </view>
              <view class="span24 myappoint-it-ctit">
                  <view class="span5 myappoint-it-ky">小区名称</view>
                  <view class="span19 myappoint-it-val">{{item.community.community_name}}</view>
              </view>
              <view class="span24 myappoint-it-ctit">
                  <view class="span5 myappoint-it-ky">预约地址</view>
                  <view class="span19 myappoint-it-val">{{item.full_address}}</view>
              </view>
              <view class="span24 myappoint-it-ctit">
                  <view class="span5 myappoint-it-ky">预约时间</view>
                  <view class="span19 myappoint-it-val">{{item.created_at}}</view>
              </view>
              <view class="span24 myappoint-it-ctit">
                  <view class="span5 myappoint-it-ky">预约项目</view>
                  <view class="span19 myappoint-it-val">{{item.detail[0].spu_name}}</view>
              </view>
              <view class="span24 myappoint-it-ctit">
                  <view class="span5 myappoint-it-ky">价格</view>
                  <view class="span19 myappoint-it-val">{{item.order_total_price}}￥</view>
              </view>
              <view class="span24 myappoint-it-ctit" style="padding-bottom:19rpx">
                  <view class="span5 myappoint-it-ky">备注</view>
                  <view class="span19 myappoint-it-val">{{item.remarks}}</view>
              </view>
              <view class="span24 myappoint-it-ft">
                  <span class="myappoint-cancel" v-if="item.order_status===2&&item.is_refund===0" @tap="openModel(item,$event)">取消预约</span>
                  <span class="myappoint-cancel" v-if="item.order_status===1">待付款</span>
                  <span class="myappoint-cancel" v-if="item.order_status===3">待服务</span>
                  <span class="myappoint-success" v-if="item.order_status===4" @tap="deleItem(item,$event)">删除</span>
                  <span class="myappoint-cancel" v-if="item.order_status===4">交易成功</span>
                  <span class="myappoint-cancel" v-if="item.is_refund===1&&item.detail[0].refund_status===1" >退款中</span>
                  <span class="myappoint-cancel" v-if="item.is_refund===1&&item.detail[0].refund_status===2" >已取消</span>
              </view>
          </view>
          </view>
      </scroll-view>
      </view>
	<uni-popup ref="popup" type="center" class="myappoint-model-bt">
		<view class="span24 myappoint-model" v-if="is_yuyue">
			<view class="span24 myappoint-model-close"><image @tap="closeModel"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_shanchu.png'></image></view>
			<view class="span24 myappoint-model-tt" >您是否确定要取消预约</view>
			<view class="span24" style="justify-content: center;"><view class="myappoint-model-btn1" @tap="closeModel" >取消</view><view @tap="cancelYuYue" class="myappoint-model-btn2">确定</view></view>
		</view>
        <view class="span24 myappoint-model" v-else>
			<view class="span24 myappoint-model-close"><image @tap="closeModel"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_shanchu.png'></image></view>
			<view class="span24 myappoint-model-tt" >您是否确定要删除该信息</view>
			<view class="span24" style="justify-content: center;"><view class="myappoint-model-btn1" @tap="closeModel" >取消</view><view @tap="deleYuYue" class="myappoint-model-btn2">确定</view></view>
		</view>
	</uni-popup>
    <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <view class="span24 queshen" v-if="show_default">
        <view class="span24 queshen-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property/quesheng.png'></image></view>
        <view class="span24 queshen-tt">还没有预约数据~</view>
    </view>
  </view>
</template>

<script>
import { uniPopup   } from "@dcloudio/uni-ui";
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        appoint_list:[],
        page:1,
        showModel:false,
        is_yuyue:true,
        type:null,
        is_load:true,
        show_default:false
    };
  },
  methods: {
      lower(){
          this.reloadList()
      },
      openModel(item,e){
          this.curClickItem=item
          this.is_yuyue=true
          uni.setStorageSync('cancel_order',item)
          this.$refs.popup.open()
      },
      closeModel(){
          this.$refs.popup.close()
      },
      deleItem(item,e){
          this.curClickItem=item
          this.is_yuyue=false
          this.$refs.popup.open()
      },
      deleYuYue(){
          this.$http({ url: `api/mine/del_appointment` ,data:{
               id:this.curClickItem.detail[0].id
           },method:"post"}).then(res => {
               this.$refs.popup.close()
               this.reloadList()
               this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
                   })
                    .catch(res => {
                        this.HMmessages.show(res.msg, { icon: "error"});
                    });
      },
      cancelYuYue(){
          this.$http({ url: `api/mine/cancel_appointment` ,data:{
               id:this.curClickItem.detail[0].id
           },method:"post"}).then(res => {
           this.$refs.popup.close()
           uni.navigateTo({url: '/pages/my_appoint_cancel/my_appoint_cancel'});
                   })
                    .catch(res => {});
      },
      toHistoryAppo(){
          uni.navigateTo({url: '/pages/my_appoint_history/my_appoint_history'});
      },
      reloadList(){
          if(this.is_load){
              uni.showLoading({
    title: '加载中'
});
              this.is_load=false
      this.$http({ url: `api/mine/appointment` ,data:{
          type:this.type,
          limit:10,
          page:this.page
           }}).then(res => {
               this.is_load=true
                uni.hideLoading();
               if(res.data.data.length==0){
                   if(this.page==1){//页数为1且无数据显示缺省页面
                       this.show_default=true
                   }
               }else{
                   this.show_default=false
                   this.appoint_list=this.appoint_list.concat(res.data.data)
                   this.page+=1
               }
       })
      .catch(res => {
          this.is_load=true
           uni.hideLoading();
      });
      }
          }
  },
  components: { uniPopup,HMmessages},
  onLoad(opt) {
      this.type=opt.type
      if(opt.type==6){
          uni.setNavigationBarTitle({
    title: '家政订单'
});
      }
      if(opt.type==2){
          uni.setNavigationBarTitle({
    title: '报修订单'
});
      }
  },
  onUnload(){
     console.log(getCurrentPages()) 
     let str=getCurrentPages()[getCurrentPages().length-2]
     if(str.route=='pages/service_appointment/service_appointment'){
         uni.navigateBack({
    delta: 2
});
     }
  },
  onShow() {
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
.myappoint-tt{
    align-items: center;
font-size:30rpx;
font-weight:500;
color:rgba(51,51,51,1);
line-height:80rpx;
}
.myappoint-hist{
    padding: 5rpx 25rpx 5rpx 34rpx;
    background: white;
    margin-top: 29rpx
}
.myappoint-tt image{
    height: 36rpx;
    width: 36rpx;
    margin-right: 10rpx
}
.myappoint-rtr{
    justify-content: flex-end;
    align-items: center
}
.myappoint-rtr image{
    width:20rpx;
height:36rpx;
}
.myappoint-box{
    padding: 24rpx;
    padding-bottom: 200rpx
}
.myappoint-it{
    background: white;
    font-size: 28rpx;
    border-radius: 10rpx;
    margin-bottom: 24rpx
}
.myappoint-it-hd{
    padding: 24rpx 22rpx 19rpx 37rpx;
    border-bottom: 2rpx dashed rgba(240,240,240,1);
}
.myappoint-it-ctit{
    padding: 24rpx 27rpx 0 37rpx;
}
.myappoint-it-ft{
    padding: 25rpx 22rpx 20rpx 37rpx;
    border-top: 2rpx dashed rgba(240,240,240,1);
    justify-content: flex-end;
}
.myappoint-it-val{
    justify-content: flex-end
}
.myappoint-success{
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,209,0,1);
margin-right: 34rpx
}
.myappoint-cancel{
font-size:28rpx;
font-weight:500;
color:rgba(153,153,153,1);
}

.myappoint-model{
	padding-bottom: 40rpx
}
.myappoint-model-tt{
	font-size: 30rpx;
	justify-content: center;color:rgba(102,102,102,1);
	margin-bottom: 80rpx;
	padding: 40rpx 0 0 0
}
.myappoint-model-btn1{
font-size:30rpx;
font-weight:500;
color:rgba(253,209,0,1);
text-align: center;
line-height: 46rpx;
	width:131rpx;
height:46rpx;
border:1rpx solid rgba(253,208,0,1);
border-radius:23rpx;
margin-right: 60rpx
}
.myappoint-model-btn2{
font-size:30rpx;
font-weight:500;
color:rgba(153,153,153,1);
	width:131rpx;
text-align: center;
line-height: 46rpx;
height:46rpx;
border:1rpx solid rgba(153,153,153,1);
border-radius:23rpx;
}
.myappoint-model-close{
	justify-content: flex-end;
}
.myappoint-model-close image{
	height:24rpx;
	width:24rpx
}
.queshen{
    height: 100%;
    background: white;
    position:fixed;
    left: 0;
    right: 0;
    align-items: flex-start;
    display: block
}
.queshen-tp{
    display: block;
    text-align: center;
    margin-top: 200rpx
}
.queshen-tp image{
    width: 326rpx;
height: 316rpx;
}
.queshen-tt{
    display: block;
    text-align: center;
    margin-top: 80rpx
}
</style>
