import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default function({ $axios, redirect, store, app, $msgbox }) {
    $axios.onRequest(config => {
        config.baseURL = "http://57505web.com/api/v1/";
        config.headers.Authorization=localStorage.getItem("Authorization")//正式
        // const excludeTokenAPI = ["/api/user/get_code", "/api/user/token_code"];
        // if (!excludeTokenAPI.includes(config.url) && config.method === "post") {
        //     console.log(config.data);
            // 这里 vuex-persist 有一个bug,在页面刷新的瞬间无法取值，只能直接通过localstorage获取token

            // config.data.token =
            //     store.state.userInfo.token || localStorage.getItem("token");
            // // config.data.type = 'web';
            // config.data.web_code = "web";
        // }
    });
    $axios.onError(error => {
      if (error.response.status==401) {
            if(!localStorage.getItem('user')){
              return false
            }else if(JSON.parse(localStorage.getItem('user')).mobile==""||JSON.parse(localStorage.getItem('user')).password==""){
              return false
            }else{
              Toast.loading({
                message: "服务器重连中",
                duration: 0, // 持续展示 toast
                forbidClick: true,
              });
              $axios
              .post("members/login", {
                  mobile: JSON.parse(localStorage.getItem('user')).mobile,
                  password: JSON.parse(localStorage.getItem('user')).password
                })
                .then(res_jwt => {
                  Toast.clear()
                  if (res_jwt.data.code == 1){
                    // 保存用户信息
                    localStorage.setItem(
                      "Authorization",
                      `${res_jwt.data.data.token_type} ${res_jwt.data.data.access_token}`
                    );
                    Toast.success("重连成功");
                  }else{
                    Toast.fail("自动重连失败,请重新登录");
                  }
                }).catch(()=>{
                  Toast.clear()
                  Toast.fail("重连失败!请重新登录");
                })
            }
      }else if(error.response.status==429) {
        Toast.fail("操作太快,请稍后再试!");
      }else if(error.response.status==422) {
        Toast.fail("数据无效!");
      }else if(error.response.status==500) {
        Toast.fail("服务器出错了!");
      }else{
        Toast.fail("捕获到其他错误!");
      }
    });
}