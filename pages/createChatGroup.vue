<template>
	<div class="content">
		<van-nav-bar title="创建俱乐部" left-text="返回" left-arrow @click-left="onClickLeft" />

		<van-form @submit="onSubmit">
			<van-field
				v-model="form.name"
				name="name"
				label="群名称"
				placeholder="群名称(必填)"
				input-align="right"
				required
				:rules="[{ required: true }]"
			/>
			<van-field
				v-model="form.notice"
				name="notice"
				rows="3"
				label="群公告"
				type="textarea"
				maxlength="150"
				show-word-limit
				placeholder="请填写群公告(必填)"
				input-align="right"
				required
				:rules="[{ required: true }]"
			/>
			<van-field
				v-model="form.attentions"
				name="info"
				rows="3"
				label="进群须知"
				type="textarea"
				maxlength="150"
				show-word-limit
				placeholder="进群须知(必填)"
				input-align="right"
				required
				:rules="[{ required: true }]"
			/>
			<!-- <van-field
        v-model="form.time"
        name="time"
        label="红包有效时间"
        placeholder="请输入有效时间(分)(必填)"
        input-align="right"
        required
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="form.fandian"
        name="fandian"
        label="发包人返点"
        placeholder="请输入发包返点比率(%)(必填)"
        input-align="right"
        required
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="form.tjfandian"
        name="tjfandian"
        label="推荐人返点"
        placeholder="请输入推荐返点比率(%)(必填)"
        input-align="right"
        required
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="form.tjsjfandian"
        name="tjsjfandian"
        label="推荐人上级返点"
        label-width="120px"
        placeholder="请输入推荐上级返点比率(%)(必填)"
        input-align="right"
        required
        :rules="[{ required: true }]"
      />
      <van-cell 
        title="玩法设置" 
        value="扫雷"
			/>-->
			<van-field
				v-model="form.wx"
				name="weixin"
				label="申请人微信号"
				placeholder="请输入您的微信账号(必填)"
				input-align="right"
				required
				:rules="[{ required: true }]"
			/>
			<div style="margin: 16px;">
				<van-button type="primary" block @click="create_groups()">提交审核</van-button>
			</div>
			<h5>
				如审核不通过,&nbsp;请联系客服
				<br />客服微信:&nbsp;
			</h5>
		</van-form>
	</div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
	components: {},
	data() {
		return {
			form: {
				name: "",
				notice: "",
				attentions: "",
				wx: "",
			},
		};
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
		gotoPage() {
			this.$router.push("settingPassword");
		},
		//创建群聊
		create_groups() {
			this.$axios
				.$post("groups", {
					name: this.form.name,
					notice: this.form.notice,
					attentions: this.form.attentions,
					wx: this.form.wx,
				})
				.then((res) => {
					console.log(res, "创建群聊");
					if (res.code == 1) {
						Toast.success("申请成功,请等待审核结果");
						this.$axios.$get(`groups`).then((res) => {
							if (res.code == 1) {
								this.$store.commit("update_group_list", res.data.reverse());
								setTimeout(() => {
									this.$router.push("/");
								}, 500);
							} else {
								this.$toast.fail(res.msg);
							}
						});
					} else {
						this.$toast.fail(res.msg);
					}
				});
		},

		onSubmit(e) {
			console.log(e);
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
	margin-top: 15px;
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
</style>

