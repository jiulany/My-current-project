<template>
    <div>
        <v-container class='plo_'>
            <v-layout wrap>
                <v-flex xs12 class='plo_tt'>
                    凭订单信息到店自提
                </v-flex>
                <!-- 选择订单项目 -->
                <v-flex xs12 style='height: 10px'></v-flex>
                <v-flex xs12 class='plo_it'>
                    <v-layout align-center>
                        <v-flex xs3>
                            <v-img style='display: inline-block' :src="require('../assets/images/car_ws_hd.png')" width='65px' touchstart></v-img>
                        </v-flex>
                        <v-flex xs9>
                            <v-flex xs12 class='plo_it_1'>{{seleList.goodsname}}</v-flex>
                            <v-flex xs12 class='plo_it_2'>x{{goodsnum}}<span>￥{{seleList.zongprice}}</span></v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- END -->
                <v-flex xs12 class='plo_it'>
                    <v-flex xs12>商品总价</v-flex>
                    <v-flex xs12 class='plo_ttlpri'>￥{{seleList.zongprice}}</v-flex>
                </v-flex>
                <v-flex xs12 class='plo_it'>订单编号<span>{{seleList.ordernum}}</span></v-flex>
                <v-flex xs12 class='plo_it'>微信支付
                    <span>
                        <CheckedButton :is_sele='cur_type' @curValue='curValue' label='微信支付'></CheckedButton>
                    </span>
                </v-flex>
                <v-flex xs12 class='plo_it'>余额支付
                    <span>
                        <CheckedButton :is_sele='bal_cur_type' @curValue='curBalValue' label='余额支付'></CheckedButton>
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- 去支付 -->
        <v-layout align-center class='settlement'>
            <v-btn class='to_zf' color='#fdd000' @click='toPay'>
                去支付 ￥{{seleList.zongprice}}
            </v-btn>
        </v-layout>
        <BottomSheet :ordernum='ordernum' :sheet_pro='sheet' @emitSheetState='getSheetState' :pay_data='pay_data' :user='user' :pay_type='pay_type' :pay_money='seleList.zongprice'></BottomSheet>
    </div>
</template>
<script>
import qs from 'qs'
import CheckedButton from '../components/CheckedButton.vue'
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            seleList: [], //this.$store.getters.getSeleGoods
            sheet: false,
            pay_type: '微信支付',
            user: this.$store.getters.getUser,
            cur_type: true,
            bal_cur_type:false,
            ordernum: "",
            pay_data: {},
            goodsnum: ""
        }
    },
    beforeRouteEnter(to, from, next) {
        if ( Cookies.get('userStatus') == "1") {
            next()
        } else {
            if (confirm("未登录,是否跳转至登录页面")) {
                next('/')
            } else {
                next(false)
            }
        }
    },
    created() {
        var a = this.$store.getters.getSeleGoods
        let al = ""
        for (let i in a) {
            if (i == (a.length - 1)) {
                al += a[i].id
            } else {
                al += a[i].id + ","
            }
        }
        this.goodsnum = a[0].goodsnum
        this.$api.storeOrder({
            userid: this.$Cks.get('id'),
            shopid: a[0].shopid,
            classifyid: a[0].classifyid,
            classifsyid: a[0].classifysid,
            goodsid: a[0].id,
            goodsnum: a[0].goodsnum
        }).then(res => {
            if (res.data.ret == 200) {
                this.seleList = res.data.data
                this.ordernum = res.data.data.ordernum
                this.$store.dispatch('addPayDataAc', res)
                // this.$router.push('/window/store/goodsdetails/placeorder/pay')
            } else {
                alert("请填写商品数量")
                this.$router.push("/window/store/goodsdetails")
            }
        })
    },
    watch: {
        seleCar(value) {
            var that = this
            that.cartype = value
            let a = {}
            for (let i in that.caritems) {
                if (value == that.caritems[i].carnum) {
                    a = that.caritems[i]
                    break
                }
            }
            console.log(that.cur_car_type, that.ordernum, a.id)
            // that.$api.updCar({
            //     cartype: that.cur_car_type, //类型 
            //     id: that.ordernum, //订单id 
            //     carid: a.id //车辆id
            // }).then(res => {
            //     console.log(res.data.data.zongprice)
            //     that.totalPrice = res.data.data.zongprice
            //     that.cur_car_type = a.cartype
            // })
        }
    },
    components: {
        CheckedButton,
        BottomSheet: resolve => { require(["../components/BottomSheet.vue"], resolve) }
    },
    methods: {
        toPay() {
            this.sheet = true

            var that = this
            // let a = []
            // for (let i in this.seleList) {
            //     a.push(this.seleList[i].id)
            // }
            // this.$api.setOrder({
            //     userid: localStorage.getItem("id"),
            //     shopid: 1,
            //     classifyid: 1,
            //     goodsid: 18
            // }).then(res => {
            //     if (res.status == 200) {
            //         this.$store.dispatch('addPayDataAc', res)
            //         this.$router.push('/window/store/goodsdetails/placeorder/pay')
            //         console.log(this.$store.state.payData)
            //     }

            // })
            this.$api.jsapi({ ordernum: that.ordernum }).then(res => {
                console.log(res.data)
                this.pay_data = res.data
            }).catch(res => {
                reject(res)
            })
        },
        getSheetState(val) {
            this.sheet = val
        },
        curValue(val) {
            this.cur_type = "true"
            if (val.cur == true) {
                this.pay_type = val.label
                this.bal_cur_type = false
            } else {
                this.pay_type = '未选择'
            }
        },
        curBalValue(val) {
            this.bal_cur_type = "true"
            if (val.cur == true) {
                this.pay_type = val.label
                this.cur_type = false
            } else {
                this.pay_type = '未选择'
            }

        }
    }
}
</script>
<style>
.plo_ {
    padding-bottom: 100px
}

.plo_tt {
    background: #fdd000;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    padding: 20px 0
}

.plo_it {
    padding: 15px 10px;
    padding-top: 15px;
    border-bottom: 1px solid #e2e2e2
}

.plo_it span {
    float: right;
}

.plo_it span span {
    color: #f75c3e;
    font-weight: 800
}

.plo_it_1 {
    overflow-y: hidden;
    white-space: normal;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 12px;
    line-height: 16px;
    height: 32px
}

.plo_it_2 {
    color: #9c9c9c;
    font-size: 16px;

}

.plo_it_2 span {
    color: #f75c3e;
    float: right;
    font-weight: 800
}

.plo_ttlpri {
    text-align: end;
    color: #f75c3e;
    font-weight: 800;
    font-size: 20px
}

.settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -1px 2px #e6e6e6;
    background: white
}

.to_zf {
    margin: 0;
    width: 100%;
    color: #f75c3e;
    height: 50px;
    font-weight: 500;
    font-size: 16px
}
</style>