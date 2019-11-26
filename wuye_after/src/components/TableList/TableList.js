import React, { Component } from 'react';
import { Row, Col, Button, Input, Pagination, Modal, Spin, Icon, message, DatePicker } from 'antd';
import { HEAD_CONF, mapAddressToTd, getPageTotal, getTableList, deleItem, yeZhuStatus, fangWuType ,stopCarStatus} from './TableListconf'
import moment from 'moment';
import Cookies from 'js-cookie'
import http from '../../api/http';
import store from '../../reducer/reducer'
import './TableList.css'
const { Search } = Input;
const { MonthPicker } = DatePicker;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
class TableList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            head: [],
            deleModel: false,
            data: [
            ],
            is_tbupdate_loading: false,//table的loading
            is_dele_loading: false,//删除的loading
            cur_page: 1,//当前页数
            cur_communite: Cookies.get('community_id'),
            service: 0,
            is_paid: false,
            baoxiu_assign: [{
                assign_name: "",
                assign_phone: ""
            }]
        }
        store.subscribe(() => {
            this.setState({
                cur_communite: store.getState().controlCommunity.value
            })
        })
    }
    componentWillUpdate(prop, state) {
        if (state.cur_communite !== this.state.cur_communite) {
            this.initialRender()
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem('isFromInx') === "true") {
            this.setState({
                issle_pay: 2
            })
        }
        this.matchPath(this.props.match.path) //匹配地址
        this.initialRender()
    }
    initialRender = (status, service) => {
        this.setState({
            is_tbupdate_loading: true,
            status: status,
            service: service
        })
        setTimeout(() => {
            getPageTotal(this.props.match.path, this.state.cur_search_val).then(res => { //获取总页数
                this.setState({
                    total_page: res.data
                })
            }).catch(res => {
            })

            getTableList(this.props.match.path, 1, 10, this.state.cur_search_val, this.state.cur_sle_month, status, service).then(res => { //获取table数据
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false,
                })
                if (res.total) {
                    this.setState({
                        total_page: res.total
                    })
                }
            }).catch(res => {
                this.setState({
                    is_tbupdate_loading: false
                })
                message.error(res.msg, 3)
            })
        }, 1000)
    }
    deleCurItem = (clickItem, e) => {
        this.setState({
            deleModel: true,
            dele_item: clickItem
        })
    }
    xiuGAiCurItem = (clickItem, e) => {
        this.props.history.push({ pathname: this.state.add_path, query: { type: 1, update_id: clickItem.id, cost_type: clickItem.type, id_xiu: 'true', park_floor: clickItem.park_floor } })
    }
    xQCurItem = (clickItem, e) => {
        this.props.history.push({ pathname: this.state.pay_details, query: { type: 1, update_id: clickItem.id, cost_type: clickItem.type, household_id: clickItem.household_id, park_id: clickItem.park_id } })
    }
    addParkPlace = (clickItem, e) => {
        this.props.history.push({ pathname: this.state.add_place_path, query: { id: clickItem.id } })
    }
    addItme = () => {
        let path = this.props.location.pathname
        switch (path) {
            case '/index/water_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 1, id_xiu: 'false' } }); break
            case '/index/gas_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 3, id_xiu: 'false' } }); break
            case '/index/electricity_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 2, id_xiu: 'false' } }); break
            case '/index/property_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 4, id_xiu: 'false' } }); break
            case '/index/garbage_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 5, id_xiu: 'false' } }); break
            case '/index/stopcar_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 6, id_xiu: 'false' } }); break
            case '/index/parking_list': this.props.history.push({ pathname: this.state.add_path, query: { type: 1, cost_type: 5, id_xiu: 'false' } }); break
            default: this.props.history.push(this.state.add_path); break
        }
    }
    handleOkDele = () => {//确认删除
        this.setState({
            is_dele_loading: true
        })
        deleItem(this.props.match.path, this.state.dele_item.id).then(res => { //获取总页数
            this.setState({
                is_dele_loading: false,
                deleModel: false,
                is_tbupdate_loading: true
            })
            message.info('删除成功', 3)
            getPageTotal(this.props.match.path, this.state.cur_search_val).then(res => { //获取总页数
                this.setState({
                    total_page: res.data,
                    cur_page: 1
                })
            }).catch(res => { })
            getTableList(this.props.match.path, 1, 10, this.state.cur_search_val).then(res => { //获取table数据
                setTimeout(() => {
                    this.setState({
                        data: res.data,
                        is_tbupdate_loading: false,
                    })
                    if (res.total) {
                        this.setState({
                            total_page: res.total,
                            cur_page: 1
                        })
                    }
                }, 500)
            }).catch(res => {
                this.setState({
                    is_dele_loading: false,
                    is_tbupdate_loading: false,
                    data: res.code === 201 ? [] : ''
                })
                message.error(res.msg, 3)
            })
        }).catch(res => { })
    }
    getPageChange = (inx) => {//页码变化
        this.setState({
            is_tbupdate_loading: true
        })
        getTableList(this.props.match.path, inx, 10, this.state.cur_search_val, this.state.cur_sle_month, this.state.status).then(res => { //获取table数据
            setTimeout(() => {
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false,
                    cur_page: inx
                })
                if (res.total) {
                    this.setState({
                        total_page: res.total
                    })
                }
            }, 500)
        }).catch(res => {
            this.setState({
                is_tbupdate_loading: false
            })
            message.error(res.msg, 3)
        })
    }
    searchTb = (val) => {//搜索内容
        this.setState({
            is_tbupdate_loading: true,
            cur_search_val: val
        })
        getTableList(this.props.match.path, 1, 10, val, this.state.cur_sle_month, this.state.status).then(res => { //获取table数据
            setTimeout(() => {
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false,
                })
                if (res.total) {
                    this.setState({
                        total_page: res.total,
                        cur_page: 1
                    })
                }
            }, 500)
        }).catch(res => {
            this.setState({
                is_tbupdate_loading: false
            })
            message.error(res.msg, 3)
        })
        getPageTotal(this.props.match.path, val).then(res => { //获取总页数
            this.setState({
                total_page: res.data,
                cur_page: 1
            })
        }).catch(res => { })
    }
    closeModaDelel = () => {
        this.setState({
            deleModel: false
        })
    }
    quadtCancel = () => {
        this.setState({
            quadt_show: false
        })
    }
    quadtOk = () => {
        this.setState({
            quadt_loading: true
        })
        if(this.state.quaorpark){
            http('/examine/pass_household', { method: 'post', data: { id: this.state.cur_quadt.id, status: this.state.cur_quadt.status } }).then(res => {
                message.success(res.msg, 3)
                this.initialRender()
                this.setState({
                    quadt_loading: false,
                    quadt_show: false
                })
            }).catch(res => {
                message.error(res.msg, 3)
                this.setState({
                    quadt_loading: false
                })
            })
        }
        if(!this.state.quaorpark){
            http('/examine/pass_space', { method: 'post', data: { id: this.state.cur_quadt.id, status: this.state.cur_quadt.status } }).then(res => {
                message.success(res.msg, 3)
                this.initialRender()
                this.setState({
                    quadt_loading: false,
                    quadt_show: false
                })
            }).catch(res => {
                message.error(res.msg, 3)
                this.setState({
                    quadt_loading: false
                })
            })
        }
    }
    openQuadtModel = (it, val, e) => {
        console.log(it)
        this.setState({
            quadt_show: true,
            quaorpark: val,
            cur_quadt: it
        })
    }
    matchPath(val) {
        switch (val) {
            case "/index/ye_list":
                this.setState({
                    ...HEAD_CONF.YE_ZHU
                })
                break
            case "/index/repair_manage":
                this.setState({
                    ...HEAD_CONF.REPAIR_MANAGE
                })
                break
            case "/index/water_list":
                this.setState({
                    ...HEAD_CONF.WATER_LIST
                })
                break
            case "/index/gas_list":
                this.setState({
                    ...HEAD_CONF.GAS_LIST
                })
                break
            case "/index/electricity_list":
                this.setState({
                    ...HEAD_CONF.ELECTRICITY_LIST
                })
                break
            case "/index/property_list":
                this.setState({
                    ...HEAD_CONF.PROPERTY_LIST
                })
                break
            case "/index/garbage_list":
                this.setState({
                    ...HEAD_CONF.GARBAGE_LIST
                })
                break
            case "/index/stopcar_list":
                this.setState({
                    ...HEAD_CONF.STOPCAR_LIST
                })
                break
            case "/index/notice_list":
                this.setState({
                    ...HEAD_CONF.NOTICE_LIST
                })
                break
            case "/index/quarters_list":
                this.setState({
                    ...HEAD_CONF.QUARTERS_LIST
                })
                break
            case "/index/household_list":
                this.setState({
                    ...HEAD_CONF.HOUSEHOLD_LIST
                })
                break
            case "/index/merchant_list":
                this.setState({
                    ...HEAD_CONF.MERCHANT_LIST
                })
                break
            case "/index/parking_list":
                this.setState({
                    ...HEAD_CONF.PARKING_LIST
                })
                break
            case "/index/quarters_examine":
                this.setState({
                    ...HEAD_CONF.QUARTERS_EXAMINE
                })
                break
            case "/index/park_examine":
                this.setState({
                    ...HEAD_CONF.PARK_EXAMINE
                })
                break
            default:
                break
        }
    }
    sleMonth = (e) => {
        let val = moment(e).format('YYYY-MM')
        this.setState({
            is_tbupdate_loading: true,
            cur_sle_month: val
        })
        if (val === 'Invalid date') {
            val = ''
        }
        getTableList(this.props.match.path, 1, 10, this.state.cur_search_val, val, this.state.status).then(res => { //获取table数据
            setTimeout(() => {
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false,
                })
                if (res.total) {
                    this.setState({
                        total_page: res.total,
                        cur_page: 1
                    })
                }
            }, 500)
        }).catch(res => {
            this.setState({
                is_tbupdate_loading: false
            })
            message.error(res.msg, 3)
        })
        getPageTotal(this.props.match.path, val).then(res => { //获取总页数
            this.setState({
                total_page: res.data,
                cur_page: 1
            })
        }).catch(res => { })

    }
    slePay = (p, e) => {
        if (p === "pay") {
            if (this.state.issle_pay === 1) {
                this.setState({
                    issle_pay: 3
                })
                this.initialRender()
            } else {
                this.setState({
                    issle_pay: 1
                })
                this.initialRender(1)
            }
        }
        if (p === "no_pay") {
            if (this.state.issle_pay === 2) {
                this.setState({
                    issle_pay: 3
                })
                this.initialRender()
            } else {
                this.setState({
                    issle_pay: 2
                })
                this.initialRender(0)
            }
        }
    }
    sleExamine = (p, e) => {
        if (p === "yishenhe") {
            if (this.state.is_examine === 1) {
                this.setState({
                    is_examine: 2
                })
                this.initialRender()
            } else {
                this.setState({
                    is_examine: 1
                })
                this.initialRender(1)
            }
        }
        if (p === "daishenhe") {
            if (this.state.is_examine === 0) {
                this.setState({
                    is_examine: 2
                })
                this.initialRender()
            } else {
                this.setState({
                    is_examine: 0
                })
                this.initialRender(0)
            }
        }
    }
    sleServieStatus = (p, e) => {
        if (p === "fuwuzhong") {
            if (this.state.is_assign === 1) {
                this.setState({
                    is_assign: 0
                })
                this.initialRender()
            } else {
                this.setState({
                    is_assign: 1
                })
                this.initialRender('', 1)
            }
        }
        if (p === "paidanzhong") {
            if (this.state.is_assign === 2) {
                this.setState({
                    is_assign: 0
                })
                this.initialRender()
            } else {
                this.setState({
                    is_assign: 2
                })
                this.initialRender('', 2)
            }
        }
        if (p === "wancheng") {
            if (this.state.is_assign === 3) {
                this.setState({
                    is_assign: 0
                })
                this.initialRender()
            } else {
                this.setState({
                    is_assign: 3
                })
                this.initialRender('', 3)
            }
        }
    }
    baoXiuStatus = (order_status, is_assign) => {
        if (order_status === 2) {
            if (is_assign === 1) {
                return (<span style={{ color: '#3399FF' }}>服务中</span>)
            }
            if (is_assign === 0) {
                return (<span style={{ color: '#F56047' }}>待派单</span>)
            }
        }
        if (order_status === 3) {
            return "已完成"
        }
    }
    baoxiuXiangqing = (item, e) => {
        this.setState({
            baoxiuModel: true,
            is_dele_loading: true,
            baoxiu: {},
            is_paid: false,
            baoxiu_tt: '订单信息',
            cur_baoxiu: item
        })
        http(`/repair/find/${item.id}/`, { method: 'get', data: {} }).then(res => {
            let a = res.data
            a.status_ct = this.baoXiuStatus(res.data.order_status, res.data.is_assign)
            this.setState({
                baoxiu: a,
                is_dele_loading: false
            })
        }).catch(res => {
            this.setState({
                is_dele_loading: false
            })
        })
    }
    cancelBaoxiuModel = () => {
        this.setState({
            baoxiuModel: false,
            is_dele_loading: false,
            baoxiu_assign: [{
                assign_name: "",
                assign_phone: ""
            }]
        })
    }
    paiDan = () => {
        this.setState({
            is_paid: true,
            baoxiu_tt: '订单服务人员'
        })
    }
    addBaoxiuBssign = () => {
        let a = {
            assign_name: "",
            assign_phone: ""
        }
        let b = this.state.baoxiu_assign
        b.push(a)
        this.setState({
            baoxiu_assign: b
        })
    }
    inpServiceName = (it, ix, e) => {
        let a = this.state.baoxiu_assign
        a[ix].assign_name = e.currentTarget.value
        this.setState({
            baoxiu_assign: a
        })
    }
    inpServicePhone = (it, ix, e) => {
        let a = this.state.baoxiu_assign
        a[ix].assign_phone = e.currentTarget.value
        this.setState({
            baoxiu_assign: a
        })
    }
    addServicePep = () => {
        this.setState({
            is_dele_loading: true
        })
        http('/repair/assigns', { method: 'post', data: { order_id: this.state.cur_baoxiu.id, assigns: this.state.baoxiu_assign } }).then(res => {
            this.initialRender()
            message.info(res.msg, 3)
            this.setState({
                is_dele_loading: false,
                baoxiuModel: false,
                baoxiu_assign: [{
                    assign_name: "",
                    assign_phone: ""
                }]
            })
        }).catch(res => {
            message.error(res.msg, 3)
            this.setState({
                is_dele_loading: false,
                baoxiu_assign: [{
                    assign_name: "",
                    assign_phone: ""
                }]
            })
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="table-list-row">
                <Col span={24} className="table-list-mainctrl">
                    <Col span={4}>
                        <Search placeholder={this.state.inp_ziduan} title={this.state.inp_ziduan} className="table-list-search" onSearch={this.searchTb} enterButton />
                        <br />
                    </Col>
                    <Col span={17}>
                        {
                            this.state.is_shiw_tbhead === 1 &&
                            <Col span={24} className='table-list-ms'>
                                <Col span={6}><MonthPicker className='table-list-yarmt' placeholder="请选择年月" onChange={this.sleMonth} /></Col>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col span={6} className='table-list-payst'>
                                    <Col span={5} className='table-list-payed'><div onClick={(e) => this.slePay('pay', e)} className={this.state.issle_pay === 1 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>已付费</div><span></span></Col>
                                    <Col span={5} className='table-list-payno'><div onClick={(e) => this.slePay('no_pay', e)} className={this.state.issle_pay === 2 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>未付费</div><span></span></Col>
                                </Col>
                            </Col>
                        }
                        {
                            this.state.is_shiw_tbhead === 2 &&
                            <Col span={24} className='table-list-ms'>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col span={6} className='table-list-payst'>
                                    <Col span={5} className='table-list-payed'><div onClick={(e) => this.sleServieStatus('fuwuzhong', e)} className={this.state.is_assign === 1 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>服务中</div><span></span></Col>
                                    <Col span={5} className='table-list-payno'><div onClick={(e) => this.sleServieStatus('paidanzhong', e)} className={this.state.is_assign === 2 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>派单中</div><span></span></Col>
                                    <Col span={5} className='table-list-payno'><div onClick={(e) => this.sleServieStatus('wancheng', e)} className={this.state.is_assign === 3 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>完成</div><span></span></Col>
                                </Col>
                            </Col>
                        }
                        {
                            this.state.is_shiw_tbhead === 3 &&
                            <Col span={24} className='table-list-ms'>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col span={6}></Col>
                                <Col span={6} className='table-list-payst'>
                                    <Col span={5} className='table-list-payed'><div onClick={(e) => this.sleExamine('yishenhe', e)} className={this.state.is_examine === 1 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>已审核</div><span></span></Col>
                                    <Col span={5} className='table-list-payno'><div onClick={(e) => this.sleExamine('daishenhe', e)} className={this.state.is_examine === 0 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>待审核</div><span></span></Col>
                                </Col>
                            </Col>
                        }
                    </Col>
                    <Col span={3} className="table-list-add">
                        <Button type="primary" shape="round" onClick={this.addItme} className="table-list-addbtn">
                            添加
                        </Button>
                    </Col>
                </Col>
                <Col span={24} className="table-list-fenline">
                </Col>
                <Col span={24} >
                    <Spin indicator={antIcon} id='tablesp' spinning={this.state.is_tbupdate_loading} >
                        <table className="table-list">
                            <thead>
                                <tr>
                                    {
                                        this.state.head && this.state.head.map((item, index) => {
                                            return <th key={item}>{item}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data && this.state.data.map((item, index) => {
                                        return (  //此处不能用标签模式，会报tbody子组件不能用当前组件只能为tr td
                                            mapAddressToTd(this.props.match.path, item, {
                                                deleCurItem: this.deleCurItem,
                                                xiuGAiCurItem: this.xiuGAiCurItem,
                                                xQCurItem: this.xQCurItem,
                                                addParkPlace: this.addParkPlace,
                                                baoxiuXiangqing: this.baoxiuXiangqing,
                                                openQuadtModel: this.openQuadtModel
                                            })
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Spin>
                </Col>
                <Col span={24} className="table-list-page">
                    <Pagination current={this.state.cur_page} total={this.state.total_page} onChange={this.getPageChange} />
                </Col>
                <Modal title={this.state.dele_title} visible={this.state.deleModel} onOk={this.handleOkDele} className="model-dele"
                    onCancel={this.closeModaDelel} centered={true} bodyStyle={{ textAlign: "center", height: "130px" }}
                    cancelText="取消"
                    okText="确定">
                    <Spin indicator={antIcon} spinning={this.state.is_dele_loading} >
                        <p>删除后将不能恢复，是否删除该条数据？</p>
                    </Spin>
                </Modal>
                {/* 小区审核详情 */}
                <Modal title={this.state.quaorpark?'小区审核-详情':'车位审核-详情'} visible={this.state.quadt_show} onOk={this.quadtOk} className='quadt-model' okText='通过审核' cancelText="取消"
                    onCancel={this.quadtCancel} confirmLoading={this.state.quadt_loading}
                >
                    {this.state.quaorpark ?(
                        <Row>
                            <Col span={24} className="quadt-model-tt">物业信息</Col>
                            <Col span={8} className="quadt-model-it">姓名：{this.state.cur_quadt && this.state.cur_quadt.house.owner_name}</Col>
                            <Col span={8} className="quadt-model-it">电话：{this.state.cur_quadt && this.state.cur_quadt.house.owner_phone}</Col>
                            <Col span={8} className="quadt-model-it">楼号：{this.state.cur_quadt && this.state.cur_quadt.house.house_number}</Col>
                            <Col span={8} className="quadt-model-it">房屋状态：<span >{this.state.cur_quadt && yeZhuStatus(this.state.cur_quadt.house.status)}</span></Col>

                            <Col span={24} className="quadt-model-tt">审核信息</Col>
                            <Col span={8} className="quadt-model-it">姓名：{this.state.cur_quadt && this.state.cur_quadt.name}</Col>
                            <Col span={8} className="quadt-model-it">身份号：{this.state.cur_quadt && this.state.cur_quadt.idcard}</Col>
                            <Col span={8} className="quadt-model-it">电话：{this.state.cur_quadt && this.state.cur_quadt.phone}</Col>
                            <Col span={8} className="quadt-model-it">审核状态：{this.state.cur_quadt && fangWuType(this.state.cur_quadt.status)}</Col>
                        </Row>):(
                            <Row>
                            <Col span={24} className="quadt-model-tt">物业信息</Col>
                            <Col span={8} className="quadt-model-it">姓名：{this.state.cur_quadt && this.state.cur_quadt.spaces.owner_name}</Col>
                            <Col span={8} className="quadt-model-it">电话：{this.state.cur_quadt && this.state.cur_quadt.spaces.owner_phone}</Col>
                            <Col span={8} className="quadt-model-it">车位编号：{this.state.cur_quadt && this.state.cur_quadt.spaces.park_name}</Col>
                            <Col span={8} className="quadt-model-it">车位状态：{this.state.cur_quadt && stopCarStatus( this.state.cur_quadt.spaces.park_status)}</Col>
                            <Col span={8} className="quadt-model-it">租客姓名：{this.state.cur_quadt && this.state.cur_quadt.spaces.tenant_name}</Col>
                            <Col span={8} className="quadt-model-it">租客电话：{this.state.cur_quadt && this.state.cur_quadt.spaces.tenant_mobile}</Col>

                            <Col span={24} className="quadt-model-tt">审核信息</Col>
                            <Col span={8} className="quadt-model-it">姓名：{this.state.cur_quadt && this.state.cur_quadt.name}</Col>
                            <Col span={8} className="quadt-model-it">电话：{this.state.cur_quadt && this.state.cur_quadt.phone}</Col>
                            <Col span={8} className="quadt-model-it">车位编号：{this.state.cur_quadt && this.state.cur_quadt.spaces.park_name}</Col>
                            <Col span={24} className="quadt-model-it">审核状态：{this.state.cur_quadt && fangWuType(this.state.cur_quadt.status)}</Col> 
                            <Col span={8} className="quadt-model-it"><img className="quadt-model-shimg" src={this.state.cur_quadt && this.state.cur_quadt.just_idk}  alt="" /></Col>
                            <Col span={8} className="quadt-model-it"><img className="quadt-model-shimg" src={this.state.cur_quadt && this.state.cur_quadt.back_idk}  alt="" /></Col>
                        </Row>
                        )
                    }

                </Modal>
                <Modal title={this.state.baoxiu_tt} visible={this.state.baoxiuModel}
                    className='park-mag-mod' onCancel={this.cancelBaoxiuModel}
                >
                    <Spin indicator={antIcon} spinning={this.state.is_dele_loading} >

                        {
                            this.state.is_paid ? (
                                <Row className='baoxiu-model-body'>
                                    <div className='baoxiu-model-add' onClick={this.addBaoxiuBssign}>添加</div>
                                    {
                                        this.state.baoxiu_assign && this.state.baoxiu_assign.map((item, inx) => {
                                            return (
                                                <Col span={24} className='baoxiu-model-it' key={inx}>
                                                    <Col span={12} className='baoxiu-model-it-line'>姓名： <Input onChange={(e) => this.inpServiceName(item, inx, e)} style={{ width: '65%' }} placeholder='请输入服务人员姓名' value={item.assign_name} /></Col>
                                                    <Col span={12} className='baoxiu-model-it-line'>电话： <Input onChange={(e) => this.inpServicePhone(item, inx, e)} style={{ width: '65%' }} placeholder='请输入服务人员电话' value={item.assign_phone} /></Col>
                                                </Col>)
                                        })
                                    }
                                    <Col span={24} className='baoxiu-model-it'>
                                        <Col span={12} className='baoxiu-model-quxiao'><div onClick={this.cancelBaoxiuModel}>取消</div></Col>
                                        <Col span={12} className='baoxiu-model-paidan'><div onClick={this.addServicePep}>确定</div></Col>
                                    </Col>
                                </Row>
                            ) : (
                                    <Row className='baoxiu-model-body'>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={12} className='baoxiu-model-it-line'>订单号：{this.state.baoxiu && this.state.baoxiu.internal_order_sn}</Col>
                                            <Col span={12} className='baoxiu-model-it-line'>服务项目：{this.state.baoxiu && this.state.baoxiu.sku_name}</Col>
                                        </Col>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={12} className='baoxiu-model-it-line'>姓名：{this.state.baoxiu && this.state.baoxiu.name}</Col>
                                            <Col span={12} className='baoxiu-model-it-line'>订单价格：{this.state.baoxiu && this.state.baoxiu.order_total_price}</Col>
                                        </Col>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={12} className='baoxiu-model-it-line'>联系电话：{this.state.baoxiu && this.state.baoxiu.mobile}</Col>
                                            <Col span={12} className='baoxiu-model-it-line'>服务地址：{this.state.baoxiu && this.state.baoxiu.address}</Col>
                                        </Col>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={12} className='baoxiu-model-it-line'>状态：{this.state.baoxiu && this.state.baoxiu.status_ct}</Col>
                                            <Col span={12} className='baoxiu-model-it-line'>服务时间：{this.state.baoxiu && this.state.baoxiu.service_time}</Col>
                                        </Col>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={4} className='baoxiu-model-it-line'>问题描述：</Col>
                                            <Col span={20} className='baoxiu-model-it-line'>{this.state.baoxiu && this.state.baoxiu.remarks}</Col>
                                        </Col>
                                        <Col span={24} className='baoxiu-model-it'>
                                            <Col span={12} className='baoxiu-model-quxiao'><div onClick={this.cancelBaoxiuModel}>取消</div></Col>
                                            <Col span={12} className='baoxiu-model-paidan'><div onClick={this.paiDan}>派单</div></Col>
                                        </Col>
                                    </Row>
                                )
                        }
                    </Spin>
                </Modal>
            </Row>
        )
    }
}

export default TableList;
