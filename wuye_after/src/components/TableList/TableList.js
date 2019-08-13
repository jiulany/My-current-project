import React, { Component } from 'react';
import { Row, Col, Button, Input, Pagination, Modal, Spin, Icon, message, DatePicker } from 'antd';
import { HEAD_CONF, mapAddressToTd, getPageTotal, getTableList, deleItem } from './TableListconf'
import moment from 'moment';
import Cookies from 'js-cookie'
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
            cur_communite: Cookies.get('community_id')
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
            console.log(sessionStorage.getItem('isFromInx'))
            this.setState({
                issle_pay: 2
            })
        }
        this.matchPath(this.props.match.path) //匹配地址
        this.initialRender()
    }
    initialRender = (status) => {
        this.setState({
            is_tbupdate_loading: true
        })
        setTimeout(() => {
            getPageTotal(this.props.match.path, this.state.cur_search_val).then(res => { //获取总页数
                this.setState({
                    total_page: res.data
                })
            }).catch(res => {
            })

            getTableList(this.props.match.path, 1, 10, this.state.cur_search_val, status).then(res => { //获取table数据
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
        this.props.history.push({ pathname: this.state.add_path, query: { type: 1, update_id: clickItem.id, cost_type: clickItem.type, id_xiu: 'true',park_floor:clickItem.park_floor } })
    }
    xQCurItem = (clickItem, e) => {
        this.props.history.push({ pathname: this.state.pay_details, query: { type: 1, update_id: clickItem.id, cost_type: clickItem.type, household_id: clickItem.household_id } })
    }
    addParkPlace=(clickItem, e)=>{
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
        getTableList(this.props.match.path, inx, 10, this.state.cur_search_val, this.state.cur_sle_month).then(res => { //获取table数据
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
        getTableList(this.props.match.path, 1, 10, val, this.state.cur_sle_month).then(res => { //获取table数据
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
        if(val==='Invalid date'){
            val=''
        }
        getTableList(this.props.match.path, 1, 10, this.state.cur_search_val, val).then(res => { //获取table数据
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
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="table-list-row">
                <Col span={24} className="table-list-mainctrl">
                    <Col span={4}>
                        <Search placeholder="" className="table-list-search" onSearch={this.searchTb} enterButton />
                        <br />
                    </Col>
                    <Col span={17}>
                        {
                            this.state.is_shiw_tbhead &&
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
                                        this.state.head.map((item, index) => {
                                            return <th key={item}>{item}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((item, index) => {
                                        return (  //此处不能用标签模式，会报tbody子组件不能用当前组件只能为tr td
                                            mapAddressToTd(this.props.match.path, item, {
                                                deleCurItem: this.deleCurItem,
                                                xiuGAiCurItem: this.xiuGAiCurItem,
                                                xQCurItem: this.xQCurItem,
                                                addParkPlace:this.addParkPlace
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
            </Row>
        )
    }
}

export default TableList;
