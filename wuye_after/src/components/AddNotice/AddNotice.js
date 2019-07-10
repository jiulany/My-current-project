import React, { Component } from 'react';
import { Row, Col, Input, Button,notification,Icon,message } from 'antd';
import Cookies from 'js-cookie'
import http from '../../api/http.js'
const { TextArea } = Input;
//css样式在home.css

class AddNotice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            title: "",
            content: ""
        }
    }
    componentDidMount() {
    }
    cancelAdd=()=>{
        this.props.history.go(-1)
    }
    handleUpload=()=>{
        http('/notice/noticeSave',{
            method:'POST',
            data:{
                title:this.state.title,
                content:this.state.content,
                community_id:Cookies.get('community_id'),
                admin_id:Cookies.get('user_id')
            }
        }).then(res=>{
            message.success(res.msg);
            notification.open({
                message: this.state.title,
                description:
                this.state.content,
                icon: <Icon type="smile" style={{ color: '#fdd000' }} />,
              });
            this.setState({
                title:'',
                content:''
            })
        }).catch(res=>{
            message.error(res.msg);
            this.setState({
                title:'',
                content:''
            })
        })
    }
    titleChange = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    contentChange=(e)=>{
        this.setState({
            content: e.currentTarget.value
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={2}>标题：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <Input
                                placeholder="请输入标题" onChange={this.titleChange}value={this.state.title}
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
                                <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddNotice;
