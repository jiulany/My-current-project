<template>
    <view class="yearlyInspection">
        <view class="header">
            <!-- <view class="items">
                <image src="https://imgcdn.tuogouchebao.com/yuyue@2x.png"></image>
                <view class="desc">
                    预约并支付
                </view>
            </view>
            <view class="items">
                <image src="https://imgcdn.tuogouchebao.com/jiancezhong@2x.png"></image>
                <view class="desc">
                    检测中
                </view>
            </view>
            <view class="items">
                <image src="https://imgcdn.tuogouchebao.com/fuwuwancheng@2x.png"></image>
                <view class="desc">
                    服务完成
                </view>
            </view> -->
            <img src="https://imgcdn.tuogouchebao.com/nianjian_liucheng.png" alt="" style="width:100%;height:100%;">
        </view>
        <car_inspection></car_inspection>
    </view>
</template>

<script>
    import car_inspection from '../../components/yearly_inspection_status/yearly_inspection_status'
    export default {
        name: "yearlyInspection",
        components:{
            car_inspection
        }

    }
</script>

<style scoped>
    page{
        overflow: hidden;
    }

.header{
    height:214rpx;
    background:#FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 22rpx;
    color: #333333;
}
.items{
    margin-top: 46rpx;
    text-align: center;
    flex: 1;
}
.items image {
    width: 75rpx;
    height: 76rpx;
}
</style>