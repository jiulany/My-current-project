<template>
  <view class="span24 myinvoicesuc">
      <view class="span24 myinvoicesuc-ct">
          <view class="span24 myinvoicesuc-ctr1"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image><span>您的开票申请已提交成功！</span></view>
          <view class="span24 myinvoicesuc-ctr2">电子发票将在开具后发送至提交的手机号和邮箱。您可在发票历史中查看</view>
      </view>
      <view class="span24 myinvoicesuc-ct">
          <view class="span24 myinvoicesuc-ct-it">
              发票抬头：{{taitou}}
          </view>
          <view class="span24 myinvoicesuc-ct-it">
              开票金额：{{fp.price}}￥
          </view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        fp:null,
        taitou:null
    };
  },
  methods: {
  },
  components: { },
  onLoad(opt) {
      this.fp=uni.getStorageSync("fp")
      if(parseInt(opt.is_personal)===1){
          this.taitou='个人'
      }
      if(parseInt(opt.is_personal)===2){
          this.taitou='企业'
      }
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
.myinvoicesuc-ct{
    margin-top: 18rpx;
    background: white;
}
.myinvoicesuc-ctr1{
    align-items: center;
    justify-content: center;
    margin-bottom: 29rpx;
    padding-top: 57rpx 
}
.myinvoicesuc-ctr1 image{
width: 35rpx;
height: 35rpx;
margin-right: 31rpx
}
.myinvoicesuc-ctr1 span{
font-size:34rpx;
font-weight:500;
color:rgba(51,51,51,1)
}
.myinvoicesuc-ctr2{
    justify-content: center;
font-size:24rpx;
font-weight:500;
color:rgba(153,153,153,1);
line-height:30rpx;padding: 0 153rpx;
    padding-bottom: 80rpx;
}
.myinvoicesuc-ct-it{
    padding: 25rpx 0 31rpx 24rpx ;
    border-bottom: 1rpx solid rgba(240,240,240,1)
}
.myinvoicesuc-ct-it:last-child{
    border-bottom: none
}
</style>
