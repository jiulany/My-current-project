import store from '../reducer/reducer'
export const breadcrumb_path = [{
    //业主管理
    path: "/",
    value: "业主管理"
}, {
    path: "/add_owner",
    value: "业主管理-添加业主"
}, {//报修管理
    path: "/repair_manage",
    value: "报修管理"
}, {
    path: "/repair_manage/add_repair",
    value: "报修管理-添加"
}, {//缴费列表
    path: "/water_list",
    value: "缴费列表"
}, {
    path: "/water_list/add_water",
    value: "缴费列表-添加"
}, {
    path: "/gas_list",
    value: "缴费列表"
}, {
    path: "/gas_list/add_gas",
    value: "缴费列表-添加"
}, {
    path: "/electricity_list",
    value: "缴费列表"
}, {
    path: "/electricity_list/add_electricity",
    value: "缴费列表-添加"
}, {
    path: "/property_list",
    value: "缴费列表"
}, {
    path: "/property_list/add_property",
    value: "缴费列表-添加"
}, {
    path: "/garbage_list",
    value: "缴费列表"
}, {
    path: "/garbage_list/add_garbage",
    value: "缴费列表-添加"
}, {//公告列表
    path: "/notice_list",
    value: "小区公告"
}, {
    path: "/notice_list/add_notice",
    value: "小区公告-发布内容"
}, {//物业设置
    path: "/quarters_list",
    value: "物业设置"
}, {
    path: "/household_list",
    value: "物业设置"
}, {
    path: "/merchant_list",
    value: "物业设置"
}, {
    path: "/parking_list",
    value: "物业设置"
}, {
    path: "/quarters_list/add_quarters",
    value: "物业设置-添加"
}, {
    path: "/household_list/add_household",
    value: "物业设置-添加"
}, {
    path: "/merchant_list/add_merchant",
    value: "物业设置-添加"
}, {
    path: "/parking_list/add_parking",
    value: "物业设置-添加"
}]
export function matchPath(path) {
    for (let i in breadcrumb_path) {
        if (breadcrumb_path[i].path === path) {
            store.dispatch({ type: "CHANGE_BREADCRUMB", value: breadcrumb_path[i].value })
            break
        }
    }
}