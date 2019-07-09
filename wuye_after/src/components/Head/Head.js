import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Head.css'
class Head extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }
  componentDidMount() {
  }
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    return (
      <div>
        <Row>
          <Col span={3} className="head-logo">
            <img src={require('../../images/LOGO.png')} alt="" />
          </Col>
          <Col span={13}>2019年6月25日</Col>
          <Col span={8}>
            <Row>
              <Col span={10} className="head-status">
                <img className="head-icon" src={require('../../images/icon_hd_user.png')} alt="" />
                {"当前登录用户：万潇"}
              </Col>
              <Col span={1} className="head-status">
                <div className="head-division">
                </div>
              </Col>
              <Col span={8} className="head-status">
                <img className="head-icon" src={require('../../images/icon_hd_role.png')} alt="" />
                {"角色：管理员"}
              </Col>
              <Col span={1} className="head-status">
                <div className="head-division">
                </div>
              </Col>
              <Col span={4} className="head-status">
                <img className="head-icon" src={require('../../images/icon_hd_out.png')} alt="" />
                {"退出"}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Head;
