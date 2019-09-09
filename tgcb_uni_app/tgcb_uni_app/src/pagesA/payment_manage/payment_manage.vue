<template>
    <view class="payment_manage">
        <view class="item">
            <view class="name">
                免密支付
            </view>
            <view>
                <view class="uni-list">
                <view class="uni-list-cell uni-list-cell-pd">
                    <switch checked />
                </view>
                </view>
            </view>
        </view>
        <view class="item" @tap="_setPassword">
            <view class="name">
                设置密码
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>

        <view class="item" @tap="_updatePassword">
            <view class="name">
                修改密码
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