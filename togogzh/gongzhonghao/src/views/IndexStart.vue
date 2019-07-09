<template>
    <v-card class='inx_start'>
        <v-img @click='toRecharge' class='headtag' :src="require('../assets/images/headtag.png')" width='100%' touchstart></v-img>
        <v-card-actions>
            <v-container>
                <v-layout>
                    <v-flex xs12 class="inx_start_btn">
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-img class='start_wash_blur' :src="require('../assets/images/start_wash_blur.png')" width='180px' touchstart></v-img>
                                <v-img @click.native='toCarWash' class='start_wash' :src="require('../assets/images/start_wash.png')" width='180px'></v-img>
                            </v-flex>
                            <v-flex xs12>
                                <v-img class='start_wash_blur' :src="require('../assets/images/start_wash_blur.png')" width='180px' touchstart></v-img>
                                <v-img @click.native='toCarMeti' class='start_wash' :src="require('../assets/images/fine_pro.png')" width='180px'></v-img>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-actions>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">提示</v-card-title>
                <v-card-text>您还没有车辆信息，请前往个人中心设置</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="" flat @click="cancleToMycar">取消</v-btn>
                    <v-btn color="#fdcc00" flat @click="toMycar">同意</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        toCarWash() {
            this.$router.push('/window/index/carwash')
        },
        toCarMeti() {
            this.$router.push('/window/index/meticulous')
        },
        toRecharge() {
            this.$router.push('/window/myinfo/allredpag/recharge')
        },
        toMycar() {
            sessionStorage.setItem("daiShowNum", '1')
            this.$router.push('/window/myinfo') //设置车辆判断已经展示
        },
        cancleToMycar() {
            sessionStorage.setItem("daiShowNum", '1') //设置车辆判断已经展示
            this.dialog = false
        }
    },
    created() {
        if (sessionStorage.getItem("daiShowNum") != '1') { //判断dialog,是否再次提示有没车辆
            this.$api.userCar({ userid: this.$Cks.get('id') }).then(res => {
                if (res.data.data == "0") {
                    this.dialog = true
                }
            }).catch(res => {})
        }else{
            this.$api.userCar({ userid: this.$Cks.get('id') }).then(res => {
            }).catch(res => {})
        }

        localStorage.setItem("getStoreCurPg", 0)
        let a = window.location.href.replace("https://tggzh.baodi520.com/", '')
        //   https://testtg.baodi520.com   https://tggzh.baodi520.com
        let b = qs.parse(a, { ignoreQueryPrefix: true })
        this.$api.getToken({ code: b.code, id: this.$Cks.get('id') }).then(res => {
            if (res.data.ret == 200) {
                this.$Cks.set('id', res.data.data.id, { expires: 30 })
                this.$Cks.set('userStatus', "1", { expires: 30 })
                localStorage.setItem("isSq", "1")
            }
        })
    }
}
</script>
<style>
.inx_start {
    height: 100%;
    background: url('../assets/images/inx_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%
}

.inx_start .v-card__actions {
    height: 100%
}

.inx_start .container {
    height: 100%;
    display: flex;
    align-items: center;
}

.start_wash {
    margin-left: auto;
    margin-right: auto;
}

.start_wash:active {
    position: relative;
    top: 2px;
    left: 2px
}

.start_wash_blur {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    bottom: -50px;
    left: 3px
}

.inx_start_btn {
    position: relative;
    top: 106px;
}

.inx_start_btn .xs12 {
    height: 73px
}

.headtag {
    position: fixed;
    top: 0
}
</style>