<template>
	<div>
		<van-tabbar v-model="currentRouterName" @change="onChange">
			<van-tabbar-item :badge="num" name="index">
				<span>聊天</span>
				<template #icon="props">
					<img
						:src="props.active ? require('../assets/talk_sel.svg') : require('../assets/talk_nor.svg')"
					/>
				</template>
			</van-tabbar-item>
			<!-- <van-tabbar-item name="contact">
        <span>通讯录</span>
        <template #icon="props">
          <img :src="props.active ? require('../assets/message_sel.svg') : require('../assets/message_nor.svg')" />
        </template>
			</van-tabbar-item>-->
			<van-tabbar-item name="service">
				<span>客服</span>
				<template #icon="props">
					<img
						:src="props.active ? require('../assets/service_sel.svg') : require('../assets/service_nor.svg')"
					/>
				</template>
			</van-tabbar-item>
			<van-tabbar-item name="mine">
				<span>我的</span>
				<template #icon="props">
					<img :src="props.active ? require('../assets/me_sel.svg') : require('../assets/me_nor.svg')" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
	data() {
		return {
			num: "",
		};
	},
	mounted() {},
	computed: {
		// ...mapState(["currentRouterName"]),
		currentRouterName: {
			get() {
				return this.$store.state.currentRouterName;
			},
			set(value) {
				this.$store.commit("setCurrentRouterName", { name: value });
			},
		},
	},

	methods: {
		onChange(event) {
			this.$store.commit("setCurrentRouterName", { name: event });
			this.active = event;
			if (event == "index") this.$router.push("/");
			else if (event == "contact") this.$router.push("contact");
			else if (event == "service") this.$router.push("service");
			else if (event == "mine") this.$router.push("mine");
		},
	},
};
</script>
<style scoped>
.van-tabbar {
	background-color: #fff;
}
</style>