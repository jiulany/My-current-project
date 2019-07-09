import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select, Upload, message, Icon, Button } from 'antd';
import './FloorManage.css'
const { Option } = Select;
//css样式在home.css
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class FloorManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_model: true,
            tenant_state: false,
            loading: false,
            image_url: [],
            is_change: false
        }
    }
    componentDidMount() {
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
    deleCurItem = () => {
        this.setState(prev => ({
            show_model: !prev.show_model
        }))
    }
    modifyStat = () => {
        this.setState({
            is_change: true
        })
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
    render() {
        const uploadButton = (pan) => (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{pan ? "租客身份证正面照" : "租客身份证反面照"}</div>
            </div>
        );
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='floor-mag'>
                <Col span={24}>
                    <Modal title="一单元一号楼 1-1-1" visible={this.state.show_model} onOk={this.handleOk} className='floor-mag-mod' okText='保存'
                        onCancel={this.deleCurItem}
                    >
                        {
                            this.state.is_change && <Row>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>业主姓名：</Col>
                                        <Col span={18}>
                                            <Input placeholder="请输入业主姓名" />
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>业主电话：</Col>
                                        <Col span={18}><Input placeholder="请输入业主电话" /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>门牌号：</Col>
                                        <Col span={18}>
                                            1-1-1
                                    </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>产权号：</Col>
                                        <Col span={18}><Input placeholder="请输入产权号" /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋面积：</Col>
                                        <Col span={18}>
                                            120㎡
                                    </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>居住人数：</Col>
                                        <Col span={18}><Input placeholder="请输入产权号" /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋状态：</Col>
                                        <Col span={18}>
                                            <Select style={{ width: '100%' }} placeholder="请选择房屋状态" allowClear={true} onChange={this.seleState}>
                                                <Option value="自住">自住</Option>
                                                <Option value="出租">出租</Option>
                                                <Option value="闲置">闲置</Option>
                                            </Select>
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>缴费状态：</Col>
                                        <Col span={18}>
                                            <Select style={{ width: '100%' }} placeholder="请选择缴费状态" allowClear={true}>
                                                <Option value="已付费">已付费</Option>
                                                <Option value="未付费">未付费</Option>
                                            </Select>
                                        </Col>
                                    </Col>
                                </Col>
                                {this.state.tenant_state === true && (
                                    <Col span={24}>
                                        <Col span={8}>
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
                                        <Col span={8} >
                                            <Col span={5}></Col>
                                            <Col span={19} className="add-up">
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    showUploadList={false}
                                                    beforeUpload={this.beforeUpload_0}
                                                >
                                                    {this.state.image_url[1] ? <img src={this.state.image_url[1]} alt="avatar" className="add-up-show" /> : uploadButton(false)}
                                                </Upload>
                                            </Col>
                                        </Col>
                                    </Col>
                                )}
                                <Col span={24} className="add-ctrl">
                                    <Col span={11}>
                                        <Col span={9} offset={6} className="add-ctrl-it" ><Button onClick={this.deleCurItem}>取消</Button></Col>
                                        <Col span={9} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">保存</Button></Col>
                                    </Col>
                                </Col>
                            </Row>
                        }
                        {
                            !this.state.is_change && <Row>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>业主姓名：</Col>
                                        <Col span={18}>
                                            瓦尼若
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>业主电话：</Col>
                                        <Col span={18}>173115646464</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>门牌号：</Col>
                                        <Col span={18}>
                                            1-1-1
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>产权号：</Col>
                                        <Col span={18}>无</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋面积：</Col>
                                        <Col span={18}>
                                            120㎡
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>居住人数：</Col>
                                        <Col span={18}>无</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋状态：</Col>
                                        <Col span={18}>
                                            闲置
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>缴费状态：</Col>
                                        <Col span={18}>
                                            未交费
                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={8}>
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
                                    <Col span={8} >
                                        <Col span={5}></Col>
                                        <Col span={19} className="add-up">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                showUploadList={false}
                                                beforeUpload={this.beforeUpload_0}
                                            >
                                                {this.state.image_url[1] ? <img src={this.state.image_url[1]} alt="avatar" className="add-up-show" /> : uploadButton(false)}
                                            </Upload>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24} className="add-ctrl">
                                        <Col span={24} className="add-ctrl-it floor-mag-xiugai" onClick={this.modifyStat}><Button type="primary">修改</Button></Col>
                                </Col>
                            </Row>
                        }
                    </Modal>
                </Col>
            </Row>
        )
    }
}

export default FloorManage;
