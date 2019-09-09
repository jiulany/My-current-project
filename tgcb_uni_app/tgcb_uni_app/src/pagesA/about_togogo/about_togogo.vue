<template>
    <view class="about_togogo">
        <view class="content">&nbsp;&nbsp;&nbsp;&nbsp;我们的宗旨是：视若珍宝，养护为人。
脱狗车宝是一个致力于用心为用户提供汽车服务的平台。
脱狗车宝由成都启锋科技有限公司提供技术支持。 
脱狗车宝由成都三谛魅影文化传播有限公司提供品牌包装
支持。
                        
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
   .content{
       font-size: 28rpx;
       color:#333333;
   }
}
</style>