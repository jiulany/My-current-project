import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select, Upload, message, Icon, Button, Radio } from 'antd';
import './ParksManage.css'
import http  from '../../api/http';
const { Option } = Select;
//css样式在home.css
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class ParksManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_model: false,
            tenant_state: false,
            loading: false,
            image_url: [],
            is_change: false,
            data: [],
            park: [],
            is_xianzh_no:true
        }
    }
    componentDidMount() {
        setTimeout(() => {
            http('/park/park_floor', { method: 'get', data: {} }).then(res => {
                let a = []
                for (let i in res.data) {
                    let b = res.data[i]
                    if (parseInt(i) === 0) {
                        b.act = true
                    } else {
                        b.act = false
                    }
                    a.push(b)
                }
                this.setState({
                    data: a,
                    cur_tab_inx: 0
                })
                if (a[0].park) {
                    this.setState({
                        park: a[0].park
                    })
                }
                http('/park/park_region', { method: 'get', data: { floor_id: a[0].id } }).then(res => {
                    let b = res.data
                    for (let i in b) {
                        if (parseInt(i) === 0) {
                            b[i].act = true
                        } else {
                            b[i].act = false
                        }
                    }
                    this.setState({
                        sider_list: b,
                    })
                    http('/park', { method: 'get', data: { floor_id: a[0].id, park_region: b[0].park_region } }).then(res => {
                        console.log(res)
                        this.setState({
                            park: res.data,
                            cur_tab_inx:0,
                            cur_sid_inx:0
                        })
                    }).catch(res => {
                    })
                }).catch(res => {
                })
            }).catch(res => {
                console.log(res)
            })
        }, 1000)
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
            is_change: true,
            tenant_state:true
        })
    }
    seleParkStatus = (e) => {
        if (e === 2) {
            this.setState({
                tenant_state: true,
                park_status: e,
                cur_status: e,
                is_xianzh_no:true,
                is_xianzh_y:true
            })
        }else if(e===1||e===4){
            this.setState({
                tenant_state: false,
                park_status: e,
                cur_status: e,
                is_xianzh_no:true,
                is_xianzh_y:false,
                is_lease:1
            })
        }else if(e===3){
            this.setState({
                tenant_state: false,
                park_status: e,
                cur_status: e,
                is_xianzh_no:true,
                is_xianzh_y:true
            })
        } else {
        }

    }
    clickTabHead = (i, e) => {
        let a = this.state.data
        for (let j in this.state.data) {
            a[j].act = false
        }
        a[i].act = true
        http('/park/park_region', { method: 'get', data: { floor_id: a[i].id } }).then(res => {
            let b = res.data
            for (let i in b) {
                if (parseInt(i) === 0) {
                    b[i].act = true
                } else {
                    b[i].act = false
                }
            }
            this.setState({
                sider_list: b,
                park: [],
                cur_tab_inx: i
            })
            http('/park', { method: 'get', data: { floor_id: a[i].id, park_region: b[0].park_region } }).then(res => {
                console.log(res)
                this.setState({
                    park: res.data
                })
            }).catch(res => {
                this.setState({
                    park: []
                })
            })
        }).catch(res => {
        })
    }
    clickSider = (i, e) => {
        let a = this.state.sider_list
        for (let j in this.state.sider_list) {
            a[j].act = false
        }
        a[i].act = true
        this.setState({
            cur_sid_inx:i
        })
        http('/park', { method: 'get', data: { floor_id: this.state.data[this.state.cur_tab_inx].id, park_region: this.state.sider_list[i].park_region } }).then(res => {
            this.setState({
                park: res.data,
                sider_list: a
            })
        }).catch(res => {
            this.setState({
                park: []
            })
        })
    }
    clickTabItem = (i, e) => {
        http('/park/find', { method: 'get', data: { id: this.state.park[i].id } }).then(res => {
            if (res.data.park_status === 1||res.data.park_status===4) {//闲置人防状态
                if(res.data.is_lease===0){
                    this.setState({
                        is_change: true,
                        cur_status: res.data.park_status,
                        is_xianzh_no:false
                    })
                }
                if(res.data.is_lease===1){
                    this.setState({
                        is_change: true,
                        cur_status: res.data.park_status,
                        is_xianzh_no:true,
                        is_xianzh_y:false
                    })
                }
            }
            if (res.data.park_status === 3) {//自用状态
                this.setState({
                    is_change: false,
                    cur_status: res.data.park_status,
                    is_xianzh_no:true,
                    is_xianzh_y:true
                })
            }
            if (res.data.park_status ===2) {//出租状态
                this.setState({
                    is_change: false,
                    cur_status: res.data.park_status,
                    is_xianzh_no:true,
                    is_xianzh_y:true
                })
            }
            let image_url=[]
            image_url[0]=res.data.just_idk
            image_url[1]=res.data.back_idk
            this.setState({
                cur_click_park: i,
                show_model: true,
                model_tt:this.state.data[this.state.cur_tab_inx].park_floor+' '+this.state.sider_list[this.state.cur_sid_inx].park_region+'区'+res.data.park_name,
                owner_name: res.data.owner_name,
                owner_phone: res.data.owner_phone,
                house_number: res.data.house_number,
                tenant_name: res.data.tenant_name,
                tenant_mobile: res.data.tenant_mobile,
                car_number: res.data.car_number,
                park_status: res.data.park_status,
                tenant_house_number: res.data.tenant_house_number,
                park_period: res.data.park_period,
                is_lease: res.data.is_lease,
                image_url:image_url
            })
        }).catch(res => {
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
        if (p === 'house_number') {
            this.setState({
                house_number: e.currentTarget.value
            })
        }
        if (p === 'tenant_name') {
            this.setState({
                tenant_name: e.currentTarget.value
            })
        }
        if (p === 'tenant_mobile') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                tenant_mobile: re
            })
        }
        if (p === 'car_number') {
            this.setState({
                car_number: e.currentTarget.value
            })
        }
        if (p === 'tenant_house_number') {
            this.setState({
                tenant_house_number: e.currentTarget.value
            })
        }
        if (p === 'park_period') {
            this.setState({
                park_period: e.currentTarget.value
            })
        }
    }
    pushFormData = () => {
        return new Promise((resolve, reject) => {
            let _thisst = this.state
            var formData = new FormData()
            formData.append("id",_thisst.park[_thisst.cur_click_park].id)
            formData.append("owner_name", _thisst.owner_name)
            formData.append("owner_phone", _thisst.owner_phone)
            formData.append("house_number", _thisst.house_number)
            formData.append("tenant_name", _thisst.tenant_name)
            formData.append("tenant_mobile", _thisst.tenant_mobile)
            formData.append("car_number", _thisst.car_number)
            formData.append("park_status", _thisst.park_status)
            formData.append("tenant_house_number", _thisst.tenant_house_number)
            formData.append("park_period", _thisst.park_period)
            formData.append("is_lease", _thisst.is_lease)
            if (_thisst.just_idk) {
                formData.append('just_idk', _thisst.just_idk)
            } else {
                formData.append('img_urlz', '')
            }
            if (_thisst.back_idk) {
                formData.append('back_idk', _thisst.back_idk)
            } else {
                formData.append('img_urlf', '')
            }
            // formData.append('just_idk', _thisst.just_idk)
            // formData.append('back_idk', _thisst.back_idk)
            resolve(formData)
        })
    }
    handleUpload = () => {
        this.pushFormData().then(res=>{
            http('/park/park_save', {
                data: res,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                method: 'POST'
            }).then(res => {
                let secondsToGo = 3;
                const modal = Modal.success({
                    title: '保存成功',
                    content: `您已经成功保存编号${this.state.park[this.state.cur_click_park].park_number}车位信息`,
                });
                const timer = setInterval(() => {
                    secondsToGo -= 1;
                }, 1000);
                setTimeout(() => {
                    http('/park', { method: 'get', data: { floor_id: this.state.data[this.state.cur_tab_inx].id, park_region: this.state.sider_list[this.state.cur_sid_inx].park_region } }).then(res => {
                        this.setState({
                            park: res.data,
                        })
                    }).catch(res => {
                        this.setState({
                            park: []
                        })
                    })
                    clearInterval(timer);
                    modal.destroy();
                    this.setState({
                        show_model: false,
                    })
                }, secondsToGo * 1000);
            }).catch(res => {
            })
        })
        
    }
    changeChuzu = (e) => {
        if(this.state.cur_status===1||this.state.cur_status===4){
            if(e.target.value===1){
                this.setState({
                    is_lease: e.target.value,
                    is_xianzh_no:true,
                    is_xianzh_y:false
                })
            }else{
                this.setState({
                    is_lease: e.target.value,
                    is_xianzh_no:false,
                    is_xianzh_y:false
                })
            }
        }
    }
    render() {
        const uploadButton = (pan) => (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{pan ? "国徽面" : "头像面"}</div>
            </div>
        );
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='park-mag'>
                <Col span={24}>
                    <div className='park-mag-tab'>
                        <div className='park-mag-tab-hd'>
                            {
                                this.state.data.map((item, inx) => {
                                    return (
                                        <div onClick={(e) => this.clickTabHead(inx, e)} className={item.act ? 'park-mag-tab-hd-it park-mag-tab-hd-it-act' : 'park-mag-tab-hd-it'} key={item.park_floor}>{item.park_floor}</div>
                                    )
                                })
                            }
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ width: '8%', display: 'inline-block' }}>
                                {this.state.sider_list && this.state.sider_list.map((item, inx) => {
                                    return (

                                        <div onClick={(e) => this.clickSider(inx, e)} className={item.act ? 'park-mag-tab-sb-it-act' : 'park-mag-tab-sb-it'} key={item.park_region}>
                                            {item.park_region}
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className='park-mag-tab-cot' style={{ width: '92%', display: 'inline-block' }}>
                                <Col span={24}>
                                    {
                                        this.state.park.map((item, inx) => {
                                            let color = ''
                                            let park_status_d = ''
                                            let lease = ''
                                            if (item.park_status === 1) { color = '#3399ff'; park_status_d = '闲置' }
                                            if (item.park_status === 2) { color = '#ff9933'; park_status_d = '租用' }
                                            if (item.park_status === 3) { color = '#ffff66'; park_status_d = '自用' }
                                            if (item.park_status === 4) { color = '#fe4747'; park_status_d = '人防' }
                                            if (item.is_lease === 1) { lease = ',出租中' }
                                            return (
                                                <Col span={2} className='park-mag-tab-item' key={item.id} style={{ background: color }} onClick={(e) => this.clickTabItem(inx, e)}>
                                                    <Col span={24} className='park-mag-tab-row'>{item.park_name}</Col>
                                                    <Col span={24} className='park-mag-tab-row'>({park_status_d}{lease})</Col>
                                                </Col>
                                            )
                                        })
                                    }
                                </Col>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Modal title={this.state.model_tt} visible={this.state.show_model} onOk={this.handleOk} className='park-mag-mod' okText='保存'
                        onCancel={this.deleCurItem}
                    >
                        {
                            this.state.is_change && <Row>
                                {
                                    this.state.is_xianzh_no&&this.state.is_xianzh_y&& (
                                        <div style={{ width: '100%' }}>
                                            <Col span={24} className='park-mag-fenltt' >业主信息</Col>
                                            <Col span={24} className='park-mag-fenl'>
                                                <Col span={24} className='park-mag-itm'>
                                                    <Col span={11}>
                                                        <Col span={6}>业主姓名：</Col>
                                                        <Col span={18}>
                                                            <Input placeholder="请输入业主姓名" value={this.state.owner_name} onChange={(e) => this.inputValue('owner_name', e)} />
                                                        </Col>
                                                    </Col>
                                                    <Col span={11} offset={2}>
                                                        <Col span={6}>业主电话：</Col>
                                                        <Col span={18}><Input maxLength={11} placeholder="请输入业主电话" value={this.state.owner_phone} onChange={(e) => this.inputValue('owner_phone', e)} /></Col>
                                                    </Col>
                                                </Col>
                                                <Col span={24} className='park-mag-itm'>
                                                    <Col span={11}>
                                                        <Col span={6}>门牌号：</Col>
                                                        <Col span={18}>
                                                            <Input placeholder="请输入门牌号" value={this.state.house_number} onChange={(e) => this.inputValue('house_number', e)} />
                                                        </Col>
                                                    </Col>
                                                    <Col span={11} offset={2}>

                                                    </Col>
                                                </Col>
                                            </Col>
                                            <Col span={24} className='park-mag-fenltt' >
                                                {this.state.park_status===3?'车位信息':'租客信息'}
                                            </Col>
                                        </div>
                                    )
                                }
                                <Col span={24} className='park-mag-fenl'>
                                    {
                                        this.state.is_xianzh_no && (
                                            <div style={{ width: '100%' }}>
                                                <Col span={24} className='park-mag-itm'>
                                                    <Col span={11}>
                                                        <Col span={6}>车主姓名：</Col>
                                                        <Col span={18}>
                                                            <Input placeholder="请输入姓名" value={this.state.tenant_name} onChange={(e) => this.inputValue('tenant_name', e)} />
                                                        </Col>
                                                    </Col>
                                                    <Col span={11} offset={2}>
                                                        <Col span={6}>车主电话：</Col>
                                                        <Col span={18}><Input maxLength={11} placeholder="请输入电话" value={this.state.tenant_mobile} onChange={(e) => this.inputValue('tenant_mobile', e)} /></Col>
                                                    </Col>
                                                </Col>

                                            </div>
                                        )
                                    }
                                    <Col span={24} className='park-mag-itm'>
                                    {
                                        this.state.is_xianzh_no && (
                                        <Col span={11}>
                                            <Col span={6}>车牌号码：</Col>
                                            <Col span={18}>
                                                <Input maxLength={8} placeholder="请输入车牌号码" value={this.state.car_number} onChange={(e) => this.inputValue('car_number', e)} />
                                            </Col>
                                        </Col>
                                        )
                                    }
                                        <Col span={11} offset={2}>
                                            <Col span={6}>车位状态：</Col>
                                            <Col span={18}>
                                                <Select style={{ width: '100%' }} placeholder="请选择车位状态" value={this.state.park_status} onChange={this.seleParkStatus} allowClear={true}>
                                                    <Option value={1}>闲置</Option>
                                                    <Option value={2}>出租</Option>
                                                    <Option value={3}>自用</Option>
                                                    <Option value={4}>人防</Option>
                                                </Select>
                                            </Col>
                                        </Col>
                                    </Col>
                                    {
                                        this.state.cur_status === 1 || this.state.cur_status === 4 ? (
                                            <Col span={24} className='park-mag-itm'>
                                                {
                                                    this.state.is_xianzh_no && (
                                                        <Col span={11}>
                                                        </Col>
                                                    )
                                                }
                                                <Col span={11} offset={2}>
                                                    <Col span={6}>是否出租：</Col>
                                                    <Col span={18}>
                                                        <Radio.Group onChange={this.changeChuzu} style={{ width: '100%' }} value={this.state.is_lease}>
                                                            <Col span={12}><Radio style={radioStyle} value={1}>是</Radio></Col>
                                                            <Col span={12}><Radio style={radioStyle} value={0}>否</Radio></Col>
                                                        </Radio.Group>
                                                    </Col>
                                                </Col>
                                            </Col>
                                        ) : ('')
                                    }
                                    {
                                        this.state.is_xianzh_no && (
                                            <div style={{ width: '100%' }}>
                                                <Col span={24} className='park-mag-itm'>
                                                    <Col span={11}>
                                                        <Col span={6}>门牌号：</Col>
                                                        <Col span={18}>
                                                            <Input placeholder="请输入门牌号" value={this.state.tenant_house_number} onChange={(e) => this.inputValue('tenant_house_number', e)} />
                                                        </Col>
                                                    </Col>
                                                    <Col span={11} offset={2}>
                                                        <Col span={6}>车位租期：</Col>
                                                        <Col span={18}>
                                                            <Input placeholder="请输入租期" value={this.state.park_period} onChange={(e) => this.inputValue('park_period', e)} />
                                                        </Col>
                                                    </Col>
                                                </Col>
                                                {this.state.tenant_state === true&&this.state.cur_status !== 3 && (
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
                                            </div>)}
                                </Col>
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
                                <Col span={24} className='park-mag-fenltt'>业主信息</Col>
                                <Col span={24} className='park-mag-fenl'>
                                    <Col span={24} className='park-mag-itm'>
                                        <Col span={7}>
                                            <Col span={10}>业主姓名：</Col>
                                            <Col span={14}>
                                                {this.state.owner_name}
                                            </Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>业主电话：</Col>
                                            <Col span={14}>{this.state.owner_phone}</Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>门牌号：</Col>
                                            <Col span={14}>
                                                {this.state.house_number}
                                            </Col>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='park-mag-fenltt'>车位信息</Col>
                                <Col span={24} className='park-mag-fenl'>
                                    <Col span={24} className='park-mag-itm'>
                                        <Col span={7}>
                                            <Col span={10}>车主姓名：</Col>
                                            <Col span={14}>
                                                {this.state.tenant_name}
                                            </Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>车主电话：</Col>
                                            <Col span={14}>{this.state.tenant_mobile}</Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>车牌牌号：</Col>
                                            <Col span={14}>
                                                {this.state.car_number}
                                            </Col>
                                        </Col>
                                    </Col>
                                    <Col span={24} className='park-mag-itm'>
                                        <Col span={7} >
                                            <Col span={10}>车位状态：</Col>
                                            <Col span={14}>
                                                {this.state.park_status === 1 && '闲置'}
                                                {this.state.park_status === 2 && '出租'}
                                                {this.state.park_status === 3 && '自用'}
                                                {this.state.park_status === 4 && '人防'}
                                            </Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>车主门牌号：</Col>
                                            <Col span={14}>
                                                {this.state.tenant_house_number}
                                            </Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>车位租期：</Col>
                                            <Col span={14}>
                                                {this.state.park_period}
                                            </Col>
                                        </Col>
                                    </Col>
                                    {
                                        this.state.cur_status !== 3 && this.state.cur_status !== 4 && (
                                            <Col span={24} className='park-mag-itm_inp'>
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
                                        )
                                    }
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

export default ParksManage;
