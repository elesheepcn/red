<template>
	<!-- 聊天详情 -->
	<div class="content">
		<van-nav-bar title="通知助手" left-text="返回" left-arrow @click-left="onClickLeft" center fixed></van-nav-bar>
		<!-- 筛选 -->
		<!-- <div class="filtrate">
			<span :class="curstatus==-1?'cur':''" @click="check(-1)">待处理({{num_a}})</span>
			<span :class="curstatus==1?'cur':''" @click="check(1)">已同意({{num_b}})</span>
			<span :class="curstatus==0?'cur':''" @click="check(0)">已拒绝({{num_c}})</span>
		</div>-->
		<div id="main">
			<p class="hint" v-show="get_join_list.length==0">暂无消息</p>
			<div class="list" v-for="(item,index) in get_join_list" :key="index">
				<!-- v-show="item.status==curstatus" -->
				<!-- 通知类型 -->
				<!-- <div class="type">{{item.type}}</div> -->
				<!-- 通知内容 -->
				<div class="txt">
					<p class="title">入群申请</p>
					<p>用户:{{item.name}}</p>
					<p>邀请码:{{item.invite_code}}</p>
					<p>群聊:{{item.group_name}}</p>
					<p>申请时间{{item.created_at}}</p>
				</div>
				<!-- 操作 -->
				<div class="operation" v-show="item.status==-1">
					<!-- <button @click="edit(0,item.group_id,item.uid)">拒绝加入</button> -->
					<!-- <button @click="edit(1,item.group_id,item.uid)">同意加入</button> -->
					<van-button type="danger" size="small" @click="edit(0,item.group_id,item.uid)">拒绝加入</van-button>
					<van-button
						type="primary"
						color="#2dcb67"
						size="small"
						@click="edit(1,item.group_id,item.uid)"
					>同意加入</van-button>
				</div>
				<div class="operation" v-show="item.status==0">
					<p>已拒绝</p>
					<!-- <button @click="edit(0)">拒绝加入</button> -->
					<!-- <button @click="edit(1)">同意加入</button> -->
				</div>
				<div class="operation" v-show="item.status==1">
					<p>已同意</p>
					<!-- <button @click="edit(0)">拒绝加入</button> -->
					<!-- <button @click="edit(1)">同意加入</button> -->
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	components: {},
	data() {
		return {
			scroll_num: 0,
			curstatus: -1,
			msgList: [
				{
					type: "入群申请",
					title: "入群申请",
					name: "入群申请",
					time: "12:17",
				},
				{
					type: "话费充值",
					title: "微信支付",
					name: "微信支付",
					time: "12:17",
				},
				{
					type: "入群申请",
					title: "入群申请",
					name: "入群申请",
					time: "12:17",
				},
			],
			num_a: 0,
			num_b: 0,
			num_c: 0,
		};
	},
	created() {
		this.get_joinlist();
	},
	computed: {
		get_join_list() {
			return this.$store.state.join_list;
		},
	},
	methods: {
		scroll() {
			main.scrollTop = main.scrollHeight;
		},
		check(v) {
			this.curstatus = v;
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		get_joinlist() {
			// 进群审核列表
			this.$axios.get(`groups/applyGroupList`).then((res) => {
				console.log(res, "进群审核列表");
				if (res.data.code == 1) {
					this.$store.commit("update_join_list", res.data.data);
					this.num_a = 0;
					this.num_b = 0;
					this.num_c = 0;
					for (let item of res.data.data) {
						if (item.status == -1) {
							this.num_a++;
						} else if (item.status == 1) {
							this.num_b++;
						} else if (item.status == 0) {
							this.num_c++;
						}
					}
				}
			});
		},
		edit(v, group_id, uid) {
			console.log("进群审核");
			// 进群审核
			this.$axios
				.patch(`groups/auditGroup`, {
					group_id: group_id,
					uid: uid,
					status: v, //0 no 1 yes
				})
				.then((res) => {
					this.get_joinlist();
					console.log(res, "进群审核");
				});
		},
	},
	mounted() {
		
		// let num = 1;
		//轮询红包列表
		// this.timer = setInterval(() => {
		// 	num++;
		// 	console.log(`轮询第${num}次`);
		// 	this.get_reds_list();
		// }, 2000);
	},
	//页面渲染完毕 滚动到底部
	updated() {
		// if (this.scroll_num == 0) {
		//   }
		// this.scroll_num++;
		this.scroll();
	},
	destroyed() {
		// this.wsflag = false; //关闭连接
		// clearInterval(this.timer);
	},
};
</script>


<style lang="scss"  scoped>
.content {
	width: 100vw;
	height: 100vh;
	padding: 0;
	display: flex;
	flex-direction: column;
	position: relative;
	.filtrate {
		width: 100%;
		height: 54px;
		position: absolute;
		top: 46px;
		z-index: 9;
		background-color: #ebedf0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.cur {
			color: #2dcb67;
		}
	}
	#main {
		padding: 55px 10px 20px;
		flex: 1;
		overflow-y: scroll;
		background-color: #eee;
		-ms-overflow-style: none; // ie 隐藏滚动条
		overflow: -moz-scrollbars-none; // ff 隐藏滚动条
		.hint {
			text-align: center;
		}
		.list {
			width: 100%;
			padding: 15px 30px;
			line-height: 30px;
			border-radius: 5px;
			margin-bottom: 2vh;
			background-color: #fff;
			.type {
				height: 5vh;
				line-height: 5vh;
				border-bottom: 1px solid #ddd;
			}
			.operation {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			.txt {
				.title {
					text-align: center;
					font-weight: bold;
				}
			}
		}
	}
	#main::-webkit-scrollbar {
		width: 0 !important;
	} // chr saf 隐藏滚动条
}
img {
	vertical-align: top;
}
</style>
