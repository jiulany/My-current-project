import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Select } from 'antd';
import http from '../../api/http';

const { Option } = Select;
//css样式在home.css

class AddParkPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            image_url: [], //省份证正反index=0正，1为反
            park_floor_list: [{ id: 0, park_floor: '加载中' }],
            is_clck:true
        }
    }
    componentDidMount() {
        http('/park/park_floor', {
            method: 'get', data: {
            }
        }).then(res => {
            this.setState({
                park_floor_list: res.data,
                park_floor_id: this.props.location.query.id
            })
            http('/park/park_region', {
                method: 'get', data: {
                    floor_id: this.props.location.query.id
                }
            }).then(res => {
                this.setState({
                    park_region_list: res.data
                })
            }).catch(res => {
            })
        }).catch(res => {
        })
        // if (this.props.location.query) {
        //     let query = this.props.location.query
        //     if (query.type === 1) {
        //         http('/park/park_render', {
        //             method: 'POST', data: {
        //                 id: query.update_id
        //             }
        //         }).then(res => {
        //             this.setState({
        //                 is_xiugai: true,
        //                 park_floor: res.data[0].park_floor,
        //                 park_status: res.data[0].park_status,
        //                 park_number: res.data[0].park_number
        //             })
        //         }).catch(res => {
        //             message.success(res.msg);
        //             this.setState({
        //                 is_xiugai: true
        //             })
        //         })
        //     }
        // }
    }
    handleUpload = () => {
        let _thisst = this.state
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        if (_thisst.start_park_number && _thisst.end_park_number && _thisst.park_status && _thisst.park_floor_id && _thisst.park_region !== '') {
            http('/park/add_park', {
                method: 'POST',
                data: {
                    park_floor_id: _thisst.park_floor_id,
                    start_park_number: _thisst.start_park_number,
                    end_park_number: _thisst.end_park_number,
                    park_status: _thisst.park_status,
                    park_region: _thisst.park_region
                }
            }).then(res => {
                message.success(res.msg);
                this.setState({
                    start_park_number: "",
                    end_park_number: "",
                    is_clck:true
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                if(res.code===500){
                    message.error('添加失败');
                }else{
                    message.error(res.msg);
                }
                this.setState({
                    start_park_number: "",
                    end_park_number: "",
                    is_clck:true
                })
            })
        } else {
            this.setState({
                is_clck:true
            })
            message.error('输入不能为空，请检查！');
        }
    }
    }
    handleXiuGai = () => {
        let _thisst = this.state
        if (_thisst.park_floor && _thisst.park_status !== '') {
            http('/park/park_update', {
                method: 'POST',
                data: {
                    id: this.props.location.query.update_id,
                    park_floor: _thisst.park_floor,
                    park_status: _thisst.park_status
                }
            }).then(res => {
                message.success(res.msg);
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    park_floor: _thisst.park_floor,
                    park_status: _thisst.park_status
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    inputValue = (p, e) => {
        if (p === 'start_park_number') {
            this.setState({
                start_park_number: e.currentTarget.value
            })
        }
        if (p === 'end_park_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                end_park_number: re
            })
        }
        if (p === 'park_region') {
            this.setState({
                park_region: e.currentTarget.value
            })
        }
    }
    seleState = (e) => {
        this.setState({
            park_status: e
        })
    }
    seleparkRegion = (e) => {
        this.setState({
            park_region: e
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    {
                        this.state.is_xiugai &&
                        <Col span={24} style={{ textAlign: 'start', fontSize: '18px', fontWeight: 'bold' }}>
                            修改车位编号 {this.state.park_number}
                        </Col>
                    }
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>楼层：</Col>
                            <Col span={18} >
                                <Select disabled style={{ width: '100%' }} value={this.state.park_floor_id} placeholder="请选择楼层" onChange={this.seleLou} allowClear={true}>
                                    {
                                        this.state.park_floor_list && this.state.park_floor_list.map((item, inx) => {
                                            return (
                                                <Option value={item.id} key={item.id}>{item.park_floor}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                        </Col>
                        {
                            !this.state.is_xiugai &&
                            <Col span={9} offset={1}>
                                <Col span={6}>状态：</Col>
                                <Col span={18}>
                                    <Select style={{ width: '100%' }} value={this.state.park_status} placeholder="请选择车位状态" onChange={this.seleState} allowClear={true}>
                                        <Option value={1}>闲置</Option>
                                        <Option value={2}>出租</Option>
                                        <Option value={3}>自用</Option>
                                        <Option value={4}>人防</Option>
                                    </Select>
                                </Col>
                            </Col>
                        }
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>区号：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入区号" value={this.state.park_region} onChange={(e) => this.inputValue('park_region', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>起始车位：</Col>
                            <Col span={18}><Input placeholder="请输入数" value={this.state.start_park_number} onChange={(e) => this.inputValue('start_park_number', e)} />
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9} >
                            <Col span={6}>结束车位：</Col>
                            <Col span={18}><Input placeholder="请输入数" value={this.state.end_park_number} onChange={(e) => this.inputValue('end_park_number', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={10}>
                            <Col span={19} offset={5}>
                                <Col span={11} className="add-ctrl-it" onClick={this.cancelAdd}><Button>取消</Button></Col>
                                {
                                    this.state.is_xiugai ?
                                        <Col span={11} className="add-ctrl-it" onClick={this.handleXiuGai}><Button type="primary">修改</Button></Col> :
                                        <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                                }
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddParkPlace;
