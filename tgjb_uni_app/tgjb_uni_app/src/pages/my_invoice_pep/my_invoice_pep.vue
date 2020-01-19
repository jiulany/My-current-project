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
              <view class="span16"><input v-model="title" type="text"></view>
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
              <view class="span16">{{name}}</view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票金额：</view>
              <view class="span16">{{price}}￥</view>
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
              <view class="span16"><input v-model="email0" type="text" placeholder="请输入公司电子邮箱"></view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">电话：</view>
              <view class="span16"><input v-model="tel0" type="text" placeholder="请输入注册电话"></view>
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
              <view class="span16">{{name}}</view>
          </view>
          <view class="span24 myinvoicepep-it">
              <view class="span8">发票金额：</view>
              <view class="span16">{{price}}￥</view>
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
        title:'个人',
        is_fdd:true,
        price:'',
        name:'',
        identity:null,
        opening_bank:null,
        opening_number:null,
        email:null,
        email0:null,
        tel:null,
        tel0:null,
        address:null
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
      panKong(){
          return new Promise((resolve,reject)=>{
              if(this.cur_obj==1){
                  if(this.email==null||this.email==''){
                      uni.showToast({
    title: '请填写邮箱',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.tel==null||this.tel==''){
                       uni.showToast({
    title: '请填写电话',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else{
                      resolve(true)
                  }
          }
          if(this.cur_obj==2){//企业填写判空
          if(this.title==null||this.title==''){
                      uni.showToast({
    title: '请填写发票抬头',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.identity==null||this.identity==''){
                       uni.showToast({
    title: '请填写识别号',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.email0==null||this.email0==''){
                      uni.showToast({
    title: '请填写邮箱',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.tel0==null||this.tel0==''){
                       uni.showToast({
    title: '请填写电话',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.address==null||this.address==''){
                       uni.showToast({
    title: '请填写地址',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.opening_bank==null||this.opening_bank==''){
                       uni.showToast({
    title: '请填写开户行',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else if(this.opening_number==null||this.opening_number==''){
                       uni.showToast({
    title: '请填写开户账号',
    duration: 2000,
    icon:"none"
});
                      resolve(false)
                  }else{
                      resolve(true)
                  }
          }
          })
      },
      sumbit(){
          if(this.is_fdd){
              this.is_fdd=false
          let email=''
          let tel=''
          if(this.cur_obj==1){
             email= this.email!=null?this.email:''
             tel=this.tel!=null?this.tel:''
          }
          if(this.cur_obj==2){
             email= this.email0!=null?this.email0:''
             tel=this.tel0!=null?this.tel0:''
          }
          this.panKong().then(res=>{
              if(res){
          uni.showLoading({
    title: '加载中'
});
          this.$http({ url: `api/mine/create_invoice` ,data:{
              id:this.fp.idlist,
              is_personal:this.cur_obj,
              title:this.title,
              identity:this.identity!=null?this.identity:'',
              opening_bank:this.opening_bank!=null?this.opening_bank:'',
              opening_number:this.opening_number!=null?this.opening_number:'',
              email:email,
              invoices_type:this.fp.invoices_type,
              tel:tel,
              address:this.address!=null?this.address:'',
          }}).then(res => {
              uni.hideLoading();
              this.is_fdd=true
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            setTimeout(()=>{
          uni.navigateTo({url: `/pages/my_invoice_success/my_invoice_success?title=${this.title}`});
            },1500)
          })
          .catch(res => {
              uni.hideLoading();
              this.is_fdd=true
              this.HMmessages.show(res.msg, { icon: "error" });
          });
              }else{
              this.is_fdd=true
              }
          })
          }
      }
  },
  components: { HMmessages},
  onLoad(opt) {
      this.fp=uni.getStorageSync("fp")
      let price_list=this.fp.pricelist.split(',')
      let total=0
      for(let i in price_list){
          total=total+parseFloat(price_list[i])
      }
      this.price=total.toFixed(2)
      this.name= this.fp.namelist
      console.log(this.fp.namelist,this.name)
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
.myinvoicepep{padding-bottom: 200rpx}
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
