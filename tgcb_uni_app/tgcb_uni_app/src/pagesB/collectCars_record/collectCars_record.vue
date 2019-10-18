<template>
    <view class="collectCars_record">
        <view class="collectCars_record_item">
            <block v-for=" (item,index) in recordList" :key="index">
                <view class="item_top">
                    <view class="item_top_left">申请收车</view>
                    <view class="item_top_right">
                        <view class="item_btn_left" @tap="reminder(item.id)">催单</view>
                        <view class="item_btn_right">删除</view>
                    </view>
                </view>
                <view class="item_content">
                    您申请收车的车型为：{{item.sales_name}}，正在等待客服处理！
                </view>
                <view class="item_bottom">
                    {{item.created_at}}
                </view>
            </block>
        </view>
        <view class="collectCars_record_desc">
            <view>使用说明</view>
            <view>提交成功后，工作人员将会在24小时内与您取得联系或您主动
                联系客户：02883399903 ！</view>
        </view>
    </view>
</template>

<script>
    import { IndexModel } from "../../model/index";
    const indexModel = new IndexModel();
    export default {
        name: "collectCars_record",
        data() {
            return {
                recordList: [],
                recordData: {
                    page: 1,
                    size: 10
                }
                
            }
        },
        methods: {
            // 提交记录
            getSubRecord() {
                indexModel.subRecord(this.recordData).then(res => {
                    if(res.code !== 200) {
                        uni.showToast({
                            title: '获取失败，请稍后重试',
                            icon: 'none'
                        });
                    }
                    if(res.code == 200){
                        let a = this.recordList.concat(res.data)
                        this.recordList = a;
                        if(res.data.length==0){
                        }else{
                            this.recordData={page:this.recordData.page+1,size:1}
                        }
                        console.log(this.recordList);
                        this.recovery_log_id = res.data.id;
                    }
                });
            },
            // 催单
            reminder(id) {
                console.log(id);
                let recovery_log_id = id;
                console.log(recovery_log_id);
                indexModel.reminder({recovery_log_id:recovery_log_id}).then( (res) => {
                    console.log(res);
                    if((res.code == 201) || (res.code == 200)) {
                        uni.showToast({
                        title: res.message,
                        icon: 'none'
                    });
                    }
                   
                } );
            }
        },
        onLoad() {
            this.getSubRecord();
        },
        onReachBottom() {
            this.getSubRecord();
            console.log(123);
        }
    }
</script>

<style scoped>
    .collectCars_record{
        margin-top: 20rpx;
    }
    .collectCars_record_item{
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 30rpx;
        margin-bottom: 10rpx;
    }
    .item_top{
        margin-top: 20rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .item_top_right{
        display: flex;
        flex-direction: row;
    }
    .item_content{
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        font-size: 24rpx;
    }
    .item_bottom{
        color: #999;
        margin-bottom: 10rpx;
    }
    .item_btn_left{
        width: 117rpx;
        height: 46rpx;
        font-size:28rpx;
        color: #FFFFFF;
        line-height: 46rpx;
        border-radius: 20rpx;
        text-align: center;
        background: #FDD000;
    }
    .item_btn_right{
        width: 117rpx;
        height: 46rpx;
        font-size:28rpx;
        color: #FFFFFF;
        line-height: 46rpx;
        border-radius: 20rpx;
        text-align: center;
        margin-left: 15rpx;
        background: #B2B2B2;
    }
    .collectCars_record_desc{
        width: 596rpx;
        margin: 0 auto;
        margin-top: 50rpx;
        text-align: center;
        color: #999999;
        font-size: 24rpx;
    }
</style>