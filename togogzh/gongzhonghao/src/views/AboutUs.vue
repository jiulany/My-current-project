<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toAboutTogo'>
                    <v-flex xs6>关于脱狗</v-flex>
                    <v-flex xs6 class='my_psf_nknm'>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='my_psf'>
                <v-layout class='my_psf_it' align-center @click='toComplaint'>
                    <v-flex xs6>投诉建议</v-flex>
                    <v-flex xs6 class='my_psf_nknm'>
                    </v-flex>
                    <v-flex>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class='my_psf'>
                <a href="tel:02883399903" style=" text-decoration:none;color: black">
                    <v-layout class='my_psf_it' align-center>
                        <v-flex xs6>联系客服</v-flex>
                        <v-flex xs6 class='my_psf_nm'>
                            02883399903
                        </v-flex>
                        <v-flex>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </v-flex>
                    </v-layout>
                </a>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    methods: {
        toAboutTogo() {
            this.$router.push('/window/myinfo/aboutus/abouttogo')
        },
        toComplaint(){
             this.$router.push('/window/myinfo/aboutus/complaint')
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

.my_car_d .headline {
    font-size: 21px !important
}
</style>