<template>
	<div class="content">
		<van-nav-bar title="个人设置" left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- <van-cell-group>
			<van-cell title="账号" size="large" value="836r38fgfgj" />
			<van-cell title="手机号" size="large" value="mobile" />
			<van-cell title="修改密码" size="large" arrow-direction="up" is-link @click="gotoPage" />
		</van-cell-group>-->
		<div class="group">
			<div>
				<span>账号</span>
				<span>{{get_user_info.name}}</span>
			</div>
			<div>
				<span>手机号</span>
				<span>{{get_user_info.mobile}}</span>
			</div>
			<div @click="gotoPage('getSmsCode',0)">
				<span>修改登录密码</span>
				<img src="../assets/open.png" alt />
			</div>
			<div @click="gotoPage('getSmsCode',1)">
				<span v-show="get_user_info.pay_pwd">修改支付密码</span>
				<span v-show="!get_user_info.pay_pwd">设置支付密码</span>
				<img src="../assets/open.png" alt />
			</div>
		</div>
		<div style="margin: 16px;">
			<van-button type="primary" block @click="logout">退出登录</van-button>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			userinfo: {},
		};
	},
	computed: {
		get_user_info() {
			return this.$store.state.user_info;
		},
	},
	created() {},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		gotoPage(params, type) {
      this.$router.push({
				path: params,
				query: { type: type },
			});
			// this.$router.push({ name: params, params: { type: type } });
		},
		// 退出登录
		logout() {
			this.$dialog
				.confirm({
					message: "您确定要退出登录吗？",
				})
				.then(() => {
					localStorage.setItem(
						"user",
						JSON.stringify({
							mobile: "",
							password: "",
						})
					); //初始化账号
					// localStorage.setItem("Authorization", ""); //初始化jwt
					this.$router.push("login");
					// this.$axios
					// 	.$patch(`groups/${sessionStorage.getItem("id")}`)
					// 	.then((res) => {
					// 		console.log(res);
					// 		localStorage.setItem("Authorization", ""); //初始化jwt
					// 		this.$toast("退出成功");
					// 		this.$router.push("login");
					// 	});
				})
				.catch(() => {
					this.$toast("取消退出");
				});
		},
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	padding: 0;
	.group {
		width: 100%;
		margin-top: 2vh;
		padding: 0 16px;
		background-color: #fff;
		div {
			width: 100%;
			height: 48px;
			border-bottom: 1px solid #ebedf0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span:last-child {
				color: #969799;
				font-size: 14px;
			}
			img {
				width: 9px;
			}
		}
		div:last-child {
			border: 0;
		}
	}
}
.van-cell .van-cell__right-icon {
	transform: rotate(90deg);
}
</style>

