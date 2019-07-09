<template>
    <v-container class='my_info'>
        <v-layout wrap>
            <v-flex xs12 class='my_inf_mong'>
                <v-img :src="require('../assets/images/my_inf_mong.png')"></v-img>
            </v-flex>
            <v-container class='my_main'>
                <!-- 个人信息 -->
                <v-layout wrap class='my_main_ly'>
                    <v-flex xs12>
                        <v-layout class='my_hd_ly'>
                            <v-flex xs4>
                                <v-img class='my_hd_pt' :src="require('../assets/images/my_head.png')"></v-img>
                            </v-flex>
                            <v-flex xs8 class='my_hd_nm'>
                                <v-flex xs12>{{user_name}}</v-flex>
                                <div class="my_hd_nm_srm">
                                    <router-link :to="{ name: 'personal', params: { user_nike: user_nike,user_phone:user_phone }}">个人信息 ></router-link>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- 代付款 待使用... -->
                    <v-flex xs12>
                        <v-bottom-nav style='box-shadow: none' :value="true" color="white">
                            <v-btn class='my_pay_btn' :ripple="false" color="#fdd000" flat value="pay" @click='toOrderWait'>
                                <span>待付款</span>
                                <v-img :src="require('../assets/images/mywait_pay.png')" width='23px'></v-img>
                                <span class="my_badge" v-if='wait_num'>{{wait_ck_num[1]}}</span>
                            </v-btn>
                            <v-btn class='my_pay_btn' :ripple="false" color="#19dee4" flat value="use" @click='toOrderUse'>
                                <span>待使用</span>
                                <v-img :src="require('../assets/images/mywait_use.png')" width='27px'></v-img>
                                <span class="my_badge my_badge_cl" v-if='use_num'>{{wait_ck_num[2]}}</span>
                            </v-btn>
                            <v-btn class='my_pay_btn' :ripple="false" color="#fd7254" flat value="my" @click='toOrderOver'>
                                <span>已完成</span>
                                <v-img :src="require('../assets/images/my_comple.png')" width='25px'></v-img>
                            </v-btn>
                            <v-btn class='my_pay_btn' :ripple="false" color="#3eb3ff" flat value="order" @click='toOrderALL'>
                                <span>全部订单</span>
                                <v-img :src="require('../assets/images/myall_order.png')" width='25px'></v-img>
                            </v-btn>
                        </v-bottom-nav>
                    </v-flex>
                    <v-flex xs12 class='my_itm'>
                        <v-expansion-panel v-model="panel" expand>
                            <v-expansion-panel-content>
                                <template v-slot:header>
                                    <div>我的资产</div>
                                </template>
                                <v-card>
                                    <v-card-text class="my_itm_zc">
                                        <!-- <div class="my_itm_zcn" @click='toRedPag'>
                                            <v-layout wrap>
                                                <v-flex xs12>
                                                    <img src="../assets/images/myred_pag.png" width='24px'></img>
                                                </v-flex>
                                                <v-flex xs12>
                                                    红包
                                                </v-flex>
                                                <v-flex xs12 class='my_red_ms'>
                                                    7个未使用
                                                </v-flex>
                                            </v-layout>
                                        </div> -->
                                        <div class="my_itm_zcn" @click='toMyWallet'>
                                            <v-layout wrap>
                                                <v-flex xs12>
                                                    <img src="../assets/images/mymoney_pag.png" width='25px'></img>
                                                </v-flex>
                                                <v-flex xs12>
                                                    余额
                                                </v-flex>
                                                <v-flex xs12 class='my_red_ms'>
                                                    ￥{{moy}}
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div class="my_itm_zcn" @click='toRecharge'>
                                            <v-layout wrap>
                                                <v-flex xs12>
                                                    <img src="../assets/images/myrecharge_pag.png" width='25px'></img>
                                                </v-flex>
                                                <v-flex xs12>
                                                    充值
                                                </v-flex>
                                                <v-flex xs12 class='my_red_ms'>
                                                    充100送10
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div class="my_itm_zcn">
                                            <v-layout wrap>
                                                <v-flex xs12>
                                                    <img src="../assets/images/myintegral_pag.png" width='25px'></img>
                                                </v-flex>
                                                <v-flex xs12>
                                                    积分
                                                </v-flex>
                                                <v-flex xs12 class='my_red_ms'>
                                                    {{jf}}&nbsp;积分
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <template v-slot:header>
                                    <div>我的爱车</div>
                                </template>
                                <v-card>
                                    <v-card-text class="my_itm_car">
                                        <v-layout v-for='(item,i) in mycar_list ' :key='item.id' @click='toMyCar(item)'>
                                            <v-flex xs5>车牌号：<span class="my_itm_car_mg">{{item.carnum}}</span></v-flex>
                                            <v-flex xs3>颜色：<span class="my_itm_car_mg">{{item.colorname}}</span></v-flex>
                                            <v-flex xs4>型号：<span class="my_itm_car_mg">{{item.cartypename}}</span></v-flex>
                                        </v-layout>
                                        <v-layout wrap align-center class='addCar'>
                                            <v-flex xs12>
                                                <v-btn style='width: 87%' depressed dark color="#fdcc00" @click='dialog = !false'>
                                                    <v-icon>add</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                            <!-- <v-expansion-panel-content>
                                <template v-slot:header>
                                    <div>我的邀请码</div>
                                </template>
                                <v-card>
                                    <v-card-text class="my_itm_cd">
                                        <v-layout wrap>
                                            <v-flex xs12 class='my_itm_cd_nm'>121332234213</v-flex>
                                            <v-flex xs12 class='my_itm_cd_mg'>邀请好友得20元洗车红包！</v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content> -->
                            <v-expansion-panel-content expand-icon readonly class="my_abt" @click.native='toAboutWe'>
                                <template v-slot:header>
                                    <v-layout wrap align-center>
                                        <v-flex xs3>关于我们</v-flex>
                                        <v-flex xs9 class="my_abt_bt">
                                            <v-icon>keyboard_arrow_right</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </template>
                                <v-card>
                                    <v-card-text class="my_itm_car">
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
        <!-- 添加车辆信息 -->
        <v-dialog class='add_car_v' v-model="dialog" fullscreen>
            <v-card>
                <v-card-title class='add_car_v_tt'>
                    <span class="headline">添加车辆信息</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field @focus='focusAdd' v-model='inp_code' :color="inp_code_cor?'#fed000':'#ff5252'" label="车牌信息" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select color="#fed000" @click.native.once='getCarColor' v-model='sele_color' :items="car_color" item-value='id' item-text='colorname' label="车辆颜色" required>
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select color="#fed000" v-model='sele_car_type' item-value='id' item-text='car' :items="[{car:'SUV',id:'2'},{car:'小轿车',id:'1'}]" label="车辆类型" required></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*请输入正确信息</small>
                </v-card-text>
                <v-card-actions class='add_car_v_btn'>
                    <v-btn color="#fed000" dark depressed @click="closeDialog">关闭</v-btn>
                    <v-btn color="#fed000" dark depressed @click="addCar">保存</v-btn>
                </v-card-actions>
                <KeyBoard :isShow='show_key_board' @curValueEv='curValueEv' @delkb='delCarCode' :propcph='propcph' @curAct='curAct'></KeyBoard>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import KeyBoard from '../components/keyBoard.vue'
