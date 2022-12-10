import {getSearchList} from '/src/api'
const state = {
    searchList:{}
}
const mutations = {
    SEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async searchList(context,list){
        let result = await getSearchList(list)
        // console.log(result);
        if(result.code == 200){
            context.commit('SEARCHLIST',result.data)
        }
    }
}
const getters = {
    goodsList(state){
        // 防止网不好没获得数据产生错误
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        
        return state.searchList.attrsList||[]
    },
    trademarkList(state){
        
        return state.searchList.trademarkList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}