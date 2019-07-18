import React from 'react';
import { Button } from 'antd';
import http from '../../api/http.js'
function payStatus(pay_status){
    if(pay_status===0){
        return '未付款'
    }
    if(pay_status===1){
        return '已付款'
    }
}
function payType(pay_type){
    if(pay_type===0){
        return '未付款'
    }
    if(pay_type===1){
        return '微信'
    }
    if(pay_type===2){
        return '支付宝'
    }
    if(pay_type===3){
        return '现金'
    }
    if(pay_type===4){
        return '在线支付(银行卡支付)'
    }
}
function stopCarStatus(st){
    if(st===1){
        return '闲置'
    }
    if(st===2){
        return '租用'
    }
    if(st===3){
        return '自用'
    }
    if(st===4){
        return '人防'
    }
}
function yeZhuStatus(st){
    if(st===1){
        return '自住'
    }
    if(st===2){
        return '闲置'
    }
    if(st===3){
        return '装修'
    }
    if(st===4){
        return '出租'
    }
}
export const HEAD_CONF = {
    YE_ZHU: {//业主
        head: ["业主姓名", "业主电话", "门牌号", "房屋面积", "产权号", "居住人数", "房屋状态", "操作"],
        dele_title: "删除业主信息",
        add_path: '/add_owner'
    },
    REPAIR_MANAGE: {//报修
        head: ["订单号", "订单服务人员", "服务类型", "服务地址", "服务时间", "服务数量", "问题描述", "操作"],
        dele_title: "删除报修信息",
        add_path: '/repair_manage/add_repair'
    },
    WATER_LIST: {//水费
        head: ['序号', '房号', '户主名', '起始数(m³)', '截止数(m³)', '单价(元/m³)', '用量(m³)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/water_list/add_water',
        is_shiw_tbhead: true
    },
    GAS_LIST: {//气费
        head: ['序号', '房号', '户主名', '起始数(m³)', '截止数(m³)', '单价(元/m³)', '用量(m³)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/gas_list/add_gas',
        is_shiw_tbhead: true
    },
    ELECTRICITY_LIST: {//电费
        head: ['序号', '房号', '户主名', '起始数(kw)', '截止数(kw)', '单价(元/kw)', '用量(kw)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/electricity_list/add_electricity',
        is_shiw_tbhead: true
    },
    PROPERTY_LIST: {//物业费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费数量(月)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/property_list/add_property',
        is_shiw_tbhead: true
    },
    GARBAGE_LIST: {//垃圾费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费数量(月)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/garbage_list/add_garbage',
        is_shiw_tbhead: true
    },
    NOTICE_LIST: {//公告
        head: ['主题', '发布人', '职位', '发布时间', '操作'],
        dele_title: "删除发布信息",
        add_path: '/notice_list/add_notice'
    },
    QUARTERS_LIST: {//创建小区
        head: ['小区名字', '小区地址', '开发地址', '服务中心电话', '物业中心负责人', '负责人电话', '操作'],
        dele_title: "删除小区信息",
        add_path: '/quarters_list/add_quarters'
    },
    HOUSEHOLD_LIST: {//住户表
        head: ['序号', '单元数', '楼号', '层数', '单层户数', '操作'],
        dele_title: "删除住户信息",
        add_path: '/household_list/add_household'
    },
    MERCHANT_LIST: {//商户表
        head: ['序号', '单元数', '楼号', '层数', '单层户数', '操作'],
        dele_title: "删除商户信息",
        add_path: '/merchant_list/add_merchant'
    },
    PARKING_LIST: {//停车位表
        head: ['序号', '楼层', '状态', '操作'],
        dele_title: "删除停车位信息",
        add_path: '/parking_list/add_parking'
    }
}
export function mapAddressToTd(path, item, methods) {
    if (path === "/") {   // YE_ZHU
        return (
            <tr key={item.id}>
                <td >{item.owner_name}</td>
                <td >{item.owner_phone}</td>
                <td>{item.door_number}</td>
                <td>{item.area}</td>
                <td>{item.title_number}</td>
                <td>{item.number_residents}</td>
                <td>{yeZhuStatus(item.status)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/repair_manage") {   // REPAIR_MANAGE
        return (
            <tr key={item.id}>
                <td >{item.order_id}</td>
                <td >{item.username}</td>
                <td>{item.type}</td>
                <td>{item.address}</td>
                <td>{item.service_at}</td>
                <td>{item.number}</td>
                <td>{item.desc}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai" onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/water_list") {   // WATER_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.username}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.unit_price}</td>
                <td>{item.consumption}</td>
                <td>{item.cost}</td>
                <td>{payStatus(item.pay_status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/gas_list") {   // GAS_LIST
        return (
            <tr key={item.id}>
                <td >{item.gas_number}</td>
                <td >{item.house_number}</td>
                <td>{item.username}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.unit_price}</td>
                <td>{item.consumption}</td>
                <td>{item.cost}</td>
                <td>{payStatus(item.pay_status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/electricity_list") {   // ELECTRICITY_LIST
        return (
            <tr key={item.id}>
                <td >{item.electric_number}</td>
                <td >{item.house_number}</td>
                <td>{item.username}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.unit_price}</td>
                <td>{item.consumption}</td>
                <td>{item.cost}</td>
                <td>{payStatus(item.pay_status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/property_list") {   // PROPERTY_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.username}</td>
                <td>{item.house_area}</td>
                <td>{item.unit_price}</td>
                <td>{item.month_number}</td>
                <td>{item.cost}</td>
                <td>{payStatus(item.pay_status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/garbage_list") {   // PROPERTY_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.username}</td>
                <td>{item.house_area}</td>
                <td>{item.unit_price}</td>
                <td>{item.month_number}</td>
                <td>{item.cost}</td>
                <td>{payStatus(item.pay_status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/notice_list") {   // NOTICE_LIST
        return (
            <tr key={item.id}>
                <td >{item.title}</td>
                <td >{item.admin_name}</td>
                <td>{item.admin_position}</td>
                <td>{item.created_at}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai" onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/quarters_list") {   // QUARTERS_LIST
        return (
            <tr key={item.id}>
                <td >{item.community_name}</td>
                <td >{item.community_address}</td>
                <td>{item.community_developers}</td>
                <td>{item.community_mobile}</td>
                <td>{item.community_person}</td>
                <td>{item.community_person_mobile}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai" onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/household_list") {   // HOUSEHOLD_LIST
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td >{item.unit}</td>
                <td >{item.number}</td>
                <td>{item.layer_number}</td>
                <td>{item.households}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/merchant_list") {   // MERCHANT_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai">
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={methods.deleCurItem}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/parking_list") {   // PARKING_LIST
        return (
            <tr key={item.id}>
                <td >{item.park_number}</td>
                <td >{item.park_floor}</td>
                <td >{stopCarStatus(item.park_status)}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele"onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
}

export function getPageTotal(path, condition) {
    return new Promise((resolve, reject) => {//小区公告
        if (path === "/notice_list") {
            http('/notice/noticeIndexNum', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/repair_manage") {//报修管理
            http('/repair/repairIndexNum', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/quarters_list") {//小区列表
            http('/community/community_list_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/household_list") {//住户列表
            http('/community/household_list_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/water_list") {//水费列表
            http('/pay/water_lists_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/gas_list") {//气费列表
            http('/pay/gas_lists_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/electricity_list") {//电费列表
            http('/pay/electric_lists_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/property_list") {//物业列表
            http('/pay/property_lists_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/garbage_list") {//垃圾列表
            http('/pay/garbage_lists_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/parking_list") {//停车位列表
            http('/park/park_list_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
    })
}
export function getTableList(path, page, limit, condition) {//获取表格数据
    return new Promise((resolve, reject) => {
        if (path === "/notice_list") {//小区公告
            http('/notice/noticeIndex', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/repair_manage") {//报修管理
            http('/repair/repairIndex', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/quarters_list") {//小区列表
            http('/community/community_list', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/household_list") {//住户列表
            http('/community/household_list', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/water_list") {//水费列表
            http('/pay/water_lists', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/gas_list") {//气费列表
            http('/pay/gas_lists', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/electricity_list") {//电费列表
            http('/pay/electric_lists', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/property_list") {//物业列表
            http('/pay/property_lists', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/garbage_list") {//垃圾列表
            http('/pay/garbage_lists', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/parking_list") {//停车位列表
            http('/park/park_list', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/") {//业主列表
            http('/owner/owner_list', { method: 'post' }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
    })
}
export function deleItem(path, id) {//删除按钮
    return new Promise((resolve, reject) => {
        if (path === "/notice_list") {//小区公告
            http('/notice/noticeDel', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/repair_manage") {//报修管理
            http('/repair/repairDel', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/quarters_list") {//小区列表
            http('/community/community_delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/household_list") {//住户列表
            http('/community/delete_household', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/water_list") {//水费列表
            http('/pay/water_del', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/gas_list") {//气费列表
            http('/pay/gas_del', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/electricity_list") {//电费列表
            http('/pay/electric_del', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/property_list") {//物业列表
            http('/pay/property_del', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/garbage_list") {//垃圾列表
            http('/pay/garbage_del', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/parking_list") {//停车位列表
            http('/park/delete_park', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
    })
}