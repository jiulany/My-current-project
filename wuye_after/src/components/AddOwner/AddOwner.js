import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, Upload, Icon, message, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Cookies from 'js-cookie'
import moment from 'moment';
import http from '../../api/http';
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
            is_xiugai: false,
            image_url: [], //省份证正反index=0正，1为反
            owner_name:'',
            owner_phone:'',
            title_number:'',
            area:'',
            number_residents:'',
            status:''
        }
    }
    componentWillMount(){
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                this.setState({
                    is_xiugai: true
                })
                http('/owner/owner_update_info', {
                    method: 'get', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    let a = this.state.image_url
                    a[0] = res.data[0].just_idk
                    a[1] = res.data[0].back_idk
                    this.setState({
                        door_number: res.data[0].house_number,
                        owner_name: res.data[0].owner_name,
                        owner_phone: res.data[0].owner_phone,
                        title_number: res.data[0].title_number,
                        area: res.data[0].area,
                        number_residents: res.data[0].number_residents,
                        status: parseInt(res.data[0].status),
                        renter_name: res.data[0].renter_name,
                        tenant_phone: res.data[0].tenant_phone,
                        lease_term: res.data[0].lease_term,
                        tenant_time:res.data[0].tenant_time,
                        show_tenant_time:moment(res.data[0].tenant_time),
                        just_idk: res.data[0].just_idk,
                        back_idk: res.data[0].back_idk,
                        image_url: a
                    })
                    console.log(res.data[0].renter_name)
                    if (parseInt(res.data[0].status) === 4) {
                        this.setState({
                            tenant_state: true
                        })
                    }
                }).catch(res => {
                    message.error(res.msg);
                    this.setState({
                        is_xiugai: true
                    })
                })
            }
        }
    }
    pandPositiveOrReverse = (file, val) => {
        console.log(file)
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
                        just_idk: file
                    })
                } else {
                    a[1] = imageUrl
                    this.setState({
                        image_url: a,
                        loading: false,
                        back_idk: file
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
        if (e === 4) {
            this.setState({
                tenant_state: true,
                status: e
            })
        } else {
            this.setState({
                tenant_state: false,
                status: e
            })
        }

    }
    inputValue = (p, e) => {
        if (p === 'owner_name') {
            this.setState({
                owner_name: e.currentTarget.value
            })
        }
        if (p === 'owner_phone') {
            this.setState({
                owner_phone: e.currentTarget.value
            })
        }
        if (p === 'door_number') {
            this.setState({
                door_number: e.currentTarget.value
            })
        }
        if (p === 'title_number') {
            this.setState({
                title_number: e.currentTarget.value
            })
        }
        if (p === 'area') {
            this.setState({
                area: e.currentTarget.value
            })
        }
        if (p === 'number_residents') {
            this.setState({
                number_residents: e.currentTarget.value
            })
        }
        if (p === 'renter_name') {
            this.setState({
                renter_name: e.currentTarget.value
            })
        }
        if (p === 'tenant_phone') {
            this.setState({
                tenant_phone: e.currentTarget.value
            })
        }
        if (p === 'lease_term') {
            this.setState({
                lease_term: e.currentTarget.value
            })
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    pushFormData = () => {
        return new Promise((resolve, reject) => {
            let _thisst = this.state
            var formData = new FormData()
            formData.append('id', _thisst.household_id)
            formData.append('owner_name', _thisst.owner_name)
            formData.append('owner_phone', _thisst.owner_phone)
            formData.append('title_number', _thisst.title_number)
            formData.append('number_residents', _thisst.number_residents)
            formData.append('status', _thisst.status)
            formData.append('renter_name', _thisst.renter_name)
            formData.append('tenant_phone', _thisst.tenant_phone)
            formData.append('tenant_time', _thisst.tenant_time)
            formData.append('lease_term', _thisst.lease_term)
            if (_thisst.just_idk) {
                formData.append('just_idk', _thisst.just_idk)
            } else {
                formData.append('img_urlz', this.state.image_url[0])
            }
            if (_thisst.back_idk) {
                formData.append('back_idk', _thisst.back_idk)
            } else {
                formData.append('img_urlf', this.state.image_url[1])
            }
            // formData.append('just_idk', _thisst.just_idk)
            // formData.append('back_idk', _thisst.back_idk)
            resolve(formData)
        })
    }
    handleUpload = () => {
        let _thisst = this.state
        this.pushFormData().then(res => {
            console.log(res.get('status'))
            if (_thisst.door_number !== ''
                && _thisst.owner_name !== ''
                && _thisst.owner_phone !== ''
                && _thisst.title_number !== ''
                && _thisst.area !== ''
                && _thisst.number_residents !== ''
                && _thisst.status !== ''
            ) {
                http('/owner/owner_add', {
                    method: 'POST',
                    data: res,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    message.success(res.msg);
                    this.setState({
                    })
                    setTimeout(() => {
                        this.props.history.go(-1)
                    }, 2000)
                }).catch(res => {
                    message.error(res.msg);
                    this.setState({
                    })
                })
            } else {
                message.error('输入不能为空，请检查！');
            }
        })
    }
    handleXiuGai = () => {
        let _thisst = this.state
        this.pushFormData().then(res => {
            if (_thisst.door_number !== ''
                && _thisst.owner_name !== ''
                && _thisst.owner_phone !== ''
                && _thisst.title_number !== ''
                && _thisst.area !== ''
                && _thisst.number_residents !== ''
                && _thisst.status !== ''
            ) {
                res.append('id', this.props.location.query.update_id)
                http('/owner/owner_update', {
                    method: 'POST',
                    data: res,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    message.success(res.msg);
                    setTimeout(() => {
                        this.props.history.go(-1)
                    }, 2000)
                }).catch(res => {
                    message.error(res.msg);
                    this.setState({
                        door_number: '',
                        owner_name: '',
                        owner_phone: '',
                        title_number: '',
                        area: '',
                        number_residents: '',
                        status: '',
                        renter_name: '',
                        tenant_phone: '',
                        lease_term: '',
                        just_idk: '',
                        back_idk: '',
                    })
                })
            } else {
                message.error('输入不能为空，请检查！');
            }
        })
    }
    blurGetHuzhu = (e) => {
        http('/household/find', {
            method: 'get',
            data: {
                community_id: Cookies.get('community_id'),
                house_number: e.currentTarget.value
            }
        }).then(res => {
            console.log(res)
            this.setState({
                household_id: res.data.id,
                area: res.data.area,
                status:res.data.status
            })
        }).catch(res => {
            message.error(res.msg);
            this.setState({
                door_number: '',
                area: ''
            })
        })
    }
    ruzhuTime = (e) => {
        console.log( moment(e).format('YYYY-MM-DD'))
        this.setState({
            tenant_time: moment(e).format('YYYY-MM-DD'),
            show_tenant_time:e
        })
    }
    render() {
        const uploadButton = (pan) => (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{pan ? "国徽面" : "头像面"}</div>
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
                                <Input placeholder="请输入姓名" value={this.state.owner_name} onChange={(e) => this.inputValue('owner_name', e)} />
                            </Col>
                        </Col>
                        <Col span={7}>
                            <Col span={5}>业主电话：</Col>
                            <Col span={19}><Input placeholder="请输入电话" maxLength={11} value={this.state.owner_phone} onChange={(e) => this.inputValue('owner_phone', e)} /></Col>
                        </Col>
                        <Col span={7}>
                            <Col span={5}>门牌号：</Col>
                            <Col span={19}><Input disabled={this.state.is_xiugai?true:false} onBlur={this.blurGetHuzhu} placeholder="请输入门牌号" value={this.state.door_number} onChange={(e) => this.inputValue('door_number', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={7}>
                            <Col span={5}>产权号：</Col>
                            <Col span={19}>
                                <Input placeholder="请输入产权号" value={this.state.title_number} onChange={(e) => this.inputValue('title_number', e)} />
                            </Col>
                        </Col>
                        <Col span={7} >
                            <Col span={5}>房屋面积：</Col>
                            <Col span={19}><Input disabled placeholder="请输入房屋面积" value={this.state.area} onChange={(e) => this.inputValue('area', e)} /></Col>
                        </Col>
                        {this.state.tenant_state !== true && (
                            <Col span={7}>
                                <Col span={5}>居住人数：</Col>
                                <Col span={19}><Input placeholder="请输入居住人数" value={this.state.number_residents} onChange={(e) => this.inputValue('number_residents', e)} /></Col>
                            </Col>
                        )
                        }
                    </Col>
                    <Col span={24}>
                        <Col span={7}>
                            <Col span={5}>房屋状态：</Col>
                            <Col span={19}>
                                <Select style={{ width: '100%' }} placeholder="请选择房屋状态" allowClear={true} value={this.state.status} onChange={this.seleState}>
                                    <Option value={1}>自住</Option>
                                    <Option value={2}>闲置</Option>
                                    <Option value={3}>装修</Option>
                                    <Option value={4}>出租</Option>
                                </Select>
                            </Col>
                        </Col>
                        {this.state.tenant_state === true && (
                            <Col span={7}>
                                <Col span={5}>租客姓名：</Col>
                                <Col span={19}><Input placeholder="请输入租客姓名" value={this.state.renter_name} onChange={(e) => this.inputValue('renter_name', e)} /></Col>
                            </Col>
                        )
                        }
                        {this.state.tenant_state === true && (
                            <Col span={7}>
                                <Col span={5}>租客电话：</Col>
                                <Col span={19}><Input maxLength={11} placeholder="请输入租客电话" value={this.state.tenant_phone} onChange={(e) => this.inputValue('tenant_phone', e)} /></Col>
                            </Col>
                        )
                        }
                    </Col>
                    {this.state.tenant_state === true && (
                        <Col span={24}>
                            <Col span={7}>
                                <Col span={5}>租期：</Col>
                                <Col span={19}><Input placeholder="请输入租期" value={this.state.lease_term} onChange={(e) => this.inputValue('lease_term', e)} /></Col>
                            </Col>
                            <Col span={7}>
                                <Col span={5}>入住时间：</Col>
                                <Col span={19}> <DatePicker value={this.state.show_tenant_time} locale={locale} onChange={this.ruzhuTime} placeholder="选择入住日期" /></Col>
                            </Col>
                            <Col span={7}>
                                <Col span={5}>居住人数：</Col>
                                <Col span={19}><Input placeholder="请输入居住人数" value={this.state.number_residents} onChange={(e) => this.inputValue('number_residents', e)} /></Col>
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

export default AddOwner;
