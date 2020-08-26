<template>
	<div class="content">
		<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.go(-1)" />
		<div class="main">
			<div class="contactServise" v-html="get_article.content"></div>
		</div>
		<!-- <iframe src="https://www.baidu.com" class="webcon" frameborder="0"></iframe> -->
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			title: this.$route.query.title,
		};
	},
	methods: {
		// 文章
		getdata(v) {
      this.$toast.loading({
				message: "同步数据中",
				duration: 0, // 持续展示
				forbidClick: true,
			});
			this.$axios.get(`article/${v}`).then((res) => {
        console.log(res, `文章`);
        this.$toast.clear();
				if (res.data.code == 1) {
					this.$store.commit("update_article", res.data.data);
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
		},
	},
	created() {
		if (this.$route.query.title == "联系客服") {
			this.getdata(1);
		} else if (this.$route.query.title == "群构架") {
			this.getdata(2);
		} else if (this.$route.query.title == "开群如何盈利") {
			this.getdata(4);
		} else if (this.$route.query.title == "如何充值提现") {
			this.getdata(5);
		} else if (this.$route.query.title == "投诉与建议") {
			this.getdata(5);
			// } else if (this.$route.query.title == "联系群主") {
			// 	this.getdata(6);
			// } else if (this.$route.query.title == "充值") {
			// 	this.getdata(7);
		} else if (this.$route.query.title == "玩法说明") {
			this.getdata(3);
		}
	},
	computed: {
		//文章
		get_article() {
			return this.$store.state.article;
		},
	},

	mounted() {},
	destroyed() {
		this.$store.commit("update_article", {});
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
	}
}
/* .webcon{width: 100vw;height: 100vh;} */
</style>

