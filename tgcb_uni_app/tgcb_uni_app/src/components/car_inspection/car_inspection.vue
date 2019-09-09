<template>
    <view class="car_inspection">
        <view class="car_header">
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
                <view class="icon">
                    <i class="iconfont icon-xiayibu"></i>
                </view>
            </view>
            <view class="car_item">
                <view class="car_item_name">
                    预约检测日期
                </view>
                <picker class="uni-input" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                    <view >{{date}}</view>
                </picker>
                <view class="icon">
                    <i class="iconfont icon-xiayibu"></i>
                </view>
            </view>
            <view class="car_item">
                <view class="car_item_name">
                    预约检测时间段
                </view>
                <picker class="uni-input" mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
                    <view >{{time}}</view>
                </picker>
                <view class="icon">
                    <i class="iconfont icon-xiayibu"></i>
                </view>
            </view>
        </view>
        <view class="car_box">
            <view class="car_item">
                <view class="car_item_name">
                    服务费用
                </view>
                <view class="price">￥100.00</view>
            </view>
        </view>
        <view class="footer">
            <view class="footer_price">￥100.00</view>
            <view class="btn">去结算</view>
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
        name: "car_inspection",
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
        padding: 0 20rpx;
        color: #666;
    }
    .car_box{
        margin-top: 20rpx;
        font-size:30rpx;

    }
.uni-input{
    padding: 0;
        flex: 1;
        font-size:30rpx;
        text-align: right;
    }
    .car_item .iconfont{
        width: 20rpx;
        text-align: right;
    }
    .price{
        color: #F75C3E;
    }
    .btn{
        color: #FFFFFF;
        text-align: center;
        font-size:36rpx;
        width:202rpx;
        height:78rpx;
        background:rgba(253,206,51,1);
        border-radius:39rpx;
        line-height: 78rpx;
    }
    .footer_price{
        font-size:36rpx;
        color: #F75C3E;
    }
    .footer{
        display: flex;
        flex-direction: row;
        padding: 0 40rpx 0 58rpx;
        justify-content: space-between;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 130rpx;
        align-items: center;
    }
.icon{
    margin-left: 20rpx;
    width: 50rpx;
    text-align: center;
    color: #4A4A4A;
}
</style>