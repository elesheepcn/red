<template>
	<div class="content">
		<div class="navBar">
			<div class="name">某聊</div>
			<div class="icon">
				<img src="../assets/search.svg" alt class="iconAddTop" @click="onFocus" />
				<!-- <van-icon name="search" color="#2dcb67" size="24" class="iconAddTop" @click="onFocus" /> -->
				<van-icon
					name="add-o"
					color="#2dcb67"
					size="22"
					class="iconAddTop"
					@click="gotoPage('createChatGroup')"
				/>
			</div>
		</div>
		<!-- <van-nav-bar class="searchwidth">
			<template #title>
				<van-icon name="search" size="22" class="iconAddTop" @click="onFocus" />
			</template>
			<template #right>
				<van-icon name="add-o" size="22" class="iconAddTop" @click="gotoPage('createChatGroup')" />
			</template>
		</van-nav-bar>-->
		<div class="whitespace">
			<van-cell
				title="通知助手"
				:icon="require('../assets/serviseMsg.png')"
				class="iconCustom"
				label="入群申请列表"
				size="large"
				@click="gotoPage('/serviseMsg')"
				clickable
			/>
			<!-- <van-cell-group v-for="(item,index) in get_group_list" :key="index" :border="false">
				<van-cell
					:title="item.name"
					:icon="require('../assets/group.svg')"
					class="iconCustom"
					:label="label"
					size="large"
					@click="openinfo(item.id)"
					clickable
				/>
			</van-cell-group>-->
			<div class="groupList">
				<div class v-for="(item,index) in get_group_list" :key="index" @click="openinfo(item.id)">
					<img src="../assets/group.svg" alt />
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<Tabot />
		<van-overlay :show="show" @click="show = false">
			<div class="wrapper">
				<div class="block" @click.stop>
					<span class="title">请输入群ID和邀请码</span>
					<input class="Invitation" type="number" v-model="group_id" name id placeholder="请输入群ID" />
					<input class="Invitation" type="text" v-model="invite_code" name id placeholder="请输入邀请码" />
					<button @click="onSearch">申请加入</button>
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
			invite_code: "", //邀请码
			show: false,
			label: "有新的红包",
			time: "11:23",
			badge: 5,
			timer: null, //定时器
		};
	},
	created() {
		if (!localStorage.getItem("user")) {
			this.$router.push("/login");
		} else if (
			JSON.parse(localStorage.getItem("user")).mobile == "" ||
			JSON.parse(localStorage.getItem("user")).password == ""
		) {
			this.$router.push("/login");
		} else {
			this.get_groups();
		}
		// console.log(location.hash);
		// console.log(location.host);
		// console.log(location.hostname);
		// console.log(location.href);
		// console.log(location.pathname);
		// console.log(location.port);
		// console.log(location.protocol);
	},
	mounted() {
		this.$store.commit("setCurrentRouterName", { name: "index" });
		this.timer = setInterval(() => {
			this.get_groups();
		}, 30000);
	},
	computed: {
		// 群列表
		get_group_list() {
			return this.$store.state.group_list;
		},
		// 用户详情
		get_user_info() {
			return this.$store.state.user_info;
		},
		// 群时间
		get_leave_date() {
			return this.$store.state.leave_date;
		},
		// 群时间id
		get_leave_date_id() {
			return this.$store.state.leave_date_id;
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
					invite_code: this.invite_code,
					name: this.get_user_info.name,
					mobile: this.get_user_info.mobile,
					photo: this.get_user_info.photo,
				})
				.then((res) => {
					this.group_id = "";
					this.invite_code = "";
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
		// 获取群聊详情
		openinfo(id) {
			this.$toast.loading({
				message: "同步群聊数据中",
				duration: 0, // 持续展示 toast
				forbidClick: true,
			});
			// let timer = setTimeout(() => {
			// 	this.$toast.clear();
			// 	this.$toast.fail("登录超时,请稍后重试");
			// }, 9000);
			this.$axios.get(`groups/${id}`).then((res) => {
				console.log(res, "获取群聊详情");
				if (res.data.code == 1) {
					this.$store.commit("update_group_info", res.data.data);
					this.$router.push("/chatDetail");
					//读取红包列表
					// let leave_date = 0;
					// for (let item of this.get_leave_date) {
					// 	if (res.data.data.id == item.group_id) {
					// 		leave_date = item.leave_date;
					// 		this.$toast.clear();
					// 		this.$router.push("/chatDetail");
					// this.$axios
					// 	.get(`reds/${res.data.data.id}/${leave_date}`)
					// 	.then((res_1) => {
					// 		console.log(res_1, `请求红包列表`);
					// 		// clearInterval(timer);
					// 		if (res_1.data.code == 1) {
					// 			this.$toast.clear();
					// 			this.$store.commit(
					// 				"update_group_reds_list",
					// 				res_1.data.data
					// 			);
					// 			this.$router.push("/chatDetail");
					// 		} else {
					// 			this.$toast.fail(res_1.data.msg);
					// 		}
					// 	});
					// }
					// }
				} else {
					this.$toast.clear();
					this.$toast.fail(res.data.msg);
				}
			});

			// .catch((err) => {
			// 	if (err.response.status == 401) {
			// 		// this.$router.push("/login");
			// 		this.login();
			// 	}
			// });
		},
		//获取群聊列表
		get_groups() {
			this.$axios.get(`groups`).then((res) => {
				console.log(res, "获取群聊列表");
				if (res.data.code == 1) {
					this.$store.commit("update_group_list", res.data.data.reverse());
					for (let item_group of res.data.data) {
						if (!this.get_leave_date_id.includes(item_group.id)) {
							let obj = {
								group_id: item_group.id,
								leave_date: new Date().getTime(),
							};
							this.$store.commit("set_leave_date", obj); //设置时间戳
							this.$store.commit("update_leave_date_id", item_group.id); //更新时间戳
							this.$store.commit("set_group_reds_list", {
								//设置群聊红包列表
								group_id: item_group.id,
								list: [],
							});
						}
					}
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
			// .catch((err) => {
			// 	if (err.response.status == 401) {
			// 		this.login();
			// 	}
			// });
		},
		// 自动登录
		login() {
			this.$toast.clear();
			this.$axios
				.post("members/login", {
					mobile: JSON.parse(localStorage.getItem("user")).mobile,
					password: JSON.parse(localStorage.getItem("user")).password,
				})
				.then((res_jwt) => {
					// 保存用户信息
					localStorage.setItem(
						"Authorization",
						`${res_jwt.data.data.token_type} ${res_jwt.data.data.access_token}`
					);
					Toast.success("服务重连成功");
				})
				.catch((err) => {
					if (err.response.status == 401) {
						this.$router.push("/login");
						// this.login();
					}
				});
			// if (localStorage.getItem("user")) {
			// } else {
			// 	this.$router.push("/login");
			// }
		},
	},
	destroyed() {
		clearInterval(this.timer);
	},
};
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	.van-search {
		padding: 5px 12px;
	}
	.whitespace {
		width: 100%;
		height: 100%;
		padding-top: 2vh;
		padding-bottom: 50px;
		overflow-y: scroll;
		flex: 1;
	}
	.navBar {
		width: 100%;
		height: 46px;
		padding: 0 4vw;
		background-color: #fff;
		// position: fixed;
		// top: 0;
		// left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.van-icon {
			margin-left: 2vw;
		}
		.icon {
			img {
				width: 24px;
				vertical-align: top;
			}
		}
	}
	.groupList {
		width: 100%;
		background-color: #fff;
		padding: 0 16px;
		div {
			width: 100%;
			height: 69px;
			padding: 12px 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #f6f6f6;
			img {
				width: 45px;
				height: 45px;
				vertical-align: top;
			}
			span {
				text-indent: 0.5em;
			}
		}
	}
	.groupList > div:last-child {
		border: 0 !important;
	}
	.searchwidth .van-nav-bar__title {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
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
		padding: 3vh 10vw;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.title {
			font-weight: bold;
		}
		input {
			display: inline-block;
			width: 100%;
			height: 40px;
			border-radius: 5px;
			text-align: center;
			border: 0;
			background-color: #eee;
		}
		button {
			width: 100%;
			height: 40px;
			border-radius: 5px;
			color: #fff;
			background-color: #2dcb67;
			border: 0;
		}
	}
}
</style>
