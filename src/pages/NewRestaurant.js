import React, { useState } from "react"
import { Button, Form, Input } from "antd"
import axios from "axios"
import { createRestaurant } from "../services/restaurants"

const NewRestaurant = ({ history }) => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState(null)

  async function sendRestaurant(values) {
    await createRestaurant({ ...values, image: imageUrl })
    history.push("/")
  }
  async function uploadPhoto({ target: { files } }) {
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "restaurants-app")

    const {
      data: { secure_url }
    } = await axios.post(
      "https://api.cloudinary.com/v1_1/joss/image/upload",
      data
    )
    setImageUrl(secure_url)
  }

  return (
    <Form layout='vertical' form={form} onFinish={sendRestaurant}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name='direction' label='Direction'>
        <Input />
      </Form.Item>
      <input type='file' onChange={uploadPhoto} />
      <Button type='primary' htmlType='submit' disabled={!imageUrl}>
        Create restaurant
      </Button>
    </Form>
  )
}

export default NewRestaurant
