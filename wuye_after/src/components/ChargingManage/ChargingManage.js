import React, { Component } from 'react';
import { Row } from 'antd';
import './ChargingManage.css'
//css样式在home.css
class ChargingManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='chrg-mag'>
                <img  src={require('../../images/charg.png')} alt="" />
            </Row >
        )
    }
}

export default ChargingManage;
