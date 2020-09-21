import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LayoutApp from "./components/LayoutApp"
import {
  Home,
  NotFound,
  Signup,
  Login,
  Restaurant,
  NewRestaurant,
  Dish
} from "./pages"

const EditMenu = () => <h1>EditMenu</h1>
const Profile = () => <h1>Profile</h1>

const Router = () => (
  <BrowserRouter>
    <LayoutApp>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/editMenu/:restaurantId' component={EditMenu} />
        <Route exact path='/restaurant/new' component={NewRestaurant} />
        <Route exact path='/restaurant/:restaurantId' component={Restaurant} />
        <Route exact path='/dish/:dishId' component={Dish} />
        <Route component={NotFound} />
      </Switch>
    </LayoutApp>
  </BrowserRouter>
)

export default Router
