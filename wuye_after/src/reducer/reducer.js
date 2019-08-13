import { combineReducers, createStore } from 'redux'
function controlBreadcrumb(state = {}, actions) {
    switch (actions.type) {
        case 'CHANGE_BREADCRUMB':
            let cur_st = state
            cur_st.cur_breadcrumb = actions.value
            return cur_st
        default:
            return state
    }
}
function controlSiderbar(state = {}, actions) {
    switch (actions.type) {
        case 'CHANGE_SIDERBAR':
            let cur_st = state
            cur_st.cur_inx = actions.value.cur_inx
            cur_st.cur_inx_1 = actions.value.cur_inx_1
            return cur_st
        default:
            return state
    }
}
function controlCommunity(state = {}, actions) {
    switch (actions.type) {
        case 'CHANGE_COMMUNITY':
            let cur_st = state
            cur_st.value=actions.value
            return cur_st
        default:
            return state
    }
}
const reducer = combineReducers({ controlBreadcrumb,controlSiderbar,controlCommunity })
const store = createStore(reducer)
export default store