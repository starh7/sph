import { getShopCartList, getDeleteCartById ,getCheckCart} from "@/api"
const state = {
    shopCartList: []
}
const actions = {
    // 获取商品列表
    async shopCartList(context) {
        let result = await getShopCartList()
        // console.log(result.data);
        if (result.code == 200) {
            context.commit('SHOPCARTLIST', result.data)
        }
    },
    // 删除商品
    async deleteItem({context}, skuId) {
        let result = await getDeleteCartById(skuId)
        // console.log(result);
        if (result.code == 200) {
            console.log("123");
            return 'ok'
        } else {
            return Promise.reject(new Error("fail delete"))
        }
    },
    // 修改商品选中状态
    async checkCart({context},{skuId,isChecked}){
        let result =await getCheckCart(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    // 删除选中产品
    deleteAll({state,dispatch}){
        let promiseAll = []
        state.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked == 1){
                let promise =  dispatch('deleteItem',item.skuId)
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll)
    },
    // 修改商品全部状态
    allCheckedChange({state,dispatch},checked){
        let promiseAll = []
        state.shopCartList.cartInfoList.forEach(item=>{
           let promise =  dispatch('checkCart',{skuId:item.skuId,isChecked:checked})
           promiseAll.push(promise)
        })
return Promise.all(promiseAll)
    }

}
const mutations = {
    SHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList[0]
    }
}
const getters = {
    cartInfoList(state) {
        return state.shopCartList.cartInfoList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}