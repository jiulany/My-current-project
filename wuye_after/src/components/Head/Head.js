import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Cookies from 'js-cookie'
import './Head.css'
class Head extends Component {
  constructor() {
    super()
    this.state = {
      name: Cookies.get('name'),
      username: Cookies.get('username')
    }
  }
  componentDidMount() {
  }
  signOut = () => {
    console.log(this.props)
 this.props.signOut()
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
                当前登录用户：{this.state.username}
              </Col>
              <Col span={1} className="head-status">
                <div className="head-division">
                </div>
              </Col>
              <Col span={8} className="head-status">
                <img className="head-icon" src={require('../../images/icon_hd_role.png')} alt="" />
                角色：{this.state.name}
              </Col>
              <Col span={1} className="head-status">
                <div className="head-division">
                </div>
              </Col>
              <Col span={4} className="head-status" style={{ cursor: 'pointer' }} onClick={this.signOut}>
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
