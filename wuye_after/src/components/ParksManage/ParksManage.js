import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select, Upload, message, Icon, Button, Radio } from 'antd';
import './ParksManage.css'
import http from '../../api/http';
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
                            park: res.data
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
    seleParkStatus = (e) => {
        if (e === 2) {
            this.setState({
                tenant_state: true,
                park_status: e
            })
        } else {
            this.setState({
                tenant_state: false,
                park_status: e
            })
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
        http('/park/park_one', { method: 'POST', data: { id: this.state.park[i].id } }).then(res => {
            if (res.data[0].park_status === 1) {//闲置状态
                this.setState({
                    is_change: true,
                    cur_status: res.data[0].park_status
                })
            } else {
                this.setState({//非闲置状态
                    is_change: false,
                    cur_status: res.data[0].park_status
                })
            }
            this.setState({
                cur_click_park: i,
                show_model: true,
                owner_name: res.data[0].owner_name,
                owner_mobile: res.data[0].owner_mobile,
                owner_house_number: res.data[0].owner_house_number,
                tenant_name: res.data[0].tenant_name,
                tenant_mobile: res.data[0].tenant_mobile,
                car_number: res.data[0].car_number,
                park_status: res.data[0].park_status,
                tenant_house_number: res.data[0].tenant_house_number,
                park_period: res.data[0].park_period,
                is_lease:res.data[0].is_lease,
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
        if (p === 'owner_mobile') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                owner_mobile: re
            })
        }
        if (p === 'owner_house_number') {
            this.setState({
                owner_house_number: e.currentTarget.value
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
    handleUpload = () => {
        let _thisst = this.state
        console.log(_thisst.data, _thisst.cur_tab_index)
        http('/park/park_save', {
            method: 'POST', data: {
                id: _thisst.park[_thisst.cur_click_park].id,
                owner_name: _thisst.owner_name,
                owner_mobile: _thisst.owner_mobile,
                owner_house_number: _thisst.owner_house_number,
                tenant_name: _thisst.tenant_name,
                tenant_mobile: _thisst.tenant_mobile,
                car_number: _thisst.car_number,
                park_status: _thisst.park_status,
                tenant_house_number: _thisst.tenant_house_number,
                park_period: _thisst.park_period,
                is_lease:_thisst.is_lease,
            }
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
                http('/park/index_park_floor', { method: 'POST', data: { park_floor: _thisst.data[_thisst.cur_tab_index].park_floor } }).then(res => {
                    this.setState({
                        park: res.data,
                    })
                }).catch(res => {
                })
                clearInterval(timer);
                modal.destroy();
                this.setState({
                    show_model: false,
                })
            }, secondsToGo * 1000);
        }).catch(res => {
        })
    }
    changeChuzu = (e) => {
        this.setState({
            is_lease: e.target.value
        })
    }
    render() {
        const uploadButton = (pan) => (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{pan ? "租客身份证正面照" : "租客身份证反面照"}</div>
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
                                            let lease=''
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
                    <Modal title="一单元一号楼 负一楼 1-1-1" visible={this.state.show_model} onOk={this.handleOk} className='park-mag-mod' okText='保存'
                        onCancel={this.deleCurItem}
                    >
                        {
                            this.state.is_change && <Row>
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
                                            <Col span={18}><Input maxLength={11} placeholder="请输入业主电话" value={this.state.owner_mobile} onChange={(e) => this.inputValue('owner_mobile', e)} /></Col>
                                        </Col>
                                    </Col>
                                    <Col span={24} className='park-mag-itm'>
                                        <Col span={11}>
                                            <Col span={6}>门牌号：</Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入门牌号" value={this.state.owner_house_number} onChange={(e) => this.inputValue('owner_house_number', e)} />
                                            </Col>
                                        </Col>
                                        <Col span={11} offset={2}>

                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24} className='park-mag-fenltt' >租客信息</Col>
                                <Col span={24} className='park-mag-fenl'>
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
                                    <Col span={24} className='park-mag-itm'>
                                        <Col span={11}>
                                            <Col span={6}>车牌号码：</Col>
                                            <Col span={18}>
                                                <Input maxLength={8} placeholder="请输入车牌号码" value={this.state.car_number} onChange={(e) => this.inputValue('car_number', e)} />
                                            </Col>
                                        </Col>
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
                                        this.state.cur_status===1|| this.state.cur_status===4?(
                                            <Col span={24} className='park-mag-itm'>
                                                <Col span={11}>
                                                </Col>
                                                <Col span={11} offset={2}>
                                                    <Col span={6}>是否出租：</Col>
                                                    <Col span={18}>
                                                        <Radio.Group onChange={this.changeChuzu} style={{width:'100%'}} value={this.state.is_lease}>
                                                            <Col span={12}><Radio style={radioStyle} value={1}>是</Radio></Col>
                                                            <Col span={12}><Radio style={radioStyle} value={0}>否</Radio></Col>
                                                        </Radio.Group>
                                                    </Col>
                                                </Col>
                                            </Col>
                                        ):('')
                                    }
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
                                            <Col span={14}>{this.state.owner_mobile}</Col>
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <Col span={10}>门牌号：</Col>
                                            <Col span={14}>
                                                {this.state.owner_house_number}
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
                                        this.state.cur_status !== 3&&this.state.cur_status !== 4 && (
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
