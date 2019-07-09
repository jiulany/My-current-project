<template>
    <v-carousel :height='height' :hide-controls="hideControls" :interval='interval'>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" @click='itemAc(item)'>
            
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    props: ["height", "hideControls","interval","itemsp"],
    data() {
        return {
            items: [
            ]
        }
    },
    created(){
        this.items=this.itemsp
    },
    methods:{
        itemAc(val){
            this.$router.push(val.tourl)
        }
    }
}
</script>
<style>
</style>