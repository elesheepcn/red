<template>
	<div class="content">
		<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-form>
			<van-field
				v-model="form.password"
				type="password"
				name="password"
				label="新密码"
				placeholder="新密码"
				:rules="[{ required: true }]"
			/>
			<van-field
				v-model="form.rePassword"
				type="password"
				name="rePassword"
				label="再次输入密码"
				placeholder="再次输入密码"
				:rules="[{ required: true }]"
			/>
			<div style="margin: 16px;">
				<van-button block type="primary" @click="onSubmit" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			title: "",
			form: {
				password: "",
				rePassword: "",
			},
		};
	},
	created() {
		console.log(this.$route.query.type);
		if (this.$route.query.type == 0) {
			this.title = "设置登录密码";
		} else if (this.$route.query.type == 1) {
			this.title = "设置支付密码";
		} else if (this.$route.query.type == 2) {
			this.title = "设置初始密码";
		}
	},
	computed: {
		get_user_info() {
			return this.$store.state.user_info;
		},
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		onSubmit() {
			if (this.form.password !== this.form.rePassword) {
				this.$toast.fail("两次密码不一致");
			} else if (this.$route.query.type == 1) {
				//支付密码
				if (this.form.password.length == 6) {
					this.axios("members/updatePayPwd");
				} else {
					this.$toast.fail("请设置支付密码长度为6位数");
				}
			} else if (this.$route.query.type == 0) {
				this.axios("members/updatePassword"); //登录密码
			} else if (this.$route.query.type == 2) {
				//登录密码
				this.$axios
					.post("members", {
						mobile: localStorage.getItem("mobile"),
						password: this.form.password,
						code: localStorage.getItem("code"),
					})
					.then((res) => {
						console.log(res, `注册`);
						if (res.data.code == 1) {
							// this.$toast.success(res.data.msg);
							// this.$router.push("/login");
							this.$toast.loading({
								duration: 0, // 持续展示 toast
								forbidClick: true,
								message: "自动登录中...",
							});
							this.login(); //自动登录
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
			}
		},
		// 登录
		login() {
			// 检查自动保存密码
			localStorage.setItem(
				"user",
				JSON.stringify({
					mobile: localStorage.getItem("mobile"),
					password: this.form.password,
				})
			);
			this.$axios
				.post("members/login", {
					mobile: localStorage.getItem("mobile"),
					password: this.form.password,
				})
				.then((res) => {
					if (res.data.code == 1) {
						// 保存用户信息
						this.$store.commit("update_user_info", res.data.data.data);
						localStorage.setItem(
							"Authorization",
							`${res.data.data.token_type} ${res.data.data.access_token}`
						);
						this.$toast.clear();
						this.$toast.success("登录成功");
						this.$router.push("/");
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
		},
		axios(api) {
			this.$toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: "同步数据中...",
			});
			this.$axios
				.patch(api, {
					mobile: localStorage.getItem("mobile"),
					password: this.form.password,
					code: localStorage.getItem("code"),
				})
				.then((res) => {
					console.log(res, `修改密码`);
					this.$toast.clear();
					if (res.data.code == 1) {
						this.$toast.success(res.data.msg);
						localStorage.setItem(
							"user",
							JSON.stringify({
								mobile: localStorage.getItem("mobile"),
								password: this.form.password,
							})
						);
						this.$router.push("/mine");
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
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
.van-form {
	padding-top: 15px;
}
</style>

