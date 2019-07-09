<template>
    <v-container class='sto'>
        <v-layout wrap>
            <v-flex xs12>
                <Tab @getId='getClassId' @defautId='defaultGoods'></Tab>
            </v-flex>
            <v-flex xs12>
                <Wheel height='200px' class='sto_wl' :itemsp='items' interval='15000'></Wheel>
            </v-flex>
            <!-- 内容 -->
            <v-layout wrap class='sto_ct' justify-space-between>
                <v-flex xs5 class='sto_it' v-for="(item,i) in goods_list" @click='toGoodsDetails(item)'>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-img class='sto_it_pt' :src="'http://tgapi.baodi520.com'+item.pic" width='100%' height='146px'></v-img>
                        </v-flex>
                        <v-flex xs12 class='sto_it_ms'>
                            <div v-html='item.goodsname'></div>
                        </v-flex>
                        <v-flex xs12 class='sto_it_cur'>￥{{item.price}}<span class='sto_it_pre'>￥{{item.costprice}}</span></v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <!-- END -->
        </v-layout>
    </v-container>
</template>
<script>
import Tab from '../components/Tab.vue'
import Wheel from '../components/Wheel.vue'
export default {
    components: {
        Tab,
        Wheel
    },
    data() {
        return {
            goods_list: [],
            items: [{
                    src: require("../assets/images/wheel/banner_1.png")
                },
                {
                    src: require("../assets/images/wheel/banner_2.png")
                },
                {
                    src: require("../assets/images/wheel/banner_3.png"),
                    tourl: "/window/myinfo/allredpag/recharge"
                }
            ]
        }
    },
    methods: {
        toGoodsDetails(item) {
            localStorage.setItem("singleGoodsId", item.id)
            this.$router.push('/window/store/goodsdetails')
        },
        getClassId(a) {
            this.$api.getGoods({ classifyid: 3, classifysid: a }).then(res => { //接受tab抛出值
                this.goods_list = res.data.data
            })
        },
        defaultGoods(a) {
            this.$api.getGoods({ classifyid: 3, classifysid: a }).then(res => { //接受tab抛出值
                this.goods_list = res.data.data
            })
        }
    }
}
</script>
<style>
.sto {
    padding: 0;
    background: #eee;
    padding-bottom: 57px;
}

.sto_wl .v-carousel__controls {
    background: rgba(255, 255, 255, 0);
}

.sto_ct {
    width: 100%;
    padding: 20px 10px;
    min-height: 200px;
    padding-top: 10px
}

.sto_it_pt {
    margin-bottom: 15px !important
}

.sto_it {
    border-radius: 5px;
    background: white;
    padding: 6px 10px 15px 10px;
    flex-basis: 47.666667% !important;
    max-width: 47.666667% !important;
    margin-top: 10px
}

.sto_it:nth-child(odd) {}

.sto_it:nth-child(even) {}

.sto_it_ms {
    white-space: normal;
    line-height: 20px;
    height: 40px;
    font-weight: 500;
    line-height: 20px;
    overflow-y: hidden;
}

.sto_it_cur {
    color: #f75c3e;
    font-weight: 800;
    font-size: 16px;
    margin-top: 1px
}

.sto_it_cur span {
    margin-left: 7px;
    font-size: 12px;
    text-decoration: line-through;
    color: #b0b0b0
}

.sto .v-carousel__next,
.sto .v-carousel__prev {
    display: none;
}

.sto .v-icon {
    font-size: 5px !important
}

.sto .v-window {
    box-shadow: none;
}
</style>