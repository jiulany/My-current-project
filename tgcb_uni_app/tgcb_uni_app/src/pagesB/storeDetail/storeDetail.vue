<template>
    <view class="storeDetail">
        <view class="storeDetail_banner">
            <image src="../../static/img/banner3.png"></image>
        </view>
        <view class="storeDetail_title">
            脱狗车宝浅水半岛店
        </view>
        <view class="storeDetail_desc">
            <view class="storeDetail_desc_left">四川省成都市青羊区狮马路98号太升大厦</view>
            <view class="storeDetail_desc_right">导航</view>
        </view>
        <view class="storeDetail_box">
            <view class="storeDetail_box_top">
                <view class="storeDetail_box_item title_active">服务</view>
                <view class="storeDetail_box_item">优惠</view>
                <view class="storeDetail_box_item">评价</view>
            </view>
            <view class="storeDetail_box_content">
                <block v-if="active == '1' || active == '2'">
                    <view class="box_content_top">
                    <view class="box_content_title ">
                        <span>洗车</span>
                    </view>
                    <view class="box_content_title box_content_title_active">
                        <span>洗车</span>
                    </view>
                    <view class="box_content_title">
                        <span>洗车</span>
                    </view>
                </view>
                    <view class="box_content_items">
                        <view class="box_content_desc">
                            以下是门店服务内容
                        </view>
                        <view class="content_items_box">
                            <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1346669751,974538333&fm=26&gp=0.jpg">
                            </image>
                            <view class="items_box_content">
                                <view class="items_box_content_title">
                                    <view class="_title">简洗车身</view>
                                    <view class="_desc">高效水蜡清洗</view>
                                </view>
                                <view class="box_content_price">￥10.00</view>
                            </view>
                            <view class="item_box_pay">
                                支付
                            </view>
                        </view>
                    </view>
                </block>
                <block v-if="active == '3'">
<!--                    评价-->
                    <view class="evaluate">
                        <view class="evaluate_top">
                            <view class="evaluate_top_header">
                                <view class="evaluate_title_line"></view>
                                <view class="evaluate_title">服务评价(30)</view>
                                <view class="evaluate_title_line"></view>
                            </view>
                            <view class="evaluate_top_bottom">
                                <view class="evaluate_bottom_box">
                                    <view class="evaluate_bottom_icons">
                                        <i class="iconfont icon-guanbi"></i>
                                        <i class="iconfont icon-guanbi"></i>
                                        <i class="iconfont icon-guanbi"></i>
                                        <i class="iconfont icon-guanbi"></i>
                                        <i class="iconfont icon-guanbi"></i>
                                    </view>
                                    <view class="icon_number">
                                        5.0分
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="evaluate_content">
                            <image src="https://www.bentleymotors.com/etc/clientlibs/bentley/bentley.motors.apps/resources/img/bentley_logo_c2-d@2x.png"></image>
                            <view class="evaluate_content_box">
                                <view class="evaluate_content_box_title">
                                    宝马X5<span class="title_right">川A1213</span>
                                </view>
                                <view class="evaluate_content_box_desc">很不错的一家洗车店</view>
                            </view>
                            <view class="evaluate_content_right">
                                <view class="evaluate_content_right_icon">
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                </view>
                                <view class="evaluate_content_right_date">2019-07-05</view>
                            </view>
                        </view>
                        <view class="evaluate_content">
                            <image src="https://www.bentleymotors.com/etc/clientlibs/bentley/bentley.motors.apps/resources/img/bentley_logo_c2-d@2x.png"></image>
                            <view class="evaluate_content_box">
                                <view class="evaluate_content_box_title">
                                    宝马X5<span class="title_right">川A1213</span>
                                </view>
                                <view class="evaluate_content_box_desc">很不错的一家洗车店</view>
                            </view>
                            <view class="evaluate_content_right">
                                <view class="evaluate_content_right_icon">
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                    <i class="iconfont icon-guanbi"></i>
                                </view>
                                <view class="evaluate_content_right_date">2019-07-05</view>
                            </view>
                        </view>
                        <view class="evaluate_bottom_s">

                        </view>
                        <view class="evaluate_bottom">
                            <input placeholder="请为我们洗车店打分评论咯~">
                            <view class="evaluate_btn">提交</view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
<!--        评论弹窗-->
        <view class="evaluate_pop">
            <view class="evaluate_pop_box">
                <view class="evaluate_pop_title">
                    请为我们的服务打分和评论咯
                </view>
                <view class="evaluate_pop_icons">
                    <i class="iconfont icon-guanbi"></i>
                    <i class="iconfont icon-guanbi"></i>
                    <i class="iconfont icon-guanbi"></i>
                    <i class="iconfont icon-guanbi"></i>
                    <i class="iconfont icon-guanbi"></i>
                </view>
                <textarea placeholder="请为我们评价吧~" class="textarea"></textarea>
                <view class="btn">
                    提交评价
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "storeDetail",
        data(){
            return {
                active:3
            }
        }
    }
</script>

