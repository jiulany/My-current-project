<template>
    <div>
        <!-- <v-container class='tips'>
            <v-alert :value="true" type="info" color='#fecb00'>
                提示：推荐蜡洗，可使汽车表面光亮如新，并有效防止酸雨腐蚀漆面
            </v-alert>
        </v-container> -->
        <v-container>
            <v-layout wrap class='car_ws'>
                <v-flex xs12 class='car_ws_it' v-for='(item,i) in goods' :key='item.id'>
                    <v-layout align-center @click='pushWash(item)'>
                        <!-- <CheckedButton @curValue='addPrice' :ref="'ck_'+i" :itm_data='item' :is_sele='item.isSele'></CheckedButton> -->
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
        <v-container class='tips'>
            <v-layout wrap>
                <v-flex xs12>
                    <v-img class='tip_img' :src="require('../assets/images/Prompting.png')" width='90%'></v-img>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import CheckedButton from '../components/CheckedButton.vue'
export default {
    data() {
        return {
            goods: [],
            count_price: 0,
            dialog: true,
            items:{},
        }
    },
    created() {
        this.$store.dispatch("removeAllSeleGoodsAc")
        this.$api.getGoods({
            classifyid: 1
        }).then(res => {
            let a = res.data.data
            for (let i in a) {
                a[i].isSele = false
            }
            this.goods = a
        }).catch(res => {
            this.$message.error("请求错误")
        })
        this.$api.getShopList().then(res => {  //获取商店
            this.items=res.data.data[0]
        })
    },
    components: {
        CheckedButton
    },
    methods: {
        pushWash(val) {
            localStorage.setItem("seleStore","")
            this.$store.dispatch('addSeleGoodsAc', val)
            this.$router.push('/window/index/carwash/placeorder')
        }
    }
}
</script>
<style>
.car_ws {
    font-size: 18px;
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

/*.tips {
    padding: 0;
    font-size: 10px;
}

.tips .v-alert {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    padding: 2px 16px
}

.tips .v-alert div {}*/
.tips .xs12 {
    text-align: center;
}

.tip_img {
    display: inline-block
}

.car_ws_dl_btn {
    margin: 0;
    width: 100%;
}

.car_ws_dl .v-card__actions {
    padding: 0
}
.car_ws_dl_ct_btn{
  padding: 20px 10px
}
.car_ws_cp{
    padding-top: 0
}
</style>