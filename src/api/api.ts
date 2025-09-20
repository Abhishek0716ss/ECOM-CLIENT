 
import axios from "axios"

export const API = axios.create({
  baseURL: " https://ecom-client-6jyd.onrender.com", // 👈 must be your backend URL
})

// const API = 'https://ecom-server-coxu.onrender.com'
// const API = 'http://localhost:5173'


const authLogin = (logindata: any) => axios.post(`${API}/users/login`, logindata)
const authRegister = (registerdata: any) => axios.post(`${API}/users/signup`, registerdata)
const getAllProducts = () => axios.get(`${API}/products/all`)
const addNewProduct = (product: any) => axios.post(`${API}/products/add`, product)
const editProduct = (product: any, id: string) => axios.put(`${API}/products/product/edit/${id}`, product)
const deleteProduct = (id: string) => axios.delete(`${API}/products/product/delete/${id}`)

const getAllUsers = () => axios.get(`${API}/users/all`)
const getUserById = (id: string) => axios.get(`${API}/users/user/${id}`)
const getUserByEmail = (email: string) => axios.get(`${API}/users/email/${email}`)
const addUser = (user: any) => axios.post(`${API}/users/add`, user)
const editUser = (id: string, user: any) => axios.put(`${API}/users/user/edit/${id}`, user)
const deleteUser = (id: string) => axios.delete(`${API}/users/user/delete/${id}`)



const placeOrder = (userId: string, products: Record<string, number>) => axios.post(`${API}/orders/${userId}/place`, products)

const updateOrderStatus = (orderId: string, status: string) => axios.put(`${API}/orders/${orderId}/status?status=${status}`)

const getAllOrders = () => axios.get(`${API}/orders/all`)
const getOrderById = (id: string) => axios.get(`${API}/orders/${id}`)
const getOrdersByUser = (userId: string) => axios.get(`${API}/orders/user/${userId}`)
const deleteOrder = (id: string) => axios.delete(`${API}/orders/delete/${id}`)


export {
    authLogin,
    authRegister,
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    editUser,
    deleteUser,
    placeOrder,
    updateOrderStatus,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    deleteOrder
}