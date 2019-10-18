<template>
    <view class="update-pwd">
        <view class="item">
            <view class="name">
                原密码:
            </view>
            <view class="input-box">
                <input type="password" @input="_old_password" v-model="old_password">
            </view>
        </view>
        <view class="item">
            <view class="name">
                新密码:
            </view>
            <view class="input-box">
                <input type="password" @input="_new_password" v-model="new_password">
            </view>
        </view>
        <view class="item">
            <view class="name">
                确认密码:
            </view>
            <view class="input-box">
                <input type="password" @input="_confirm_password" v-model="confirm_password">
            </view>
        </view>
        
        <view class="finish" @tap="_finish">
            完成设置
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
                old_password:'',
                new_password:'',
                confirm_password:''
            }
        },
        methods:{
            _old_password(e)
            {
                this.old_password = e.detail.value
            },
            _new_password(e)
            {
                this.new_password = e.detail.value
            },
            _confirm_password(e)
            {
                this.confirm_password = e.detail.value
            },
            _finish(){
                if (this.new_password != this.confirm_password) {
                    uni.showToast({
                        title:'两次密码不一致,请重新输入',
                        icon:'none'
                    })
                    return false;
                }


                let params = {
                    old_password : this.old_password,
                    new_password : this.new_password,
                    type:2
                }
                userModel.setPassword(params).then((res) => {
                        uni.showToast({
                            title:res.message,
                            icon:'none'
                        })
                        if (res.code == 200) {
                            setTimeout(()=>{
                                uni.navigateBack()
                            },2000)
                        }
                        
                })
            }
        }
    
    }   
</script>

<style lang="less">
.update-pwd{
    color:#333333;
    .item{
        display: flex;
        flex-direction: row;
        height: 98rpx;
        background: #fff;
        margin-bottom: 2rpx;
        align-items: center;
        padding: 0 20rpx;
        font-size:32rpx;
        .input-box{
            margin-left: 30rpx;
        }
    }
    .finish{
        background: #FDD000;
        height:98rpx;
        margin-top: 87rpx;
        text-align: center;
        line-height: 98rpx;
        font-size: 36rpx;

    }
}

</style>