import React, { Component } from 'react';
import { Layout, Modal, message } from 'antd';
import { Route } from "react-router-dom"
import http from '../../api/http';
import "./Home.css"
import store from '../../reducer/reducer'
import { matchPath } from '../../api/matchpath' //查询匹配地址的面包屑
import Cookies from 'js-cookie'

import Login from "../Login/Login"
import Head from "../../components/Head/Head"
import SiderBar from "../../components/SiderBar/SiderBar"
import TableList from "../../components/TableList/TableList"
import AddOwner from "../../components/AddOwner/AddOwner"
import AddRepair from "../../components/AddRepair/AddRepair"
import AddPay0 from "../../components/AddPay0/AddPay0"
import AddPay1 from "../../components/AddPay1/AddPay1"
import AddParkStop from "../../components/AddParkStop/AddParkStop"
import AddNotice from "../../components/AddNotice/AddNotice"
import AddQuarters from "../../components/AddQuarters/AddQuarters"
import AddWuYe from "../../components/AddWuYe/AddWuYe"
import FloorManage from "../../components/FloorManage/FloorManage"
import ParksManage from "../../components/ParksManage/ParksManage"
import ChargingManage from "../../components/ChargingManage/ChargingManage"
import AddParkPlace from "../../components/AddParkPlace/AddParkPlace"
import AddParkFloor from "../../components/AddParkFloor/AddParkFloor"
import PayDetails from '../../components/PayDetails/PayDetails'
import PayDetailsCar from '../../components/PayDetails/PayDetailsCar'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cur_breadcrumb: "",
      change_path: '',
      switch_route: true,
      commit_change:null
    }
    store.subscribe(() => {
      if(store.getState().controlCommunity.value){
        if(store.getState().controlCommunity.value.is_change){
          this.setState({
            commit_change:true
          })
        }
      }
      this.setState({
        cur_breadcrumb: store.getState().controlBreadcrumb.cur_breadcrumb
      })
    })
  }
  componentDidMount() {
    matchPath(this.props.location.pathname)
  }
  componentWillMount() {
    // Cookies.set('community_id', '', { expires: 30 });
    http('/community', {
      method: 'get', data: {}
    }).then(res => {
      this.setState({
        community_list: res.data,
        defaultValue: res.data[0].id
      })
      Cookies.set('community_id', res.data[0].id, { expires: 30 })
    }).catch(res => {
      message.error(res.msg);
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 1000);
    })
    if (this.props.location.pathname === '/index/Login') {
      this.setState({
        switch_route: false
      })
    }
    if (Cookies.get('login') === 'false' || Cookies.get('login') === undefined) {
      this.props.history.push('/index/Login')
      this.setState({
        switch_route: false
      })
    } else {
      this.setState({
        switch_route: true
      })
    }
  }
  componentWillUpdate(nextSprops,nextState) {
    if (nextSprops.location.pathname !== this.props.location.pathname) {//判断前后两路由是否不等，防止无限循环
      matchPath(nextSprops.location.pathname)
      if (Cookies.get('login') === 'false' || Cookies.get('login') === undefined) {
        this.props.history.push('/index/Login')
        this.setState({
          switch_route: false
        })
      } else {
        this.setState({
          switch_route: true
        })
      }
    }
    if(nextState.commit_change!==this.state.commit_change&&nextState.commit_change===true){
      http('/community', {
        method: 'get', data: {}
      }).then(res => {
        this.setState({
          community_list: res.data,
          defaultValue: res.data[0].id,
          commit_change:false
        })
        Cookies.set('community_id', res.data[0].id, { expires: 30 })
      }).catch(res => {
        message.error(res.msg);
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 1000);
      })
    }
  }
  signOut = () => {
    let _this = this
    confirm({
      title: '',
      okText: '确认',
      cancelText: '取消',
      content: '确定要退出系统吗？',
      onOk() {
        Cookies.set('login', 'false', { expires: 30 });
        Cookies.set('account', '', { expires: 30 });
        Cookies.set('password', '', { expires: 30 });
        _this.props.history.push('/index/Login')
      },
      onCancel() {
      },
    });
  }
  changeCommunite = (e) => {
    this.setState({
      defaultValue: e
    })
  }
  toControl=()=>{
    this.props.history.push('/')
  }
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    return (
      <div style={{ height: '100%' }}>
        {this.state.switch_route &&
          <Layout>
            <Header name={11} className="header">
              {/* 头 */}
              <Head changeCommunite={this.changeCommunite} signOut={this.signOut} toControl={this.toControl} communityList={this.state.community_list} defaultValue={this.state.defaultValue} />
            </Header>
            <Layout>
              {/* 侧边栏 */}
              <Sider width={200} style={{ background: '#fff' }}>
                <Route path="/index" component={SiderBar} ></Route>
              </Sider>
              <Layout style={{ padding: '0 15px 15px' }}>
                <div className="home-breadcrumb">{this.state.cur_breadcrumb}</div>
                <Content className='home-main' style={{ background: '#fff', margin: 0, height: '860px', overflowY: 'scroll' }} id='s'>
                  {/* 业主 */}
                  <Route exact path="/index/ye_list" component={TableList} ></Route>
                  <Route path="/index/ye_list/add_owner" component={AddOwner} ></Route>
                  {/* 报修 */}
                  <Route exact path="/index/repair_manage" component={TableList} ></Route>
                  <Route path="/index/repair_manage/add_repair" component={AddRepair} ></Route>
                  {/* 公告 */}
                  <Route exact path="/index/notice_list" component={TableList} ></Route>
                  <Route exact path="/index/notice_list/add_notice" component={AddNotice} ></Route>
                  {/* 水费*/}
                  <Route exact path="/index/water_list" component={TableList} ></Route>
                  <Route path="/index/water_list/add_water" component={AddPay0} ></Route>
                  <Route path="/index/water_list/pay_details" component={PayDetails} ></Route>
                  {/* 气费*/}
                  <Route exact path="/index/gas_list" component={TableList} ></Route>
                  <Route path="/index/gas_list/add_gas" component={AddPay0} ></Route>
                  <Route path="/index/gas_list/pay_details" component={PayDetails} ></Route>
                  {/* 用电*/}
                  <Route exact path="/index/electricity_list" component={TableList} ></Route>
                  <Route path="/index/electricity_list/add_electricity" component={AddPay0} ></Route>
                  <Route path="/index/electricity_list/pay_details" component={PayDetails} ></Route>
                  {/* 物业*/}
                  <Route exact path="/index/property_list" component={TableList} ></Route>
                  <Route path="/index/property_list/add_property" component={AddPay1} ></Route>
                  <Route path="/index/property_list/pay_details" component={PayDetails} ></Route>
                  {/* 垃圾*/}
                  <Route exact path="/index/garbage_list" component={TableList} ></Route>
                  <Route path="/index/garbage_list/add_garbage" component={AddPay1} ></Route>
                  <Route path="/index/garbage_list/pay_details" component={PayDetails} ></Route>
                  {/* 停车费*/}
                  <Route exact path="/index/stopcar_list" component={TableList} ></Route>
                  <Route path="/index/stopcar_list/add_stopcar" component={AddParkStop} ></Route>
                  <Route path="/index/stopcar_list/pay_details" component={PayDetailsCar} ></Route>
                  {/* 创建小区*/}
                  <Route exact path="/index/quarters_list" component={TableList} ></Route>
                  <Route path="/index/quarters_list/add_quarters" component={AddQuarters} ></Route>
                  {/* 住户表*/}
                  <Route exact path="/index/household_list" component={TableList} ></Route>
                  <Route path="/index/household_list/add_household" component={AddWuYe} ></Route>
                  {/* 商户表*/}
                  <Route exact path="/index/merchant_list" component={TableList} ></Route>
                  <Route path="/index/merchant_list/add_merchant" component={AddWuYe} ></Route>
                  {/* 停车位*/}
                  <Route exact path="/index/parking_list" component={TableList} ></Route>
                  <Route path="/index/parking_list/add_parks" component={AddParkPlace} ></Route>
                  <Route path="/index/parking_list/add_park_floor" component={AddParkFloor} ></Route>
                  {/* 楼面管理*/}
                  <Route exact path="/index/floor_manage" component={FloorManage} ></Route>
                  {/* 停车位管理*/}
                  <Route exact path="/index/parking_manage" component={ParksManage} ></Route>
                  {/*充电管理管理*/}
                  <Route exact path="/index/charging_manage" component={ChargingManage} ></Route>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        }
        <Route path="/index/Login" component={Login} />
      </div>
    )
  }
}
// function mapStateToProps(state) {
//   return state
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     controlBreadcrumb (a) {
//       dispatch({
//         type: 'CHANGE_BREADCRUMB',
//         value: a
//       })
//     }
//   }
// }
export default Home;
