<template>
    <view class="about_togogo">
        <view class="content">&nbsp;&nbsp;&nbsp;&nbsp;      如果你有修车、汽车美容、洗车等汽车相关等技能，觉得自己做的还满优秀，欢迎你加入我们。如果你一直在从事汽车后市场这一块的工作，无论是渠道还是营销，恰巧又对脱狗感兴趣也欢迎你加入我们。可以给togogo2019@163.com邮箱发送你的简历。
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