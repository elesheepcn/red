<template>
	<div class="content">
		<van-nav-bar title="客服" />
		<van-cell-group class="top">
			<van-cell
				title="联系客服(平台)"
				size="large"
				center
				:icon="require('../assets/relation.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('webView','联系客服')"
			/>
			<van-cell
				title="购买靓号"
				size="large"
				center
				:icon="require('../assets/id.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="$router.push('buy')"
			/>
			<van-cell
				title="群构架"
				size="large"
				center
				:icon="require('../assets/framework.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('webView','群构架')"
			/>
		</van-cell-group>

		<van-cell-group title=" ">
			<van-cell
				title="开群如何盈利"
				size="large"
				center
				:icon="require('../assets/profit.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('webView','开群如何盈利')"
			/>
			<van-cell
				title="如何充值提现"
				size="large"
				center
				:icon="require('../assets/recharge.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('webView','如何充值提现')"
			/>
			<van-cell
				title="投诉与建议"
				size="large"
				center
				:icon="require('../assets/complaint.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="$router.push('complain')"
			/>
		</van-cell-group>
		<!-- <ul class="ii-inside">
      <li>联系客服</li>
      <li>娱乐平台</li>
      <li>群构架</li>
      <li>开群 如何盈利</li>
      <li>如何充值提现？</li>
      <li>投诉与建议</li>
      <li>群ID靓号</li>
      <li>靓号推荐码</li>
		</ul>-->
		<Tabot />
	</div>
</template>

<script>
import Tabot from "../components/tabot";

export default {
	components: {
		Tabot,
	},
	data() {
		return {
			dataList: [],
		};
	},
	methods: {
		gotoPage(params, title) {
			// if (title == "购买靓号") {
			// 	this.$toast.loading({
			// 		message: "数据同步中...",
			// 		forbidClick: true,
			// 	});
			// 	this.$axios.get(`accounts/getGoodsNum`).then((res) => {
			// 		console.log(res, `购买靓号`);
			// 		if (res.data.code == 1) {
			// 			this.$store.commit("update_goodsNum", res.data.data);
			// 		} else {
			// 			this.$toast.fail(res.data.msg);
			// 		}
			// 		this.$toast.clear();
			// 		this.$router.push({
			// 			path: "/webView",
			// 			query: { title: title },
			// 		});
			// 		// this.$router.push({ name: params, params: { title: title } });
			// 	});
			// } else {
			// 	// this.$router.push({ name: params, params: { title: title } });
			// }
			this.$router.push({
				path: "/webView",
				query: { title: title },
			});
		},
		//购买靓号
		buy() {
			this.$toast("功能暂未开通");
		},
	},
	mounted() {},
};
</script>

<style scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
}
.top {
	margin-top: 2vh;
}
.content ul.ii-inside {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90vw;
	margin: auto;
	flex-wrap: wrap;
	padding: 2ex 0;
}
.content ul.ii-inside li {
	display: block;
	width: 43vw;
	height: 7rem;
	line-height: 7rem;
	color: green;
	background-color: #fff;
	border-radius: 5px;
	margin-bottom: 20px;
	text-align: center;
}
</style>
