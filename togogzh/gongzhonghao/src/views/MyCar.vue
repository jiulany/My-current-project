<template>
    <div class=my_car>
        <v-container>
            <v-layout wrap>
                <v-flex xs12 class='my_psf'>
                    <v-layout class='my_psf_it' align-center>
                        <v-flex xs4>车牌号</v-flex>
                        <v-flex xs8 class='my_psf_nknm' v-if='is_code' @click='showIpCode'>{{carnum}}
                        </v-flex>
                        <v-flex xs8 v-if='is_code_ip'>
                            <v-text-field @focus='focusAdd' v-model='car_number' :color="inp_code_cor?'#fed000':'#ff5252'" label="车牌信息" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class='my_psf'>
                    <v-layout class='my_psf_it' align-center>
                        <v-flex xs4>车辆颜色</v-flex>
                        <v-flex xs8 class='my_psf_nknm' v-if='is_color' @click='showIpColor'>{{colorid}}
                        </v-flex>
                        <v-flex xs8 v-if='is_color_ip'>
                            <v-select color="#fed000" @click.native.once='getCarColor' v-model='sele_color' :items="car_color" item-value='id' item-text='colorname' label="车辆颜色" required>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class='my_psf'>
                    <v-layout class='my_psf_it' align-center>
                        <v-flex xs4>车型</v-flex>
                        <v-flex xs8 class='my_psf_nm' v-if='is_type' @click='showIpType'>{{cartype}}
                        </v-flex>
                        <v-flex xs8 v-if='is_type_ip'>
                            <v-select color="#fed000" v-model='sele_car_type' item-value='id' item-text='car' :items="[{car:'SUV',id:'2'},{car:'小轿车',id:'1'}]" label="车辆类型" required></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 class='my_psf''>
                <v-layout class=' my_psf_it my_psf_it_cl' align-center>
                    <v-flex xs6 @click='showDelCar'>
                        <v-btn color='#fdd000' dark depressed>删除</v-btn>
                    </v-flex>
                    <v-flex xs6 @click='showResCar'>
                        <v-btn color='#fdd000' dark depressed @click='surXg'>保存</v-btn>
                    </v-flex>
            </v-layout>
            </v-flex>
            </v-layout>
            <v-dialog v-model="dialog" max-width="290" class='my_car_d'>
                <v-card>
                    <v-card-title class="headline">确认删除</v-card-title>
                    <v-card-text>
                        确认删除{{carnum}}吗？
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#fed000" flat="flat" @click="delCar" :loading='del_state'>
                            确认
                        </v-btn>
                        <v-btn flat="flat" @click="dialog = false">
                            取消
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
        <KeyBoard :isShow='show_key_board' @curValueEv='curValueEv' @delkb='delCarCode' :propcph='propcph' @curAct='curAct'></KeyBoard>
    </div>
</template>
<script>
import KeyBoard from '../components/keyBoard.vue'
export default {
    components: {
        KeyBoard
    },
    data() {
        return {
            carnum: localStorage.getItem("carnum"),
            colorid: localStorage.getItem("colorname"),
            cartype: localStorage.getItem("cartypename"),
            dialog: false,
            del_state: false,
            dialog_0: false,
            car_color: ["加载中..."],
            car_number: localStorage.getItem("carnum"),
            sele_color: localStorage.getItem("colorid"),
            sele_car_type: localStorage.getItem("cartype"),
            inp_code_cor: true,
            show_key_board: false,
            propcph: [],
            is_code: true,
            is_code_ip: false,
            is_color: true,
            is_color_ip: false,
            is_type: true,
            is_type_ip: false,
        }
    },
    methods: {
        showDelCar() {
            this.dialog = true
        },
        showResCar() {
            this.dialog_0 = true
        },
        delCar() {
            this.del_state = true
            this.$api.delCar({
                id: localStorage.getItem("carid")
            }).then(res => {
                if (res.data.ret == 200) {
                    this.$message.success("删除车辆成功")
                    this.$router.go(-1)
                } else {
                    this.$message.error("删除车辆失败")
                }
                this.del_state = false
                this.dialog = false
            })
        },
        getCarColor() {
            this.$api.getCarColor().then(res => {
                this.car_color = res.data.data
            })
        },
        closeDialog() {
            this.dialog_0 = false
            this.show_key_board = false
            this.car_number = ''
        },
        focusAdd() {
            document.activeElement.blur()
            this.show_key_board = !this.show_key_board
        },
        curValueEv(val) {
            this.car_number += val
        },
        delCarCode() {
            let a = this.car_number
            this.car_number = a.substring(0, a.length - 1)
        },
        curAct(val) {
            this.propcph = val
        },
        surXg() {
            if (this.inp_code_cor) {
                this.$api.douPd({
                    id: localStorage.getItem("carid"),
                    carnum: this.car_number,
                    colorid: this.sele_color,
                    cartype: this.sele_car_type
                }).then(res => {
                    if (res.data.ret == 200) {
                        this.$message.success("修改成功")
                        this.$router.push('/window/myinfo')
                    }
                })
            } else {
                this.$message.error("请检查输入车牌信息")
            }
        },
        curAct(val) {
            this.propcph = val
        },
        showIpCode() {
            this.is_code = false
            this.is_code_ip = true
        },
        showIpColor() {
            this.is_color = false
            this.is_color_ip = true
        },
        showIpType() {
            this.is_type = false
            this.is_type_ip = true
        },
    },
    watch: {
        car_number(val) {
            if (/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/.test(val)) {
                this.inp_code_cor = true
            } else {
                this.inp_code_cor = false
            }
        },
        dialog_0(val) {
            if (val == true) {
                this.propcph = []
            }
        }
    },
    created() {

    }
}
</script>
<style>
.my_psf {
    border-bottom: 1px solid #e2e2e2;
}

.my_psf:last-child {
    border-bottom: none;
}

.my_psf_it {
    padding: 20px 20px;
    font-weight: normal;
}

.my_psf_it:nth-of-type(3) {
    border-bottom: none;
}

.my_psf_pt {
    text-align: end;
}

.my_psf_pt_w {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: inline-block
}

.my_psf_nknm {
    text-align: end
}

.my_psf_nm {
    text-align: end
}

.my_psf .v-icon {
    position: relative;
    left: 15px
}

.my_car_d .headline {
    font-size: 21px !important
}

.my_psf_it_cl .xs6 {
    text-align: center;
}

.my_car .v-menu__content {
    left: 0 !important;
    top: 0 !important;
}
</style>