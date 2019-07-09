<template>
    <div style="display: inline-block" @click='sele'>
        <v-img v-if="count" style='display: inline-block' :src="require('../assets/images/checked.png')" width='23px' touchstart></v-img>
        <v-img v-else style='display: inline-block' :src="require('../assets/images/checked_no.png')" width='23px' touchstart></v-img>
    </div>
</template>
<script>
export default {
    props: ["itm_data", "is_sele", "label"],
    created() {
        this.count = this.is_sele
    },
    data() {
        return {
            count: null,
        }
    },
    methods: {
        sele() {
            this.count = !this.count
            this.$emit("curValue", { cur: this.count, data: this.itm_data, label: this.label })
        }
    },
    watch: {
        is_sele(val) {
            this.count = val == 'true' ? true : false
        }
    }
}
// 事件:
//  curValue 抛出当前是否选择（true/false）
</script>
<style>
</style>