import Cookies from 'js-cookie'
export default {
    components: {
        KeyBoard
    },
    data() {
        return {
            panel: [true, true, false],
            user_name: "",
            user_id: "",
            user_nike: "",
            user_phone: "",
            mycar_list: [],
            dialog: false,
            inp_code_cor: false,
            car_color: ["加载中..."],
            sele_color: "",
            sele_car_type: "",
            inp_code: "",
            moy: "",
            jf: "",
            show_key_board: false,
            propcph: [],
            wait_num: false,
            use_num: false,
            wait_ck_num: {}
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

        this.$api.updUser({ id: this.$Cks.get('id') }).then(res => {
            if (res.data.data.username == '') {
                this.user_name = res.data.data.phone
            } else {
                this.user_name = res.data.data.username
            }
            this.user_nike = res.data.data.username
            this.user_id = res.data.data.id
            this.user_phone = res.data.data.phone
            localStorage.setItem("user_phone", res.data.data.phone)
        }).catch(res => {})


        this.$api.userCar({ userid: this.$Cks.get('id') }).then(res => {
            this.mycar_list = res.data.data
        }).catch(res => {})


        this.$api.getBalance({ userId: this.$Cks.get('id') }).then(res => {
            this.moy = res.data.data.balance
            this.jf = res.data.data.points
        })

        this.$api.getNewNum({
            userid: this.$Cks.get('id')
        }).then(res => {

            if (res.data.data[1] == 0) {
                this.wait_num = false
            } else {
                this.wait_num = true
            }
            if (res.data.data[2] == 0) {
                this.use_num = false
            } else {
                this.use_num = true
            }
            this.wait_ck_num = res.data.data
        })
    },
    methods: {
        // 我的订单跳转
        toOrderWait() {
            this.$router.push('/window/myinfo/orderwait/1')
        },
        toOrderUse() {
            this.$router.push('/window/myinfo/orderuse/2')
        },
        toOrderOver() {
            this.$router.push('/window/myinfo/orderover/3')
        },
        toOrderALL() {
            this.$router.push('/window/myinfo/orderall/0')
        },
        // 
        toRedPag() {
            this.$router.push('/window/myinfo/allredpag')
        },
        toMyCar(item) {
            localStorage.setItem("carnum", item.carnum)
            localStorage.setItem("colorname", item.colorname)
            localStorage.setItem("colorid", item.colorid)
            localStorage.setItem("cartypename", item.cartypename)
            localStorage.setItem("cartype", item.cartype)
            localStorage.setItem("carid", item.id)
            this.$router.push('/window/myinfo/mycar')
        },
        toMyWallet() {
            this.$router.push('/window/myinfo/mywallet')
        },
        toRecharge() {
            this.$router.push('/window/myinfo/allredpag/recharge')
        },
        toAboutWe() {
            this.$router.push('/window/myinfo/aboutus')
        },
        closeDialog() {
            this.dialog = false
            this.show_key_board = false
            this.inp_code = ''
        },
        getCarColor() { //获取车辆颜色表
            this.$api.getCarColor().then(res => {
                this.car_color = res.data.data
            })
        },
        focusAdd() {
            document.activeElement.blur()
            this.show_key_board = !this.show_key_board
        },
        addCar() {
            if (this.inp_code_cor) {
                this.$api.addCar({
                    carnum: this.inp_code, //车牌
                    userid: this.$Cks.get('id'), //用户id
                    colorid: this.sele_color, //颜色id
                    cartype: this.sele_car_type //车辆类型
                }).then(res => {
                    this.sele_color = ""
                    this.sele_car_type = ""
                    this.inp_code = ""
                    this.dialog = false
                    this.$message.success("添加成功")
                    this.$api.userCar({ userid: this.$Cks.get('id') }).then(res => {
                        this.mycar_list = res.data.data
                    }).catch(res => {})
                })
            } else {
                this.$message.error("请检查输入车牌信息")
            }

        },
        curValueEv(val) {
            this.inp_code += val
        },
        delCarCode() {
            let a = this.inp_code
            this.inp_code = a.substring(0, a.length - 1)
        },
        curAct(val) {
            this.propcph = val
        }
    },
    watch: {
        inp_code(val) {
            if (/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/.test(val)) {
                this.inp_code_cor = true
            } else {
                this.inp_code_cor = false
            }
        },
        dialog(val) {
            if (val == true) {
                this.propcph = []
            }
        }
    }
}
</script>
<style>
.my_info a {
    text-decoration: none;
    color: #6b6b6b
}

.my_info {
    padding: 0;
    padding-bottom: 100px
}

.my_inf_mong {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1
}

.my_main {
    padding-top: 30px
}

.my_main_ly {
    -webkit-box-shadow: 0 3px 14px 0px rgba(0, 0, 0, .09)
}

.my_hd_ly {
    padding: 20px;
    border-bottom: 1px solid white;
    background: url('../assets/images/my_inf_bg.png');
    background-size: 100% 100%
}

.my_hd_pt {
    border-radius: 50px;
    height: 50px;
    width: 50px
}

.my_hd_nm {
    font-size: 18px
}

.my_hd_nm_srm {
    padding-top: 12px;
    font-weight: 400;
    font-size: 12px
}

.my_itm .v-icon {
    left: 0
}

.my_itm .v-expansion-panel {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.my_itm_zc {
    background: #fafafa !important;
    overflow-x: scroll;
    white-space: nowrap;
    padding: 8px 0px;
    font-size: 12px;

}

.my_itm_zc::-webkit-scrollbar {
    display: none;
}

.my_itm_zc .my_itm_zcn {
    width: 33.3333333%;
    display: inline-block;

}

.my_itm_zc .layout {
    width: 100%;
}

.my_itm_zc .layout .xs12 {
    text-align: center;
    font-weight: 400
}

.my_red_ms {
    color: #9c9c9c;
    font-size: 10px;
    font-weight: bold !important;
}

.my_itm_car {
    padding: 16px 0;
    color: #9c9c9c;
    text-align: center;
}

.my_itm_car .layout {
    margin-bottom: 10px;
}

.my_itm_car_mg {
    color: black;
    font-weight: 300;
}

.my_itm_cd {
    padding: 16px 28px;
}

.my_itm_cd_mg {
    color: #9c9c9c
}

.addCar {
    margin-bottom: 0 !important;
}
.addCar .v-icon {
    left: 0
}

.addCar {
    height: 25px
}

.addCar .flex {
    height: 100%
}

.addCar button {
    height: 25px;
    width: 25px;
    margin: 0
}

.my_dlg_tt {
    background: #fecf00
}

.my_dlg_btn {
    text-align: center;
}

.my_abt_bt {
    text-align: end
}

.my_pay_btn .v-btn__content {
    position: relative;
}

.my_badge {
    position: absolute;
    top: -7px;
    left: 34px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px !important;
    border: 1.5px solid #fdd000;
    border-radius: 50px;
    width: 18px;
    height: 18px;
    color: #fdd000;
    background: white;
}

.my_badge_cl {
    color: #32e3e2;
    border: 1.5px solid #32e3e2;
}

.add_car_v_btn {
    justify-content: space-around;
}
</style>