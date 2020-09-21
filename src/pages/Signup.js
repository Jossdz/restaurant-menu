import React from "react"
import { Form, Input, Button } from "antd"
import { signup } from "../services"

const Signup = ({ history }) => {
  const [form] = Form.useForm()

  async function signupProcess(values) {
    await signup(values)
    history.push("/login")
  }
  return (
    <div>
      <Form layout='vertical' name='basic' form={form} onFinish={signupProcess}>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signup
