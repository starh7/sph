import {getContainList,getBannerList, getFloorList} from '/src/api'
const state = {
    catagoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,catagoryList){
        state.catagoryList = catagoryList 
    },
    // 获取banner数据
    BANNERLIST(state,bannerList){
        // console.log('我在修改数据');  
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    async catagoryList(context){
        // console.log(getContainList().code);
        const result = await getContainList()
        if(result.code == 200){
            context.commit('CATEGORYLIST',result.data)
        }
        
    },
    async bannerList(context){
        const result = await getBannerList()
        // console.log(result);
        if(result.code == 200){
            // console.log('我在获取数据');    
            context.commit('BANNERLIST',result.data)
        }
    },
    async floorList(context){
        let result = await getFloorList()
        // console.log(result);
        if(result.code == 200){
            context.commit('FLOORLIST',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}