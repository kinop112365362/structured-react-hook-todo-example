import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'
import App from './App'
import 'antd/dist/antd.css';

const router = createRouter()
const rootElement = document.getElementById('root')
router.start(() => {
  ReactDOM.render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
    rootElement
  )
})
