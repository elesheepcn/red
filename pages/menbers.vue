<template>
	<div class="content">
		<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" center fixed />
		<!-- <van-cell-group :border="false">
			<van-cell v-for="(item,index) in get_subordinate_list" :key="index" center clickable>
				<van-image :src="imglist[item.photo].img_url" width="45px" radius="10%" />
				<span>{{item.name}}</span>
			</van-cell>
		</van-cell-group>-->

		<van-cell-group :border="false">
			<van-cell
				v-for="(item,index) in get_subordinate_list"
				:key="index"
				:title="item.name+'  ('+item.mobile+')'"
				:icon="imglist[item.photo].img_url"
				class="iconCustom"
				:label="item.group_name+'  '+item.updated_at"
				size="large"
				clickable
			/>
		</van-cell-group>
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
			title: this.$route.params.title,
			value: "",
			dataList: [
				{
					id: 1,
					name: "张三",
					label: "ru3vfiefefefehfefefiehufebfeijfiefheife",
					time: "11:23",
				},
				{
					id: 2,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
			],
		};
	},
	created() {
		this.get_subordinate();
	},
	computed: {
		get_group_info() {
			return this.$store.state.group_info;
		},
		// 下级列表
		get_subordinate_list() {
			return this.$store.state.subordinate_list;
		},
		// 头像
		imglist() {
			return this.$store.state.img_list;
		},
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		onSearch() {
			this.$router.push("/search");
		},
		gotoPage(params) {
			this.$router.push(params);
		},
		// 获取下级
		get_subordinate() {
      this.$toast.loading({
				message: "同步数据中",
				duration: 0, // 持续展示
				forbidClick: true,
			});
			this.$axios
				.get(`groups/subordinate?group_id=${this.get_group_info.id}`)
				.then((res) => {
          console.log(res, "下级");
          this.$toast.clear();
					if (res.data.code == 1) {
						this.$store.commit("update_subordinate_list", res.data.data);
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
		},
	},
	mouted() {},
	destroyed() {
		this.$store.commit("update_subordinate_list", []);
	},
};
</script>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
  background-color: #eee;
}
.van-cell-group {
	margin-top: 46px;
  background-color: #fff;
}
.van-icon,
.van-image {
	vertical-align: middle;
}
</style>
