import React, { Component } from 'react';
import { Row, Col, Button, Input, Pagination, Modal, Spin, Icon, message } from 'antd';
import { HEAD_CONF, mapAddressToTd, getPageTotal, getTableList, deleItem } from './TableListconf'
import './TableList.css'
const { Search } = Input;
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
            cur_page:1//当前页数
        }
    }
    componentDidMount() {
        this.matchPath(this.props.match.path) //匹配地址
        this.setState({
            is_tbupdate_loading: true
        })
        getPageTotal(this.props.match.path,this.state.cur_search_val).then(res => { //获取总页数
            this.setState({
                total_page: res.data
            })
        }).catch(res => {
            message.error(res.msg, 3)
        })
        
        getTableList(this.props.match.path, 1, 10,this.state.cur_search_val).then(res => { //获取table数据
            this.setState({
                data: res.data,
                is_tbupdate_loading:false
            })
        }).catch(res => {
            this.setState({
                is_tbupdate_loading:false
            })
            message.error(res.msg, 3)
        })

    }
    deleCurItem = (clickItem, e) => {
        this.setState({
            deleModel: true,
            dele_item: clickItem
        })
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
            getPageTotal(this.props.match.path,this.state.cur_search_val).then(res => { //获取总页数
                this.setState({
                    total_page: res.data,
                    cur_page:1
                })
            })
            getTableList(this.props.match.path, 1, 10,this.state.cur_search_val).then(res => { //获取table数据
                setTimeout(() => {
                    this.setState({
                        data: res.data,
                        is_tbupdate_loading: false
                    })
                }, 500)
            }).catch(res => {
                this.setState({
                    is_dele_loading: false,
                    is_tbupdate_loading: false
                })
                message.error(res.msg, 3)
            })
        }).catch(res => {
            message.error(res.msg, 3)
        })
    }
    getPageChange = (inx) => {//页码变化
        this.setState({
            is_tbupdate_loading: true
        })
        getTableList(this.props.match.path, inx, 10,this.state.cur_search_val).then(res => { //获取table数据
            setTimeout(() => {
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false,
                    cur_page:inx
                })
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
            cur_search_val:val
        })
        getTableList(this.props.match.path, 1, 10,val).then(res => { //获取table数据
            setTimeout(() => {
                this.setState({
                    data: res.data,
                    is_tbupdate_loading: false
                })
            }, 500)
        }).catch(res => {
            this.setState({
                is_tbupdate_loading: false
            })
            message.error(res.msg, 3)
        })
        getPageTotal(this.props.match.path,val).then(res => { //获取总页数
            this.setState({
                total_page: res.data,
                cur_page:1
            })
        })
    }
    closeModaDelel = () => {
        this.setState({
            deleModel: false
        })
    }
    matchPath(val) {
        switch (val) {
            case "/":
                this.setState({
                    ...HEAD_CONF.YE_ZHU
                })
                break
            case "/repair_manage":
                this.setState({
                    ...HEAD_CONF.REPAIR_MANAGE
                })
                break
            case "/water_list":
                this.setState({
                    ...HEAD_CONF.WATER_LIST
                })
                break
            case "/gas_list":
                this.setState({
                    ...HEAD_CONF.GAS_LIST
                })
                break
            case "/electricity_list":
                this.setState({
                    ...HEAD_CONF.ELECTRICITY_LIST
                })
                break
            case "/property_list":
                this.setState({
                    ...HEAD_CONF.PROPERTY_LIST
                })
                break
            case "/garbage_list":
                this.setState({
                    ...HEAD_CONF.GARBAGE_LIST
                })
                break
            case "/notice_list":
                this.setState({
                    ...HEAD_CONF.NOTICE_LIST
                })
                break
            case "/quarters_list":
                this.setState({
                    ...HEAD_CONF.QUARTERS_LIST
                })
                break
            case "/household_list":
                this.setState({
                    ...HEAD_CONF.HOUSEHOLD_LIST
                })
                break
            case "/merchant_list":
                this.setState({
                    ...HEAD_CONF.MERCHANT_LIST
                })
                break
            case "/parking_list":
                this.setState({
                    ...HEAD_CONF.PARKING_LIST
                })
                break
            default:
                break
        }
    }
    addItme = () => {
        this.props.history.push(this.state.add_path)
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
                    <Col span={16}>
                        {
                            this.state.is_shiw_tbhead &&
                            <Col span={24} className='table-list-ms'>
                                <Col span={6}>抄表日期：2019.6.25</Col>
                                <Col span={6}>抄表人：万潇</Col>
                                <Col span={6}>审核人：万潇</Col>
                                <Col span={6}>计费周期：2019.6.1-2019.6.30</Col>
                            </Col>
                        }
                    </Col>
                    <Col span={4} className="table-list-add">
                        <Button type="primary" shape="round" onClick={this.addItme} className="table-list-addbtn">
                            添加
                        </Button>
                    </Col>
                </Col>
                <Col span={24} className="table-list-fenline">
                </Col>
                <Col span={24} >
                    <Spin indicator={antIcon} spinning={this.state.is_tbupdate_loading} >
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
                                                deleCurItem: this.deleCurItem
                                            })
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Spin>
                </Col>
                <Col span={24} className="table-list-page">
                    <Pagination  current={this.state.cur_page} total={this.state.total_page} onChange={this.getPageChange} />
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
