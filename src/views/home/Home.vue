<template>
  <div class="home">
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    home
  </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          'https://oss999.oss-cn-hongkong.aliyuncs.com/upload/201903211634211654.jpg',
          'https://oss999.oss-cn-hongkong.aliyuncs.com/upload/2019031211003874293.jpg',
          'https://oss999.oss-cn-hongkong.aliyuncs.com/upload/2019031815071397696.jpg',
        ],
      }
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
      }, 1100)
    },
    computed: {},
    components: {},
    destroyed() {

    },
    watch: {},
    methods: {},

  }
</script>

<style lang="less">
  .home {

  }
</style>