<style scoped>
page{
    height: 100%;
    background: #fff;
}
.storeDetail_banner,.storeDetail_banner image{
    height: 400rpx;
    width: 100%;
}
.storeDetail_title{
    font-size:30rpx;
    color:rgba(51,51,51,1);
    margin-left: 24rpx;
    height: 87rpx;
    line-height: 87rpx;
    border-bottom: #E6E6E6 solid 1rpx;
}
.storeDetail_desc{
    height: 126rpx;
    margin-left: 23rpx;
    margin-right: 23rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.storeDetail_desc_left{
    font-size:26rpx;
    color:rgba(153,153,153,1);
}
.storeDetail_desc_right{
    width:150rpx;
    height:58rpx;
    text-align: center;
    line-height: 58rpx;
    background:rgba(253,209,0,1);
    border-radius:29rpx;
    font-size:28rpx;
    color:rgba(255,255,255,1);
}
.storeDetail_box{
    border-top: solid 20rpx #F5F5F5!important;
    display: flex;
    flex-direction: column;
}
.storeDetail_box_top {
    height: 90rpx;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    border-bottom: solid 1rpx #E6E6E6;
}
.storeDetail_box_item{
    flex: 1;
    color: #333333;
    font-size: 28rpx;

}
.title_active{
    font-size: 30rpx !important;
}
.box_content_top{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: center;
    height: 74rpx;
    align-items: center;
}
.box_content_title{
    width: 164rpx;
    color: #333333;
    font-size: 28rpx;
}
.box_content_title_active{
    font-weight:bold;
    color:#FDD100 !important;
}
 .box_content_title_active span{
     border-bottom: 4rpx solid #FDD100;
 }
    .box_content_desc{
        height:60rpx;
        background:rgba(253,209,0,0.1);
        line-height: 60rpx;
        padding-left: 55rpx;
        font-size:24rpx;
        color: #FDD100;
    }
    .content_items_box{
        position: relative;
        height: 195rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 27rpx;
        border-bottom: #E2DED7 solid 1rpx;
    }
    .content_items_box image{
        width: 127rpx;
        height: 127rpx;
        margin-right: 14rpx;
    }
    .items_box_content{
        flex: 1;
        height: 127rpx;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
    }
    .items_box_content_title{
        display: flex;
        flex-direction: row;
    }
    .box_content_price{
        font-size:27rpx;
        color: #FF682C;
    }
    ._title{
        font-size:28rpx;
        color: #333333;
        margin-right: 12rpx;
    }
    ._desc{
        font-size:24rpx;
        color: #999999;
    }
    .item_box_pay{
        position: absolute;
        bottom: 37rpx;
        right: 24rpx;
        width:150rpx;
        height:58rpx;
        background:rgba(253,209,0,1);
        border-radius:29rpx;
        text-align: center;
        font-size:28rpx;
        color: #FFFFFF;
        line-height: 58rpx;
    }
/*    评价*/
    .evaluate_top{
        height: 162rpx;
        text-align: center;
        border-bottom: #E6E6E6 solid 1rpx;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .evaluate_title{
        font-size:36rpx;
        display: inline-block;
        margin: 0 26rpx;
    }
    .evaluate_title_line{
        width:100rpx;
        height:1rpx;
        background:rgba(153,153,153,1);
    }
    .evaluate_top_header{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 34rpx;
        align-items: center;
        margin-top: 27rpx;
    }
    .evaluate_bottom_box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .evaluate_bottom_icons .iconfont{
        font-size: 26px;
        color: #FDD100;
    }
    .icon_number{
        margin-left: 14rpx;
        font-size:30rpx;
        color: #FDD100;
    }
    .evaluate_content_right{
        text-align: center;
        width: 200rpx;
    }
    .evaluate_content_right_icon{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .evaluate_content_right_icon .iconfont{
        font-size: 14px;
        color: #FDD100;
    }
    .evaluate_content {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 185rpx;
        border-bottom: solid 1rpx #E6E6E6;
        align-items: center;
    }

    .evaluate_content image{
        margin: 0 20rpx;
        width:70rpx;
        height:70rpx;
    }
    .evaluate_content_box{
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    .evaluate_content_right_date{
        font-size: 24rpx;
        color: #999999;
    }
    .evaluate_bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height:129rpx;
        background:rgba(255,255,255,1);
        display: flex;
        flex-direction: row;
        padding: 0 24rpx;
        align-items: center;
        border-top: solid 1rpx #E6E6E6;
    }
    .evaluate_bottom input {
        padding-left: 30rpx;
        flex: 1;
        height:70rpx;
        background:rgba(245,245,245,1);
        border-radius:35px;
        font-size:26rpx;
        color:rgba(153,153,153,1);
    }
    .evaluate_btn{
        margin-left: 20rpx;
        height:58rpx;
        background:rgba(253,209,0,1);
        border-radius:29rpx;
        width:120rpx;
        font-size:28rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 58rpx;
    }
    .title_right{
        margin-left: 20rpx;
    }
.evaluate_content_box_desc{
    font-size:24rpx;
    color: #999999;
}
.evaluate_bottom_s{
    height: 139rpx;
}
.evaluate_pop{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.evaluate_pop_box{
    height: 843rpx;
    background: #FFFFFF;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 24rpx;
}
.textarea{
    padding-left: 10rpx;
    padding-top: 10rpx;
    width: 100%;
    height:401rpx;
    background:rgba(245,245,245,1);
    margin-top: 60rpx;
}
.evaluate_pop .btn{
    text-align: center;
    font-size:36rpx;
    line-height: 88rpx;
    color: #FFFFFF;
    margin-top: 75rpx;
    height:88rpx;
    background:rgba(253,209,0,1);
}
    .evaluate_pop_icons{
        text-align: center;
    }
    .evaluate_pop_icons .iconfont{
        font-size: 36px;
        color: #FDD100;
    }
    .evaluate_pop_title{
        font-size:32rpx;
        text-align: center;
        color: #333333;
    }
</style>