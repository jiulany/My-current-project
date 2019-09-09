<template>
    <view class="car_add">
        <view class="car_add_title">
            填写信息
        </view>
        <view class="car_add_item">
            <view class="car_name">车牌号码</view>
            <input class="car_content" placeholder-class="oldColor" placeholder="请输入车牌号码">
            <view class="icon">
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">品牌车系</view>
            <view class="car_content oldColor">请选择品牌车系</view>
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">车辆类型</view>
            <view class="car_content oldColor">请选择车辆类型</view>
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">车辆注册日期</view>
            <picker class="car_content" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                <view :class="date?'':'oldColor'">{{date || '请选择车辆注册日期'}}</view>
            </picker>
            <view class="icon">
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">本车是运营车辆</view>
            <view class="car_content ">
                <view class="radio_w">
                    <label class="radio" @click="car_checked('1')"><radio style="transform:scale(0.9)" value="r1" color="#FDD000" :checked="car_first" />是</label>
                    <label class="radio" @click="car_checked('2')"><radio style="transform:scale(0.9)" value="r2" color="#FDD000" :checked="car_end"/>否</label>
                </view>
            </view>
        </view>

        <view class="car_add_item ">
            <view class="car_name">上次年检至今造成
                <br/>
                过人员伤亡事故</view>
            <view class="car_content ">
                <view class="radio_w">
                    <label class="radio" @click="car_checked('1')"><radio style="transform:scale(0.9)"  value="r1" color="#FDD000" :checked="car_first" />是</label>
                    <label class="radio" @click="car_checked('2')"><radio style="transform:scale(0.9)"  value="r2" color="#FDD000" :checked="car_end"/>否</label>
                </view>
            </view>
        </view>
        <view class="car_add_item">
            <view class="car_name">车辆所有人</view>
            <view class="car_content ">
                <view class="radio_end">
                    <label class="radio" @click="car_checked('1')"><radio style="transform:scale(0.9)" value="r1" color="#FDD000" :checked="car_first" />个人</label>
                    <label class="radio" @click="car_checked('2')"><radio style="transform:scale(0.9)" value="r2" color="#FDD000" :checked="car_end"/>公司</label>
                </view>
             </view>
        </view>
        <view class="upload">
            <view>上传所需资料</view>
            <view>选填</view>
        </view>
        <view class="car_box">
            <view class="car_box_item">
                <image src="../../static/active/tianjia.png"></image>
                <view>行驶证正本</view>
            </view>
            <view class="car_box_item">
                <image src="../../static/active/tianjia.png"></image>
                <view>行驶证副本</view>
            </view>
            <view class="car_box_item">
                <image src="../../static/active/tianjia.png"></image>
                <view>交强险副本</view>
            </view>
        </view>
        <view class="car_btn" @click="immediately">
            立即预约
        </view>
    </view>
</template>

<script>
    export default {
        name: "car_add",
        data(){
            return {
                date: "",
                car_first:false,
                car_end:false
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
            immediately(){
                uni.navigateTo({
                    url:'/pagesB/car_check/car_add'
                })
            },
            car_checked(num){
                this.car_first = num == 1 ? true : false
                this.car_end = num == 2 ? true : false
            },
            bindDateChange: function(e) {
                this.date = e.target.value
                console.log( this.date )
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
</style>