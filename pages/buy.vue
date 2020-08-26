<template>
	<div class="content">
		<van-nav-bar title="购买靓号" left-text="返回" left-arrow @click-left="$router.go(-1)" />
		<div class="main">
      <p class="hint">靓号信息仅供展示,具体以咨询客服为准!</p>
			<div class="goodNum">
				<div class="list" v-for="(item,index) in get_goodsNum" :key="index">
					<span>{{item.num}}</span>
					<button @click="buy(index)">购买</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	methods: {
		//购买
		buy(i) {
      console.log(i);
			this.$toast.fail(`请联系客服购买`);
		},
	},
	created() {
		this.$axios.get("accounts/getGoodsNum").then((res) => {
			console.log(res, `购买靓号`);
			if (res.data.code == 1) {
				this.$store.commit("update_goodsNum", res.data.data);
			} else {
				this.$toast.fail(res.data.msg);
			}
		});
	},
	computed: {
		//购买靓号
		get_goodsNum() {
			return this.$store.state.goodsNum;
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	padding: 0;
	display: flex;
	flex-direction: column;
	.main {
		width: 100vw;
		height: 100%;
		padding-top: 15px;
		flex: 1;
		overflow-y: scroll;
		text-align: center;
		background-color: #eee;
		overflow: scroll;
    // 提示
    .hint{
      color: #666;
    }
		// 靓号
		.goodNum {
			.list {
				width: 100%;
				height: 5vh;
				padding: 0 5vw;
				background-color: #fff;
				margin-bottom: 1vh;
				display: flex;
				justify-content: space-between;
				align-items: center;
				button {
					width: 15vw;
					border: 0;
					border-radius: 10%;
					color: #fff;
					background-color: #2dbc67;
				}
			}
		}
	}
}
</style>

