import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select, Upload, message, Icon, Button, DatePicker } from 'antd';
import http from '../../api/http';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import store from '../../reducer/reducer'
import moment from 'moment';
import Cookies from 'js-cookie'
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
            image_url0:[],
            is_change: 1,
            data: [],
            data_row: [],
            data_cow: [],
            data_main: [],
            cur_communite: Cookies.get('community_id')
        }
        store.subscribe(() => {
            this.setState({
                cur_communite: store.getState().controlCommunity.value
            })
        })
    }
    componentWillUpdate(prop, state) {
        if (state.cur_communite !== this.state.cur_communite) {
            this.initialRender()
        }
    }
    componentDidMount() {
        this.initialRender()
    }
    initialRender = () => {
        setTimeout(() => {
            http('/floor/floor_list', {
                method: 'get',
                data: {
                }
            }).then(res => {
                let a = res.data
                http('/floor/floor_get_unit', {
                    method: 'get',
                    data: {
                        number: a[0].number
                    }
                }).then(res => {
                    let b = res.data
                    let data_row = []
                    let data_cow = []
                    for (let i in a) {
                        if (parseInt(i) === 0) {
                            data_row[i] = { id: i, number: a[i].number, act_sle: true }
                        } else {
                            data_row[i] = { id: i, number: a[i].number, act_sle: false }
                        }
                    }
                    for (let j in b) {
                        if (parseInt(j) === 0) {
                            data_cow[j] = { id: j, unit: b[j].unit, act_sle: true }
                        } else {
                            data_cow[j] = { id: j, unit: b[j].unit, act_sle: false }
                        }
                    }
                    this.setState({
                        data: res.data,
                        data_row: data_row,
                        data_cow: data_cow
                    })
                    http('/floor/floor_list_info', {
                        method: 'get',
                        data: {
                            foller: a[0].number,
                            unit: b[0].unit
                        }
                    }).then(res => {
                        this.setState({
                            data_main: res.data,
                            unit: b[0].unit,
                            number: a[0].number
                        })
                    }).catch(res => {
                        this.setState({
                            data_main: []
                        })
                        message.error(res.msg);
                    })
                }).catch(res => {

                })
            }).catch(res => {

            })
        }, 1000);
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
        http('/floor/floor_get_unit', {
            method: 'get',
            data: {
                number: row[inx].number
            }
        }).then(res => {
            let b = res.data
            let data_cow = []
            for (let j in b) {
                if (parseInt(j) === 0) {
                    data_cow[j] = { id: j, unit: b[j].unit, act_sle: true }
                } else {
                    data_cow[j] = { id: j, unit: b[j].unit, act_sle: false }
                }
            }
            this.setState({
                data: res.data,
                data_cow: data_cow
            })
            http('/floor/floor_list_info', {
                method: 'get',
                data: {
                    foller: row[inx].number,
                    unit: b[0].unit
                }
            }).then(res => {
                this.setState({
                    data_main: res.data,
                })
            }).catch(res => {
                this.setState({
                    data_main: []
                })
                message.error(res.msg);
            })
        }).catch(res => {

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
        let cur_click = this.state.data_main[inx]
        this.setState({
            mod_title: `${cur_click.floor_don}栋${cur_click.unit}单元${cur_click.house_number}`,
            is_change: 1,
        })
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
        let b=this.state.image_url0
        a[0] = cur_click.just_idk
        a[1] = cur_click.back_idk
        b[0]=cur_click.owner_just_idk
        b[1]=cur_click.owner_back_idk
        b[2]=cur_click.owner_title_image
        this.setState({
            just_idk:null,
            back_idk:null,
            owner_just_idk:null,
            owner_back_idk:null,
            owner_title_image:null,
            show_model: true,
            household_id: cur_click.id,
            door_number: cur_click.door_number,
            owner_name: cur_click.owner_name,
            owner_phone: cur_click.owner_phone,
            house_number: cur_click.house_number,
            status: parseInt(cur_click.status),
            owner_idk_number: cur_click.owner_idk_number,
            renter_name: cur_click.renter_name,
            tenant_phone: cur_click.tenant_phone,
            lease_term: cur_click.lease_term,
            title_number: cur_click.title_number,
            tenant_time: cur_click.tenant_time,
            show_tenant_time: cur_click.tenant_time == null ? null : moment(cur_click.tenant_time),
            image_url: a,
            image_url0:b,
            area: cur_click.area,
            number_residents: cur_click.number_residents,
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
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                owner_phone: re
            })
        }
        if (p === 'door_number') {
            this.setState({
                door_number: e.currentTarget.value
            })
        }
        if (p === 'title_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                title_number: re
            })
        }
        if (p === 'area') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                area: re
            })
        }
        if (p === 'owner_idk_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                owner_idk_number: re
            })
        }
        if (p === 'number_residents') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                number_residents: re
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
            formData.append('id', _thisst.door_number == null ? '' : _thisst.door_number)
            formData.append('owner_name', _thisst.owner_name == null ? '' : _thisst.owner_name)
            formData.append('owner_phone', _thisst.owner_phone == null ? '' : _thisst.owner_phone)
            formData.append('title_number', _thisst.title_number == null ? '' : _thisst.title_number)
            formData.append('number_residents', _thisst.number_residents == null ? '' : _thisst.number_residents)
            formData.append('status', _thisst.status)
            formData.append('area', _thisst.area == null ? '' : _thisst.area)
            formData.append('renter_name', _thisst.renter_name == null ? '' : _thisst.renter_name)
            formData.append('tenant_phone', _thisst.tenant_phone == null ? '' : _thisst.tenant_phone)
            formData.append('tenant_time', _thisst.tenant_time == null ? '' : _thisst.tenant_time)
            formData.append('lease_term', _thisst.lease_term == null ? '' : _thisst.lease_term)
            formData.append('owner_idk_number', _thisst.owner_idk_number == null ? '' : _thisst.owner_idk_number)
            //租客上传
            if (_thisst.just_idk||_thisst.just_idk!==null) {
                formData.append('just_idk', _thisst.just_idk)
            } else {
                formData.append('img_urlz', this.state.data_main[this.state.inx].just_idk)
            }
            if (_thisst.back_idk||_thisst.back_idk!==null) {
                formData.append('back_idk', _thisst.back_idk)
            } else {
                formData.append('img_urlf', this.state.data_main[this.state.inx].back_idk)
            }
            // 业主上传
            if (_thisst.owner_just_idk||_thisst.owner_just_idk!==null) {
                formData.append('owner_just_idk', _thisst.owner_just_idk)
            } else {
                // formData.append('img_urlz', this.state.data_main[this.state.inx].just_idk)
            }
            if (_thisst.owner_back_idk||_thisst.owner_back_idk!==null) {
                formData.append('owner_back_idk', _thisst.owner_back_idk)
            } else {
                // formData.append('img_urlz', this.state.data_main[this.state.inx].just_idk)
            }
            if (_thisst.owner_title_image||_thisst.owner_title_image!==null) {
                formData.append('owner_title_image', _thisst.owner_title_image)
            } else {
                // formData.append('img_urlz', this.state.data_main[this.state.inx].just_idk)
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
    uplZuKe=(file,val)=>{
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
                let a = this.state.image_url0
                if (val===0) {
                    a[0] = imageUrl
                    this.setState({
                        image_url0: a,
                        loading: false,
                        owner_just_idk: file
                    })
                } 
                if(val===1) {
                    a[1] = imageUrl
                    this.setState({
                        image_url0: a,
                        loading: false,
                        owner_back_idk: file
                    })
                }
                if(val===2) {
                    a[2] = imageUrl
                    this.setState({
                        image_url0: a,
                        loading: false,
                        owner_title_image: file
                    })
                }
            })
            return false
        }
    }
    // 业主的上传
    beforeUpload00=(file)=>{
        this.uplZuKe(file,0)
    }
    beforeUpload01=(file)=>{
        this.uplZuKe(file,1)
    }
    beforeUpload02=(file)=>{
        this.uplZuKe(file,2)
    }
    // 租客的上传
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
            is_change: 2
        })
    }
    seleState = (e) => {
        if (e === 4 || e === 3) {
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
    ruzhuTime = (e) => {
        this.setState({
            tenant_time: moment(e).format('YYYY-MM-DD'),
            show_tenant_time: e
        })
    }
    openHistory = () => {

        http('/owner/owner_payment', {
            method: 'get',
            data: {
                household_id: this.state.data_main[this.state.inx].id
            }
        }).then(res => {
            console.log(res)
            this.setState({
                pay_dt: res.data
            })
        }).catch(res => {
            message.error(res.msg);
        })
        this.setState({
            is_change: 3
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
            <Row className='floor-mag'>
                <Col span={24}>
                    <Col span={24} className='floor-mag-row'>
                        <Col span={2} className='floor-mag-headlftp'>单元/楼号</Col>
                        <Col span={22} style={{ display: 'flex' }}>

                            {
                                this.state.data_row.map((item, inx) => {
                                    return (
                                        <Col span={2} className={item.act_sle ? 'floor-mag-headlftpit floor-mag-actitem' : 'floor-mag-headlftpit'} onClick={(e) => this.clickRowItem(inx, e)} key={item.id}>
                                            {item.number}栋</Col>
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
                                    if (item.status === 1) { status = '自住'; color = '#ffff66' }
                                    if (item.status === 2) { status = '闲置'; color = '#3399ff' }
                                    if (item.status === 3) { status = '装修'; color = '#ff3333' }
                                    if (item.status === 4) { status = '出租'; color = '#ff9933' }
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
                            this.state.is_change === 2 && <Row>
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
                                    {this.state.tenant_state && (
                                        <Col span={11} offset={2}>
                                            <Col span={6}>身份证：</Col>
                                            <Col span={18}><Input placeholder="请输入身份证" value={this.state.owner_idk_number} onChange={(e) => this.inputValue('owner_idk_number', e)} /></Col>
                                        </Col>
                                    )}
                                    {this.state.tenant_state !== true && (
                                        <Col span={11} offset={2}>
                                            <Col span={6}>居住人数：</Col>
                                            <Col span={18}><Input placeholder="请输入居住人数" value={this.state.number_residents} onChange={(e) => this.inputValue('number_residents', e)} /></Col>
                                        </Col>
                                    )}
                                </Col>
                                <Col span={24} className='floor-mag-itm'>
                                    {this.state.tenant_state !== true && (
                                        <Col span={11}>
                                            <Col span={6}>身份证：</Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入身份证" value={this.state.owner_idk_number} onChange={(e) => this.inputValue('owner_idk_number', e)} />
                                            </Col>
                                        </Col>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <Col span={8}>
                                        <Col span={5}></Col>
                                        <Col span={19} className="add-up">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                showUploadList={false}
                                                beforeUpload={this.beforeUpload00}
                                            >
                                                {this.state.image_url0[0] ? <img src={this.state.image_url0[0]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
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
                                                beforeUpload={this.beforeUpload01}
                                            >
                                                {this.state.image_url0[1] ? <img src={this.state.image_url0[1]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
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
                                                beforeUpload={this.beforeUpload02}
                                            >
                                                {this.state.image_url0[2] ? <img src={this.state.image_url0[2]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
                                            </Upload>
                                        </Col>
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
                                            <Button onClick={this.openHistory} type='primary' style={{ color: 'rgba(0, 0, 0, 0.65)', height: "25px", width: "57px", fontSize: "12px" }}>查看</Button>
                                        </Col>
                                    </Col>
                                </Col>
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>租户姓名：</Col>
                                                <Col span={18}><Input placeholder="请输入租客姓名" value={this.state.renter_name} onChange={(e) => this.inputValue('renter_name', e)} /></Col>
                                            </Col>
                                            <Col span={11} offset={2}>
                                                <Col span={6}>租户电话：</Col>
                                                <Col span={18}><Input maxLength={11} placeholder="请输入租客电话" value={this.state.tenant_phone} onChange={(e) => this.inputValue('tenant_phone', e)} /></Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>居住人数：</Col>
                                                <Col span={18}><Input placeholder="请输入居住人数" value={this.state.number_residents} onChange={(e) => this.inputValue('number_residents', e)} /></Col>
                                            </Col>
                                            <Col span={11} offset={2}>
                                                <Col span={6}>入住时间：</Col>
                                                <Col span={18}><DatePicker style={{ width: '100%' }} value={this.state.show_tenant_time} locale={locale} onChange={this.ruzhuTime} placeholder="选择入住日期" /></Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>租期：</Col>
                                                <Col span={18}><Input placeholder="请输入租期" value={this.state.lease_term} onChange={(e) => this.inputValue('lease_term', e)} /></Col>
                                            </Col>
                                        </Col>
                                    )
                                }
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
                            this.state.is_change === 1 && <Row>
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
                                    {
                                        this.state.tenant_state && (
                                            <Col span={11} offset={2}>
                                                <Col span={6}>身份证：</Col>
                                                <Col span={18}>{this.state.owner_idk_number}</Col>
                                            </Col>
                                        )
                                    }
                                    {
                                        this.state.tenant_state !== true && (
                                            <Col span={11} offset={2}>
                                                <Col span={6}>居住人数：</Col>
                                                <Col span={18}>{this.state.number_residents}</Col>
                                            </Col>
                                        )
                                    }
                                </Col>
                                {
                                    this.state.tenant_state !== true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>身份证：</Col>
                                                <Col span={18}>
                                                    {this.state.owner_idk_number}
                                                </Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                <Col span={24}>
                                    <Col span={8}>
                                        <Col span={5}></Col>
                                        <Col span={19} className="add-up">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                showUploadList={false}
                                                disabled
                                            >
                                                {this.state.image_url0[0] ? <img src={this.state.image_url0[0]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
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
                                                disabled
                                            >
                                                {this.state.image_url0[1] ? <img src={this.state.image_url0[1]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
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
                                                disabled
                                            >
                                                {this.state.image_url0[2] ? <img src={this.state.image_url0[2]} alt="avatar" className="add-up-show" /> : uploadButton(true)}
                                            </Upload>
                                        </Col>
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
                                            <Button onClick={this.openHistory} type='primary' style={{ color: 'rgba(0, 0, 0, 0.65)', height: "25px", width: "57px", fontSize: "12px" }}>查看</Button>
                                        </Col>
                                    </Col>
                                </Col>
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>租户姓名：</Col>
                                                <Col span={18}>
                                                    {this.state.renter_name}
                                                </Col>
                                            </Col>
                                            <Col span={11} offset={2}>
                                                <Col span={6}>租客电话：</Col>
                                                <Col span={18}>
                                                    {this.state.tenant_phone}
                                                </Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>居住人数：</Col>
                                                <Col span={18}>
                                                    {this.state.number_residents}
                                                </Col>
                                            </Col>
                                            <Col span={11} offset={2}>
                                                <Col span={6}>入住时间：</Col>
                                                <Col span={18}>
                                                    {this.state.tenant_time}
                                                </Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                {
                                    this.state.tenant_state === true && (
                                        <Col span={24} className='floor-mag-itm'>
                                            <Col span={11}>
                                                <Col span={6}>租期：</Col>
                                                <Col span={18}>
                                                    {this.state.lease_term}
                                                </Col>
                                            </Col>
                                        </Col>
                                    )
                                }
                                {this.state.tenant_state === true && (
                                    <Col span={24}>
                                        <Col span={8}>
                                            <Col span={5}></Col>
                                            <Col span={19} className="add-up">
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    showUploadList={false}
                                                    disabled
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
                                                    disabled
                                                >
                                                    {this.state.image_url[1] ? <img src={this.state.image_url[1]} alt="avatar" className="add-up-show" /> : uploadButton(false)}
                                                </Upload>
                                            </Col>
                                        </Col>
                                    </Col>)}
                                <Col span={24} className="add-ctrl">
                                    <Col span={24} className="add-ctrl-it floor-mag-xiugai" onClick={this.modifyStat}><Button type="primary">修改</Button></Col>
                                </Col>
                            </Row>
                        }
                        {
                            this.state.is_change === 3 && (
                                <Row>
                                    <Col span={24}>
                                        <Col span={5} className='hist-it'><div className='hist-it-mc'></div>日期</Col>
                                        <Col span={7} className='hist-it'><div className='hist-it-mc'></div>缴费项</Col>
                                        <Col span={7} className='hist-it'><div className='hist-it-mc'></div>费用</Col>
                                        <Col span={5} className='hist-it'><div className='hist-it-mc'></div>状态</Col>
                                    </Col>
                                    <Col span={24} className='hist-item-ct'>
                                        {
                                            this.state.pay_dt && this.state.pay_dt.map((item, inx) => {
                                                let type = ""
                                                if (item.type === 1) { type = '水费' }
                                                if (item.type === 2) { type = '电费' }
                                                if (item.type === 3) { type = '气费' }
                                                if (item.type === 4) { type = '物业费' }
                                                if (item.type === 5) { type = '垃圾费' }
                                                if (item.type === 6) { type = '车费' }
                                                let status = ''
                                                if (item.status === 0) { status = '未交费' }
                                                if (item.status === 1) { status = '已缴费' }
                                                return (
                                                    <Col span={24} className='hist-item'>
                                                        <Col span={5}>{item.year + '-' + item.month}</Col>
                                                        <Col span={7}>{type}</Col>
                                                        <Col span={7}>{item.total_price}</Col>
                                                        <Col span={5}>{status}</Col>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            )
                        }
                    </Modal>
                </Col>
            </Row >
        )
    }
}

export default FloorManage;
