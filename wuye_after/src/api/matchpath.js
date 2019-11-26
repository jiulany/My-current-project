import store from '../reducer/reducer'
export const breadcrumb_path = [{
    //业主管理
    path: "/index/ye_list",
    value: "业主管理"
}, {
    path: "/index/ye_list/add_owner",
    value: "业主管理-添加业主"
}, {//报修管理
    path: "/index/repair_manage",
    value: "报修管理"
}, {
    path: "/index/repair_manage/add_repair",
    value: "报修管理-添加"
}, {//缴费列表
    path: "/index/water_list",
    value: "缴费列表"
}, {
    path: "/index/water_list/add_water",
    value: "缴费列表-添加"
}, {
    path: "/index/gas_list",
    value: "缴费列表"
}, {
    path: "/index/gas_list/add_gas",
    value: "缴费列表-添加"
}, {
    path: "/index/electricity_list",
    value: "缴费列表"
}, {
    path: "/index/electricity_list/add_electricity",
    value: "缴费列表-添加"
}, {
    path: "/index/property_list",
    value: "缴费列表"
}, {
    path: "/index/property_list/add_property",
    value: "缴费列表-添加"
}, {
    path: "/index/garbage_list",
    value: "缴费列表"
}, {
    path: "/index/garbage_list/add_garbage",
    value: "缴费列表-添加"
}, {
    path: "/index/stopcar_list",
    value: "缴费列表"
}, {
    path: "/index/stopcar_list/add_stopcar",
    value: "缴费列表-添加"
}, {//公告列表
    path: "/index/notice_list",
    value: "小区公告"
}, {
    path: "/index/notice_list/add_notice",
    value: "小区公告-发布内容"
}, {//物业设置
    path: "/index/quarters_list",
    value: "物业设置"
}, {
    path: "/index/household_list",
    value: "物业设置"
}, {
    path: "/index/merchant_list",
    value: "物业设置"
}, {
    path: "/index/parking_list",
    value: "物业设置"
}, {
    path: "/index/quarters_list/add_quarters",
    value: "物业设置-添加"
}, {
    path: "/index/household_list/add_household",
    value: "物业设置-添加"
}, {
    path: "/index/merchant_list/add_merchant",
    value: "物业设置-添加"
}, {
    path: "/index/parking_list/add_park_floor",
    value: "物业设置-添加"
}, {//楼面管理
    path: "/index/floor_manage",
    value: "楼面管理"
}, {//车位管理
    path: "/index/parking_manage",
    value: "车位管理"
}, {//车位管理
    path: "/index/charging_manage",
    value: "充电管理"
}, {//水费详情
    path: "/index/water_list/pay_details",
    value: "缴费详情"
}, {//气费详情
    path: "/index/gas_list/pay_details",
    value: "缴费详情"
}, {//电费详情
    path: "/index/electricity_list/pay_details",
    value: "缴费详情"
}, {//物业费详情
    path: "/index/property_list/pay_details",
    value: "缴费详情"
}, {//垃圾费详情
    path: "/index/garbage_list/pay_details",
    value: "缴费详情"
}, {//停车费详情
    path: "/index/stopcar_list/pay_details",
    value: "缴费详情"
}, {//小区审核
    path: "/index/quarters_examine",
    value: "审核管理-小区审核"
}, {//车位审核
    path: "/index/park_examine",
    value: "审核管理-车位审核"
}]
export function matchPath(path) {
    for (let i in breadcrumb_path) {
        if (breadcrumb_path[i].path === path) {
            store.dispatch({ type: "CHANGE_BREADCRUMB", value: breadcrumb_path[i].value })
            break
        }
    }
}