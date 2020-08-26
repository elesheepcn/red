<template>
	<div class="content">
		<van-nav-bar title="我的群聊" left-text="返回" fixed left-arrow @click-left="onClickLeft"></van-nav-bar>
		<div class="whitespace">
			<!-- <van-cell-group v-for="(item,index) in get_group_list" :key="index">
				<van-cell
					:title="item.name"
					:icon="require('../assets/head_img@3x.png')"
					class="iconCustom"
					:label="label"
					size="large"
					@click="gotoPage('chatDetail')"
					clickable
				/>
				<i class="badgeNum">{{badge}}</i>
			</van-cell-group>-->
			<div class v-for="(item,index) in get_group_list" :key="index" @click="openinfo(item.id)">
				<img src="../assets/group.svg" alt />
				<span>{{item.name}}</span>
			</div>
		</div>
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
			value: "",
			label: "ru3vfiefefefehfefefiehufebfeijfiefheife",
			time: "11:23",
			badge: 5,
		};
	},
	mounted() {},
	computed: {
		get_group_list() {
			return this.$store.state.group_list;
		},
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		onSearch() {
			console.log(5);
		},
		gotoPage(params) {
			this.$router.push(params);
		},
		openinfo(id) {
			this.$axios
				.$get(`groups/${id}`)
				.then((res) => {
					console.log(res, "打开群聊");
					if (res.code == 1) {
						this.$store.commit("update_group_info", res.data);
					} else {
						this.$toast.fail(res.msg);
					}
				})
				.then(() => {
					this.$axios.get(`reds/${id}`).then((res_reds) => {
						console.log(res_reds, "红包列表");
						if (res_reds.data.code == 1) {
							this.$router.push("/chatDetail");
							this.$store.commit("update_reds_list", res_reds.data.data);
						} else {
							this.$toast.fail(res_reds.data.msg);
						}
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 8vh 0;
	.whitespace {
		width: 100%;
		div {
			width: 90%;
			padding: 10px 0;
			margin: 0 auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #ebedf0;
			img {
				width: 40px;
				margin-right: 3vw;
				vertical-align: top;
			}
		}
	}
}
</style>
