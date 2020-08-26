<template>
	<div class="content">
		<div class="next-content" @click="onClickLeft">
			<van-icon name="arrow-left" />
			<span>返回</span>
		</div>
		<!-- <van-nav-bar
      title="推荐奖励"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
		/>-->
		<div class="conbix">
			<van-image
				width="150"
				height="150"
				fit="cover"
				radius="3"
				:src="require('../assets/erweima@3x.png')"
			/>
			<br />
			<span>我的推荐码：{{get_user_info.invite_code}}</span>
			<br />
			<van-image
				width="200"
				fit="cover"
				:src="require('../assets/save_button@3x.png')"
				@click="download"
			/>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
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
		//保存图片到本地
		download() {
			console.log("下载图片");
			var a = document.createElement("a");
			a.download = "../assets/erweima@3x.png";
			// 设置图片地址
			a.href = "../assets/erweima@3x.png";
			a.click();
		},
	},
	mounted() {},
};
</script>

<style scoped>
.content {
	background: url(../assets/save_bg@3x.png) top center no-repeat #fff;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	padding: 0;
}
.next-content {
	padding: 2vh 2vw 2vh;
	color: #fff;
}
.next-content span,
.van-icon-arrow-left {
	vertical-align: middle;
	display: inline-block;
}
.conbix {
	width: fit-content;
	margin: auto;
	text-align: center;
	position: relative;
	top: 35vh;
}
.conbix span {
	color: #fff;
	margin: 1vh auto 2vh;
	display: block;
}
</style>

