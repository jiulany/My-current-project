<template>
    <v-container>
        <v-layout wrap>
            <v-flex v-if="set_psw" xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toSetPsw'>
                    <v-flex xs6>设置密码</v-flex>
                    <v-flex xs6 class='my_psf_pt'>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex v-if="res_psw" xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toResPsw'>
                    <v-flex xs6>重置密码</v-flex>
                    <v-flex xs6 class='my_psf_pt'>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex v-if="xg_psw" xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toModifyPsw'>
                    <v-flex xs6>修改密码</v-flex>
                    <v-flex xs6 class='my_psf_nknm'>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="290" class='ps_res'>
            <v-card>
                <v-card-title class="headline">重置密码</v-card-title>
                <v-card-text>
                    确认重置此账号支付密码吗？
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#fed000" flat="flat" @click='resPsw' :loading='res_state'>
                        确认
                    </v-btn>
                    <v-btn flat="flat" @click="dialog = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            res_state: false,
            set_psw: false,
            res_psw: false,
            xg_psw: false
        }
    },
    methods: {
        toSetPsw() {
            this.$router.push('/window/myinfo/personal/privacy/setpsw')
        },
        toModifyPsw() {
            this.$router.push('/window/myinfo/personal/privacy/modifypsw')
        },
        toResPsw() {
            this.dialog = true
        },
        resPsw() {
            this.res_state = true
            this.$api.reSetPwd({
                userId:this.$Cks.get('id')
            }).then(res => {
                console.log(res)
                if (res.data.data == 1) {
                    this.$message.success("重置密码成功")
                    this.havePwd()
                } else {
                    this.$message.error("重置密码失败")
                }
                this.res_state = false
                this.dialog = false
            })
        },
        havePwd() {
            this.$api.havePwd({
                id: this.$Cks.get('id')
            }).then(res => {
                console.log(res)
                if (res.data.ret == 200) {
                    this.set_psw = false
                    this.res_psw = true
                    this.xg_psw = true
                }
                if (res.data.ret == 403) {
                    this.set_psw = true
                    this.res_psw = false
                    this.xg_psw = false
                }
                if (res.data.ret == 404) {
                    this.set_psw = true
                    this.res_psw = false
                    this.xg_psw = false
                }
            })
        }
    },
    created() {
        this.havePwd()
    }
}
</script>
<style>
</style>