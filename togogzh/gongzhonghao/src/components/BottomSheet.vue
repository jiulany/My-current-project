<template>
    <div class="text-xs-center sheet">
        <v-bottom-sheet v-model="sheet">
            <v-list>
                <v-subheader class='sheet_tt'>确认付款<v-icon class="sheet_clear" @click='close'>clear</v-icon>
                </v-subheader>
                <v-list-tile class='sheet_tt_it'>
                    <v-list-tile-title>账号：{{user}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile class='sheet_tt_it'>
                    <v-list-tile-title style='width:490px'>付款方式：{{pay_dt_type}}</v-list-tile-title>
                    <v-list-tile-title>付款金额：{{pay_money}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile class='sheet_zf'>
                    <v-btn color='#fdd000' @click='toPay' :loading='son_pay'>立即付款</v-btn>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
        <v-dialog v-model="dialog" max-width="290" class='balc_pay' origin='center bottom'>
            <v-card>
                <v-card-title class="headline balc_pay_h">余额支付</v-card-title>
                <v-card-text>
                    <div class="input_control">
                        <input type="password" @blur='elimi' @click='focuthis' id='focusthis' maxlength="6" v-model='input_value' onkeyup="value=value.replace(/[^\d]/g,'')" />
                        <span ref='placehoalder' class=""></span>
                    </div>
                    <div class='balc_pay_ts'><span>*默认密码123456</span>&nbsp;<span style="color: #5cbbf6" @click='toSetPsw'>前往设置</span></div>
                </v-card-text>
                <v-card-actions>
                    <v-btn class='balc_pay_s ' color="" flat="flat" @click='cancelPay'>
                        取消
                    </v-btn>
                    <v-btn class='balc_pay_cl' color="" flat="flat" :loading='pay_loading' @click='toPayBal'>
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
    props: ['sheet_pro', 'pay_type', 'pay_money', 'pay_data', 'ordernum'],
    created() {
        this.sheet = this.sheet_pro
        this.pay_dt_type = this.pay_type
        this.pay_money = this.pay_money
        this.$api.updUser({ id: this.$Cks.get('id') }).then(res => {
            this.user = res.data.data.phone
        }).catch(res => {})
    },
    data: () => ({
        sheet: false,
        user: '',
        pay_dt_type: '',
        pay_dt_money: '',
        pay_dt_data: {},
        dialog: false,
        input_value: "",
        pay_loading: false,
        son_pay: false
    }),
    watch: {
        sheet_pro(val) {
            this.sheet = val
        },
        sheet(val) {
            this.$emit('emitSheetState', val)
        },
        pay_type(val) {
            this.pay_dt_type = val
        },
        pay_data(val) {
            this.pay_dt_data = val
        }
    },
    methods: {
        elimi() {
            window.scroll(0, 0)
        },
        focuthis() {
            document.getElementById("focusthis").focus()
        },
        close() {
            this.sheet = false
        },
        toSetPsw() {
            this.$router.push('/window/myinfo/personal/privacy')
        },
        toPay() {
            var that = this
            that.son_pay = true
            if (this.pay_dt_type == '' || this.pay_dt_type == '未选择') {
                this.$message.error("请选择支付方式")
                this.son_pay = false
            } else if (this.pay_dt_type == '微信支付') {
                let a = JSON.parse(this.pay_dt_data)
                new Promise((resolve, reject) => {
                    resolve()
                }).then(resp => {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: a.appId, // 必填，公众号的唯一标识
                        timestamp: a.timeStamp, // 必填，生成签名的时间戳
                        nonceStr: a.nonceStr, // 必填，生成签名的随机串
                        paySign: a.paySign, // 必填，签名
                        jsApiList: ["chooseWXPay", 'translateVoice'] // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function() {
                        wx.chooseWXPay({
                            appId: a.appId,
                            nonceStr: a.nonceStr,
                            package: a.package,
                            signType: a.signType,
                            timestamp: a.timeStamp,
                            paySign: a.paySign,
                            success: function(res) {
                                that.$message.success("支付成功")
                                that.son_pay = false
                                that.$router.push('/window/myinfo/orderwait/0')
                            },
                            cancel: function(res) {
                                that.$message.warning("用户取消支付")
                                that.son_pay = false
                                that.$router.push('/window/myinfo/orderwait/1')
                            },
                            fail: function(res) {
                                that.$message.error("支付失败")
                                that.son_pay = false
                            }
                        });
                    });
                })
            } else {
                this.$api.havePwd({
                    id: this.$Cks.get('id')
                }).then(res => {
                    if (res.data.ret == 200) {
                        this.input_value = ''
                        this.dialog = true
                    }
                    if (res.data.ret == 403) {
                        that.$message.error("您还未设置支付密码,请前往个人中心设置")
                    }
                    if (res.data.ret == 404) {
                        that.$message.error("您还未设置支付密码,请前往个人中心设置")
                    }
                    this.son_pay = false
                })


                // this.$api.getBalance({
                //     userId: localStorage.getItem("id")
                // }).then(res => {
                //     if (res.data.ret != 200) {
                //         that.$message.error("您还未设置支付密码,请前往个人中心设置")
                //     } else {
                //         this.input_value = ''
                //         this.dialog = true
                //     }
                //     this.son_pay = false
                // })
            }
        },
        toPayBal() {
            this.pay_loading = true
            this.$api.Validate({
                id: this.$Cks.get('id'),
                paypwd: this.input_value,
                ordernum: this.ordernum
            }).then(res => {
                if (res.data.ret == 428) {
                    this.$message.error("余额不足，请前往充值")
                    this.pay_loading = false //支付loading状态
                    this.dialog = false
                } else if (res.data.ret == 429) {
                    this.$message.error("输入支付密码错误，请重新输入")
                    this.input_value = ''
                    this.pay_loading = false
                } else if (res.data.ret == 200) {
                    this.$message.success("支付成功")
                    this.input_value = ''
                    this.pay_loading = false
                    this.dialog = false
                    this.$router.push('/window/myinfo/orderwait/0')
                } else {
                    this.input_value = ''
                    this.pay_loading = false
                }
            })
        },
        cancelPay() {
            this.dialog = false
            this.$router.push('/window/myinfo/orderwait/1')
            this.$message.warning("用户取消支付")
        }
    }
}
</script>
<style>
.sheet_tt {
    display: inline-block;
    line-height: 40px;
    width: 100%;
    font-size: 18px;
    position: relative;
    border-bottom: 1px solid #f9f9f9
}

