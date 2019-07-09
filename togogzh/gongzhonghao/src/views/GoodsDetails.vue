<template>
    <div>
        <v-container class='gods'>
            <v-layout wrap>
                <v-flex xs12 class='gods_it'>
                    <Wheel class='gods_wl' :itemsp='items' height=200 interval=30000></Wheel>
                </v-flex>
                <v-flex xs12 class='gods_it gods_tt'>
                    <v-flex xs12 class='gods_it_moy'>￥{{price}} <span>￥{{costprice}} </span></v-flex>
                    <v-flex xs12 class='gods_it_tt'>{{goodsname}} </v-flex>
                </v-flex>
                <v-flex xs12 class='gods_it gods_jj'>
                    <v-flex xs12 class='gods_it_jj'>商品简介</v-flex>
                    <v-flex xs12 class='gods_it_jj_cot'>
                        <div v-html='jianjie'>
                        </div>
                        <div>
                            <v-img :src="'http://tgapi.baodi520.com'+jianjiepic" width='100%'></v-img>
                        </div>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- 立即购买 -->
        <v-layout align-center class='settlement'>
            <v-flex xs3 class='settle_stock'>
                <v-flex xs12>库存</v-flex>
                <v-flex xs12>（充足）</v-flex>
            </v-flex>
            <v-flex xs9 class='settle_btn'>
                <v-btn color='#fdd000' @click='openSheet' depressed>
                    立即购买
                </v-btn>
            </v-flex>
        </v-layout>
        <v-bottom-sheet v-model="sheet" class='gods_num'>
            <v-list>
                <v-subheader class='gods_num_moy'>￥{{price}} <v-icon class="sheet_clear" @click='closeSheet'>clear</v-icon>
                </v-subheader>
                <v-list-tile class='gods_num_ctrl'>
                    <v-list-tile-title>
                        <v-layout wrap>
                            <v-flex xs2 class='gods_num_ctrl_a'>数量</v-flex>
                            <v-flex xs10 class='gods_num_ctrl_b'>
                                <v-btn flat v-ripple=false @click='remove'>
                                    <v-icon>remove</v-icon>
                                </v-btn>
                                <input v-model='count' maxlength="3" @foucs='foucsInp' @blur='leaveInput' type="text" style="width:50px;text-align: center;" />
                                <v-btn flat v-ripple=false @click='add'>
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile class='gods_num_sur'>
                    <v-btn color='#fdd000' @click='toPlaceOrder'>确认购买</v-btn>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
    </div>
</template>
<script>
import Wheel from '../components/Wheel.vue'
export default {
    data() {
        return {
            price: "",
            goodsname: "",
            jianjie: "",
            jianjiepic: "",
            toPay: {},
            sheet: false,
            count: 1,
            items: [],
            costprice: "",
        }
    },
    created() {
        this.$api.getSingleGoods({
            id: localStorage.getItem("singleGoodsId")
        }).then(res => {
            this.price = res.data.data.price
            this.goodsname = res.data.data.goodsname
            this.jianjie = res.data.data.jianjie
            this.jianjiepic = res.data.data.jianjiepic
            this.costprice = res.data.data.costprice
            this.toPay = res.data.data
            this.items.push({
                src: 'http://tgapi.baodi520.com' + res.data.data.selfpic
            })
        })
    },
    components: {
        Wheel: resolve => { require(['../components/Wheel.vue'], resolve) },
    },
    methods: {
        leaveInput() {
            this.countshow = true
        },
        foucsInp() {
            this.countshow = false
        },
        toPlaceOrder() {
            this.$store.dispatch("removeAllSeleGoodsAc")
            this.$set(this.toPay, "goodsnum", this.count)
            this.$store.dispatch("addSeleGoodsAc", this.toPay)
            this.$router.push('/window/store/goodsdetails/storeorder')
        },
        closeSheet() {
            this.sheet = false
        },
        openSheet() {
            this.sheet = true
        },
        add() {
            this.count = parseInt(this.count) + 1
        },
        remove() {
            if (this.count == 0) {

            } else {
                this.count = parseInt(this.count) - 1
            }

        }
    },
    watch: {
        count(val) {
            if (val == "") {
                this.count = 1
            }
        }
    }
}
</script>
<style>
.gods {
    padding-bottom: 100px;
}

.gods .v-carousel__controls {
    background: rgba(0, 0, 0, 0);
}

.gods_wl .v-carousel__controls .material-icons {
    font-size: 10px !important
}

.gods_it .flex {
    white-space: normal;
}

.gods_tt {
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e2ded7
}

.gods_jj {
    padding-top: 18px;
    font-size: 14px;
    font-weight: 600
}

.gods_it_moy {
    font-size: 20px;
    color: #f75c3e
}

.gods_it_moy span {
    font-size: 12px;
    color: #b0b0b0;
    font-weight: 400;
    margin-left: 10px;
    text-decoration: line-through;
}

.gods_it_jj {
    padding-bottom: 20px;
}

.gods_it_jj_cot {
    font-weight: 400;
    text-indent: 2em;
}

.gods_it_jj_cot p {
    margin-bottom: 5px
}

.settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -1px 2px #e6e6e6;
    background: white
}

.settle_stock {
    text-align: center;
    font-size: 10px
}

.settle_stock .flex:nth-of-type(1) {
    font-size: 14px
}

.settle_btn {
    height: 48px
}

.settle_btn button {
    margin: 0;
    width: 100%;
    height: 100%
}

.gods .v-carousel__next,
.gods .v-carousel__prev {
    display: none;
}

.gods_num .v-list {
    padding-bottom: 0
}

.gods_num_sur .v-list__tile {
    padding: 0
}

.gods_num_sur .v-list__tile button {
    margin: 0;
    width: 100%;
    height: 100%
}

.gods_num_moy {
    color: #f75c3e !important;
    position: relative;
    border-bottom: 1px solid #eee
}

.gods_num_moy .v-icon {
    position: absolute;
    right: 10px;
    top: 8px
}

.gods_num_ctrl {
    padding: 7px 0
}

.gods_num_ctrl .v-list__tile__title {
    height: 37px !important
}

.gods_num_ctrl .v-list__tile__title .layout {
    height: 100%
}

.gods_num_ctrl_a {
    position: relative;
    top: 5px
}

.gods_num_ctrl_b {
    text-align: end
}

.gods_num_ctrl_b button {
    margin: 0;
    padding: 0;
    width: 10px !important
}

.gods .v-window {
    box-shadow: none;
}
</style>