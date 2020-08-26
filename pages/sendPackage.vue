<template>
	<div class="content">
		<van-nav-bar title="发红包" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
		<van-form @submit="onSubmit">
			<van-cell-group title="红包发布范围：20～1000元">
				<van-field
					v-model="form.money"
					type="digit"
					name="money"
					label="总金额"
					oninput="if(value>1000)value=1000"
					placeholder="总金额(必填)"
					input-align="right"
					size="large"
					clearable
					required
					:rules="[{ required: true }]"
				/>
			</van-cell-group>
			<van-cell-group title=" ">
				<van-field
					type="digit"
					name="num"
					value="7"
					label="红包个数"
					input-align="right"
					size="large"
					clearable
					readonly
				/>
			</van-cell-group>
			<van-cell-group title="雷点范围0～9">
				<van-field
					type="digit"
					v-model="form.thunder"
					name="lei"
					oninput="if(value>9)value=9"
					label="雷点"
					placeholder="雷点(必填)"
					input-align="right"
					size="large"
					clearable
					required
					:rules="[{ required: true }]"
				/>
			</van-cell-group>
			<b class="zonge">{{form.money|Npf}}</b>
			<div style="margin: 16px;">
				<van-button type="danger" block @click="send()">塞钱进红包</van-button>
			</div>
		</van-form>

		<h5>未领取的红包，将于5分钟后发起退款</h5>
		<van-overlay :show="show" @click="show = false">
			<!-- <div class="wrapper" @click.stop>
				<div class="block" />
			</div>-->
			<div class="pwdbox" v-show="showKeyboard">
				<p>
					<span>请输入密码</span>
					<van-icon name="cross" size="1.4rem" />
				</p>
				<!-- 密码输入框 -->
				<van-password-input
					:value="value"
					:info="info"
					gutter="2px"
					:focused="showKeyboard"
					@focus="showKeyboard = true"
				/>
			</div>

			<!-- 数字键盘 -->
			<van-number-keyboard
				:show="showKeyboard"
				@input="onInput"
				@delete="onDelete"
				@blur="showKeyboard = false"
			/>
		</van-overlay>
	</div>
</template>

<script>
import Vue from "vue";
import { Overlay } from "vant";
import { PasswordInput, NumberKeyboard } from "vant";

Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Overlay);
export default {
	components: {},
	data() {
		return {
			form: { money: "", num: "", thunder: "" },
			show: false,
			value: "",
			pwd: 147258,
			info: "请输入六位数密码(147258)",
			showKeyboard: false,
			wsflag: true
		};
	},
	computed: {
		get_user_info() {
			return this.$store.state.user_info;
		},
		get_group_info() {
			return this.$store.state.group_info;
		}
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
		onInput(key) {
			this.value = (this.value + key).slice(0, 6);
			if (this.value.split("").length == 6) {
				if (this.value == this.pwd) {
					let ws = new WebSocket("ws://103.233.255.86:5200");
					let data_sendRed = JSON.stringify({
						type: "sendRed",
						info: {
							uid: this.get_user_info.uid,
							group_id: this.get_group_info.id,
							total_money: this.form.money,
							num: 7,
							thunder: this.form.thunder,
							name: this.get_user_info.name
						}
					});
					ws.onopen = evt => {
						ws.send(data_sendRed);
						this.$toast.success("支付成功");
						this.$router.go(-1);
					};
					ws.onmessage = evt => {
						console.log("发红包收到: ", evt);
					};
					ws.onclose = function(evt) {
						console.log("连接关闭", evt);
					};
					// this.$axios
					// 	.post("reds", {
					// 		total_money: this.form.money,
					// 		num: 7,
					// 		thunder: this.form.thunder,
					// 		group_id: sessionStorage.getItem("id"),
					// 		name: this.get_user_info.name
					// 	})
					// 	.then(res => {
					// 		console.log(res);
					// 		// 提示错误
					// 		if (res.data.hasOwnProperty("message")) {
					// 			this.$toast.fail(res.data.message);
					// 			this.value = "";
					// 			this.show = false;
					// 			this.showKeyboard = false;
					// 		} else {
					// 			this.$toast.success("支付成功");
					// 			this.$router.go(-1);
					// 		}
					// 	})
					// 	.catch(() => {
					// 		this.$toast.fail("支付失败");
					// 		this.value = "";
					// 		this.show = false;
					// 		this.showKeyboard = false;
					// 		// this.$router.push("login");
					// 	});
				} else {
					this.value = "";
					this.info = "密码错误";
				}
			}
		},
		onDelete() {
			this.value = this.value.slice(0, this.value.length - 1);
		},
		//发送红包
		send() {
			if (this.form.money == "" || this.form.money < 20) {
				this.$toast.fail("红包金额错误");
				return false;
			} else if (this.form.thunder == "") {
				this.$toast.fail("未设置雷点");
			} else {
				this.show = true;
				this.showKeyboard = true;
			}
		}
	},
	filters: {
		Npf(v) {
			return Number(v).toFixed(2);
		}
	},
	mounted() {},
	destroyed() {
		this.wsflag = false; //关闭连接
		// clearInterval(this.timer);
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	padding: 8vh 0;
}
.pwdbox {
	width: 90%;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: #eee;
	padding: 10px 0 20px;
	border-radius: 5px;
	p {
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.van-icon {
			position: absolute;
			top: 0;
			right: 0;
		}
	}
}
.van-overlay {
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
.van-password-input {
	width: 80%;
	margin: auto;
}
.van-cell .van-cell__right-icon {
	transform: rotate(90deg);
}
.content h5 {
	font-weight: 400;
	width: 100vw;
	margin: auto;
	color: #969799;
	text-align: center;
}
.van-cell-group {
	width: 92vw;
	margin: 0 auto;
	border-radius: 5px;
}
.van-cell--large {
	border-radius: 5px;
}
.zonge {
	display: inline-block;
	width: 100vw;
	text-align: center;
	font-size: 3rem;
	margin: 2vh 0;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
</style>

