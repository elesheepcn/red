<template>
	<div class="content">
		<van-nav-bar title="收款账户" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="list">
			<div class="box">
				<span class="left">类型</span>
				<span class="right" v-show="get_mycard.type=='wx'">微信</span>
				<span class="right" v-show="get_mycard.type=='alipay'">支付宝</span>
				<span class="right" v-show="get_mycard.type=='bank'">银行卡</span>
			</div>
			<div class="box">
				<span class="left">用户</span>
				<span class="right">{{get_mycard.username}}</span>
			</div>
			<div class="box" v-show="get_mycard.bank!=''">
				<span class="left">银行</span>
				<span class="right">{{get_mycard.bank}}</span>
			</div>
			<div class="box">
				<span class="left">账户</span>
				<span class="right">{{get_mycard.num}}</span>
			</div>
		</div>
		<div style="margin: 16px;">
			<van-button block type="primary" @click="check" native-type="submit">修改</van-button>
		</div>
		<!-- <van-form>
			<van-field v-model="get_mycard.type" label="类型" />
			<van-field v-model="get_mycard.username" label="用户" />
			<van-field v-model="get_mycard.bank" v-show="get_mycard.bank!=''" label="银行" />
			<van-field v-model="get_mycard.num" label="账户" />
			<div style="margin: 16px;">
				<van-button block type="primary" @click="check" native-type="submit">修改</van-button>
			</div>
		</van-form>-->
		<!-- <p>
			<span class="left"></span>
			<span class="right">{{get_mycard.num}}</span>
		</p>
		<p>
			<span class="left"></span>
			<span class="right">{{get_mycard.num}}</span>
		</p>
		<p>
			<span class="left"></span>
			<span class="right">{{get_mycard.num}}</span>
		</p>
		<p></p>-->
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	computed: {
		get_mycard() {
			return this.$store.state.mycard;
		},
	},
	created() {
		this.get_card();
	},
	methods: {
		onClickLeft() {
			this.$router.push("/chatDetail");
		},
		check() {
			// this.$router.push("myCard");
			this.$router.push({
				path: "/myCard",
				query: { v: "patch" },
			});
		},
		gotoPage(params, title) {
			this.$router.push({ name: params, params: { title: title } });
		},
		// 请求收款账户信息
		get_card() {
			this.$axios.get(`accounts`).then((res) => {
				console.log(res, `请求收款账户信息`);
				if (res.data.code == 1) {
					this.$store.commit("update_mycard", res.data.data);
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	padding: 0;
	.van-form {
		margin-top: 2vh;
	}
	.list {
		margin-top: 2vh;
		background-color: #fff;
		padding: 0 5vw;
		font-size: 14px;
		line-height: 24px;
		.box {
			display: flex;
			padding: 10px 0;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #ebedf0;
			.left {
				width: 30%;
				color: #646566;
			}
			.right {
				color: #323233;
			}
		}
	}
	.list > .box:last-child {
		border-bottom: 0 !important;
	}
}
</style>

