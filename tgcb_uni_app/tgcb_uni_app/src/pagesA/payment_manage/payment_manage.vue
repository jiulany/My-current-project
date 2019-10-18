<template>
    <view class="payment_manage">
        <view class="item">
            <view class="name">
                免密支付
            </view>
            <view>
                <view class="uni-list">
                <view class="uni-list-cell uni-list-cell-pd">
                    <switch :checked="is_password_payment" @change="change" />
                </view>
                </view>
            </view>
        </view>
        
        <view class="item" @tap="_updatePassword" v-if="status && viable">
            <view class="name">
                修改密码
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
        
        <view class="item" @tap="_setPassword" v-if="status == false && viable">
            <view class="name">
                设置密码
            </view>
            <view>
                <i class="iconfont icon-xiayibu"></i>
            </view>
        </view>
    </view>
</template>

<script>
    import {UserModel} from "../../model/user";
    const  userModel = new UserModel()
    export default {
        name: "payment_manage",
        data(){
            return {
                status:false,
                viable:false,
                is_password_payment:0
            }
        },
        methods:{
            _setPassword()
            {
                uni.navigateTo({
                    url:'/pagesA/set_pwd/set_pwd'
                })
            },
            _updatePassword()
            {
                uni.navigateTo({
                    url:'/pagesA/update_pwd/update_pwd'
                })
            },
            payPasswordStatus(){
                userModel.isHasPassword().then((res) => {
                        this.status = res.data.status
                        this.is_password_payment = res.data.is_password_payment
                        this.viable = true
                })
            },
            change(){
                if (this.is_password_payment == 0) {
                    this.is_password_payment = 1
                } else {
                    this.is_password_payment = 0
                }
                let params = {
                    is_password_payment : this.is_password_payment
                }
                userModel.setPasswordPayment(params).then((res) => {
                    uni.showToast({
                        title:res.message,
                        icon:'none'
                    })
                })
            }
        },
        onLoad(){
            
        },
        onShow(){
            this.payPasswordStatus()
        }
    
    }   
</script>

<style scoped>
.item{
    display: flex;
    flex-direction: row;
    height: 98rpx;
    background: #fff;
   margin-bottom: 2rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    font-size:28rpx;
}
</style>