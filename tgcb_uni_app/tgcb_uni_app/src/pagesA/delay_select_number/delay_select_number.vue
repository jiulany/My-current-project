<template>
    <view>
        <view class="list">
            <text>车辆号码</text>
            <!-- <view class="picture">
                <text>川</text>
                <image src="../../static/image/xiala.png"></image>
            </view> -->
            <!-- <input type="text" placeholder="车牌号" placeholder-style="font-size:30rpx;color:#9B9B9B"> -->
             <input
                    type="text"
                    @focus="openKeyboard"
                    placeholder="请输入车辆车牌"
                    :value="car_num"
                    placeholder-style="font-size:30rpx;color:#9B9B9B"
                >
        </view>
        <view class="list">
            <text>联系人</text>
            <input type="text" placeholder="请输入联系人" @input="contactsInput" placeholder-style="font-size:30rpx;color:#9B9B9B">
        </view>
        <view class="list">
            <text>联系电话</text>
            <input type="text" placeholder="请输入您的电话" @input="phoneInput" placeholder-style="font-size:30rpx;color:#9B9B9B">
        </view>
        <!-- <view class="list">
            <text>评估地点</text>
            <input type="text" placeholder="请选择>" placeholder-style="font-size:30rpx;color:#9B9B9B">
        </view> -->
        <view class="message">*提交车辆资料后，将有专业评估服务顾问根据您的时间提供便捷、高效、免费的一对一车辆延保评估服务</view>
        <view class="button" @tap="submit">提交</view>
        <keyboader :visible="show_keyboader" @changeValue="changeValue" @close="closeKeyboard"></keyboader>
    </view>
</template>

<script>
import keyboader from "../../components/keyboader/keyboader";
import { IndexModel } from '../../model/index';
import { setTimeout } from 'timers';
const indexModel = new IndexModel();
export default {
    components: {keyboader },
    data() {
        return {
            car_num:'',
            phone:'',
            contacts:'fds', 
            checked:[],
            show_keyboader:false,
        }
    },
    methods: {
      openKeyboard(){
          console.log("open")
        this.show_keyboader=true
      },
      closeKeyboard(){
          console.log("close")
        this.show_keyboader=false
      },
      changeValue(e){
         this.car_num=e
      },
      contactsInput(event){
        //   console.log(event);
        let contacts = event.target.value;
        if(!(/^[\u4e00-\u9fa5]{0,}$/).test()) {
            uni.showToast({
                title: '请输入汉字',
                icon: 'none'
            });
        }else {
            this.contacts = contacts;
        }
      },
      phoneInput(event){
          let phone = event.target.value;
          if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).test(phone)) {
              uni.showToast({
                title: '请输入正确的电话号',
                icon: 'none'
            });
          }else {
              this.phone = phone;
          }
      },
      submit() {
        let params = {
            contacts:this.contacts,
            car_num:this.car_num,
            commodity_ids:this.checked,
            phone:this.phone
        }
        indexModel.delayApply(params).then((res) => {
             uni.showToast({
                 title:res.message,
                 icon:'none'
             })
             if (res.code == 201) {
                 setTimeout(()=>{
                     uni.navigateTo({
                        url: `/pagesA/delay_submit/delay_submit`
                    });
                 },200)
             }
        })


        
      }
    },
    onLoad(options){
        this.checked = options.checked
    }
}
</script>

<style>
    .list {
        width: 100%;
        height: 88rpx;
        background: #fff;
        padding: 27rpx;
        border-bottom: 1rpx solid #F0F0F0;
        display:flex;
        justify-content: space-between;
        line-height: 88rpx;
        align-items: center;
    }
    /* .list text {
        display: inline-block;
        color: #666666;
        font-size: 36rpx;
        margin-left: 25rpx;
        font-weight: 500;
        font-family:PingFang SC;
    } */
    /* .list input {
        float: right;
        width: 150rpx;
        color: #9B9B9B;
        font-size: 30rpx;
        padding-top: 10rpx;
    } */
    /* .list:nth-child(2) input {
        width: 300rpx;
        margin-right: -40rpx;
    } */

    .list input {
        width: 300rpx;
        display: inline-block;
    }
    .picture {
        display: inline-block;
        width: 120rpx;
        height: 49rpx;
        border: 1rpx solid #FDD000;
        margin-left: 265rpx;
    }
    .picture text {
        display: inline-block;
        color: #FDD000;
        font-size: 36rpx;
        margin-top: -10rpx;
        margin-left: 20rpx;
    }
    .picture image {
        display: inline-block;
        width: 19rpx;
        height: 12rpx;
        vertical-align: middle;
        margin-left: 29rpx;
    }
    .message {
        color: #9B9B9B;
        font-size: 24rpx;
        padding-top: 38rpx;
        padding-left: 28rpx;
        padding-right: 81rpx;
    }
    .button {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 98rpx;
        color: #474747;
        font-size: 36rpx;
        font-weight: bold;
        background: #FDD000;
        text-align: center;
        line-height: 98rpx;
    }
</style>