import React, { useState } from "react"
import { Form, Button, Input, InputNumber, Select } from "antd"
import axios from "axios"
import { createDish } from "../services/dish"

const { Option } = Select

const NewDish = ({ restaurantId, setnewDish }) => {
  const [form] = Form.useForm()
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState(null)

  function addIngredient(ingredient) {
    setIngredients([...ingredients, ingredient])
  }

  async function sendDish(values) {
    console.log(values)
    await createDish(restaurantId, { ...values, photo: image })
    setnewDish(true)
  }

  async function uploadPhoto({ target: { files } }) {
    const formdata = new FormData()
    formdata.append("file", files[0])
    formdata.append("upload_preset", "restaurants-app")
    const {
      data: { secure_url }
    } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formdata)
    setImage(secure_url)
  }

  return (
    <Form layout='vertical' form={form} onFinish={sendDish}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
      <Form.Item name='price' label='Price'>
        <InputNumber
          min={1}
          defaultValue={1}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <input type='file' onChange={uploadPhoto} />

      <Form.Item name='ingredients' label='Ingredients'>
        <Select
          mode='tags'
          style={{ width: "100%" }}
          placeholder='Ingredients'
          name='ingredients'
          onChange={addIngredient}
        >
          {ingredients.map((ingredient, i) => (
            <Option key={i} value={ingredient}>
              {ingredient}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='foodType' label='Food Type'>
        <Select
          style={{ width: "100%" }}
          placeholder='Food Type'
          name='foodType'
        >
          <Option value='DESSERT'>Dessert</Option>
          <Option value='VEGAN'>Vegan</Option>
          <Option value='GLUTENFREE'>Glutenfree</Option>
          <Option value='MEAT'>Meat</Option>
        </Select>
      </Form.Item>
      <Button type='primary' block htmlType='submit' disabled={!image}>
        Add dish
      </Button>
    </Form>
  )
}

export default NewDish
