export { default as Communication } from '../..\\components\\communication.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Tabot } from '../..\\components\\tabot.vue'

export const LazyCommunication = import('../..\\components\\communication.vue' /* webpackChunkName: "components_communication'}" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo'}" */).then(c => c.default || c)
export const LazyTabot = import('../..\\components\\tabot.vue' /* webpackChunkName: "components_tabot'}" */).then(c => c.default || c)
