import { getSendCode, getRegister, getLogin, getUserInfo,getLogout } from "@/api"
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo:{}

}
const actions = {
    // 获取验证码
    async getCode(context, phone) {
        let result = await getSendCode(phone)
        console.log(result);
        if (result.code == 200) {
            context.commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("失败"))
        }
    },
    // 注册
    async goRegister({ context }, { phone, code, password }) {
        let result = await getRegister({ phone, code, password })
        // console.log(result);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 登入
    async goLogin(context, { phone, password }) {
        let result = await getLogin({ phone, password })
        //    console.log(result);
        if (result.code == 200) {
            context.commit('GOLOGIN', result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async userInfo(context) {
        let result = await getUserInfo()
        console.log(result);
        // 要获得用户信息，得在头部告诉你是谁
        if(result.code == 200){
            context.commit('USERINFO',result.data)
        }
    },
    // 退出登入
    async logout(context){
        let result = await getLogout()
        if(result.code == 200){
            context.commit("LOGOUT")
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    }
}
const mutations = {
    // 获取验证码
    GETCODE(state, code) {
        state.code = code
    },
    // 登入
    GOLOGIN(state, token) {
        state.token = token
    },
    // 用户信息
    USERINFO(state,data){
        state.userInfo = data
    },
    // 退出登入 
    LOGOUT(state){
        state.token = ''
        localStorage.removeItem('TOKEN')
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}