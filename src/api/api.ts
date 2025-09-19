import axios from 'axios'

const API = 'https://ecom-server-coxu.onrender.com'

const getAllProducts = () => axios.get(`${API}/products/all`)
const addNewProduct = (product: any) => axios.post(`${API}/products/add`, product)
const editProduct = (product: any, id: string) => axios.put(`${API}/products/product/edit/${id}`, product)
const deleteProduct = (id: string) => axios.delete(`${API}/products/product/delete/${id}`)
export { getAllProducts, addNewProduct, editProduct, deleteProduct }