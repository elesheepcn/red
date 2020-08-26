<template>
	<div class="content">
		<van-nav-bar title="设置密码" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
		<van-form @submit="onSubmit">
			<van-field
				v-model="form.password"
				type="password"
				name="password"
				autocomplete="off"
				label="设置密码"
				placeholder="设置长度在6-16位密码"
				:rules="[{ required: true }]"
			/>
			<!-- @blur="check()" -->

			<van-field
				v-model="form.rePassword"
				type="password"
				name="rePassword"
				label="再次输入密码"
				autocomplete="off"
				placeholder="再次输入密码"
				error-message-align="两次输入密码不一致"
				:rules="[{ required: true }]"
			/>
			<div style="margin: 16px;">
				<van-button block type="primary" native-type="submit" @click="gotoPage('index')">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			form: {
				password: "",
				rePassword: "",
			},
		};
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		onSubmit(params) {
			console.log(params);
		},
		gotoPage(params) {
			let reg = new RegExp(/^\d{6,16}$/);
			if (!reg.test(this.form.password)) {
				this.$toast.fail("密码长度在6-16位!");
			} else {
				this.$axios
					.post("members", {
						mobile: localStorage.getItem("mobile"),
						password: this.form.password,
					})
					.then((res) => {
						console.log(res, "注册");
						if (res.data.code == 1) {
							this.$toast.success("注册成功");
							this.$router.push("login");
							localStorage.setItem(
								"user",
								JSON.stringify({
									mobile: localStorage.getItem("mobile"),
									password: this.form.password,
								})
							);
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
			}
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
</style>

