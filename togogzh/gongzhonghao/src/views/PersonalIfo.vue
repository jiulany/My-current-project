<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center>
                    <v-flex xs6>头像</v-flex>
                    <v-flex xs6 class='my_psf_pt'>
                        <v-img class='my_psf_pt_w' :src="require('../assets/images/my_head.png')"></v-img>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toSetPsw'>
                    <v-flex xs6>密码设置</v-flex>
                    <v-flex xs6 class='my_psf_nknm'>支付密码设置
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center>
                    <v-flex xs6>手机号</v-flex>
                    <v-flex xs6 class='my_psf_nm'>{{phone}}
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='my_psf' @click='tuichu'>
                <v-layout class='my_psf_it' align-center>
                    <v-flex xs6>操作</v-flex>
                    <v-flex xs6 class='my_psf_nm'>退出登录
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog_0" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">提示</v-card-title>
                <v-card-text>确定要退出吗？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="" flat @click="dialog_0=false">取消</v-btn>
                    <v-btn color="#fdcc00" flat @click="toCancel">同意</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            phone: localStorage.getItem("user_phone"),
            pay_type: localStorage.getItem("paytype"),
            dialog_0: false
        }
    },
    methods: {
        tuichu() {
            this.dialog_0 = true
        },
        toSetPsw() {
            this.$router.push('/window/myinfo/personal/privacy')
        },
        toCancel() {
            this.$Cks.remove('id')
            this.$Cks.remove('userStatus')
            this.$router.push('/')
        }
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
</style>