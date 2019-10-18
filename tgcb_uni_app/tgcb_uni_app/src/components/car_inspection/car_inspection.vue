<template>
    <view class="car_inspection">
        <view class="car_header">
            <view class="car_header_top">
                <image :src="carData.car.vehicle.url"> </image>
                <view class="car_content">
                    <view>{{carData.car.car_num}}</view>
                    <view>{{carData.car.sales_name}}</view>
                </view>
            </view>
            <view class="car_bottom">
                <view>接受办理进度手机号</view>
                <view><input type="text" @change="phoneChange"></view>
            </view>
        </view>
        <view class="car_box">
            <view class="car_item">
                <view class="car_item_name">
                    选择交车店铺
                </view>
                <view class="uni-input">{{shop.name}}</view>
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
                    定金费用
                </view>
                <view class="price">￥{{carData.price}}</view>
            </view>
        </view>
        <view class="footer">
            <view class="footer_price">￥{{carData.price}}</view>
            <view class="btn" @tap="goCloseAccount">提交订单</view>
        </view>

    </view>
</template>

<script>
    import { OrderModel } from "../../model/order"
    const orderModel = new OrderModel();
  
    export default {
        components:{
        },
        props:{
            carData:{
                type:Object,
                default:{},
                
            }
        },
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                title: 'picker',
                array: ['中国', '美国', '巴西', '日本'],
                index: 0,
                date: currentDate,
                time: '12:01',
                phone: '',
                shop:{}
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
            phoneChange(e) {
                var phone = e.detail.value;
                if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
                    uni.showToast({
                        title:'手机号码有错，请重新输入',
                        icon:'none'
                    });
                    return false;
                }
                this.phone = phone;
            },
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
            },
             _provider(){
               return new Promise((resolve,reject)=>{
                    uni.getProvider({
                        service: 'payment',
                        success: function (res) {
                            console.log(res.provider[0])
                            resolve(res.provider[0])
                        }}
                    )
                })

            },
            goCloseAccount() {
                let params = {
                    car_num: this.carData.car.car_num,
                    epuipmen_id: this.carData.car.equipmen_id,
                    vehicle_id: this.carData.car.vehicle_id,
                    phone: this.phone,
                    appointment_date: this.date,
                    appointment_time: this.time,
                    review_station: this.shop.name,
                    type : 7
                }
                orderModel.createOrder(params).then( res => {
                    if (res.code == 200 || res.code == 201) {
                        let data = res.data
                        uni.navigateTo({
                            url:`/pagesB/pay/pay?type=commodity&data=` + JSON.stringify(data.internal_payment_sn)
                        })
                    }
                    
                } )
            },
            
        },
        mounted(){
            
            if (uni.getStorageSync('shop')) {
                console.log(JSON.parse(uni.getStorageSync('shop')))
                this.shop = JSON.parse(uni.getStorageSync('shop'))	
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