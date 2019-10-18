<template>
    <view class="car_add">
        <view class="car_add_title">
            填写信息
        </view>
        <view class="car_add_item">
            <view class="car_name">车牌号码</view>
            <!-- <input class="car_content oldColor" v-model="car_num" placeholder-class="oldColor" placeholder="请输入车牌号码"> -->
                <input
                    type="text"
                    @focus="openKeyboard"
                    @blur="closeKeyboard"
                    placeholder="请输入车辆车牌"
                    :value="car_num"
                    class="car_content oldColor"
                    placeholder-class="oldColor"
                >
            <view class="icon">
            </view>
        </view>
        <view class="car_add_item" @tap="_chooseBrand">
            <view class="car_name">品牌车系</view>
            <!-- <view class="car_content oldColor">请选择品牌车系</view> -->
            <view class="car_content oldColor">{{!choice_brand ? '请选择汽车品牌' : choice_brand}}</view>
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item" @tap="getType">
            <view class="car_name">车辆类型</view>
            <!-- <view class="car_content oldColor">请选择车辆类型</view> -->
            <view class="car_content oldColor">{{!carTypeString ? '请选择汽车类型' : carTypeString}}</view>
            <view class="addcar-sle" v-if="carTypeVisible">
                <view class="span24 addcar-sle-it"  v-for="(item,index) in typeArr" @tap.stop="choiseType(item)" :key="index">{{item}}</view>
            </view>
            
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">车辆注册日期</view>
            <picker class="car_content" mode="date" :value="register_time" :start="startDate" :end="endDate" @change="bindDateChange">
                <view :class="date?'':'oldColor'">{{register_time || '请选择车辆注册日期'}}</view>
            </picker>
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">本车是运营车辆</view>
            <view class="car_content ">
                <view class="radio_w">
                    <label class="radio" @click="car_checked(1)"><radio style="transform:scale(0.9)" value="r1" color="#FDD000" :checked="is_operate == 1" />是</label>
                    <label class="radio" @click="car_checked(0)"><radio style="transform:scale(0.9)" value="r2" color="#FDD000" :checked="is_operate == 0"/>否</label>
                </view>
            </view>
        </view>

        <view class="car_add_item ">
            <view class="car_name">上次年检至今造成
                <br/>
                过人员伤亡事故</view>
            <view class="car_content ">
                <view class="radio_w">
                    <label class="radio" @click="hurtChecked(1)"><radio style="transform:scale(0.9)"  value="r1" color="#FDD000" :checked="is_hurt == 1" />是</label>
                    <label class="radio" @click="hurtChecked(0)"><radio style="transform:scale(0.9)"  value="r2" color="#FDD000" :checked="is_hurt == 0"/>否</label>
                </view>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">车辆所有人</view>
            <view class="car_content ">
                <view class="radio_end">
                    <label class="radio" @click="ownChecked(1)"><radio style="transform:scale(0.9)" value="r1" color="#FDD000" :checked="is_own == 1" />个人</label>
                    <label class="radio" @click="ownChecked(2)"><radio style="transform:scale(0.9)" value="r2" color="#FDD000" :checked="is_own == 2"/>公司</label>
                </view>
             </view>
        </view>
        <view class="upload">
            <view>上传所需资料</view>
            <view>选填</view>
        </view>
        <view class="car_box">
            <view class="car_box_item" @tap="chooseImage" data-chooseImage="1">
                <image :src="!driving_permit_front ? baseImagePath : driving_permit_front"></image>
                <view>行驶证正本</view>
            </view>
            <view class="car_box_item" @tap="chooseImage" data-chooseImage="2">
                <image :src="!driving_permit_behind ? baseImagePath : driving_permit_behind"></image>
                <view>行驶证副本</view>
            </view>
            <view class="car_box_item" @tap="chooseImage" data-chooseImage="3">
                <image :src="!compulsory_insurance ? baseImagePath : compulsory_insurance"></image>
                <view>交强险副本</view>
            </view>
        </view>
        <keyboader :visible="show_keyboader" @changeValue="changeValue"></keyboader>
        <view class="car_btn" v-if="options" @tap="immediatelyUpdate">
            修改并预约
        </view>
        <view class="car_btn" v-else @tap="immediately">
            添加并预约
        </view>
    </view>
