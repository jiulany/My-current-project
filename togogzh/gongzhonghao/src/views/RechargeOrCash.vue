<template>
    <v-container class='rc'>
        <v-layout wrap>
            <v-flex xs12>
                <v-layout wrap class='rc_it'>
                    <v-flex xs12>账户余额</v-flex>
                    <v-flex xs12 class='rc_it_num'><span>￥</span>{{balance}}</v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='rc_bt'>
                <v-flex xs12 class='rc_btn rc_recharge'>
                    <v-btn color='#fdd000' depressed :ripple="{ class: 'orange--text' }" @click='recharge'>充值</v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            balance: ""
        }
    },
    created() {
        this.$api.getBalance({ userId: this.$Cks.get('id') }).then(res => {
           this.balance=res.data.data.balance
        })
    },
    components: {
        Wheel: resolve => { require(["../components/Wheel.vue"], resolve) }
    },
    methods: {
        recharge() {
            this.$router.push('/window/myinfo/allredpag/recharge')
        }
    }
}
</script>
<style>
.rc {
    padding-top: 65px
}

.rc_it .flex {
    text-align: center;
    font-size: 19px
}

.rc_it_num {
    font-size: 35px !important;
    margin-top: 10px
}

.rc_it_num span {
    font-size: 20px !important;
    letter-spacing: 5px
}

.rc_bt {
    margin-top: 55px
}

.rc_btn button {
    margin: 0;
    width: 100%;
    margin-top: 25px;
    font-size: 18px;
    height: 45px;
}

/*.rc_recharge:before:active {
    background-color: #ffd617 !important
}

.rc_cash:before:active {
    background-color: #ececec !important
}*/
</style>