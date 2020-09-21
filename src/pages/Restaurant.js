import React, { useState, useEffect, useContext } from "react"
import {
  Image,
  Row,
  Col,
  Button,
  Modal,
  Skeleton,
  Typography,
  Card,
  Tag
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { getOneRestaurant } from "../services/restaurants"
import { MyContext } from "../context"
import NewDish from "../components/NewDish"
import { Link } from "react-router-dom"
const { Title, Text } = Typography

const { Meta } = Card

const Restaurant = ({
  match: {
    params: { restaurantId }
  }
}) => {
  const [restaurant, setRestaurant] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newDish, setnewDish] = useState(false)
  const { user } = useContext(MyContext)

  useEffect(() => {
    async function fetchRestaurant() {
      const {
        data: { restaurant }
      } = await getOneRestaurant(restaurantId)
      setRestaurant(restaurant)
    }
    fetchRestaurant()
    setShowModal(false)
  }, [newDish, restaurantId])

  return restaurant ? (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Image src={restaurant.image} style={{ width: "100%" }} />
      </Col>
      <Col span={24}>
        <Title level={1}>{restaurant.name}</Title>
      </Col>
      <Col span={24}>
        <Text type='secondary'>{restaurant.description}</Text>
      </Col>
      {user?._id === restaurant.owner && (
        <Col span={24}>
          <Button block onClick={() => setShowModal(true)}>
            Add Dish
          </Button>
        </Col>
      )}
      <Col span={24}>
        <Title level={3}>Menu:</Title>
      </Col>
      {restaurant.dishes.map(dish => (
        <Col key={dish._id} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <Link to={`/dish/${dish._id}`}>
                <PlusOutlined />
              </Link>
            ]}
            hoverable
            cover={
              <img
                alt='menu-item'
                src={dish.photo}
                height={150}
                style={{ objectFit: "cover" }}
              />
            }
          >
            <Meta
              title={dish.name}
              description={
                <>
                  <b>${dish.price}.00</b>
                  <br />
                  <p>Ingredients: </p>
                  <Row gutter={[10, 10]}>
                    {dish.ingredients.map((ingredient, i) => (
                      <Col span={12} key={`ingredient-${i}`}>
                        <Tag>{ingredient}</Tag>
                      </Col>
                    ))}
                  </Row>
                </>
              }
            />
          </Card>
        </Col>
      ))}
      <Modal
        title='Add a new dish'
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button type='dashed' danger onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        ]}
      >
        <NewDish restaurantId={restaurantId} setnewDish={setnewDish} />
      </Modal>
    </Row>
  ) : (
    <div style={{ backgroundColor: "white", padding: "1rem" }}>
      <Skeleton active />
    </div>
  )
}

export default Restaurant
