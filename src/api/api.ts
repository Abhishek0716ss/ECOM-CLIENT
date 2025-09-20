import axios from 'axios'

const API = ' https://ecom-client-6jyd.onrender.com'

const getAllProducts = () => axios.get(`${API}/products/all`)
const addNewProduct = (product: any) => axios.post(`${API}/products/add`, product)
const editProduct = (product: any, id: string) => axios.put(`${API}/products/product/edit/${id}`, product)
const deleteProduct = (id: string) => axios.delete(`${API}/products/product/delete/${id}`)
export { getAllProducts, addNewProduct, editProduct, deleteProduct }

const getAllUsers = () => axios.get(`${API}/users/all`)
const addNewUser = (user: any) => axios.post(`${API}/users/add`, user)
const deleteUser = (id: string) => axios.delete(`${API}/users/user/delete/${id}`)
export { getAllUsers, addNewUser, deleteUser }  


const getAllOrders = () => axios.get(`${API}/orders/all`)
const updateOrderStatus = (id: string, status: string) => axios.put(`${API}/orders/order/update/${id}`, { status })
const deleteOrder = (id: string) => axios.delete(`${API}/orders/order/delete/${id}`)
export { getAllOrders, updateOrderStatus, deleteOrder }


