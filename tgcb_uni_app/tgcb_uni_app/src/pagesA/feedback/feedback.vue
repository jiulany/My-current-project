<template>
    <view class="about_togogo">
       
            <view class="title">问题与建议</view>
            <view class="uni-textarea">
                <textarea placeholder-style="color:#999999;font-size:24rpx;height:300rpx;" placeholder="请输入300以内的问题描述或意见反馈。我们将在72小时内回复您。"/>
            </view>
            <view class="finish">
                提交反馈
            </view>
    </view>
</template>

<script>
    export default {
        name: "payment_manage",
        methods:{
            _setPassword()
            {
                uni.navigateTo({
                    url:'/pagesA/set_pwd/set_pwd'
                })
            },
            _updatePassword()
            {
                uni.navigateTo({
                    url:'/pagesA/update_pwd/update_pwd'
                })
            }
        }
    
    }   
</script>

<style lang="less">
.about_togogo{
   padding: 26rpx;
   .title{
       padding:20rpx 0;
   }
   .finish{
       background: #FBD731;
       font-size: 36rpx;
       color:#ffff;
       height:80rpx;
       line-height: 80rpx;
       margin-top: 126rpx;
       text-align: center;
   }
   
}
</style>