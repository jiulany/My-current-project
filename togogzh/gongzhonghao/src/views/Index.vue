<template>
    <div class="main">
        <router-view></router-view>
        <BottomNav></BottomNav>
    </div>
</template>
<script>
import BottomNav from '../components/BottomNav.vue'
export default {
    components: {
        BottomNav
    },
}
</script>
<style>
.main{
    height: 100%
}
</style>