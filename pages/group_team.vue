<template>
	<div class="content">
		<van-nav-bar title="群成员" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="main">
			<ul class="avatarBox">
				<li v-for="(item,index) in get_groupUser" :key="index">
					<van-image width="45px" radius="10%" :src="imglist[item.photo].img_url" />
					<div class="van-ellipsis">{{item.name}}</div>
					<div class="dot" v-if="item.role!=''">{{item.role}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		},
	},
	created() {
		this.$axios
			.get(`groups/groupUser?group_id=${this.get_group_info.id}`)
			.then((res) => {
				console.log(res, `群成员`);
				if (res.data.code == 1) {
					this.$store.commit("update_groupUser", res.data.data);
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
	},
	computed: {
		//群详情
		get_group_info() {
			return this.$store.state.group_info;
		},
		imglist() {
			return this.$store.state.img_list;
		},
		get_groupUser() {
			return this.$store.state.groupUser;
		},
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	padding: 0;
	display: flex;
	flex-direction: column;
	.main {
		width: 100vw;
		height: 100%;
		flex: 1;
		overflow-y: scroll;
		text-align: center;
		background-color: #fff;
		overflow: scroll;
		// 群成员
		.avatarBox {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			li {
				width: 17.5%;
				display: inline-block;
				text-align: center;
				margin: 1.5vh 1vw;
				position: relative;
				.dot {
					position: absolute;
					top: -5px;
					right: 0;
					// width: 30px;
					// height: 20px;
					padding: 0 5px;
					margin: 0;
					border-radius: 3px;
					font-size: 12px;
					color: #fff;
					background-color: rgba($color: #2dcb67, $alpha: 0.5);
				}
			}
		}
	}
}
/* .webcon{width: 100vw;height: 100vh;} */
</style>

