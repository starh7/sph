import axios from "axios";

import nprogress from "nprogress";
import '/node_modules/nprogress/nprogress.css'

const requests = axios.create({
    baseURL:"/mock",
    timeout:5000,
});
// 请求拦截
requests.interceptors.request.use((config)=>{
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