<template>
  <div id="app" class="app">
    <router-view>
    </router-view>
    <BottomBar>
    </BottomBar>
  </div>
</template>

<script>
  import BottomBar from '@/components/BottomBar'
  export default {
    components: {BottomBar},
    methods: {}
  }
</script>

<style lang="less">
  @import "assets/css/base.less";

  .app {
    background-color: #ffffff;
  }
</style>
