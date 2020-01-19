import React, { Component } from 'react';
import { Row, Col, Button, message } from 'antd';
import http from '../../api/http';
import './AddParkFloor.css'

class AddParkFloor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_clck:true
        }
    }
    componentDidMount() {
        if(this.props.location.query.id_xiu==='true'){
            this.setState({
                park_floor:this.props.location.query.park_floor,
                id:this.props.location.query.update_id,
                show_xig:true
            })
        }
    }
    returnGo = () => {
        this.props.history.go(-1)
    }
    sumbit = () => {
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        http('/park/add_park_floor', {
            method: 'POST',
            data: {
                park_floor: this.state.park_floor
            }
        }).then(res => {
            this.setState({
                is_clck:true
            })
            message.success(res.msg);
            setTimeout(() => {
                this.props.history.go(-1)
            }, 2000)
        }).catch(res => {
            this.setState({
                is_clck:true
            })
            message.error(res.msg);
        })
    }
    }
    xiugai=()=>{
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        http('/park/save_park_floor', {
            method: 'POST',
            data: {
                park_floor: this.state.park_floor,
                id:this.state.id
            }
        }).then(res => {
            this.setState({
                is_clck:true
            })
            message.success(res.msg);
            setTimeout(() => {
                this.props.history.go(-1)
            }, 2000)
        }).catch(res => {
            this.setState({
                is_clck:true
            })
            message.error(res.msg);
        })
    }
    }
    inpParkFloor = (e) => {
        this.setState({
            park_floor: e.currentTarget.value
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="addparkflr">
                 {
                    this.state.show_xig===true?(
                        <Col span={24} className="addparkflr-tt">修改楼层</Col>
                    ):(
                        <Col span={24} className="addparkflr-tt">添加楼层</Col>
                    )
                }
                <Col span={24} className="addparkflr-inp">
                    <Col span={5} className="addparkflr-inp-box">
                        <input type='text' onInput={this.inpParkFloor} placeholder="请输入停车楼层名" value={this.state.park_floor} />
                    </Col>
                </Col>
                <Col span={24} className="addparkflr-ctr"><Button type="primary" onClick={this.returnGo}>取消</Button>
                {
                    this.state.show_xig===true?(
                        <Button type="primary" onClick={this.xiugai}>修改</Button>
                    ):(
                        <Button type="primary" onClick={this.sumbit}>提交</Button>
                    )
                }
                
                </Col>
            </Row>
        )
    }
}

export default AddParkFloor;
