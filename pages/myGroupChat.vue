<template>
  <div class="content">
    <van-nav-bar
      title="我的群聊"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted(){
    // console.log(this.$route);
  }
};
</script>

<style scoped>
.content {
  background-color: #eee;
  width: 100vw;
  height: 100vh;
}
</style>

