<template>
    <div>
        <v-img v-if="show_loding" class='load_gif' :src="require('../assets/images/loading.gif')" width=35px></v-img>
        <v-tabs class='ord' active-class='ord_active_it' v-model="active" color="#f2f2f2" light slider-color="#f75c3e" grow>
            <v-tab class='ord_tt' light>
                全部
            </v-tab>
            <v-tab class='ord_tt' light>
                待付款
            </v-tab>
            <v-tab class='ord_tt' light>
                待使用
            </v-tab>
            <v-tab class='ord_tt' light>
                已完成
            </v-tab>
            <!-- 全部订单 -->
            <v-tab-item class='ord_ct'>
                <v-container>
                    <v-layout wrap class='ord_ct_it' v-for='(item,i) in all_order' :key='item.id' @click='toOrderDetails(item)'>
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
                                <v-flex xs12 class='ord_ct_nm'>x{{item.goodsname.length}}</v-flex>
                                <v-flex xs12 class='ord_ct_spacer'></v-flex>
                                <v-flex xs12 class='ord_ct_ms'>({{taoCan(item.goodsname)}})</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_total'>合计：￥{{item.zongprice}}</v-flex>
                        <v-flex xs12 class='ord_ct_btn' v-if='item.type==1?true:false'>
                            <v-btn outline color="#474747" class='ord_ct_btn1' @click.stop='todel(item)'>取消订单</v-btn>
                            <v-btn outline color="#f75c3e" @click.stop='topay(item)'>去付款</v-btn>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_btn' v-if='item.type==2?true:false'>
                            <!-- <v-btn outline color="#f75c3e">确认收货</v-btn> -->
                        </v-flex>
                        <!-- <v-flex xs12 class='ord_ct_btn ord_ct_dd'>
                            <v-layout wrap align-center>
                                <v-flex xs9 class='ord_num'>订单编号：{{item.ordernum}}</v-flex>
                                <v-flex xs3 class='ord_fz'>
                                    <v-btn outline color="black">复制</v-btn>
                                </v-flex>
                                <v-flex xs12 class='ord_add_time'>创建时间：{{item.addtime}}</v-flex>
                                <v-flex xs12 class='ord_upd_time' v-if='item.dealtime'>成交时间：{{item.dealtime}}</v-flex>
                            </v-layout>
                        </v-flex> -->
                    </v-layout>
                </v-container>
            </v-tab-item>
            <!-- 待付款 -->
            <v-tab-item class='ord_ct'>
                <v-container>
                    <v-layout wrap class='ord_ct_it' v-for='(item,i) in wait_order' :key='item.id' @click='toOrderDetails(item)'>
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
                                <v-flex xs12 class='ord_ct_nm'>x{{item.goodsname.length}}</v-flex>
                                <v-flex xs12 class='ord_ct_spacer'></v-flex>
                                <v-flex xs12 class='ord_ct_ms'>({{taoCan(item.goodsname)}})</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_total'>合计：￥{{item.zongprice}}</v-flex>
                        <v-flex xs12 class='ord_ct_btn' v-if='item.type==1?true:false'>
                            <v-btn outline color="#474747" class='ord_ct_btn1' @click.stop='todel(item)'>取消订单</v-btn>
                            <v-btn outline color="#f75c3e" @click.stop='topay(item)'>去付款</v-btn>
                        </v-flex>
                        <!--  <v-flex xs12 class='ord_ct_btn ord_ct_dd'>
                            <v-layout wrap align-center>
                                <v-flex xs9 class='ord_num'>订单编号：{{item.ordernum}}</v-flex>
                                <v-flex xs3 class='ord_fz'>
                                      <v-btn outline color="black">复制</v-btn>
                                </v-flex>
                                <v-flex xs12 class='ord_add_time'>创建时间：{{item.addtime}}</v-flex>
                                <v-flex xs12 class='ord_upd_time' v-if='item.dealtime'>成交时间：{{item.dealtime}}</v-flex>
                            </v-layout>
                        </v-flex> -->
                    </v-layout>
                </v-container>
            </v-tab-item>
            <!-- 待使用 -->
            <v-tab-item class='ord_ct'>
                <v-container>
                    <v-layout wrap class='ord_ct_it' v-for='(item,i) in use_order' :key='item.id' @click='toOrderDetails(item)'>
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
                                <v-flex xs12 class='ord_ct_nm'>x{{item.goodsname.length}}</v-flex>
                                <v-flex xs12 class='ord_ct_spacer'></v-flex>
                                <v-flex xs12 class='ord_ct_ms'>({{taoCan(item.goodsname)}})</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_total'>合计：￥{{item.zongprice}}</v-flex>
                        <v-flex xs12 class='ord_ct_btn' v-if='item.type==2?true:false'>
                            <!-- <v-btn outline color="#f75c3e">确认收货</v-btn> -->
                        </v-flex>
                        <!-- <v-flex xs12 class='ord_ct_btn ord_ct_dd'>
                            <v-layout wrap align-center>
                                <v-flex xs9 class='ord_num'>订单编号：{{item.ordernum}}</v-flex>
                                <v-flex xs3 class='ord_fz'>
                                    <v-btn outline color="black">复制</v-btn>
                                </v-flex>
                                <v-flex xs12 class='ord_add_time'>创建时间：{{item.addtime}}</v-flex>
                                <v-flex xs12 class='ord_upd_time' v-if='item.dealtime'>成交时间：{{item.dealtime}}</v-flex>
                            </v-layout>
                        </v-flex> -->
                    </v-layout>
                </v-container>
            </v-tab-item>
            <!-- 已经完成 -->
            <v-tab-item class='ord_ct'>
                <v-container>
                    <v-layout wrap class='ord_ct_it' v-for='(item,i) in over_order' :key='item.id' @click='toOrderDetails(item)'>
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
                                <v-flex xs12 class='ord_ct_nm'>x{{item.goodsname.length}}</v-flex>
                                <v-flex xs12 class='ord_ct_spacer'></v-flex>
                                <v-flex xs12 class='ord_ct_ms'>({{taoCan(item.goodsname)}})</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class='ord_ct_total'>合计：￥{{item.zongprice}}</v-flex>
                        <!-- <v-flex xs12 class='ord_ct_btn ord_ct_dd'>
                            <v-layout wrap align-center>
                                <v-flex xs9 class='ord_num'>订单编号：{{item.ordernum}}</v-flex>
                                <v-flex xs3 class='ord_fz'>
                                     <v-btn outline color="black">复制</v-btn>
                                </v-flex>
                                <v-flex xs12 class='ord_add_time'>创建时间：{{item.addtime}}</v-flex>
                                <v-flex xs12 class='ord_upd_time' v-if='item.dealtime'>成交时间：{{item.dealtime}}</v-flex>
                            </v-layout>
                        </v-flex> -->
                    </v-layout>
                </v-container>
            </v-tab-item>
        </v-tabs>
        <v-dialog class='pay_type_dai' v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">选择支付方式</v-card-title>
                <v-card-text>
                    <v-radio-group v-model="radioGroup">
                        <v-radio label="微信支付" value="1" color='orange'></v-radio>
                        <v-radio label="余额支付" value="2" color='orange'></v-radio>
                    </v-radio-group>
                    <v-text-field @blur='blurAc' onInput="value=value.replace(/[^\d]/g,'')" v-if='isPayPsw' type="password" v-model="input_value" maxlength='6' label="支付密码" required></v-text-field>
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
        <v-dialog v-model="dialog_0" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">提示</v-card-title>
                <v-card-text>确定要取消订单吗？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="" flat @click="dialog_0=false">取消</v-btn>
                    <v-btn color="#fdcc00" flat @click="toCancel">同意</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import qs from 'qs'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            active: 0,
            tabs: ["全部", "待付款", "待使用", "已完成"],
            all_order: [],
            wait_order: [],
            use_order: [],
            over_order: [],
            dialog: false,
            radioGroup: "1",
            pay_item: {},
            input_value: "",
            isPayPsw: false,
            dialog_0: false,
            itm: {},
            show_loding: false,
            allNum: 0,
            waitNum: 0,
            useNum: 0,
            overNum: 0,
        }
    },
    created() {
        this.show_loding = true
        switch (this.$route.params.wz) {
            case "0":
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 0 }).then(res => {
                    this.show_loding = false
                    this.all_order = res.data.data
                    this.allNum=1
                })
                break;
            case "1":
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 1 }).then(res => {
                    this.show_loding = false
                    this.wait_order = res.data.data
                    this.waitNum=1
                })
                break;
            case "2":
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 2 }).then(res => {
                    this.show_loding = false
                    this.use_order = res.data.data
                    this.useNum=1
                })
                break;
            case "3":
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 3 }).then(res => {
                    this.show_loding = false
                    this.over_order = res.data.data
                    this.overNum=1
                })
                break;
        }
    },
    methods: {
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
        toOrderDetails(item) { //前往订单详情
            this.$store.dispatch("addOrderDetailsAc", item)
            this.$router.push(`/window/myinfo/${item.type}/orderdetail`)
        },
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
        blurAc() {
            document.body.scrollTop = 0
        },
        topay(itm) {
            this.dialog = true
            this.pay_item = itm
        },
        toPaythen() {
            var itm = this.pay_item
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
                                that.$api.getOrder({ userid: this.$Cks.get('id'), type: 0 }).then(res => {
                                    that.all_order = res.data.data
                                })
                                that.$api.getOrder({ userid: this.$Cks.get('id'), type: 1 }).then(res => {
                                    that.wait_order = res.data.data
                                })
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
                        that.$api.getOrder({ userid: this.$Cks.get('id'), type: 0 }).then(res => {
                            that.all_order = res.data.data
                        })
                        that.$api.getOrder({ userid: this.$Cks.get('id'), type: 1 }).then(res => {
                            that.wait_order = res.data.data
                        })
                    } else {}
                })
            }
        },
        todel(itm) {
            this.dialog_0 = true
            this.itm = itm
        },
        toCancel() {
            var itm = this.itm
            this.$api.delOrder({ ordernum: itm.ordernum }).then(res => {
                this.$message.success("删除成功")
                this.dialog_0 = false
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 1 }).then(res => {
                    this.wait_order = res.data.data
                })
                this.$api.getOrder({ userid: this.$Cks.get('id'), type: 0 }).then(res => {
                    this.all_order = res.data.data
                })
            })
        }
    },
    watch: {
        radioGroup(val) {
            if (val == "1") {
                this.isPayPsw = false
            }
            if (val == "2") {
                this.isPayPsw = true
            }
        },
        active(val) {
            switch (val) {
                case 0:
                    if (this.allNum == 0) {
                        this.show_loding = true
                        this.$api.getOrder({ userid: this.$Cks.get('id'), type: 0 }).then(res => {
                            this.show_loding = false
                            this.all_order = res.data.data
                            this.allNum = 1
                        })
                    }
                    break;
                case 1:
                    if (this.waitNum == 0) {
                        this.show_loding = true
                        this.$api.getOrder({ userid: this.$Cks.get('id'), type: 1 }).then(res => {
                            this.show_loding = false
                            this.wait_order = res.data.data
                            this.waitNum = 1
                        })
                    }
                    break;
                case 2:
                    if (this.useNum == 0) {
                        this.show_loding = true
                        this.$api.getOrder({ userid: this.$Cks.get('id'), type: 2 }).then(res => {
                            this.show_loding = false
                            this.use_order = res.data.data
                            this.useNum =1
                        })
                    }
                    break;
                case 3:
                    if (this.overNum == 0) {
                        this.show_loding = true
                        this.$api.getOrder({ userid: this.$Cks.get('id'), type: 3 }).then(res => {
                            this.show_loding = false
                            this.over_order = res.data.data
                            this.overNum = 1
                        })
                    }
                    break;
            }
        }
    },
    mounted() {
        this.active = parseInt(this.$route.params.wz)
    }
}
</script>
<style>
.ord {
    height: 100%
}

