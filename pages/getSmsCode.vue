<template>
	<div class="content">
		<van-nav-bar title="验证短信" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-form @submit="onSubmit">
			<van-field
				v-model="form.mobile"
				name="mobile"
				label="电话号码"
				autocomplete="off"
				type="digit"
				placeholder="请输入电话号码"
				:rules="[{ required: true, message: '请输入电话号码' }]"
			/>
			<van-field
				v-model="form.sms"
				center
				clearable
				type="digit"
				autocomplete="off"
				label="短信验证码"
				placeholder="请输入短信验证码"
			>
				<template #button>
					<van-button size="small" @click="verify" type="primary">发送验证码</van-button>
				</template>
			</van-field>

			<div style="margin: 16px;">
				<van-button block type="primary" @click="check">下一步</van-button>
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
				mobile: "",
				sms: "",
			},
			code: 0,
		};
	},
	created() {},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		onSubmit(params) {
			console.log(params);
		},
		//验证码
		verify() {
			let reg = new RegExp(/^\d{11}$/);
			if (!reg.test(this.form.mobile)) {
				this.$toast.fail("号码格式错误");
			} else {
        this.$toast.loading({
				message: "正在请求验证码中",
				duration: 0, // 持续展示
				forbidClick: true,
			});
				localStorage.setItem("mobile", this.form.mobile);
				this.$axios
					.get(`members/getCode?mobile=${this.form.mobile}`)
					.then((res) => {
						console.log(res, `验证码`);
						if (res.data.code == 1) {
              this.$toast.clear();
							this.code = res.data.data;
							// this.$toast.success(res.data.data);
							this.copy_fun(res.data.data);
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
			}
		},
		//核对验证码
		check() {
			if (!this.form.mobile || !this.form.sms) {
				this.$toast.fail("有未输入项");
			} else if (this.code == this.form.sms) {
				localStorage.setItem("code", this.code);
				this.$router.push({
					path: "modifyPassword",
					query: { type: this.$route.query.type },
				});
			} else {
				this.$toast.fail("验证码错误!");
			}
		},
		// 点击复制
		copy_fun(copy) {
			let oInput = document.createElement("input");
			oInput.value = copy;
			document.body.appendChild(oInput);
			oInput.select(); // 选择对象;
			console.log(oInput.value);
			this.$toast.success("验证码已复制到剪切板");
			document.execCommand("Copy"); // 执行浏览器复制命令
			oInput.remove();
		},
	},
	mounted() {
		console.log(this.$route.query.type);
	},
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

