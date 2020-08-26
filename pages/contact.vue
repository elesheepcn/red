<template>
	<!--  -->
	<div class="content">
		<van-nav-bar class="searchwidth">
			<template #title>
				<van-search placeholder="点此申请进群" @focus="onFocus" readonly input-align="center" shape="round" />
			</template>
			<template #right>
				<van-icon name="add-o" size="22" class="iconAddTop" @click="gotoPage('createChatGroup')" />
			</template>
		</van-nav-bar>

		<van-cell-group class="group" :border="false">
			<van-cell @click="gotoPage('groupList')" clickable>
				<van-icon :name="require('../assets/group.svg')" size="45px" />
				<span>群聊</span>
			</van-cell>
		</van-cell-group>

		<van-cell-group class="topbar">
			<van-index-bar>
				<van-index-anchor index="A" />
				<van-cell v-for="(item,index) in dataList_A" :key="index" center clickable>
					<!-- @click="gotoPage('chatDetail')" -->
					<van-image :src="imglist[item.photo].img_url" width="45px" radius="10%" />
					<span>{{item.name}}</span>
				</van-cell>
				<van-index-anchor index="B" />
				<van-cell v-for="(item,index) in dataList_B" :key="index" center clickable>
					<!-- @click="gotoPage('chatDetail')" -->
					<van-image :src="imglist[item.photo].img_url" width="45px" radius="10%" />
					<span>{{item.name}}</span>
				</van-cell>
				<van-index-anchor index="C" />
				<van-cell v-for="(item,index) in dataList_C" :key="index" center clickable>
					<!-- @click="gotoPage('chatDetail')" -->
					<van-image :src="imglist[item.photo].img_url" width="45px" radius="10%" />
					<span>{{item.name}}</span>
				</van-cell>
			</van-index-bar>
		</van-cell-group>
		<Tabot />
		<van-overlay :show="show" @click="show = false">
			<div class="wrapper">
				<div class="block" @click.stop>
					<p class="title">请输入群ID和邀请码</p>
					<p>
						<span>群ID&emsp;</span>
						<input class="Invitation" type="number" v-model="group_id" name id placeholder="请输入群ID" />
					</p>
					<p>
						<span>邀请码</span>
						<input class="Invitation" type="text" v-model="Invitation" name id placeholder="请输入邀请码" />
					</p>
					<p>
						<button @click="onSearch">申请加入</button>
					</p>
				</div>
			</div>
		</van-overlay>
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
			group_id: "", //群ID
			Invitation: "", //邀请码
			show: false,
			dataList_A: [
				{
					id: 1,
					photo: 5,
					name: "张三",
					label: "ru3vfiefefefehfefefiehufebfeijfiefheife",
					time: "11:23",
				},
				{
					id: 2,
					photo: 1,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
			],
			dataList_B: [
				{
					id: 2,
					photo: 1,
					name: "王五",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 2,
					name: "二狗",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 3,
					name: "二狗",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
			],
			dataList_C: [
				{
					id: 2,
					photo: 4,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 6,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 3,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 0,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 0,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 3,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
				{
					id: 2,
					photo: 5,
					name: "李四",
					label: " mnbvdwhdiwudgyfwdwdihwugdywdwhduwydwdw",
					time: "10:23",
				},
			],
		};
	},
	computed: {
		imglist() {
			return this.$store.state.img_list;
		},
		get_user_info() {
			return this.$store.state.user_info;
		},
	},
	methods: {
		onFocus() {
			this.show = true;
		},
		onSearch() {
			this.show = false;
			this.$axios
				.post(`groups/joinGroup`, {
					group_id: this.group_id,
					Invitation: this.Invitation,
					name: this.get_user_info.name,
					mobile: this.get_user_info.mobile,
					photo: this.get_user_info.photo,
				})
				.then((res) => {
					this.group_id = "";
					this.Invitation = "";
					console.log(res, "获取群详情");
					if (res.data.code == 1) {
						this.$toast.success("申请成功,请等待管理员审核");
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
		},
		gotoPage(params) {
			this.$router.push(params);
		},
	},
	mounted() {},
};
</script>

<style lang="scss"  scoped>
.content {
	padding: 0;
}
.van-icon,
.van-image {
	vertical-align: middle;
}
.group{
  margin-top: 2vh ;
}
.van-search {
	padding: 6px 12px;
}
.van-index-anchor {
	line-height: 46px;
}
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.block {
	width: 80%;
	height: 240px;
	padding: 20px 0;
	border-radius: 10px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.title {
		font-weight: 500;
	}
	p {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center !important;
		span {
			margin-right: 5%;
		}
		.Invitation {
			display: inline-block;
			width: 60%;
			height: 40px;
			border-radius: 5px;
			text-align: center;
			border: 0;
			background-color: #eee;
		}
		button {
			width: 80%;
			height: 40px;
			border-radius: 5px;
			color: #fff;
			background-color: #2dcb67;
			border: 0;
		}
	}
}
</style>
