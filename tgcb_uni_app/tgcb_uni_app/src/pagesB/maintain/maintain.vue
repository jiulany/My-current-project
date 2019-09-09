<template>
    <view class="maintain" @touchmove="touchmove">
        <block v-for="(item,index) in list">
            <view class="maintain_title">
                {{item.classify_name}}
            </view>
            <view class="maintain_box">
                <view class="maintain_box_items" @tap="choose(index,key)" v-for="(value,key) in item.children">
                    <view class="maintain_box_title">
                        {{value.classify_name}}
                    </view>
                    <view class="maintain_box_image">
                        <image :src="value.image"></image>
                    </view>
                    
                    <view  v-if="value.checked==true">
                        <view class="checked">
                        </view>
                        <image class="checked_img" src="../../../../../static/maintain/xuanze.png"></image>
                    </view>

                </view>
                <!-- <view class="maintain_box_items">
                    <view class="maintain_box_title">
                        换机油
                    </view>
                    <view class="maintain_box_image">
                        <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565816027833&di=68da923b976e642d6d04ffccd8ff2178&imgtype=0&src=http%3A%2F%2Fac-r.static.booking.cn%2Fimages%2Fhotel%2Fmax1024x768%2F987%2F98767654.jpg"></image>
                    </view>
                </view> -->
                
            </view>
        </block>
        
        <!-- <view class="maintain_car">
            <view class="car">
                <view class="car_title">
                    我的车辆
                </view>
                <view class="car_box">
                    <view class="car_list">
                        <radio-group class="car_radio" @change="radioChange">
                            <radio value="" color="#FDD000" />
                        </radio-group>
                        <image class="car_icon" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/80fe9ab5332e44f60b255d459512b5ff_222_222.jpg"></image>
                        <view class="car_name">川AF2378  奔驰</view>
                    </view>
                    <view class="car_list">
                        <radio-group class="car_radio" @change="radioChange">
                            <radio value="" color="#FDD000" />
                        </radio-group>
                        <image class="car_icon" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/80fe9ab5332e44f60b255d459512b5ff_222_222.jpg"></image>
                        <view class="car_name">川AF2378  奔驰</view>
                    </view>
                    <view class="car_list">
                        <radio-group class="car_radio" @change="radioChange">
                            <radio value="" color="#FDD000" />
                        </radio-group>
                        <image class="car_icon" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/80fe9ab5332e44f60b255d459512b5ff_222_222.jpg"></image>
                        <view class="car_name">川AF2378  奔驰</view>
                    </view>
                    <view class="car_list">
                        <radio-group class="car_radio" @change="radioChange">
                            <radio value="" color="#FDD000" />
                        </radio-group>
                        <image class="car_icon" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/80fe9ab5332e44f60b255d459512b5ff_222_222.jpg"></image>
                        <view class="car_name">川AF2378  奔驰</view>
                    </view>
                    <view class="car_list">
                        <radio-group class="car_radio" @change="radioChange">
                            <radio value="" color="#FDD000" />
                        </radio-group>
                        <image class="car_icon" src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/80fe9ab5332e44f60b255d459512b5ff_222_222.jpg"></image>
                        <view class="car_name">川AF2378  奔驰</view>
                    </view>
                </view>
                <view class="car_btn">
                    确定
                </view>
            </view>
        </view> -->

        <view class="btn active">下一步</view>
    </view>
</template>

<script>
    import {MaintainModel} from "../../model/maintain.js"
    const maintainModel = new MaintainModel()
    export default {
        name: "maintain",
        data(){
            return {
                list:[],
                choosed:[]
            }
        },
        methods:{
            touchmove(e){
                document.body.style.overflow='hidden';
                document.documentElement.style.overflow='hidden';
            },
            getData()
            {
                maintainModel.getData().then((res) => {
                    console.log('10101010')
                    let data = res.data
                    this.list = data[0]['children']
                })
            },
            choose(index,key){
                let arr = this.list[index]['children'][key]
                if (arr['checked']) {
                    arr['checked'] = false
                    var index = this.choosed.indexOf(arr.id); 
                    this.choosed.splice(index,1)
                } else {
                    arr['checked'] = true
                    this.choosed.push(arr.id)
                }
                this.list = JSON.parse(JSON.stringify(this.list))
                console.log(this.choosed)
            }
        },
        onLoad()
        {

        },
        onShow(){
            this.getData()
        },
        watch:{
            list:{
                handler(newValue, oldValue) {
                    console.log(newValue,oldValue)
                }
            },
            deep: true
        }
    }
</script>

<style scoped>
.maintain{
    padding-bottom: 98rpx;
    overflow: hidden;
}
.maintain_title{
    height: 97rpx;
    color:#474747;
    font-size:32rpx;
    line-height: 97rpx;
    padding-left: 29rpx;
}
.maintain_box{
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-flow: wrap;
}
.maintain_box_items{
    margin-left: 25rpx;
    margin-right: 25rpx;
    position: relative;
    margin-bottom: 20rpx;
}
.maintain_box_title{
    height: 74rpx;
    font-size:30rpx;
    color: #474747;
    line-height: 74rpx;
}
.maintain_box_image image{
    height: 195rpx;
    width: 200rpx;
    display: block;
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #DEDEDE;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
    font-size:36rpx;
    z-index: 9999;
}
.checked{
    background:rgba(0,0,0,1);
    opacity:0.27;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:99;
    filter:alpha(Opacity=27)

}
.checked_img{
    width: 88rpx;
    height: 88rpx;
    position: absolute;
    top:50%;
    margin-top: -24rpx;
    margin-left: 44rpx;
    z-index: 9999;
}
.active{
    background: #FDD000 !important;
}
.maintain_car{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,0.34);
    z-index: 99999;
}
.car {
    width:612rpx;
    height: 447rpx;
    position: fixed;
    top:50%;
    left: 50%;
    margin-left: -302rpx;
    margin-top: -223rpx;
    background: #fff;
    z-index: 999999;
    border-radius:8rpx;
    align-items: center;
}
.car_box{
    height: 270rpx;
    overflow: scroll;
}
.car_title{
    font-size:32rpx;
    font-weight:500;
    color:rgba(71,71,71,1);
    margin-top: 41rpx;
    margin-left: 36rpx;
}
.car_icon{
    width: 60rpx;
    height: 60rpx;
    margin-left: 23rpx;
    display: block;
    margin-top: 8rpx;
    margin-right: 24rpx;
}
.car_name{
    font-size:30rpx;
    font-weight:500;
    color:rgba(71,71,71,1);
    margin-top: 5rpx;
}
.car_radio{
    width: 42rpx;
    height: 42rpx;
}
.car_list{
    margin-left: 36rpx;
    align-items: center;
    display: flex;
    flex-direction: row;
}
.car_btn{
    width:172rpx;
    height:55rpx;
    background:rgba(253,208,0,1);
    position: absolute;
    bottom: 35rpx;
    left: 50%;
    margin-left: -96rpx;
    text-align: center;
    font-size:32rpx;
    font-weight:500;
    color:rgba(71,71,71,1);
}
</style>