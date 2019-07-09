import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user: {},
    seleGoods: [],
    payData: {},
    orderDetails: {},
    seleShop:{}
}
const getters = {
    getUser() {
        return state.user
    },
    getSeleGoods() {
        return state.seleGoods
    },
    getOrderDetails() {
        return state.orderDetails
    }
}
const mutations = {
    addSeleGoods(state, num) {
        if (state.seleGoods.length == 0) {
            state.seleGoods.push(num)
        } else {
            let a = state.seleGoods.some(itm => {
                return itm.id == num.id
            })
            if (a) {

            } else {
                state.seleGoods.push(num)
            }
        }
    },
    removeSeleGoods(state, num) {
        for (let i in state.seleGoods) {
            if (state.seleGoods[i] == num) {
                state.seleGoods.splice(i, 1)
                break
            }
        }
    },
    removeAllSeleGoods(state) {
        state.seleGoods = []
    },
    addAllSele(state, num) {
        let a = []
        a = a.concat(num) //解耦num 和state.seleGoods
        state.seleGoods = a
    },
    addPayData(state, num) {
        state.payData = num
    },
    addOrderDetails(state, num) {
        state.orderDetails = num
    },
    addSeleShop(state,num){
        state.seleShop = num
    }
}
const actions = {
    addSeleGoodsAc(context, num) {
        context.commit('addSeleGoods', num)
    },
    addAllSeleAc(context, num) {
        context.commit('addAllSele', num)
    },
    removeSeleGoodsAc(context, num) {
        context.commit('removeSeleGoods', num)
    },
    removeAllSeleGoodsAc(context, num) {
        context.commit('removeAllSeleGoods', num)
    },
    addPayDataAc(context, num) {
        context.commit('addPayData', num)
    },
    addOrderDetailsAc(context, num) {
        context.commit("addOrderDetails", num)
    },
    addSeleShopAc(context,num){
        context.commit("addSeleShop", num)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})