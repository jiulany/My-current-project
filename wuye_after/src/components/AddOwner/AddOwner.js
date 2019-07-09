import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, Upload, Icon, message } from 'antd';
const { Option } = Select;
//css样式在home.css
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class AddOwner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            image_url: [] //省份证正反index=0正，1为反
        }
    }
    pandPositiveOrReverse = (file, val) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            message.error('只允许JPG,PNG格式!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小应 2MB!');
        }
        if (isJPG && isLt2M) {
            getBase64(file, imageUrl => {
                let a = this.state.image_url
                if (val) {
                    a[0] = imageUrl
                    this.setState({
                        image_url: a,
                        loading: false,
                    })
                } else {
                    a[1] = imageUrl
                    this.setState({
                        image_url: a,
                        loading: false,
                    })
                }
            })
            return false
        }
    }
    beforeUpload = (file) => {
        this.pandPositiveOrReverse(file, true)
    }
    beforeUpload_0 = (file) => {
        this.pandPositiveOrReverse(file, false)
    }
    seleState = (e) => {
        if (e === "出租") {
            this.setState({
                tenant_state: true
            })
        } else {
            this.setState({
                tenant_state: false
            })
        }

    }
    componentDidMount() {
    }
    render() {
        const uploadButton = (pan) => (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{pan ? "租客身份证正面照" : "租客身份证反面照"}</div>
            </div>
        );
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={7}>
                            <Col span={5}>业主姓名：</Col>
                            <Col span={19}>
                                <Input placeholder="请输入姓名" />
                            </Col>
                        </Col>
                        <Col span={7}>
                            <Col span={5}>业主电话：</Col>
                            <Col span={19}><Input placeholder="请输入电话" /></Col>
                        </Col>
                        <Col span={7}>
                            <Col span={5}>门牌号：</Col>
                            <Col span={19}><Input placeholder="请输入门牌号" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={7}>
                            <Col span={5}>产权号：</Col>
                            <Col span={19}>
                                <Input placeholder="请输入产权号" />
                            </Col>
                        </Col>
                        <Col span={7} >
                            <Col span={5}>房屋面积：</Col>
                            <Col span={19}><Input placeholder="请输入房屋面积" /></Col>
                        </Col>
                        <Col span={7}>
                            <Col span={5}>居住人数：</Col>
                            <Col span={19}><Input placeholder="请输入居住人数" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={7}>
                            <Col span={5}>房屋状态：</Col>
                            <Col span={19}>
                                <Select style={{ width: '100%' }} placeholder="请选择房屋状态" allowClear={true} onChange={this.seleState}>
                                    <Option value="自住">自住</Option>
                                    <Option value="出租">出租</Option>
                                    <Option value="闲置">闲置</Option>
                                </Select>
                            </Col>
                        </Col>
                        {this.state.tenant_state === true && (
                            <Col span={7}>
                                <Col span={5}>租客姓名：</Col>
                                <Col span={19}><Input placeholder="请输入租客姓名" /></Col>
                            </Col>
                        )
                        }
                        {this.state.tenant_state === true && (
                            <Col span={7}>
                                <Col span={5}>租客电话：</Col>
                                <Col span={19}><Input placeholder="请输入租客电话" /></Col>
                            </Col>
                        )
                        }
                    </Col>
                    {this.state.tenant_state === true && (
                        <Col span={24}>
                            <Col span={7}>
                                <Col span={5}>租期：</Col>
                                <Col span={19}><Input placeholder="请输入租期" /></Col>
                            </Col>
                        </Col>
                    )
                    }
                    {this.state.tenant_state === true && (
                        <Col span={24}>
                            <Col span={7}>
                                <Col span={5}></Col>
                                <Col span={19} className="add-up">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                    >
                                        {this.state.image_url[0] ? <img src={this.state.image_url[0]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
                                    </Upload>
                                </Col>
                            </Col>
                            <Col span={7} >
                                <Col span={5}></Col>
                                <Col span={19} className="add-up">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload_0}
                                    >
                                        {this.state.image_url[1] ? <img src={this.state.image_url[1]} alt="avatar" className="add-up-show" /> : uploadButton(false)}
                                    </Upload></Col>
                            </Col>
                        </Col>
                    )}
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
                            <Col span={19} offset={5}>
                                <Col span={11} className="add-ctrl-it" ><Button>取消</Button></Col>
                                <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddOwner;
