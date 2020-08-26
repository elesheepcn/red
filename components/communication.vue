<template>
  <div class="tt-main">
  <van-index-bar>
    <view>
      <van-cell title="文本" />
    </view>
</van-index-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
body{background-color: #f8efef;}
.tt-main{width: 100vw;height: 15vh;padding-left: 4vw;}
.tt-main h3{font-weight: 400;font-size: 1rem;margin-bottom: 1vh}
.tt-main .tt-one h4{font-weight: 400;position: absolute; top: 8%;font-size: .8rem;display: inline-block;width: 29vw;}
.tt-one h2{display: inline-block;font-weight: 400;position: absolute; top: 4%;font-size: 1rem;width: 5vw;}
</style>

