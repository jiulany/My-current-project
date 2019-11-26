<template>
  <view class="span24 myorder">
   <view class="span24 myorder-it" v-for="item in list" :key="item.id"  @tap="toDetails(item,$event)">
      <view class="span24">
        <view class="span2 myorder-ico">
            <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_head.png'></image>
        </view>
        <view class="span17 myorder-nm">脱狗家宝</view>
        <view class="span5 myorder-status" v-if="item.order_status===1">待付款</view>
        <view class="span5 myorder-status" v-if="item.order_status===2">待发货</view>
        <view class="span5 myorder-status" v-if="item.order_status===3">待收货</view>
        <view class="span5 myorder-status" v-if="item.order_status===4">订单完成</view>
      </view>
      <view class="span24 myorder-line">
          <view class="span8 myorder-tp">
              <image  src='https://imgcdn.tuogouchebao.com/property_store_goods.png'></image>
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
          <view class="myorder-goods-del" v-if="item.order_status===4" @tap.stop="openDeleModel(item,$event)">删除</view>
          <view class="myorder-goods-xq" style="width:153rpx" v-if="item.order_status===3" @tap.stop="deleItem(item,$event)">确认收货</view>
      </view>
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
export default {
  data() {
    return { 
        list:[],
        page:1,
        showModel:false,
        curClickItem:null
    };
  },
  methods: {
      toDetails(item){
          uni.navigateTo({url: `/pages/my_order_details/my_order_details?id=${item.id}`});
      },
      reloadList(page,is){
       this.$http({url:'api/store/my_order',data:{
          page:page
      }}).then(res=>{
          if(is){
          this.list=res.data.data
          }else{
          let a=this.list
          this.list=a.concat(res.data.data)
          }
          this.page=page+1
          if(res.data.data.length==0){
              this.HMmessages.show("查询无数据", { icon: "error" });
          }
      }).catch(res=>{
          this.HMmessages.show(res.msg, { icon: "error" });
      })
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
          this.$http({
        url: `api/store/del_order/${this.curClickItem.id}`,
        method: "POST",
        data: {
        }
      }).then(res => {
            this.showModel=false
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            this.reloadList(1,true)
        })
        .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });
        });
      }
  },
  components: {HMmessages,Modal,uniPopup},
  onLoad() {
  },
  onShow() {
      this.reloadList(1,true)
  },
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.myorder{
    padding-bottom: 200rpx
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
    margin:23rpx 24rpx 0 24rpx;
    border-radius:10rpx;
}
.myorder-nm{
    color:rgba(253,208,0,1);
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
width:103rpx;
height:40rpx;
border:1rpx solid rgba(153,153,153,1);
border-radius:20px;
color: rgba(153,153,153,1);
text-align: center;
line-height: 40rpx;
margin-left: 25rpx
}
.myorder-goods-xq{
    width:103rpx;
height:40rpx;
border:1rpx solid rgba(253,208,0,1);
border-radius:20rpx;
color: rgba(253,208,0,1);
text-align: center;
line-height: 40rpx;
margin-left: 25rpx
}
.myorder-goods-ctrol{
    justify-content: flex-end;
    margin-top: 9rpx
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