</template>

<script>
import keyboader from "../../components/keyboader/keyboader";
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
import { CarModel } from '../../model/car';
const carModel = new CarModel()
    export default {
        name: "car_add",
        components: {keyboader },
        data(){
            return {
                show_keyboader:false,
                options:{},
                car_num:"",
                brandData:{},
                choice_brand:"",
                carColor:'',
                carType:1,
                carTypeString:'',
                colorVisible:false,
                carTypeVisible:false,
                colorArr:['白色','黑色'],
                typeArr:['轿车','SUV'],
                register_time:'',
                is_operate:0,
                is_hurt:0,
                is_own:1,
                baseImagePath: "../../static/active/tianjia.png",
                driving_permit_front: '', // 行驶证正面
                driving_permit_behind: '', // 行驶证背面
                compulsory_insurance: '' //交强险副本
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
        methods:{
            chooseImage(e) {
                console.log(e);
                uni.chooseImage({
                    // sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 3,
                    success: (res) => {
                        const tempFilePaths = res.tempFilePaths;
                        uni.uploadFile({
							url: getApp().globalData.api_base_url + '/imageFileObject', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'image',
							methods:'POST',
							formData: {
								'prefix' : 'annual_review'
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								let data = JSON.parse(uploadFileRes.data);
								if (uploadFileRes.statusCode != 200) {
									uni.showToast({
										title : '网络异常',
										icon : 'none'
									})
									return false;
								}
								
								if (data.code == 201) {
									if (data.data.status) {
										if(e.currentTarget.dataset.chooseimage == 1) {
                                            if(res.errMsg == 'chooseImage:ok') {
                                                this.driving_permit_front = data.data.url
                                            }
                                        }
                                        if(e.currentTarget.dataset.chooseimage == 2) {
                                            if(res.errMsg == 'chooseImage:ok') {
                                                this.driving_permit_behind = data.data.url
                                            }
                                        }
                                        if(e.currentTarget.dataset.chooseimage == 3) {
                                            if(res.errMsg == 'chooseImage:ok') {
                                                this.compulsory_insurance = data.data.url
                                            }
                                        }
									}
									
								} else {
									uni.showToast({
                                        title : data.message,
                                        icon : 'none'
									})
                                }
                                
                                console.log(this.imageList1,this.imageList2,this.imageList3)
							}
						});
                    }
                });
            },
            changeValue(e){
                this.car_num=e
            },
            openKeyboard(){
                this.show_keyboader=true
            },
            closeKeyboard(){
                this.show_keyboader=false
            },
            _chooseBrand(){
                uni.navigateTo({
                    url: "/pagesA/car_brand_list/car_brand_list"
                });
            },
            getColor(){
                this.colorVisible = true
                console.log(this.colorVisible )
            },
            getType()
            {
                this.carTypeVisible = !this.carTypeVisible
            },
             choiseColor(value){
                console.log(value)
                this.carColor = value
                this.colorVisible = false
             },
            choiseType(value)
            {
                this.carTypeString = value
                if (value == 'SUV') {
                    this.carType = 2
                } else {
                this.carType = 1
                }
                this.carTypeVisible = false
            },
            immediately(){
                let check = this.check()
                if (!check) {
                    return false
                }
                let params = this.params()
                carModel.createCar(params).then((res) => {
                    uni.showToast({
                        title:res.message,
                        icon:'none'
                    })
                    if (res.code == 201) {
                        uni.navigateTo({
                            url:'/pagesB/car_check/car_add?car_id=' + this.options.car_id
                        })
                    }
                })

                
            },
            immediatelyUpdate(){
                let check = this.check()
                if (!check) {
                    return false
                }
                let params = this.params()
                carModel.updateCar(params,this.options).then((res) => {
                    uni.showToast({
                        title:res.message,
                        icon:'none'
                    })
                    if (res.code == 200) {
                        uni.navigateTo({
                            url:'/pagesB/car_check/car_add?car_id=' + this.options.car_id
                        })
                    }
                })
            },
            params(){
                let params = {
                    car_num : this.car_num,
                    type : this.carType,
                    is_hurt:this.is_hurt,
                    is_operate:this.is_operate,
                    is_own:this.is_own,
                    is_perfect:1,
                    is_annual_review:1,
                    register_time:this.register_time,
                    driving_permit_front: this.driving_permit_front, // 行驶证正面
                    driving_permit_behind: this.driving_permit_behind, // 行驶证背面
                    compulsory_insurance: this.compulsory_insurance
                }
                if (JSON.stringify(this.brandData) != '{}') {
                    params.car_data = JSON.stringify(this.brandData)
                }
                console.log(params)
                return params
            },
            check()
            {
                if (!this.choice_brand) {
                    uni.showToast({
                        title:'请选择汽车品牌',
                        icon:'none'
                    })
                    return false
                }
                if (!this.carTypeString) {
                    uni.showToast({
                        title:'请选择汽车类型',
                        icon:'none'
                    })
                    return false
                }
                if (!this.car_num) {
                    uni.showToast({
                        title:'请填写车牌号',
                        icon:'none'
                    })
                    return false
                }
                return true
            },
            car_checked(num){
                this.is_operate = num
            },
            hurtchecked(num){
                this.is_hurt = num
            },
            ownChecked(num) {
                this.is_own = num
            },
            bindDateChange: function(e) {
                this.register_time = e.target.value
                console.log( this.register_time )
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
            getCarDetails()
            {
                userModel.getCarDetails(this.options).then((res) => {
                    let data = res.data
                    this.car_num = data.car_num
                    this.choice_brand = data.sales_name
                    this.carColor = data.color
                    this.carType = data.type
                })
            }
        },
        onLoad(options){
            if (options.car_id) {
                this.options = options
                this.getCarDetails()
            }
        },
        onShow(){
            if (uni.getStorageSync("choice_brand")) {
                this.brandData = JSON.parse(uni.getStorageSync("choice_brand"))
                this.choice_brand = this.brandData.sales_name
            
                uni.setStorageSync('choice_brand','')
            }
        }
    }
</script>

<style scoped>
.radio_w,.radio_end{
    float: right;
    width: 300rpx;
    display: flex;
}
.radio_end .radio:last-child{
    margin-left: 40rpx;
}
.radio_w .radio:last-child{
    margin-left: 60rpx;
}

.car_add_title{
    padding-left: 39rpx;
    height: 70rpx;
    line-height: 70rpx;
    color: #999999;
    font-size:26rpx;
}
.car_add_item{
    align-items: center;
    font-size:32rpx;
    height: 130rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    border-bottom: solid 1rpx #f5f5f5;
    padding: 0 35rpx;
    position: relative;
}
.car_content{
    text-align: right;
    flex: 1;
}
.icon{
    margin-left: 20rpx;
    width: 50rpx;
    text-align: center;
    color: #4A4A4A;
}
.oldColor{
    color: #C4C4C4;
    font-size:32rpx;
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #C4C4C4 !important;
}
.upload{
    display: flex;
    justify-content: space-between;
    padding: 0 39rpx;
    height: 76rpx;
    align-items: center;
    color: #999999;
}
.car_box {
    display: flex;
    background: #fff;
    justify-content: space-between;
}
.car_box_item{
    font-size:24rpx;
    color: #666666;
    text-align: center;
    padding-bottom: 10rpx;
}
.car_box_item image{
    margin: 22rpx 44rpx 0;
    width: 158rpx;
    height: 122rpx;
}
 .car_btn{
     height: 98rpx;
     text-align: center;
     line-height: 98rpx;
     background:#FDD000;
     color: #474747;
     margin: 0 auto;
     margin-top: 140rpx;
     font-size:32rpx;
 }

 /* 添加汽车 */
 .addcar-sle {
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 5px 18px 2px rgba(11, 11, 10, 0.1);
  width: 100%;
  z-index: 9999;
  max-height: 400rpx;
  overflow-y: scroll;
}
.addcar-sle-it {
  position: relative;  
  padding: 20rpx 0 20rpx 18rpx;
  border-bottom: 1rpx solid rgba(245, 245, 245, 1);
}

.addcar-inp {
  border-bottom: 1rpx solid rgba(245, 245, 245, 1);
  position: relative;
}
.addcar-inp input {
  font-size: 24rpx;
  width: 100%;
}
</style>