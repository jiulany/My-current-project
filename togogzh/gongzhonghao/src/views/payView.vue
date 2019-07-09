<template>
<div v-html='pay'>
    
</div>
</template>
<script>
export default {
data(){
    return{
        pay:this.$store.state.payData.data
    }
}
}
</script>
<style>

</style>