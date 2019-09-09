<template>
    <view class="cosmetologys">
        <view class="banner">
            <image :src="info.cover"></image>
        </view>
        <view class="title">
            套餐详情
        </view>
<!--        套餐详情-->
         <block v-for="(item,index) in info.details" v-key="index">
                <view class="box">
                    <image class="img_item" :src="item.image"></image>
                <view class="box_items">
                    <view class="box_items1">
                        <view class="box_items1_title">{{item.name}}</view>
                        <view class="price">{{item.package_number}}次</view>
                    </view>
                    <view class="box_items1">
                        <view class="desc">{{item.brief}}</view>
                        <view class="price">价值{{item.price}}元</view>
                    </view>
                </view>
                </view>
            </block>
        <view class="box_footer">
            <view class="box_footer_title">温馨提示：</view>
            <view class="box_footer_desc">
                <span class="curson">.</span>
                <span class="box_footer_desc_tiem">购买成功后直接发放至“我的资产”-“卡券”</span>
            </view>
            <view class="box_footer_desc">
                <span class="box_footer_desc_tiem">(全车36项检查无券发放，直接进店即可享受)</span>
            </view>
            <view class="box_footer_desc">
                <span class="curson">.</span>
                <span class="box_footer_desc_tiem">购买后2年内有效，过期失效</span>
            </view>
            <view class="box_footer_desc">
                <span class="curson">.</span>
                <span class="box_footer_desc_tiem">所有项目都已包含工时费</span>
            </view>
        </view>
<!--        定为-->
        <view class="footer_h"></view>
        <view class="footer_btn">
            <view class="footer_btn_box">
                <view class="footer_title">惊喜价：<span class="footer_title_price">￥{{info.prices[0].price}}</span></view>
                <view class="footer_desc">原价：<span>￥{{info.prices[0].original_price}}</span></view>
            </view>
            <view class="footer_btn_submit" @tap="goBuy">立即购买</view>
        </view>
    </view>
</template>

<script>
    import {PackageModel} from '../../model/package.js'
   
    const packageModel = new PackageModel()
    export default {
        name: "cosmetologys",
        data(){
            return{
                list:new Array(4),
                info:[],
                params:{}
            }
        },
        methods:{
            _getInfo(params)
            {
                packageModel.getPackageInfo(params).then((res)=>{
                    this.info = res.data
                })
            },
            goBuy()
            {
                let id = this.params.id
                uni.navigateTo({
					url : '/pagesB/vip_buy_order/vip_buy_order?type=package&id=' + id
				})
            }
        },
        onLoad:function(params)
        {
            this._getInfo(params)
            this.params = params
        }
    }
</script>

<style scoped>
page{
    height: 100%;
    background: #fff;
}
.cosmetologys{
    height: 100%;
    background: #fff;
}
.banner, .banner image{
    height: 309rpx;
    width: 100%;
}
.title{
    text-align: center;
    font-size:36rpx;
    height: 95rpx;
    line-height: 95rpx;
    color:rgba(51,51,51,1);
}
.box{
    padding: 0 24rpx;
    position: relative;
    margin-bottom: 17rpx;
}
.img_item{
    width: 100%;
    height: 179rpx;
    margin: 0 auto;
    display: block;
}
.box_items{
    position: absolute;
    top: 0;
    left: 24rpx;
    right: 24rpx;
    bottom: 0;
}
.box_items1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #FFFFFF;
    padding: 0 40rpx;
    align-items: flex-start;
}
.box_items1:first-child{
    margin-top: 41rpx;
}
.box_items1_title{
    font-family: PingFangSC-Regular, sans-serif;
    font-size:36rpx;
    color:rgba(255,255,255,1);

}
.price{
    font-size:30rpx;
    color:rgba(255,255,255,1);
    font-family:PingFang-SC-Medium;

}
.desc{
    font-size:24rpx;
    color:rgba(255,255,255,1);
}
.box_footer{
    padding-left: 30rpx;
}
.box_footer_title{
    font-size:30rpx;
    color:rgba(102,102,102,1);
}
.box_footer_desc{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size:24rpx;
    color:rgba(102,102,102,1);
    align-content: center;
    position: relative;
}
.curson{
    color: #FDD000;
    margin-top: -15rpx;
    font-size: 50rpx;
    position: absolute;

}
.box_footer_desc_tiem{
    margin-left: 15rpx;
}
.footer_btn{
    height: 97rpx;
    display: flex;
    flex-direction: row;
    background: #FFFFFF;
    border-top: 1rpx solid rgba(240,240,240,1);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.footer_btn_submit{
    width: 271rpx;
    background: #FDD000;
    line-height: 97rpx;
    text-align: center;
    font-size:36rpx;
    font-weight:bold;
    color:rgba(71,71,71,1);
}
.footer_btn_box{
    flex: 1;
    padding-left: 47rpx;
}
.footer_title{
    font-size:32rpx;
}
.footer_title_price{
    color: #FF2A2A;
}
.footer_desc{
    margin-top: -5rpx;
    font-size:24rpx;
    color:rgba(153,153,153,1);
    text-decoration: line-through;
}
.footer_h{
    height: 120rpx;
}
</style>