import React, { Component } from 'react';
import { Menu } from 'antd';
import store from '../../reducer/reducer'
import './SiderBar.css'
const { SubMenu } = Menu;
const list = [
  { title: "业主管理", icon: require('../../images/icon_sider_owner.png'), path: '/index/ye_list' },
  { title: "楼面管理", icon: require('../../images/icon_sider_lou.png'), path: '/index/floor_manage' },
  { title: "车位管理", icon: require('../../images/icon_sider_che.png'), path: '/index/parking_manage' },
  { title: "报修管理", icon: require('../../images/icon_sider_xiu.png'), path: '/index/repair_manage' },
  { title: "小区公告", icon: require('../../images/icon_sider_gonggao.png'), path: '/index/notice_list' },
  {
    title: "缴费列表", icon: require('../../images/icon_sider_jifei.png'), list: [
      {
        title: "水费", path: "/index/water_list"
      },
      {
        title: "气费", path: "/index/gas_list"
      },
      {
        title: "电费", path: "/index/electricity_list"
      },
      {
        title: "物业费", path: "/index/property_list"
      },
      {
        title: "垃圾费", path: "/index/garbage_list"
      },
      {
        title: "停车费", path: "/index/stopcar_list"
      }
    ]
  },
  {
    title: "物业设置", icon: require('../../images/icon_sider_wuye.png'), list: [
      {
        title: "创建小区", path: "/index/quarters_list"
      },
      {
        title: "住户表", path: "/index/household_list"
      },
      {
        title: "商户表", path: "/index/merchant_list"
      },
      {
        title: "停车位", path: "/index/parking_list"
      }
    ]
  },
  { title: "充电管理", icon: require('../../images/icon_sider_gonggao.png'), path: '/index/charging_manage' },
  {
    title: "审核管理", icon: require('../../images/icon_sider_shenhe.png'), list: [
      {
        title: "小区审核", path: "/index/quarters_examine"
      },
      {
        title: "车位审核", path: "/index/park_examine"
      },
    ]
  },{
    title: "订单管理", icon: require('../../images/icon_sider_dingdan.png'), list: [
      {
        title: "商品订单", path: "/index/goods_order"
      },
      {
        title: "家政订单", path: "/index/housekeeping_order"
      },
      {
        title: "报修订单", path: "/index/repair_manage"
      }
    ]
  },
]
class SiderBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cur_inx: 0
    }
    store.subscribe(() => {
      this.setState({
        cur_inx: store.getState().controlSiderbar.cur_inx,
        cur_inx_1: store.getState().controlSiderbar.cur_inx_1
      })
    })
  }
  componentWillMount() {
    this.matchAddress()
  }
  componentWillUpdate(nextSprops) {
    if (nextSprops.location.pathname !== this.props.location.pathname) {//判断前后两路由是否不等，防止无限循环
      this.matchAddress()
    }
  }
  matchAddress() { //刷新页面时匹配path
    for (let i in list) {
      if (list[i].path) {
        if (this.props.history.location.pathname.search(list[i].path) !== -1) {
          store.dispatch({ type: "CHANGE_SIDERBAR", value: { cur_inx: i } })
        }
      } else {
        for (let j in list[i].list) {
          if (this.props.history.location.pathname.search(list[i].list[j].path) !== -1) {
            store.dispatch({ type: "CHANGE_SIDERBAR", value: { cur_inx: i, cur_inx_1: j } })
          }
        }
      }

    }
  }
  toTargetAddress = (item) => {
    sessionStorage.setItem('isFromInx','false')
    this.props.history.push({ pathname: item.path })
  }
  onOpenChange=(openKeys)=>{
    while(openKeys.length>1){
      openKeys.shift()
    }
  }
  render() {
    // 在父 route 中，被匹配的子 route 变成 props
    return (
      <div className="siderbar">
        <Menu
          mode="inline"
          selectedKeys={list[this.state.cur_inx].path ?
            [list[this.state.cur_inx].title] :
            [list[this.state.cur_inx].list[this.state.cur_inx_1].title]}
          defaultOpenKeys={[list[this.state.cur_inx].title]}
          style={{ height: '100%', borderRight: 0 }}
          onOpenChange={this.onOpenChange}
        >
          {
            list.map((item, index) => {
              if (list[index].path) {
                return (
                  <Menu.Item key={item.title} className="sider-item" onClick={() => this.toTargetAddress(item)}>
                    <img className="sider-icon" src={item.icon} alt="" />
                    {item.title}
                  </Menu.Item>
                )
              } else {
                return (
                  <SubMenu key={item.title} className="sider-item" title={
                    <div>
                      <img className="sider-icon" src={item.icon} alt="" />
                      {item.title}
                    </div>
                  }>
                    {
                      list[index].list.map((itm, inx) => {
                        return (
                          <Menu.Item key={itm.title} className="sider-item_1" onClick={() => this.toTargetAddress(itm)}>
                            {itm.title}
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }

            })
          }


        </Menu>
      </div>
    )
  }
}

export default SiderBar;
