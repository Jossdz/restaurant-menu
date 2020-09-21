import React, { useContext } from "react"
import { Form, Input, Button, Divider, Row, Col } from "antd"
import { login } from "../services"
import { MyContext } from "../context"

let baseURL

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:3000")

const Login = ({ history }) => {
  const [form] = Form.useForm()
  const { setCtxUser } = useContext(MyContext)

  async function loginProcess(values) {
    const {
      data: { user }
    } = await login(values)
    delete user.password
    delete user.hash
    delete user.salt
    setCtxUser(user)
    // history.push("/login")
  }
  return (
    <div>
      <Form layout='vertical' name='basic' form={form} onFinish={loginProcess}>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider>Or</Divider>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Button type='primary' block>
            <a href={`${baseURL}/auth/facebook`}>Login with Facebook</a>
          </Button>
        </Col>
        <Col span={12}>
          <Button danger type='primary' block>
            <a href={`${baseURL}/auth/google`}>Login with Google</a>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Login
