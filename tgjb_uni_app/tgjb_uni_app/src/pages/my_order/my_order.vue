<template>
  <view class="span24 myorder">
      <view class="span24 myorder-tab">
        <wuc-tab tabStyle="width:100%" :tab-list="tabList" :tabCur.sync="TabCur" textFlex="true"></wuc-tab>
        </view>
        <view class="span24 myorder-ct">
        <swiper :current="TabCur" duration="300" @change="swiperChange">
            <!-- 全部 -->
  <swiper-item>
      <scroll-view style="height:100%" class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
          <view class="span24 myorder-box">
          <view class="span24 myorder-it" v-for="item in all_list" :key="item.id"  @tap.stop="toDetails(item,$event)">
      <view class="span24">
        <view class="span17 myorder-nm">订单号：{{item.internal_order_sn}}</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===1">待付款</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===2">待派送</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===3">派送中</view>
        <view class="span7 myorder-status" style="color:#FDD000" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  :src='item.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-nm">{{item.detail[0].spu_name}}</view>
              <view class="span24 myorder-goods-ms">备注：{{item.remarks}}</view>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-count">x{{item.detail[0].number}}</view>
              <view class="span24 myorder-goods-jg">￥{{item.detail[0].total_price}}</view>
          </view>
      </view>
      <view class="span24 myorder-goods-ctrol">
          <view class="myorder-goods-del" v-if="item.order_status===4||item.order_status===1" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===1" @tap.stop="toPay(item,$event)">去支付</view>
      </view>
   </view>
   </view>
    </scroll-view>
  </swiper-item>
  <!-- 待支付 -->
    <swiper-item>
         <scroll-view style="height:100%" class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
          <view class="span24 myorder-box">
          <view class="span24 myorder-it" v-for="item in wait_list" :key="item.id"  @tap.stop="toDetails(item,$event)">
      <view class="span24">
        <view class="span17 myorder-nm">订单号：{{item.internal_order_sn}}</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===1">待付款</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===2">待派送</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===3">派送中</view>
        <view class="span7 myorder-status" style="color:#FDD000" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  :src='item.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-nm">{{item.detail[0].spu_name}}</view>
              <view class="span24 myorder-goods-ms">备注：{{item.remarks}}</view>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-count">x{{item.detail[0].number}}</view>
              <view class="span24 myorder-goods-jg">￥{{item.detail[0].total_price}}</view>
          </view>
      </view>
      <view class="span24 myorder-goods-ctrol">
          <view class="myorder-goods-del" v-if="item.order_status===4||item.order_status===1" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===1" @tap.stop="toPay(item,$event)">去支付</view>
      </view>
   </view>
   </view>
    </scroll-view>
    </swiper-item>
    <!-- 待派送 -->
    <swiper-item>
         <scroll-view style="height:100%" class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
          <view class="span24 myorder-box">
          <view class="span24 myorder-it" v-for="item in paisong_list" :key="item.id"  @tap.stop="toDetails(item,$event)">
      <view class="span24">
        <view class="span17 myorder-nm">订单号：{{item.internal_order_sn}}</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===1">待付款</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===2">待派送</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===3">派送中</view>
        <view class="span7 myorder-status" style="color:#FDD000" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  :src='item.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-nm">{{item.detail[0].spu_name}}</view>
              <view class="span24 myorder-goods-ms">备注：{{item.remarks}}</view>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-count">x{{item.detail[0].number}}</view>
              <view class="span24 myorder-goods-jg">￥{{item.detail[0].total_price}}</view>
          </view>
      </view>
      <view class="span24 myorder-goods-ctrol">
          <view class="myorder-goods-del" v-if="item.order_status===4||item.order_status===1" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===1" @tap.stop="toPay(item,$event)">去支付</view>
      </view>
   </view>
   </view>
    </scroll-view>
    </swiper-item>
    <!-- 派送中 -->
    <swiper-item>
         <scroll-view style="height:100%" class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
          <view class="span24 myorder-box">
          <view class="span24 myorder-it" v-for="item in paisonging_list" :key="item.id"  @tap.stop="toDetails(item,$event)">
      <view class="span24">
        <view class="span17 myorder-nm">订单号：{{item.internal_order_sn}}</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===1">待付款</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===2">待派送</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===3">派送中</view>
        <view class="span7 myorder-status" style="color:#FDD000" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  :src='item.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-nm">{{item.detail[0].spu_name}}</view>
              <view class="span24 myorder-goods-ms">备注：{{item.remarks}}</view>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-count">x{{item.detail[0].number}}</view>
              <view class="span24 myorder-goods-jg">￥{{item.detail[0].total_price}}</view>
          </view>
      </view>
      <view class="span24 myorder-goods-ctrol">
          <view class="myorder-goods-del" v-if="item.order_status===4||item.order_status===1" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===1" @tap.stop="toPay(item,$event)">去支付</view>
      </view>
   </view>
   </view>
    </scroll-view>
    </swiper-item>
    <!-- 已完成 -->
    <swiper-item>
         <scroll-view style="height:100%" class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
          <view class="span24 myorder-box">
          <view class="span24 myorder-it" v-for="item in cmplt_list" :key="item.id"  @tap.stop="toDetails(item,$event)">
      <view class="span24">
        <view class="span17 myorder-nm">订单号：{{item.internal_order_sn}}</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===1">待付款</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===2">待派送</view>
        <view class="span7 myorder-status" style="color:#FF1D1D" v-if="item.order_status===3">派送中</view>
        <view class="span7 myorder-status" style="color:#FDD000" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  :src='item.detail[0].goods_spu.commodity_image'></image>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-nm">{{item.detail[0].spu_name}}</view>
              <view class="span24 myorder-goods-ms">备注：{{item.remarks}}</view>
          </view>
          <view class="span8">
              <view class="span24 myorder-goods-count">x{{item.detail[0].number}}</view>
              <view class="span24 myorder-goods-jg">￥{{item.detail[0].total_price}}</view>
          </view>
      </view>
      <view class="span24 myorder-goods-ctrol">
          <view class="myorder-goods-del" v-if="item.order_status===4||item.order_status===1" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
          <view class="myorder-goods-xq" style="width:170rpx" v-if="item.order_status===1" @tap.stop="toPay(item,$event)">去支付</view>
      </view>
   </view>
   </view>
    </scroll-view>
    </swiper-item>
  </swiper>
  </view>
   <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该条订单？' @cancel='cancelModel' @confirm='confirmModel'/>
    <uni-popup ref="popup" type="center" class="mygoods-model-bt">
		<view class="span24 mygoods-model">
			<view class="span24 mygoods-model-close"><image @tap="closeModel"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_shanchu.png'></image></view>
			<view class="span24 mygoods-model-tt" >您是否确认收货</view>
			<view class="span24" style="justify-content: center;"><view class="mygoods-model-btn1" @tap="closeModel" >取消</view><view @tap="confirmGoods" class="mygoods-model-btn2">确定</view></view>
		</view>
	</uni-popup>
 </view>
