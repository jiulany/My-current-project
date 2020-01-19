import React, { Component } from 'react';
import { Row, Col, Input, Button, notification, Icon, message, Select } from 'antd';
import Cookies from 'js-cookie'
import http from '../../api/http.js'
import './AddNotice.css'
const { TextArea } = Input;
const { Option } = Select;
//css样式在home.css

class AddNotice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            title: "",
            content: "",
            for_in: true,
            is_clck: true
        }
    }
    componentDidMount() {
        http('/community', {
            method: 'get', data: {}
        }).then(res => {
            this.setState({
                community_list: res.data
            })
        }).catch(res => {
            message.error(res.msg);
        })
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/notice/noticeOne', {
                    method: 'POST', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    if (res.data[0].community_id === 0) {
                        this.setState({
                            is_xiugai: true,
                            title: res.data[0].title,
                            content: res.data[0].content,
                            community_ids: res.data[0].community_id,
                            for_in: true
                        })
                    } else {
                        this.setState({
                            is_xiugai: true,
                            title: res.data[0].title,
                            content: res.data[0].content,
                            community_ids: res.data[0].community_id,
                            for_in: false
                        })
                    }

                }).catch(res => {
                    message.success(res.msg);
                    this.setState({
                        is_xiugai: true
                    })
                })
            }
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    handleXiuGai = () => {
        if (this.state.is_clck) {
            this.setState({
                is_clck:false
            })
            if (this.state.title && this.state.content !== '') {
                http('/notice/noticeUpd', {
                    method: 'POST',
                    data: {
                        id: this.props.location.query.update_id,
                        title: this.state.title,
                        content: this.state.content,
                        admin_id: Cookies.get('user_id'),
                        community_ids: this.state.community_ids
                    }
                }).then(res => {
                    this.setState({
                        is_clck:true
                    })
                    message.success(res.msg);
                    notification.open({
                        message: this.state.title,
                        description:
                            this.state.content,
                        icon: <Icon type="smile" style={{ color: '#fdd000' }} />,
                    });
                    setTimeout(() => {
                        this.props.history.go(-1)
                    }, 2000)
                }).catch(res => {
                    message.error(res.msg);
                    this.setState({
                        title: '',
                        content: ''
                    })
                    this.setState({
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
    handleUpload = () => {
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        if (this.state.title && this.state.content !== '') {
            http('/notice/noticeSave', {
                method: 'POST',
                data: {
                    title: this.state.title,
                    content: this.state.content,
                    admin_id: Cookies.get('user_id'),
                    community_ids: this.state.community_ids
                }
            }).then(res => {
                this.setState({
                    is_clck:true
                })
                message.success(res.msg);
                notification.open({
                    message: this.state.title,
                    description:
                        this.state.content,
                    icon: <Icon type="smile" style={{ color: '#fdd000' }} />,
                });
                this.setState({
                    title: '',
                    content: ''
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                this.setState({
                    is_clck:true
                })
                message.error(res.msg);
                this.setState({
                    title: '',
                    content: ''
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
    titleChange = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    contentChange = (e) => {
        this.setState({
            content: e.currentTarget.value
        })
    }
    handleSelectChange = (e) => {
        console.log(e)
        this.setState({
            community_ids: e,
        })
    }
    switchForIn = (i, e) => {
        if (i === 'forIn') {
            this.setState({
                for_in: true,
                community_ids: 0
            })
        } else {
            this.setState({
                for_in: false
            })
        }

    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={2}></Col>
                        <Col span={15} style={{ textAlign: 'start' }}>
                            <Button className={this.state.for_in ? 'notice_for_act' : 'notice_for'} onClick={(e) => this.switchForIn('forIn', e)}>对内发布</Button>
                            <Button className={!this.state.for_in ? 'notice_for_act' : 'notice_for'} onClick={this.switchForIn} style={{ marginLeft: '20px' }} >对外发布</Button>
                        </Col>
                    </Col>
                    {
                        !this.state.for_in && (
                            <Col span={24}>
                                <Col span={2}>小区：</Col>
                                <Col span={15} style={{ textAlign: 'start' }}>
                                    <Select className='head-sle-xiaoq'
                                        placeholder='请选择小区'
                                        onChange={this.handleSelectChange}
                                        value={this.state.community_ids}
                                        style={{ marginLeft: '0' }}
                                    >
                                        {
                                            this.state.community_list && this.state.community_list.map((item, inx) => {
                                                return <Option key={item.id} value={item.id}>{item.community_name}</Option>
                                            })
                                        }
                                    </Select>
                                </Col>
                            </Col>
                        )
                    }
                    <Col span={24}>
                        <Col span={2}>标题：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <Input
                                placeholder="请输入标题" onChange={this.titleChange} value={this.state.title}
                            />
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={2}>内容：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <TextArea
                                placeholder="请输入您发布的内容"
                                autosize={{ minRows: 6, maxRows: 6 }}
                                onChange={this.contentChange}
                                value={this.state.content}
                            />
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
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

export default AddNotice;
