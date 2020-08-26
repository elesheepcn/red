<template>
	<!-- 聊天详情 -->
	<div class="content">
		<div class="hint" v-show="hintflag" @click.stop="tofloor">
			<span>有新消息</span>
			<van-icon name="down" />
		</div>
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" center>
			<template #title>
				<p id="nav_bar_title">{{get_group_info.name}}({{get_group_info.users.length}})</p>
			</template>
			<template #right>
				<van-icon name="weapp-nav" @click="$router.push('chatDetailInfo')" />
			</template>
		</van-nav-bar>
		<div id="main" @click="closebox">
			<div v-for="(item,index) in reds_list" :key="index">
				<!-- 红包 -->
				<div
					class="reds"
					v-if="!item.hasOwnProperty('data')"
					:class="item.send_uid==get_user_info.uid?'rd_list_rr':'rd_list_ll'"
				>
					<van-image
						v-show="item.send_uid==get_user_info.uid"
						width="45px"
						height="45px"
						radius="10%"
						:src="imglist[get_user_info.photo].img_url"
					/>
					<van-image
						v-show="item.send_uid!==get_user_info.uid"
						width="45px"
						height="45px"
						radius="10%"
						:src="imglist[item.photo].img_url"
					/>
					<div class="msgBox">
						<h4 v-show="item.send_uid!=get_user_info.uid">{{item.name}}</h4>
						<!-- :class="?'red_box_select':''" -->
						<div
							class="red-box"
							:class="reds_select.includes(item.id)?'no':''"
							@click.stop="checkstatus(index)"
						>
							<div class="topconred">
								<van-image
									width="30"
									v-show="!reds_select.includes(item.id)"
									:src="require('../assets/hb@3x.png')"
								/>
								<van-image
									width="30"
									v-show="reds_select.includes(item.id)"
									:src="require('../assets/off_hb@3x.png')"
								/>
								<section>
									{{item.total_money}}-{{item.num}}-({{item.thunder}})
									<br />
									<p>
										<span v-show="reds_select_end.includes(item.id)">已被领完</span>
										<span v-show="reds_select_put.includes(item.id)">已领取</span>
										<span v-show="reds_dated.includes(item.id)">已过期</span>
										<span v-show="!reds_select.includes(item.id)">领取红包</span>
									</p>
									<!-- <p v-show="reds_select_put.includes(item.id)">已领取</p>
									<p v-show="reds_dated.includes(item.id)">已过期</p>
									<p v-show="!reds_select.includes(item.id)">领取红包</p>-->
								</section>
							</div>
							<div class="date">{{item.created_at}}</div>
						</div>
					</div>
				</div>
				<!-- 提示 -->
				<div class="hintbox" v-show="item.hasOwnProperty('data')">
					<!-- 客服消息 -->
					<div class="msglist msglist_L" v-if="item.type=='cha'">
						<img :src="imglist[4].img_url" alt />
						<!-- <van-image width="45px" height="45px" radius="10%" :src="imglist[1].img_url" /> -->
						<div class="msg_L"></div>
						<div class="msg">
							<div class="name">客服</div>
							<div
								class="txtbox"
							>@{{item.data.name}} 积分余额:{{item.data.wallet}} 今日输赢:{{item.data.day_bunko}}</div>
							<!-- 冻结积分:{{item.data.freeze}} -->
						</div>
					</div>
					<!-- 抢红包 -->
					<div class="msglist msglist_L" v-if="item.type=='qiang'">
						<img :src="imglist[6].img_url" alt />
						<div class="msg_L"></div>
						<div class="msg">
							<div class="name">财务</div>
							<div class="txtbox">{{item.data}}</div>
							<!-- 冻结积分:{{item.data.freeze}} -->
						</div>
					</div>
					<!-- 上下分 客户 -->
					<div class v-if="item.type=='sendMsg'">
						<div class="msglist msglist_L" v-if="item.data.uid!=get_user_info.uid">
							<img :src="imglist[item.data.photo].img_url" alt />
							<div class="msg_L"></div>
							<div class="msg">
								<div class="name">{{item.data.name}}</div>
								<div class="txtbox">@财务&nbsp;{{item.data.msg}}</div>
							</div>
						</div>
						<div class="msglist msglist_R" v-if="item.data.uid==get_user_info.uid">
							<img :src="imglist[get_user_info.photo].img_url" alt />
							<div class="msg_L"></div>
							<div class="msg">
								<div class="txtbox">@财务&nbsp;{{item.data.msg}}</div>
							</div>
						</div>
					</div>
					<!-- 上分 -->
					<div class="msglist msglist_L" v-if="item.type=='upFen'">
						<img :src="imglist[6].img_url" alt />
						<!-- <van-image width="45px" height="45px" radius="10%" :src="imglist[1].img_url" /> -->
						<div class="msg_L"></div>
						<div class="msg">
							<div class="name">财务</div>
							<div class="txtbox">{{item.data}}</div>
							<!-- 冻结积分:{{item.data.freeze}} -->
						</div>
					</div>
					<!-- 下分 -->
					<div class="msglist msglist_L" v-if="item.type=='downFen'">
						<img :src="imglist[6].img_url" alt />
						<!-- <van-image width="45px" height="45px" radius="10%" :src="imglist[1].img_url" /> -->
						<div class="msg_L"></div>
						<div class="msg">
							<div class="name">财务</div>
							<div class="txtbox">{{item.data}}</div>
							<!-- 冻结积分:{{item.data.freeze}} -->
						</div>
					</div>
					<!-- 公告 -->
					<!-- <div class="msglist msglist_L" v-if="item.type=='notice'">
						<img :src="imglist[6].img_url" alt />
						<div class="msg_L"></div>
						<div class="msg">
							<div class="name">群主</div>
							<div class="txtbox">
								<span class="a">@全体成员</span>
								&nbsp;{{item.data}}
							</div>
						</div>
					</div>-->
					<!-- 发出消息 -->
					<!-- <div class="msglist msglist_R" v-if="item.type=='cha'">
						<img :src="imglist[1].img_url" alt />
						<div class="msg_L"></div>
						<div class="msg">
							<div class="txtbox">
								@{{item.data.name}}
								余额:{{item.data.wallet}}
								今日输赢:{{item.data.day_bunko}}
							</div>
						</div>
					</div>-->
				</div>
			</div>
		</div>
		<!-- 操作区 -->
		<div class="sendArea" :class="open?'open':''">
			<van-field
				v-model="value"
				placeholder="禁言中"
				class="inputbg"
				readonly
				clearable
				@click.stop="focus()"
			>
				<template #button>
					<van-icon size="30" name="add-o" v-if="!value" @click.stop="check()" />
					<!-- <van-button type="primary" v-else @click.stop="sendMsg">发送</van-button> -->
				</template>
			</van-field>
			<!-- :style="open?{'display':'flex'}:{'display':'none'}" -->
			<!-- v-show="open" -->
			<ul class="avatarBox" v-show="open">
				<li @click="sendPackage">
					<div class="tupian"></div>
					<div class="van-ellipsis">红包</div>
				</li>
				<li @click="$router.push('myAcount')">
					<div class="tupian"></div>
					<div class="van-ellipsis">账户</div>
				</li>
				<li @click="recharge">
					<div class="tupian"></div>
					<div class="van-ellipsis">充值</div>
				</li>
				<li @click="get_card">
					<div class="tupian"></div>
					<div class="van-ellipsis">收款账户</div>
				</li>
				<li @click="gotoPage('webView','玩法说明')">
					<div class="tupian"></div>
					<div class="van-ellipsis">玩法说明</div>
				</li>
				<li @click="contact">
					<div class="tupian"></div>
					<div class="van-ellipsis">联系群主</div>
				</li>
				<li @click="hbShow5=true,open=false">
					<div class="tupian"></div>
					<div class="van-ellipsis">上下分</div>
				</li>
				<li @click="inquire">
					<div class="tupian"></div>
					<div class="van-ellipsis">查</div>
				</li>
			</ul>
		</div>
		<!-- 抢红包 -->
		<van-overlay :show="hbShow" @click="hbShow = false,updatedflag=false">
			<div class="wrapper">
				<div class="block" @click.stop>
					<p class="title">
						<img :src="require('../assets/head_img@3x.png')" width="50" />
						<span>{{send_user}}</span>
					</p>
					<span class="txt" v-show="openflag">恭喜发财，大吉大利！</span>
					<span class="txt" v-show="!openflag">手慢了，红包派完了</span>
					<img
						:class="openflag?'':'hide'"
						@click="openPackage()"
						class="kai"
						src="../assets/kai_icon@3x.png"
						alt
					/>
					<p @click="openPackage" v-show="!openflag" class="floor">
						<span>看看大家的手气</span>
						<van-icon name="arrow" color="#e6c98f" />
					</p>
				</div>
				<img class="off" src="../assets/off.svg" alt />
			</div>
		</van-overlay>
		<!-- 余额不足 -->
		<van-overlay :show="hbShow2" @click="hbShow2 = false,updatedflag=false">
			<div class="wrapper">
				<div class="block" @click.stop>
					<!-- <img class="bg" src="../assets/hb_tc1@3x.png" alt /> -->
					<div class>
						<p class="title">
							<img :src="require('../assets/head_img@3x.png')" width="50" />
							<span>{{send_user}}</span>
						</p>
						<span class="txt">您的积分不足，请去充值！</span>
					</div>
				</div>
				<img class="off" src="../assets/off.svg" alt />
			</div>
		</van-overlay>
		<!-- 红包过期 -->
		<van-overlay :show="hbShow1" @click="hbShow1 = false,updatedflag=false">
			<div class="wrapper">
				<div class="block" @click.stop>
					<!-- <img class="bg" src="../assets/hb_tc1@3x.png" alt /> -->
					<div>
						<p class="title">
							<img :src="require('../assets/head_img@3x.png')" width="50" />
							<span>{{send_user}}</span>
						</p>
						<span class="txt">红包已过期</span>
					</div>
					<p @click="openPackage" class="floor">
						<span>看看大家的手气</span>
						<van-icon name="arrow" color="#e6c98f" />
					</p>
				</div>
				<img class="off" src="../assets/off.svg" alt />
			</div>
		</van-overlay>
		<!-- 发红包 -->
		<van-overlay :show="hbShow3" @click="hbShow3 = false">
			<div class="wrapper">
				<div class="block2" @click.stop>
					<van-nav-bar title="发红包" left-text="返回" left-arrow @click-left="close" />
					<van-form>
						<van-cell-group title="红包发布范围：20～1000分">
							<van-field
								v-model="form.money"
								type="digit"
								name="money"
								label="积分"
								oninput="if(value>1000)value=1000"
								placeholder="积分(必填)"
								input-align="right"
								size="large"
								clearable
								required
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
								required
							/>
						</van-cell-group>
						<van-cell-group title=" ">
							<van-field
								type="digit"
								name="num"
								v-model="form.num"
								label="红包个数"
								placeholder="红包个数(必填)"
								input-align="right"
								size="large"
								required
							/>
						</van-cell-group>
						<b class="zonge">{{form.money|Npf}}</b>
						<div style="margin: 16px;">
							<van-button type="danger" block @click="send()">发红包</van-button>
						</div>
					</van-form>

					<h5>未领取的红包，将于5分钟后发起退款</h5>
					<van-overlay :show="show" @click="show = false">
						<div class="pwdbox" v-show="showKeyboard">
							<p>
								<span>请输入密码</span>
								<van-icon name="cross" size="1.4rem" />
							</p>
							<!-- 密码输入框 -->
							<van-password-input
								:value="pwdValue"
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
							@hide="show = false"
							@blur="showKeyboard = false"
						/>
					</van-overlay>
				</div>
			</div>
		</van-overlay>
		<!-- 红包详情 -->
		<div id="redinfo" v-if="hbShow4">
			<div class="next-content" @click="close">
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
				<p>
					已存入零钱,&nbsp;可直接提现
					<van-icon name="arrow" color="#c3a87b" />
				</p>
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
		<!-- 上下分 -->
		<van-overlay :show="hbShow5" @click="hbShow5 = false">
			<div class="wrapper">
				<div class="block5" @click.stop>
					<input type="number" id="grade" v-model="grade" placeholder="请输入分数" />
					<button @click="submit(0)" class="btn new">上分</button>
					<button @click="submit(1)" class="btn">下分</button>
				</div>
			</div>
		</van-overlay>
	</div>
