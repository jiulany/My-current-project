<template>
    <view class="cosmetology">
        <view class="cosmetology_box" v-for="(item,index) in list" :key="index">
            <view class="cosmetology_box_items">
                <view class="cosmetology_box_item_1">
                    <radio-group @click="radioChange(item.id.toString())">
                        <radio :value="item.id.toString()" :checked="item.checked" color="#FDD000" />
                    </radio-group>
                </view>
                <view class="cosmetology_box_item_2">
                    <image :src="list.commodity_image_thum"></image>
                </view>
                <view class="cosmetology_box_item_3">
                    <view class="title">
                        {{item.commodity_name}}
                    </view>
                    <view class="desc">
                        {{item.brief_introduction}}
                    </view>
                </view>
                <view class="cosmetology_box_item_4">￥{{item.min_price}}</view>
            </view>
        </view>
        <view class="fonter_h"></view>
        <view class="cosmetology_footer">
            <view class="cosmetology_footer_item_1">
                <radio-group @change="radioChange">
                    <radio value="2" color="#FDD000" />
                </radio-group>
                <view class="all ">全选</view>
            </view>
            <view class="cosmetology_footer_item_2 all">
                <i class="iconfont icon-kefu"></i>
                <view class="phone">客服</view>
            </view>
            <view class="cosmetology_footer_item_3">
                <view class="sumprice">合计金额:</view>
                <view class="sumpriceNum">￥{{sumPrice}}</view>
            </view>
            <view class="cosmetology_footer_item_4" @tap="_submit">
                去结算
            </view>

        </view>
    </view>

</template>

<script>
    import {IndexModel} from "../../model";
    const  indexModel = new IndexModel()
    export default {
        name: "repair",
        data(){
            return {
                list: [],
                page:1,
                size:10,
                sumPrice:"0.00",
                sumData:[]
            }
        },
        onLoad(){
            this._getRepair()
        },
        methods:{
            _submit(){
                let data = JSON.stringify(this.sumData)
                uni.navigateTo({
                    url:"/pages/car_wash_buyOrder/car_wash_buyOrder?data="+ data
                })
            },
            _getRepair(){
                let data = {
                    page:this.page,
                    size:this.size
                }
                indexModel.getRepair(data).then((res)=>{
                    if(res.data) {
                        this.list = res.data.data
                    }
                })
            },
            //计算价格
            _getPrice(data){
                let price = 0
                let sumData = []
                for (let item of data) {
                    if(item.checked) {
                        let items = {
                            id:item.one_sku.id,
                            num:1
                        }
                        sumData.push(items)
                        price+=parseFloat(item.min_price)
                    }
                }
                this.sumData = sumData
                this.sumPrice = price.toFixed(2)
            },
            radioChange(id){
                let list = this.list
                list.map((item)=>{
                    if(item.id == id) {
                        item.checked = !item.checked
                    }
                })
                this._getPrice(list)
                this.list = JSON.parse(JSON.stringify(list))
            }
        }
    }
</script>

<style scoped>
    .cosmetology{
        height: 100%;
        background: #FFFFFF;
    }
    .cosmetology_box{
        background: #FFFFFF;
    }
    .cosmetology_box .cosmetology_box_items{
        display: flex;
        flex-direction: row;
        height: 178rpx;
        align-items: center;
        border-bottom: solid 1rpx #E2DED7;
        margin-left: 15rpx;
        margin-right: 15rpx;
    }
    .cosmetology_box_items:last-child{
        border-bottom: none;
    }
    .cosmetology_box_item_1{
        width: 87rpx;
        text-align: center;
    }
    .cosmetology_box_item_2,.cosmetology_box_item_2 image{
        width: 117rpx;
        height: 117rpx;
    }
    .cosmetology_box_item_3{
        height: 117rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20rpx;
    }
    .cosmetology_box_item_3 .title{
        font-size:28rpx;
        font-weight:500;
        color:#474747
    }
    .cosmetology_box_item_3 .desc{
        font-size:25rpx;
        color: #999999;
    }
    .cosmetology_box_item_4{
        padding-right: 20rpx;
        text-align: right;
        color:#F75C3E;
        font-weight:bold;
        font-size: 30rpx;
    }
    .cosmetology_footer{
        padding-left: 15rpx;
        padding-right: 10rpx;
        border-top: solid 1rpx #F5F5F5;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 125rpx;
        background: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .cosmetology_footer_item_1{
        width: 87rpx;
        text-align: center;
    }
    .cosmetology_footer_item_2{
        padding-top: 14rpx;
        width: 87rpx;
        text-align: center;
        line-height: 26rpx;
    }
    .cosmetology_footer_item_3{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .cosmetology_footer_item_4{
        width:202rpx;
        height:78rpx;
        background:#FDCE33;
        border-radius:39px;
        margin-right: 20rpx;
        text-align: center;
        line-height: 78rpx;
        font-size:36rpx;
        color:rgba(255,255,255,1);
        margin-left: 70rpx;

    }
    .sumprice{
        font-size:28rpx;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .sumpriceNum{
        margin-left: 10rpx;
        font-size:28rpx;
        font-weight:bold;
        color:rgba(247,92,62,1);
    }
    .fonter_h{
        height: 125rpx;
    }
    .all{
        color: #959595;
    }
    .icon-kefu{
        font-size: 26px;
    }


</style>