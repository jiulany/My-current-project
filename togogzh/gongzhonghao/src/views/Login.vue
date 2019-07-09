<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-card>
                <v-img :src="require('../assets/images/login_lg.png')" width='100%' aspect-ratio="2.75"></v-img>
            </v-card>
        </v-flex>
        <v-container xs12 class='login_inpt'>
            <v-layout wrap>
                <v-flex xs12>
                    <InputControl v-model='number' maxlength='11' placehoalder='请输入手机号' inptype='text'></InputControl>
                </v-flex>
                <v-flex xs12>
                    <InputControl v-model='inpNum' maxlength='4' :yz='yz' placehoalder='请输入验证码' inptype='code' @sendCode='sendCode()'></InputControl>
                </v-flex>
                <!--   <v-flex xs12>
                    <InputControl placehoalder='请输入邀请码（可选填）' inptype='text'></InputControl>
                </v-flex> -->
                <v-flex xs12>
                    <v-checkbox class='login_ck' outline v-model="is_agr" label="" color="#5cbbf6" value="1" hide-details></v-checkbox>
                    <span class="login_ck_lb">阅读并表示同意<router-link to='/'>《注册协议》</router-link></span>
                </v-flex>
                <v-flex xs12 class='btn_region'>
                    <v-flex xs12 class='btn_df'>
                        <v-btn color="#3b9bfe" dark @click='toIndex'>登录</v-btn>
                    </v-flex>
                    <!--  <v-flex xs12 class='btn_df'>
                        <v-btn color="#fdfcfd"></v-btn>
                    </v-flex> -->
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>
<script>
import InputControl from '../components/InputControl.vue'
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {
            number: '',
            resNum: "",
            inpNum: "",
            yz: 1,
            is_agr: ""
        }
    },
    components: {
        InputControl
    },
    created() {},
    methods: {
        toIndex() {
            if (this.is_agr != "1") {
                this.$message.info("请阅读并勾选用户协议")
            } else {
                this.$api.loginAddMsg({
                    "phone": this.number,
                    "yzm": this.inpNum,
                }).then(res => {
                    if (res.data.ret == 200) {
                        new Promise((resolve, reject) => {
                            this.$Cks.set('id', res.data.data.id, { expires: 30 })
                            this.$Cks.set('userStatus', "1", { expires: 30 })
                            resolve()
                        }).then(res => {
                            this.$api.getBaseInfo({ id: this.$Cks.get('id') }).then(res => {
                                if (res.data.data.hasOwnProperty("url")) {
                                    let a = qs.parse(res.data.data.url)
                                    console.log(res.data.data.url)
                                    window.location.href = res.data.data.url
                                } else {
                                    this.$router.push('/window/index')
                                }
                            })
                        })

                        // this.$router.push('/window/index')


                    } else {
                        alert('验证码不正确')
                    }
                }).catch(res => {
                    this.$message.error("请求错误")
                })
            }

        },
        sendCode() {
            // let rg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            // if (rg.test(this.number)) {
            //     this.$api.loginSendMsg({
            //         "phone": this.number,
            //     }).then(res => {
            //         if (res.data.ret == 200) {
            //             this.$message.success("发送成功")
            //             this.resNum = res.data.data
            //             console.log(res.data.data)
            //             this.yz += 1
            //         }
            //     }).catch(res => {
            //         alert(res)
            //     })
            // } else {
            //     this.$message.warning("请检查手机号码输入是否正确")
            // }
            if (this.number.length==11) {
                this.$api.loginSendMsg({
                    "phone": this.number,
                }).then(res => {
                    if (res.data.ret == 200) {
                        this.$message.success("发送成功")
                        this.resNum = res.data.data
                        console.log(res.data.data)
                        this.yz += 1
                    }
                }).catch(res => {
                    alert(res)
                })
            } else {
                this.$message.warning("请检查手机号码输入是否正确")
            }

        },
    }
}
</script>
<style>
.login_inpt {}

.btn_region {
    margin-top: 90px
}

.btn_df {
    margin-top: 12px
}

.btn_df:last-child {
    border: 1px solid #dedede
}

.btn_df button {
    width: 100%;
    margin: 0;
    height: 45px;
    font-size: 16px;
}

.login_ck {
    display: inline-block;
    position: relative;
    top: 6px;
}

.login_ck_lb {
    font-size: 15px
}

.login_ck_lb a {
    text-decoration: none;
    color: #3b9bfe;
}
</style>