<template>
    <v-container class='adv'>
        <v-layout wrap>
            <v-flex xs12 class='adv_tt'>问题与建议</v-flex>
            <v-flex xs12>
                <v-textarea class='adv_textare' placeholder='请输入300字以内的问题描述或意见反馈' v-model='adv_tarea' solo name="input-7-4" hint='我们将及时给您回复' value="" no-resize maxlength='300'></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-btn color='#fdd000' dark class='adv_btn' depressed @click='sumbit'>提交反馈</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            adv_tarea: ""
        }
    },
    methods: {
        sumbit() {
            if (this.adv_tarea.length<20) {
                this.$message.error("字数应大于50字！")
            } else {
                this.$api.addAdvice({
                    id: this.$Cks.get('id'),
                    test: this.adv_tarea
                }).then(res => {
                    if (res.data.ret == 200) {
                        this.$message.success("提交成功")
                        this.$router.go(-1)
                    } else {
                        this.$message.error("提交失败，请稍后再试")
                    }

                })
            }

        }
    }
}
</script>
<style>
.adv {
    height: 100%;
    background: #f2f2f2
}

.adv_tt {
    margin-bottom: 10px;
    padding-left: 15px
}

.adv .v-input__slot {
    box-shadow: none !important;
}

.adv_textare {
    font-size: 12px
}

.adv_btn {
    margin: 0;
    width: 100%
}
</style>