<template>
    <view class="about_us">
        <view class="item" @tap="_aboutTogogo">
            <view class="name">
                关于脱狗
            </view>
            <view>
               <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="item" @tap="_feedback">
            <view class="name">
                投诉建议
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>

        <view class="item" @tap="_joinUs">
            <view class="name">
                加入我们
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>

         <view class="item" >
            <view class="name">
                联系客服
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>

        <view class="item">
            <view class="name">
                当前版本
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "payment_manage",
        methods:{
            _aboutTogogo()
            {
                uni.navigateTo({
                    url:'/pagesA/about_togogo/about_togogo'
                })
            },
            _feedback()
            {
                uni.navigateTo({
                    url:'/pagesA/feedback/feedback'
                })
            },
            _joinUs(){
                uni.navigateTo({
                    url:'/pagesA/join_us/join_us'
                })
            }
        
        }
    
    }   
</script>

<style scoped>
.item{
    display: flex;
    flex-direction: row;
    height: 98rpx;
    background: #fff;
   margin-bottom: 2rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    font-size:28rpx;
}
</style>