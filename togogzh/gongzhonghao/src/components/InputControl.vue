<template>
    <div class="input_control">
        <input type="tel" :maxlength="maxlength" v-model='input_value' onkeyup="value=value.replace(/[^\d]/g,'')" @input='input' @blur='inputBlur'>
        <span ref='placehoalder' class="">{{placehoalder}}</span>
        <div v-if="inptyped=='code'?true:false" ref='inputcode' class="inp_code_txt" @click="sendC">获取验证码</div>
        <div style="color: #bdbdbd !important" v-if="count_dv" ref='inputcode' class="inp_code_txt">{{count}}S后重发</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input_value: "",
            count: 120,
            count_dv: false,
            inptyped: '',
            interv: null,
        }
    },
    model: {
        event: 'inp'
    },
    props: {
        placehoalder: {
            required: true,
            default: "请输入手机号"
        },
        inptype: {
            required: true,
            default: "text",
        },
        maxlength: {
            type: String
        },
        yz: {
            type: Number
        }
    },
    created() {
        this.inptyped = this.inptype
    },
    methods: {
        input() {
            this.$refs.placehoalder.style.opacity = '0';
            this.$emit("inp", this.input_value)
        },
        inputBlur() {
            if (this.input_value == '') {
                this.$refs.placehoalder.style.opacity = '1'
            }
        },
        sendC() {
            this.$emit('sendCode')
        },
        dsq() {
            var that = this
            var a = setInterval(function() {
                if (that.count == 0) {
                    clearInterval(a)
                    this.count = 120
                } else {
                    that.count -= 1
                }

            }, 1000)
        },
        yzz() {
            this.count_dv = true
            var that = this
            this.inptyped = 'text'
            this.dsq()
        }
    },
    watch: {
        yz(val) {
            this.count = 120
            this.yzz()
        },
        count(val) {
            if (val == 0) {
                this.inptyped = 'code'
                this.count_dv = false
            }
        }
    },
}
</script>
<style>
.input_control {
    position: relative;
    padding: 17px 0;
    border-bottom: 1px solid #f5f5f5;
    padding-left: 10px;
}

.input_control input {
    font-size: 1.2rem;
    outline: none;
    color: #656565;
    letter-spacing: 2px
}

.input_control span {
    font-size: 1.2rem;
    position: absolute;
    left: 10px;
    z-index: -1;
    color: #bdbdbd;
}

.inp_code_txt {
    display: inline-block;
    position: absolute;
    right: 0;
    font-size: 1.2rem;
    color: #3b9bfe !important;
}
</style>