import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'

import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined,

} from '@ant-design/icons'

import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'

import Logo from '../Logo'

const SideNav = (props) => {
  const { collapsed, onCollapse } = props
  const { Sider } = Layout

  let currentPath = useLocation().pathname

  // dummy fix for side nav highlight
  if (currentPath.includes('/app/course/'))
    currentPath = currentPath.replace('/app/course/', '/app/courses/')

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <div
        style={{ cursor: 'pointer' }}
        // onClick={() => (window.location = 'https://gp-eduhub.github.io/')}
      >
        <Logo collapsed={collapsed} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        activeKey={currentPath}
        selectedKeys={currentPath}
      >
        <Menu.Item key="/app/dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/app/dashboard">Dashboard</NavLink>
        </Menu.Item>

        <Menu.Item key="/app/userlist" icon={<HddOutlined />}>
          <NavLink to="/app/userlist">Users </NavLink>
        </Menu.Item>

        <Menu.Item key="/app/riderlist" icon={<RiArticleLine />}>
          <NavLink to="/app/riderlist">Riders </NavLink>
        </Menu.Item>

        <Menu.Item key="/app/profile" icon={<UserOutlined />}>
          <NavLink to="/app/profile">Profile</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideNav
