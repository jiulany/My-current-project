<template>
    <router-view></router-view>
</template>
<script>
export default {
    created() {
        this.$router.push('/window/index')
    },
    mounted() {},
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
}

html {
    height: 100%;
}

body {
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
}
#single-keyboard-box{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>