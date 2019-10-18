<template>
    <view class="maintain_shop">
        <!-- <checkbox-group  @change="checkboxChange">
            <view v-for="(item,index) in list" :key="index">
                <view class="maintain_shop_title">
                    {{item.classify_name}}
                </view>
                <view class="maintain_shop_box">
                    <view class="maintain_shop_box_item"  v-for="(value,key) in item.sku" :key="key">
                            <label class="uni-list-cell-pd border" >
                                <checkbox  :value="value.id" :checked="index === current" color="#FDD000" />
                            </label>
                            <image class="maintain_shop_image" :src="value.images.commodity_image_thum"></image>
                            <view class="maintain_shop_desc">{{value.commodity.commodity_name}}{{value.sku_name}}</view>
                            <view class="maintain_shop_price">{{value.price.price}}</view>
                    </view>
                    
                </view>
            </view>
        </checkbox-group> -->

            <view v-for="(item,index) in list" :key="index">
                <view class="maintain_shop_title">
                    {{item.classify_name}}
                </view>
                <view class="maintain_shop_box">
                    <radio-group class="maintain_shop_radio" @change="checkboxChange($event)">
                        <label class="uni-list-cell-pd border" v-for="(value,key) in item.sku" :key="key">
                            <view class="left">
                                <radio  :value="value.id" :checked="b === current" color="#FDD000" />
                            </view>
                            <view class="right">
                                <!-- <image class="maintain_shop_image" :src="value.images.commodity_image_thum"> -->
                                <image class="maintain_shop_image" src="https://imgcdn.tuogouchebao.com/default-image.png">
                                </image>

                                <view class="maintain_shop_desc">{{value.commodity.commodity_name}}
                                    <!-- {{value.sku_name}} -->
                                </view>
                                <view class="maintain_shop_price">¥{{value.price ? value.price.price : 0}}</view>
                            </view>
                        </label>
                    </radio-group>
                </view>
            </view>
       
        <!--按钮-->
        <view class="footer">
            <view class="footer_title">
                <view class="footer_desc">您已选择了<span class="footer_price">{{num}}</span>件商品</view>
                <view class="footer_price">总价：{{total}}</view>
            </view>
            <view class="footer_btn" @tap="toBuy">
                下一步
            </view>
        </view>
    </view>
</template>

<script>
import { MaintainModel } from "../../model/maintain";
const maintainModel = new MaintainModel();
    export default {
        name: "maintain_shop",
        data(){
            return {
                list:[],
                current:0,
                num:0,
                total:0,
                checked:[],
                checkedData:[],
                radioItem: {}
            }
        },
        methods:{
            matching(classify_ids){
                maintainModel.matching({classify_ids:classify_ids}).then((res) => {
                    this.list = res.data;
                    console.log(this.list)
                    this.radioItem = this.list[0].sku;
                    console.log(this.radioItem);
                })
            },
            checkboxChange(e){
                console.log(e);
                this.checkedData.push({id:e.target.value,num:1})
                for (let i = 0; i < this.radioItem.length; i++) {
                    if (this.radioItem[i].id === e.target.value) {
                        this.current = i;
                        break;
                    }
                }
                // console.log(event);
                // let value = event.detail.value
                // this.total = 0
                // this.checkedData = []
                // this.num = event.detail.value.length
                // this.checked = event.detail.value
                // if (this.num > 0) {
                //     for(let i of this.list) {
                //         for(let j of i.sku) {
                //             // console.log(JSON.stringify(value).indexOf(j.id))
                //             if (JSON.stringify(value).indexOf(j.id) > 0 ) {
                //                 this.total += Number(j.price ? j.price.price : 0)
                //                 this.checkedData.push({
                //                     id:j.id,
                //                     num:j.number
                //                 })
                //             }
                //         }
                //      }
                // }
                // console.log(this.checked);
                // console.log(this.checkedData);
            },
            toBuy(){
                let data = JSON.stringify(this.checkedData)
                console.log(data)
                uni.navigateTo({
                    url:`/pagesB/car_wash_buyOrder/car_wash_buyOrder?data=` + data
                })
            }
        },
        onLoad(options){
            this.matching(options.classify_ids)
        }
    }
</script>

<style scoped>
.maintain_shop{
    padding-bottom: 160rpx;
}
.maintain_shop_title{
    height: 81rpx;
    line-height: 81rpx;
    padding-left: 36rpx;
    font-size:32rpx;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.maintain_shop_box{
    background: #FFFFFF;
}
.maintain_shop_box_item{
    height: 199rpx;
    border-bottom: 1px solid rgba(240,240,240,1);
    display: flex;
    flex-direction: row;
    align-items: center;
}
.maintain_shop_radio{
    width: 100%;
    /* margin-left: 28rpx; */
    margin-right: 18rpx;
}
.uni-list-cell-pd {
    display: flex;
}
.left {
    /* width: 20%; */
    /* height: 200rpx; */
    display: flex;
    align-items: center;
    justify-content: center
}
.right {
    /* width: 80%; */
    /* height: 200rpx; */
    display: flex;
    justify-content: center;
}
.maintain_shop_image{
    width: 100rpx;
    height: 100rpx;
}
.maintain_shop_desc{
    padding: 0 10rpx;
    flex: 1;
    color: #333333;
}
.maintain_shop_price{
    margin-right: 28rpx;
    font-size:32rpx;
    font-weight:500;
    color:rgba(253,71,93,1);
}
.footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

}
.footer_title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 29rpx;
    padding-right: 28rpx;
    background: #FFFFFF;
    height:47rpx;
    font-size:30rpx;
}
.footer_price{
    color: #FD475D;
}
.footer_btn{
    background: #FDD000;
    text-align: center;
    height:98rpx;
    font-size:36rpx;
    font-weight:bold;
    color:rgba(71,71,71,1);
    line-height:98rpx;
}
</style>