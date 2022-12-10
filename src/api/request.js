import axios from "axios";

import nprogress from "nprogress";
import '/node_modules/nprogress/nprogress.css'

// 引入store
import store from '@/store/index'

const requests = axios.create({
    baseURL:"/api",
    timeout:5000,
});
// 请求拦截
requests.interceptors.request.use((config)=>{
    // console.log(store);
    if(store.state.detail.uuid_token){
        config.headers['userTempId']  = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers['token'] = store.state.user.token
        // console.log('1111',store.state.user.token);
    }
    nprogress.start()
    return config;
});

// 响应拦截
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(rej)=>{
    return Promise.reject(new Error("fail"))
})

// 暴露request
export default requests