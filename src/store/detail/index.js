import { getDetailList, getAddToCart } from '@/api'
import { getUUID } from '@/util/uuid'
const state = {
    detailList: {},
    uuid_token: getUUID()
}
const actions = {
    async detailList(context, skuid) {
        const result = await getDetailList(skuid)
        // console.log(result);
        if (result.code == 200) {
            context.commit('DETAILLIST', result.data)
        }
    },
    async addToCart({ context }, { skuid, skunum }) {
        let result = await getAddToCart(skuid, skunum)
        // console.log("aaa",result);
        if (result.code == 200) {

            return 'ok'

        } else {
            return Promise.reject(new Error('fail request'))
        }
    }

}
const getters = {
    categoryView(state) {
        return state.detailList.categoryView || {}
    },
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList || []
    }
}
const mutations = {
    DETAILLIST(state, detailList) {
        state.detailList = detailList
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}