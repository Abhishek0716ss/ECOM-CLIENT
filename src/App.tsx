import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import UserProduct from './pages/user/UserProduct'
import AdminOrders from './pages/admin/AdminOrders'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/user/products" element={<UserProduct/>} />
         

      </Routes>

    </div>
  )
}

export default App
