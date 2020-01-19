<template>
  <view class="span24 myinvoicehy">
      <scroll-view :scroll-y="true" @scrolltolower="bottomAdv">
          <view class="span24">
              <view class="span24 myinvoicehy-it" v-for="item in list" :key="item.id">
                  <view class="span24 myinvoicehy-it-line">
                      <view class="span12  myinvoicehy-type" v-if="item.type==1">服务类</view>
                      <view class="span12 myinvoicehy-type" v-if="item.type==2">缴费类</view>
                      <view class="span12 myinvoicehy-tm">{{item.created_at}}</view>
                  </view>
                  <view class="span24 myinvoicehy-it-line">
                      <view class="span12 myinvoicehy-price">￥{{item.price}}</view>
                      <view class="span12 myinvoicehy-status" v-if="item.status==0">待开票</view>
                      <view class="span12 myinvoicehy-status" v-if="item.status==1">已开票</view>
                      <view class="span12 myinvoicehy-status" v-if="item.status==2">已取票</view>
                  </view>
              </view>
          </view>
      </scroll-view>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        list:[],
        page:1,
        is_load:true
    };
  },
  methods: {
      loadList(){
          if(this.is_load){
               uni.showLoading({
    title: '加载中'
});
          this.is_load=false
          this.$http({ url: `api/mine/my_invoice` ,data:{limit:10,page:this.page}}).then(res => {
          uni.hideLoading();
          this.is_load=true
          this.list=this.list.concat(res.data.data)
          this.page=this.page+1
          })
          .catch(res => {
              uni.hideLoading();
              this.is_load=true
              this.HMmessages.show(res.msg, { icon: "error" });
          });
          }
      },
      bottomAdv(){
          this.loadList()
           
      }
  },
  components: { HMmessages},
  onLoad(opt) {
          this.loadList()
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
}
.myinvoicehy{
    padding-bottom: 200rpx
}
.myinvoicehy-it{
    padding: 30rpx 30rpx;
    background: white;
    margin-top: 20rpx
}
.myinvoicehy-it-line{
    align-items: center
}
.myinvoicehy-it-line:nth-of-type(1){
    margin-bottom: 20rpx
}
.myinvoicehy-price{
font-size:36rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,209,0,1);
}
.myinvoicehy-type{
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.myinvoicehy-tm{
font-size:30prx;
font-family:PingFang SC;
justify-content: flex-end;
font-weight:500;
color:rgba(153,153,153,1);
}
.myinvoicehy-sq{
font-size:30r   px;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.myinvoicehy-status{
font-size:30rpx;
justify-content: flex-end;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,209,0,1);
}
</style>
