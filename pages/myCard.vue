<template>
	<div class="content">
		<van-nav-bar title="收款账户" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-tabs type="card" color="#07c160" v-model="active" @click="check">
			<van-tab title="微信">
				<van-form @submit="onSubmit">
					<van-cell-group title=" ">
						<van-field
							v-model="form.num"
							name="wx"
							label="微信账号"
							placeholder="输入微信账号"
							required
							size="large"
							:rules="[{ required: true }]"
						/>
						<van-field
							v-model="form.user"
							name="user"
							label="用户名"
							placeholder="用户名"
							:rules="[{ required: true }]"
							required
							size="large"
						/>
					</van-cell-group>
					<div style="margin: 16px;">
						<van-button block type="primary" @click="add" native-type="submit">提交</van-button>
					</div>
				</van-form>
			</van-tab>

			<van-tab title="支付宝账号">
				<van-form @submit="onSubmit">
					<van-cell-group title=" ">
						<van-field
							v-model="form.num"
							name="alipay"
							label="支付宝账号"
							placeholder="输入支付宝账号"
							:rules="[{ required: true }]"
							required
							size="large"
						/>
						<van-field
							v-model="form.user"
							name="user"
							label="用户名"
							placeholder="用户名"
							:rules="[{ required: true }]"
							required
							size="large"
						/>
					</van-cell-group>
					<div style="margin: 16px;">
						<van-button block type="primary" @click="add" native-type="submit">提交</van-button>
					</div>
				</van-form>
			</van-tab>

			<van-tab title="银行卡">
				<van-form @submit="onSubmit">
					<van-cell-group title=" ">
						<van-field
							readonly
							clickable
							name="picker"
							:value="form.bank"
							label="所属银行"
							required
							placeholder="点击选择所属银行"
							@click="showPicker = true"
						/>
						<van-popup v-model="showPicker" position="bottom">
							<van-picker
								show-toolbar
								:default-index="2"
								:columns="columns"
								@confirm="onConfirm"
								@cancel="showPicker = false"
							/>
						</van-popup>
						<!-- <van-field
							v-model="form.bank"
							name="bank"
							label="所属银行"
							placeholder="所属银行"
							:rules="[{ required: true }]"
							required
							size="large"
						/>-->
						<!-- <div class="select">
							<div class="img">
								<img src="../assets/must.png" alt />
							</div>
							<span>所属银行</span>
							<select name id v-model="form.bank" @change="changeProduct($event)">
								<option
									v-for="(item,index) in banklist"
									:key="index"
									:value="item"
								>{{item}}</option>
							</select>
						</div>-->
						<van-field
							v-model="form.num"
							type="digit"
							name="bankNum"
							label="银行卡号"
							placeholder="银行卡号"
							:rules="[{ required: true }]"
							required
							size="large"
						/>
						<van-field
							v-model="form.user"
							name="user"
							label="持卡人姓名"
							placeholder="持卡人姓名"
							:rules="[{ required: true }]"
							required
							size="large"
						/>
					</van-cell-group>
					<div style="margin: 16px;">
						<van-button block type="primary" @click="add" native-type="submit">提交</van-button>
					</div>
				</van-form>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			form: {
				num: "",
				user: "",
				bank: "",
				type: "",
			},
			showPicker: false,
			columns: [
				"中国银行",
				"中国工商银行",
				"中国建设银行",
				"中国农业银行",
				"中国交通银行",
				"中国邮政储蓄银行",
				"兴业银行",
				"招商银行",
			],
			active: 0,
			ProductActive: "1", //获取被选中的value值 默认选中的是1(北京)
		};
	},
	created() {
		console.log(this.$route.query.v);
		// if (this.$route.query.v == 1)
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		gotoPage() {
			this.$router.push("settingPassword");
		},
		onSubmit(e) {
			console.log(e);
		},
		onConfirm(value) {
			this.form.bank = value;
			this.showPicker = false;
		},
		changeProduct(event) {
			this.form.bank = event.target.value; //获取option对应的value值
		},
		check() {
			this.form.num = "";
			this.form.user = "";
			this.form.bank = "";
			this.form.type = "";
		},
		// 更新收款账户
		update() {
			this.$axios.patch("accounts").then((res) => {
				console.log(res);
			});
		},
		// 添加收款账户
		add() {
			let data = {
				num: this.form.num,
				username: this.form.user,
				bank: this.form.bank,
				type: this.form.type,
			}; //初始化

			if (this.$route.query.v == "post") {
				// 微信
				if (this.active == 0) {
					data.type = "wx";
					this.form.bank = "";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpost(data);
					}
				} else if (this.active == 1) {
					data.type = "alipay";
					this.form.bank = "";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpost(data);
					}
				} else if (this.active == 2) {
					data.type = "bank";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpost(data);
					}
				}
			} else {
				// 微信
				if (this.active == 0) {
					data.type = "wx";
					this.form.bank = "";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpatch(data);
					}
				} else if (this.active == 1) {
					data.type = "alipay ";
					this.form.bank = "";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpatch(data);
					}
				} else if (this.active == 2) {
					data.type = "bank";
					if (!this.form.num || !this.form.user) {
						this.$toast.fail("有未输入项");
						return false;
					} else {
						this.mpatch(data);
					}
				}
			}
		},
		mpost(data) {
			this.$dialog
				.confirm({
					message: "请再次确认正确填写了收款账户!",
				})
				.then(() => {
					this.$toast.loading({
						message: "同步收款账户数据中",
						duration: 0, // 持续展示 toast
						forbidClick: true,
					});
					this.$axios.post("accounts", data).then((res) => {
						console.log(res, "绑定银行卡");
						this.$toast.clear();
						if (res.data.code == 1) {
							this.$toast.success("添加成功");
							this.$router.push("/getmyCard");
						} else {
							this.$toast.fail("添加失败");
						}
					});
				})
				.catch(() => {
					this.$toast.fail("已取消");
				});
		},
		mpatch(data) {
			this.$dialog
				.confirm({
					message: "请再次确认正确填写了收款账户!",
				})
				.then(() => {
					this.$toast.loading({
						message: "同步收款账户数据中",
						duration: 0, // 持续展示 toast
						forbidClick: true,
					});
					this.$axios.patch("accounts", data).then((res) => {
						console.log(res, "绑定银行卡");
						this.$toast.clear();
						if (res.data.code == 1) {
							this.$toast.success("修改成功");
							this.$router.push("/getmyCard");
						} else {
							this.$toast.fail("修改失败");
						}
					});
				})
				.catch(() => {
					this.$toast.fail("已取消");
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
	.van-tabs {
		margin-top: 15px;
	}
	.select {
		width: 100%;
		height: 48px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.img {
			width: 4vw;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img {
				vertical-align: top;
				width: 10px;
			}
		}
		span {
			color: #646566;
			margin-right: 10vw;
			padding-left: 1px;
		}
		select {
			width: 40%;
			height: 100%;
			border: 0;
			color: #999;
			background-color: #fff;
			option {
				text-indent: 1em;
			}
		}
		select:focus {
			outline: none;
		}
	}
}
</style>

