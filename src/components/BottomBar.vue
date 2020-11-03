<template>
  <div class="bottom">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">行情</van-tabbar-item>
      <van-tabbar-item icon="friends-o">交易</van-tabbar-item>
      <van-tabbar-item icon="setting-o">闪兑</van-tabbar-item>
      <van-tabbar-item icon="setting-o">资产</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
  import {connect} from '@/api/util'

  export default {
    name: "bottom-bar",
    data() {
      return {
        active: 0,
      };
    },
    methods: {
      /**
       * @disc: url 连接
       * @params: name, parameter, type
       * @date: 2019-08-22 14:26
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .bottom {

  }
</style>