</template>

<script> 
import Modal from '../../components/x-modal/x-modal'
import { uniPopup   } from "@dcloudio/uni-ui";
import HMmessages from "../../components/HM-messages/HM-messages.vue";
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
export default {
  data() {
    return { 
        TabCur: 0,
        tabList: [{ name: '全部' }, { name: '待支付' },{ name: '待派送' },{ name: '派送中' },{ name: '已完成' }],
        all_list:[],
        all_page:1,
        all_first:true,
        
        wait_list:[],
        wait_page:1,
        wait_first:true,
        
        paisong_list:[],
        paisong_page:1,
        paisong_first:true,
        
        paisonging_list:[],
        paisonging_page:1,
        paisonging_first:true,

        cmplt_list:[],
        cmplt_page:1,
        cmplt_first:true,
        
        is_loading:true,
        showModel:false,
        curClickItem:null
    };
  },
  methods: {
      toDetails(item){
          uni.navigateTo({url: `/pages/my_order_details/my_order_details?id=${item.id}`});
      },
      swiperChange(e){
            this.TabCur=e.detail.current
             if(this.TabCur==0){
                 if(this.all_first){
                     this.reloadList()
                 }
             }
          if(this.TabCur==1){
              if(this.wait_first){
                     this.reloadList()
                 }
          }
          if(this.TabCur==2){
              if(this.paisong_first){
                     this.reloadList()
                 }
          }
          
          if(this.TabCur==3){
              if(this.paisonging_first){
                     this.reloadList()
                 }
          }
          if(this.TabCur==4){
              if(this.cmplt_first){
                     this.reloadList()
                 }
          }
        },
        scrolltolower(){
                     this.reloadList()
        },
        toPay(it,e){
            this.$http({ url: `api/store/go_pay/${it.id}`,data:{},method:'post'}).then(res=>{
this.$http({ url: `api/payment/pay`,data:{order_id:it.id},method:'post'}).then(res => {
		
     var a = res.data
          uni.requestPayment({
        timeStamp: a.timeStamp,
        nonceStr: a.nonceStr,
        package: a.package,
        signType: 'MD5',
        paySign: a.paySign,
        success(res) {
            uni.navigateTo({url: `/pages/charge_paysuccess/charge_paysuccess`});
            uni.showToast({
    title: '支付成功',
    duration: 2000,
});
        },
        fail(res) {
          uni.showToast({
    title: '支付失败',
    duration: 2000,
    icon:'none'
});
        }
      })
          
          })
          .catch(res => {
              uni.showToast({
    title: '异常',
    duration: 2000,
    icon:'none'
});
          });
            }).catch(res=>{
uni.showToast({
    title: res.msg,
    duration: 2000,
    icon:'none'
});
            })
        },
      reloadList(){
          let order_status=null
          let page=null
          if(this.TabCur==0){order_status='';page=this.all_page}
          if(this.TabCur==1){order_status=1;page=this.wait_page}
          if(this.TabCur==2){order_status=2;page=this.paisong_page}
          if(this.TabCur==3){order_status=3;page=this.paisonging_page}
          if(this.TabCur==4){order_status=4;page=this.cmplt_page}
          if(this.is_loading){
              uni.showLoading({
    title: '加载中'
})
    this.is_loading=false
this.$http({ url: `api/store/my_order` ,data:{limit:10,page:page,order_status:order_status}}).then(res => { //获取充电记录'
       this.is_loading=true
       uni.hideLoading();
       if(res.data.data.length==0){
           uni.showToast({
    title: '暂无数据',
    duration: 2000,
    icon:"none"
});
       }else{
          if(this.TabCur==0){
        this.all_first=false
        this.all_page+=1
		this.all_list=this.all_list.concat(res.data.data)
          }
          if(this.TabCur==1){
        this.wait_first=false
        this.wait_page+=1
		this.wait_list=this.wait_list.concat(res.data.data)
          }
          if(this.TabCur==2){
        this.paisong=false
        this.paisong_page+=1
		this.paisong_list=this.paisong_list.concat(res.data.data)
          }
          if(this.TabCur==3){
        this.paisonging_first=false
        this.paisonging_page+=1
		this.paisonging_list=this.paisonging_list.concat(res.data.data)
          }
          if(this.TabCur==4){
        this.cmplt_first=false
        this.cmplt_page+=1
		this.cmplt_list=this.cmplt_list.concat(res.data.data)}
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
      deleItem(item,e){
          this.curClickItem=item
          this.$refs.popup.open()
      },
      confirmGoods(){//确认收货
           this.$http({
        url: `api/store/confirm_order/${this.curClickItem.id}`,
        method: "POST",
        data: {
        }
      }).then(res => {
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            this.$refs.popup.close()
            this.reloadList(1,true)
        })
        .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });
        });
      },
      closeModel(){
          this.$refs.popup.close()
      },
      openDeleModel(item,e){
          this.showModel=true
          this.curClickItem=item
      },
      confirmModel(e){
           uni.showLoading({
    title: '加载中'
})
          this.$http({
        url: `api/store/del_order/${this.curClickItem.id}`,
        method: "POST",
        data: {
        }
      }).then(res => {
            uni.hideLoading();
            this.showModel=false
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            if(this.TabCur==0){
        this.all_page=1
		this.all_list=[]
          }
          if(this.TabCur==1){
        this.wait_page=1
		this.wait_list=[]
          }
          if(this.TabCur==2){
        this.paisong_page=1
		this.paisong_list=[]
          }
          if(this.TabCur==3){
        this.paisonging_page=1
		this.paisonging_list=[]
          }
          if(this.TabCur==4){
        this.cmplt_page=1
        this.cmplt_list=[]
        }
            this.reloadList()
        })
        .catch(res => {
            uni.hideLoading();
            this.HMmessages.show(res.msg, { icon: "error" });
        });
      }
  },
  components: {HMmessages,Modal,uniPopup,WucTab},
  onUnload(){
     let str=getCurrentPages()[getCurrentPages().length-2]
     if(str.route=='pages/buy_goods/buy_goods'){
         uni.switchTab({
    url: '/pages/store/store'
});
     }
  },
  onLoad(opt) {
      this.TabCur=parseInt(opt.type)
      this.reloadList()
  },
  onShow() {
  },
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
  overflow: hidden;
}
.myorder{
    height: 100%
}
.myorder-tab{
    height: 8vh;
}
.myorder wuc-tab{
    width: 100%;
}
.myorder-ct{
    height: 92vh
}
swiper{
    width: 100%;
  height: 100%;
}
.myorder-ico{
    width: 43rpx;
    height: 43rpx;
    margin-right: 10rpx;
}
.myorder-ico image{
    height: 100%;
    width:100%
}
.myorder-line{
    margin-top: 10rpx
}
.myorder-it{
    padding: 25rpx 25rpx 29rpx 23rpx;
    background: white;
    margin:23rpx 0rpx 0 0rpx;
    border-radius:10rpx;
}
.myorder-box{
    padding: 0 24rpx;
    padding-bottom: 200rpx
}
.myorder-nm{
    color:#666666FF;
    font-size:26rpx;
}
.myorder-status{
    justify-content: flex-end;color:rgba(253,208,0,1);
}
.myorder-tp image{
    width: 217rpx;
    height: 149rpx
}
.myorder-goods-nm{
align-items: center;
font-size:30rpx;
color:rgba(51,51,51,1);
margin-left: 31rpx
}
.myorder-goods-ms{
align-items: center;
font-size:28rpx;
font-weight:500;
color:rgba(153,153,153,1);
margin-left: 31rpx
}
.myorder-goods-count{
align-items: center;
justify-content: flex-end
}
.myorder-goods-jg{
align-items: center;
justify-content: flex-end;
font-size:28rpx;
font-weight:500;
color:rgba(255,29,29,1);
}
.myorder-goods-del{
width:170rpx;
height:57rpx;
border:1rpx solid rgba(153,153,153,1);
border-radius:29rpx;
color: rgba(153,153,153,1);
text-align: center;
line-height: 57rpx;
margin-left: 25rpx
}
.myorder-goods-xq{
width:170rpx;
height:57rpx;
border:1rpx solid rgba(253,209,0,1);
border-radius:29rpx;
color: rgba(253,208,0,1);
text-align: center;
line-height: 57rpx;
margin-left: 25rpx
}
.myorder-goods-ctrol{
    justify-content: flex-end;
    margin-top: 9rpx;
    margin-top: 40rpx
}
.mygoods-model{
	padding-bottom: 40rpx
}
.mygoods-model-tt{
	font-size: 30rpx;
	justify-content: center;color:rgba(102,102,102,1);
	margin-bottom: 80rpx;
	padding: 40rpx 0 0 0
}
.mygoods-model-btn1{
font-size:30rpx;
font-weight:500;
color:rgba(153,153,153,1);
text-align: center;
line-height: 46rpx;
	width:131rpx;
height:46rpx;
border:1rpx solid rgba(153,153,153,1);
border-radius:23rpx;
margin-right: 60rpx
}
.mygoods-model-btn2{
font-size:30rpx;
font-weight:500;
	width:131rpx;
color:rgba(253,209,0,1);
text-align: center;
line-height: 46rpx;
border:1rpx solid rgba(253,208,0,1);
height:46rpx;
border-radius:23rpx;
}
.mygoods-model-close{
	justify-content: flex-end;
}
.mygoods-model-close image{
	height:24rpx;
	width:24rpx
}
</style>
