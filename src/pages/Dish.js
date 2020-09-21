import React, { useState, useEffect } from "react"
import { Row, Col, Image, Button, Typography, Skeleton, Tag } from "antd"
import { getOneDish } from "../services/dish"

const { Title } = Typography

const Dish = ({
  match: {
    params: { dishId }
  },
  history
}) => {
  const [dish, setDish] = useState(null)

  useEffect(() => {
    async function fetchDish() {
      const {
        data: { dish }
      } = await getOneDish(dishId)
      setDish(dish)
    }
    fetchDish()
  }, [dishId])

  return dish ? (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Image src={dish.photo} />
      </Col>
      <Col span={24}>
        <Title level={1}>{dish.name}</Title>
      </Col>
      <Col span={24}>
        <Title level={4}>Ingredients: </Title>
      </Col>
      {dish.ingredients.map((ingredient, i) => (
        <Col key={i} span={4}>
          <Tag color='cyan'>{ingredient}</Tag>
        </Col>
      ))}
      <br />
      <br />
      <Col span={24}>
        <Button block type='primary' onClick={() => history.goBack()}>
          Go back
        </Button>
      </Col>
    </Row>
  ) : (
    <div style={{ backgroundColor: "white", padding: "1rem" }}>
      <Skeleton active />
    </div>
  )
}

export default Dish
