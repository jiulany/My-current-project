<template>
    <v-container class='reg'>
        <v-layout wrap>
            <v-flex xs12>
                <v-img :src="require('../assets/images/recharge_hd.png')" width='100%'>
                </v-img>
            </v-flex>
            <v-flex xs12>
                <v-container class='reg_cot'>
                    <v-layout wrap>
                        <v-flex xs12 class='reg_moy_tt'>请选择充值金额</v-flex>
                        <v-flex xs12 class='reg_moy reg_moy_1'>
                            <v-layout wrap>
                                <v-flex xs4 v-for='(item,i) in items' :key='item.id'>
                                    <v-btn v-ripple=false :outline='item.reg_act' depressed color='#fdd000' @click='clickRec(item,i)'>
                                        <v-layout wrap>
                                            <v-flex xs12>{{item.condition}}</v-flex>
                                            <v-flex xs12 class='reg_add' v-if="item.discount!='0.00'">送{{item.discount}}元</v-flex>
                                        </v-layout>
                                    </v-btn>
                                </v-flex>
                                <!--<v-flex xs4>
                                    <v-btn v-ripple=false :outline='reg_act==2?false:true' depressed color='#fdd000' @click='clickRec("20")'>20元</v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn v-ripple=false :outline='reg_act==3?false:true' depressed color='#fdd000' @click='clickRec("30")'>
                                        <v-layout wrap>
                                            <v-flex xs12>30元</v-flex>
                                            <v-flex xs12 class='reg_add'>送5元</v-flex>
                                        </v-layout>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn v-ripple=false :outline='reg_act==4?false:true' depressed color='#fdd000' @click='clickRec("50")'>
                                        <v-layout wrap>
                                            <v-flex xs12>50元</v-flex>
                                            <v-flex xs12 class='reg_add'>送5元</v-flex>
                                        </v-layout>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn v-ripple=false :outline='reg_act==5?false:true' depressed color='#fdd000' @click='clickRec("100")'>
                                        <v-layout wrap>
                                            <v-flex xs12>100元</v-flex>
                                            <v-flex xs12 class='reg_add'>送5元</v-flex>
                                        </v-layout>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn v-ripple=false :outline='reg_act==6?false:true' depressed color='#fdd000' @click='clickRec("1000")'>
                                        <v-layout wrap>
                                            <v-flex xs12>1000元</v-flex>
                                            <v-flex xs12 class='reg_add'>送5元</v-flex>
                                        </v-layout>
                                    </v-btn>
                                </v-flex> -->
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class='reg_els_tt'>其他金额</v-flex>
                        <v-flex xs12 class='reg_els'>
                            <v-text-field :color="inp_val==true?'rgba(0,0,0,.87)':'#ff5252'" label="请输入10元的倍数" maxlength='10' type='idcard' pattern="[0-9]*" @blur='elimi' required @input='inp'></v-text-field>
                        </v-flex>
                        <v-flex xs12 class='reg_btn'>
                            <v-btn color='#fdd000' depressed :ripple="{ class: 'orange--text' }" @click='reCharge'>立即充值</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <div class="text-xs-center reg">
            <v-bottom-sheet v-model="sheet">
                <v-list>
                    <v-subheader class='reg_tt'>确认付款<v-icon class="reg_clear" @click='closeSheet'>clear</v-icon>
                    </v-subheader>
                    <v-list-tile class='reg_tt_it'>
                        <v-list-tile-title>账号：{{user}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile class='reg_tt_it'>
                        <v-list-tile-title style='width:420px'>付款方式：微信支付</v-list-tile-title>
                        <v-list-tile-title>付款金额：{{recharge_moy}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile class='reg_zf'>
                        <v-btn color='#fdd000' @click='toPay'>立即付款</v-btn>
                    </v-list-tile>
                </v-list>
            </v-bottom-sheet>
        </div>
    </v-container>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            reg_act: 1,
            inp_val: true,
            items: [],
            pre_moy: null,
            sele_id: "",
            sheet: false,
            recharge_moy: "",
            user: "",
            flownum: "",
            payType: null,
        }
    },
    created() {
        this.$api.getRechargeType().then((res) => {
            console.log(res)
            this.items = res.data.data
            for (let i in this.items) {
                this.items[i].reg_act = true
            }
        })
        this.$api.updUser({ id: this.$Cks.get('id') }).then(res => {
            this.user = res.data.data.phone
        }).catch(res => {})
    },
    methods: {
        clickRec(val, ix) {
            if (this.pre_moy != null) {
                let a = this.items[this.pre_moy]
                a.reg_act = true
                this.$set(this.items, this.pre_moy, a)
            }
            val.reg_act = false
            this.$set(this.items, ix, val)
            this.pre_moy = ix

            this.sele_id = val.id //选择充值类型id
            this.recharge_moy = val.condition
            this.payType = 1
        },
        inp(val) {
            if ((val % 10) != 0) {
                this.inp_val = false
            } else {
                this.inp_val = true
                this.recharge_moy = val
                this.payType = 2
            }

        },
        elimi() {
            window.scroll(0, 0)
        },
        reCharge() {
            this.sheet = true
            if (this.payType == 1) {
                this.$api.addRechargeFlow({
                    userId: this.$Cks.get('id'),
                    id: this.sele_id
                }).then(res => {
                    this.flownum = res.data.data.flownum
                })
            }
            if (this.payType == 2) {
                this.$api.addRechargeFlow({
                    userId: this.$Cks.get('id'),
                    condition: this.recharge_moy
                }).then(res => {
                    this.flownum = res.data.data.flownum
                })
            }

        },
        closeSheet() {
            this.sheet = false
        },
        toPay() {
            var that = this
            this.$api.jsapi({ flownum: that.flownum }).then(res => {
                var a = JSON.parse(res.data)
                console.log(a)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: a.appId, // 必填，公众号的唯一标识
                    timestamp: a.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: a.nonceStr, // 必填，生成签名的随机串
                    paySign: a.paySign, // 必填，签名
                    jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
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
                            that.sheet = false
                            let b = setTimeout(() => {
                                that.$router.push('/window/myinfo')
                                clearTimeout(b)
                            }, 700)
                        },
                        cancel: function(res) {
                            that.$message.warning("用户取消支付")
                            that.sheet = false
                        },
                        fail: function(res) {
                            that.$message.error("支付失败")
                            that.sheet = false
                        }
                    });
                });
            })
        }
    }
}
</script>
<style>
.reg {
    padding: 0;
    font-size: 16px
}

