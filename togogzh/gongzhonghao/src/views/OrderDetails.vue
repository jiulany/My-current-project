<template>
    <div class="ordtl">
        <v-layout class='ordtl_tt'>
            <v-flex>订单详情</v-flex>
        </v-layout>
        <v-container>
            <v-layout wrap class='ord_ct_itd'>
                <v-flex xs12 class='ord_ct_tt'>
                    <v-layout align-center>
                        <v-flex xs1>
                            <v-img class='icon_head' style='display: inline-block' :src="require('../assets/images/icon_ziying.png')" width='15px' height='15px'></v-img>
                        </v-flex>
                        <v-flex xs8>
                            {{item.shopname}}
                        </v-flex>
                        <v-flex xs3 class='ord_ct_stt'>{{pandType(item.type)}}</v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs3>
                    <v-img style='display: inline-block' :src="require('../assets/images/car_ws_hd.png')" width='65px' height='65px'></v-img>
                </v-flex>
                <v-flex xs9>
                    <v-layout wrap>
                        <v-flex xs12 class='ord_ct_tc'>
                            {{item.goodsname[0]}}<span>￥{{item.zongprice}}</span>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_nm'>x1</v-flex>
                        <v-flex xs12 class='ord_ct_spacer'></v-flex>
                        <v-flex xs12 class='ord_ct_ms'>({{taoCan(item.goodsname)}})</v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class='ord_ct_total'><span class="ord_ct_total_t">实付款</span>￥{{item.zongprice}}</v-flex>
                <v-flex xs12 class='ord_ct_btn' v-if='item.type==1?true:false'>
                    <v-btn outline color="#474747" class='ord_ct_btn1' @click.stop='todel(item)'>取消订单</v-btn>
                    <v-btn outline color="#f75c3e" @click.stop='topay(item)'>去付款</v-btn>
                </v-flex>
                <v-flex xs12 class='ord_ct_btn' v-if='item.type==2?true:false'>
                    <!-- <v-btn outline color="#f75c3e">确认收货</v-btn> -->
                </v-flex>
                <v-flex xs12 class='line_fg'>
                </v-flex>
                <v-flex xs12 class='ord_ct_btn ord_ct_dd'>
                    <v-layout wrap align-center>
                        <v-flex xs9 class='ord_num'>订单编号：<span id='fztarget'>{{item.ordernum}}</span></v-flex>
                        <v-flex xs3 class='ord_fz'>
                            <v-btn outline color="black" class='fzbtn' data-clipboard-target="#fztarget" @click='fznum'>复制</v-btn>
                        </v-flex>
                        <v-flex xs12 class='ord_add_time ord_num'>创建时间：{{item.addtime}}</v-flex>
                        <v-flex xs12 class='ord_upd_time ord_num'>成交时间：{{item.dealtime}}</v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-dialog class='pay_type_dai' v-model="dialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">选择支付方式</v-card-title>
                    <v-card-text>
                        <v-radio-group v-model="radioGroup">
                            <v-radio label="微信支付" value="1" color='orange'></v-radio>
                            <v-radio label="余额支付" value="2" color='orange'></v-radio>
                        </v-radio-group>
                        <v-text-field @blur='blurAc' v-if='isPayPsw' type="password" v-model="input_value" maxlength='6' label="支付密码" required></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-1" flat="flat" @click="dialog = false">
                            取消
                        </v-btn>
                        <v-btn color="orange " flat="flat" dark @click="toPaythen">
                            确认
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
import qs from 'qs'
import wx from 'weixin-js-sdk'
import ClipboardJS from 'clipboard' //复制插件
export default {
    data() {
        return {
            item: {},
            dialog: false,
            input_value: "",
            isPayPsw: false,
            radioGroup: "1",
        }
    },
    created() {
        this.item = this.$store.getters.getOrderDetails
    },
    mounted() {
        new ClipboardJS('.fzbtn')
    },
    methods: {
        taoCan(val) {
            let p = ""
            if (val == undefined) {
                return "套餐包含：无"
            } else {
                for (let i in val) {
                    if (i == (val.length - 1)) {
                        p += val[i]
                    } else {
                        p += val[i] + ","
                    }
                }
                return "套餐包含：" + p + "..."
            }
        },
        pandType(val) {
            if (val == 1) {
                return "等待付款"
            }
            if (val == 2) {
                return "等待使用"
            }
            if (val == 3) {
                return "已完成"
            }
        },
        todel(itm) {
            if (confirm("确认取消订单吗")) {
                this.$api.delOrder({ ordernum: itm.ordernum }).then(res => {
                    this.$message.success("删除成功")
                    this.$router.go(-1)
                })
            } else {}
        },
        topay(itm) {
            this.dialog = true
        },
        blurAc() {
            document.body.scrollTop = 0
        },
        fznum() {
            this.$message.success("复制成功")
        },
        toPaythen() {
            var itm = this.item
            if (this.radioGroup == "1") {
                var that = this
                this.$api.jsapi({ ordernum: itm.ordernum }).then(res => {
                    var a = JSON.parse(res.data)
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
                                that.dialog = false
                                that.input_value = ''
                                that.$router.go(-1)
                            },
                            cancel: function(res) {
                                that.$message.warning("用户取消支付")
                                that.dialog = false
                                that.input_value = ''
                            },
                            fail: function(res) {
                                that.$message.error("支付失败")
                                that.dialog = false
                                that.input_value = ''
                            }
                        });
                    });
                }).catch(res => {
                    reject(res)
                })
            }
            if (this.radioGroup == "2") {
                this.$api.Validate({
                    id: this.$Cks.get('id'),
                    paypwd: this.input_value,
                    ordernum: itm.ordernum
                }).then(res => {
                    if (res.data.ret == 428) {
                        this.$message.error("余额不足，请前往充值")
                        this.input_value = ''
                        this.dialog = false
                    } else if (res.data.ret == 429) {
                        this.$message.error("输入支付密码错误，请重新输入")
                        this.input_value = ''
                    } else if (res.data.ret == 200) {
                        this.$message.success("支付成功")
                        this.dialog = false
                        this.input_value = ''
                        this.$router.go(-1)
                    } else {}
                })
            }
        },
    },
    watch: {
        radioGroup(val) {
            if (val == "1") {
                this.isPayPsw = false
            }
            if (val == "2") {
                this.isPayPsw = true
            }
        }
    }
}
</script>
<style>
.ordtl .ordtl_tt {
    padding: 16px;
    text-align: center;
    font-size: 16px;
    box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .19);
    background: #eee
}

.ordtl .line_fg {
    height: 1px;
    background: #eee;
    margin-top: 15px
}

.ordtl .ord_ct_itd {
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.ordtl .ord_ct_dd {
    margin-top: 20px
}

.ordtl .ord_num {
    margin-bottom: 3px
}

.ord_ct_total_t {
    float: left;
    color: #000
}

.ordtl .ord_ct_total {
    color: #f75c3e
}
</style>