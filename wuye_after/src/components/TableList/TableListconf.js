import React from 'react';
import { Button } from 'antd';
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
        is_shiw_tbhead:true
    },
    GAS_LIST: {//气费
        head: ['序号', '房号', '户主名', '起始数(m³)', '截止数(m³)', '单价(元/m³)', '用量(m³)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/gas_list/add_gas',
        is_shiw_tbhead:true
    },
    ELECTRICITY_LIST: {//电费
        head: ['序号', '房号', '户主名', '起始数(kw)', '截止数(kw)', '单价(元/kw)', '用量(kw)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/electricity_list/add_electricity',
        is_shiw_tbhead:true
    },
    PROPERTY_LIST: {//物业费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费数量(月)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/property_list/add_property',
        is_shiw_tbhead:true
    },
    GARBAGE_LIST: {//垃圾费
        head: ['序号', '房号', '户主名', '房屋面积(㎡)', '单价(元/㎡)', '缴费数量(月)', '费用(元)', '付费状态', '支付方式', '操作'],
        dele_title: "删除缴费信息",
        add_path: '/garbage_list/add_garbage',
        is_shiw_tbhead:true
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
        head: ['序号', '单元数', '楼号', '层数', '单层户数', '操作'],
        dele_title: "删除停车位信息",
        add_path: '/parking_list/add_parking'
    }
}
export function mapAddressToTd(path, item, methods) {
    if (path === "/") {   // YE_ZHU
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/repair_manage") {   // REPAIR_MANAGE
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/water_list") {   // WATER_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/gas_list") {   // GAS_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/electricity_list") {   // ELECTRICITY_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/property_list") {   // PROPERTY_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/garbage_list") {   // PROPERTY_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/notice_list") {   // NOTICE_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
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
    if (path === "/quarters_list") {   // QUARTERS_LIST
        return (
            <tr key={item.name}>
                <td >{item.name}</td>
                <td >{item.name}</td>
                <td>{item.name}</td>
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
    if (path === "/household_list") {   // HOUSEHOLD_LIST
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
}