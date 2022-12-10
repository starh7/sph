import {getUserAddress,getOrderInfo} from '@/api'
const state ={
    address:[],
    orderInfo:{}
}
const actions ={
    // 获取用户地址信息
    async userAddress(context){
      let result =   await getUserAddress()
      if(result.code == 200){
        context.commit('USERADDRESS',result.data)
      }
    },
    // 用户订单交易页面信息
    async orderInfo(context){
       let result =  await getOrderInfo()
    //    console.log(result);
    if(result.code == 200){
        context.commit('ORDERINFO',result.data)
    }
    }
    
}
const mutations = {
    // 用户地址信息
    USERADDRESS(state,data){
        state.address = data
        let address =[
            {userName:'张三',userAdd:'北京市昌平区宏福科技园综合楼6层',userPho:'15010658793' ,isDeafalut:0},
            {userName:'李四',userAdd:'北京市昌平区宏福科技园综合楼7层',userPho:'13590909098' ,isDeafalut:1}
        ]
        if(data.length==0){
            state.address = address
        }
    },
    // 用户订单交易页面信息
    ORDERINFO(state,data){
        state.orderInfo = data
    }

}
const getters ={}
export default{
    state,
    actions,
    mutations,
    getters
}