import React, { useState, useContext } from "react"
import { Layout, Menu } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  PlusSquareOutlined,
  LogoutOutlined,
  FormOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { logOut } from "../services"
import { MyContext } from "../context"

const { Header, Sider, Content } = Layout

function LayoutApp({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { clearCtxUser, user } = useContext(MyContext)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const logoutProcess = async () => {
    await logOut()
    clearCtxUser()
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu theme='dark' mode='inline'>
          <Menu.Item key='1' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          {!user && (
            <>
              <Menu.Item key='2' icon={<PlusSquareOutlined />}>
                <Link to='/signup'>Signup</Link>
              </Menu.Item>
              <Menu.Item key='3' icon={<LoginOutlined />}>
                <Link to='/login'>Login</Link>
              </Menu.Item>
            </>
          )}
          {user && (
            <Menu.Item key='4' icon={<FormOutlined />}>
              <Link to='/restaurant/new'>New Restaurant</Link>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item
              key='5'
              icon={<LogoutOutlined />}
              onClick={logoutProcess}
            >
              Logout
            </Menu.Item>
          )}
          {user && (
            <Menu.Item key='6' icon={<UserOutlined />}>
              <Link to='/profile'>{user.name}</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding: "0 1rem", backgroundColor: "white" }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutApp
