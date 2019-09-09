<template>
    <view class="car_check">
        <view class="car_check_box">
            <view class="car_select" @click="_cars">切换车辆</view>
            <view class="car_select_left" @click="_record">年检记录</view>
            <view class="car_check_box_img">
                <image src="https://img2.tuhu.org/Images/Logo/aodi.png"></image>
            </view>
            <view class="car_name">
                {{choose_car.car_num}}
            </view>
            <view class="footer">
                立即预约车辆年检
            </view>
            <view class="footer_desc" @click="_perfect"> 资料未完善，请先完善资料</view>
        </view>
    </view>
</template>

<script>
    import {UserModel} from "../../model/user";
    const  userModel = new UserModel()
    export default {
        name: "car_check",
        data(){
            return{
                user_cars:[],
                choose_car:{}
            }
        },
        methods:{
            _cars(){
                uni.navigateTo({
                    url:'/pagesA/my_car/my_car?type=1'
                })
            },
            _record(){
                uni.navigateTo({
                    url:'/pagesB/car_check/record'
                })
            },
            _perfect(){
                uni.navigateTo({
                    url:'/pagesB/car_add/car_add'
                })
            },
            _getUserCar(){
                userModel.getCars().then((res) => {
                    let data = res.data
                    this.user_cars = data
                    this.choose_car = data[0]
                })
            }
        },
        onLoad()
        {
            this._getUserCar();
        }
    }
</script>

<style scoped>
.car_check_box{
    height:576rpx;
    margin-top: 20rpx;
    background:rgba(255,255,255,1);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.car_check_box_img{
    margin-top: 47rpx;
    display: block;
    padding-top: 20rpx;
}
 .car_check_box_img,.car_check_box_img image{
     width:200rpx;
     height:140rpx;
 }
 .car_name{
     margin-top: 43rpx;
     font-size:36rpx;
     font-weight:400;
     color:rgba(51,51,51,1);
 }
 .footer{
     text-align: center;
     line-height: 68rpx;
     width:455rpx;
     height:68rpx;
     background:rgba(253,208,0,1);
     border-radius:32rpx;
     font-size:32rpx;
        margin-top: 99rpx;
     color:rgba(255,255,255,1);
 }
 .car_select{
     font-size:32rpx;
     color:rgba(253,208,0,1);
     position: absolute;
     top: 21rpx;
     right: 35rpx;

 }
.car_select_left{
    font-size:32rpx;
    color:rgba(253,208,0,1);
    position: absolute;
    top: 21rpx;
    left: 35rpx;

}
    .footer_desc{
        text-align: center;
        color: #FDD000;
        margin-top: 46rpx;
        font-size:24rpx;
    }
</style>