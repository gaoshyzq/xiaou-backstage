import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"//vuex本地存储持久化插件

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:{}
    },
    mutations:{
        setUser(state,user){
            state.user = user
        }
    },
    plugins: [createPersistedState()]//vuex本地存储持久化插件
})