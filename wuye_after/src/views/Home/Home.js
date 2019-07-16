import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from "react-router-dom"
import "./Home.css"
import store from '../../reducer/reducer'
import { matchPath } from '../../api/matchpath' //查询匹配地址的面包屑
import Cookies from 'js-cookie'

import Head from "../../components/Head/Head"
import SiderBar from "../../components/SiderBar/SiderBar"
import TableList from "../../components/TableList/TableList"
import AddOwner from "../../components/AddOwner/AddOwner"
import AddRepair from "../../components/AddRepair/AddRepair"
import AddPay0 from "../../components/AddPay0/AddPay0"
import AddPay1 from "../../components/AddPay1/AddPay1"
import AddNotice from "../../components/AddNotice/AddNotice"
import AddQuarters from "../../components/AddQuarters/AddQuarters"
import AddWuYe from "../../components/AddWuYe/AddWuYe"
import FloorManage from "../../components/FloorManage/FloorManage"
import ParksManage from "../../components/ParksManage/ParksManage"
import AddParkPlace from "../../components/AddParkPlace/AddParkPlace"
const { Header, Content, Sider } = Layout;
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cur_breadcrumb: "",
      change_path: ''
    }
    store.subscribe(() => {
      this.setState({
        cur_breadcrumb: store.getState().controlBreadcrumb.cur_breadcrumb
      })
    })
  }
  componentDidMount() {
    matchPath(this.props.location.pathname)
  }
  componentWillMount(){
    Cookies.set('user_id', 1, { expires: 30 });
    Cookies.set('community_id', 1, { expires: 30 });
  }
  componentWillUpdate(nextSprops) {
    if (nextSprops.location.pathname !== this.props.location.pathname) {//判断前后两路由是否不等，防止无限循环
      matchPath(nextSprops.location.pathname)
    }
  }
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    return (
      <Layout>
        <Header className="header">
          {/* 头 */}
          <Head />
        </Header>
        <Layout>
          {/* 侧边栏 */}
          <Sider width={200} style={{ background: '#fff' }}>
            <Route path="/" component={SiderBar} ></Route>
          </Sider>
          <Layout style={{ padding: '0 15px 15px' }}>
            <div className="home-breadcrumb">{this.state.cur_breadcrumb}</div>
            <Content style={{ background: '#fff', margin: 0, height: '860px' }}>
              {/* 业主 */}
              <Route exact path="/" component={TableList} ></Route>
              <Route path="/add_owner" component={AddOwner} ></Route>
              {/* 报修 */}
              <Route exact path="/repair_manage" component={TableList} ></Route>
              <Route path="/repair_manage/add_repair" component={AddRepair} ></Route>
              {/* 公告 */}
              <Route exact path="/notice_list" component={TableList} ></Route>
              <Route exact path="/notice_list/add_notice" component={AddNotice} ></Route>
              {/* 水费*/}
              <Route exact path="/water_list" component={TableList} ></Route>
              <Route path="/water_list/add_water" component={AddPay0} ></Route>
              {/* 气费*/}
              <Route exact path="/gas_list" component={TableList} ></Route>
              <Route path="/gas_list/add_gas" component={AddPay0} ></Route>
              {/* 用电*/}
              <Route exact path="/electricity_list" component={TableList} ></Route>
              <Route path="/electricity_list/add_electricity" component={AddPay0} ></Route>
              {/* 物业*/}
              <Route exact path="/property_list" component={TableList} ></Route>
              <Route path="/property_list/add_property" component={AddPay1} ></Route>
              {/* 垃圾*/}
              <Route exact path="/garbage_list" component={TableList} ></Route>
              <Route path="/garbage_list/add_garbage" component={AddPay1} ></Route>
              {/* 创建小区*/}
              <Route exact path="/quarters_list" component={TableList} ></Route>
              <Route path="/quarters_list/add_quarters" component={AddQuarters} ></Route>
              {/* 住户表*/}
              <Route exact path="/household_list" component={TableList} ></Route>
              <Route path="/household_list/add_household" component={AddWuYe} ></Route>
              {/* 商户表*/}
              <Route exact path="/merchant_list" component={TableList} ></Route>
              <Route path="/merchant_list/add_merchant" component={AddWuYe} ></Route>
              {/* 停车位*/}
              <Route exact path="/parking_list" component={TableList} ></Route>
              <Route path="/parking_list/add_parking" component={AddParkPlace} ></Route>
              {/* 楼面管理*/}
              <Route exact path="/floor_manage" component={FloorManage} ></Route>
              {/* 停车位管理*/}
              <Route exact path="/parking_manage" component={ParksManage} ></Route>
            </Content>
          </Layout>
        </Layout>
      </Layout>
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
