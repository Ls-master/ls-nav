<template>
    <div id="main" ref="main">
        <!-- 顶导测试
        <div ref="logo"></div> -->
    </div>
</template>

<script>
import base from './base'
import main from './webComponents/main'
import NavLogo from './webComponents/logo';

export default {
    name: 'ls-nav',
    mounted() {
        window.NavLogo = NavLogo;
        console.log('----vue done----');
        
        let options = JSON.stringify({imgSrc: "assets/loading.gif"})
        
        base.exec(main, this, null);
        this.$refs.main.innerHTML = `<main-nav options='${options}'/>`;
    }
}
</script>

<style>

</style>
