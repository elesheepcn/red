<template>
	<div class="content">
		<van-nav-bar title="我的账户" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
		<van-grid class="fontsty" :column-num="2">
			<van-grid-item>
				<p>
					总积分
					<br />
					<span>{{get_bill.wallet}}</span>
				</p>
			</van-grid-item>
			<!-- <van-grid-item>
				<p>
					冻结积分
					<br />
					<span>{{get_bill.freeze|Npf}}</span>
				</p>
			</van-grid-item>-->
			<!-- <van-grid-item @click="pickerTime('请选择开始时间')">
				<p>
					开始时间 ↓
					<br />
					<span>{{startTime}}</span>
				</p>
			</van-grid-item>
			<van-grid-item @click="pickerTime('请选择结束时间')">
				<p>
					结束时间 ↓
					<br />
					<span>{{endTime}}</span>
				</p>
			</van-grid-item>-->

			<van-grid-item>
				<p>
					今日输赢
					<br />
					<span>{{get_bill.day_bunko|Npf}}</span>
				</p>
			</van-grid-item>
			<van-grid-item @click="typeShow=true">
				<p>
					选择分类 ↓
					<br />
					<span>{{trendName}}</span>
				</p>
			</van-grid-item>
			<van-grid-item @click="typeShow2=true">
				<p>
					查询范围 ↓
					<br />
					<span>{{trendName2}}</span>
				</p>
			</van-grid-item>
		</van-grid>

		<!-- <van-cell-group :title="trendName + `累计：${get_bill.sum_money}`">
			<van-cell
				v-for="(item,index) in get_bill.list"
				:key="index"
				:title="item.money"
				:value="item.created_at"
			/>
		</van-cell-group> -->
		<div class="title">{{trendName + `累计：${get_bill.sum_money}`}}</div>
		<div class="group" v-for="(item,index) in get_bill.list" :key="index">
			<span>{{item.money}}</span>
			<span v-show="item.red_type">{{item.red_type}}{{item.extra_money}}</span>
			<span>{{item.created_at}}</span>
		</div>

		<van-action-sheet v-model="timeShow" :round="false">
			<van-datetime-picker
				v-model="currentDate"
				type="datetime"
				:title="title"
				:min-date="minDate"
				:max-date="maxDate"
				@confirm="getTime"
			/>
		</van-action-sheet>

		<van-action-sheet title="选择交易类型" v-model="typeShow" :round="false">
			<ul class="trendType">
				<li
					v-for="(item,index) in trendType"
					:key="index"
					:class="item.sel?'cur':''"
					@click="selType(index)"
				>{{item.name}}</li>
			</ul>
		</van-action-sheet>
		<van-action-sheet title="选择查询范围" v-model="typeShow2" :round="false">
			<ul class="trendType">
				<li
					v-for="(item,index) in trendType2"
					:key="index"
					:class="item.type==curtype?'cur':''"
					@click="selType2(index)"
				>{{item.name}}</li>
			</ul>
		</van-action-sheet>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			timeShow: false, //是否打开时间选择器
			typeShow: false, //是否选择器类型
			typeShow2: false, //是否选择器类型
			title: "", //时间选择器标题
			minDate: new Date(2020, 0, 1),
			maxDate: new Date(2025, 0, 1),
			currentDate: new Date(),
			startTime: new Date().toLocaleDateString(),
			endTime: new Date().toLocaleDateString(),
			trendType: [
				{ type: 1, name: "上分", sel: false },
				{ type: 2, name: "下分", sel: false },
				{ type: 3, name: "红包发布", sel: false },
				{ type: 4, name: "红包领取", sel: false },
				// {name:'红包奖励',sel:false},
				// {name:'中了雷包',sel:false},
				// {name:'股份收益',sel:false},
			],
			trendType2: [
				{ type: 1, name: "今日", sel: false },
				{ type: 2, name: "本周", sel: false },
				{ type: 3, name: "本月", sel: false },
				// { type: 4, name: "红包领取", sel: false },
				// {name:'红包奖励',sel:false},
				// {name:'中了雷包',sel:false},
				// {name:'股份收益',sel:false},
			],
			curtype: 1, //默认查询范围 今日
			type: 4,
			trendName: "红包领取", //分类查询默认值
			trendName2: "今日", //分类查询默认值
			form: {},
			startTime_flag: 0, //选择时间标志
			endTime_flag: 0, //选择时间标志
		};
	},
	created() {
		this.get_billObj();
	},
	computed: {
		get_bill() {
			return this.$store.state.bill;
		},
	},
	filters: {
		Npf(v) {
			return Number(v).toFixed(2);
		},
	},
	methods: {
		onClickLeft() {
			this.$router.push("/chatDetail");
		},
		gotoPage() {
			this.$router.push("settingPassword");
		},
		// 获取账单
		get_billObj() {
			this.$toast.loading({
				message: "同步账单数据中",
				duration: 0, // 持续展示 toast
				forbidClick: true,
			});
			// setTimeout(() => {
			// 	this.$toast.fail("同步失败");
			// }, 9000);
			this.$axios
				.get(`bill?type=${this.type}&time=${this.curtype}`)
				.then((res) => {
					console.log(res, `获取账单`);
					if (res.data.code == 1) {
						this.$toast.clear();
						this.$store.commit("update_bill", res.data.data);
					} else {
						this.$toast.fail(res.data.msg);
					}
				});
		},
		pickerTime(params) {
			this.timeShow = true;
			this.title = params;
		},
		getTime(value) {
			if (this.title == "请选择开始时间") {
				this.startTime_flag = 1;
				this.startTime = this.$c.toTimeString(
					value.getTime(),
					"yyyy-MM-dd HH:mm"
				);
			} else {
				this.endTime_flag = 1;
				this.endTime = this.$c.toTimeString(
					value.getTime(),
					"yyyy-MM-dd HH:mm"
				);
			}
			this.timeShow = false;
		},
		selType2(index) {
			this.curtype = index + 1;
			this.trendName2 = this.trendType2[index].name;
			this.typeShow2 = false;
			this.get_billObj();
		},
		selType(index) {
			// if (this.startTime_flag == 0) {
			// 	this.$toast.fail("请设置开始时间");
			// } else if (this.endTime_flag == 0) {
			// 	this.$toast.fail("请设置结束时间");
			// } else {
			for (let i in this.trendType) {
				if (i == index) {
					this.trendType[i].sel = true;
					this.trendName = this.trendType[i].name;
					this.type = this.trendType[i].type;
					this.get_billObj();
				} else {
					this.trendType[i].sel = false;
				}
			}
			// }
			this.typeShow = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eee;
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
  .title{
    line-height: 40px;
    padding-left: 15px;
    font-size: 14px;
    color: #999;
  }
	.group {
		height: 40px;
    color: #333;
    font-size: 14px;
		padding: 0 15px;
		line-height: 40px;
		background-color: #fff;
    display: flex;
    justify-content: space-between;
	}
}
.fontsty {
	margin-top: 8vh;
}
.fontsty p {
	text-align: center;
}
.fontsty p span {
	color: #999;
	font-size: 0.8rem;
}
.trendType {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	padding: 5vw;
}
.trendType li {
	width: 27vw;
	background: #eee;
	color: #333;
	text-align: center;
	padding: 2vw;
	margin: 1vh 0;
	border-radius: 3px;
}
.trendType li.cur {
	background: #36c86c;
	color: #fff;
}
</style>

