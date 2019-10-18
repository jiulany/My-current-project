<template>
    <view>
        <view class="top">
            <view>
                <text>时间(必填）</text>
                <text>2019-07-05</text>
            </view>
            <view>
                <text>保养时车辆里程（必填）</text>
                <text>9公里</text>
            </view>
            <view>
                <text>总费用</text>
                <text>3000元</text>
            </view>
        </view>
        <view class="upload">
            <text>保养凭证上传</text>
            <text>上传到云端永久保存（长安可删除图片）</text>
            <view class="picture">
                <view class="item">
                    <view class="delete">
                        <img src="https://imgcdn.tuogouchebao.com/shanchu@2x.png" alt="" style="width:39rpx;height:39rpx">
                    </view>
                </view>

                <view class="item">
                    <img src="https://imgcdn.tuogouchebao.com/tianjia@2x.png" alt="">
                </view>
            </view>
            
        </view>
        <view class="title">
            <text>保养项</text>
            <text>准确填写可提升智能推荐精度</text>
        </view>
        <view class="items">
            <block v-for="(item,index) in arr" :key="index">
                <view class="box">
                    <block>
                        <view class="text">{{item.title}}</view>
                        <view class="list" v-for="(list,key) in item.list" :key="key" @tap="choose(index,key)">
                            <view :class="list.active == true ? 'active' : ''">
                                <img :src="list.icon" alt="">
                                <text>{{list.name}}</text>
                            </view>
                        </view> 
                    </block> 
                </view>
            </block>
        </view>
        <view class="remark">
            <view>备注</view>
            <textarea name="" id="" cols="30" rows="10" placeholder="保养项中没有的选项可在这里添加" placeholder-style="color:#333333;font-size:30rpx;" style="padding-left:23rpx;"></textarea>
        </view>
        <view class="button">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                {
                    title:'基础保养项',
                    list:[
                        {   
                            id: 1,
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id:2,
                            name:'机油滤清器',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {   
                            id: 3,
                            name:'空气滤清器',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 4,
                            name:'空调滤清器',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 5,
                            name:'燃油滤清器',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 6,
                            name:'变速箱油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 7,
                            name:'火花塞',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 8,
                            name:'整车制动液',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 9,
                            name:'转向助力液',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            id: 10,
                            name:'发动机冷却液',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        }
                    ]
                },
                {
                    title:'轮胎',
                    list:[
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        }
                    ]
                },
                {
                    title:'刹车系统',
                    list:[
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        }
                    ]
                },
                {
                    title:'易碎件',
                    list:[
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                    ]
                },
                {
                    title:'积碳清理',
                    list:[
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        }
                    ]
                },
                {
                    title:'关键部位',
                    list:[
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                        {
                            name:'发动机机油',
                            icon:'https://imgcdn.tuogouchebao.com/ranyou_icon@2x.png'
                        },
                    ]
                }
            ],
            choosed: []
        }
    },
    methods: {
        choose(index,key) {
            let array = this.arr[index]['list'][key];
            console.log(array);
            if(array['active']) {
                array['active'] = false;
                var index = this.choosed.indexOf(array.id);
                this.choosed.splice(index,1);
            }else {
                array['active'] = true;
                this.choosed.push(array.id);
            }
            this.arr = JSON.parse(JSON.stringify(this.arr));
            console.log(this.choosed);
        }
    }
}
</script>

<style>
    .top {
        width: 100%;
        height: 274rpx;
        background: #fff;
        margin-top: 20rpx;
    }
    .top view {
        height: 82rpx;
        display: flex;
        justify-content: center;
    }
    .top view text {
        line-height: 82rpx;
        color: #333333;
        font-size: 32rpx;
    }
    .top view text:nth-child(1) {
        width: 60%;
        padding-left: 25rpx;
    }
    .top view text:nth-child(2) {
        width: 40%;
        text-align: right;
        padding-right: 24rpx;
    }
    .top view:nth-child(2) {
        border-top: 1rpx solid #F0F0F0;
        border-bottom: 1rpx solid #F0F0F0;
    }
    .upload {
        position: relative;
        width: 100%;
        height: 330rpx;
        background: #fff;
        margin-top: 20rpx;
    }
    .upload text:nth-child(1) {
        display: block;
        height: 31rpx;
        margin-top: 24rpx;
        padding-left: 24rpx;
        color: #333333;
        font-size: 32rpx;
    }
    .upload text:nth-child(2) {
        display: block;
        height: 23rpx;
        margin-top: 20rpx;
        padding-left: 23rpx;
        color: #333333;
        font-size: 24rpx;
    }
    .upload .picture {
        width: 100%;
        margin-top: 33rpx;
        padding-left: 36rpx;
    }
    .upload .picture::after{
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;

    }
    .upload .picture .item {
        
        /* display: inline-block; */
        width: 173rpx;
        height: 166rpx;
        border: 1rpx solid #F0F0F0;
        margin-right: 34rpx;
        float: left;
        position: relative;
    }
    .upload .picture view img {
        width: 100%;
        height: 100%;
    }
    .upload .picture .delete{
        position: absolute;
        top: -19.5rpx;
        right: -19.5rpx;
        width: 39rpx;
        height: 39rpx;
        border: none;
    }
   
    .title {
        width: 100%;
        height: 84rpx;
        background: #fff;
        line-height: 84rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: left;
    }
    .title text:nth-child(1) {
        width: 20%;
        color: #333333;
        font-size: 36rpx;
        padding-left: 26rpx;
        font-weight: 500;
    }
    .title text:nth-child(2) {
        color: #999999;
        font-size: 30rpx;
        font-weight: 500;
    }
    .items {
        width: 100%;
        height: 100%;
        background: #fff;
        margin-top: 20rpx;
    }
    .items .box {
        border-bottom: 1rpx solid #F0F0F0;
    }
    .items .box .text {
        color: #333333;
        font-size: 36rpx;
        margin-left: 23rpx;
        margin-bottom: 10rpx;
          font-weight: 500 !important
    }
    .list {
        display: inline-block;
    }
    .list view {
        width: 234rpx;
        height: 55rpx;
        border: 1rpx solid #CACACA;
        margin-left: 91rpx;
        margin-bottom: 29rpx;
    }
    .list view img {
        width: 33rpx;
        height: 23rpx;
        margin-left: 20rpx;
    }
    .list view text {
        margin-left: 10rpx;
    }
    .active {
        border: 1rpx solid #FCCD00 !important;
    }
    .remark {
        width: 704rpx;
        height: 158rpx;
        background: #fff;
        margin: 18rpx 23rpx 0;
    }
    .remark view {
        color: #333333;
        font-size: 30rpx;
        padding: 18rpx 0 0 23rpx;
    }
    .button {
        width: 100%;
        height: 98rpx;
        background: #FDD000;
        color: #474747;
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        line-height: 98rpx;
        margin-top: 193rpx;
    }
</style>