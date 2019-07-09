<template>
    <div>
        <div id='allmap'></div>
        <v-container class='sls'>
            <div class="sls_it_rq">脱狗车宝自营店
            </div>
            <v-layout wrap v-for='(item,i) in items' class='sls_it'>
                <v-flex xs1 align-self-center>
                    <CheckedButton :is_sele='item.isSele' @curValue='addPrice' :itm_data='foritem(item,i)'></CheckedButton>
                </v-flex>
                <v-flex xs11>
                    <v-layout wrap>
                        <v-flex xs12 class='sls_it_nm'>{{item.shopname}}</v-flex>
                        <v-flex xs12>
                            <v-layout wrap class='sls_it_ct' align-center>
                                <v-flex xs7 class='sls_adress'>{{item.address}}</v-flex>
                                <v-flex xs3>距离您{{(item.distance/1000).toFixed(1)}}km</v-flex>
                                <v-flex xs2 class='sls_it_ckwz' @click='toStoreDetail(item)'>查看位置</v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
        <v-layout align-center class='stodtl_sele'>
            <v-btn class='stodtl_sele_btn' color='#fdd000' dark @click='toDd'>
                确认选择
            </v-btn>
        </v-layout>
    </div>
</template>
<script>
import CheckedButton from '../components/CheckedButton.vue'
export default {
    data() {
        return {
            items: [],
            inx: null,
            itemc: {},
            this_it: {}
        }
    },
    components: {
        CheckedButton,
    },
    created() {

    },
    methods: {
        toStoreDetail(val) {
            localStorage.setItem("shopId", val.id)
            this.$router.push('/window/index/carwash/stores/storedetails')
        },
        addPrice(cur) { //
            if (cur.cur == true) {
                this.this_it = cur.data.item
                let b = this.itemc
                b.isSele = "false"
                this.$set(this.items, this.inx, b)

                let a = cur.data.item
                a.isSele = "true"
                this.$set(this.items, cur.data.i, a)
                this.inx = cur.data.i
                this.itemc = cur.data.item
            }
            if (cur.cur == false) {
                this.this_it = {}
            }
        },
        foritem(item, i) {
            return { item: item, i: i }
        },
        toDd() {
            if (this.this_it.id == undefined) {
                this.$message.warning("请选择商铺")
            } else {
                localStorage.setItem("seleStore", this.this_it.id)
                this.$api.updShopid({
                    shopid: localStorage.getItem("seleStore"),
                    ordernum: localStorage.getItem("ordernum")
                }).then(res => {
                    console.log(res)
                })
                this.$router.push('/window/index/carwash/placeorder')
            }

        }
    },
    mounted() {
        var that = this
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                that.$api.getShopList({ longitude: r.point.lng, latitude: r.point.lat }).then(res => {
                    console.log(res)
                    let a = res.data.data
                    for (let i in a) {
                        a[i].isSele = false
                    }
                    that.items = a
                })
            } else {
                alert('failed' + this.getStatus());
                that.$api.getShopList().then(res => {
                    that.items = res.data.data
                })
            }
        });
    }
}
</script>
<style>
.sls {
    padding: 0;
    height: 100%;
    background: #f2f2f2
}

.sls_it_rq {
    padding: 10px 16px;
    background: #f2f2f2
}

.sls_it {
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
    background: #ffffff
}

.sls_it_nm {
    font-weight: 600
}

.sls_it .xs1 {
    position: relative;
    top: 5px;
}

.sls_it_ct {
    font-size: 11px;
    margin-top: 6px
}

.sls_it_ckwz {
    color: #fdd000
}

.sls_adress {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.stodtl_sele {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -1px 2px #e6e6e6;
    background: white
}

.stodtl_sele_btn {
    margin: 0;
    width: 100%;
    color: #f75c3e;
    height: 50px;
    font-weight: 500;
    font-size: 16px
}
</style>