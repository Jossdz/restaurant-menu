import React from "react"
import ReactDOM from "react-dom"
import Router from "./Router"
import * as serviceWorker from "./serviceWorker"
import "antd/dist/antd.css"
import Provider from "./context"

ReactDOM.render(
  <Provider>
    <Router />
  </Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