</template>


<script>
export default {
	data() {
		return {
			hbShow: false, //抢红包
			hbShow1: false, //红包过期
			hbShow2: false, //余额不足
			hbShow3: false, //发红包
			hbShow4: false, //红包详情
			hbShow5: false, //上下分
			open: false,
			radio: 0,
			radiotype: "上分",
			grade: "", //上下分数
			openflag: true,
			value: "",
			timer: null,
			send_user: "",
			red_id: 0, //红包ID
			send_uid: 0, //发包人ID
			bill_id: 0, //账单ID
			thunder: 0, //雷点
			scroll_num: 0, //红包ID
			dataList: [],
			wsflag: true, //ws连接
			form: { money: "", num: "", thunder: "" },
			show: false,
			pwdValue: "",
			num: "",
			info: "请输入支付密码",
			showKeyboard: false,
			websock: null,
			updatedflag: true,
			hintflag: false,
		};
	},
	created() {
		// this.wsflag = true;
		this.get_reds_list(); //读取红包列表
		this.initWebSocket(); //开启ws链接
		// sessionStorage.setItem("hbShow4", 0);
		if (this.$route.query.v == 1) {
			this.updatedflag = false; //从红包详情页面返回 滚动到上次位置
		}
	},
	computed: {
		//用户详情
		get_user_info() {
			return this.$store.state.user_info;
		},
		//群聊详情
		get_group_info() {
			return this.$store.state.group_info;
		},
		// 红包列表
		reds_list() {
			return this.$store.state.reds_list;
		},
		// 红包详情
		reds_info() {
			return this.$store.state.reds_info;
		},
		// 打开过
		reds_select() {
			return this.$store.state.reds_select;
		},
		// 被抢完
		reds_select_end() {
			return this.$store.state.reds_select_end;
		},
		// 抢到
		reds_select_put() {
			return this.$store.state.reds_select_put;
		},
		// 过期
		reds_dated() {
			return this.$store.state.reds_dated;
		},
		// 头像
		imglist() {
			return this.$store.state.img_list;
		},
		//账单
		get_bill() {
			return this.$store.state.bill;
		},
		//离开时间戳数组
		get_leave_date() {
			return this.$store.state.leave_date;
		},
		//红包ID
		get_red_id() {
			return this.$store.state.reds_id;
		},
	},
	methods: {
		//初始化weosocket
		initWebSocket() {
			this.websock = new WebSocket("ws://103.233.255.86:5200"); //建立连接
			this.websock.onmessage = this.websocketonmessage; //接收信息
			this.websock.onopen = this.websocketonopen; //连接成功
			this.websock.onerror = this.websocketonerror; //连接错误
			this.websock.onclose = this.websocketclose; //连接关闭
		},
		//连接建立之后执行send方法发送数据
		websocketonopen() {
			this.websocketsend({
				type: "bindRoom",
				info: {
					uid: this.get_user_info.uid,
					group_id: this.get_group_info.id,
					old_group_id: localStorage.getItem("old_group_id") || 0,
				},
			});
		},
		//连接建立失败重连
		websocketonerror() {
			if (this.wsflag) {
				this.initWebSocket();
			}
		},
		//数据接收
		websocketonmessage(e) {
			console.log(`${this.get_group_info.id}收到:`, e.data);
			if (e.data.includes("type")) {
				let e_data = JSON.parse(e.data);
				if (e_data.type == "sendRed") {
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
					// } else if (e_data.type == "cha") {
					// let msg = {
					// 	group_id: this.get_group_info.id,
					// 	data: JSON.parse(e_data.data),
					// 	type: e_data.type,
					// };
					// this.$store.commit("add_msg_list", msg);
				} else {
					let msg = {
						group_id: this.get_group_info.id,
						data: e_data.data,
						type: e_data.type,
					};
					this.$store.commit("add_msg_list", msg);
				}
				if (
					e_data.type == "sendMsg" &&
					e_data.data.uid == this.get_user_info.uid
				) {
					main.scrollTop = main.scrollHeight;
				}
				let top = main.scrollTop + main.clientHeight;
				sessionStorage.setItem("scrollTop", main.scrollTop);
				if (main.scrollHeight > top) {
					this.updatedflag = false;
					this.hintflag = true;
				} else {
					this.updatedflag = true;
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
		// 滚动到底部
		tofloor() {
			this.hintflag = false;
			this.updatedflag = true;
		},
		// 点击聊天界面
		closebox() {
			this.open = false;
			this.hintflag = false;
			this.scroll();
		},
		// 红包状态关闭
		off() {
			this.updatedflag = false;
		},
		// 输入框聚焦
		focus() {
			// this.open = false;
			this.hintflag = false;
			this.$toast("本群已禁言");
		},
		// 弹起操作区
		check() {
			this.open = !this.open;
			this.updatedflag = true;
			this.hintflag = false;
			this.scroll();
			// if (this.open) {
			// 	return false;
			// } else {
			// 	this.scroll();
			// }
		},
		// 返回
		onClickLeft() {
			this.$router.push("/");
		},
		// 请求收款账户信息
		get_card() {
			this.$axios.get(`accounts`).then((res) => {
				console.log(res, `请求收款账户信息`);
				if (res.data.code == 1) {
					if (res.data.data == null) {
						this.$router.push({
							path: "/myCard",
							query: { v: "post" },
						});
					} else {
						this.$store.commit("update_mycard", res.data.data);
						this.$router.push("getmyCard");
					}
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
		},
		gotoPage(params, title) {
			this.$router.push({
				path: params,
				query: { title: title },
			});
			this.open = false;
		},
		// 打开发红包页面
		sendPackage() {
			if (!this.get_user_info.pay_pwd) {
				this.$dialog
					.confirm({
						message: "请先设置支付密码!",
					})
					.then(() => {
						this.$router.push("setting");
					})
					.catch(() => {
						this.$toast.fail("已取消");
					});
			} else {
				this.open = false;
				this.get_billObj(); // 获取账单
				this.hbShow3 = true;
				this.scroll();
			}
		},
		// 关闭页面
		close() {
			this.form.money = "";
			this.form.thunder = "";
			this.form.num = "";
			this.pwdValue = "";
			this.open = false;
			this.show = false;
			this.hbShow3 = false;
			this.hbShow4 = false;
			this.scroll();
		},
		//检查红包状态
		checkstatus(index) {
			this.updatedflag = false;
			sessionStorage.setItem("scrollTop", main.scrollTop);
			let top = main.scrollTop + main.clientHeight;
			if (main.scrollHeight > top) {
				this.updatedflag = false;
				sessionStorage.setItem("scrollTop", main.scrollTop);
			} else {
				this.updatedflag = true;
				sessionStorage.setItem("scrollTop", main.scrollTop);
			}
			this.send_user = this.reds_list[index].name;
			this.red_id = this.reds_list[index].id;
			this.send_uid = this.reds_list[index].send_uid;
			this.bill_id = this.reds_list[index].bill_id;
			this.thunder = this.reds_list[index].thunder;
			if (this.reds_select.includes(this.red_id)) {
				this.openPackage();
			} else {
				this.$axios
					.post("reds/redEstimate", {
						red_id: this.reds_list[index].id,
					})
					.then((res) => {
						console.log(res, "检查红包状态");
						if (res.data.code == 1) {
							this.openflag = true; //可抢
							this.hbShow = true;
						} else if (res.data.code == 0) {
							this.openflag = false; //已抢完
							this.hbShow = true;
							this.$store.commit("add_reds_select_end", this.red_id);
						} else if (res.data.code == 422) {
							this.hbShow2 = true; // 积分不足
						} else if (res.data.code == 423) {
							this.hbShow1 = true; // 红包已过期
							this.$store.commit("add_reds_dated", this.red_id);
							// this.$toast.fail("红包已过期"); // 红包已过期
						} else {
							this.$toast.fail(res.data.msg);
						}
					});
			}
		},
		// 抢红包
		openPackage() {
			let top = main.scrollTop + main.clientHeight;
			if (main.scrollHeight > top) {
				this.updatedflag = false;
				sessionStorage.setItem("scrollTop", main.scrollTop);
			} else {
				this.updatedflag = true;
				sessionStorage.setItem("scrollTop", main.scrollTop);
			}
			this.$toast.loading({
				message: "数据加载中",
				duration: 0, // 持续展示
				forbidClick: true,
			});
			this.$axios
				.patch("reds", {
					red_id: this.red_id,
					send_uid: this.send_uid,
					bill_id: this.bill_id,
					thunder: this.thunder,
				})
				.then((res) => {
					this.$toast.clear();
					if (res.data.code == 1) {
						if (res.data.data.data.packet.rob_money == null) {
							if (!this.reds_select_put.includes(this.red_id)) {
								this.$store.commit("add_reds_select_end", this.red_id);
							}
						} else {
							this.$store.commit("add_reds_select_put", this.red_id);
						}
						this.$toast.clear();
						this.$store.commit("update_reds_info", res.data.data.data); //红包详情
						this.$router.push({
							path: "/package",
							query: { v: this.updatedflag },
						});
						this.hbShow = false;
						// this.num = `${res.data.data.data.packet.rob_num}/${res.data.data.data.packet.num}`;
						// this.hbShow4 = true;
						// sessionStorage.setItem("hbShow4", 1);
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
		},
		// 请求红包列表
		get_reds_list() {
			let leave_date = 0;
			for (let item of this.get_leave_date) {
				if (this.get_group_info.id == item.group_id) {
					leave_date = item.leave_date;
					this.$axios
						.get(`reds/${this.get_group_info.id}/${leave_date}`)
						.then((res_1) => {
							console.log(res_1, `请求红包列表`);
							// clearInterval(timer);
							if (res_1.data.code == 1) {
								let arr = [];
								let newObj = {
									group_id: res_1.data.data.group_id,
									list: arr,
								};
								for (let item of res_1.data.data.list) {
									if (!this.get_red_id.includes(item.id)) {
										this.$store.commit("add_reds_id", item.id);
										arr.push(item);
									}
								}
								this.$toast.clear();
								this.$store.commit("update_group_reds_list", newObj);
							} else {
								this.$toast.fail(res_1.data.msg);
							}
						});
				}
			}
		},
		//发消息
		sendMsg() {
			this.value = "";
			this.scroll();
		},
		// 发红包
		onInput(key) {
			this.pwdValue = (this.pwdValue + key).slice(0, 6);
			if (this.pwdValue.split("").length == 6) {
				if (this.pwdValue == this.get_user_info.pay_pwd) {
					this.info = "请输入支付密码";
					this.websocketsend({
						type: "sendRed",
						info: {
							uid: this.get_user_info.uid,
							group_id: this.get_group_info.id,
							total_money: this.form.money,
							num: this.form.num,
							thunder: this.form.thunder,
							name: this.get_user_info.name,
							success: this.get_user_info.success,
						},
					});
					this.close();
				} else {
					this.pwdValue = "";
					this.info = "密码错误";
				}
			}
		},
		// 密码退格
		onDelete() {
			this.pwdValue = this.pwdValue.slice(0, this.pwdValue.length - 1);
		},
		// 上下分
		submit(v) {
			this.updatedflag = true;
			grade.blur();
			if (this.grade == "") {
				this.$toast.fail("未输入分数");
				return false;
			} else if (v == 0) {
				this.$toast("上分申请已提交,请等待审核");
				// 上分
				this.websocketsend({
					type: "upFen",
					info: {
						msg: `上分:${this.grade}`,
						group_id: this.get_group_info.id,
						money: this.grade,
						uid: this.get_user_info.uid,
						name: this.get_user_info.name,
						photo: this.get_user_info.photo,
					},
				});
			} else if (v == 1) {
				this.$toast("下分申请已提交,请等待审核");
				// 下分
				this.websocketsend({
					type: "downFen",
					info: {
						msg: `下分:${this.grade}`,
						group_id: this.get_group_info.id,
						money: this.grade,
						uid: this.get_user_info.uid,
						name: this.get_user_info.name,
						photo: this.get_user_info.photo,
					},
				});
			}
			this.hbShow5 = false;
			this.open = false;
			this.grade = "";
		},
		up_grade() {
			this.updatedflag = true;
			this.scroll();
		},
		// 查
		inquire() {
			this.websocketsend({
				type: "cha",
				info: {
					uid: this.get_user_info.uid,
				},
			});
			this.open = false;
			this.scroll();
		},
		//发送红包之前检查余额
		send() {
			if (this.form.money == "" || this.form.money < 20) {
				this.$toast.fail("红包金额错误");
				return false;
			} else if (this.form.thunder == "") {
				this.$toast.fail("未设置雷点");
			} else if (Number(this.form.money) > Number(this.get_bill.wallet)) {
				this.$toast.fail("金额不足,请充值");
			} else {
				this.show = true;
				this.showKeyboard = true;
			}
		},
		// 滚动
		scroll() {
			if (this.updatedflag) {
				setTimeout(() => {
					if (main) {
						main.scrollTop = main.scrollHeight;
					}
				}, 10);
			} else {
				main.scrollTop = sessionStorage.getItem("scrollTop");
			}
		},
		// 获取账单
		get_billObj() {
			this.$axios.get(`bill?type=1&time=1`).then((res) => {
				console.log(res, `获取账单`);
				if (res.data.code == 1) {
					this.$store.commit("update_bill", res.data.data);
				} else {
					this.$toast.fail(res.data.msg);
				}
			});
		},
		// 充值
		recharge() {
			this.copy_fun(446194466, "财务QQ");
		},
		// 联系群主
		contact() {
			this.copy_fun(54784619, "群主QQ");
		},
		// 点击复制
		copy_fun(copy, name) {
			let oInput = document.createElement("input");
			oInput.value = copy;
			document.body.appendChild(oInput);
			oInput.select(); // 选择对象;
			console.log(oInput.value);
			document.execCommand("Copy"); // 执行浏览器复制命令
			this.$toast(`${name}已复制到粘贴板`);
			oInput.remove();
		},
	},
	mounted() {
		this.scroll();
		let num = 1;
		this.timer = setInterval(() => {
			this.websocketsend(`${this.get_group_info.id}第${num}次`);
			num++;
		}, 30000);
		// 监听滚动事件，然后用handleScroll这个方法进行相应的处理
		main.addEventListener("scroll", () => {
			let top = main.scrollTop + main.clientHeight;
			if (main.scrollHeight <= top) {
				this.updatedflag = true;
				this.hintflag = false;
			} else {
				this.updatedflag = false;
				sessionStorage.setItem("scrollTop", main.scrollTop);
			}
		});
	},
	//页面渲染完毕 滚动到底部
	updated() {
		this.scroll();
	},
	filters: {
		Npf(v) {
			return Number(v).toFixed(2);
		},
	},
	beforeDestroy() {
		let data = {
			group_id: this.get_group_info.id,
			leave_date: Math.floor(new Date().getTime() / 1000),
		};
		console.log(new Date());
		localStorage.setItem("old_group_id", this.get_group_info.id);
		this.$store.commit("update_leave_date", data);
		this.$store.commit("empty", []);
		this.wsflag = false; //关闭重连
		this.websock.close(); //离开路由之后断开websocket连接
		clearInterval(this.timer);
	},
};
</script>
<style lang="scss"  scoped>
.content {
	width: 100vw;
	height: 100vh;
	padding: 0;
	position: relative;
	display: flex;
	flex-direction: column;
	.hint {
		width: 100px;
		padding: 0 2px;
		position: absolute;
		bottom: 70px;
		left: 50%;
		margin-left: -50px;
		border-radius: 3%;
		z-index: 5;
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		text-align: center;
	}
	.van-image {
		vertical-align: top;
	}
	#nav_bar_title {
		font-weight: normal !important;
	}
	#main {
		width: 100%;
		height: 100%;
		position: relative;
		flex: 1;
		padding: 0 5vw;
		overflow-y: scroll;
		background-color: #eee;
		-ms-overflow-style: none; // ie 隐藏滚动条
		overflow: -moz-scrollbars-none; // ff 隐藏滚动条
		.no {
			background-color: #fce2c2 !important;
		}
		.reds {
			width: 100%;
			margin: 2vh 0;
			display: flex;
			justify-content: flex-start;
			.msgBox {
				display: inline-block;
				vertical-align: top;
				width: 56%;
				color: #fff;
				text-indent: 0.5em;
				.red-box {
					.topconred {
						padding: 7.5px;
						padding-left: 10px;
						display: flex;
						justify-content: flex-start;
						// section {
						// 	p {
						// 		display: flex;
						// 		overflow: hidden;
						// 		flex-direction: column;
						// 		span {
						// 			width: 100%;
						// 			height: 100%;
						// 		}
						// 	}
						// }
					}
					.date {
						padding: 2px 0;
						font-size: 14px;
					}
				}
			}
		}
		.hintbox {
			width: 100%;
			color: #999;
			font-size: 14px;
			.qiang {
				line-height: 4vh;
				text-align: center;
			}
			.msglist {
				width: 100%;
				margin: 2vh 0;
				color: #333;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				position: relative;
				img {
					display: block;
					width: 45px;
					height: 45px;
					flex-shrink: 0;
					border-radius: 10%;
					// vertical-align: top;
				}
				.msg {
					.name {
						height: 15px;
						text-indent: 0.5em;
						font-size: 0.8rem;
						line-height: 15px;
						margin-bottom: 3px;
						color: #333;
					}
					.txtbox {
						width: 100%;
						padding: 7.5px 10px;
						line-height: 20px;
						text-align: left;
						border-radius: 5px;
						white-space: normal;
						.a {
							color: #2dcb67;
						}
						// display: flex;
						// justify-content: flex-start;
						// align-items: flex-start;
					}
				}
				.msg_L {
					content: "";
					position: relative;
					top: 30px;
					width: 0;
					height: 0;
					border-top: 1.5vw solid transparent;
					border-right: 1.5vw solid transparent;
					border-bottom: 1.5vw solid transparent;
					border-left: 1.5vw solid transparent;
				}
			}
			// 客服消息
			.msglist_L {
				padding-right: 20vw;
				.msg {
					.txtbox {
						background-color: #fff;
						word-break: break-all;
					}
				}
				.msg_L {
					top: 4vh;
					border-right: 1.5vw solid #fff;
				}
			}
			//我的消息
			.msglist_R {
				padding-left: 20vw;
				flex-direction: row-reverse;
				.msg {
					.txtbox {
						background-color: #2dcb67;
					}
				}
				.msg_L {
					top: 2vh;
					border-left: 1.5vw solid #2dcb67;
				}
			}
		}
		.rd_list_rr {
			flex-direction: row-reverse;
		}
		.rd_list_rr .no::after {
			border-color: transparent transparent transparent #fce2c2 !important;
		}
		.rd_list_ll .no::after {
			border-color: transparent #fce2c2 transparent transparent !important;
		}
	}
	#main::-webkit-scrollbar {
		width: 0 !important;
	} // chr saf 隐藏滚动条
	#redinfo {
		.ww-bottom {
			.van-cell {
				.right {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					.hint {
						color: #f00;
					}
				}
			}
		}
	}
}
img {
	vertical-align: top;
}

// .rd_list_ll {
// 	float: left;
// }
.rd_list_ll .msgBox {
	margin-left: 3vw;
}
.rd_list_ll .msgBox h4 {
	font-size: 0.8rem;
	margin-bottom: 3px;
	font-weight: normal;
	color: #666;
}
.rd_list_ll .red-box {
	background: #ff9800;
	width: 100%;
	border-radius: 5px;
	position: relative;
}

.rd_list_ll .red-box2 {
	background: #fff;
	width: 100%;
	border-radius: 5px;
	position: relative;
	padding: 2vw;
	text-align: justify;
}
.rd_list_ll .red-box2::after {
	content: "";
	position: absolute;
	display: inline-block;
	border-width: 1.5vw;
	border-style: solid;
	border-color: transparent #fff transparent transparent;
	top: 2vh;
	left: -3vw;
}
.rd_list_ll .red-box::after {
	content: "";
	position: absolute;
	display: inline-block;
	border-width: 1.5vw;
	border-style: solid;
	border-color: transparent #ff9800 transparent transparent;
	top: 2vh;
	left: -3vw;
}
.rd_list_ll .red-box section {
	display: inline-block;
	vertical-align: top;
	color: #fff;
	width: 75%;
}
// .rd_list_ll .topconred {
// 	padding: 2vw;
// }
.rd_list_ll .red-box ul {
	font-size: 0.6rem;
	color: #fff;
	border-top: 1px solid rgba(255, 255, 255, 0.15);
	padding: 0.5vw 2vw;
}

// .rd_list_rr {
// 	float: right;
// }
.rd_list_rr .msgBox {
	margin-left: 3vw;
	// float: right;
	margin-right: 3vw;
}
// .rd_list_rr .van-image {
// 	float: right;
// }
.rd_list_rr .msgBox h4 {
	font-size: 0.8rem;
	margin-bottom: 3px;
	font-weight: normal;
	text-align: right;
	color: #666;
}
.rd_list_rr .red-box {
	background: #ff9800;
	width: 100%;
	border-radius: 5px;
	position: relative;
}
.rd_list_rr .red-box2 {
	background: #b2e281;
	width: 100%;
	border-radius: 5px;
	position: relative;
	padding: 2vw;
	text-align: justify;
}
.rd_list_rr .red-box2::after {
	content: "";
	position: absolute;
	display: inline-block;
	border-width: 1.5vw;
	border-style: solid;
	border-color: transparent transparent transparent #b2e281;
	top: 2vh;
	right: -3vw;
}
.rd_list_rr .red-box::after {
	content: "";
	position: absolute;
	display: inline-block;
	border-width: 1.5vw;
	border-style: solid;
	border-color: transparent transparent transparent#FF9800;
	top: 2vh;
	right: -3vw;
}
.rd_list_rr .red-box section {
	display: inline-block;
	vertical-align: top;
	color: #fff;
	width: 75%;
}
// .rd_list_rr .topconred {
// 	padding: 2vw;
// 	display: flex;
// 	justify-content: flex-start;
// }
// .rd_list_rr .topconred .van-image {
// 	margin-right: 1vw;
// }
// .rd_list_rr .red-box .date {
// 	font-size: 0.8rem;
// 	color: #fff;
// 	border-top: 1px solid rgba(255, 255, 255, 0.15);
// 	padding: 0.5vw 2vw;
// }
.avatarBox {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 3vh 0 0;
	background: #f5f5f5;
}
.avatarBox li {
	width: 20vw;
	display: inline-block;
	text-align: center;
	margin: 0 2.5vw 3vh;
}
.avatarBox li .tupian {
	padding: 7vw;
	display: inline-block;
	border-radius: 10px;
}
.avatarBox li:nth-child(1) .tupian {
	background: url(../assets/packet_icon.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(2) .tupian {
	background: url(../assets/bill_icon.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(3) .tupian {
	background: url(../assets/recharge_icon.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(4) .tupian {
	background: url(../assets/proceeds_icon.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(5) .tupian {
	background: url(../assets/state.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(6) .tupian {
	background: url(../assets/touch_icon.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(7) .tupian {
	background: url(../assets/up_down.svg) center center no-repeat #fff;
	background-size: 40%;
}
.avatarBox li:nth-child(8) .tupian {
	background: url(../assets/locating.svg) center center no-repeat #fff;
	background-size: 40%;
}
.van-ellipsis {
	font-size: 0.9rem;
}
.van-cell {
	background-color: #f5f5f5;
}
.van-icon-add-o {
	margin-top: 1vh;
}
.records {
	text-align: center;
	font-size: 0.8rem;
	color: #333;
	clear: both;
	line-height: 1.5rem;
}
.records span {
	color: #999;
}
.sendArea {
	width: 100%;
	height: auto;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
	transition: 0.3s ease;
	transform: translateY(0vh);
}
.sendArea .open {
	transition: 0.3s ease;
	transform: translateY(0vh);
}
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.block {
	width: 70vw;
	height: 60vh;
	background: url(../assets/hb_tc1@3x.png);
	background-size: 70vw 60vh;
	color: #e6c98f;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	padding-top: 30%;
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		display: flex;
		align-items: center;
		img {
			width: 45px;
			margin-right: 2vw;
		}
	}
	.txt {
		text-align: center;
		line-height: 8vh;
	}
	.kai {
		width: 25%;
		position: absolute;
		top: 63%;
		left: 37.5%;
	}
	.floor {
		position: absolute;
		bottom: 7%;
	}
	.hide {
		opacity: 0;
	}
}
.block2 {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	h5 {
		text-align: center;
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
}
.block5 {
	width: 80%;
	height: auto;
	border-radius: 3%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	align-items: center;
	padding: 20px 0;
	background-color: #fff;
	input {
		width: 85%;
		height: 40px;
		margin: 20px 0 30px;
		border: 0;
		border-radius: 3%;
		text-indent: 1em;
		background-color: #eee;
	}
	.btn {
		width: 35%;
		height: 40px;
		border: 0;
		color: #fff;
		border-radius: 3%;
		background-color: #2dcb67;
	}
}
.off {
	width: 10%;
	position: relative;
	top: 3vh;
}
#redinfo {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	overflow-y: scroll;
	.next-content {
		padding: 2vh 2vw 2vh;
		color: #fff;
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
		border-radius: 10%;
		display: block;
		margin: auto;
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
	.thirdly {
		color: #b8b8b8;
		text-align: center;
		font-weight: 700;
		font-size: 0.9rem;
		margin-top: 1vh;
	}
	.fourthly {
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
		margin-bottom: 5px;
	}
	.hsu img {
		width: 45px;
		height: 45px;
		object-fit: cover;
		border-radius: 10%;
	}
	.hsu .biaoqian {
		position: absolute;
		right: 4vw;
		top: 5vh;
		color: #f25542;
	}
}
// .toux {
// 	margin: 10vh auto 2vh;
// }
// .toux img,
// .toux span {
// 	display: inline-block;
// 	vertical-align: middle;
// 	font-size: 1rem;
// }
// .block > span {
// 	font-size: 1.3rem;
// }
// .kai {
// 	margin-top: 16vh;
// }
</style>
