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
function baoXiuStatus(order_status,is_assign){
    if(order_status===2){
        if(is_assign===1){
            return (<span style={{color:'#3399FF'}}>服务中</span>)
        }
        if(is_assign===0){
            return (<span style={{color:'#F56047'}}>待派单</span>)
        }
    }
    if(order_status===3){
        return "已完成"
    }
}
export const HEAD_CONF = {
    YE_ZHU: {//业主
        head: ["业主姓名", "业主电话", "门牌号", "房屋面积", "产权号", "居住人数", "房屋状态", "操作"],
        dele_title: "删除业主信息",
        add_path: '/index/ye_list/add_owner'
    },
    REPAIR_MANAGE: {//报修
        head: ["订单号", "报修人", "订单服务人员", "服务项目", "服务地址", "服务时间", "价格", "状态","问题描述", "操作"],
        dele_title: "删除报修信息",
        add_path: '/index/repair_manage/add_repair',
        inp_ziduan:"搜索：订单号,报修人",
        is_shiw_tbhead: 2
    },
    WATER_LIST: {//水费
        head: ['序号', '房号', '户主名', '起始数(m³)', '截止数(m³)', '单价(元/m³)', '用量(m³)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/water_list/add_water',
        pay_details: '/index/water_list/pay_details',
        inp_ziduan:"搜索：房号,户主名",
        is_shiw_tbhead: 1
    },
    GAS_LIST: {//气费
        head: ['序号', '房号', '户主名', '起始数(m³)', '截止数(m³)', '单价(元/m³)', '用量(m³)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/gas_list/add_gas',
        pay_details: '/index/gas_list/pay_details',
        inp_ziduan:"搜索：房号,户主名",
        is_shiw_tbhead: 1
    },
    ELECTRICITY_LIST: {//电费
        head: ['序号', '房号', '户主名', '起始数(kw)', '截止数(kw)', '单价(元/kw)', '用量(kw)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/electricity_list/add_electricity',
        pay_details: '/index/electricity_list/pay_details',
        inp_ziduan:"搜索：房号,户主名",
        is_shiw_tbhead: 1
    },
    PROPERTY_LIST: {//物业费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费月份', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/property_list/add_property',
        pay_details: '/index/property_list/pay_details',
        inp_ziduan:"搜索：房号,户主名",
        is_shiw_tbhead: 1
    },
    GARBAGE_LIST: {//垃圾费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费月份', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/garbage_list/add_garbage',
        pay_details: '/index/garbage_list/pay_details',
        inp_ziduan:"搜索：房号,户主名",
        is_shiw_tbhead: 1
    },
    STOPCAR_LIST: {//停车费
        head: ['序号', '车位号', '车主名', '车牌号', '车主电话', '车位状态', ' 缴费月份', '费用(元)', '付费状态','支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/index/stopcar_list/add_stopcar',
        pay_details: '/index/stopcar_list/pay_details',
        is_shiw_tbhead: 1
    },
    NOTICE_LIST: {//公告
        head: ['主题', '接收小区', '发布时间', '操作'],
        dele_title: "删除发布信息",
        add_path: '/index/notice_list/add_notice',
        inp_ziduan:"搜索：主题"
    },
    QUARTERS_LIST: {//创建小区
        head: ['小区名字', '小区地址', '开发地址', '服务中心电话', '物业中心负责人', '负责人电话', '操作'],
        dele_title: "删除小区信息",
        inp_ziduan:"搜索：全部",
        add_path: '/index/quarters_list/add_quarters'
    },
    HOUSEHOLD_LIST: {//住户表
        head: ['序号', '楼号','单元数', '层数', '单层户数', '操作'],
        dele_title: "删除住户信息",
        add_path: '/index/household_list/add_household'
    },
    MERCHANT_LIST: {//商户表
        head: ['序号', '单元数', '楼号', '层数', '单层户数', '操作'],
        dele_title: "删除商户信息",
        add_path: '/index/merchant_list/add_merchant'
    },
    PARKING_LIST: {//停车位表
        head: ['序号', '楼层','停车位', '操作'],
        dele_title: "删除停车位信息",
        add_path: '/index/parking_list/add_park_floor',
        add_place_path: '/index/parking_list/add_parks',
    }
}
export function mapAddressToTd(path, item, methods) {
    if (path === "/index/ye_list") {   // YE_ZHU
        return (
            <tr key={item.id}>
                <td >{item.owner_name}</td>
                <td >{item.owner_phone}</td>
                <td>{item.house_number}</td>
                <td>{item.area}</td>
                <td>{item.title_number}</td>
                <td>{item.number_residents}</td>
                <td>{yeZhuStatus(item.status)}</td>
                <td style={{ width: '17%' }}>
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
    if (path === "/index/repair_manage") {   // REPAIR_MANAGE
        return (
            <tr key={item.id}>
                <td >{item.internal_order_sn}</td>
                <td >{item.contacts}</td>
                <td >{item.assigns.map((it,inx)=>{
                    if((item.assigns.length-1)===inx){
                        return it.assign_name
                    }else{
                    return it.assign_name+'，'
                    }
                })}</td>
                <td>{item.spu_name}</td>
                <td>{item.address}</td>
                <td>{item.service_time}</td>
                <td>{item.order_total_price}</td>
                <td>{baoXiuStatus(item.order_status,item.is_assign)}</td>
                <td>{item.remarks}</td>
                <td style={{ width: '13%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai" onClick={(e) => methods.baoxiuXiangqing(item, e)}>
                        详情
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/water_list") {   // WATER_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.owner_name}</td>
                <td>{item.start_num}</td>
                <td>{item.end_num}</td>
                <td>{item.price}</td>
                <td>{item.end_num-item.start_num}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/gas_list") {   // GAS_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.owner_name}</td>
                <td>{item.start_num}</td>
                <td>{item.end_num}</td>
                <td>{item.price}</td>
                <td>{item.end_num-item.start_num}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/electricity_list") {   // ELECTRICITY_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.owner_name}</td>
                <td>{item.start_num}</td>
                <td>{item.end_num}</td>
                <td>{item.price}</td>
                <td>{item.end_num-item.start_num}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/property_list") {   // PROPERTY_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.owner_name}</td>
                <td>{item.area}</td>
                <td>{item.price}</td>
                <td>{item.year+'-'+item.month}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/garbage_list") {   // GARBAGE_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.house_number}</td>
                <td>{item.owner_name}</td>
                <td>{item.area}</td>
                <td>{item.price}</td>
                <td>{item.year+'-'+item.month}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/stopcar_list") {   // STOPCAR_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.park_region+item.park_number}</td>
                <td>{item.tenant_name}</td>
                <td>{item.car_number}</td>
                <td>{item.tenant_mobile}</td>
                <td>{stopCarStatus(item.park_status)}</td>
                <td>{item.year+'-'+item.month}</td>
                <td>{item.total_price}</td>
                <td>{payStatus(item.status)}</td>
                <td>{payType(item.pay_type)}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-xiugai"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-xq" onClick={(e) => methods.xQCurItem(item, e)}>
                        详情
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/notice_list") {   // NOTICE_LIST
        return (
            <tr key={item.id}>
                <td >{item.title}</td>
                <td >{item.community_name}</td>
                <td>{item.created_at}</td>
                <td style={{ width: '17%' }}>
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
    if (path === "/index/quarters_list") {   // QUARTERS_LIST
        return (
            <tr key={item.id}>
                <td >{item.community_name}</td>
                <td >{item.community_address}</td>
                <td>{item.community_developers}</td>
                <td>{item.community_mobile}</td>
                <td>{item.community_person}</td>
                <td>{item.community_person_mobile}</td>
                <td style={{ width: '17%' }}>
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
    if (path === "/index/household_list") {   // HOUSEHOLD_LIST
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td >{item.number}</td>
                <td >{item.unit}</td>
                <td>{item.layer_number}</td>
                <td>{item.households}</td>
                <td style={{ width: '17%' }}>
                    <Button type="primary" shape="round" className="table-list-dele" onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                </td>
            </tr>
        )
    }
    if (path === "/index/merchant_list") {   // MERCHANT_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td style={{ width: '17%' }}>
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
    if (path === "/index/parking_list") {   // PARKING_LIST
        return (
            <tr key={item.id}>
                <td >{item.id}</td>
                <td >{item.park_floor}</td>
                <td >{item.count}</td>
                <td style={{ width: '17%' }}>
                    <Button style={{background:'##3399FF'}} type="primary" shape="round" className="table-list-xiugai-f"onClick={(e) => methods.xiuGAiCurItem(item, e)}>
                        修改
                    </Button>
                    <Button type="primary" shape="round" className="table-list-dele"onClick={(e) => methods.deleCurItem(item, e)}>
                        删除
                    </Button>
                    <Button type="primary" shape="round" className="table-list-add"onClick={(e) => methods.addParkPlace(item, e)}>
                        添加车位
                    </Button>
                </td>
            </tr>
        )
    }
}

export function getPageTotal(path, condition) {
    return new Promise((resolve, reject) => {//小区公告
        if (path === "/index/notice_list") {
            http('/notice/noticeIndexNum', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/repair_manage") {//报修管理
            // http('/repair/repairIndexNum', { method: 'post', data: { condition } }).then(res => {
            //     resolve(res)
            // }).catch(res => {
            //     reject(res)
            // })
        }
        if (path === "/index/quarters_list") {//小区列表
            http('/community/community_list_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/household_list") {//住户列表
            http('/community/household_list_num', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        // if (path === "/index/water_list") {//水费列表
        //     http('/pay/water_lists_num', { method: 'post', data: { condition } }).then(res => {
        //         resolve(res)
        //     }).catch(res => {
        //         reject(res)
        //     })
        // }
        // if (path === "/index/gas_list") {//气费列表
        //     http('/pay/gas_lists_num', { method: 'post', data: { condition } }).then(res => {
        //         resolve(res)
        //     }).catch(res => {
        //         reject(res)
        //     })
        // }
        // if (path === "/index/electricity_list") {//电费列表
        //     http('/pay/electric_lists_num', { method: 'post', data: { condition } }).then(res => {
        //         resolve(res)
        //     }).catch(res => {
        //         reject(res)
        //     })
        // }
        // if (path === "/index/property_list") {//物业列表
        //     http('/pay/property_lists_num', { method: 'post', data: { condition } }).then(res => {
        //         resolve(res)
        //     }).catch(res => {
        //         reject(res)
        //     })
        // }
        // if (path === "/index/garbage_list") {//垃圾列表
        //     http('/pay/garbage_lists_num', { method: 'post', data: { condition } }).then(res => {
        //         resolve(res)
        //     }).catch(res => {
        //         reject(res)
        //     })
        // }
        if (path === "/index/parking_list") {//停车位列表
            http('/park/park_list_num', { method: 'post', data: { condition } }).then(res => {
                let a=res
                a.data=1
                resolve(a)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/ye_list") {//业主列表
            http('/owner/total', { method: 'post', data: { condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
    })
}
export function getTableList(path, page, limit, condition,date,status,service) {//获取表格数据
    return new Promise((resolve, reject) => {
        if (path === "/index/notice_list") {//小区公告
            http('/notice/noticeIndex', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/repair_manage") {//报修管理
            http('/repair', { method: 'get', data: { page: page, limit: limit, condition: condition,status:service } }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/quarters_list") {//小区列表
            http('/community/community_list', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/household_list") {//住户列表
            http('/community/household_list', { method: 'post', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/water_list") {//水费列表
            http('/payment', { method: 'get', data: { type:1,status:status,page: page,condition:condition,date:date } }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/gas_list") {//气费列表
            http('/payment', { method: 'get', data: {type:3 ,status:status,page: page,condition:condition,date:date} }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/electricity_list") {//电费列表
            http('/payment', { method: 'get', data: { type:2 ,status:status,page: page,condition:condition,date:date} }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/property_list") {//物业列表
            http('/payment', { method: 'get', data: { type:4,status:status,page: page,condition:condition,date:date} }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/garbage_list") {//垃圾列表
            http('/payment', { method: 'get', data: { type:5,status:status,page: page,condition:condition,date:date} }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }if (path === "/index/stopcar_list") {//停车费列表
            http('/payment', { method: 'get', data: { type:6,status:status,page: page,condition:condition,date:date} }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/parking_list") {//停车位列表
            http('/park/park_list', { method: 'get', data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/ye_list") {//业主列表
            http('/owner/owner_list', { method: 'post' , data: { page: page, limit: limit, condition: condition } }).then(res => {
                resolve(res.data)
            }).catch(res => {
                reject(res)
            })
        }
    })
}
export function deleItem(path, id) {//删除按钮
    return new Promise((resolve, reject) => {
        if (path === "/index/notice_list") {//小区公告
            http('/notice/noticeDel', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/repair_manage") {//报修管理
            http('/repair/repairDel', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/quarters_list") {//小区列表
            http('/community/community_delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/household_list") {//住户列表
            http('/community/delete_household', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/water_list") {//水费列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/gas_list") {//气费列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/electricity_list") {//电费列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/property_list") {//物业列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/garbage_list") {//垃圾列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/stopcar_list") {//停车列表
            http('/payment/delete', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/parking_list") {//停车位列表
            http('/park/del_park_floor', { method: 'POST', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
        if (path === "/index/ye_list") {//业主列表
            http('/owner/owner_delete', { method: 'get', data: { id: id } }).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        }
    })
}