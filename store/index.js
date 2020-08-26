
import VuexPersistence from 'vuex-persist'
export const state = () => ({
  currentRouterName: "index",
  user_info:{},//用户信息
  group_list:[],//群聊列表
  group_info:{},//群聊详情
  group_reds_list:[],//群聊红包列表
  reds_list:[],//红包列表
  reds_info:{},//红包详情
  reds_select:[],//抢过或者已抢完
  reds_select_put:[],//抢过的红包
  reds_select_end:[],//已抢完的红包
  reds_dated:[],//已过期的红包
  join_list:[],//进群审核列表
  rule_list:[],//奖励列表
  subordinate_list:[],//下级列表
  leave_date:[],//时间戳
  leave_date_id:[],//时间戳群ID
  goodsNum:[],//靓号
  reds_id:[],//红包ID
  groupUser:[],//群成员
  feedbacks:[],//投诉与建议
  bill:{},//账单
  mycard:{},//收款账户
  article:{},//文章
  img_list:[
    { img_url: require("../assets/tx_8@3x.png") },
    { img_url: require("../assets/tx_7@3x.png") },
    { img_url: require("../assets/tx_6@3x.png") },
    { img_url: require("../assets/tx_5@3x.png") },
    { img_url: require("../assets/tx_4@3x.png") },
    { img_url: require("../assets/tx_3@3x.png") },
    { img_url: require("../assets/tx_2@3x.png") },
    { img_url: require("../assets/tx_1@3x.png") },
  ],//头像列表

});

export const mutations = {
  setCurrentRouterName(state, payload) {
    state.currentRouterName = payload.name;
  },
  //收款账户
  update_mycard(state, data) {
    state.mycard = data;
  },
  //靓号
  update_goodsNum(state, data) {
    state.goodsNum = data;
  },
  //文章
  update_article(state, data) {
    state.article = data;
  },
  //投诉与建议
  add_feedbacks(state, data) {
    state.feedbacks.push(data);
  },
  //用户信息
  update_user_info(state, data) {
    state.user_info = data;
  },
  //群聊列表
  update_group_list(state, data) {
    state.group_list = data;
  },
  //群聊详情
  update_group_info(state, data) {
    state.group_info = data;
  },
  // //添加 群聊红包列表
  // add_group_reds_list(state, data) {
  //   state.group_reds_list.push(data);
  // },
  // 清空红包列表
  empty(state, data){
    state.reds_list=data;
  },
  // 清空群聊信息
  clearlist(state){
    for (let item of state.group_reds_list) {
        item.list=[]
    }
    state.reds_select=[]
    state.reds_select_put=[]
    state.reds_select_end=[]
    state.reds_id=[]
    state.reds_dated=[]
    state.feedbacks=[]
  },
  // 群成员
  update_groupUser(state, data){
    state.groupUser=data;
  },
  //设置群聊红
  set_group_reds_list(state, data) {
    state.group_reds_list.push(data);
  },
  //更新 群聊红包列表
  update_group_reds_list(state, data) {
    for (let item1 of state.group_reds_list) {
      if(item1.group_id==data.group_id){
        item1.list=item1.list.concat(data.list)
        state.reds_list=item1.list
        break;//跳出循环
      }
    }
  },
  add_group_reds_list(state, data) {
      if(!state.reds_id.includes(data.list.id)){
        state.reds_id.push(data.list.id);
      for (let item1 of state.group_reds_list) {
        if(item1.group_id==data.group_id){
          item1.list.push(data.list)
          state.reds_list=item1.list
          break;//跳出循环
        }
      }
    }
  },
  add_reds_id(state, data){
    state.reds_id.push(data.id);
  },
  //红包列表
  // update_reds_list(state, data) {
  //   for (let item of update_reds_list) {

  //     // state.reds_list.push(item)
  //   }
  // },
  // ws红包反馈入红包列表
  add_msg_list(state, data) {
    for (let item of state.group_reds_list) {
      if(item.group_id==data.group_id){
        item.list.push(data)
        state.reds_list=item.list
        break;//跳出循环
      }
    }
  },
  //红包详情
  update_reds_info(state, data) {
    state.reds_info = data;
  },
  //红包ID
  update_reds_id(state, data) {
    if(!state.reds_id.includes(data)){
      state.reds_id.push(data);
    }
  },
  // 抢过的红包
  add_reds_select_put(state, data) {
    if (state.reds_select_end.includes(data)) {
      state.reds_select_end.splice(state.reds_select_end.indexOf(data),1)
    }
    if(!state.reds_select.includes(data)){
      state.reds_select.push(data);
    }
    if(!state.reds_select_put.includes(data)){
      state.reds_select_put.push(data);
    }
    if (state.reds_dated.includes(data)) {
      state.reds_dated.splice(state.reds_dated.indexOf(data),1)
    }
  },
  // 已被人抢完的红包
  add_reds_select_end(state, data) {
    if (state.reds_dated.includes(data)) {
      return false
    }else if(!state.reds_select_end.includes(data)){
      state.reds_select_end.push(data);
    }
    if(!state.reds_select.includes(data)){
      state.reds_select.push(data);
    }
  },
  // 已过期的红包
  add_reds_dated(state, data) {
    if(!state.reds_dated.includes(data)){
      state.reds_dated.push(data);
    }
    if(!state.reds_select.includes(data)){
      state.reds_select.push(data);
    }
},
   //进群审核列表
   update_join_list(state, data) {
    state.join_list = data;
  },
   //奖励列表
   update_rule_list(state, data) {
    state.rule_list = data;
  },
  //账单列表
  update_bill(state, data) {
    state.bill = data;
  },
  //设置时间戳
  set_leave_date(state, data) {
    state.leave_date.push(data);
  },
  //更新时间戳
  update_leave_date(state, data) {
    for (let item of state.leave_date) {
      if(data.group_id==item.group_id){
        item.leave_date=data.leave_date
      }
    }
  },
  //时间戳ID
  update_leave_date_id(state, data) {
    state.leave_date_id.push(data);
  },
  //下级列表
  update_subordinate_list(state, data) {
    state.subordinate_list = data;
  },
};
export const plugins=[new VuexPersistence().plugin]
// export const actions = {
//   async gotoPage(params){
//     console.log(params);
//     const { status,data } = await this.$axios.get("/api/v1/members/1");
//   }
// };
