import React, { Component } from 'react';
import { Row, Col, Input, Button ,message} from 'antd';
import Cookies from 'js-cookie'
import http from '../../api/http';
//css样式在home.css

class AddWuYe extends Component {
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
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.unit && _thisst.floor && _thisst.layer_number && _thisst.households !== '') {
            http('/community/add_list_Storied', {
                method: 'POST',
                data: {
                    floor: _thisst.floor,
                    unit: _thisst.unit,
                    layer_number: _thisst.layer_number,
                    households: _thisst.households,
                    community_id: Cookies.get('community_id'),
                    admin_id: Cookies.get('user_id')
                }
            }).then(res => {
                message.success(res.msg);
                this.setState({
                    floor: '',
                    unit: '',
                    layer_number:'',
                    households:'',
                })
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    floor: '',
                    unit: '',
                    layer_number:'',
                    households:'',
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
        if (p === 'unit') {
            this.setState({
                unit: e.currentTarget.value
            })
        }
        if (p === 'floor') {
            this.setState({
                floor: e.currentTarget.value
            })
        }
        if (p === 'layer_number') {
            this.setState({
                layer_number: e.currentTarget.value
            })
        }
        if (p === 'households') {
            this.setState({
                households: e.currentTarget.value
            })
        }
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>单元数：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入单元数" value={this.state.unit} onChange={(e) => this.inputValue('unit', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>楼号：</Col>
                            <Col span={18}><Input placeholder="请输入楼号" value={this.state.floor} onChange={(e) => this.inputValue('floor', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>层数：</Col>
                            <Col span={18}><Input placeholder="请输入层数" value={this.state.layer_number} onChange={(e) => this.inputValue('layer_number', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>单层户数：</Col>
                            <Col span={18}><Input placeholder="请输入单层户数" value={this.state.households} onChange={(e) => this.inputValue('households', e)} /></Col>
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

export default AddWuYe;
