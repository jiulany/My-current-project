<template>
    <view class="update-pwd">
        <view class="item">
            <view class="name">
                原密码:
            </view>
            <view class="input-box">
                <input type="password">
            </view>
        </view>
        <view class="item">
            <view class="name">
                新密码:
            </view>
            <view class="input-box">
                <input type="password">
            </view>
        </view>
        <view class="item">
            <view class="name">
                确认密码:
            </view>
            <view class="input-box">
                <input type="password">
            </view>
        </view>
        
        <view class="finish">
            完成设置
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
            }
        }
    
    }   
</script>

<style lang="less">
.update-pwd{
    color:#333333;
    .item{
        display: flex;
        flex-direction: row;
        height: 98rpx;
        background: #fff;
        margin-bottom: 2rpx;
        align-items: center;
        padding: 0 20rpx;
        font-size:32rpx;
        .input-box{
            margin-left: 30rpx;
        }
    }
    .finish{
        background: #FDD000;
        height:98rpx;
        margin-top: 87rpx;
        text-align: center;
        line-height: 98rpx;
        font-size: 36rpx;

    }
}

</style>