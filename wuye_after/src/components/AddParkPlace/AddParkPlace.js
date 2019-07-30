import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Select } from 'antd';
import Cookies from 'js-cookie'
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
            image_url: [] //省份证正反index=0正，1为反
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/park/park_render', {
                    method: 'POST', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    this.setState({
                        is_xiugai: true,
                        park_floor: res.data[0].park_floor,
                        park_status: res.data[0].park_status,
                        park_number: res.data[0].park_number
                    })
                }).catch(res => {
                    message.success(res.msg);
                    this.setState({
                        is_xiugai: true
                    })
                })
            }
        }
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.parks && _thisst.park_floor && _thisst.park_status !== '') {
            http('/park/add_list_Storied', {
                method: 'POST',
                data: {
                    parks: _thisst.parks,
                    park_floor: _thisst.park_floor,
                    park_status: _thisst.park_status,
                    community_id: Cookies.get('community_id'),
                }
            }).then(res => {
                message.success(res.msg);
                this.setState({
                    parks: "",
                    park_floor: ""
                })
                setTimeout(()=>{
                    this.props.history.go(-1)
                },2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    parks: "",
                    park_floor: ""
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    handleXiuGai=()=>{
        let _thisst = this.state
        if( _thisst.park_floor && _thisst.park_status !== ''){
            http('/park/park_update',{
                method:'POST',
                data:{
                    id:this.props.location.query.update_id,
                    park_floor: _thisst.park_floor,
                    park_status: _thisst.park_status
                }
            }).then(res=>{
                message.success(res.msg);
                setTimeout(()=>{
                    this.props.history.go(-1)
                },2000)
            }).catch(res=>{
                message.error(res.msg);
                this.setState({
                    park_floor: _thisst.park_floor,
                    park_status: _thisst.park_status
                })
            })
        }else{
            message.error('输入不能为空，请检查！');
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    inputValue = (p, e) => {
        if (p === 'parks') {
            this.setState({
                parks: e.currentTarget.value
            })
        }
    }
    seleState = (e) => {
        this.setState({
            park_status: e
        })
    }
    seleLou = (e) => {
        this.setState({
            park_floor: e
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
                            <Col span={18}>
                                <Select style={{ width: '100%' }} value={this.state.park_floor} placeholder="请选择楼层" onChange={this.seleLou} allowClear={true}>
                                    <Option value='地面'>地面</Option>
                                    <Option value='负一楼'>负一楼</Option>
                                    <Option value='负二楼'>负二楼</Option>
                                    <Option value='负三楼'>负三楼</Option>
                                </Select>
                            </Col>
                        </Col>
                        {
                            !this.state.is_xiugai &&
                            <Col span={9} offset={1}>
                                <Col span={6}>添加车位数量：</Col>
                                <Col span={18}><Input placeholder="请输入数量" value={this.state.parks} onChange={(e) => this.inputValue('parks', e)} /></Col>
                            </Col>
                        }
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
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
