import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _074c34a3 = () => interopDefault(import('..\\pages\\buy.vue' /* webpackChunkName: "pages/buy" */))
const _20659488 = () => interopDefault(import('..\\pages\\chatDetail.vue' /* webpackChunkName: "pages/chatDetail" */))
const _6b1cc58a = () => interopDefault(import('..\\pages\\chatDetailInfo.vue' /* webpackChunkName: "pages/chatDetailInfo" */))
const _b1da68c8 = () => interopDefault(import('..\\pages\\complain.vue' /* webpackChunkName: "pages/complain" */))
const _53ae9a86 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _22337ef0 = () => interopDefault(import('..\\pages\\createChatGroup.vue' /* webpackChunkName: "pages/createChatGroup" */))
const _c951f3e2 = () => interopDefault(import('..\\pages\\getmyCard.vue' /* webpackChunkName: "pages/getmyCard" */))
const _41837b23 = () => interopDefault(import('..\\pages\\getSmsCode.vue' /* webpackChunkName: "pages/getSmsCode" */))
const _12037210 = () => interopDefault(import('..\\pages\\group_team.vue' /* webpackChunkName: "pages/group_team" */))
const _590962cc = () => interopDefault(import('..\\pages\\groupList.vue' /* webpackChunkName: "pages/groupList" */))
const _6c63eec6 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _88f0bb92 = () => interopDefault(import('..\\pages\\menbers.vue' /* webpackChunkName: "pages/menbers" */))
const _6384e0f4 = () => interopDefault(import('..\\pages\\mine.vue' /* webpackChunkName: "pages/mine" */))
const _2e6ba1e8 = () => interopDefault(import('..\\pages\\modifyPassword.vue' /* webpackChunkName: "pages/modifyPassword" */))
const _b953cf66 = () => interopDefault(import('..\\pages\\myAcount.vue' /* webpackChunkName: "pages/myAcount" */))
const _b441aa62 = () => interopDefault(import('..\\pages\\myCard.vue' /* webpackChunkName: "pages/myCard" */))
const _6de33e70 = () => interopDefault(import('..\\pages\\myGroupChat.vue' /* webpackChunkName: "pages/myGroupChat" */))
const _09e63fe3 = () => interopDefault(import('..\\pages\\package.vue' /* webpackChunkName: "pages/package" */))
const _7645f7ce = () => interopDefault(import('..\\pages\\recommend.vue' /* webpackChunkName: "pages/recommend" */))
const _568308bb = () => interopDefault(import('..\\pages\\sendPackage.vue' /* webpackChunkName: "pages/sendPackage" */))
const _60c802d2 = () => interopDefault(import('..\\pages\\service.vue' /* webpackChunkName: "pages/service" */))
const _31ad470f = () => interopDefault(import('..\\pages\\serviseMsg.vue' /* webpackChunkName: "pages/serviseMsg" */))
const _7e3196ba = () => interopDefault(import('..\\pages\\setPassword.vue' /* webpackChunkName: "pages/setPassword" */))
const _671ff626 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages/setting" */))
const _95b1adb0 = () => interopDefault(import('..\\pages\\settingPassword.vue' /* webpackChunkName: "pages/settingPassword" */))
const _78559a36 = () => interopDefault(import('..\\pages\\webView.vue' /* webpackChunkName: "pages/webView" */))
const _ba8768a2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/buy",
    component: _074c34a3,
    name: "buy"
  }, {
    path: "/chatDetail",
    component: _20659488,
    name: "chatDetail"
  }, {
    path: "/chatDetailInfo",
    component: _6b1cc58a,
    name: "chatDetailInfo"
  }, {
    path: "/complain",
    component: _b1da68c8,
    name: "complain"
  }, {
    path: "/contact",
    component: _53ae9a86,
    name: "contact"
  }, {
    path: "/createChatGroup",
    component: _22337ef0,
    name: "createChatGroup"
  }, {
    path: "/getmyCard",
    component: _c951f3e2,
    name: "getmyCard"
  }, {
    path: "/getSmsCode",
    component: _41837b23,
    name: "getSmsCode"
  }, {
    path: "/group_team",
    component: _12037210,
    name: "group_team"
  }, {
    path: "/groupList",
    component: _590962cc,
    name: "groupList"
  }, {
    path: "/login",
    component: _6c63eec6,
    name: "login"
  }, {
    path: "/menbers",
    component: _88f0bb92,
    name: "menbers"
  }, {
    path: "/mine",
    component: _6384e0f4,
    name: "mine"
  }, {
    path: "/modifyPassword",
    component: _2e6ba1e8,
    name: "modifyPassword"
  }, {
    path: "/myAcount",
    component: _b953cf66,
    name: "myAcount"
  }, {
    path: "/myCard",
    component: _b441aa62,
    name: "myCard"
  }, {
    path: "/myGroupChat",
    component: _6de33e70,
    name: "myGroupChat"
  }, {
    path: "/package",
    component: _09e63fe3,
    name: "package"
  }, {
    path: "/recommend",
    component: _7645f7ce,
    name: "recommend"
  }, {
    path: "/sendPackage",
    component: _568308bb,
    name: "sendPackage"
  }, {
    path: "/service",
    component: _60c802d2,
    name: "service"
  }, {
    path: "/serviseMsg",
    component: _31ad470f,
    name: "serviseMsg"
  }, {
    path: "/setPassword",
    component: _7e3196ba,
    name: "setPassword"
  }, {
    path: "/setting",
    component: _671ff626,
    name: "setting"
  }, {
    path: "/settingPassword",
    component: _95b1adb0,
    name: "settingPassword"
  }, {
    path: "/webView",
    component: _78559a36,
    name: "webView"
  }, {
    path: "/",
    component: _ba8768a2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
