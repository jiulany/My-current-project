<template>
  <view class="span24 myinvoicepep">
      <view v-if="cur_obj===1">
          <view class="span24 myinvoicepep-ct">
          <view class="span24 myinvoicepep-it">
              <view class="span8">抬头类型：</view>
              <view class="span16"><view class="myinvoicepep-singe" style="background:rgba(255,209,0,1)">个人</view><view class="myinvoicepep-comp"  @tap="switchObj('comp',$event)">企业</view></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票抬头：</view>
              <view class="span16">个人</view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">电子邮箱：</view>
              <view class="span16"><input v-model="email" type="text" placeholder="请输入您的电子邮箱"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">电话：</view>
              <view class="span16"><input v-model="tel" type="text" placeholder="请输入您的电话"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">备注：</view>
              <view class="span16">显示发票日期</view>
          </view>
      </view>
      <view class="span24 myinvoicepep-ct">
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票内容：</view>
              <view class="span16">{{fp.name}}</view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票金额：</view>
              <view class="span16">{{fp.price}}￥</view>
          </view>
      </view>
      </view>
      <view v-if="cur_obj===2">
      <view class="span24 myinvoicepep-ct">
          <view class="span24 myinvoicepep-it">
              <view class="span8">抬头类型：</view>
              <view class="span16"><view class="myinvoicepep-singe" @tap="switchObj('singe',$event)">个人</view><view class="myinvoicepep-comp" style="background:rgba(255,209,0,1)">企业</view></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票抬头：</view>
              <view class="span16"><input v-model="title" type="text" placeholder="请输入公司名称"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">纳税人识别号：</view>
              <view class="span16"><input v-model="identity" type="text" placeholder="请输入识别号"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">电子邮箱：</view>
              <view class="span16"><input v-model="email" type="text" placeholder="请输入公司电子邮箱"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">电话：</view>
              <view class="span16"><input v-model="tel" type="text" placeholder="请输入注册电话"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">地址：</view>
              <view class="span16"><input v-model="address" type="text" placeholder="请输入注册地址"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">开户行：</view>
              <view class="span16"><input v-model="opening_bank" type="text" placeholder="请输入开户行"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">开户行账号：</view>
              <view class="span16"><input v-model="opening_number" type="text" placeholder="请输入开户行账号"></view>
          </view>
      </view>
      <view class="span24 myinvoicepep-ct">
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票内容：</view>
              <view class="span16">{{fp.name}}</view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票金额：</view>
              <view class="span16">{{fp.price}}￥</view>
          </view>
      </view>
      </view>
      <view class="span24 myinvoicepep-fixed" @tap="sumbit" >提交申请</view>
      
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        cur_obj:1,
        fp:null,
        title:null,
    };
  },
  methods: {
      switchObj(va,e){
          if(va==="singe"){
              this.cur_obj=1
              this.title='个人'
          }
          if(va==="comp"){
              this.cur_obj=2
              this.title=''
          }
      },
      sumbit(){
          this.$http({ url: `api/mine/create_invoice` ,data:{
              id:this.fp.id,
              is_personal:this.cur_obj,
              title:this.title,
              identity:this.identity,
              opening_bank:this.opening_bank,
              opening_number:this.opening_number,
              email:this.email,
              tel:this.tel,
              address:this.address,
          }}).then(res => {
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            setTimeout(()=>{
          uni.navigateTo({url: `/pages/my_invoice_success/my_invoice_success?is_personal=${this.cur_obj}`});
            },1500)
          })
          .catch(res => {
              this.HMmessages.show(res.msg, { icon: "error" });
          });
      }
  },
  components: { HMmessages},
  onLoad(opt) {
      this.fp=uni.getStorageSync("fp")
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
.myinvoicepep-ct{
    padding: 23rpx 27rpx;
    background: white;
    margin-top: 19rpx
}
.myinvoicepep-it{
    padding: 25rpx  0
}
.myinvoicepep-it input{
    font-size: 30rpx
}
.myinvoicepep-singe{
    padding: 0 24rpx;background:white;
    margin-right: 100rpx;border-radius:8rpx;font-size:30rpx;
}
.myinvoicepep-comp{
    padding: 0 24rpx;background:white;border-radius:8rpx;font-size:30rpx;
}
.myinvoicepep-fixed{
    position: fixed;
    height:96rpx;
    background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
font-size:30rpx;
font-weight:500;
color:rgba(173,102,1,1);
justify-content: center;
align-items: center;
bottom: 0
}
</style>
