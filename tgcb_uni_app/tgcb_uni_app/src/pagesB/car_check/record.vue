<template>
    <view class="collectCars_record">
        <view class="collectCars_record_item">
            <view class="item_top">
                <view class="item_top_left">申请年检</view>
                <view class="item_top_right">
                    <view class="item_btn_left">催单</view>
                    <view class="item_btn_right">删除</view>
                </view>
            </view>
            <view class="item_content">
                您预约年检车型为：迪奥A3 2018款 纪念版，正在 等待处理！
            </view>
            <view class="item_bottom">
                2019-08-23 10:29:47
            </view>
        </view>
        <view class="collectCars_record_desc">
            <view>使用说明</view>
            <view>提交成功后，工作人员将会在24小时内与您取得联系或您主动
                联系客户：02883399903 ！</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "record"
    }
</script>

<style scoped>
    .collectCars_record{
        margin-top: 20rpx;
    }
    .collectCars_record_item{
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 30rpx;
    }
    .item_top{
        margin-top: 20rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .item_top_right{
        display: flex;
        flex-direction: row;
    }
    .item_content{
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        font-size: 24rpx;
    }
    .item_bottom{
        color: #999;
        margin-bottom: 10rpx;
    }
    .item_btn_left{
        width: 117rpx;
        height: 46rpx;
        font-size:28rpx;
        color: #FFFFFF;
        line-height: 46rpx;
        border-radius: 20rpx;
        text-align: center;
        background: #FDD000;
    }
    .item_btn_right{
        width: 117rpx;
        height: 46rpx;
        font-size:28rpx;
        color: #FFFFFF;
        line-height: 46rpx;
        border-radius: 20rpx;
        text-align: center;
        margin-left: 15rpx;
        background: #B2B2B2;
    }
    .collectCars_record_desc{
        width: 596rpx;
        margin: 0 auto;
        margin-top: 50rpx;
        text-align: center;
        color: #999999;
        font-size: 24rpx;
    }
</style>