.reg_moy_tt {
    margin-bottom: 18px
}

.reg_moy .xs4 {
    text-align: center;
    margin-bottom: 10px
}

.reg_moy .xs4 button {
    border-radius: 0;
    margin: 0;
    width: 90%;
    height: 40px;
    font-size: 17px
}

.reg_add {
    font-size: 10px;
    color: #f75c3e;
    position: relative;
    bottom: 2px
}

.reg_moy_1 {
    margin-bottom: 10px
}

.reg_els .v-label {
    font-size: 14px !important;
}

.reg_els_tt {
    margin-bottom: 1px;
}

.reg_btn {
    margin-top: 10px
}

.reg_btn button {
    margin: 0;
    width: 100%;
    height: 42px;
    font-size: 17 px
}

.reg_tt {
    display: inline-block;
    line-height: 40px;
    width: 100%;
    font-size: 18px;
    position: relative;
    border-bottom: 1px solid #f9f9f9
}

.reg_clear {
    position: absolute !important;
    display: inline-block;
    right: 20px;
    top: 8px;
    width: 20px;
}

.reg .v-list {
    padding-bottom: 0
}

.reg_zf {
    padding: 0
}

.reg_tt_it .v-list__tile {
    padding: 36px 16px
}

.reg_zf .v-list__tile {
    padding: 0
}

.reg_zf button {
    width: 100%;
    margin: 0;
    height: 100%;
}
</style>