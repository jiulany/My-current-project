import React, { Component } from 'react';
import { Row, Col, Select} from 'antd';
import Cookies from 'js-cookie'
import store from '../../reducer/reducer'
import './Head.css'
const { Option } = Select;
class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: Cookies.get('name'),
      username: Cookies.get('username'),
      community_list:[{id:'', community_name: ""}],
      community_value:''
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(next){
    if(next.defaultValue!==this.state.community_value){
      this.setState({
        community_list:next.communityList,
        community_value:next.defaultValue
      })
    }
    if(next.communityList!==this.state.community_list){
      this.setState({
        community_list:next.communityList,
      })
    }
  }
  signOut = () => {
    this.props.signOut()
  }
  handleSelectChange=(e)=>{
    this.props.changeCommunite(e)  //
    store.dispatch({ type: "CHANGE_COMMUNITY", value: e })
    Cookies.set('community_id',e, { expires: 30 });
  }
  toIndex=()=>{
    this.props.toControl()
  }
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    return (
      <div>
        <Row>
          <Col span={3} className="head-logo">
            <img style={{cursor:'pointer'}} onClick={this.toIndex} src={require('../../images/LOGO.png')} alt="" />
          </Col>
          <Col span={13}>2019年6月25日
          <Select className='head-sle-xiaoq'
              placeholder='请选择小区'
              onChange={this.handleSelectChange}
              value={this.state.community_value}
            >
              {
                this.state.community_list&&this.state.community_list.map((item, inx) => {
                  return <Option key={item.id} value={item.id}>{item.community_name}</Option>
                })
              }
            </Select>
          </Col>
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
