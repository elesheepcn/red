<template>
	<div class="content">
		<div class="next-content" @click="onClickLeft">
			<van-icon name="arrow-left" />
			<span>返回</span>
		</div>
		<div class="tt-box">
			<div class="tt-main">
				<img :src="imglist[reds_info.send_user.photo].img_url" />
				<h4>{{reds_info.send_user.name}}的红包</h4>
			</div>
		</div>
		<div class="fourthly" v-show="reds_info.packet.rob_money>0">
			<p>
				<span>{{reds_info.packet.rob_money}}</span>元
			</p>
			<p @click="go">
				已存入钱包,去账户中查看
				<van-icon name="arrow" color="#c3a87b" />
			</p>
		</div>
		<div class="fourthly" v-show="reds_info.packet.rob_money==null">
			<p>来晚了,没有抢到红包哦</p>
		</div>
		<div class="ww-bottom">
			<van-cell-group class="itemss" :title="num" :border="false">
				<van-cell
					v-for="(item,index) in reds_info.list "
					:key="index"
					:title="item.rob_user.name"
					:label="item.rob_time"
					size="large"
					:icon="imglist[item.rob_user.photo].img_url"
					class="hsu"
					:class="item.rob_uid==user_info.uid?'me':''"
				>
					<template #right-icon>
						<div class="right">
							<span>{{item.rob_money}}</span>
							<span class="hint">{{item.award}}</span>
						</div>
					</template>
				</van-cell>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			num: "",
		};
	},
	created() {
		this.initWebSocket();
		console.log(this.$route.query.v);
	},
	computed: {
		//红包详情
		reds_info() {
			return this.$store.state.reds_info;
		},
		//用户详情
		user_info() {
			return this.$store.state.user_info;
		},
		//群聊详情
		get_group_info() {
			return this.$store.state.group_info;
		},
		// 头像
		imglist() {
			return this.$store.state.img_list;
		},
	},
	methods: {
		onClickLeft() {
			if (this.$route.query.v == true) {
				this.$router.push({
					path: "/chatDetail",
					query: { v: 0 },
				});
			} else {
				this.$router.push({
					path: "/chatDetail",
					query: { v: 1 },
				});
			}
		},
		//检查中奖中雷
		check() {
			for (let item of this.reds_info.list) {
				if (item.rob_user.name == this.user_info.name) {
					if (item.award != "") {
						let msg = {
							group_id: this.$route.query.v,
							data: `用户${item.rob_user.name}${item.award}`,
							type: "qiang",
							reds_id: this.reds_info.packet.id,
						};
						this.$store.commit("add_msg_list", msg);
						this.$store.commit("update_reds_id", this.reds_info.packet.id);
					}
				}
			}
		},
		//初始化weosocket
		initWebSocket() {
			this.websock = new WebSocket("ws://103.233.255.86:5200");
			this.websock.onmessage = this.websocketonmessage;
			this.websock.onopen = this.websocketonopen;
			this.websock.onerror = this.websocketonerror;
			this.websock.onclose = this.websocketclose;
		},
		//连接建立之后执行send方法发送数据
		websocketonopen() {
			this.websocketsend({
				type: "bindRoom",
				info: {
					uid: this.user_info.uid,
					group_id: this.get_group_info.id,
					old_group_id: localStorage.getItem("old_group_id") || 0,
				},
			});
			this.websocketsend({
				type: "qiang",
				info: {
					group_id: this.get_group_info.id,
				},
			});
		},
		//连接建立失败重连
		websocketonerror() {
			console.log("连接断开了");
			this.initWebSocket();
		},
		//数据接收
		websocketonmessage(e) {
			console.log(`${this.get_group_info.id}收到:`, e.data);
			if (e.data.includes("type")) {
				let e_data = JSON.parse(e.data);
				if (e_data.type == "qiang") {
					let msg = {
						group_id: this.get_group_info.id,
						data: e_data.data,
						type: e_data.type,
					};
					this.$store.commit("add_msg_list", msg);
				} else if (e_data.type == "sendRed") {
					let obj = {
						group_id: e_data.data.group_id,
						list: {
							id: e_data.data.id, //红包ID
							name: e_data.data.name, //发包人名字
							total_money: e_data.data.total_money, //总金额
							num: e_data.data.num, //红包数量
							rob_num: e_data.data.rob_num, //剩余红包数
							thunder: e_data.data.thunder, //雷点
							send_uid: e_data.data.send_uid, //发送人ID
							photo: e_data.data.photo, //发送人ID
							status: e_data.data.status, //状态
							group_id: e_data.data.group_id, //群ID
							bill_id: e_data.data.bill_id, //账单ID
							created_at: e_data.data.created_at, //创建时间
							updated_at: e_data.data.updated_at, //更新时间
						},
					};
					this.$store.commit("add_group_reds_list", obj);
				} else if (e_data.type == "bind" || e_data.type == "bindRoom") {
					return false;
				} else {
					let msg = {
						group_id: this.get_group_info.id,
						data: e_data.data,
						type: e_data.type,
					};
					this.$store.commit("add_msg_list", msg);
				}
			}
		},
		//数据发送
		websocketsend(Data) {
			this.websock.send(JSON.stringify(Data));
		},
		//关闭
		websocketclose(e) {
			console.log("断开连接", e);
		},
		// 提现
		go() {
			this.$router.push("myAcount");
		},
	},
	mounted() {
		// this.check();
		this.num = `数量 ${this.reds_info.packet.rob_num}/${this.reds_info.packet.num}    总金额 ${this.reds_info.packet.total_money}    雷点 ${this.reds_info.packet.thunder}`;
	},
	beforeDestroy() {
		this.websock.close(); //离开路由之后断开websocket连接
	},
	destroyed() {
		// let data = {
		// 	group_id: this.get_group_info.id,
		// 	leave_date: Math.floor(new Date().getTime() / 1000),
		// };
		// localStorage.setItem("old_group_id", this.get_group_info.id);
		// this.$store.commit("update_leave_date", data);
		// this.websock.close(); //离开路由之后断开websocket连接
	},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #fff;
	width: 100vw;
	height: 100vh;
	padding: 0;
}
.next-content {
	padding: 2vh 2vw 2vh;
	color: #fff;
}
.ww-bottom {
	.van-cell {
		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			.hint {
				color: #f00;
			}
		}
	}
}
.me {
	color: #2dcb67;
}
.next-content span,
.van-icon-arrow-left {
	vertical-align: middle;
	display: inline-block;
}
.van-cell-group__title {
	background: #f2f2f2;
}
.tt-box {
	background-color: #fff;
}
.next-content {
	width: 100vw;
	height: 16vh;
	background-color: #f25542;
	border-radius: 0 0 50% 50%;
	padding: 2vh 2vw 2vh;
}
.van-icon {
	color: #fff;
}
.tt-main img {
	width: 45px;
	height: 45px;
	display: block;
	margin: auto;
	border-radius: 10%;
	object-fit: cover;
}
.tt-main h4 {
	font-size: 1rem;
	text-align: center;
	margin-top: 1vh;
}
.tt-main {
	margin: auto;
	width: 75vw;
	margin-top: 2vh;
}
.tt-main span {
	vertical-align: middle;
	background-color: #c3a87b;
	width: 2vw;
	height: 1.5vh;
}
.content .thirdly {
	color: #b8b8b8;
	text-align: center;
	font-weight: 700;
	font-size: 0.9rem;
	margin-top: 1vh;
}
.content .fourthly {
	text-align: center;
	font-size: 1rem;
	color: #d0ac78;
	margin-top: 1vh;
	padding: 1vh 0;
}
.fourthly > p {
	display: flex;
	align-items: center;
	justify-content: center;
}
.fourthly > p > span {
	font-weight: 700;
	font-size: 2rem;
}
.fifth {
	text-align: center;
	color: #d1bd9a;
	vertical-align: middle;
}
.fifth .van-icon-arrow::before {
	color: #d1bd9a;
	vertical-align: middle;
	margin-left: -1vw;
}

.hsu {
	position: relative;
}
.hsu img {
	width: 2.5rem;
	height: 2.5rem;
	object-fit: cover;
	border-radius: 3px;
}
.hsu .biaoqian {
	position: absolute;
	right: 4vw;
	top: 5vh;
	color: #f25542;
}
</style>


 

  
