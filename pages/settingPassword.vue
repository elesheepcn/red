<template>
  <div class="content">
    <van-nav-bar
      title="密码设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-cell-group>
      <van-cell
        title="修改登录密码"
        size="large"
        arrow-direction="up"
        is-link
        @click="gotoPage(0)"
      />
      <van-cell
        title="修改支付密码"
        size="large"
        arrow-direction="up"
        is-link
        @click="gotoPage(1)"
      />
    </van-cell-group>
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
    gotoPage(params){
      this.$router.push({name:'modifyPassword',params:{type:params}})
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.content {
  background-color: #eee;
  width: 100vw;
  height: 100vh;
}
.van-cell .van-cell__right-icon {
  transform: rotate(90deg);
}
</style>

