<template>
	<div class="content">
		<van-nav-bar title="投诉与建议" left-text="返回" left-arrow @click-left="$router.go(-1)" />
		<div class="main">
			<!-- 输入 -->
			<div id="msgbox">
				<div
					class="msglist"
					v-for="(item,index) in get_feedbacks"
					:key="index"
					:class="item.name=='客服'?'msglist_L':'msglist_R'"
				>
					<img v-show="item.name!=='客服'" :src="imglist[get_user_info.photo].img_url" alt />
					<img v-show="item.name=='客服'" :src="imglist[6].img_url" alt />
					<div class="dot"></div>
					<div class="msg">
						<div class="name">{{item.name}}</div>
						<div class="txt">{{item.msg}}</div>
					</div>
				</div>
			</div>
			<!-- 输入 -->
			<van-field v-model="sms" center placeholder="请输入投诉与建议">
				<template #button>
					<van-button size="normal" type="primary" @click="send">发送</van-button>
				</template>
			</van-field>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			sms: "",
			flag: true,
		};
	},
	methods: {
		//投诉与建议
		send() {
			if (this.sms != "") {
				this.$store.commit("add_feedbacks", {
					msg: this.sms,
					name: this.get_user_info.name,
				});
				this.$axios
					.post("feedbacks", {
						content: this.sms,
					})
					.then((res) => {
						console.log(res, `投诉与建议`);
						if (res.data.code == 1) {
							this.$store.commit("add_feedbacks", {
								msg: "已收到您的反馈信息!",
								name: "客服",
							});
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
				this.sms = "";
			} else {
				this.$toast.fail("请输入内容");
			}
		},
		// 滚动
		scroll() {
			setTimeout(() => {
				msgbox.scrollTop = msgbox.scrollHeight;
			}, 50);
		},
	},
	created() {},
	mounted() {
		this.scroll();
	},
	computed: {
		get_feedbacks() {
			return this.$store.state.feedbacks;
		},
		// 头像
		imglist() {
			return this.$store.state.img_list;
		},
		//用户详情
		get_user_info() {
			return this.$store.state.user_info;
		},
	},
	updated() {
		this.scroll();
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
		flex: 1;
		overflow-y: scroll;
		text-align: center;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		#msgbox {
			flex: 1;
			flex-direction: column;
			padding: 0 5vw 20px;
			overflow-y: scroll;
			color: #333;
			.msglist {
				width: 100%;
				padding: 20px 0;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				img {
					width: 45px;
					height: 45px;
					border-radius: 10%;
					flex-shrink: 0;
					vertical-align: top;
				}
				.dot {
					content: "";
					position: relative;
					top: 25px;
					width: 0;
					height: 0;
					border-top: 1.5vw solid transparent;
					border-right: 1.5vw solid transparent;
					border-bottom: 1.5vw solid transparent;
					border-left: 1.5vw solid transparent;
				}
				.msg {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					.name {
						font-size: 14px;
						line-height: 15px;
						text-indent: 0.5em;
					}
					.txt {
						max-width: 100%;
						line-height: 20px;
						text-align: left;
						// position: relative;
						// top: 15px;
						padding: 7.5px 10px;
						border-radius: 5px;
						word-break: break-all;
						white-space: normal;
					}
				}
			}
			.msglist_R {
				flex-direction: row-reverse;
				padding-left: 20%;
				.dot {
					border-left: 1.5vw solid #2dcb67;
				}
				.txt {
					background-color: #2dcb67;
				}
				.msg {
					align-items: flex-end;
				}
			}
			.msglist_L {
				padding-right: 20%;
				.dot {
					border-right: 1.5vw solid #fff;
				}
				.txt {
					background-color: #fff;
				}
			}
		}
	}
}
</style>

