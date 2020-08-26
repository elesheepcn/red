<template>
	<div class="content">
		<van-nav-bar title="我的" />
		<div class="conbg">
			<van-image
				radius="10%"
				width="4rem"
				height="4rem"
				@click="show=true"
				:src="imglist[get_user_info.photo].img_url"
			/>
			<div class="sehu" @click="code">
				<b>{{get_user_info.name}}</b>
				<a>邀请码：{{get_user_info.invite_code}}</a>
			</div>
		</div>
		<!-- <div class="list share" @click="share">
			<div class="box">
				<div class="img">
					<img src="../assets/share_icon.svg" alt />
				</div>
				<span>推荐分享</span>
			</div>
			<van-icon name="arrow" color="#ccc" />
		</div> -->
		<div class="list renewal" @click="updateVersion">
			<div class="box">
				<div class="img">
					<img src="../assets/renewal_icon.svg" alt />
				</div>
				<span>版本更新</span>
			</div>
			<van-icon name="arrow" color="#ccc" />
		</div>
		<div class="list set" @click="gotoPage('setting')">
			<div class="box">
				<div class="img">
					<img src="../assets/set_icon.svg" alt />
				</div>
				<span>个人设置</span>
			</div>
			<van-icon name="arrow" color="#ccc" />
		</div>
		<div class="list set" @click="clear">
			<div class="box">
				<div class="img">
					<img src="../assets/clear.svg" alt />
				</div>
				<span>清除聊天数据</span>
			</div>
			<van-icon name="arrow" color="#ccc" />
		</div>
		<!-- <van-cell-group title=" ">
			<van-cell
				title="推荐分享"
				size="large"
				center
				:icon="require('../assets/share_icon.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('recommend')"
			/>
			<van-cell
				title="我的群聊"
				size="large"
				center
				:icon="require('../assets/chat_icon.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('groupList')"
			/>
			<van-cell
				title="版本更新"
				size="large"
				center
				:icon="require('../assets/renewal_icon.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('updateVersion')"
			/>
		</van-cell-group>
		<van-cell-group title=" ">
			<van-cell
				title="个人设置"
				size="large"
				center
				:icon="require('../assets/set_icon.svg')"
				arrow-direction="up"
				is-link
				link-type="navigateTo"
				@click="gotoPage('setting')"
			/>
		</van-cell-group>-->

		<Tabot />
		<van-action-sheet v-model="show" title="选择头像">
			<div class="imglist">
				<img v-for="(item,index) in imglist" :key="index" :src="item.img_url" @click="check(index)" />
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import Tabot from "../components/tabot";

export default {
	components: {
		Tabot,
	},
	data() {
		return {
			dataList: [],
			show: false,
		};
	},
	created() {
		this.get_userinfo();
	},
	computed: {
		get_user_info() {
			return this.$store.state.user_info;
		},
		imglist() {
			return this.$store.state.img_list;
		},
	},
	methods: {
		gotoPage(params) {
			this.$router.push(params);
		},
		//分享
		share() {
			this.copy_fun(this.get_userinfo.invite_code);
			this.$dialog.alert({
				message: "下载地址已复制到剪切板",
			});
		},
		//邀请码
		code() {
			this.copy_fun("xxxx.com");
			this.$toast("专属邀请码已复制");
		},
		// 版本更新
		updateVersion() {
			this.$toast.loading({
				message: "检查更新中",
				duration: 0, // 持续展示
				forbidClick: true,
			});
			this.$axios
				.patch("members/systemVersion", {
					version: "1.0.0",
				})
				.then((res) => {
					this.$toast.clear();
					console.log(res, "更新");
					if (res.data.code == 0) {
						this.$toast("已经是最新版本");
					} else {
						this.copy_fun("xxxx.com");
						this.$dialog.alert({
							message: "新版本下载地址已复制",
						});
					}
				});
		},
		// 点击复制
		copy_fun(copy) {
			let oInput = document.createElement("input");
			oInput.value = copy;
			document.body.appendChild(oInput);
			oInput.select(); // 选择对象;
			console.log(oInput.value);
			document.execCommand("Copy"); // 执行浏览器复制命令
			oInput.remove();
		},
		// 选择头像
		check(index) {
			this.$toast.loading({
				message: "更新头像中",
				forbidClick: true,
			});
			this.show = false;
			this.$axios
				.patch("members", {
					photo: index,
				})
				.then((res) => {
					console.log(res, `选择头像`);
					this.get_userinfo();
					this.$toast.clear();
					// if (res.data.code == 1) {
					// 	this.$toast.success(res.data.msg);
					// 	this.$router.push("/");
					// } else {
					// 	this.$toast.fail(res.data.msg);
					// }
				});
		},
		//清除缓存
		clear() {
			this.$dialog
				.confirm({
					message: "确定清除聊天数据吗?数据将永久丢失!",
				})
				.then(() => {
					this.$store.commit("clearlist");
					this.$toast.success("清除成功");
				})
				.catch(() => {
					this.$toast.fail("已取消");
				});
		},
		get_userinfo() {
			this.$axios.get(`members/${this.get_user_info.uid}`).then((res) => {
				console.log(res, `更新用户信息`);
				this.$store.commit("update_user_info", res.data.data);
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
	.imglist {
		width: 100%;
		padding: 10px;
		height: auto;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		img {
			width: 20%;
			margin: 2vh 2.5%;
			vertical-align: top;
		}
	}
	.conbg {
		background: #fff;
		padding: 2ex 2ex 2ex;
		margin-top: 2vh;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		.sehu {
			margin-left: 2vw;
			display: inline-block;
			vertical-align: middle;
		}
	}
	.list {
		width: 100%;
		margin-top: 1.5vh;
		padding: 12px 16px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		img {
			vertical-align: sub;
		}
		.box {
			display: inline-block;
			display: flex;
		}
		.img {
			width: 1.5rem;
			margin-right: 0.3rem;
			display: inline-block;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.share {
		img {
			width: 1.15rem;
		}
	}
	.renewal {
		img {
			width: 1.3rem;
		}
	}
	.set {
		img {
			width: 1.3rem;
		}
	}
}
.sehu b {
	/* font-weight: bold; */
	font-size: 1.5rem;
	margin-bottom: 5px;
	display: block;
}
.content a {
	font-weight: 400;
}
.van-icon.iconrights {
	position: absolute;
	right: 5vw;
	top: 13vh;
}

.van-image--round {
	margin-right: 10px;
	display: inline-block;
	vertical-align: middle;
}
.van-cell__left-icon {
	font-size: 1.2rem;
}
</style>
