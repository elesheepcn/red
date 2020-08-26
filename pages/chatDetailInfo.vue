<template>
	<!-- 聊天信息 -->
	<div class="content">
		<!-- <van-nav-bar :title="$route.query.title" left-text="返回" left-arrow @click-left="onClickLeft" fixed /> -->
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" center fixed>
			<template #title>
				<span id="nav_bar_title">{{get_group_info.name}}</span>
			</template>
		</van-nav-bar>
		<van-cell-group class="group" :border="false">
			<van-cell>
				<template #title>
					<ul class="avatarBox">
						<li v-for="(item,index) in get_group_info.users" :key="index">
							<van-image
								v-show="item.uid==get_user_info.uid"
								width="45px"
								height="45px"
								radius="10%"
								:src="imglist[get_user_info.photo].img_url"
							/>
							<van-image
								v-show="item.uid!==get_user_info.uid"
								width="45px"
								height="45px"
								radius="10%"
								:src="imglist[item.photo].img_url"
							/>
							<div class="van-ellipsis" :class="item.uid==get_user_info.uid?'me':''">{{item.name}}</div>
							<div class="dot" v-if="item.role!=''">{{item.role}}</div>
						</li>
						<li @click="copy">
							<img src="../assets/add1.svg" alt />
							<!-- <van-icon name="plus" size="40px" color="#2dcb67" /> -->
							<div class="van-ellipsis">添加成员</div>
						</li>
					</ul>
					<div class="custom-title" v-show="get_group_info.users.length>20" @click="unfold">查看全部成员</div>
				</template>
			</van-cell>
			<!-- <p class="all" v-show="">查看全部群成员</p> -->
		</van-cell-group>
		<van-cell-group title=" " :border="false">
			<div class="box" @click="saveCon('修改群聊名称',0,get_group_info.name)">
				<span class="left">群聊名称</span>
				<div class="right">
					<span class="value">{{get_group_info.name}}</span>
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>
			<div class="box" @click="copy">
				<span class="left">分享群聊</span>
				<div class="right">
					<!-- <span class="value">{{get_group_info.id}}</span> -->
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>
			<div class="box" @click="gotoPage('menbers','我的下级')">
				<span class="left">我的下级</span>
				<div class="right">
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>
			<div class="box" @click="open">
				<span class="left">申请股东</span>
				<div class="right">
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>

			<div class="noticebox" @click="saveCon('修改群公告',1,get_group_info.notice)">
				<!-- <span class="left">群公告</span> -->
				<div class="left">
					<p>群公告</p>
					<p>{{get_group_info.notice}}</p>
				</div>
				<div class="right">
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>
			<div class="noticebox" @click="saveCon('修改群须知',2,get_group_info.attentions)">
				<div class="left">
					<p>群须知</p>
					<p>{{get_group_info.attentions}}</p>
				</div>
				<div class="right">
					<van-icon name="arrow" color="#969799" />
				</div>
			</div>
		</van-cell-group>
		<van-cell-group title=" " :border="false">
			<div class="adminInfo">
				<p class="title">本群管理员联系方式(QQ)</p>
				<p v-for="(item,index) in list" :key="index" @click="copy_fun(item.qq,item.name+'QQ')">
					<span>{{item.name}}:{{item.qq}}</span>
					<van-icon name="add-o" color="#2dcb67" />
				</p>
			</div>
		</van-cell-group>
		<van-cell-group title=" " :border="false">
			<van-cell title="奖励规则">
				<template #label>
					<van-row
						v-for="(item,index) in get_rule_list"
						:key="index"
						type="flex"
						justify="space-between"
						align="center"
					>
						<van-col span="8">{{item.remark}}</van-col>
						<van-col span="8">{{item.money}}</van-col>
						<!-- <van-col span="8">88.88</van-col> -->
					</van-row>
				</template>
			</van-cell>
		</van-cell-group>
		<van-cell-group :border="false">
			<div style="margin: 16px 0;">
				<van-button type="primary" block @click="quitGroup">
					<span v-show="get_group_info.uid==get_user_info.uid">解散本群</span>
					<span v-show="get_group_info.uid!==get_user_info.uid">退出本群</span>
				</van-button>
			</div>
		</van-cell-group>

		<van-dialog v-model="showGroupName" :title="title" show-cancel-button @confirm="saveGroupName">
			<van-field
				v-model="groupName"
				placeholder="在此输入内容"
				type="textarea"
				rows="3"
				maxlength="50"
				show-word-limit
				clearable
			/>
		</van-dialog>
		<van-overlay :show="show" @click="show = false">
			<div class="wrapper">
				<div class="block" @click.stop>功能暂未开通</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			show: false,
			curedit: 0, //当前编辑项
			showGroupName: false, //是否展示弹框
			title: "", //弹框标题
			groupName: "", //群名称
			switchChecked: false, //开关打开关闭
			members_list: [
				{ name: "hjhjh", img_url: require("../assets/head_img@3x.png") },
				{ name: "uu", img_url: require("../assets/head_img@3x.png") },
				{ name: "jghj", img_url: require("../assets/head_img@3x.png") },
				{ name: "ojjo", img_url: require("../assets/head_img@3x.png") },
				{ name: "ljl", img_url: require("../assets/head_img@3x.png") },
			], //群成员列表
			group_info: {}, //群详情
			list: [
				{ name: "群主", qq: 54784619 },
				{ name: "财务", qq: 446194466 },
				{ name: "客服(群)", qq: 979972956 },
			],
		};
	},
	created() {
		this.getrule();
		this.group_info = JSON.parse(JSON.stringify(this.get_group_info)); //深拷贝
	},
	computed: {
		get_group_info() {
			return this.$store.state.group_info;
		},
		get_user_info() {
			return this.$store.state.user_info;
		},
		get_rule_list() {
			return this.$store.state.rule_list;
		},
		imglist() {
			return this.$store.state.img_list;
		},
	},
	methods: {
		onClickLeft() {
			this.$router.push("/chatDetail");
		},
		open() {
			// this.show = true;
			this.copy_fun(5646646, "群主联系方式(QQ)");
			this.$dialog
				.alert({
					message: "群主QQ已复制到粘贴板",
				})
				.then(() => {
					// on close
				});
		},
		// 展开群成员
		unfold() {
			this.$router.push("/group_team");
		},
		gotoPage(params, title) {
			this.$router.push({ name: params, params: { title: title } });
		},
		//奖励规则
		getrule() {
			this.$axios.get(`bill/award`).then((res) => {
				console.log(res, `奖励规则`);
				if (res.data.code == 1) {
					this.$store.commit("update_rule_list", res.data.data);
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
		},
		// 编辑群信息
		saveCon(params, index, value) {
			if (this.get_group_info.uid == this.get_user_info.uid) {
				// if (index == 0) {
				// 	this.groupName = this.group_info.name;
				// } else if (index == 1) {
				// 	this.groupName = this.group_info.notice;
				// } else {
				//   }
				this.groupName = value;
				this.showGroupName = true;
				this.title = params;
				this.curedit = index;
			} else {
				this.$toast.fail("请联系群主修改");
			}
		},
		//编辑
		edit() {
			this.$axios
				.patch("groups", {
					name: this.group_info.name,
					notice: this.group_info.notice,
					attentions: this.group_info.attentions,
					wx: this.group_info.wx,
					group_id: this.group_info.id,
				})
				.then((res) => {
					console.log(res, `编辑群信息`);
					this.$toast.success("保存成功");
					if (res.data.code == 1) {
						this.$axios.$get(`groups/${this.group_info.id}`).then((res) => {
							console.log(res, "群详情");
							if (res.code == 1) {
								this.$store.commit("update_group_info", res.data);
							} else {
								this.$toast.fail(res.msg);
							}
						});
					} else {
						// this.$toast.fail(res.data.msg);
					}
				});
		},
		// 弹出提示框
		saveGroupName() {
			// if (this.groupName == "") {
			// 	this.$toast("未做任何更改");
			// 	return false;
			// } else {
			if (this.curedit == 0) {
				this.group_info.name = this.groupName;
			} else if (this.curedit == 1) {
				this.group_info.notice = this.groupName;
				// let msg = {
				// 	group_id: this.get_group_info.id,
				// 	data: this.groupName,
				// 	type: 'notice',
				// };
				// this.$store.commit("add_msg_list", msg);
			} else {
				this.group_info.attentions = this.groupName;
			}
			this.edit();
			// }
		},
		// 退出群聊
		quitGroup() {
			this.$dialog
				.confirm({
					message: "您确定要删除并退出此群吗？",
				})
				.then(() => {
					// 删除群聊
					this.$axios.delete(`groups/${this.get_group_info.id}`).then((res) => {
						console.log(res, "退出群聊");
						if (res.data.code == 1) {
							this.$toast.success("已退出该群");
							this.$router.push("/");
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
				})
				.catch(() => {
					this.$toast.fail("已取消");
				});
		},
		// 分享群聊
		copy() {
			let url = "www.xxx.com";
			this.copy_fun(
				`某聊下载地址:${url}\n群ID:${this.get_group_info.id}\n邀请码:${this.get_user_info.invite_code}`,
				"群"
			);
		},
		// 点击复制
		copy_fun(copy, name) {
			let oInput = document.createElement("input");
			oInput.value = copy;
			document.body.appendChild(oInput);
			oInput.select(); // 选择对象;
			console.log(oInput.value);
			document.execCommand("Copy"); // 执行浏览器复制命令
			oInput.remove();
			if (name == "群") {
				let url = "www.xxx.com";
				this.$dialog.alert({
					message: `某聊下载地址:${url}\n群ID:${this.get_group_info.id}\n邀请码:${this.get_user_info.invite_code}\n已复制`,
				});
			} else if (name == "群主联系方式(QQ)") {
				return false;
			} else {
				this.$toast(`${name}已复制到粘贴板`);
			}
		},
	},
	mouted() {
		console.log(0);
		console.log(this.$route);
	},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	#nav_bar_title {
		font-weight: normal !important;
	}
	.group {
		margin-top: 8vh;
		.van-cell {
			padding: 1vh 2vw;
		}
		.all {
			text-align: center;
			color: #999;
			line-height: 5vh;
		}
	}
	.box {
		padding: 12px 16px;
		border-bottom: 1px solid #ebedf0;
		color: #969799;
		font-size: 14px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.left {
			width: 30%;
			font-size: 16px;
			color: #323233;
		}
		.right {
			width: 70%;
			text-align: right;
		}
	}
	.adminInfo {
		padding: 12px 16px;
		background-color: #fff;
		border-bottom: 1px solid #ebedf0;
		font-size: 16px;
		color: #969799;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		line-height: 30px;
		.title {
			color: #323233;
		}
		p {
			display: flex;
			align-items: center;
			span {
				margin-right: 10px;
			}
		}
	}
	.noticebox {
		padding: 12px 16px;
		border-bottom: 1px solid #ebedf0;
		color: #969799;
		font-size: 14px;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		.left {
			width: 90%;
			font-size: 16px;
			color: #323233;
			p:last-child {
				color: #969799;
				font-size: 14px;
			}
		}
		.right {
			width: 10%;
			margin-top: 5px;
			text-align: right;
		}
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.block {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
}
.van-cell .van-cell__right-icon {
	transform: rotate(90deg);
}
.van-col {
	line-height: 2rem;
	text-align: center;
	font-size: 0.9rem;
}
// 群成员
.avatarBox {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	li {
		width: 17.5%;
		display: inline-block;
		text-align: center;
		margin: 1.5vh 1vw;
		position: relative;
		.me {
			color: #2dcb67;
		}
		.dot {
			position: absolute;
			top: -5px;
			right: 0;
			// width: 30px;
			// height: 20px;
			padding: 0 5px;
			margin: 0;
			border-radius: 3px;
			font-size: 12px;
			color: #fff;
			background-color: rgba($color: #2dcb67, $alpha: 0.5);
		}
	}
}
.custom-title {
	display: inline-block;
	text-align: center;
	width: 100%;
	color: #999;
	font-size: 1rem;
}
</style>
