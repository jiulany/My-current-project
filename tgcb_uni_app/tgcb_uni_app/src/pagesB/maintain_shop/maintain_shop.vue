<template>
    <view class="maintain_shop">
        <view class="maintain_shop_title">
            换空气格
        </view>
        <view class="maintain_shop_box">
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
        </view>
        <view class="maintain_shop_title">
            换空气格
        </view>
        <view class="maintain_shop_box">
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
        </view>
        <view class="maintain_shop_title">
            换空气格
        </view>
        <view class="maintain_shop_box">
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
            <view class="maintain_shop_box_item">
                <radio-group class="maintain_shop_radio" @change="radioChange">
                    <radio value="" color="#FDD000" />
                </radio-group>
                <image class="maintain_shop_image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3409104389,2062520042&fm=26&gp=0.jpg"></image>
                <view class="maintain_shop_desc"></view>
                <view class="maintain_shop_price">60.00</view>
            </view>
        </view>
        <!--按钮-->
        <view class="footer">
            <view class="footer_title">
                <view class="footer_desc">您已选择了<span class="footer_price">3</span>件商品</view>
                <view class="footer_price">总价：1174</view>
            </view>
            <view class="footer_btn">
                下一步
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "maintain_shop"
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
    width: 60rpx;
    margin-left: 28rpx;
    margin-right: 18rpx;
}
.maintain_shop_box_item:last-child{
    border: none;
}
.maintain_shop_image{
    width: 155rpx;
    height: 140rpx;
}
.maintain_shop_desc{
    flex: 1;
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