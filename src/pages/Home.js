import React, { useEffect, useState } from "react"
import { getAllRestaurants } from "../services/restaurants"
import { Card, Avatar, Skeleton, Row, Col, Typography } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
const { Meta } = Card
const { Title } = Typography
function Home() {
  const [restaurants, setRestaurants] = useState(null)

  useEffect(() => {
    async function fetchRestaurants() {
      const {
        data: { restaurants }
      } = await getAllRestaurants()
      setRestaurants(restaurants)
    }
    fetchRestaurants()
  }, [])

  return restaurants ? (
    <>
      <Title level={1}>Restaurants</Title>
      <Row gutter={[16, 16]}>
        {restaurants?.map(restaurant => (
          <Col sm={24} md={12} lg={8}>
            <Card
              actions={[
                <Link to={`/restaurant/${restaurant._id}`}>
                  <PlusOutlined key='more' />
                </Link>
              ]}
            >
              <Skeleton loading={!restaurants} avatar active>
                <Meta
                  avatar={
                    <Avatar
                      src={restaurant.image}
                      style={{ width: "45px", height: "45px" }}
                    />
                  }
                  title={restaurant.name}
                  description={restaurant.description}
                />
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  ) : (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[<PlusOutlined key='more' />]}
    >
      <Skeleton loading={true} avatar active>
        <Meta
          avatar={
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          }
          title='Card title'
          description='This is the description'
        />
      </Skeleton>
    </Card>
  )
}

export default Home
