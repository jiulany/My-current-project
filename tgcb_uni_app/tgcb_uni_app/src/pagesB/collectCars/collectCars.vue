<template>
    <view class="collectCars">
        <view class="collectCars_box">
            <view class="collectCarsItem" @tap="_chooseBrand">
                <view class="collectCarsItemName">汽车型号</view>
                <view class="collectCarsItemValue">{{!choice_brand ? '请选择汽车型号' : choice_brand}}</view>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem" >
                <view class="collectCarsItemName">汽车行驶公里数（KM）</view>
                <input type="text" class="collectCarsItemValue" placeholder="请输入行驶公里数" @change="kiloChange"/>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">汽车上牌时间</view>
                <!-- <view class="collectCarsItemValue">请选择汽车上牌时间</view> -->
                <picker class="collectCarsItemValue" mode="date" :value="register_time" :start="startDate" :end="endDate" @change="bindDateChange">
                     <view :class="date?'':'oldColor'">{{register_time || '请选择车辆注册日期'}}</view>
                </picker>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">联系人</view>
                <input type="text" class="collectCarsItemValue" placeholder="请填写姓名" @change="nameChange"/>
                <i class="iconfont "></i>
            </view>
            <view class="collectCarsItem">
                <view class="collectCarsItemName">联系人电话</view>
                <input type="number" class="collectCarsItemValue" placeholder="请填写电话" @change="phoneChange"/>
                <i class="iconfont "></i>
            </view>
        </view>
        <view class="collectCars_record" @tap="goCollectCarsRecord">提交记录</view>
        <view class="collectCars_btn" @tap="subCollectCash">
            提交
        </view>
    </view>
</template>

<script>
    import { IndexModel } from "../../model/index";
    const indexModel = new IndexModel();
    export default {
        name: "collectCars",
        data(){
            return {
                choice_brand:'',
                register_time:'',
                kilometers: '',
                register_date:'',
                contacts: '',
                phone: ''
            }
        },
        methods:{
            goCollectCarsRecord() {
                uni.navigateTo({
                    url: "/pagesB/collectCars_record/collectCars_record"
                });
            },
            _chooseBrand(){
                uni.navigateTo({
                    url: "/pagesA/car_brand_list/car_brand_list"
                });
            },
            bindDateChange: function(e) {
                this.register_time = e.target.value
                console.log( this.register_time )
            },
            kiloChange(e) {
                var kilo  = e.detail.value;
                this.kilometers = kilo;
            },
            nameChange(e) {
                var name = e.detail.value;
                this.contacts = name;
            },
            phoneChange(e) {
                var phone = e.detail.value;
                this.phone = phone;
            },
            subCollectCash() {
                if (!this.brandData) {
                    uni.showToast({
                        title : '请选择汽车型号',
                        icon : 'none'
                    })
                    return false;
                }
                 if(!(/^\d+$|^\d+[.]?\d+$/).test(this.kilometers)){
                    uni.showToast({
                        title: '公里数只能输入数字，请重新输入',
                        icon: 'none'
                    });
                    return false;
                }
                if (!register_time) {
                    uni.showToast({
                        title : '请选择车辆注册时间',
                        icon : 'none'
                    })
                    return false;
                }
                if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(this.contacts)){
                    uni.showToast({
                        title: '输入姓名格式错误，请重新输入',
                        icon: 'none'
                    });
                    return false;
                }
                if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.phone))){
                    uni.showToast({
                        title:'手机号码有错，请重新输入',
                        icon:'none'
                    });
                    return false;
                }
                let params = {
                    sales_name: this.brandData.sales_name,
                    kilometers: this.kilometers,
                    register_data: this.register_time,
                    contacts: this.contacts,
                    phone: this.phone
                };
                indexModel.subCollectCash(params).then((res) => {
                    console.log(res);
                    uni.showToast({
                            title: res.message,
                            icon: 'none'
                    });
                    if(res.code == 201) {
                        uni.redirectTo({
                            url : '/pagesB/collectCars_record/collectCars_record'
                        })
                    }
                });
                console.log(params);
            }   
        },
        onLoad(){

        },
        onShow(){
            if (uni.getStorageSync("choice_brand")) {
                this.brandData = JSON.parse(uni.getStorageSync("choice_brand"))
                console.log(this.brandData);
                this.choice_brand = this.brandData.brand_name + ' ' + this.brandData.sales_name
                uni.setStorageSync('choice_brand','')
            }
        }
    }
</script>

<style scoped>

.collectCars_box{
    background: #fff;
}
.collectCarsItem{
    display: flex;
    flex-direction: row;
    height: 113rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    border-bottom: #F0F0F0 solid 1prx;
    font-size:32rpx;
}
.collectCarsItemValue{
    flex: 1;
    text-align: right;
    color: #999999;
    font-size:30rpx;
}
.iconfont{
    width: 60rpx;
}
.collectCars_record{
    margin-top: 20rpx;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    color: #FDD000;
    font-size:30rpx;
}
.collectCars_btn{
    text-align: center;
    background: #FDD000;
    font-size:36rpx;
    color: #FFFFFF;
    position: fixed;
    height: 80rpx;
    line-height: 80rpx;
    right: 0;
    left: 0;
    bottom: 0;
}
</style>