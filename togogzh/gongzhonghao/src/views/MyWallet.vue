<template>
    <v-container class='my_wlt'>
        <v-layout wrap>
            <v-flex xs6>
                <v-btn color="#eee" flat class='my_wlt_it' v-ripple=false>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-img style='display: inline-block' :src="require('../assets/images/my_wlt_card.png')" width='25px'></v-img>
                        </v-flex>
                        <v-flex xs12 class='my_wlt_tl'>银行卡</v-flex>
                    </v-layout>
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <v-btn color="#eee" flat class='my_wlt_it_r' v-ripple=false @click='toBalance'>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-img style='display: inline-block' :src="require('../assets/images/my_wlt_bal.png')" width='25px'></v-img>
                        </v-flex>
                        <v-flex xs12 class='my_wlt_tl'>余额</v-flex>
                        <v-flex xs12 class='my_wlt_tl'>￥25.00</v-flex>
                    </v-layout>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                <v-layout wrap class='my_wlt_wl'>
                    <Wheel height='160' interval='8000'></Wheel>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    components: {
        Wheel: resolve => { require(["../components/Wheel.vue"], resolve) }
    },
    methods:{
        toBalance(){
            this.$router.push('/window/myinfo/allredpag/balance')
        }
    }
}
</script>
<style>
.my_wlt {
    padding: 0;
    background: #fdd000;
}

.my_wlt_it {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    padding-left: 50px;
    padding-bottom: 45px;
    color: black !important;
    margin: 0
}

.my_wlt_it_r {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    padding-right: 50px;
    padding-bottom: 20px;
    color: black !important;
    margin: 0;
}

.my_wlt_tl {
    font-size: 16px;
    font-weight: 500
}

.my_wlt_wl {
    background: white;
    padding-top: 10px
}

.my_wlt_wl .v-carousel__controls {
    display: none;
}


.my_wlt_wl .v-carousel__prev,
.my_wlt_wl .v-carousel__next {
    display: none;
}
</style>