.sheet_clear {
    position: absolute !important;
    display: inline-block;
    right: 20px;
    top: 8px;
    width: 20px;
}

.sheet .v-list {
    padding-bottom: 0
}

.sheet_zf {
    padding: 0
}

.sheet_tt_it .v-list__tile {
    padding: 36px 16px
}

.sheet_zf .v-list__tile {
    padding: 0
}

.sheet_zf button {
    width: 100%;
    margin: 0;
    height: 100%;
}

.balc_pay_h {
    font-size: 18px !important
}

.balc_pay .v-card__title {
    display: block;
    text-align: center;
    padding: 10px 16px;
}

.balc_pay .v-card__text {
    border: 1px solid #eee;
    position: relative;
    padding: 16px;
    padding-bottom: 28px
}

.balc_pay .v-dialog {
    border-radius: 30px;
}

.balc_pay .v-card__actions {
    padding: 0
}

.balc_pay_s {
    margin: 0;
    width: 50%;
    height: 50px;
    border-right: 0.5px solid #eee;
    color: #b9b9b9 !important;
    font-size: 16px
}

.balc_pay_cl {
    margin: 0 !important;
    width: 50%;
    border-left: 0.5px solid #eee;
    height: 50px;
    font-size: 16px;

}

.balc_pay_ts {
    text-align: start;
    color: #d0d0d0;
    position: absolute;
    bottom: 4px
}

.balc_pay .input_control {
    padding-left: 0;
    border: 1px solid #eee !important;
    position: relative;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
}

.balc_pay .input_control input {
    font-size: 1.2rem;
    outline: none;
    color: #656565;
    letter-spacing: 2px
}

.balc_pay .input_control input {
    text-align: center;
}
#focusthis{
 width: 100%
}
</style>