<template>
    <div>
        <v-container>
            <v-layout wrap class='car_ws'>
                <v-flex xs12 class='car_ws_it' v-for='(item,i) in goods' :key='item.id'>
                    <v-layout align-center>
                        <CheckedButton @curValue='addPrice' :ref="'ck_'+i" :itm_data='item' :is_sele='item.isSele'></CheckedButton>
                        <v-flex xs3>
                            <v-img style='display: inline-block' :src="'http://tgapi.baodi520.com'+item.pic" width='65px' height='65px' touchstart></v-img>
                        </v-flex>
                        <v-flex xs5 class='car_ws_ct'>
                            <v-flex xs12 class='car_ws_tt'>{{item.goodsname}}</v-flex>
                            <v-flex xs12 class='car_ws_ms'>{{item.jianjie}}</v-flex>
                        </v-flex>
                        <v-flex xs3 class='car_ws_moy'>
                            ￥{{item.price}}
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- 去结算 -->
        <v-layout align-center class='settlement'>
            <v-flex xs1 class='settle_sle'>
                <CheckedButton @curValue='allSele'></CheckedButton>
            </v-flex>
            <v-flex xs3>
                全选
            </v-flex>
            <v-flex xs4 class='settle_al'>
                合计 ￥{{count_price}}
            </v-flex>
            <v-flex xs4 class='settle_btn'>
                <v-btn color='#fdd000' @click='toPlaceOrder' depressed>
                    去结算
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import CheckedButton from '../components/CheckedButton.vue'
export default {
    data() {
        return {
            goods: [],
            count_price: 0,

        }
    },
    created() {
        this.$store.dispatch("removeAllSeleGoodsAc")
        this.$api.getGoods({
            classifyid: 2
        }).then(res => {
            let a = res.data.data
            for (let i in a) {
                a[i].isSele = false
            }
            this.goods = a
        }).catch(res => {
            this.$message.error("请求错误")
        })
    },
    components: {
        CheckedButton
    },
    methods: {
        toPlaceOrder() {
            if (this.$store.state.seleGoods.length == 0) {
                this.$message.info("请选择商品")
            } else {
                 localStorage.setItem("seleStore","")
                this.$router.push('/window/index/meticulous/cosmetologyorder')
            }
        },
        addPrice(cur) { //计算价格
            if (cur.cur) {
                this.count_price = parseFloat(this.count_price + parseFloat(cur.data.price))
                this.$store.dispatch('addSeleGoodsAc', cur.data)
            } else {
                this.count_price = parseFloat(this.count_price - parseFloat(cur.data.price))
                this.$store.dispatch('removeSeleGoodsAc', cur.data)
            }
        },
        allSele(cur) { //全选计算
            if (cur.cur) {
                this.goods.map((itm) => {
                    itm.isSele = 'true'
                    return itm
                })
                var al = null
                for (let i in this.goods) {
                    al += parseFloat(this.goods[i].price)
                }
                this.count_price = al
                this.$store.dispatch('addAllSeleAc', this.goods)
            } else {
                this.goods = this.goods.map((itm) => {
                    itm.isSele = 'false'
                    return itm
                })
                this.count_price = 0
                this.$store.dispatch('removeAllSeleGoodsAc')
                console.log(this.$store.state.seleGoods)
            }
        }
    }
}
</script>
<style>
.car_ws {
    font-size: 18px;
    padding-bottom: 50px
}

.car_ws_it {
    border-bottom: 1px solid #e2e2e2;
    padding: 10px 0;
    padding-top: 15px;
}

.car_ws_it:last-child {
    border-bottom: none;
}

.car_ws_it .flex {
    text-align: center;
}

.car_ws_ct .flex {
    text-align: start;
}

.car_ws_tp {
    margin-bottom: 0
}

.car_ws_tt {
    margin-bottom: 6px;
    font-size: 14px;
    margin-left: 5px;
    font-weight: 500;
    line-height: 16px;
    height: 32px;
    overflow-y: hidden;
}

.car_ws_ms {
    color: #9c9c9c;
    margin-left: 5px;
    font-size: 15px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.car_ws_moy {
    text-align: end !important;
    color: #f75c3e;
    font-weight: 900
}

.settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -1px 2px #e6e6e6;
    background: white
}

.settle_sle {
    margin-left: 12px
}

.settle_al {
    color: #f75c3e;
    font-weight: 900
}

.settle_btn {
    height: 48px
}

.settle_btn button {
    margin: 0;
    width: 100%;
    height: 100%
}
</style>