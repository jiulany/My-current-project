<template>
    <v-bottom-nav :value="true" absolute color="white">
        <v-btn color="#fdd000" flat value="recent" @click='toIndex'>
            <span>首页</span>
            <v-img v-if="curPg==1?true:false" :src="require('../assets/images/btm_inx_ac.png')" width='25px'></v-img>
            <v-img v-if="curix" :src="require('../assets/images/btm_inx.png')" width='25px'></v-img>
        </v-btn>
        <v-btn color="#fdd000" flat value="favorites" @click='toStore'>
            <span>商场</span>
            <v-img v-if="curPg==2?true:false" :src="require('../assets/images/btm_store_ac.png')" width='25px'></v-img>
            <v-img v-if="curstore" :src="require('../assets/images/btm_store.png')" width='25px'></v-img>
        </v-btn>
        <v-btn color="#fdd000" flat value="nearby" @click='toMy'>
            <span>我的</span>
            <v-img v-if="curPg==3?true:false" :src="require('../assets/images/btm_me_ac.png')" width='25px'></v-img>
            <v-img v-if="curmy" :src="require('../assets/images/btm_me.png')" width='25px'></v-img>
        </v-btn>
    </v-bottom-nav>
</template>
<script>
export default {
    data() {
        return {
            curPg: null,
            curix: true,
            curstore: true,
            curmy: true,
        }
    },
    created() {
        let a = window.location.href
        if (a.search('/window/index') != -1) {

            this.curPg = 1
            this.curix = false
            this.curstore = true
            this.curmy = true
        }
        if (a.search('/window/store') != -1) {
            this.curPg = 2
            this.curix = true
            this.curstore = false
            this.curmy = true
        }
        if (a.search('/window/myinfo') != -1) {
            this.curPg = 3
            this.curix = true
            this.curstore = true
            this.curmy = false
        }
    },
    methods: {
        toIndex() {
            this.curPg = 1
            this.curix = false
            this.curstore = true
            this.curmy = true
            this.$router.push('/window/index')
        },
        toStore() {
            this.curPg = 2
            this.curix = true
            this.curstore = false
            this.curmy = true
            this.$router.push('/window/store')
        },
        toMy() {
            this.curPg = 3
            this.curix = true
            this.curstore = true
            this.curmy = false
            this.$router.push('/window/myinfo')
        },
    }
}
</script>
<style>
.v-image {
    margin-bottom: 5px
}

.v-item-group.v-bottom-nav--absolute {
    position: fixed;
}
</style>