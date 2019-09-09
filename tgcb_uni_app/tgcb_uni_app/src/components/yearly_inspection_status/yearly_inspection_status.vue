<template>
    <view class="car_inspection">
        <view class="car_header">
            <view class="status">
                完成
            </view>
            <view class="car_header_top">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567221655&di=909de690b86f6239aebafb350faa9c02&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage-630-w0%2Fappimage%2Fmedia%2F20181008%2Fw630_h369_78a6ed7737294ee1b29c255e19bc694b.jpeg"> </image>
                <view class="car_content">
                    <view>川A123654</view>
                    <view>宝马2017款220敞篷轿跑车</view>
                </view>
            </view>
            <view class="car_bottom">
                <view>接受办理进度手机号</view>
                <view>18782899732</view>
            </view>
        </view>
        <view class="car_box">
            <view class="car_item">
                <view class="car_item_name">
                    选择检测站
                </view>
                <view class="uni-input">浅水半岛店</view>
            </view>
            <view class="car_item">
                <view class="car_item_name">
                    预约检测日期
                </view>
                <view class="uni-input">{{date}}</view>
            </view>
            <view class="car_item">
                <view class="car_item_name">
                    预约检测时间段
                </view>
                <view class="uni-input">{{time}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                title: 'picker',
                array: ['中国', '美国', '巴西', '日本'],
                index: 0,
                date: currentDate,
                time: '12:01'
            }
        },
        name: "yearly_inspection_status",
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
        methods:{
            bindDateChange: function(e) {
                this.date = e.target.value
            },
            bindTimeChange: function(e) {
                this.time = e.target.value
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            }
        }
    }
</script>

<style scoped>
    .car_inspection{
        padding: 0 22rpx;
    }
    .car_header{
        overflow: hidden;
        position: relative;
        height: 251rpx;
        background: #fff;
        display: flex;
        flex-direction: column;
        margin-top: 20rpx;
    }
    .car_header_top{
        display: flex;
        flex-direction: row;
    }
    .car_header_top image{
        margin: 35rpx 54rpx 27rpx 18rpx;
        width: 174rpx;
        height: 134rpx;
    }
    .car_content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size:32rpx;
    }
    .car_bottom{
        color: #666666;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 18rpx;
        padding-right: 28rpx;
    }
    .car_item{
        display: flex;
        flex-direction: row;
        height: 91rpx;
        align-items: center;
        background: #fff;
        justify-content: space-between;
        padding-left: 20rpx;
        padding-right: 10rpx;

        color: #666;
    }
    .car_box{
        font-size:30rpx;
    }
    .uni-input{
        flex: 1;
        font-size:30rpx;
        text-align: right;
    }
    .car_item .iconfont{
        width: 20rpx;
        text-align: right;
    }
    .status{
        width: 180rpx;
        height: 45rxp;
        background: #FDCE33;
        font-size: 28rpx;
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        transform: rotate(38deg);
        transform-origin:50% 170%
    }
</style>