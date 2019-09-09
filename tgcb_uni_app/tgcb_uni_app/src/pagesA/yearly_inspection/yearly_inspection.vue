<template>
    <view class="yearlyInspection">
        <view class="header">
            <view class="items">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567221655&di=909de690b86f6239aebafb350faa9c02&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage-630-w0%2Fappimage%2Fmedia%2F20181008%2Fw630_h369_78a6ed7737294ee1b29c255e19bc694b.jpeg"></image>
                <view class="desc">
                    预约并支付
                </view>
            </view>
            <view class="items">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567221655&di=909de690b86f6239aebafb350faa9c02&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage-630-w0%2Fappimage%2Fmedia%2F20181008%2Fw630_h369_78a6ed7737294ee1b29c255e19bc694b.jpeg"></image>
                <view class="desc">
                    检测中
                </view>
            </view>
            <view class="items">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567221655&di=909de690b86f6239aebafb350faa9c02&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage-630-w0%2Fappimage%2Fmedia%2F20181008%2Fw630_h369_78a6ed7737294ee1b29c255e19bc694b.jpeg"></image>
                <view class="desc">
                    服务完成
                </view>
            </view>
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