<template>
    <div>
        <v-container>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field type='password' onInput="value=value.replace(/[^\d]/g,'')" pattern="\d*" maxlength='6' label="原密码：" required v-model='pre_psw'></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type='password' onInput="value=value.replace(/[^\d]/g,'')" pattern="\d*" maxlength='6' label="新密码：" required v-model='new_psw'></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type='password' onInput="value=value.replace(/[^\d]/g,'')" pattern="\d*" maxlength='6' :color="inp_code_cor?'#fed000':'#ff5252'" label="确认密码：" required v-model='res_psw'></v-text-field>
                </v-flex>
                <v-flex style='font-size: 12px;color:#cecece'>*六位数字密码</v-flex>
            </v-layout>
        </v-container>
        <v-flex xs12>
            <v-btn color='#50b2e7' class='setp_btn' dark depressed :loading="load" @click='set'>完成设置</v-btn>
        </v-flex>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inp_code_cor: true,
            pre_psw: "",
            new_psw: "",
            res_psw: "",
            load: false
        }
    },
    methods: {
        set() {
            this.load = true
            if (this.inp_code_cor) {
                this.$api.updPayPwd({
                    id:  this.$Cks.get('id'),
                    paypwd: this.pre_psw,
                    repaypwd: this.res_psw,
                    newpaypwd: this.new_psw
                }).then(res => {
                    if (res.data.ret == 200) {
                        this.$message.success("修改成功")
                        this.$router.go(-1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.load = false
                }).catch(res => {
                    this.$message.error("请求错误")
                    this.load = false
                })
            } else {
                this.$message.error("请确认两次输入是否相同")
                this.load = false
            }
        }
    },
    watch: {
        res_psw(val) {
            if (val == this.new_psw) {
                this.inp_code_cor = true
            } else {
                this.inp_code_cor = false
            }
        }
    }
}
</script>
<style>
.setp_btn {
    width: 100%;
    margin: 0;
    margin-top: 50px;
    height: 40px;
    font-size: 16px;
    border: none;
    border-radius: inherit;
}
</style>