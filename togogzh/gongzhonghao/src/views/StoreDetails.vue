<template>
    <v-container class='stodtl'>
        <div id='allmap_0'></div>
        <v-container class='stodtl_ctrl'>
            <v-layout wrap>
                <v-flex xs12>
                    <v-layout wrap>
                        <v-flex xs10 class='stodtl_ctrl_nm'>{{data.shopname}}</v-flex>
                        <v-flex xs2 class='stodtl_ctrl_pt'>
                            <v-img contain :src="require('../assets/images/daozheliqu_icon.png')" width='20px'></v-img>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12>
                    <v-layout wrap>
                        <v-flex xs10>
                            <v-layout wrap>
                                <v-flex xs8>{{data.address}}</v-flex>
                                <v-flex xs4>距离您{{(data.distance/1000).toFixed(1)}}km</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2 class='stodtl_ctrl_pt' @click='toThere'>到这去</v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>
<script>
import storeCar from '../assets/images/store_place.png';
import usCar from '../assets/images/us_place.png';
export default {
    data() {
        return {
            data: {},
            map: "",
            my_point: "",
            store_point: ""
        }
    },
    methods: {
        ready() {
            var that = this
            that.map = new BMap.Map('allmap_0')
            that.map.addControl(new BMap.MapTypeControl())
            that.map.enableScrollWheelZoom(true)
            var storeIcon = new BMap.Icon(storeCar, new BMap.Size(80, 80), { //icon
                anchor: new BMap.Size(40, 54),
                imageSize: new BMap.Size(80, 80),
            });
            var myIcon = new BMap.Icon(usCar, new BMap.Size(65, 70), { //icon
                anchor: new BMap.Size(32, 51),
                imageSize: new BMap.Size(65, 70),
            });
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mypoint = new BMap.Point(r.point.lng, r.point.lat)
                    that.my_point = mypoint
                    var mymarker = new BMap.Marker(mypoint, { icon: myIcon, title: "sss" });
                    that.map.addOverlay(mymarker)
                    that.$api.getShopInfo({ id: localStorage.getItem("shopId"), latitude: r.point.lat, longitude: r.point.lng }).then(res => {
                        that.data = res.data.data
                        var storepoint = new BMap.Point(that.data.longitude, that.data.latitude)
                        that.store_point = storepoint
                        var storemarker = new BMap.Marker(storepoint, { icon: storeIcon, title: "sss" });
                        that.map.addOverlay(storemarker)
                        that.map.centerAndZoom(storepoint, 14)
                    })
                } else {
                    alert('failed' + this.getStatus());
                    that.$api.getShopInfo({ id: localStorage.getItem("shopId") }).then(res => {
                        that.data = res.data.data
                    })
                }
            });
        },
        toThere() {
            var that = this
            var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
            var driving = new BMap.DrivingRoute(that.map, { renderOptions: { map: that.map, autoViewport: true }, policy: routePolicy[0] });
            driving.search(that.my_point, that.store_point);
        }
    },
    mounted() {
        this.ready()
    }
}
</script>
<style>
.stodtl {
    height: 100%;
    padding: 0
}

#allmap_0 {
    height: 100%
}

.anchorBL {
    display: none;
}

.stodtl_ctrl {
    position: fixed;
    bottom: 0;
    background: white;
    font-size: 12px;
    color: #a5a5a5
}

.stodtl_ctrl_nm {
    font-size: 18px;
    font-weight: 500;
    color: black
}

.stodtl_ctrl_pt {
    text-align: center;
    color: #3b9bfe
}

.stodtl_ctrl_pt .v-image {
    display: inline-block
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