import { requestSeckillList } from "../../util/request"

const state = {
    list:[]
}

const mutation = {
    changeList(state,arr){
        state.list = arr;
    }
}

const actions = {
    requestList(context){
        requesrSeckillList().then(res => {
            context.commit("changeList",res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
 }

 export default {
     state,
     mutation,
     actions,
     getters,
     namespaced:true
 }