<template>
    <view class="personal">
        <!-- <view class="personal_item">
            <view class="name">
                免密支付
            </view>
            <view>
                <view class="uni-list">
                <view class="uni-list-cell uni-list-cell-pd">
                    <view class="uni-list-cell-db"></view>
                    <switch :checked="checked" @change="change" />
                </view>
                </view>
            </view>
        </view> -->
        <view class="personal_item">
            <view class="name">
                被保人信息
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="personal_item">
            <view class="name">
                停车位信息
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="personal_item" @tap="_payment">
            <view class="name">
                密码管理
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "personal",
        data(){
            return{
                checked:false
            }
        },
        methods:{
            _payment(){
                uni.navigateTo({
                    url:'/pagesA/payment_manage/payment_manage'
                })
            },
            change(){
                
            }
        }
    }
</script>

<style scoped>
.personal_item{
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