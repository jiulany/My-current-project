<template>
    <div>
        <v-container class='plo_'>
            <v-layout wrap>
                <v-flex xs12 class='plo_tt'>
                    凭订单信息到店自提
                </v-flex>
                <!-- 选择订单项目 -->
                <v-flex xs12 style='height: 10px'></v-flex>
                <v-flex xs12 class='plo_it' @click='toStoreList'>
                    <v-layout wrap>
                        <v-flex xs1>
                            <v-img :src="require('../assets/images/icon_ziying.png')" width="15px"> </v-img>
                        </v-flex>
                        <v-flex xs8>{{shopname}}</v-flex>
                        <v-flex xs2>
                            <v-img :src="require('../assets/images/place_order_pin.png')" width='15px'></v-img>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class='plo_it' v-for='(item,i) in seleList'>
                    <v-layout align-center>
                        <v-flex xs3>
                            <v-img style='display: inline-block' :src="'http://tgapi.baodi520.com'+item.pic" width='65px' touchstart></v-img>
                        </v-flex>
                        <v-flex xs9>
                            <v-flex xs12 class='plo_it_1'>{{item.goodsname}}</v-flex>
                            <v-flex xs12 class='plo_it_2'>x1<span>￥{{item.price}}</span></v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- END -->
                <v-flex ref='xclx' xs12 class='plo_it'>洗车类型<span>{{cartype}}<span v-if='add_price'>
                            (SUV+5)</span></span>
                    <select v-model='seleCar' style="position:absolute;right: 27px;opacity: 0">
                        <option v-for='(item,i) in caritems' :value="item.carnum">{{item.carnum}}</option>
                    </select>
                </v-flex>
                <v-flex xs12 class='plo_it'>
                    <v-flex xs12>商品总价</v-flex>
                    <v-flex xs12 class='plo_ttlpri'>￥{{totalPrice}}</v-flex>
                </v-flex>
                <v-flex xs12 class='plo_it'>订单编号<span>{{ordernum}}</span></v-flex>
                <v-flex xs12 class='plo_it'>
                    微信支付
                    <span>
                        <CheckedButton :is_sele='cur_type' @curValue='curValue' label='微信支付'></CheckedButton>
                    </span>
                </v-flex>
                <v-flex xs12 class='plo_it'>
                    余额支付
                    <span>
                        <CheckedButton :is_sele='bal_cur_type' @curValue='curBalValue' label='余额支付'></CheckedButton>
                    </span>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- 去支付 -->
        <v-layout align-center class='settlement'>
            <v-btn class='to_zf' color='#fdd000' @click='toPay'>
                去支付 ￥{{totalPrice}}
            </v-btn>
        </v-layout>
        <BottomSheet :ordernum='ordernum' :sheet_pro='sheet' @emitSheetState='getSheetState' :pay_data='pay_data' :user='user' :pay_type='pay_type' :pay_money='totalPrice'></BottomSheet>
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
            totalPrice: null,
            add_price: false,
            caritems: [],
            seleCar: "",
            cartype: '',
            sheet: false,
            pay_type: '微信支付',
            user: this.$store.getters.getUser,
            cur_type: true,
            bal_cur_type: false,
            ordernum: "",
            pay_data: {},
            cur_car_type: '',
            shopname: ""
        }
    },
    beforeRouteEnter(to, from, next) {
        if (Cookies.get('userStatus') == "1") {
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
        if (localStorage.getItem("seleStore") != "") {
            this.$api.getShopInfo({ id: localStorage.getItem("seleStore") }).then(res => {
                this.shopname = res.data.data.shopname
            })
            this.$api.renderingOrder({ ordernum: localStorage.getItem("ordernum") }).then(res => {
                if (res.data.ret == 200) {
                    this.seleList = res.data.data.goodsid
                    this.caritems = res.data.data.cartype
                    this.cartype = res.data.data.cartype[0].carnum //默认汽车类型
                    this.cur_car_type = res.data.data.cartype[0].cartype
                    this.totalPrice = res.data.data.zongprice
                    this.ordernum = res.data.data.ordernum
                    if (res.data.data.cartype[0].cartype == 1) {
                        this.add_price = false
                    } else {
                        this.add_price = true
                    }
                    // this.$router.push('/window/store/goodsdetails/placeorder/pay')
                } 
            })
        } else {
            this.shopname = "脱狗车宝(浅水半岛店)"
            var a = this.$store.getters.getSeleGoods
            let al = ""
            for (let i in a) {
                if (i == (a.length - 1)) {
                    al += a[i].id
                } else {
                    al += a[i].id + ","
                }
            }
            this.$api.setOrder({
                userid: this.$Cks.get('id'),
                shopid: 1,
                classifyid: 1,
                goodsid: al
            }).then(res => {
                if (res.data.ret == 200) {
                    console.log(res)
                    this.seleList = res.data.data.goodsid
                    this.caritems = res.data.data.cartype
                    this.cartype = res.data.data.cartype[0].carnum //默认汽车类型
                    this.cur_car_type = res.data.data.cartype[0].cartype
                    this.totalPrice = res.data.data.zongprice
                    this.ordernum = res.data.data.ordernum
                    localStorage.setItem("ordernum", res.data.data.ordernum)
                    this.$store.dispatch('addPayDataAc', res)
                    if (res.data.data.cartype[0].cartype == 1) {
                        this.add_price = false
                    } else {
                        this.add_price = true
                    }
                    // this.$router.push('/window/store/goodsdetails/placeorder/pay')
                } else {
                    this.$message.error("请填写车辆信息")
                    this.$router.push("/window/myinfo")
                }
            })
        }

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
            that.$api.updCar({
                cartype: that.cur_car_type, //类型 
                id: that.ordernum, //订单id 
                carid: a.id, //车辆id
                classifyid: 1,
            }).then(res => {
                that.totalPrice = res.data.data.zongprice
                that.cur_car_type = a.cartype
                if (a.cartype == 1) {
                    that.add_price = false
                } else {
                    that.add_price = true
                }
            })
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
        toStoreList() {
            this.$router.push('/window/index/carwash/stores')
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