.ord .v-window {
    height: 93.47777%;
    overflow-y: scroll;
}

.icon_head {
    position: relative;
    top: 4px
}
.ord_ct_tt {
    padding-bottom: 10px;
}
.ord_ct{
    min-height: 1366px
}
.ord_ct_tt .flex {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.ord_ct_it {
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 10px;
    margin-bottom: 10px
}

.ord_ct_stt {
    text-align: end;
    color: #f75c3e
}


.ord_ct_tc span {
    float: right;
}

.ord_ct_nm {
    text-align: right;
    color: #959595;
    position: relative;
    bottom: 3px
}

.ord_ct_spacer {
    height: 5px
}

.ord_ct_ms {
    color: #959595;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-size: 11px
}

.ord_ct_total {
    text-align: end;
    font-size: 15px
}

.ord_ct_btn {
    text-align: end;
    margin-top: 10px
}

.ord_ct_dd {
    margin-top: 22px;
    font-size: 12px
}

.ord_ct_btn button {
    margin: 0;
    height: 28px;
    border-radius: 0;
    width: 86px;
    font-weight: 600;
    font-size: 12px;
}

.ord_ct_btn1 {
    margin-right: 10px !important
}

.ord_num {
    text-align: start
}

.ord_add_time {
    text-align: start;
    margin-bottom: 5px
}

.ord_upd_time {
    text-align: start
}

.ord_fz button {
    height: 24px;
}

.pay_type_dai .v-card__text {
    padding: 0 16px
}

.load_gif {
    position: fixed;
    top: 50%;
    z-index: 999;
    left: 47%
}
</style>