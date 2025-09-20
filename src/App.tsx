import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminOrders from "./pages/admin/AdminOrders"
import UserProducts from "./pages/user/UserProducts"
import AdminLayout from "./layouts/AdminLayout"
import UserLayout from "./layouts/UserLayout"
import UserOrders from "./pages/user/UserOrders"
import UserProfile from "./pages/user/UserProfile"
import UserCheckout from "./pages/user/UserCheckout"
import WebLayout from "./layouts/WebLayout"

const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<WebLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                </Route>


                <Route element={<UserLayout />}>
                    <Route path="/user/products" element={<UserProducts />} />
                    <Route path="/user/orders" element={<UserOrders />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/checkout" element={<UserCheckout />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App