<template>
	<div class="content">
		<van-nav-bar title="登录" />
		<van-form @submit="onSubmit">
			<van-field
				v-model="form.mobile"
				name="mobile"
				label="账号"
				autocomplete="off"
				type="digit"
				placeholder="账号"
				:rules="[{ required: true, message: '请填写账号' }]"
			/>
			<van-field
				v-model="form.password"
				type="password"
				name="password"
				label="密码"
				autocomplete="off"
				placeholder="密码"
				:rules="[{ required: true, message: '请输入密码' }]"
			/>
			<!-- <van-checkbox v-model="checked" icon-size="20px" shape="square" checked-color="#07c160">记住账号和密码</van-checkbox> -->
			<div style="margin: 16px;">
				<van-button block type="primary" @click="login()">登录</van-button>
			</div>
		</van-form>
		<div style="margin: 16px;">
			<van-button block type="info" @click="gotoPage('getSmsCode',2)">注册</van-button>
		</div>
		<span
			style="margin: 16px;text-align:center;display:block;color:#999;"
			@click="gotoPage('getSmsCode',0)"
		>忘记密码？</span>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			form: {
				mobile: "",
				password: "",
			},
			checked: true,
			timer: null,
		};
	},
	created() {
		if (localStorage.getItem("user")) {
			this.form.mobile = JSON.parse(localStorage.getItem("user")).mobile;
			this.form.password = JSON.parse(localStorage.getItem("user")).password;
		}
		localStorage.setItem("Authorization", ""); //初始化令牌
	},
	methods: {
		onClickLeft() {
			this.$router.push("/");
		},
		onSubmit(params) {
			console.log(params);
		},
		// 登录
		login() {
			if (this.form.mobile == "" || this.form.password == "") {
				this.$toast.fail("账号或密码为空");
			} else {
				this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true,
					message: "登录中...",
				});
				this.timer = setTimeout(() => {
					this.$toast.clear();
					this.$toast.fail("登录超时");
				}, 10000);
				// 检查自动保存密码
				localStorage.setItem(
					"user",
					JSON.stringify({
						mobile: this.form.mobile,
						password: this.form.password,
					})
				);
				// if (this.checked) {
				// } else {
				// 	localStorage.setItem(
				// 		"user",
				// 		JSON.stringify({
				// 			mobile: "",
				// 			password: "",
				// 		})
				// 	);
				// }
				this.$axios
					.post("members/login", {
						mobile: this.form.mobile,
						password: this.form.password,
					})
					.then((res) => {
						clearInterval(this.timer);
						if (res.data.code == 1) {
							this.$toast.success("登录成功");
							// 保存用户信息
							this.$store.commit("update_user_info", res.data.data.data);
							localStorage.setItem(
								"Authorization",
								`${res.data.data.token_type} ${res.data.data.access_token}`
							);
							this.$toast.clear();
							this.$router.push("/");
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
			}
		},
		gotoPage(params, type) {
			this.$router.push({
				path: params,
				query: { type: type },
			});
		},
	},
};
</script>

<style scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
}
.van-checkbox {
	margin: 2vh 0 2vh 5vw;
}
.van-form {
	padding-top: 15px;
}
</style>

