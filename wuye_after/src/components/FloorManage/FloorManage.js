import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select, Upload, message, Icon, Button } from 'antd';
import Cookies from 'js-cookie'
import http, { baseURL } from '../../api/http';
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
            show_model: false,
            tenant_state: false,
            loading: false,
            image_url: [],
            is_change: false,
            data: [],
            data_row: [],
            data_cow: [],
            data_main: []
        }
    }
    componentDidMount() {
        http('/floor/floor_list', {
            method: 'get',
            data: {
                community_id: Cookies.get('community_id'),
            }
        }).then(res => {
            let data_row = new Array(parseInt(res.data.dong))
            let data_cow = new Array(parseInt(res.data.dan))
            data_row.fill('')
            data_cow.fill('')
            // for (let i in res.data) {
            //     data_row.push({ id: res.data[i].id, number: res.data[i].number, comment: res.data[i].comment, act_sle: false })
            //     data_cow.push({ id: res.data[i].id, unit: res.data[i].unit, act_sle: false })
            // }
            for (let i in data_row) {
                data_row[i] = { id: i, number: parseInt(i) + 1, comment: parseInt(i) + 1, act_sle: false }
            }
            for (let i in data_cow) {
                data_cow[i] = { id: i, unit: parseInt(i) + 1, act_sle: false }
            }
            this.setState({
                data: res.data,
                data_row: data_row,
                data_cow: data_cow
            })
        }).catch(res => {

        })
    }
    clickRowItem = (inx, e) => {
        let row = this.state.data_row
        for (let i in row) {
            row[i].act_sle = false
        }
        row[inx].act_sle = true
        this.setState({
            data_row: row,
            number: row[inx].number
        })
        http('/floor/floor_list_info', {
            method: 'get',
            data: {
                foller: row[inx].number,
                unit: this.state.unit
            }
        }).then(res => {
            this.setState({
                data_main: res.data
            })
        }).catch(res => {
            this.setState({
                data_main: []
            })
            message.error(res.msg);
        })

    }
    clickCowItem = (inx, e) => {
        let cow = this.state.data_cow
        for (let i in cow) {
            cow[i].act_sle = false
        }
        cow[inx].act_sle = true
        this.setState({
            data_cow: cow,
            unit: cow[inx].unit
        })
        http('/floor/floor_list_info', {
            method: 'get',
            data: {
                foller: this.state.number,
                unit: cow[inx].unit
            }
        }).then(res => {
            this.setState({
                data_main: res.data
            })
        }).catch(res => {
            this.setState({
                data_main: []
            })
            message.error(res.msg);
        })
    }
    clickItem = (inx, e) => {
        let cur_click=this.state.data_main[inx]
        this.setState({
            mod_title:`${cur_click.floor_don}栋${cur_click.unit}单元${cur_click.house_number}`
        })
        if (cur_click.status === '2') {//闲置状态
            this.setState({
                is_change: true,
            })
        } else {
            this.setState({//非闲置状态
                is_change: false,
            })
        }
        if (parseInt(cur_click.status) === 4) {
            this.setState({
                tenant_state: true
            })
        } else {
            this.setState({
                tenant_state: false
            })
        }
        let a = this.state.image_url
        a[0] = baseURL + cur_click.just_idk
        a[1] = baseURL + cur_click.back_idk
        this.setState({
            show_model: true,
            door_number: cur_click.door_number,
            owner_name: cur_click.owner_name,
            owner_phone: cur_click.owner_phone,
            house_number:cur_click.house_number,
            title_number: cur_click.title_number,
            image_url: a,
            area: cur_click.area,
            number_residents: cur_click.number_residents,
            status: parseInt(cur_click.status),
            inx: inx,
        })
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
    pushFormData = () => {
        return new Promise((resolve, reject) => {
            let _thisst = this.state
            var formData = new FormData()
            formData.append('door_number', _thisst.door_number)
            formData.append('owner_name', _thisst.owner_name)
            formData.append('owner_phone', _thisst.owner_phone)
            formData.append('title_number', _thisst.title_number)
            formData.append('area', _thisst.area)
            formData.append('number_residents', _thisst.number_residents)
            formData.append('status', _thisst.status)
            formData.append('door_number', _thisst.door_number)
            // formData.append('renter_name', _thisst.renter_name)
            // formData.append('tenant_phone', _thisst.tenant_phone)
            // formData.append('lease_term', _thisst.lease_term)
            if(_thisst.just_idk){
                formData.append('just_idk', _thisst.just_idk)
            }else{
                formData.append('img_urlz',this.state.data_main[this.state.inx].just_idk)
            }
            if(_thisst.back_idk){
                formData.append('back_idk', _thisst.back_idk)
            }else{
                formData.append('img_urlf',this.state.data_main[this.state.inx].back_idk)
            }
            resolve(formData)
        })
    }
    handleUpload = () => {
        let _thisst = this.state
        this.pushFormData().then(res => {
            if (_thisst.door_number !== ''
                && _thisst.owner_name !== ''
                && _thisst.owner_phone !== ''
                && _thisst.title_number !== ''
                && _thisst.area !== ''
                && _thisst.number_residents !== ''
                && _thisst.status !== ''
                // && _thisst.renter_name !== ''
                // && _thisst.tenant_phone !== ''
                // && _thisst.lease_term !== ''
            ) {
                res.append('id', this.state.data_main[this.state.inx].id)
                http('/owner/owner_update', {
                    method: 'POST',
                    data: res,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    message.success(res.msg);
                    this.clearInputValue()
                    http('/floor/floor_list_info', {
                        method: 'get',
                        data: {
                            foller: this.state.number,
                            unit: this.state.unit
                        }
                    }).then(res => {
                        this.setState({
                            data_main: res.data
                        })
                    }).catch(res => {
                        this.setState({
                            data_main: []
                        })
                        message.error(res.msg);
                    })
                }).catch(res => {
                    message.error(res.msg);
                    this.clearInputValue()
                })
            } else {
                message.error('输入不能为空，请检查！');
            }
        })
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
                        just_idk: file
                    })
                    console.log(this.state.just_idk)
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
    clearInputValue = () => {
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
            show_model: false
        })
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
    returnStatus = () => {
        if (this.state.status === 1) { return '自住' }
        if (this.state.status === 2) { return '闲置' }
        if (this.state.status === 3) { return '装修' }
        if (this.state.status === 4) { return '出租' }
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
                    <Col span={24} className='floor-mag-row'>
                        <Col span={2} className='floor-mag-headlftp'>单元/楼号</Col>
                        <Col span={22} style={{ display: 'flex' }}>

                            {
                                this.state.data_row.map((item, inx) => {
                                    return (
                                        <Col span={2} className={item.act_sle ? 'floor-mag-headlftpit floor-mag-actitem' : 'floor-mag-headlftpit'} onClick={(e) => this.clickRowItem(inx, e)} key={item.id}>
                                            {item.comment}栋</Col>
                                    )
                                })
                            }
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={2} className='floor-mag-headlf'>
                            {
                                this.state.data_cow.map((item, inx) => {
                                    return (
                                        <Col span={24} className={item.act_sle ? 'floor-mag-headlfitm floor-mag-actitem' : 'floor-mag-headlfitm'} onClick={(e) => this.clickCowItem(inx, e)} key={item.id}>{item.unit}单元</Col>
                                    )
                                })
                            }
                        </Col>
                        <Col span={22}>
                            {
                                this.state.data_main.map((item, inx) => {
                                    let status = ''
                                    let color = ''
                                    if (item.status === '1') { status = '自住'; color = '#ffff66' }
                                    if (item.status === '2') { status = '闲置'; color = '#3399ff' }
                                    if (item.status === '3') { status = '装修'; color = '#ff3333' }
                                    if (item.status === '4') { status = '出租'; color = '#ff9933' }
                                    return (
                                        <Col span={2} className='floor-mag-ctitem' key={item.id} style={{ background: color }} onClick={(e) => this.clickItem(inx, e)}>
                                            <Col span={24} className='floor-mag-ct0'>{item.house_number}</Col>
                                            <Col span={24} className='floor-mag-ct1'>({status})</Col>
                                        </Col>)
                                })
                            }
                        </Col>
                    </Col>
                </Col>
                <Col span={24}>
                    <Modal title={this.state.mod_title} visible={this.state.show_model} onOk={this.handleOk} className='floor-mag-mod' okText='保存'
                        onCancel={this.deleCurItem}
                    >
                        {
                            this.state.is_change && <Row>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>业主姓名：</Col>
                                        <Col span={18}>
                                            <Input placeholder="请输入业主姓名" value={this.state.owner_name} onChange={(e) => this.inputValue('owner_name', e)} />
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>业主电话：</Col>
                                        <Col span={18}><Input placeholder="请输入业主电话" maxLength={11} value={this.state.owner_phone} onChange={(e) => this.inputValue('owner_phone', e)} /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>门牌号：</Col>
                                        <Col span={18}>
                                            {this.state.house_number}
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>产权号：</Col>
                                        <Col span={18}><Input placeholder="请输入产权号" value={this.state.title_number} onChange={(e) => this.inputValue('title_number', e)} /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋面积：</Col>
                                        <Col span={18}>
                                            <Input placeholder="请输入房屋面积" value={this.state.area} onChange={(e) => this.inputValue('area', e)} />
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>居住人数：</Col>
                                        <Col span={18}><Input placeholder="请输入居住人数" value={this.state.number_residents} onChange={(e) => this.inputValue('number_residents', e)} /></Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋状态：</Col>
                                        <Col span={18}>
                                            <Select style={{ width: '100%' }} placeholder="请选择房屋状态" allowClear={true} value={this.state.status} onChange={this.seleState}>
                                                <Option value={1}>自住</Option>
                                                <Option value={2}>闲置</Option>
                                                <Option value={3}>装修</Option>
                                                <Option value={4}>出租</Option>
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
                                            {this.state.owner_name}
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>业主电话：</Col>
                                        <Col span={18}>
                                            {this.state.owner_phone}</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>门牌号：</Col>
                                        <Col span={18}>
                                            {this.state.house_number}
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>产权号：</Col>
                                        <Col span={18}>{this.state.title_number}</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋面积：</Col>
                                        <Col span={18}>
                                            {this.state.area}
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>居住人数：</Col>
                                        <Col span={18}>{this.state.number_residents}</Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    <Col span={11}>
                                        <Col span={6}>房屋状态：</Col>
                                        <Col span={18}>
                                            {this.returnStatus()}
                                        </Col>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Col span={6}>缴费状态：</Col>
                                        <Col span={18}>
                                            未交费
                                        </Col>
                                    </Col>
                                </Col>
                                {this.state.tenant_state === true && (
                                    <Col span={24}>
                                        <Col span={8}>
                                            <Col span={5}></Col>
                                            <Col span={19} className="add-up">
                                                {this.state.image_url[0] ? <img src={this.state.image_url[0]} alt="avatar" className="add-up-show" /> : uploadButton(true)}

                                            </Col>
                                        </Col>
                                        <Col span={8} >
                                            <Col span={5}></Col>
                                            <Col span={19} className="add-up">
                                                {this.state.image_url[1] ? <img src={this.state.image_url[1]} alt="avatar" className="add-up-show" /> : uploadButton(false)}

                                            </Col>
                                        </Col>
                                    </Col>)}
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
